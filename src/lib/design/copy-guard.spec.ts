import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

function svelteFiles(dir: string, found: string[] = []): string[] {
	for (const entry of readdirSync(dir)) {
		const path = join(dir, entry);
		if (statSync(path).isDirectory()) svelteFiles(path, found);
		else if (path.endsWith('.svelte')) found.push(path);
	}
	return found;
}

const files = svelteFiles('src').map((path) => ({ path, source: readFileSync(path, 'utf8') }));

const RETIRED_CTAS = [
	'Enter Mindplex',
	'Explore the magazine',
	'Browse the latest stories',
	'Contribute to Mindplex',
	'Meet the community',
	'See what is inside'
];

describe('copy guard', () => {
	it('finds Svelte files to check', () => {
		expect(files.length).toBeGreaterThan(5);
	});

	it('contains no em-dashes or en-dashes', () => {
		const offenders = files.filter((f) => /[–—]/.test(f.source)).map((f) => f.path);
		expect(offenders).toEqual([]);
	});

	it('never writes Al where AI is meant', () => {
		const offenders = files.filter((f) => /\bAl\b/.test(f.source)).map((f) => f.path);
		expect(offenders).toEqual([]);
	});

	it('uses one CTA label per intent', () => {
		const offenders: string[] = [];
		for (const file of files) {
			for (const retired of RETIRED_CTAS) {
				if (file.source.includes(retired)) offenders.push(`${file.path}: "${retired}"`);
			}
		}
		expect(offenders).toEqual([]);
	});

	it('ships no placeholder mathematics or unfinished copy', () => {
		const offenders = files
			.filter((f) => /T = XXX|TODO|TBD|Lorem ipsum/i.test(f.source))
			.map((f) => f.path);
		expect(offenders).toEqual([]);
	});
});
