import type { PageServerLoad } from './$types';
import { loadBlogs } from '$lib/blogs';

export const load = (async ({ fetch }) => ({
	blogs: await loadBlogs(fetch)
})) satisfies PageServerLoad;
