<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { tilt } from '$lib/actions/tilt';
	import { beat } from '$lib/data/omegaplex';
</script>

<section class="section overflow-hidden pt-10 md:pt-14 lg:pt-16">
	<div class="section-wide">
		<!-- Masthead rule. A magazine opens a department with a heavy rule and a
		     dateline; this is that device, carrying the live beat. -->
		<div
			class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t-2 border-foreground pt-4"
		>
			<p class="kicker">An AI-native publication</p>
			<p class="text-[0.6875rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
				Now covering {beat.current}
			</p>
		</div>

		<div class="mt-10 grid items-center gap-12 lg:mt-14 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
			<div>
				<h1 class="display">
					Media that reasons, remembers, and
					<em class="font-normal text-accent">shows its work</em>
				</h1>

				<p class="lead mt-8 max-w-[46ch]">
					Our first publication researches its own beat, checks its own claims, and files to a human
					editor.
				</p>

				<div class="mt-10 flex flex-wrap items-center gap-3">
					<a
						href="https://magazine.mindplex.ai"
						class="group inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3.5 text-[0.9375rem] font-medium text-accent-foreground transition-colors hover:bg-accent-strong active:translate-y-px"
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
						class="inline-flex items-center rounded-md border border-border-strong px-6 py-3.5 text-[0.9375rem] font-medium transition-colors hover:bg-surface"
					>
						Meet OmegaPlex
					</a>
				</div>
			</div>

			<!-- Transparent-background render, so it sits on the paper with no frame.
			     The tilt action gives the flat image depth; it stays inert on touch
			     and under reduced motion. This is the LCP image. -->
			<div class="stage mx-auto w-full max-w-[420px] lg:mx-0 lg:ml-auto" use:tilt>
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
		transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
		will-change: transform;
	}

	/* Slow turn in place, so the emblem reads as a dimensional object before the
	   pointer reaches it. The only looping animation on the page. */
	.drift {
		display: block;
		transform-style: preserve-3d;
		animation: turn 18s ease-in-out infinite;
	}

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

	/* A soft brand-magenta light behind the glass, so the tilt reads as an object
	   catching light. Kept low on paper, where a glow can easily look muddy. */
	.glow {
		position: absolute;
		inset: 14% 16%;
		border-radius: 50%;
		background: radial-gradient(circle, oklch(52% 0.2 358 / 0.16), transparent 70%);
		filter: blur(52px);
		transform: translateZ(-80px);
		pointer-events: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.subject,
		.drift {
			transform: none;
			transition: none;
			animation: none;
		}
	}
</style>
