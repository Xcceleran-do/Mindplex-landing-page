<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { reveal } from '$lib/actions/reveal';

	const pipeline = ['Signals', 'Patterns', 'Memory', 'Reasoning', 'Claim check', 'Human editor'];
</script>

<section id="omegaplex" class="section">
	<div class="section-wide">
		<div use:reveal class="section-intro">
			<p class="section-kicker">New inside Mindplex</p>
			<h2 class="landing-heading">Meet OmegaPlex.</h2>
			<p class="landing-lead">
				Mindplex brings the conversation together. Now it has an AI that can participate in it: a
				newsroom that reasons before it writes.
			</p>
		</div>

		<div use:reveal={80} class="meet-copy">
			<p>
				OmegaPlex follows one beat continuously. It finds signals, detects patterns, remembers what
				came before, reasons over the evidence, and tests important claims before drafting the
				story. A human editor decides what gets published.
			</p>
			<p class="meet-close">It doesn't start from a blank prompt.</p>
		</div>

		<!-- The same continuous-rail device as the reader loop, laid on its side so
		     the two sections don't read as twins. -->
		<ol class="pipeline" aria-label="The OmegaPlex reporting pipeline">
			{#each pipeline as step, i (step)}
				<li use:reveal={120 + i * 80} class:pipeline-endpoint={i === pipeline.length - 1}>
					{step}
				</li>
			{/each}
		</ol>

		<div class="meet-foot">
			<a class="meet-cta" href="/omegaplex">
				See how OmegaPlex thinks
				<ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
			</a>
			<p class="panel-label">Built inside Mindplex. Powered by OmegaClaw.</p>
		</div>
	</div>
</section>

<style>
	.section-intro {
		max-width: 55rem;
	}

	.meet-copy {
		margin-top: 3.5rem;
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

	/* The pipeline hangs off one continuous rail, horizontal here. */
	.pipeline {
		display: grid;
		gap: 1rem 1.25rem;
		margin-top: 4rem;
		border-block-start: 2px solid var(--accent);
		grid-template-columns: repeat(6, minmax(0, 1fr));
	}

	.pipeline li {
		position: relative;
		padding-block-start: 1.25rem;
		font-size: 0.9375rem;
		font-weight: 620;
		color: var(--muted-foreground);
	}

	.pipeline li::before {
		position: absolute;
		top: -5px;
		inset-inline-start: 0;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--accent);
		content: '';
	}

	.pipeline-endpoint {
		font-size: 1.05rem !important;
		font-weight: 720 !important;
		color: var(--foreground) !important;
	}

	.meet-foot {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem 2rem;
		margin-top: 4rem;
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

	/* A row of six labels can't survive narrow screens; fall back to the
	   vertical rail there. */
	@media (max-width: 900px) {
		.meet-copy {
			margin-top: 3rem;
		}

		.pipeline {
			display: block;
			margin-top: 3rem;
			border-block-start: 0;
			border-inline-start: 2px solid var(--accent);
			padding-inline-start: 1.75rem;
		}

		.pipeline li {
			padding-block: 1.05rem;
		}

		.pipeline li::before {
			top: 50%;
			inset-inline-start: calc(-1.75rem - 5px);
			transform: translateY(-50%);
		}

		.meet-foot {
			margin-top: 3rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.meet-cta {
			transition: none;
		}
	}
</style>
