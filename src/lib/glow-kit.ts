import type * as ThreeNS from 'three';

/**
 * Shared bits for the three.js canvases (compression scene, engine loop).
 * THREE is passed in because each component imports the library dynamically,
 * keeping it out of the initial bundle.
 */

/** Brand pink, hardcoded: THREE.Color cannot parse the oklch tokens. */
export const PINK = 0xf06daa;
export const PINK_SOFT = 0xff9ccb;

export function makeKit(THREE: typeof ThreeNS) {
	const disposables: { dispose(): void }[] = [];
	const track = <T extends { dispose(): void }>(r: T): T => {
		disposables.push(r);
		return r;
	};

	// Soft radial glow texture, generated in-place instead of shipped.
	const c = document.createElement('canvas');
	c.width = c.height = 64;
	const g = c.getContext('2d')!;
	const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
	grad.addColorStop(0, 'rgba(255,255,255,1)');
	grad.addColorStop(0.3, 'rgba(255,156,203,0.6)');
	grad.addColorStop(1, 'rgba(240,109,170,0)');
	g.fillStyle = grad;
	g.fillRect(0, 0, 64, 64);
	const glow = track(new THREE.CanvasTexture(c));

	const sprite = (scale: number, opacity: number, color: number = PINK_SOFT) => {
		const s = new THREE.Sprite(
			track(
				new THREE.SpriteMaterial({
					map: glow,
					color,
					transparent: true,
					opacity,
					blending: THREE.AdditiveBlending,
					depthWrite: false
				})
			)
		);
		s.scale.setScalar(scale);
		return s;
	};

	const points = (
		positions: Float32Array,
		size: number,
		opacity: number,
		color: number = PINK,
		dynamic = false
	) => {
		const geo = track(new THREE.BufferGeometry());
		const attr = new THREE.BufferAttribute(positions, 3);
		if (dynamic) attr.setUsage(THREE.DynamicDrawUsage);
		geo.setAttribute('position', attr);
		const mat = track(
			new THREE.PointsMaterial({
				map: glow,
				color,
				size,
				transparent: true,
				opacity,
				blending: THREE.AdditiveBlending,
				depthWrite: false
			})
		);
		return { obj: new THREE.Points(geo, mat), attr };
	};

	return { track, glow, sprite, points, dispose: () => disposables.forEach((d) => d.dispose()) };
}
