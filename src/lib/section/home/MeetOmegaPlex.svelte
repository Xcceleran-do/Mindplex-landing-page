<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { reveal } from '$lib/actions/reveal';

	const pipeline = [
		'Signals',
		'Patterns',
		'Memory',
		'Reasoning',
		'Claim check',
		'Human editor'
	];
</script>

<section id="omegaplex" class="section section-tint">
	<div class="section-wide">
		<div use:reveal class="section-intro">
			<p class="section-kicker">What's new</p>
			<h2 class="landing-heading">Meet OmegaPlex.</h2>
			<p class="landing-lead">An AI newsroom that reasons before it writes.</p>
		</div>

		<div class="meet-layout">
			<div use:reveal={80} class="meet-copy">
				<p>
					OmegaPlex follows one beat continuously. It finds signals, detects patterns, remembers
					what came before, reasons over the evidence, and tests important claims before drafting
					the story. A human editor decides what gets published.
				</p>
				<p class="meet-close">It doesn't start from a blank prompt.</p>

				<div class="meet-actions">
					<a class="meet-cta" href="/omegaplex">
						See how OmegaPlex thinks
						<ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
					</a>
				</div>

				<p class="panel-label meet-origin">Built inside Mindplex. Powered by OmegaClaw.</p>
			</div>

			<ol class="pipeline" aria-label="The OmegaPlex reporting pipeline">
				{#each pipeline as step, i (step)}
					<li use:reveal={120 + i * 80} class:pipeline-endpoint={i === pipeline.length - 1}>
						{step}
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>

<style>
	.section-intro {
		max-width: 55rem;
	}

	.meet-layout {
		display: grid;
		align-items: start;
		gap: clamp(3rem, 7vw, 7rem);
		margin-top: 4.5rem;
		grid-template-columns: minmax(0, 1.1fr) minmax(18rem, 0.7fr);
	}

	.meet-copy p:first-child {
		max-width: 36rem;
		font-size: 1.05rem;
		line-height: 1.65;
	}

	.meet-close {
		margin-top: 1.5rem;
		font-family: var(--font-display);
		font-style: italic;
		font-size: 1.25rem;
		line-height: 1.45;
		color: color-mix(in oklab, var(--foreground) 90%, var(--background));
	}

	.meet-actions {
		margin-top: 2.25rem;
	}

	.meet-cta {
		display: inline-flex;
		min-height: 3.25rem;
		align-items: center;
		justify-content: center;
		gap: 0.65rem;
		border-radius: 999px;
		background: var(--accent);
		padding: 0.85rem 1.35rem;
		font-size: 0.9375rem;
		font-weight: 680;
		white-space: nowrap;
		color: var(--accent-foreground);
		transition:
			transform 180ms ease,
			background-color 180ms ease;
	}

	.meet-cta:hover {
		background: var(--accent-strong);
		transform: translateY(-2px);
	}

	.meet-cta:active {
		transform: translateY(1px) scale(0.98);
	}

	.meet-origin {
		margin-top: 1.5rem;
	}

	/* The pipeline hangs off one continuous rail, same device as the reader loop. */
	.pipeline {
		border-inline-start: 2px solid var(--accent);
		padding-inline-start: 1.75rem;
	}

	.pipeline li {
		position: relative;
		padding-block: 1.05rem;
		font-size: 0.9375rem;
		font-weight: 620;
		color: var(--muted-foreground);
	}

	.pipeline li::before {
		position: absolute;
		top: 50%;
		inset-inline-start: calc(-1.75rem - 5px);
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--accent);
		content: '';
		transform: translateY(-50%);
	}

	.pipeline-endpoint {
		font-size: 1.05rem !important;
		font-weight: 720 !important;
		color: var(--foreground) !important;
	}

	@media (max-width: 900px) {
		.meet-layout {
			gap: 3.5rem;
			margin-top: 3rem;
			grid-template-columns: 1fr;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.meet-cta {
			transition: none;
		}
	}
</style>
