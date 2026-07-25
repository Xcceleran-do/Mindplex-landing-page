import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Navbar from './Navbar.svelte';

describe('Navbar', () => {
	it('exposes the primary platform CTA with the canonical label', async () => {
		// Desktop viewport: the CTA lives in .desktop-actions, hidden below the
		// component's own 68rem breakpoint. The vitest-browser default viewport
		// (414x896) is narrower than that, so it must be widened explicitly.
		await page.viewport(1440, 900);
		render(Navbar);
		const cta = page.getByRole('link', { name: 'Open Mindplex' });
		await expect.element(cta).toBeInTheDocument();
	});

	it('offers sign in separately from the platform CTA', async () => {
		await page.viewport(1440, 900);
		render(Navbar);
		await expect.element(page.getByRole('link', { name: 'Sign in' })).toBeInTheDocument();
	});

	it('labels the menu button and reports its expanded state', async () => {
		// Narrow viewport: the menu button only renders below the 68rem breakpoint.
		await page.viewport(414, 896);
		render(Navbar);
		const button = page.getByRole('button', { name: 'Open navigation' });
		await expect.element(button).toHaveAttribute('aria-expanded', 'false');
		await button.click();
		await expect
			.element(page.getByRole('button', { name: 'Close navigation' }))
			.toHaveAttribute('aria-expanded', 'true');
	});

	it('sets the wordmark in Michroma', async () => {
		render(Navbar);
		const wordmark = page.getByText('Mindplex', { exact: true });
		await expect.element(wordmark).toBeInTheDocument();
		const family = getComputedStyle(wordmark.element()).fontFamily;
		expect(family).toContain('Michroma');
	});
});
