import type { Action } from 'svelte/action';

interface RevealOptions {
	/**
	 * How far up from the viewport's bottom edge the element must travel
	 * before it reveals, as a CSS length or percentage. Larger values
	 * reveal later.
	 */
	revealMargin?: string;
}

/**
 * Marks a node as revealed once it enters the viewport.
 *
 * IntersectionObserver is the baseline rather than the fallback, because
 * CSS scroll-driven animation is still missing from Firefox and older
 * Safari, and a page that silently never reveals is worse than one that
 * never animates.
 *
 * Uses rootMargin with a zero threshold rather than an area ratio. A
 * ratio is a fraction of the ELEMENT's area, so anything taller than
 * `viewport / ratio` can never reach it and would stay hidden forever.
 */
export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options) => {
	const prefersReducedMotion =
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
		node.dataset.revealed = 'true';
		return {};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				node.dataset.revealed = 'true';
				observer.unobserve(entry.target);
			}
		},
		{ threshold: 0, rootMargin: `0px 0px -${options?.revealMargin ?? '12%'} 0px` }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
