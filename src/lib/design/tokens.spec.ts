import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { channels } from './channels';

const css = readFileSync('src/app.css', 'utf8');

function readToken(name: string): string {
	const match = css.match(new RegExp(`${name}\\s*:\\s*([^;]+);`));
	if (!match) throw new Error(`Token ${name} is not declared in src/app.css`);
	return match[1].trim();
}

describe('app.css tokens', () => {
	it('declares every channel with the hex from channels.ts', () => {
		for (const channel of channels) {
			expect(readToken(channel.cssVar).toUpperCase()).toBe(channel.hex.toUpperCase());
		}
	});

	it('points the single accent at the Intelligence channel', () => {
		expect(readToken('--accent')).toBe('var(--ch-intelligence)');
	});

	it('declares the surface scale', () => {
		expect(readToken('--page').toUpperCase()).toBe('#121317');
		expect(readToken('--surface').toUpperCase()).toBe('#191B20');
		expect(readToken('--ink').toUpperCase()).toBe('#EDF0F3');
		expect(readToken('--on-accent').toUpperCase()).toBe('#0B1410');
	});

	it('declares exactly two radius tokens, so the shape system cannot fragment', () => {
		const radii = css.match(/--radius-[a-z]+\s*:/g) ?? [];
		expect(radii.sort()).toEqual(['--radius-control:', '--radius-media:']);
	});
});
