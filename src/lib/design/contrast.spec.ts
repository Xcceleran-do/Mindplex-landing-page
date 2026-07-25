import { describe, expect, it } from 'vitest';
import { contrastRatio, relativeLuminance } from './contrast';
import { channels } from './channels';

const PAGE = '#121317';

describe('contrast utilities', () => {
	it('computes a known ratio', () => {
		expect(contrastRatio('#FFFFFF', '#000000')).toBeCloseTo(21, 1);
	});
});

describe('channel palette', () => {
	it('has exactly four channels in a fixed order', () => {
		expect(channels.map((c) => c.id)).toEqual(['intelligence', 'cosmos', 'mind', 'commons']);
	});

	it('gives every channel 9.19:1 against the page surface', () => {
		for (const channel of channels) {
			expect(contrastRatio(channel.hex, PAGE)).toBeCloseTo(9.19, 1);
		}
	});

	it('holds every channel at the same relative luminance, so none reads louder', () => {
		const luminances = channels.map((c) => relativeLuminance(c.hex));
		const spread = Math.max(...luminances) - Math.min(...luminances);
		expect(spread).toBeLessThan(0.005);
	});

	it('keeps every channel legible as small text at WCAG AA', () => {
		for (const channel of channels) {
			expect(contrastRatio(channel.hex, PAGE)).toBeGreaterThanOrEqual(4.5);
		}
	});
});
