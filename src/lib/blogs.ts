const API_URL = 'https://api.mindplex.ai/v1';

export type Blog = {
	id: number;
	title: string;
	description: string;
	content: string;
	photo_url: string;
	post_slug: string;
	created_at: string;
};

type ApiPost = {
	id: number;
	title: string;
	slug: string;
	type: string;
	excerpt: string | null;
	content?: string | null;
	publishedAt: string | null;
	createdAt: string;
	postMedia?: { role: string; media: { url: string } }[];
};

const toBlog = (post: ApiPost): Blog => ({
	id: post.id,
	title: post.title,
	description: post.excerpt ?? '',
	content: post.content ?? '',
	photo_url: post.postMedia?.find((m) => m.role === 'thumbnail')?.media.url ?? '',
	post_slug: post.slug,
	created_at: post.publishedAt ?? post.createdAt
});

// The listing must render when the API is unreachable: failures collapse to an
// empty list and callers show their empty state instead of a 500.
export async function loadBlogs(fetch: typeof globalThis.fetch): Promise<Blog[]> {
	try {
		const response = await fetch(
			`${API_URL}/posts?type=blog&include=media&sortBy=publishedAt&sortOrder=desc&limit=100`
		);
		if (!response.ok) return [];

		const { data } = await response.json();
		return Array.isArray(data) ? data.map(toBlog) : [];
	} catch {
		return [];
	}
}

// Slugs share one namespace with magazine articles, so only a blog-typed post counts as found.
export async function loadBlog(fetch: typeof globalThis.fetch, slug: string): Promise<Blog | null> {
	const response = await fetch(`${API_URL}/posts/${encodeURIComponent(slug)}?include=media`);
	if (response.status === 404) return null;
	if (!response.ok) throw new Error(`Blog request failed: ${response.status}`);

	const { data } = await response.json();
	return data?.type === 'blog' ? toBlog(data) : null;
}
