<script lang="ts">
	import { onMount } from 'svelte';
	import { makeKit, PINK, PINK_SOFT } from '$lib/glow-kit';

	/**
	 * "From signal to story", literally: a wide, noisy field of signal particles
	 * pours in at the top, memory tributaries merge in from the sides, the
	 * verify gate deflects what does not survive checking, and the remainder
	 * converges into one tight beam delivered at the bottom. The active stage
	 * spotlights its zone of the pipeline as the reader scrolls.
	 *
	 * three.js loads dynamically; the loop only runs while on screen; reduced
	 * motion gets a single static frame.
	 */

	let { activeStage = 0 }: { activeStage?: number } = $props();

	let wrap: HTMLDivElement;
	let canvas: HTMLCanvasElement;

	onMount(() => {
		let raf = 0;
		let disposed = false;
		let stop = () => {};

		(async () => {
			const THREE = await import('three');
			if (disposed) return;

			const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			const kit = makeKit(THREE);

			const renderer = kit.track(new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }));
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

			const FOV = 50;
			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 50);
			camera.position.z = 10;

			const TOP = 4.1;
			const BOTTOM = -3.55;
			const SPAN = TOP - BOTTOM;
			// Zone centres for Observe, Remember, Verify, Hand off.
			const gateY = [2.7, 1.0, -0.8, -2.6];
			const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
			const ease = (t: number) => t * t * (3 - 2 * t);

			let wTop = 3.2; // funnel mouth half-width, clamped to the canvas in size()

			/* Main stream: signal narrowing into a story. */
			const N = 480;
			const mainPos = new Float32Array(N * 3);
			const p = new Float32Array(N);
			const sp = new Float32Array(N);
			const xn = new Float32Array(N);
			const seed = new Float32Array(N);
			const fate = new Uint8Array(N); // 1 = deflected at the verify gate

			const respawn = (i: number, stagger = false) => {
				p[i] = stagger ? -Math.random() : 0;
				sp[i] = rand(0.08, 0.15);
				xn[i] = rand(-1, 1);
				seed[i] = rand(0, Math.PI * 2);
				fate[i] = Math.random() < 0.24 ? 1 : 0;
			};
			for (let i = 0; i < N; i++) respawn(i, true);
			const main = kit.points(mainPos, 0.14, 0.9, PINK, true);
			scene.add(main.obj);

			const placeMain = () => {
				for (let i = 0; i < N; i++) {
					if (p[i] < 0) {
						// Not born yet: park it far above the frame instead of letting
						// staggered spawns pile into a visible stripe at the top edge.
						mainPos[i * 3 + 1] = TOP + 20;
						continue;
					}
					const t = p[i];
					const e = ease(t);
					const w = wTop * (1 - e) + 0.14;
					let x = xn[i] * w + Math.sin(t * 6 + seed[i]) * 0.16 * (1 - t);
					if (fate[i] === 1 && t > 0.6) x += (t - 0.6) * 9 * Math.sign(xn[i] || 1);
					mainPos[i * 3] = x;
					mainPos[i * 3 + 1] = TOP - SPAN * t;
					mainPos[i * 3 + 2] = Math.cos(t * 5 + seed[i]) * 0.12;
				}
				main.attr.needsUpdate = true;
			};

			/* Memory tributaries: context merging in from the sides at Remember. */
			const M = 70;
			const tribPos = new Float32Array(M * 3);
			const q = new Float32Array(M);
			const qs = new Float32Array(M);
			const side = new Float32Array(M);
			const lane = new Float32Array(M);
			for (let i = 0; i < M; i++) {
				q[i] = Math.random();
				qs[i] = rand(0.25, 0.45);
				side[i] = Math.random() < 0.5 ? -1 : 1;
				lane[i] = rand(-0.35, 0.35);
			}
			const trib = kit.points(tribPos, 0.1, 0.65, PINK_SOFT, true);
			scene.add(trib.obj);

			const placeTrib = () => {
				for (let i = 0; i < M; i++) {
					const e = ease(q[i]);
					tribPos[i * 3] = side[i] * (1 - e) * (wTop + 0.6);
					tribPos[i * 3 + 1] = gateY[1] + 0.9 + lane[i] - e * 0.9;
					tribPos[i * 3 + 2] = (1 - e) * 0.2;
				}
				trib.attr.needsUpdate = true;
			};

			/* Scan collar: a ring of orbiting particles that travels down the
			   pipeline to the active stage, tightening with the funnel. */
			const C = 70;
			const collarPos = new Float32Array(C * 3);
			const cA = new Float32Array(C);
			const cJ = new Float32Array(C);
			for (let i = 0; i < C; i++) {
				cA[i] = rand(0, Math.PI * 2);
				cJ[i] = rand(-0.09, 0.09);
			}
			const collar = kit.points(collarPos, 0.1, 0.95, PINK_SOFT, true);
			scene.add(collar.obj);
			let collarY = gateY[0];

			const placeCollar = () => {
				const pAt = Math.min(1, Math.max(0, (TOP - collarY) / SPAN));
				const r = wTop * (1 - ease(pAt)) + 0.6;
				for (let i = 0; i < C; i++) {
					const x = r * Math.cos(cA[i]);
					const z = r * Math.sin(cA[i]);
					collarPos[i * 3] = x;
					collarPos[i * 3 + 1] = collarY + z * 0.28 + cJ[i];
					collarPos[i * 3 + 2] = z * 0.96;
				}
				collar.attr.needsUpdate = true;
			};

			/* The delivered story: a rocket on the pad at the pipeline exit. It
			   idles while the stream loads it, then lifts off up and out of frame
			   on a loop. Flat-shaded (fixed tint per part), no lights, no glow. */
			const PAD = BOTTOM - 0.05;
			const rocket = new THREE.Group();
			const rocketMats: InstanceType<typeof THREE.MeshBasicMaterial>[] = [];
			{
				const mat = (c: number) => {
					const m = kit.track(
						new THREE.MeshBasicMaterial({ color: c, transparent: true, side: THREE.DoubleSide })
					);
					rocketMats.push(m);
					return m;
				};
				const nose = new THREE.Mesh(
					kit.track(new THREE.ConeGeometry(0.17, 0.38, 10)),
					mat(0xffdcec)
				);
				nose.position.y = 0.52;
				const body = new THREE.Mesh(
					kit.track(new THREE.CylinderGeometry(0.17, 0.17, 0.66, 10)),
					mat(0xf586bb)
				);
				const nozzle = new THREE.Mesh(
					kit.track(new THREE.CylinderGeometry(0.09, 0.14, 0.14, 10)),
					mat(0xc75b92)
				);
				nozzle.position.y = -0.4;
				rocket.add(nose, body, nozzle);

				// Three fins around the base.
				const finGeo = kit.track(new THREE.BufferGeometry());
				finGeo.setAttribute(
					'position',
					new THREE.BufferAttribute(
						new Float32Array([0.16, 0.02, 0, 0.16, -0.34, 0, 0.46, -0.44, 0]),
						3
					)
				);
				const finMat = mat(0xc75b92);
				for (let k = 0; k < 3; k++) {
					const fin = new THREE.Mesh(finGeo, finMat);
					fin.rotation.y = (k * Math.PI * 2) / 3 + 0.4;
					rocket.add(fin);
				}
			}
			rocket.position.set(0, PAD, 0);
			scene.add(rocket);

			/* Exhaust plume: particles, not a blur sprite. */
			const E = 60;
			const exPos = new Float32Array(E * 3);
			const eP = new Float32Array(E);
			const eS = new Float32Array(E);
			const eX = new Float32Array(E);
			const eZ = new Float32Array(E);
			for (let i = 0; i < E; i++) {
				eP[i] = Math.random();
				eS[i] = rand(1.6, 3);
				eX[i] = rand(-0.22, 0.22);
				eZ[i] = rand(-0.22, 0.22);
			}
			const exhaust = kit.points(exPos, 0.1, 0.9, PINK_SOFT, true);
			scene.add(exhaust.obj);

			const clock = new THREE.Clock();
			let t = 0;

			const render = (dt: number) => {
				t += dt;

				/* Launch cycle: idle on the pad while the stream loads, rumble,
				   lift off up and out to the side, fade, reset. */
				const u = (t % 7) / 7;
				let y = PAD + Math.sin(t * 2.2) * 0.02;
				let x = 0;
				let tiltZ = Math.sin(t * 2.2) * 0.01;
				let opac = 1;
				let throttle = 0.35;
				if (u >= 0.55 && u < 0.92) {
					const a = (u - 0.55) / 0.37;
					y = PAD + a * a * 2.6;
					x = a * a * 1.4;
					tiltZ = -a * 0.3 + Math.sin(t * 45) * 0.02 * (1 - a);
					throttle = 1;
					if (a > 0.65) opac = Math.max(0, 1 - (a - 0.65) / 0.3);
				} else if (u >= 0.92) {
					y = PAD;
					opac = Math.min(1, (u - 0.92) / 0.06);
					throttle = 0.2;
				}
				rocket.position.set(x, y, 0);
				rocket.rotation.z = tiltZ;
				for (const m of rocketMats) m.opacity = opac;

				const plume = 0.5 + throttle * 0.9;
				for (let i = 0; i < E; i++) {
					eP[i] += eS[i] * dt;
					if (eP[i] >= 1) {
						eP[i] -= 1;
						eX[i] = rand(-0.22, 0.22);
						eZ[i] = rand(-0.22, 0.22);
					}
					const s = eP[i];
					exPos[i * 3] = x + eX[i] * s + tiltZ * s * 1.5;
					exPos[i * 3 + 1] = y - 0.5 - s * plume;
					exPos[i * 3 + 2] = eZ[i] * s;
				}
				exhaust.attr.needsUpdate = true;
				exhaust.obj.material.opacity = 0.9 * opac;
				for (let i = 0; i < N; i++) {
					p[i] += sp[i] * dt;
					if (p[i] >= 1 || (fate[i] === 1 && p[i] >= 0.82)) respawn(i);
				}
				for (let i = 0; i < M; i++) {
					q[i] += qs[i] * dt;
					if (q[i] >= 1) q[i] -= 1;
				}
				const k = dt > 0 ? Math.min(1, dt * 3) : 1;
				collarY += (gateY[activeStage] - collarY) * k;
				for (let i = 0; i < C; i++) cA[i] += dt * 0.9;

				placeMain();
				placeTrib();
				placeCollar();

				renderer.render(scene, camera);
			};

			const loop = () => {
				render(Math.min(clock.getDelta(), 0.05));
				raf = requestAnimationFrame(loop);
			};

			const size = () => {
				const w = wrap.clientWidth;
				const h = wrap.clientHeight;
				renderer.setSize(w, h, false);
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
				const halfW = Math.tan((FOV * Math.PI) / 360) * camera.position.z * camera.aspect;
				wTop = Math.min(3.2, halfW * 0.8);
				render(0);
			};
			size();
			const ro = new ResizeObserver(size);
			ro.observe(wrap);

			// Only burn frames while the panel is on screen.
			let running = false;
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

			renderStatic = reduced ? () => render(0) : null;

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

	// Under reduced motion there is no loop, so re-render one frame per stage
	// change to keep the spotlight in sync with the copy column.
	let renderStatic: (() => void) | null = null;
	$effect(() => {
		void activeStage;
		renderStatic?.();
	});
</script>

<div bind:this={wrap} class="engine-3d" aria-hidden="true">
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	.engine-3d {
		position: absolute;
		inset: 0;
	}

	canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
