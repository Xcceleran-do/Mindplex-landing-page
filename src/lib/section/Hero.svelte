<script lang="ts">
	import { Application } from '@splinetool/runtime';

	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement | null = null;

	onMount(() => {
		const app = new Application(canvas);
		app.load('https://prod.spline.design/VEuho3NWmFQK-bnv/scene.splinecode');
	});
</script>

<section class="relative overflow-hidden px-4 py-8 md:px-8 lg:px-16">
	<div
		class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"
	></div>

	<div
		class="absolute top-20 right-10 h-20 w-20 animate-pulse rounded-full bg-primary/10 blur-xl"
	></div>
	<div
		class="absolute bottom-20 left-20 h-32 w-32 animate-pulse rounded-full bg-secondary/10 blur-2xl"
		style="animation-delay: 2s;"
	></div>
	<div
		class="absolute top-40 left-1/2 h-16 w-16 animate-pulse rounded-full bg-primary/20 blur-lg"
		style="animation-delay: 4s;"
	></div>

	<div
		class="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 pt-12 pb-20 md:flex-row md:gap-8 lg:gap-16"
	>
		<div class="w-full space-y-6 text-center md:w-1/2 md:text-left">
			<div
				class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/50 px-4 py-2 backdrop-blur-sm"
			>
				<div class="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
				<span class="text-sm text-muted-foreground">Next-Gen Media Platform</span>
			</div>

			<h1 class="text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
				Blockchain-based
				<span
					class="mt-2 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
				>
					Decentralized
				</span>
				<span class="text-foreground">Media Network</span>
			</h1>

			<p
				class="mx-auto max-w-lg text-base leading-relaxed text-muted-foreground md:mx-0 md:text-lg"
			>
				Mindplex is a magazine and a social media platform providing a dynamic space for creators,
				influencers, and media enthusiasts to connect and collaborate.
			</p>

			<div class="flex flex-col justify-center gap-4 pt-4 sm:flex-row md:justify-start">
				<a
					href="https://magazine.mindplex.ai"
					class="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-secondary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25"
				>
					<div
						class="bg-size-200 bg-pos-0 group-hover:bg-pos-100 absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary transition-all duration-500"
					></div>
					<span class="relative">Explore Magazine</span>
					<svg
						class="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
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

		<div class="relative w-full md:w-1/2">
			<div class="relative mx-auto aspect-square w-full max-w-[500px]">
				<div
					class="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 blur-3xl"
				></div>

				<div
					class="relative h-full w-full overflow-hidden rounded-3xl border border-border/30 bg-card/30 backdrop-blur-sm"
				>
					<canvas id="canvas3d" class="h-full w-full" width="100%" height="100%" bind:this={canvas}
					></canvas>

					<div
						class="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"
					></div>
				</div>

				<div
					class="absolute -top-4 -right-4 animate-bounce rounded-full bg-secondary/90 px-4 py-2 text-sm font-medium backdrop-blur-sm"
					style="animation-duration: 3s;"
				>
					Fast
				</div>
				<div
					class="absolute -bottom-4 -left-4 animate-bounce rounded-full bg-primary/90 px-4 py-2 text-sm font-medium backdrop-blur-sm"
					style="animation-duration: 3s; animation-delay: 1.5s;"
				>
					Reliable
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-20px);
		}
	}

	:global(.animate-float) {
		animation: float 6s ease-in-out infinite;
	}

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
