<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	const pillars = [
		{
			name: 'Discover',
			line: 'Important research, journalism, essays and signals, surfaced from across the web, so you are not monitoring dozens of sources yourself.'
		},
		{
			name: 'Curate',
			line: 'Everything is organized around topics, people and ongoing conversations, never an undifferentiated feed.'
		},
		{
			name: 'Understand',
			line: 'Multiple sources and perspectives sit side by side, so you see the larger context around a subject, not just one take.'
		},
		{
			name: 'Discuss',
			line: 'Authors and readers challenge claims, add evidence and develop ideas together.'
		},
		{
			name: 'Follow',
			line: 'Ideas persist here. Storylines keep developing long after the news cycle has moved on.'
		}
	];
</script>

<section id="platform" class="section">
	<div class="section-wide">
		<div use:reveal class="section-intro">
			<p class="section-kicker">The platform</p>
			<h2 class="landing-heading">A home for the intellectual web.</h2>
			<p class="landing-lead">
				Mindplex brings important reporting, research, commentary and conversations from many
				sources into one place, organized around the ideas shaping the future.
			</p>
		</div>

		<ul class="pillars">
			{#each pillars as pillar, i (pillar.name)}
				<li use:reveal={i * 80}>
					<h3>{pillar.name}</h3>
					<p>{pillar.line}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.section-intro {
		max-width: 55rem;
	}

	/* Index treatment: five verbs as a ledger, opened by the same heavy rule the
	   magazine sections use. */
	.pillars {
		margin-top: 4.5rem;
		border-block-start: 2px solid var(--foreground);
	}

	.pillars li {
		display: grid;
		align-items: baseline;
		gap: 0.75rem 3rem;
		grid-template-columns: minmax(11rem, 16rem) minmax(0, 1fr);
		padding-block: 1.75rem;
	}

	.pillars li + li {
		border-block-start: 1px solid var(--border);
	}

	.pillars h3 {
		font-size: clamp(1.5rem, 2.2vw, 2rem);
		font-weight: 710;
		letter-spacing: -0.03em;
	}

	.pillars p {
		max-width: 38rem;
		font-size: 1rem;
		line-height: 1.6;
		color: var(--muted-foreground);
	}

	@media (max-width: 700px) {
		.pillars {
			margin-top: 3rem;
		}

		.pillars li {
			grid-template-columns: 1fr;
			padding-block: 1.4rem;
		}
	}
</style>
