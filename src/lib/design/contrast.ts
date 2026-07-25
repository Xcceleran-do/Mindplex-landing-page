function channelLuminance(value: number): number {
	const c = value / 255;
	return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function parseHex(hex: string): [number, number, number] {
	const clean = hex.replace('#', '');
	if (clean.length !== 6) {
		throw new Error(`Expected a 6-digit hex colour, received "${hex}"`);
	}
	return [
		parseInt(clean.slice(0, 2), 16),
		parseInt(clean.slice(2, 4), 16),
		parseInt(clean.slice(4, 6), 16)
	];
}

/** WCAG 2.1 relative luminance, 0 for black and 1 for white. */
export function relativeLuminance(hex: string): number {
	const [r, g, b] = parseHex(hex);
	return (
		0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b)
	);
}

/** WCAG 2.1 contrast ratio, from 1 (identical) to 21 (black on white). */
export function contrastRatio(a: string, b: string): number {
	const la = relativeLuminance(a);
	const lb = relativeLuminance(b);
	const lighter = Math.max(la, lb);
	const darker = Math.min(la, lb);
	return (lighter + 0.05) / (darker + 0.05);
}
