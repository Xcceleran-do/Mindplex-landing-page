<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	/**
	 * Chapter 07: readers feed the next reporting cycle.
	 */

	const quotes = [
		'You ignored the strongest counterargument.',
		'This contradicts the paper from last month.',
		'Can you investigate the compute-cost claim?',
		'What does this mean for Europe?'
	];

	const loop = [
		"Today's article",
		'Readers',
		'Questions · disputes · counter-evidence',
		'Knowledge digest',
		"Tomorrow's triage",
		"Tomorrow's article"
	];
</script>

<section id="loop" class="section loop-section">
	<div class="section-wide">
		<div use:reveal class="section-intro">
			<p class="section-kicker tnum">07 · The loop</p>
			<h2 class="landing-heading">Publication is not the end of the loop.</h2>
			<p class="landing-lead">Readers can change tomorrow's reporting.</p>
		</div>

		<div class="loop-layout">
			<div class="loop-copy">
				<ul class="reader-quotes">
					{#each quotes as quote, i (quote)}
						<li use:reveal={i * 80}>&ldquo;{quote}&rdquo;</li>
					{/each}
				</ul>

				<p use:reveal class="loop-body">
					OmegaPlex reads the conversation, extracts the durable signals and reasons over them. A
					reader-supplied counter-source becomes a contradiction signal for the next reporting
					cycle. A repeated request becomes reader demand. An uncovered subject becomes tomorrow's
					investigation.
				</p>

				<p use:reveal class="loop-close">The newsroom learns from its readers.</p>
			</div>

			<ol class="loop-rail" aria-label="The feedback loop from article to article">
				{#each loop as step, i (step)}
					<li use:reveal={i * 90} class:loop-endpoint={i === 0 || i === loop.length - 1}>
						{step}
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>

<style>
	.loop-section {
		border-block: 1px solid var(--border);
		background: var(--surface);
	}

	.section-intro {
		max-width: 57rem;
	}

	.loop-layout {
		display: grid;
		align-items: start;
		gap: clamp(3rem, 7vw, 7rem);
		margin-top: 4.5rem;
		grid-template-columns: minmax(0, 1.1fr) minmax(18rem, 0.7fr);
	}

	.reader-quotes li {
		max-width: 30rem;
		border: 1px solid var(--border-strong);
		border-radius: 1rem 1rem 1rem 0.25rem;
		background: var(--background);
		padding: 1rem 1.35rem;
		font-family: var(--font-display);
		font-style: italic;
		font-size: 1.125rem;
		line-height: 1.45;
	}

	.reader-quotes li + li {
		margin-top: 0.9rem;
	}

	/* Stagger the bubbles off the left edge so they read as a conversation. */
	.reader-quotes li:nth-child(2n) {
		margin-inline-start: 2.5rem;
	}

	.loop-body {
		max-width: 36rem;
		margin-top: 2.5rem;
		font-size: 1.05rem;
		line-height: 1.65;
	}

	.loop-close {
		margin-top: 1.5rem;
		font-family: var(--font-display);
		font-style: italic;
		font-size: 1.25rem;
		color: color-mix(in oklab, var(--foreground) 90%, var(--background));
	}

	/* The cycle, drawn as a rail: every step hangs off one continuous line. */
	.loop-rail {
		border-inline-start: 2px solid var(--accent);
		padding-inline-start: 1.75rem;
	}

	.loop-rail li {
		position: relative;
		padding-block: 1.05rem;
		font-size: 0.9375rem;
		font-weight: 620;
		color: var(--muted-foreground);
	}

	.loop-rail li::before {
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

	.loop-endpoint {
		font-size: 1.05rem !important;
		font-weight: 720 !important;
		color: var(--foreground) !important;
	}

	@media (max-width: 900px) {
		.loop-layout {
			gap: 3.5rem;
			margin-top: 3rem;
			grid-template-columns: 1fr;
		}
	}
</style>
