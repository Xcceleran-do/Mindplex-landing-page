import { expect, test } from '@playwright/test';

test('Archivo variable font loads with weight and width axes', async ({ page }) => {
	await page.goto('/');
	await page.evaluate(() => document.fonts.ready);

	const loaded = await page.evaluate(() =>
		[...document.fonts].map((f) => `${f.family}|${f.weight}|${f.stretch}|${f.status}`)
	);

	expect(loaded).toContain('Archivo|100 900|62% 125%|loaded');
	expect(loaded).toContain('Michroma|400|normal|loaded');
});

test('body text renders in Archivo, not a system fallback', async ({ page }) => {
	await page.goto('/');
	await page.evaluate(() => document.fonts.ready);

	const family = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
	expect(family).toContain('Archivo');
	expect(family).not.toContain('-apple-system');
});
