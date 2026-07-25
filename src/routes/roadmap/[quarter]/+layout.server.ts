import { PUBLIC_MINDPLEX_API_URL } from '$env/static/public';
import type { LayoutServerLoad } from '../$types';
import { redirect } from '@sveltejs/kit';

type RoadmapStep = {
	content_title: string;
	desc: string;
};

type Roadmap = {
	slug: string;
	name: string;
	description?: string;
	steps: RoadmapStep[];
};

export const load = (async ({ fetch, params }) => {
	const roadmapEndpoint = `${PUBLIC_MINDPLEX_API_URL}/mp_roadmap/v1/roadmaps?page=1&per_page=30`;
	const roadmap = await fetch(roadmapEndpoint);
	const roadmapData = (await roadmap.json()) as { roadmaps: Roadmap[] };
	const { quarter } = params;

	const parseSlug = (slug: string) => {
		const delimiter = slug.includes('_') ? '_' : '-';
		const [quarterPart = 'q0', yearPart = '0'] = slug.split(delimiter);
		return { quarter: Number(quarterPart.replace('q', '')), year: Number(yearPart) };
	};

	const roadmaps = [...roadmapData.roadmaps].sort((a, b) => {
		const aParsed = parseSlug(a.slug);
		const bParsed = parseSlug(b.slug);
		const yearDiff = aParsed.year - bParsed.year;
		if (yearDiff !== 0) return yearDiff;
		return aParsed.quarter - bParsed.quarter;
	});

	const currentIndex = roadmaps.findIndex((item) => item.slug === quarter);
	if (currentIndex === -1) {
		const latestRoadmap = roadmaps.at(-1);
		throw redirect(307, latestRoadmap ? `/roadmap/${latestRoadmap.slug}` : '/roadmap');
	}

	let navigationData: Roadmap[];

	if (currentIndex <= 1) {
		navigationData = roadmaps.slice(0, 4);
	} else if (currentIndex >= roadmaps.length - 2) {
		navigationData = roadmaps.slice(-4);
	} else {
		navigationData = roadmaps.slice(currentIndex - 1, currentIndex + 3);
	}

	const contentData = [roadmaps[currentIndex]];

	return { navigationData, contentData, active: quarter };
}) satisfies LayoutServerLoad;
