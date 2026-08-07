<script lang="ts">
	import { onMount } from 'svelte';
	import { makeKit, GREEN, GREEN_SOFT } from '$lib/glow-kit';

	/**
	 * One particle-built 3D symbol per stage — Observe: eye, Patterns: spiral galaxy,
	 * Verify: shield with check, Hand off: human at the gate. The cloud
	 * dissolves and reforms into the next symbol as the reader scrolls, and
	 * sways gently so the depth reads. A faint dust field sits behind it.
	 *
	 * Point clouds are pre-sampled from real meshes (Allen brain CC BY 4.0,
	 * Lee Perry-Smith head CC BY 3.0) by scripts/generate-engine-shapes.mjs
	 * into static/engine-shapes.bin — 96KB ships, the source models don't.
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
			const [THREE, shapeBuf] = await Promise.all([
				import('three'),
				fetch('/engine-shapes.bin').then((r) => r.arrayBuffer())
			]);
			if (disposed) return;

			const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			const kit = makeKit(THREE);

			const renderer = kit.track(new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }));
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
			camera.position.z = 10;

			const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
			const ease = (t: number) => t * t * (3 - 2 * t);
			// Standard-normal-ish for even sphere sampling.
			const gauss = () => Math.random() + Math.random() + Math.random() + Math.random() - 2;

			/* Shape targets from static/engine-shapes.bin:
			   4 shapes x P points x [x, y, z, brightness] float32. */
			const all = new Float32Array(shapeBuf);
			const P = all.length / 16;
			const shapePos: Float32Array[] = [];
			const shapeBri: Float32Array[] = [];
			for (let s = 0; s < 4; s++) {
				const pp = new Float32Array(P * 3);
				const bb = new Float32Array(P);
				for (let i = 0; i < P; i++) {
					const o = (s * P + i) * 4;
					pp[i * 3] = all[o];
					pp[i * 3 + 1] = all[o + 1];
					pp[i * 3 + 2] = all[o + 2];
					bb[i] = all[o + 3];
				}
				shapePos.push(pp);
				shapeBri.push(bb);
			}

			/* The morphing cloud. */
			const pos = new Float32Array(P * 3);
			const col = new Float32Array(P * 3);
			const from = new Float32Array(P * 3);
			const fromB = new Float32Array(P);
			const delay = new Float32Array(P);
			const scat = new Float32Array(P * 3);
			const seed = new Float32Array(P);
			for (let i = 0; i < P; i++) seed[i] = rand(0, Math.PI * 2);

			let shown = activeStage;
			let u = 1; // transition progress incl. per-particle delays

			pos.set(shapePos[shown]);
			from.set(shapePos[shown]);
			fromB.set(shapeBri[shown]);

			const cloud = kit.points(pos, 0.11, 0.95, GREEN, true, col);
			cloud.obj.scale.setScalar(1.85);
			cloud.obj.position.y = 1.05;
			cloud.obj.rotation.x = -0.06;
			scene.add(cloud.obj);

			const beginMorph = (next: number) => {
				from.set(pos);
				for (let i = 0; i < P; i++) {
					fromB[i] = col[i * 3];
					delay[i] = rand(0, 0.3);
					scat[i * 3] = gauss() * 0.5;
					scat[i * 3 + 1] = gauss() * 0.5;
					scat[i * 3 + 2] = gauss() * 0.5;
				}
				shown = next;
				u = 0;
			};

			const placeCloud = (time: number) => {
				const target = shapePos[shown];
				const bri = shapeBri[shown];
				for (let i = 0; i < P; i++) {
					const ui = ease(Math.min(1, Math.max(0, (u - delay[i]) / 0.7)));
					const burst = Math.sin(Math.PI * ui);
					const wob = 0.025 * Math.sin(time * 1.6 + seed[i]);
					for (let a = 0; a < 3; a++) {
						pos[i * 3 + a] =
							from[i * 3 + a] +
							(target[i * 3 + a] - from[i * 3 + a]) * ui +
							scat[i * 3 + a] * burst +
							(a === 2 ? wob : wob * 0.5);
					}
					const b = fromB[i] + (bri[i] - fromB[i]) * ui;
					col[i * 3] = col[i * 3 + 1] = col[i * 3 + 2] = b;
				}
				cloud.attr.needsUpdate = true;
				cloud.colAttr!.needsUpdate = true;
			};

			/* Dust: sparse, dim, slow-rising specks for depth. */
			const D = 110;
			const dustPos = new Float32Array(D * 3);
			for (let i = 0; i < D; i++) {
				dustPos[i * 3] = rand(-4.4, 4.4);
				dustPos[i * 3 + 1] = rand(-4.5, 4.5);
				dustPos[i * 3 + 2] = rand(-2, 0.5);
			}
			const dust = kit.points(dustPos, 0.09, 0.3, GREEN_SOFT, true);
			scene.add(dust.obj);

			const clock = new THREE.Clock();
			let time = 0;

			const render = (dt: number) => {
				time += dt;
				if (shown !== activeStage && u >= 1.3) beginMorph(activeStage);
				u = Math.min(1.5, u + dt * 1.4);

				cloud.obj.rotation.y = 0.32 * Math.sin(time * 0.35);
				placeCloud(time);

				for (let i = 0; i < D; i++) {
					dustPos[i * 3 + 1] += dt * 0.12;
					if (dustPos[i * 3 + 1] > 4.5) dustPos[i * 3 + 1] = -4.5;
				}
				dust.attr.needsUpdate = true;

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
				// Fit the symbol to narrow canvases.
				const halfW = Math.tan((50 * Math.PI) / 360) * camera.position.z * camera.aspect;
				cloud.obj.scale.setScalar(Math.min(1.85, halfW * 0.52));
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

			renderStatic = reduced
				? () => {
						if (shown !== activeStage) {
							shown = activeStage;
							pos.set(shapePos[shown]);
							from.set(shapePos[shown]);
							fromB.set(shapeBri[shown]);
							u = 1.5;
						}
						render(0);
					}
				: null;

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
	// change to keep the symbol in sync with the copy column.
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
