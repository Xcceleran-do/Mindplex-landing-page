<script lang="ts">
	import { onMount } from 'svelte';
	import { makeKit, PINK } from '$lib/glow-kit';

	/**
	 * "300 comments in. One piece of knowledge out." — literally. Three
	 * hundred dots drift scattered across the frame; scrolling through the
	 * section pulls them together until they fuse into one slowly turning
	 * brain-like lattice (points + proximity lines). Scrolling back up
	 * dissolves it again. Reduced motion gets the fused structure as a
	 * static frame.
	 */

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

			const FOV = 40;
			const CAM_Z = 7.2;
			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 50);
			camera.position.z = CAM_Z;

			const ease = (v: number) => v * v * (3 - 2 * v);
			const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

			/* ---- Target structure: a stylized brain, unit scale ---------------- */

			const N = 300; // the heading says 300 comments; the scene means it
			const tgt = new Float32Array(N * 3);
			{
				const GA = Math.PI * (3 - Math.sqrt(5));
				for (let i = 0; i < N; i++) {
					// Fibonacci sphere for even coverage, then sculpted.
					const y0 = 1 - (2 * (i + 0.5)) / N;
					const r0 = Math.sqrt(1 - y0 * y0);
					const a = GA * i;
					let x = Math.cos(a) * r0;
					let y = y0;
					let z = Math.sin(a) * r0;
					// Cortical folds: a radial ripple keyed to angular position.
					const theta = Math.atan2(z, x);
					const fold = 1 + 0.07 * Math.sin(theta * 6 + y * 5) * Math.cos(y * 3 + theta);
					x *= fold * 1.35; // long axis, seen in profile
					y *= fold * 0.92;
					z *= fold;
					z += Math.sign(z) * 0.1; // longitudinal fissure between hemispheres
					if (y < -0.45) y = -0.45 + (y + 0.45) * 0.45; // flatter underside
					tgt[i * 3] = x;
					tgt[i * 3 + 1] = y;
					tgt[i * 3 + 2] = z;
				}
			}

			// Proximity pairs, precomputed in structure space.
			const CONN = 0.36;
			const pairs: [number, number, number][] = [];
			for (let a = 0; a < N; a++) {
				for (let b = a + 1; b < N; b++) {
					const d = Math.hypot(
						tgt[a * 3] - tgt[b * 3],
						tgt[a * 3 + 1] - tgt[b * 3 + 1],
						tgt[a * 3 + 2] - tgt[b * 3 + 2]
					);
					if (d < CONN) pairs.push([a, b, d]);
				}
			}
			const linePos = new Float32Array(pairs.length * 6);
			const lineCol = new Float32Array(pairs.length * 6);
			const lineGeo = kit.track(new THREE.BufferGeometry());
			const linePosAttr = new THREE.BufferAttribute(linePos, 3);
			linePosAttr.setUsage(THREE.DynamicDrawUsage);
			lineGeo.setAttribute('position', linePosAttr);
			const lineColAttr = new THREE.BufferAttribute(lineCol, 3);
			lineColAttr.setUsage(THREE.DynamicDrawUsage);
			lineGeo.setAttribute('color', lineColAttr);
			scene.add(
				new THREE.LineSegments(
					lineGeo,
					kit.track(
						new THREE.LineBasicMaterial({
							vertexColors: true,
							transparent: true,
							opacity: 0.85,
							blending: THREE.AdditiveBlending,
							depthWrite: false
						})
					)
				)
			);

			/* ---- The dots ------------------------------------------------------ */

			const su = new Float32Array(N * 3); // scatter position, unit viewport space
			const stag = new Float32Array(N); // when each dot starts to converge
			for (let i = 0; i < N; i++) {
				su[i * 3] = Math.random() * 2 - 1;
				su[i * 3 + 1] = Math.random() * 2 - 1;
				su[i * 3 + 2] = Math.random() * 2 - 1;
				stag[i] = Math.random() * 0.6;
			}
			const conv = new Float32Array(N);
			const pos = new Float32Array(N * 3);
			const col = new Float32Array(N * 3);
			const dots = kit.points(pos, 0.11, 1, 0xffffff, true, col);
			scene.add(dots.obj);

			// The single bright thing 300 comments became.
			const core = kit.sprite(1, 0, PINK);
			scene.add(core);

			/* ---- Layout -------------------------------------------------------- */

			let halfW = 1;
			let halfH = 1;
			let sc = 1;

			const size = () => {
				const w = wrap.clientWidth;
				const h = wrap.clientHeight;
				renderer.setSize(w, h, false);
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
				halfH = Math.tan((FOV * Math.PI) / 360) * CAM_Z;
				halfW = halfH * camera.aspect;
				sc = Math.min(halfW / 1.6, halfH / 1.15) * 0.8;
				core.scale.setScalar(sc * 1.5);
			};

			/* ---- Frame --------------------------------------------------------- */

			// Scroll is the driver: 0 while the canvas waits below the fold, 1 by
			// the time it reaches the middle of the viewport.
			const targetP = () => {
				const r = wrap.getBoundingClientRect();
				const vh = window.innerHeight;
				return clamp01(((vh - r.top) / (vh + r.height)) * 2);
			};

			let p = -1; // -1 = snap to the real value on the first frame
			let t = 0;
			const TILT = 0.3;
			const cx = Math.cos(TILT);
			const sx = Math.sin(TILT);

			const frame = (dt: number) => {
				t += dt;
				const goal = reduced ? 1 : targetP();
				p = p < 0 ? goal : p + (goal - p) * (1 - Math.exp(-6 * dt));

				const rotY = reduced ? 0.6 : t * 0.14;
				const cy = Math.cos(rotY);
				const sy = Math.sin(rotY);

				for (let i = 0; i < N; i++) {
					const c = ease(clamp01((p - stag[i]) / 0.4));
					conv[i] = c;
					// Structure slot, spun around Y then tilted toward the camera.
					const txv = tgt[i * 3];
					const tyv = tgt[i * 3 + 1];
					const tzv = tgt[i * 3 + 2];
					const rx = txv * cy + tzv * sy;
					const rz0 = tzv * cy - txv * sy;
					const ry = tyv * cx - rz0 * sx;
					const rz = tyv * sx + rz0 * cx;
					// Scattered home, drifting slowly so the field feels alive.
					const sxp = su[i * 3] * halfW * 0.95 + Math.sin(t * 0.4 + i * 1.7) * 0.3;
					const syp = su[i * 3 + 1] * halfH * 0.9 + Math.cos(t * 0.33 + i * 2.3) * 0.25;
					const szp = su[i * 3 + 2] * 1.4;
					pos[i * 3] = sxp + (rx * sc - sxp) * c;
					pos[i * 3 + 1] = syp + (ry * sc - syp) * c;
					pos[i * 3 + 2] = szp + (rz * sc - szp) * c;
					const b = 0.5 + 0.5 * c;
					col[i * 3] = b;
					col[i * 3 + 1] = 0.55 * b;
					col[i * 3 + 2] = 0.74 * b;
				}
				dots.attr.needsUpdate = true;
				dots.colAttr!.needsUpdate = true;

				// Wire a pair once both its dots have (nearly) locked in.
				let lit = 0;
				for (const [a, b, d] of pairs) {
					const settled = Math.min(conv[a], conv[b]);
					if (settled < 0.82) continue;
					const o = lit * 6;
					linePos[o] = pos[a * 3];
					linePos[o + 1] = pos[a * 3 + 1];
					linePos[o + 2] = pos[a * 3 + 2];
					linePos[o + 3] = pos[b * 3];
					linePos[o + 4] = pos[b * 3 + 1];
					linePos[o + 5] = pos[b * 3 + 2];
					const f = ((settled - 0.82) / 0.18) * (1 - d / CONN) * 0.85;
					lineCol[o] = f;
					lineCol[o + 1] = 0.5 * f;
					lineCol[o + 2] = 0.7 * f;
					lineCol[o + 3] = f;
					lineCol[o + 4] = 0.5 * f;
					lineCol[o + 5] = 0.7 * f;
					lit++;
				}
				lineGeo.setDrawRange(0, lit * 2);
				linePosAttr.needsUpdate = true;
				lineColAttr.needsUpdate = true;

				const done = clamp01((p - 0.82) / 0.18);
				core.material.opacity = done * done * 0.45;
			};

			const clock = new THREE.Clock();
			const loop = () => {
				frame(Math.min(clock.getDelta(), 0.05));
				renderer.render(scene, camera);
				raf = requestAnimationFrame(loop);
			};

			size();
			if (reduced) {
				frame(0.05);
				renderer.render(scene, camera);
			}
			const ro = new ResizeObserver(() => {
				size();
				if (reduced) {
					frame(0);
					renderer.render(scene, camera);
				}
			});
			ro.observe(wrap);

			// Only burn frames while the scene is actually on screen.
			let running = false;
			const io = new IntersectionObserver(([entry]) => {
				const should = entry.isIntersecting && !reduced;
				if (should && !running) {
					running = true;
					clock.getDelta(); // swallow the off-screen gap so t does not jump
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

<div bind:this={wrap} class="compression-3d" aria-hidden="true">
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	.compression-3d {
		width: 100%;
		height: 100%;
	}

	canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
