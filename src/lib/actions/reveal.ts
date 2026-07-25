import type { Action } from 'svelte/action';

interface RevealOptions {
	/** Fraction of the element that must be visible before it reveals. */
	threshold?: number;
}

/**
 * Marks a node as revealed once it enters the viewport.
 *
 * IntersectionObserver is the baseline rather than the fallback, because
 * CSS scroll-driven animation is still missing from Firefox and older
 * Safari, and a page that silently never reveals is worse than one that
 * never animates.
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
		{ threshold: options?.threshold ?? 0.12 }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
