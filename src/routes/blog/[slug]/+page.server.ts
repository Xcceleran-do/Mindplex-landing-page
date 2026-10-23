import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { loadBlog } from '$lib/blogs';

// A magazine article already owned this slug, so the migration renamed the blog post.
const RENAMED: Record<string, string> = {
	'contribute-to-mindplex': 'contribute-to-mindplex-21645'
};

export const load = (async ({ fetch, params }) => {
	const renamed = RENAMED[params.slug];
	if (renamed) redirect(301, `/blog/${renamed}`);

	let blog;
	try {
		blog = await loadBlog(fetch, params.slug);
	} catch {
		error(500, 'Failed to load blog. Please try again later.');
	}
	if (!blog) error(404, 'Blog not found');

	return { blog };
}) satisfies PageServerLoad;
