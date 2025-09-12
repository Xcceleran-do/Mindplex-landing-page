<script lang="ts">
	import { browser } from '$app/environment';

	const {
		blog = {
			id: 1,
			title: '',
			description: '',
			photo_url: '',
			post_slug: '',
			created_at: ''
		}
	} = $props();

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	const stripHtml = (html: string) => {
		if (!html) return '';

		if (browser && typeof document !== 'undefined') {
			const tmp = document.createElement('div');
			tmp.innerHTML = html;
			return tmp.textContent || tmp.innerText || '';
		}

		return html
			.replace(/<[^>]*>/g, '')
			.replace(/&[^;]+;/g, ' ')
			.trim();
	};

	const cleanDescription = $derived(stripHtml(blog.description));
</script>

<article class="group relative h-full">
	<a href="/blog/{blog.post_slug}" class="block h-full">
		<div
			class="relative h-full overflow-hidden rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
		>
			<div class="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
				{#if blog.photo_url}
					<img
						src={blog.photo_url}
						alt={blog.title}
						class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
					/>
					<!-- onerror={(e) => (e?.target?.style?.display = 'none')} -->
				{:else}
					<div class="flex h-full w-full items-center justify-center">
						<div class="text-center">
							<div
								class="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20"
							>
								<svg
									class="h-8 w-8 text-primary/50"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									></path>
								</svg>
							</div>
							<span class="text-xs text-muted-foreground">Mindplex Blog</span>
						</div>
					</div>
				{/if}

				<div class="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>

				<div class="absolute top-4 right-4">
					<span
						class="inline-flex items-center gap-1.5 rounded-lg bg-background/80 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm"
					>
						<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							></path>
						</svg>
						{formatDate(blog.created_at)}
					</span>
				</div>
			</div>

			<div class="space-y-4 p-6">
				<h3
					class="line-clamp-2 text-xl font-bold text-foreground transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent"
				>
					{blog.title}
				</h3>

				<p class="line-clamp-3 text-sm text-muted-foreground">
					{cleanDescription}
				</p>

				<div class="flex items-center justify-between border-t border-border/50 pt-4">
					<span class="text-sm font-medium text-primary">Read Article</span>

					<div class="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
						<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
							<svg
								class="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7"
								></path>
							</svg>
						</div>
					</div>
				</div>
			</div>

			<div
				class="absolute top-0 right-0 h-32 w-32 rounded-bl-[100%] bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
			></div>
		</div>
	</a>
</article>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
