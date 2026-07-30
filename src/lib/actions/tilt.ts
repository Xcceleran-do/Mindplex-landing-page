type TiltOptions = {
	/** Maximum rotation on each axis, in degrees. */
	max?: number;
	/** How far the element lifts toward the viewer at full tilt, in pixels. */
	lift?: number;
};

/**
 * Tilts an element in 3D toward the pointer, giving a flat image a sense of
 * depth without a WebGL runtime.
 *
 * Writes directly to CSS custom properties rather than component state, so
 * pointer movement never triggers a Svelte re-render.
 *
 * Mouse input is detected per event via `pointerType` rather than up front via
 * a `(pointer: fine)` media query: browsers do not reliably know the input
 * device at mount, so querying early reports no pointer and the effect never
 * starts. Reduced motion is still honored, since that preference is known
 * immediately and can change.
 */
export function tilt(node: HTMLElement, options: TiltOptions = {}) {
	const { max = 9, lift = 18 } = options;

	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
	let frame = 0;

	const apply = (rx: number, ry: number, z: number) => {
		node.style.setProperty('--tilt-x', `${rx}deg`);
		node.style.setProperty('--tilt-y', `${ry}deg`);
		node.style.setProperty('--tilt-z', `${z}px`);
	};

	const reset = () => {
		cancelAnimationFrame(frame);
		frame = 0;
		apply(0, 0, 0);
	};

	const onPointerMove = (event: PointerEvent) => {
		// Touch and pen drag the element under the finger; only mouse hover reads
		// as the object turning to follow you.
		if (event.pointerType !== 'mouse') return;
		if (reduced.matches || frame) return;

		frame = requestAnimationFrame(() => {
			frame = 0;
			const rect = node.getBoundingClientRect();
			if (!rect.width || !rect.height) return;
			// -0.5 .. 0.5 relative to the element's centre.
			const px = (event.clientX - rect.left) / rect.width - 0.5;
			const py = (event.clientY - rect.top) / rect.height - 0.5;
			// Pointer above centre tips the top away, hence the negation.
			apply(-py * max * 2, px * max * 2, lift);
		});
	};

	window.addEventListener('pointermove', onPointerMove, { passive: true });
	node.addEventListener('pointerleave', reset);
	reduced.addEventListener('change', reset);

	return {
		destroy() {
			window.removeEventListener('pointermove', onPointerMove);
			node.removeEventListener('pointerleave', reset);
			reduced.removeEventListener('change', reset);
			cancelAnimationFrame(frame);
		}
	};
}
