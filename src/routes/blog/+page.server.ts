import type { PageServerLoad } from './$types';
import { PUBLIC_MINDPLEX_API_URL } from '$env/static/public';

// The listing must render when the CMS is unreachable: failures collapse to an
// empty list and the page shows its empty state instead of a 500.
export const load = (async ({ fetch }) => {
	try {
		const response = await fetch(`${PUBLIC_MINDPLEX_API_URL}/mp_landing/v1/blogs`);
		if (!response.ok) return { blogs: [] };

		const data = await response.json();
		return { blogs: data.success && Array.isArray(data.blogs) ? data.blogs : [] };
	} catch {
		return { blogs: [] };
	}
}) satisfies PageServerLoad;
