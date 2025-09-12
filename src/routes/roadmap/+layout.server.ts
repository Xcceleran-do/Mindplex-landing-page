import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ url }) => {
    const currentYear = new Date().getFullYear();
    const parentUrl = url.pathname.split('/').pop();

    if (parentUrl === 'roadmap') {
        redirect(301, `/roadmap/q2_${currentYear}`);
    }
}) satisfies LayoutServerLoad;