<script lang="ts">
	import { page } from '$app/state';

	let {
		title,
		description,
		image = '/og.jpg',
		type = 'website',
		noindex = false
	}: {
		title: string;
		description?: string;
		image?: string;
		type?: 'website' | 'article';
		noindex?: boolean;
	} = $props();

	// Canonical and share URLs follow the host that served the page, so the
	// same build is right on the Vercel URL today and on mindplex.ai later.
	// ponytail: origin-based; add PUBLIC_SITE_URL if a proxy ever rewrites Host.
	const url = $derived(`${page.url.origin}${page.url.pathname}`);
	const imageUrl = $derived(image.startsWith('http') ? image : `${page.url.origin}${image}`);
</script>

<svelte:head>
	<title>{title}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
	<link rel="canonical" href={url} />
	{#if noindex}
		<meta name="robots" content="noindex" />
	{/if}
	<meta property="og:site_name" content="Mindplex" />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	{#if description}
		<meta property="og:description" content={description} />
	{/if}
	<meta property="og:image" content={imageUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@Mindplex_AI" />
</svelte:head>
