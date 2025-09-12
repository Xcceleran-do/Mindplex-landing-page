<script>
	import { ourAi } from '$lib/data/OurAi';

	let hoveredCard = null;
</script>

<section class="relative overflow-hidden px-4 py-16 md:px-8 lg:px-16" id="ourAi">
	<div class="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
	<div class="absolute -right-32 bottom-1/3 h-96 w-96 rounded-full bg-secondary/5 blur-3xl"></div>

	<div class="relative z-10 mx-auto max-w-7xl">
		<div class="mb-16 space-y-6">
			<div
				class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/50 px-4 py-2 backdrop-blur-sm"
			>
				<div class="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
				<span class="text-sm text-muted-foreground">AI Solutions</span>
			</div>

			<div class="space-y-2">
				<h1 class="text-4xl font-bold md:text-5xl lg:text-6xl">
					<span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
						Our AI
					</span>
				</h1>
				<p class="text-xl font-light text-muted-foreground md:text-2xl lg:text-3xl">
					Powered Media Solutions.
				</p>
			</div>

			<div class="h-1 w-24 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each ourAi as card, index}
				<div
					class="group relative"
					on:mouseenter={() => (hoveredCard = index)}
					on:mouseleave={() => (hoveredCard = null)}
				>
					<div
						class="relative h-96 overflow-hidden rounded-2xl border border-border/50 bg-card/20 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20"
					>
						<div class="absolute inset-0">
							<img
								src={card.image}
								alt={card.title}
								class="h-full w-full object-cover opacity-30 transition-all duration-700 group-hover:scale-110 group-hover:opacity-50"
							/>
							<div
								class="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
							></div>
						</div>

						<div
							class="absolute inset-0 flex items-center justify-center p-8 transition-all duration-500 {hoveredCard ===
							index
								? 'scale-95 opacity-0'
								: 'scale-100 opacity-100'}"
						>
							<h2
								class="bg-gradient-to-br from-foreground to-foreground bg-clip-text text-center text-3xl font-bold text-transparent transition-all duration-500 group-hover:from-primary group-hover:to-secondary md:text-4xl"
							>
								{card.title}
							</h2>
						</div>

						<div
							class="absolute inset-0 flex flex-col justify-end p-8 transition-all duration-500 {hoveredCard ===
							index
								? 'translate-y-0 opacity-100'
								: 'translate-y-8 opacity-0'}"
						>
							<div class="space-y-4">
								<h3
									class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-2xl font-bold text-transparent"
								>
									{card.title}
								</h3>
								<div class="h-0.5 w-16 bg-gradient-to-r from-primary to-secondary"></div>
								<p class="text-sm leading-relaxed text-muted-foreground">
									{card.description}
								</p>
							</div>
						</div>
					</div>

					<div
						class="absolute -top-3 -left-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary font-bold text-primary-foreground opacity-0 transition-all duration-500 group-hover:rotate-12 group-hover:opacity-100"
					>
						{index + 1}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
