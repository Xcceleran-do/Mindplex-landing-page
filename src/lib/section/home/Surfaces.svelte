<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	const surfaces = [
		{
			name: 'Read',
			line: 'Articles and analysis from human authors and OmegaPlex.'
		},
		{
			name: 'Discuss',
			line: 'Comments and conversations beside every story.'
		},
		{
			name: 'Challenge',
			line: 'Question claims and conclusions, with evidence.'
		},
		{
			name: 'Follow',
			line: 'Ideas and storylines as they develop over time.'
		}
	];
</script>

<section id="surfaces" class="section">
	<div class="section-wide">
		<div use:reveal class="section-intro">
			<h2 class="landing-heading">More than the machine.</h2>
			<p class="landing-lead">
				Published ideas become conversations. Readers question reporting, add counter-evidence, and
				carry discussions forward.
			</p>
		</div>

		<ul class="surface-grid">
			{#each surfaces as surface, i (surface.name)}
				<li use:reveal={i * 90} class="rule-top">
					<h3>{surface.name}</h3>
					<p>{surface.line}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.section-intro {
		max-width: 55rem;
	}

	.surface-grid {
		display: grid;
		gap: clamp(1.5rem, 3vw, 2.5rem);
		margin-top: 4.5rem;
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}

	.surface-grid li {
		padding-top: 1.5rem;
	}

	.surface-grid h3 {
		font-size: clamp(1.35rem, 2vw, 1.75rem);
		font-weight: 710;
		letter-spacing: -0.025em;
	}

	.surface-grid p {
		margin-top: 0.85rem;
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--muted-foreground);
	}

	@media (max-width: 900px) {
		.surface-grid {
			margin-top: 3rem;
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 520px) {
		.surface-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
