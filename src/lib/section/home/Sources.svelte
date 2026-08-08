<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { reveal } from '$lib/actions/reveal';

	// The ranked source ladder from the OmegaPlex concept brief: primary sources
	// up top, aggregators below, social signal as a tip rather than evidence.
	const ladder = [
		{
			rank: '01',
			name: 'Primary sources',
			line: 'Papers and preprints, code and releases, filings and official feeds. The top of the ladder, quoted directly.'
		},
		{
			rank: '02',
			name: 'Reporting and aggregators',
			line: 'Journalism, newsletters and curation, weighed against the primary layer before it counts.'
		},
		{
			rank: '03',
			name: 'Social signal',
			line: "A tip, never evidence. Chatter can point an investigation somewhere; it can't source one."
		}
	];
</script>

<section id="sources" class="section section-tint">
	<div class="section-wide">
		<div use:reveal class="section-intro">
			<h2 class="landing-heading">Where Mindplex reads.</h2>
			<p class="landing-lead">
				Mindplex draws from the sources themselves: arXiv categories, GitHub repositories, RSS and
				official feeds, and watchlists of the people and projects shaping each beat. Everything
				enters a ranked ladder before it shapes a story.
			</p>
		</div>

		<ol class="ladder">
			{#each ladder as tier, i (tier.rank)}
				<li use:reveal={i * 90} style="--tier: {i}">
					<p class="ladder-rank tnum">{tier.rank}</p>
					<h3>{tier.name}</h3>
					<p class="ladder-line">{tier.line}</p>
				</li>
			{/each}
		</ol>

		<p use:reveal class="sources-cta-row">
			<a class="sources-cta" href="https://magazine.mindplex.ai">
				See what's live on Mindplex
				<ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
			</a>
		</p>
	</div>
</section>

<style>
	.section-intro {
		max-width: 55rem;
	}

	/* Trust descends down the ladder; so does the type size. */
	.ladder {
		margin-top: 4.5rem;
		border-block-start: 2px solid var(--foreground);
	}

	.ladder li {
		display: grid;
		align-items: baseline;
		gap: 0.5rem 2.5rem;
		grid-template-columns: 3.5rem minmax(12rem, 18rem) minmax(0, 1fr);
		padding-block: 1.6rem;
	}

	.ladder li + li {
		border-block-start: 1px solid var(--border);
	}

	.ladder-rank {
		font-size: 0.8125rem;
		font-weight: 620;
		color: var(--muted-foreground);
	}

	.ladder h3 {
		font-size: calc(clamp(1.9rem, 2.4vw, 2.2rem) - var(--tier) * 0.4rem);
		font-weight: 710;
		letter-spacing: -0.03em;
	}

	.ladder-line {
		max-width: 36rem;
		font-size: 1rem;
		line-height: 1.6;
		color: var(--muted-foreground);
	}

	.sources-cta-row {
		margin-top: 3rem;
	}

	.sources-cta {
		display: inline-flex;
		min-height: 2.75rem;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9375rem;
		font-weight: 680;
		color: var(--accent);
		transition: color 180ms ease;
	}

	.sources-cta:hover {
		color: var(--accent-strong);
	}

	@media (max-width: 700px) {
		.ladder {
			margin-top: 3rem;
		}

		.ladder li {
			gap: 0.35rem;
			grid-template-columns: 1fr;
			padding-block: 1.4rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.sources-cta {
			transition: none;
		}
	}
</style>
