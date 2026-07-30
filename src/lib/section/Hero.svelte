<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { tilt } from '$lib/actions/tilt';
</script>

<section class="section overflow-hidden pt-14 md:pt-20 lg:pt-24">
	<div class="section-wide grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
		<div class="max-w-2xl">
			<h1 class="display">Media that reasons, remembers, and shows its work</h1>

			<p class="lead mt-6">
				An AI-native media platform. Our first publication researches its own beat and files to a
				human editor.
			</p>

			<div class="mt-9 flex flex-wrap items-center gap-3">
				<a
					href="https://magazine.mindplex.ai"
					class="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-[0.9375rem] font-medium text-accent-foreground transition-colors hover:bg-accent-strong active:translate-y-px"
				>
					Explore Magazine
					<ArrowRight
						size={17}
						strokeWidth={2}
						class="transition-transform duration-200 group-hover:translate-x-0.5"
					/>
				</a>

				<a
					href="#omegaplex"
					class="inline-flex items-center rounded-md border border-border-strong px-5 py-3 text-[0.9375rem] font-medium transition-colors hover:bg-surface"
				>
					Meet OmegaPlex
				</a>
			</div>
		</div>

		<!-- The asset has a transparent background, so it sits directly on the page
		     rather than inside a framed card. The tilt action gives the flat image
		     depth by rotating it toward the pointer; it stays inert on touch and
		     under reduced motion. This is the LCP image, so it is eager and sized. -->
		<div class="stage mx-auto w-full max-w-[440px] lg:mx-0 lg:ml-auto" use:tilt>
			<div class="glow" aria-hidden="true"></div>
			<div class="subject">
				<img
					src="/mindplex_ai.png"
					alt="A translucent glass human head wearing a visor, the Mindplex emblem"
					width="580"
					height="640"
					fetchpriority="high"
					decoding="async"
					class="drift h-auto w-full"
				/>
			</div>
		</div>
	</div>
</section>

<style>
	.stage {
		position: relative;
		perspective: 1100px;
	}

	/* Two nested transforms so they compose instead of overwriting each other:
	   the wrapper carries the pointer tilt, the image carries the idle turn. */
	.subject {
		position: relative;
		transform: rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))
			translateZ(var(--tilt-z, 0px));
		transform-style: preserve-3d;
		/* Long easing on the way back so releasing the pointer settles rather
		   than snapping. */
		transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
		will-change: transform;
	}

	/* Slow turn in place, so the emblem reads as a dimensional object before the
	   pointer ever reaches it. Deliberately small and slow: this is the one
	   looping animation on the page. */
	.drift {
		display: block;
		transform-style: preserve-3d;
		animation: turn 18s ease-in-out infinite;
	}

	/* Hovering hands control to the pointer, so the two do not fight. */
	.stage:hover .drift {
		animation-play-state: paused;
	}

	@keyframes turn {
		0%,
		100% {
			transform: rotateY(-6deg) translateY(0);
		}
		50% {
			transform: rotateY(6deg) translateY(-10px);
		}
	}

	/* A single soft teal light behind the glass, so the tilt reads as an object
	   catching light rather than a picture moving. */
	.glow {
		position: absolute;
		inset: 12% 14%;
		border-radius: 50%;
		background: radial-gradient(circle, oklch(72% 0.12 184 / 0.22), transparent 70%);
		filter: blur(48px);
		transform: translateZ(-80px);
		pointer-events: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.subject {
			transform: none;
			transition: none;
		}

		.drift {
			animation: none;
			transform: none;
		}
	}
</style>
