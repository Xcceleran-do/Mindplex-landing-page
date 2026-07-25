import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Footer from './Footer.svelte';

describe('Footer', () => {
	it('carries no display headline, so it does not restate the hero', async () => {
		const { container } = render(Footer);
		expect(container.querySelector('.display-xl, .display-l, .display-m')).toBeNull();
	});

	it('uses label-styled headings for the link columns', async () => {
		const { container } = render(Footer);
		const headings = [...container.querySelectorAll('h2')];
		expect(headings).toHaveLength(3);
		for (const heading of headings) {
			expect(heading.classList.contains('label')).toBe(true);
		}
	});

	it('groups links under three labelled navigations', async () => {
		render(Footer);
		await expect
			.element(page.getByRole('navigation', { name: 'Explore Mindplex' }))
			.toBeInTheDocument();
		await expect
			.element(page.getByRole('navigation', { name: 'Mindplex community' }))
			.toBeInTheDocument();
		await expect
			.element(page.getByRole('navigation', { name: 'Mindplex social channels' }))
			.toBeInTheDocument();
	});

	it('links contribution with the canonical label', async () => {
		render(Footer);
		await expect.element(page.getByRole('link', { name: 'Start writing' })).toBeInTheDocument();
	});
});
