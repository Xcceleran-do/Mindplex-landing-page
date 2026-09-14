import type { RequestHandler } from './$types';
import { loadBlogs } from '$lib/blogs';

const pages = ['/', '/omegaplex', '/blog'];

const lastmod = (date: string) => {
	const d = new Date(date);
	return Number.isNaN(d.getTime()) ? '' : `<lastmod>${d.toISOString().slice(0, 10)}</lastmod>`;
};

export const GET: RequestHandler = async ({ url, fetch }) => {
	const blogs = await loadBlogs(fetch);
	const entry = (path: string, date = '') =>
		`<url><loc>${url.origin}${path}</loc>${lastmod(date)}</url>`;
	const body =
		'<?xml version="1.0" encoding="UTF-8"?>' +
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
		pages.map((p) => entry(p)).join('') +
		blogs.map((b) => entry(`/blog/${b.post_slug}`, b.created_at)).join('') +
		'</urlset>';

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600' }
	});
};
