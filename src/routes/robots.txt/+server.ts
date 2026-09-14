import type { RequestHandler } from './$types';

// Legacy routes are hidden with a noindex meta tag, not a Disallow here: a
// crawler must be able to fetch them to see that tag.
export const GET: RequestHandler = ({ url }) =>
	new Response(`User-agent: *\nAllow: /\n\nSitemap: ${url.origin}/sitemap.xml\n`, {
		headers: { 'Content-Type': 'text/plain' }
	});
