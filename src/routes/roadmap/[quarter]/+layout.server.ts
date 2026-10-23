// WordPress snapshot taken 2026-10-23 before the CMS shut down; edit the file to change the roadmap.
import roadmapData from '$lib/data/roadmap.json';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const { quarter } = params;

	// Helper to parse slug with either underscore or hyphen
	const parseSlug = (slug: string) => {
		const delimiter = slug.includes('_') ? '_' : '-';
		const [q, y] = slug.split(delimiter);
		return { quarter: Number(q.replace('q', '')), year: Number(y) };
	};

	const roadmaps = [...roadmapData].sort((a, b) => {
		const aParsed = parseSlug(a.slug);
		const bParsed = parseSlug(b.slug);
		const yearDiff = aParsed.year - bParsed.year;
		if (yearDiff !== 0) return yearDiff;
		return aParsed.quarter - bParsed.quarter;
	});

	const currentIndex = roadmaps.findIndex((r) => r.slug === quarter);
	if (currentIndex === -1) {
		throw redirect(307, `/roadmap/${roadmaps[roadmaps.length - 1].slug}`);
	}

	let navigationData = [];

	if (currentIndex <= 1) {
		navigationData = roadmaps.slice(0, 4);
	} else if (currentIndex >= roadmaps.length - 2) {
		navigationData = roadmaps.slice(-4);
	} else {
		navigationData = roadmaps.slice(currentIndex - 1, currentIndex + 3);
	}

	const contentData = [roadmaps[currentIndex]];
	const active = quarter;

	return { navigationData, contentData, active };
}) satisfies LayoutServerLoad;
