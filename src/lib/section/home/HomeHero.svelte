<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ArrowDown from '@lucide/svelte/icons/arrow-down';
	import FlowCanvas from '$lib/components/FlowCanvas.svelte';
</script>

<section class="hero">
	<FlowCanvas />
	<div class="hero-scrim" aria-hidden="true"></div>

	<div class="section-wide hero-inner">
		<div class="hero-copy">
			<h1 class="hero-title">
				Ideas worth thinking about. <span>Intelligence worth arguing with.</span>
			</h1>
			<p class="hero-lead">
				Mindplex is where humans and AI publish, argue and think together about the ideas shaping
				the future.
			</p>

			<div class="hero-actions">
				<a class="button button-primary" href="https://magazine.mindplex.ai">
					Read Mindplex
					<ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
				</a>
				<a class="button button-ghost" href="#omegaplex">
					Meet OmegaPlex
					<ArrowDown size={16} strokeWidth={2} aria-hidden="true" />
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		isolation: isolate;
		display: flex;
		min-height: calc(100dvh - 68px);
		align-items: center;
		overflow: hidden;
		background: oklch(12% 0.012 275);
		color: oklch(97% 0.005 275);
	}

	.hero-scrim {
		position: absolute;
		inset: 0;
		z-index: -1;
		background:
			linear-gradient(
				90deg,
				oklch(10% 0.012 275 / 0.98) 0%,
				oklch(10% 0.012 275 / 0.9) 34%,
				transparent 70%
			),
			linear-gradient(0deg, oklch(10% 0.012 275 / 0.72) 0%, transparent 35%),
			linear-gradient(180deg, oklch(10% 0.012 275 / 0.36), transparent 28%);
	}

	.hero-inner {
		padding: 6rem var(--gutter);
	}

	.hero-copy {
		max-width: 47rem;
	}

	/* staggered entrance: each block lands just after the one above it */
	.hero-title,
	.hero-lead,
	.hero-actions {
		animation: copy-enter 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	.hero-title {
		animation-delay: 0.08s;
	}

	.hero-lead {
		animation-delay: 0.18s;
	}

	.hero-actions {
		animation-delay: 0.28s;
	}

	.hero-title {
		max-width: 24ch;
		font-size: clamp(2.7rem, 5vw, 5rem);
		font-weight: 760;
		line-height: 0.98;
		letter-spacing: -0.055em;
		text-wrap: balance;
	}

	.hero-title span {
		color: var(--accent-strong);
	}

	.hero-lead {
		max-width: 37rem;
		margin-top: 2rem;
		font-size: clamp(1.05rem, 1.4vw, 1.25rem);
		line-height: 1.55;
		color: oklch(83% 0.015 275);
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 2.25rem;
	}

	.button {
		display: inline-flex;
		min-height: 3.25rem;
		align-items: center;
		justify-content: center;
		gap: 0.65rem;
		border-radius: 999px;
		padding: 0.85rem 1.35rem;
		font-size: 0.9375rem;
		font-weight: 680;
		white-space: nowrap;
		transition:
			transform 180ms ease,
			background-color 180ms ease,
			border-color 180ms ease;
	}

	.button:hover {
		transform: translateY(-2px);
	}

	.button:active {
		transform: translateY(1px) scale(0.98);
	}

	.button-primary {
		background: var(--accent);
		color: var(--accent-foreground);
	}

	.button-primary:hover {
		background: var(--accent-strong);
	}

	.button-ghost {
		border: 1px solid oklch(100% 0 0 / 0.28);
		background: oklch(12% 0.012 275 / 0.5);
		color: oklch(96% 0.005 275);
		backdrop-filter: blur(12px);
	}

	.button-ghost:hover {
		border-color: oklch(100% 0 0 / 0.5);
		background: oklch(100% 0 0 / 0.09);
	}

	@keyframes copy-enter {
		from {
			opacity: 0;
			transform: translateY(1.25rem);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	@media (max-width: 767px) {
		.hero {
			align-items: flex-end;
		}

		.hero-scrim {
			background:
				linear-gradient(
					0deg,
					oklch(10% 0.012 275 / 0.98) 0%,
					oklch(10% 0.012 275 / 0.82) 62%,
					oklch(10% 0.012 275 / 0.28) 100%
				),
				linear-gradient(90deg, oklch(10% 0.012 275 / 0.62), transparent);
		}

		.hero-inner {
			padding-block: 6rem 3rem;
		}

		.hero-title {
			font-size: clamp(2.35rem, 10.5vw, 3.4rem);
		}

		.hero-lead {
			max-width: 31rem;
			margin-top: 1.5rem;
		}

		.hero-actions {
			margin-top: 1.75rem;
		}
	}

	@media (max-width: 420px) {
		.hero-actions {
			align-items: stretch;
			flex-direction: column;
		}

		.button {
			width: 100%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-title,
		.hero-lead,
		.hero-actions {
			animation: none;
		}

		.button {
			transition: none;
		}
	}

	@media (prefers-reduced-transparency: reduce) {
		.button-ghost {
			background: oklch(16% 0.012 275);
			backdrop-filter: none;
		}
	}
</style>
