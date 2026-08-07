<script lang="ts">
	import { onMount } from 'svelte';
	import { makeKit } from '$lib/glow-kit';

	/**
	 * Procedural rebuild of the hero art (omegaplex-flow.webp): a stack of
	 * glass panes receding to the left, a river of fiber-optic strands
	 * gathering into a bundle, and a faceted crystal drinking the light at
	 * the right. Resolution-independent, so it stays crisp on any display.
	 *
	 * Everything is unlit additive glow — fresnel-shaded slabs read as glass
	 * and soft sprites read as bloom, so there is no postprocessing pass.
	 * three.js loads dynamically; reduced motion gets a single static frame;
	 * the loop only runs while on screen.
	 */

	let wrap: HTMLDivElement;
	let canvas: HTMLCanvasElement;

	onMount(() => {
		let raf = 0;
		let disposed = false;
		let stop = () => {};

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		(async () => {
			const THREE = await import('three');
			if (disposed) return;

			const kit = makeKit(THREE);
			let renderer: import('three').WebGLRenderer;
			try {
				renderer = kit.track(new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }));
			} catch {
				return; // no WebGL: the <img> fallback simply stays
			}
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			// opaque clear in the hero's own background color: additive panes
			// write alpha, and over a transparent canvas they'd darken instead
			renderer.setClearColor(0x0c0c11, 1);

			const FOV = 50;
			const scene = new THREE.Scene();
			scene.rotation.y = 0.14; // recede the pane stack to the left, like the art
			const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 60);
			camera.position.z = 10;

			const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
			const smooth = (a: number, b: number, t: number) => {
				const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
				return x * x * (3 - 2 * x);
			};
			const eo = (x: number) => {
				x = Math.min(1, Math.max(0, x));
				return 1 - (1 - x) ** 3;
			};

			/* Intro, played once on first view: panes settle in left→right,
			   light draws along the fibers, and the crystal ignites with a
			   brief flare when it arrives. Reduced motion skips straight to
			   the settled state. */
			const INTRO = 1.9;
			let introT = reduced ? INTRO : 0;
			let introDone = reduced;
			let wavefront = reduced ? 2 : 0;

			/* ---- fiber strands: spread at the left, gathered at the crystal ---- */
			const X0 = -13;
			const X1 = 3.85; // bundle mouth, just inside the crystal's front face
			const S = 140;
			const y0 = new Float32Array(S);
			const z0 = new Float32Array(S);
			const y1 = new Float32Array(S);
			const z1 = new Float32Array(S);
			const bow = new Float32Array(S);
			const amp = new Float32Array(S);
			const freq = new Float32Array(S);
			const phase = new Float32Array(S);
			const glow = new Float32Array(S);
			for (let i = 0; i < S; i++) {
				y0[i] = rand(-2.5, 2.5);
				z0[i] = rand(-0.9, 0.9);
				y1[i] = rand(-0.32, 0.32);
				z1[i] = rand(-0.22, 0.22);
				bow[i] = rand(-0.7, 0.7); // long lazy S-sweep across the frame
				amp[i] = rand(0.15, 0.45);
				freq[i] = rand(5, 10);
				phase[i] = rand(0, Math.PI * 2);
				glow[i] = rand(0.6, 1.2);
			}

			const pos = (i: number, t: number, out: [number, number, number]) => {
				const g = smooth(0.42, 0.94, t); // how gathered the bundle is here
				const wave =
					(Math.sin(t * freq[i] + phase[i]) * amp[i] + Math.sin(Math.PI * t) * bow[i]) * (1 - g);
				out[0] = X0 + (X1 - X0) * t;
				out[1] = y0[i] * (1 - g) + y1[i] * g + wave;
				out[2] = z0[i] * (1 - g) + z1[i] * g + Math.cos(t * freq[i] * 0.6 + phase[i]) * 0.1;
			};

			/* dim magenta → pink → hot orange-pink → white only at the very tip */
			const ramp = (t: number, k: number, out: [number, number, number]) => {
				let r: number, g: number, b: number;
				if (t < 0.6) {
					const u = t / 0.6;
					r = 0.5 + 0.45 * u;
					g = 0.12 + 0.16 * u;
					b = 0.32 + 0.26 * u;
				} else if (t < 0.9) {
					const u = (t - 0.6) / 0.3;
					r = 0.95 + 0.05 * u;
					g = 0.28 + 0.14 * u;
					b = 0.58 - 0.23 * u;
				} else {
					const u = (t - 0.9) / 0.1;
					r = 1;
					g = 0.42 + 0.43 * u;
					b = 0.35 + 0.35 * u;
				}
				// taper as strands bunch up, or the additive overlap sums to white
				const f = k * smooth(0, 0.06, t) * (1 - 0.4 * smooth(0.5, 0.9, t));
				out[0] = r * f;
				out[1] = g * f;
				out[2] = b * f;
			};

			const p3: [number, number, number] = [0, 0, 0];
			const c3: [number, number, number] = [0, 0, 0];

			/* static fiber lines, one draw call */
			const SEG = 72;
			const lineVerts = new Float32Array(S * SEG * 2 * 3);
			const lineCols = new Float32Array(S * SEG * 2 * 3);
			const lineT = new Float32Array(S * SEG * 2); // per-vertex t, for the intro reveal
			let v = 0;
			let vi = 0;
			for (let i = 0; i < S; i++) {
				for (let s = 0; s < SEG; s++) {
					for (const t of [s / SEG, (s + 1) / SEG]) {
						lineT[vi++] = t;
						pos(i, t, p3);
						ramp(t, glow[i] * 0.55, c3);
						lineVerts[v] = p3[0];
						lineCols[v++] = c3[0];
						lineVerts[v] = p3[1];
						lineCols[v++] = c3[1];
						lineVerts[v] = p3[2];
						lineCols[v++] = c3[2];
					}
				}
			}
			const lineColsBase = lineCols.slice();
			const lineGeo = kit.track(new THREE.BufferGeometry());
			lineGeo.setAttribute('position', new THREE.BufferAttribute(lineVerts, 3));
			const lineColAttr = new THREE.BufferAttribute(lineCols, 3);
			lineGeo.setAttribute('color', lineColAttr);
			const lineMat = kit.track(
				new THREE.LineBasicMaterial({
					vertexColors: true,
					transparent: true,
					opacity: 1,
					blending: THREE.AdditiveBlending,
					depthWrite: false
				})
			);
			const lines = new THREE.LineSegments(lineGeo, lineMat);
			lines.renderOrder = 2;
			scene.add(lines);

			/* light pulses travelling down the fibers */
			const P = 600;
			const dotPos = new Float32Array(P * 3);
			const dotCol = new Float32Array(P * 3);
			const dotStrand = new Uint16Array(P);
			const dotT = new Float32Array(P);
			const dotSp = new Float32Array(P);
			for (let i = 0; i < P; i++) {
				dotStrand[i] = Math.floor(Math.random() * S);
				dotT[i] = Math.random();
				dotSp[i] = rand(0.03, 0.08);
			}
			const dots = kit.points(dotPos, 0.11, 0.9, 0xffffff, true, dotCol);
			dots.obj.renderOrder = 4;
			scene.add(dots.obj);

			const placeDots = () => {
				for (let i = 0; i < P; i++) {
					pos(dotStrand[i], dotT[i], p3);
					ramp(dotT[i], glow[dotStrand[i]], c3);
					// during the intro, dots ahead of the light wavefront stay dark
					const f = introDone ? 1 : 1 - smooth(wavefront - 0.09, wavefront, dotT[i]);
					dotPos[i * 3] = p3[0];
					dotPos[i * 3 + 1] = p3[1];
					dotPos[i * 3 + 2] = p3[2];
					dotCol[i * 3] = c3[0] * f;
					dotCol[i * 3 + 1] = c3[1] * f;
					dotCol[i * 3 + 2] = c3[2] * f;
				}
				dots.attr.needsUpdate = true;
				dots.colAttr!.needsUpdate = true;
			};

			/* connector chips clipped onto the left half of the fibers */
			const CH = 64;
			const chipGeo = kit.track(new THREE.BoxGeometry(0.21, 0.09, 0.02));
			const chipMat = kit.track(
				new THREE.MeshBasicMaterial({
					transparent: true,
					opacity: 1,
					blending: THREE.AdditiveBlending,
					depthWrite: false
				})
			);
			const chips = new THREE.InstancedMesh(chipGeo, chipMat, CH);
			chips.renderOrder = 3;
			const m4 = new THREE.Matrix4();
			const q4 = new THREE.Quaternion();
			const e3 = new THREE.Euler();
			const s3 = new THREE.Vector3(1, 1, 1);
			const v3 = new THREE.Vector3();
			const chipTint = new THREE.Color();
			const ahead: [number, number, number] = [0, 0, 0];
			for (let i = 0; i < CH; i++) {
				let s = Math.floor(Math.random() * S);
				while (Math.abs(y0[s]) > 1.5) s = Math.floor(Math.random() * S);
				const t = rand(0.3, 0.75);
				pos(s, t, p3);
				pos(s, t + 0.01, ahead);
				e3.set(0, 0, Math.atan2(ahead[1] - p3[1], ahead[0] - p3[0]));
				q4.setFromEuler(e3);
				m4.compose(v3.set(p3[0], p3[1], p3[2]), q4, s3);
				chips.setMatrixAt(i, m4);
				const warm = Math.random();
				chipTint
					.set(warm < 0.6 ? 0xff9d5c : warm < 0.85 ? 0xffd2b0 : 0xff7fb0)
					.multiplyScalar(rand(0.7, 1.1));
				chips.setColorAt(i, chipTint);
			}
			scene.add(chips);

			/* ---- glass panes: fresnel-lit slabs, brighter rims near the core.
			   Faces get a vertical sheen and a soft diagonal reflection band so
			   they read as glass, not outlines. ---- */
			const glassMat = (pink: number, h: number, faceAmt = 1) =>
				kit.track(
					new THREE.ShaderMaterial({
						uniforms: {
							uPink: { value: pink },
							uH: { value: h },
							uFace: { value: faceAmt },
							uIn: { value: reduced ? 1 : 0 },
							uStreak: { value: rand(-0.35, 0.35) }
						},
						vertexShader: `
							varying vec3 vN; varying vec3 vV; varying vec3 vP;
							void main() {
								vN = normalMatrix * normal;
								vP = position;
								vec4 mv = modelViewMatrix * vec4(position, 1.0);
								vV = -mv.xyz;
								gl_Position = projectionMatrix * mv;
							}`,
						fragmentShader: `
							uniform float uPink; uniform float uH; uniform float uFace; uniform float uIn; uniform float uStreak;
							varying vec3 vN; varying vec3 vV; varying vec3 vP;
							void main() {
								vec3 n = normalize(vN);
								float fres = pow(1.0 - abs(dot(n, normalize(vV))), 3.0);
								// edges facing the key light above glint harder
								float rim = fres * (0.75 + 0.65 * clamp(n.y, 0.0, 1.0));
								// frosted face: sheen toward the top… (halved: DoubleSide
								// stacks front + back contributions)
								float ny = vP.y / uH + 0.5;
								float face = 0.01 + 0.028 * smoothstep(0.35, 1.05, ny);
								// …plus one wide and one tight diagonal reflection band
								float diag = (vP.x * 0.55 + vP.y) / uH;
								face += 0.042 * exp(-pow((diag - uStreak) * 3.5, 2.0));
								face += 0.026 * exp(-pow((diag + 0.45 - uStreak) * 7.0, 2.0));
								face *= uFace;
								vec3 cool = vec3(0.62, 0.70, 0.82);
								vec3 pink = vec3(1.00, 0.55, 0.75);
								vec3 col = mix(cool, pink, uPink) * (rim * 1.7 + face);
								gl_FragColor = vec4(col * uIn, 1.0);
							}`,
						transparent: true,
						blending: THREE.AdditiveBlending,
						depthWrite: false,
						side: THREE.DoubleSide
					})
				);

			const roundedSlab = (w: number, h: number, r: number) => {
				const shape = new THREE.Shape();
				const x = -w / 2;
				const y = -h / 2;
				shape.moveTo(x + r, y);
				shape.lineTo(x + w - r, y);
				shape.quadraticCurveTo(x + w, y, x + w, y + r);
				shape.lineTo(x + w, y + h - r);
				shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
				shape.lineTo(x + r, y + h);
				shape.quadraticCurveTo(x, y + h, x, y + h - r);
				shape.lineTo(x, y + r);
				shape.quadraticCurveTo(x, y, x + r, y);
				const geo = kit.track(
					new THREE.ExtrudeGeometry(shape, {
						depth: 0.16,
						bevelEnabled: true,
						bevelThickness: 0.05,
						bevelSize: 0.05,
						bevelSegments: 2,
						curveSegments: 10
					})
				);
				geo.center();
				return geo;
			};

			// x, height — sized so the near panes crop off-frame like the art
			const PANES: [number, number][] = [
				[-5.3, 3.2],
				[-3.9, 3.9],
				[-2.5, 4.6],
				[-1.15, 5.4],
				[0.25, 6.2],
				[1.6, 7.0],
        		[2.9, 7.7],
        		// [1.6, 7.0]
			];
			const panes: import('three').Mesh[] = [];
			const paneMats: import('three').ShaderMaterial[] = [];
			PANES.forEach(([px, h], i) => {
				const mat = glassMat(0.25 + (0.65 * i) / (PANES.length - 1), h);
				const pane = new THREE.Mesh(roundedSlab(h * 0.58, h, 0.28 + h * 0.05), mat);
				pane.position.set(px, i % 2 ? 0.15 : -0.1, 0);
				pane.renderOrder = 1;
				scene.add(pane);
				panes.push(pane);
				paneMats.push(mat);
			});
			

			/* ---- the crystal ---- */
			const gemGeo = kit.track(new THREE.DodecahedronGeometry(1.05, 0));
			gemGeo.computeVertexNormals(); // flat facets
			const gemMat = kit.track(
				new THREE.ShaderMaterial({
					uniforms: { uIg: { value: reduced ? 1 : 0 } },
					vertexShader: `
						varying vec3 vN; varying vec3 vV; varying vec3 vP;
						void main() {
							vN = normalMatrix * normal;
							vP = position;
							vec4 mv = modelViewMatrix * vec4(position, 1.0);
							vV = -mv.xyz;
							gl_Position = projectionMatrix * mv;
						}`,
					fragmentShader: `
						uniform float uIg;
						varying vec3 vN; varying vec3 vV; varying vec3 vP;
						void main() {
							vec3 n = normalize(vN);
							float diff = 0.5 + 0.5 * dot(n, normalize(vec3(-0.65, 0.5, 0.6)));
							float fres = pow(1.0 - abs(dot(n, normalize(vV))), 2.0);
							// the side the fibers pour into burns orange-hot
							float hot = smoothstep(0.5, -1.1, vP.x);
							vec3 body = vec3(0.6, 0.09, 0.32) * (0.15 + 1.4 * diff * diff);
							vec3 rim = vec3(1.0, 0.72, 0.85) * pow(fres, 1.4) * 1.0;
							vec3 core = vec3(1.0, 0.55, 0.3) * hot * (0.4 + 0.8 * diff);
							// dark glass until the light arrives; >1 overshoots into flare
							gl_FragColor = vec4((body + rim + core) * mix(0.1, 1.0, uIg), 0.96);
						}`,
					transparent: true
				})
			);
			const gem = new THREE.Mesh(gemGeo, gemMat);
			gem.scale.set(1.45, 1.95, 1.25);
			gem.position.set(5.0, 0, 0);
			gem.rotation.set(0.3, 0, 0.08);
			gem.renderOrder = 0; // writes depth first so fiber tips vanish into it
			scene.add(gem);

			/* glow, in lieu of a bloom pass. sx/sy stretch the sprite; behind=1
			   keeps depth testing on so the gem occludes it into a halo. */
			const glows: [number, number, number, number, number, number, number, number][] = [
				// sx, sy, opacity, color, x, y, z, behind
				[2.8, 1.2, 0.75, 0xffd9a8, 3.9, 0, 0.5, 0],
				[3.6, 2.2, 0.4, 0xff8bbf, 4.15, 0, 0.4, 0],
				[1.7, 1.7, 0.6, 0xffc2a0, 5.0, 0.15, 1.2, 0],
				[7.0, 7.0, 0.3, 0xff9ccb, 5.0, 0, -1.4, 1],
				[9.5, 9.5, 0.13, 0xf06daa, 4.4, 0, -1.6, 1],
				[11.0, 11.0, 0.06, 0xbfd0ff, 8.0, 4.5, -2.5, 1]
			];
			// [material, base opacity, ambient] — ambient sprites (the corner
			// sheen) fade in with the panes instead of waiting for ignition
			const glowMats: [import('three').SpriteMaterial, number, boolean][] = [];
			for (const [sx, sy, op, col, gx, gy, gz, behind] of glows) {
				const sp = kit.sprite(1, op, col);
				sp.scale.set(sx, sy, 1);
				sp.position.set(gx, gy, gz);
				sp.material.depthTest = !!behind;
				sp.renderOrder = 5;
				scene.add(sp);
				glowMats.push([sp.material, op, col === 0xbfd0ff]);
			}

			const clock = new THREE.Clock();
			let time = 0;
			let baseX = 2;

			const render = (dt: number) => {
				time += dt;
				for (let i = 0; i < P; i++) {
					dotT[i] += dotSp[i] * dt;
					if (dotT[i] >= 1) {
						dotT[i] = 0;
						dotStrand[i] = Math.floor(Math.random() * S);
					}
				}
				if (!introDone) {
					introT += dt;
					// light sweeps the fibers; runs past 1 so the tip exits into the gem
					wavefront = 1.12 * eo((introT - 0.15) / 1.0);
					for (let j = 0; j < lineT.length; j++) {
						const tv = lineT[j];
						const f =
							1 -
							smooth(wavefront - 0.09, wavefront, tv) +
							Math.exp(-(((tv - wavefront) / 0.035) ** 2)) * 0.9;
						lineCols[j * 3] = lineColsBase[j * 3] * f;
						lineCols[j * 3 + 1] = lineColsBase[j * 3 + 1] * f;
						lineCols[j * 3 + 2] = lineColsBase[j * 3 + 2] * f;
					}
					lineColAttr.needsUpdate = true;
					// panes settle in, left to right
					paneMats.forEach((m, i) => {
						const k = eo((introT - i * 0.08) / 0.6);
						m.uniforms.uIn.value = k;
						panes[i].scale.setScalar(0.965 + 0.035 * k);
					});
					// ignition: the crystal catches when the light arrives
					const ig = eo((introT - 1.05) / 0.4);
					const flare = Math.sin(Math.PI * Math.min(1, Math.max(0, (introT - 1.05) / 0.7)));
					gemMat.uniforms.uIg.value = ig * (1 + 0.22 * flare);
					for (const [m, base, ambient] of glowMats) {
						m.opacity = base * (ambient ? eo((introT - 0.2) / 0.8) : ig * (1 + 0.35 * flare));
					}
					chipMat.opacity = eo((introT - 0.5) / 0.55);
					camera.position.z = 10 + 0.5 * (1 - eo(introT / 1.5));
					if (introT >= INTRO) {
						introDone = true;
						lineCols.set(lineColsBase);
						lineColAttr.needsUpdate = true;
						paneMats.forEach((m, i) => {
							m.uniforms.uIn.value = 1;
							panes[i].scale.setScalar(1);
						});
						gemMat.uniforms.uIg.value = 1;
						for (const [m, base] of glowMats) m.opacity = base;
						chipMat.opacity = 1;
						camera.position.z = 10;
					}
				}
				placeDots();
				gem.rotation.y = 0.1 + Math.sin(time * 0.13) * 0.1;
				camera.position.x = baseX + Math.sin(time * 0.11) * 0.12;
				camera.position.y = Math.sin(time * 0.07) * 0.08;
				renderer.render(scene, camera);
			};

			const size = () => {
				const w = wrap.clientWidth;
				const h = wrap.clientHeight;
				renderer.setSize(w, h, false);
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
				// keep the crystal ~84% across the frame, clear of the copy column
				// (fixed z=10: the intro dolly must not shift the framing math)
				const halfW = Math.tan((FOV * Math.PI) / 360) * 10 * camera.aspect;
				baseX = Math.min(3.7, 5.0 - 0.68 * halfW);
				render(0);
			};
			size();
			const ro = new ResizeObserver(size);
			ro.observe(wrap);

			let running = false;
			const loop = () => {
				render(Math.min(clock.getDelta(), 0.05));
				raf = requestAnimationFrame(loop);
			};
			const io = new IntersectionObserver(([entry]) => {
				const should = entry.isIntersecting && !reduced;
				if (should && !running) {
					running = true;
					clock.getDelta();
					raf = requestAnimationFrame(loop);
				} else if (!should && running) {
					running = false;
					cancelAnimationFrame(raf);
				}
			});
			io.observe(wrap);

			stop = () => {
				cancelAnimationFrame(raf);
				ro.disconnect();
				io.disconnect();
				kit.dispose();
			};
		})();

		return () => {
			disposed = true;
			stop();
		};
	});
</script>

<div bind:this={wrap} class="flow-3d" aria-hidden="true">
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	.flow-3d {
		position: absolute;
		inset: 0;
		z-index: -2;
	}

	canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
