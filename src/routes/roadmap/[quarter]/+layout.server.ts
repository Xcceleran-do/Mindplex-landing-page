import { PUBLIC_MINDPLEX_API_URL } from '$env/static/public';
import type { LayoutServerLoad } from '../$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ fetch, params }) => {
    const roadmapEndpoint = `${PUBLIC_MINDPLEX_API_URL}/mp_roadmap/v1/roadmaps?page=1&per_page=30`;
    const roadmap = await fetch(roadmapEndpoint);
    const roadmapData = await roadmap.json();
    const { quarter } = params;
    console.log({ roadmapData, quarter });

    // Helper to parse slug with either underscore or hyphen
    const parseSlug = (slug: string) => {
        const delimiter = slug.includes('_') ? '_' : '-';
        const [q, y] = slug.split(delimiter);
        return { quarter: Number(q.replace('q', '')), year: Number(y) };
    };

    const roadmaps = roadmapData.roadmaps.sort((a, b) => {
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
    }
    else if (currentIndex >= roadmaps.length - 2) {
        navigationData = roadmaps.slice(-4);
    }
    else {
        navigationData = roadmaps.slice(currentIndex - 1, currentIndex + 3);
    }

    let contentData = [roadmaps[currentIndex]];
    const active = quarter;

    return { navigationData, contentData, active };
}) satisfies LayoutServerLoad;