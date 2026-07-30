/**
 * Reveals an element once it scrolls into view, by setting `data-visible`.
 * The paired styles live in app.css and are scoped to `.js`, so this is purely
 * additive: without scripting the element renders in its final state.
 *
 * Uses IntersectionObserver rather than a scroll listener so nothing runs per
 * scroll frame.
 */
export function reveal(node: HTMLElement, delay = 0) {
	node.setAttribute('data-reveal', '');

	if (delay) {
		node.style.setProperty('--reveal-delay', `${delay}ms`);
	}

	// Honor the OS setting here too, not just in CSS: no point observing
	// elements whose transition has been disabled.
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
	if (reduced.matches || typeof IntersectionObserver === 'undefined') {
		node.setAttribute('data-visible', '');
		return {};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.setAttribute('data-visible', '');
				observer.unobserve(entry.target);
			}
		},
		{ threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
