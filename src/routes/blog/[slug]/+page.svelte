<script lang="ts">
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const blog = data.blogs.blogs[0];
	const plainTitle = blog?.title?.replace(/<[^>]*>/g, '') ?? 'Blog';

	const formatDate = (dateString: string) =>
		new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});

	// WordPress ships YouTube links as bare embed wrappers; swap them for
	// real players.
	onMount(() => {
		const linkContainers: NodeListOf<HTMLDivElement> = document.querySelectorAll(
			'.wp-block-embed__wrapper'
		);
		linkContainers?.forEach((link) => {
			if (link.innerText.includes('youtube.com')) {
				const videoId = link.innerText.split('v=')[1];
				const iframe = document.createElement('iframe');
				iframe.width = '100%';
				iframe.height = '315';
				iframe.src = `https://www.youtube.com/embed/${videoId}`;
				iframe.title = 'YouTube video player';
				iframe.frameBorder = '0';
				iframe.allow =
					'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
				iframe.allowFullscreen = true;
				link.replaceWith(iframe);
			}
		});
	});
</script>

<svelte:head>
	<title>{plainTitle} | Mindplex</title>
</svelte:head>

<div class="landing-shell">
	<article class="section">
		<div class="article-col">
			<a href="/blog" class="article-back">
				<ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
				All posts
			</a>

			<h1 class="display article-title">{@html blog?.title}</h1>
			{#if blog?.created_at}
				<p class="article-date tnum">{formatDate(blog.created_at)}</p>
			{/if}

			<div class="article-body prose prose-invert">
				{@html blog?.description}
			</div>
		</div>
	</article>
</div>

<style>
	.article-col {
		margin-inline: auto;
		width: 100%;
		max-width: 44rem;
	}

	.article-back {
		display: inline-flex;
		min-height: 2.75rem;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		font-weight: 650;
		color: var(--muted-foreground);
		transition: color 180ms ease;
	}

	.article-back:hover {
		color: var(--accent);
	}

	.article-title {
		margin-top: 1.5rem;
	}

	.article-date {
		margin-top: 1.25rem;
		font-size: 0.875rem;
		font-weight: 620;
		color: var(--muted-foreground);
	}

	.article-body {
		margin-top: 3rem;
		max-width: none;
	}

	/* Theme the typography plugin's output to the site's tokens. */
	.article-body :global(a) {
		color: var(--accent);
		text-decoration-color: color-mix(in oklab, var(--accent) 45%, transparent);
	}

	.article-body :global(a:hover) {
		color: var(--accent-strong);
	}

	.article-body :global(h1),
	.article-body :global(h2),
	.article-body :global(h3),
	.article-body :global(h4) {
		letter-spacing: -0.025em;
		color: var(--foreground);
	}

	.article-body :global(img) {
		border: 1px solid var(--border);
		border-radius: 0.75rem;
	}

	.article-body :global(blockquote) {
		border-inline-start-color: var(--accent);
		font-family: var(--font-display);
		font-style: italic;
	}
</style>
