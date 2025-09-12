<section class="relative overflow-hidden px-4 py-24 md:px-8 lg:px-16">
	<div
		class="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"
	></div>

	<div
		class="absolute top-10 left-10 h-72 w-72 animate-pulse rounded-full bg-primary/10 blur-3xl"
	></div>
	<div
		class="absolute right-10 bottom-10 h-96 w-96 animate-pulse rounded-full bg-secondary/10 blur-3xl"
		style="animation-delay: 2s;"
	></div>

	<div class="relative z-10 mx-auto max-w-6xl">
		<div
			class="relative overflow-hidden rounded-3xl border border-border/50 bg-card/30 p-8 backdrop-blur-md md:p-12 lg:p-16"
		>
			<div
				class="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
			></div>

			<div class="space-y-8 text-center">
				<div
					class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/50 px-4 py-2 backdrop-blur-sm"
				>
					<div class="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
					<span class="text-sm text-muted-foreground">Join the Revolution</span>
				</div>

				<div class="space-y-4">
					<h2 class="text-4xl font-bold md:text-5xl lg:text-6xl">
						<span
							class="animate-gradient bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
						>
							Mindplexes
						</span>
					</h2>
					<p class="text-xl font-light text-foreground md:text-2xl">Join Our Network</p>
				</div>

				<p class="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
					Embrace the future of media with Mindplex. Be part of a vibrant community where creativity
					knows no bounds and innovation takes center stage. Together, let's reshape the media
					landscape, unleash the power of decentralized and democratic media, and pave the way for a
					brighter, more engaging future. Connect with us today and embark on a transformative
					journey with Mindplex.
				</p>

				<div class="pt-8">
					<a
						href="https://social.mindplex.ai/public/local"
						class="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-secondary px-12 py-6 text-xl font-bold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 md:text-2xl"
					>
						<div
							class="bg-size-200 bg-pos-0 group-hover:bg-pos-100 absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary transition-all duration-700"
						></div>

						<span class="relative">Join Us</span>
						<svg
							class="relative h-6 w-6 transition-transform duration-300 group-hover:translate-x-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 7l5 5m0 0l-5 5m5-5H6"
							></path>
						</svg>
					</a>
				</div>
			</div>

			<div
				class="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-2xl"
			></div>
			<div
				class="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-br from-secondary/20 to-transparent blur-2xl"
			></div>
		</div>

		<div
			class="absolute top-20 -left-4 animate-bounce rounded-full bg-primary/90 px-4 py-2 text-sm font-medium text-primary-foreground backdrop-blur-sm"
			style="animation-duration: 3s;"
		>
			Next Gen
		</div>
		<div
			class="absolute -right-4 bottom-20 animate-bounce rounded-full bg-secondary/90 px-4 py-2 text-sm font-medium text-secondary-foreground backdrop-blur-sm"
			style="animation-duration: 3s; animation-delay: 1.5s;"
		>
			Fast
		</div>
	</div>
</section>

<style>
	/* Gradient animation */
	@keyframes gradient {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}

	:global(.animate-gradient) {
		background-size: 200% 200%;
		animation: gradient 4s ease infinite;
	}

	/* Button gradient animation */
	:global(.bg-size-200) {
		background-size: 200% 100%;
	}

	:global(.bg-pos-0) {
		background-position: 0% 50%;
	}

	:global(.bg-pos-100) {
		background-position: 100% 50%;
	}
</style>
