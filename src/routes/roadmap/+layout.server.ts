import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

const url = "http://localhost:8787"
export const load = (async ({ fetch, url }) => {
    const currentYear = new Date().getFullYear();
    const parentUrl = url.pathname.split('/').pop()
    if (parentUrl === 'roadmap') {
        redirect(301, `/roadmap/${currentYear}`)
    }
    // /roadmap/2024
    // console.log(roadmapData)
    // return { roadmapData, currentYear };
}) satisfies LayoutServerLoad;