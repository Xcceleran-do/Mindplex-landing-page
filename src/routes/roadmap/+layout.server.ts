import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';


export const load = (async ({ url }) => {
    const currentYear = new Date().getFullYear();
    const parentUrl = url.pathname.split('/').pop()
    if (parentUrl === 'roadmap') {
        redirect(301, `/roadmap/q1_${currentYear}`)
    }
    // /roadmap/2024
    // console.log(roadmapData)
    // return { roadmapData, currentYear };
}) satisfies LayoutServerLoad;