import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { PUBLIC_MINDPLEX_API_URL } from '$env/static/public'

export const load = (async ({ fetch }) => {
    try {
        const response = await fetch(`${PUBLIC_MINDPLEX_API_URL}/mp_landing/v1/blogs`);

        if (!response.ok) {
            throw error(response.status, `Failed to fetch blogs: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success) {
            return {
                blogs: data.blogs,
                success: true
            };
        } else {
            throw error(500, data.message || 'Failed to load blogs');
        }
    } catch (err) {
        // If it's already a SvelteKit error, re-throw it
        if (err && typeof err === 'object' && 'status' in err) {
            throw err;
        }

        // For other errors, throw a 500
        throw error(500, 'Failed to load blogs. Please try again later.');
    }
}) satisfies PageServerLoad;