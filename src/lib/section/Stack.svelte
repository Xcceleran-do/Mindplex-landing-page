<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	/**
	 * Chapter 08: the machinery, revealed only after the experience.
	 */

	const stack = [
		{ name: 'OmegaClaw', role: 'The reasoning runtime.' },
		{ name: 'MeTTa', role: 'The language connecting reasoning, memory and tools.' },
		{ name: 'Atomspace', role: 'Persistent symbolic knowledge across reporting cycles.' },
		{ name: 'NAL', role: 'Reasoning under uncertain and changing evidence.' },
		{ name: 'PLN', role: 'Probabilistic inference across combinations of knowledge.' },
		{ name: 'Mindplex', role: 'The control plane, publication system and human editorial surface.' }
	];

	const credo = [
		'Search finds information.',
		'Memory gives it history.',
		'Logic gives it structure.',
		'Editors give it accountability.'
	];
</script>

<section id="stack" class="section stack-section">
	<div class="section-wide">
		<div use:reveal class="section-intro">
			<p class="section-kicker tnum">08 · Under the newsroom</p>
			<h2 class="landing-heading">Under the newsroom.</h2>
			<p class="landing-lead">
				Everything above runs on a small set of named parts. None of them is a metaphor.
			</p>
		</div>

		<dl class="stack-grid">
			{#each stack as part, i (part.name)}
				<div use:reveal={i * 60}>
					<dt>{part.name}</dt>
					<dd>{part.role}</dd>
				</div>
			{/each}
		</dl>

		<p use:reveal class="stack-credo display-sm">
			{#each credo as line, i (line)}
				<span style="--i: {i}">{line}</span>
			{/each}
		</p>
	</div>
</section>

<style>
	.section-intro {
		max-width: 55rem;
	}

	.stack-grid {
		display: grid;
		gap: 2.5rem 3rem;
		margin-top: 4.5rem;
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.stack-grid > div {
		border-top: 1px solid var(--border-strong);
		padding-top: 1.1rem;
	}

	.stack-grid dt {
		font-size: 1.125rem;
		font-weight: 740;
		letter-spacing: -0.01em;
	}

	.stack-grid dd {
		margin-top: 0.55rem;
		font-size: 0.9rem;
		line-height: 1.6;
		color: var(--muted-foreground);
	}

	.stack-credo {
		max-width: 30ch;
		margin-top: 6rem;
	}

	.stack-credo span {
		display: block;
	}

	.stack-credo span:last-child {
		color: var(--accent);
	}

	@media (max-width: 900px) {
		.stack-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 767px) {
		.stack-grid {
			gap: 1.75rem;
			margin-top: 3rem;
		}

		.stack-credo {
			margin-top: 4rem;
		}
	}

	@media (max-width: 480px) {
		.stack-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
