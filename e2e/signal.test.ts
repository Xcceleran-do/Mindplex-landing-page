import { expect, test } from '@playwright/test';

test('Archivo variable font loads with weight and width axes', async ({ page }) => {
	await page.goto('/');
	await page.evaluate(() => document.fonts.ready);

	const archivo = await page.evaluate(() =>
		[...document.fonts]
			.filter((f) => f.family === 'Archivo')
			.map((f) => `${f.weight}|${f.stretch}|${f.status}`)
	);

	expect(archivo).toContain('100 900|62% 125%|loaded');
});

test('Michroma is declared, ready for the wordmark in a later task', async ({ page }) => {
	await page.goto('/');
	await page.evaluate(() => document.fonts.ready);

	const michroma = await page.evaluate(
		() => [...document.fonts].filter((f) => f.family === 'Michroma').length
	);

	expect(michroma).toBe(1);
});

test('body text renders in Archivo, not a system fallback', async ({ page }) => {
	await page.goto('/');
	await page.evaluate(() => document.fonts.ready);

	const family = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
	expect(family).toContain('Archivo');
	expect(family).not.toContain('-apple-system');
});
