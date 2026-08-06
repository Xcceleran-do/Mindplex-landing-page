<script lang="ts">
	import { onMount } from 'svelte';
	import { makeKit, PINK, PINK_SOFT } from '$lib/glow-kit';

	/**
	 * The whole "300 comments in, one atom out" scene on one canvas: comment
	 * particles stream out of the pill cluster on the left, converge in flight,
	 * and are absorbed by a spinning atom on the right. When the container is
	 * stacked (mobile), the stream flows top to bottom instead.
	 *
	 * three.js loads dynamically; the loop only runs while on screen; reduced
	 * motion gets a single static frame.
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

			/* ---- Atom ---- */
			const atom = new THREE.Group();
			scene.add(atom);

			{
				const n = 140;
				const pos = new Float32Array(n * 3);
				const v = new THREE.Vector3();
				for (let i = 0; i < n; i++) {
					v.randomDirection().multiplyScalar(0.5 * Math.cbrt(Math.random()));
					pos[i * 3] = v.x;
					pos[i * 3 + 1] = v.y;
					pos[i * 3 + 2] = v.z;
				}
				atom.add(kit.points(pos, 0.17, 0.9).obj);
				atom.add(kit.sprite(2.7, 0.5, PINK));
			}

			const A = 3;
			const B = 1.18;
			const TRAIL = 16;
			const shells: [number, number][] = [
				[0.9, 0],
				[1.35, Math.PI / 3],
				[0.55, -Math.PI / 3]
			];
			const electrons: { dots: ReturnType<typeof kit.sprite>[]; speed: number; phase: number }[] =
				[];

			shells.forEach(([tiltX, tiltZ], k) => {
				const pivot = new THREE.Group();
				pivot.rotation.x = tiltX;
				pivot.rotation.z = tiltZ;
				atom.add(pivot);

				const pts = new THREE.EllipseCurve(0, 0, A, B, 0, Math.PI * 2).getPoints(160);
				const geo = kit.track(new THREE.BufferGeometry().setFromPoints(pts));
				const mat = kit.track(
					new THREE.LineBasicMaterial({ color: PINK, transparent: true, opacity: 0.15 })
				);
				pivot.add(new THREE.LineLoop(geo, mat));

				const dots = [kit.sprite(0.44, 1)];
				for (let i = 1; i < TRAIL; i++) {
					dots.push(kit.sprite(0.34 * (1 - i / TRAIL) + 0.08, 0.4 * (1 - i / TRAIL)));
				}
				for (const d of dots) pivot.add(d);
				electrons.push({ dots, speed: [4.8, -3.9, 4.4][k], phase: (k * Math.PI * 2) / 3 });
			});

			/* ---- Comment stream ---- */
			const N = 110;
			const streamPos = new Float32Array(N * 3);
			const p = new Float32Array(N);
			const sp = new Float32Array(N);
			const x0 = new Float32Array(N);
			const y0 = new Float32Array(N);
			const wob = new Float32Array(N);
			const stream = kit.points(streamPos, 0.13, 0.8, PINK_SOFT, true);
			scene.add(stream.obj);

			// Layout state, filled in by size().
			let vertical = false;
			let halfW = 1;
			let halfH = 1;
			const spawn = { x: [0, 0], y: [0, 0] };

			const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);

			const respawn = (i: number, stagger = false) => {
				p[i] = stagger ? -Math.random() : 0;
				sp[i] = rand(0.28, 0.5);
				x0[i] = rand(spawn.x[0], spawn.x[1]);
				y0[i] = rand(spawn.y[0], spawn.y[1]);
				wob[i] = rand(-0.5, 0.5);
			};

			const updateStream = () => {
				const ax = atom.position.x;
				const ay = atom.position.y;
				for (let i = 0; i < N; i++) {
					if (p[i] >= 1) respawn(i);
					const t = Math.max(p[i], 0);
					const e = t * t * (3 - 2 * t);
					streamPos[i * 3] = x0[i] + (ax - x0[i]) * e;
					streamPos[i * 3 + 1] = y0[i] + (ay - y0[i]) * e + Math.sin(t * Math.PI) * wob[i];
					streamPos[i * 3 + 2] = Math.sin(t * Math.PI) * wob[i] * 0.6;
				}
				stream.attr.needsUpdate = true;
			};

			const clock = new THREE.Clock();
			let t = 0;

			const render = () => {
				atom.rotation.y = t * 0.16;
				atom.rotation.x = 0.42 + Math.sin(t * 0.09) * 0.07;
				for (const e of electrons) {
					const head = e.phase + t * e.speed;
					e.dots.forEach((d, i) => {
						const a = head - Math.sign(e.speed) * i * 0.085;
						d.position.set(A * Math.cos(a), B * Math.sin(a), 0);
					});
				}
				updateStream();
				renderer.render(scene, camera);
			};

			const loop = () => {
				const dt = Math.min(clock.getDelta(), 0.05);
				t += dt;
				for (let i = 0; i < N; i++) p[i] += sp[i] * dt;
				render();
				raf = requestAnimationFrame(loop);
			};

			const size = () => {
				const w = wrap.clientWidth;
				const h = wrap.clientHeight;
				renderer.setSize(w, h, false);
				camera.aspect = w / h;
				camera.updateProjectionMatrix();

				halfH = Math.tan((FOV * Math.PI) / 360) * CAM_Z;
				halfW = halfH * camera.aspect;
				vertical = h > w * 0.95;

				if (vertical) {
					atom.position.set(0, -halfH * 0.42, 0);
					atom.scale.setScalar(Math.min(1, (halfW * 0.75) / 4.2));
					spawn.x = [-halfW * 0.7, halfW * 0.7];
					spawn.y = [halfH * 0.35, halfH * 0.95];
				} else {
					atom.position.set(halfW * 0.45, 0, 0);
					atom.scale.setScalar(Math.min(1, (halfW * 0.5) / 4.2, halfH / 3.6));
					spawn.x = [-halfW * 0.95, -halfW * 0.3];
					spawn.y = [-halfH * 0.6, halfH * 0.6];
				}
				for (let i = 0; i < N; i++) respawn(i, true);
				for (let i = 0; i < N; i++) p[i] += Math.random(); // pre-roll the stream
				render();
			};
			size();
			const ro = new ResizeObserver(size);
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
