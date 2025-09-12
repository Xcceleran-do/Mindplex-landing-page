<script>
	import { mindplexTokens } from '$lib/data/MindplexToken';

	let activeToken = 0;
</script>

<section class="relative overflow-hidden px-4 py-16 md:px-8 lg:px-16" id="mindplexTokens">
	<!-- Background decoration -->
	<div class="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
	<div class="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-secondary/5 blur-3xl"></div>

	<div class="relative z-10 mx-auto max-w-7xl">
		<!-- Section Header -->
		<div class="mb-16 space-y-6 text-center">
			<!-- Badge -->
			<div
				class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/50 px-4 py-2 backdrop-blur-sm"
			>
				<div class="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
				<span class="text-sm text-muted-foreground">Token Ecosystem</span>
			</div>

			<!-- Title -->
			<h2 class="text-4xl font-bold md:text-5xl lg:text-6xl">
				<span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
					Mindplex Tokens
				</span>
			</h2>

			<!-- Description -->
			<p class="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
				Mindplex operates based on a carefully designed tokenomics system involving a liquid
				cryptographic token (MPX) which is used to incentivize good content and good conduct, and a
				non-liquid soulbound token, the Mindplex Reputation Token (MPXR), which is used to measure
				and quantify the weight of users credibility.
			</p>
		</div>

		<!-- Tokens Grid -->
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
			{#each mindplexTokens as token, index}
				<div class="group relative" on:mouseenter={() => (activeToken = index)}>
					<!-- Card -->
					<div
						class="relative h-full rounded-2xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:bg-card/50 hover:shadow-2xl hover:shadow-primary/10"
					>
						<!-- Gradient overlay on hover -->
						<div
							class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-secondary/0 to-primary/0 transition-all duration-500 group-hover:from-primary/5 group-hover:via-secondary/5 group-hover:to-primary/5"
						></div>

						<!-- Content -->
						<div class="relative z-10 flex h-full flex-col">
							<!-- Token Image Container -->
							<div class="relative mb-6 flex h-48 items-center justify-center">
								<!-- Glow effect -->
								<div
									class="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
								></div>

								<!-- Image -->
								<img
									src={token.imageSource}
									alt={token.title}
									class="relative z-10 h-full max-h-40 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
								/>
							</div>

							<!-- Title -->
							<h3
								class="mb-4 bg-gradient-to-r from-foreground to-foreground bg-clip-text text-2xl font-bold text-transparent transition-all duration-500 group-hover:from-primary group-hover:to-secondary"
							>
								{token.title}
							</h3>

							<!-- Description -->
							<p class="flex-grow text-sm leading-relaxed text-muted-foreground">
								{token.description}
							</p>

							<!-- Learn More Link -->
							<div
								class="mt-6 flex items-center gap-2 text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							>
								<span class="text-sm font-medium">Learn more</span>
								<svg
									class="h-4 w-4 transition-transform group-hover:translate-x-1"
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

						<!-- Corner accent -->
						<div
							class="absolute top-0 right-0 h-20 w-20 rounded-tr-2xl rounded-bl-[100%] bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
						></div>
					</div>

					<!-- Floating badge for active card -->
					{#if activeToken === index}
						<div
							class="absolute -top-3 -right-3 animate-bounce rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground"
						>
							Active
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
