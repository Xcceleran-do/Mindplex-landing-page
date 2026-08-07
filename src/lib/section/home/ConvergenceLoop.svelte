<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	const loop = [
		'OmegaPlex article',
		'Mindplex discussion',
		'Questions, disputes, evidence',
		'OmegaPlex memory',
		'Next investigation'
	];
</script>

<section id="loop" class="section section-invert">
	<div class="section-wide">
		<div class="loop-layout">
			<div class="loop-copy">
				<div use:reveal>
					<h2 class="landing-heading">Humans publish. AI investigates. <span>Everyone can argue.</span></h2>
					<p class="landing-lead">
						Publishing isn't the end. Readers challenge OmegaPlex in Mindplex discussions, and what
						they argue about becomes signals for its next reporting cycle.
					</p>
				</div>

				<p use:reveal={80} class="loop-close">
					That loop is why the two aren't separate products. OmegaPlex gives people a reason to
					visit Mindplex. Mindplex gives OmegaPlex somewhere to learn.
				</p>
			</div>

			<ol class="loop-rail" aria-label="The loop from article to next investigation">
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
	.loop-layout {
		display: grid;
		align-items: center;
		gap: clamp(3rem, 7vw, 7rem);
		grid-template-columns: minmax(0, 1.1fr) minmax(18rem, 0.7fr);
	}

	.loop-copy .landing-heading {
		max-width: 18ch;
	}

	.loop-copy .landing-heading span {
		color: var(--invert-accent);
	}

	.loop-close {
		max-width: 34rem;
		margin-top: 2.25rem;
		font-family: var(--font-display);
		font-style: italic;
		font-size: 1.25rem;
		line-height: 1.5;
		color: color-mix(in oklab, var(--invert-fg) 90%, var(--invert-bg));
	}

	/* Same rail device as the pipeline: the cycle hangs off one continuous line. */
	.loop-rail {
		border-inline-start: 2px solid var(--invert-accent);
		padding-inline-start: 1.75rem;
	}

	.loop-rail li {
		position: relative;
		padding-block: 1.05rem;
		font-size: 0.9375rem;
		font-weight: 620;
		color: var(--invert-muted);
	}

	.loop-rail li::before {
		position: absolute;
		top: 50%;
		inset-inline-start: calc(-1.75rem - 5px);
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--invert-accent);
		content: '';
		transform: translateY(-50%);
	}

	.loop-endpoint {
		font-size: 1.05rem !important;
		font-weight: 720 !important;
		color: var(--invert-fg) !important;
	}

	@media (max-width: 900px) {
		.loop-layout {
			gap: 3.5rem;
			grid-template-columns: 1fr;
		}
	}
</style>
