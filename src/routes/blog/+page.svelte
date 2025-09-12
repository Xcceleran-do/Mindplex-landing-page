<script lang="ts">
	import { BlogCard } from '$lib/components/BlogCard';

	const { data } = $props();
	let searchQuery = $state('');

	const filteredBlogs = $derived(
		data.blogs.filter(
			(blog) =>
				blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				blog.description.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);
	$inspect(data);
</script>

<div class="min-h-screen bg-background">
	<section class="relative overflow-hidden border-b border-border/50 px-4 py-16 md:px-8 lg:px-16">
		<div class="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
		<div class="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-secondary/5 blur-3xl"></div>

		<div class="relative z-10 mx-auto max-w-7xl">
			<div class="space-y-6 text-center">
				<div
					class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/50 px-4 py-2 backdrop-blur-sm"
				>
					<div class="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
					<span class="text-sm text-muted-foreground">Insights & Updates</span>
				</div>

				<h1 class="text-4xl font-bold md:text-5xl lg:text-6xl">
					<span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
						Mindplex Blog
					</span>
				</h1>

				<p class="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
					Explore the latest insights on AI, blockchain, and the future of decentralized media.
				</p>

				<div class="mx-auto max-w-md">
					<div class="relative">
						<svg
							class="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							></path>
						</svg>
						<input
							type="text"
							placeholder="Search blog posts..."
							bind:value={searchQuery}
							class="w-full rounded-full border border-border/50 bg-card/50 py-3 pr-4 pl-10 text-sm backdrop-blur-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="px-4 py-12 md:px-8 lg:px-16">
		<div class="mx-auto max-w-7xl">
			{#if filteredBlogs.length > 0}
				{#if searchQuery}
					<div class="mb-8">
						<p class="text-sm text-muted-foreground">
							Found {filteredBlogs.length} post{filteredBlogs.length !== 1 ? 's' : ''} matching "{searchQuery}"
						</p>
					</div>
				{/if}

				<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each filteredBlogs as blog}
						<BlogCard {blog} />
					{/each}
				</div>
			{:else if searchQuery}
				<div class="py-20 text-center">
					<div
						class="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
					>
						<svg
							class="h-10 w-10 text-muted-foreground"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							></path>
						</svg>
					</div>
					<h3 class="mb-2 text-xl font-semibold text-foreground">No posts found</h3>
					<p class="text-muted-foreground">
						No blog posts match your search for "{searchQuery}". Try different keywords.
					</p>
					<button
						onclick={() => (searchQuery = '')}
						class="mt-4 rounded-lg border border-border bg-card px-4 py-2 text-sm transition-colors hover:bg-accent"
					>
						Clear search
					</button>
				</div>
			{:else}
				<div class="py-20 text-center">
					<div
						class="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
					>
						<svg
							class="h-10 w-10 text-muted-foreground"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
					</div>
					<h3 class="mb-2 text-xl font-semibold text-foreground">No blog posts available</h3>
					<p class="text-muted-foreground">Check back later for new content.</p>
				</div>
			{/if}
		</div>
	</section>
</div>
