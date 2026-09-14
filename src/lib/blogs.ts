import { PUBLIC_MINDPLEX_API_URL } from '$env/static/public';

export type Blog = {
	id: number;
	title: string;
	description: string;
	photo_url: string;
	post_slug: string;
	created_at: string;
};

// The listing must render when the CMS is unreachable: failures collapse to an
// empty list and callers show their empty state instead of a 500.
export async function loadBlogs(fetch: typeof globalThis.fetch): Promise<Blog[]> {
	try {
		const response = await fetch(`${PUBLIC_MINDPLEX_API_URL}/mp_landing/v1/blogs`);
		if (!response.ok) return [];

		const data = await response.json();
		return data.success && Array.isArray(data.blogs) ? data.blogs : [];
	} catch {
		return [];
	}
}
