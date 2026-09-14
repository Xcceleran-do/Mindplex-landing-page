<script lang="ts">
	import Search from '@lucide/svelte/icons/search';
	import { reveal } from '$lib/actions/reveal';
	import Seo from '$lib/components/Seo.svelte';

	type Blog = {
		id: number;
		title: string;
		description: string;
		photo_url: string;
		post_slug: string;
		created_at: string;
	};

	const { data } = $props();
	const blogs: Blog[] = data.blogs;
	let searchQuery = $state('');

	const filteredBlogs = $derived(
		blogs.filter(
			(blog) =>
				blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				blog.description.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	const formatDate = (dateString: string) =>
		new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});

	const stripHtml = (html: string) =>
		html
			? html
					.replace(/<[^>]*>/g, '')
					.replace(/&[^;]+;/g, ' ')
					.trim()
			: '';
</script>

<Seo
	title="Blog | Mindplex"
	description="Notes and updates from the team building Mindplex and OmegaPlex."
/>

<div class="landing-shell">
	<section class="section">
		<div class="section-wide">
			<div use:reveal class="blog-head">
				<div>
					<h1 class="landing-heading">The Mindplex blog.</h1>
					<p class="landing-lead">
						Notes and updates from the team building Mindplex and OmegaPlex.
					</p>
				</div>

				<label class="blog-search">
					<Search size={17} strokeWidth={2} aria-hidden="true" />
					<input type="search" placeholder="Search posts" bind:value={searchQuery} />
					<span class="sr-only">Search posts</span>
				</label>
			</div>

			{#if filteredBlogs.length > 0}
				{#if searchQuery}
					<p class="blog-count tnum" aria-live="polite">
						{filteredBlogs.length}
						{filteredBlogs.length === 1 ? 'post matches' : 'posts match'} &ldquo;{searchQuery}&rdquo;
					</p>
				{/if}

				<ul class="blog-grid">
					{#each filteredBlogs as blog (blog.id)}
						<li>
							<a href="/blog/{blog.post_slug}">
								{#if blog.photo_url}
									<img src={blog.photo_url} alt="" loading="lazy" />
								{:else}
									<div class="blog-placeholder" aria-hidden="true"></div>
								{/if}
								<p class="blog-date tnum">{formatDate(blog.created_at)}</p>
								<h2>{blog.title}</h2>
								<p class="blog-excerpt">{stripHtml(blog.description)}</p>
							</a>
						</li>
					{/each}
				</ul>
			{:else}
				<div class="blog-empty">
					{#if searchQuery}
						<p>No posts match &ldquo;{searchQuery}&rdquo;.</p>
						<button type="button" onclick={() => (searchQuery = '')}>Clear search</button>
					{:else}
						<p>No posts yet. Check back soon.</p>
					{/if}
				</div>
			{/if}
		</div>
	</section>
</div>

<style>
	.blog-head {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 2rem 3rem;
		flex-wrap: wrap;
	}

	.blog-search {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		min-height: 3rem;
		min-width: 17rem;
		border: 1px solid var(--border-strong);
		border-radius: 999px;
		background: var(--surface);
		padding-inline: 1.1rem;
		color: var(--muted-foreground);
		transition: border-color 180ms ease;
	}

	.blog-search:focus-within {
		border-color: var(--accent);
	}

	.blog-search input {
		flex: 1;
		background: none;
		border: none;
		outline: none;
		font-size: 0.9375rem;
		color: var(--foreground);
	}

	.blog-search input::placeholder {
		color: var(--muted-foreground);
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.blog-count {
		margin-top: 3rem;
		font-size: 0.875rem;
		color: var(--muted-foreground);
	}

	.blog-grid {
		display: grid;
		gap: clamp(2rem, 3.5vw, 3rem) clamp(1.5rem, 3vw, 2.5rem);
		margin-top: 3rem;
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.blog-count + .blog-grid {
		margin-top: 1.5rem;
	}

	.blog-grid a {
		display: block;
		height: 100%;
	}

	.blog-grid img,
	.blog-placeholder {
		aspect-ratio: 3 / 2;
		width: 100%;
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		object-fit: cover;
		transition: border-color 180ms ease;
	}

	.blog-placeholder {
		background:
			radial-gradient(circle at 30% 20%, var(--accent-wash), transparent 60%), var(--surface-raised);
	}

	.blog-grid a:hover img,
	.blog-grid a:hover .blog-placeholder {
		border-color: var(--border-strong);
	}

	.blog-date {
		margin-top: 1.25rem;
		font-size: 0.8125rem;
		font-weight: 620;
		color: var(--muted-foreground);
	}

	.blog-grid h2 {
		margin-top: 0.5rem;
		font-size: 1.25rem;
		font-weight: 710;
		line-height: 1.25;
		letter-spacing: -0.02em;
		transition: color 180ms ease;
	}

	.blog-grid a:hover h2 {
		color: var(--accent);
	}

	.blog-excerpt {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		margin-top: 0.6rem;
		font-size: 0.9375rem;
		line-height: 1.55;
		color: var(--muted-foreground);
	}

	.blog-empty {
		margin-top: 4rem;
		border-top: 1px solid var(--border-strong);
		padding-top: 3rem;
	}

	.blog-empty p {
		font-size: 1.05rem;
		color: var(--muted-foreground);
	}

	.blog-empty button {
		display: inline-flex;
		min-height: 2.75rem;
		align-items: center;
		margin-top: 1.25rem;
		border: 1px solid var(--border-strong);
		border-radius: 999px;
		background: var(--surface);
		padding-inline: 1.25rem;
		font-size: 0.875rem;
		font-weight: 650;
		transition: border-color 180ms ease;
	}

	.blog-empty button:hover {
		border-color: var(--accent);
	}

	@media (max-width: 1023px) {
		.blog-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 640px) {
		.blog-search {
			width: 100%;
		}

		.blog-grid {
			grid-template-columns: 1fr;
		}

		.blog-grid img,
		.blog-placeholder {
			aspect-ratio: 2 / 1;
		}
	}
</style>
