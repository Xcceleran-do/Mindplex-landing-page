<script>
	import { ourTeam } from '$lib/data/OurTeam';

	let hoveredMember = $state(null);
</script>

<section class="relative overflow-hidden px-4 py-16 md:px-8 lg:px-16" id="team">
	<div class="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
	<div class="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-secondary/5 blur-3xl"></div>

	<div class="relative z-10 mx-auto max-w-7xl">
		<div class="mb-16 space-y-6 text-center">
			<div
				class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/50 px-4 py-2 backdrop-blur-sm"
			>
				<div class="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
				<span class="text-sm text-muted-foreground">Meet the Team</span>
			</div>

			<h2 class="text-4xl font-bold md:text-5xl lg:text-6xl">
				<span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
					Our Team
				</span>
			</h2>

			<p class="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
				Meet the Mindplex team – the visionaries behind the future of media.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
			{#each ourTeam as member, index}
				<div
					class="group relative"
					onmouseenter={() => (hoveredMember = index)}
					onmouseleave={() => (hoveredMember = null)}
				>
					<div
						class="relative h-96 overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20"
					>
						<img
							src={member.imageUrl}
							alt={member.name}
							class="h-full w-full object-cover object-center transition-all duration-700 group-hover:scale-110"
							style={member.customImageStyle}
						/>

						<div
							class="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80"
						></div>

						<div class="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
							<div
								class="transition-all duration-500 {hoveredMember === index
									? 'translate-y-full opacity-0'
									: 'translate-y-0 opacity-100'}"
							>
								<h3 class="mb-2 text-2xl font-bold text-foreground">{member.name}</h3>
								<p class="text-sm text-muted-foreground">{member.position}</p>
							</div>

							<div
								class="space-y-4 transition-all duration-500 {hoveredMember === index
									? 'translate-y-0 opacity-100'
									: 'translate-y-full opacity-0'}"
							>
								<div>
									<h3
										class="mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-2xl font-bold text-transparent"
									>
										{member.name}
									</h3>
									<p class="mb-1 text-base text-foreground">{member.position}</p>
									<div class="h-0.5 w-16 bg-gradient-to-r from-primary to-secondary"></div>
								</div>

								<div class="flex items-center gap-3">
									<a
										href={member.socialLink}
										target="_blank"
										class="group/link flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 transition-all duration-300 hover:bg-primary"
									>
										<svg
											class="h-5 w-5 text-primary transition-colors group-hover/link:text-primary-foreground"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
											/>
										</svg>
									</a>
								</div>
							</div>
						</div>
					</div>

					{#if hoveredMember === index}
						<div
							class="absolute -top-3 -right-3 animate-bounce rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-1 text-xs font-medium text-primary-foreground"
						>
							{member.position.split(' ')[0]}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
