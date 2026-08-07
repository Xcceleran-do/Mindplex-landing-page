<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	/**
	 * Chapter 04: the methodology as symbolic rules, then the two reasoning
	 * engines that evaluate them.
	 */

	const rules = [
		{
			conditions: ['claim = speculative', 'source = low-tier', 'corroboration = none'],
			outcome: 'Flag claim',
			tone: 'flagged'
		},
		{
			conditions: ['sources conflict'],
			outcome: 'Require hedging',
			tone: 'hedged'
		},
		{
			conditions: ['social post = only evidence'],
			outcome: 'Block claim',
			tone: 'blocked'
		}
	];
</script>

<section id="reasoning" class="section reasoning-section">
	<div class="section-wide">
		<div use:reveal class="section-intro">
			<p class="section-kicker tnum">04 · Reasoning</p>
			<h2 class="landing-heading">Then it reasons.</h2>
			<p class="landing-lead">
				The rules are not hidden inside a prompt. OmegaPlex's editorial methodology compiles into
				symbolic rules that can be inspected, versioned and evaluated by the reasoning system — not
				reinterpreted from scratch every time an LLM runs.
			</p>
		</div>

		<div class="rule-cards">
			{#each rules as rule, i (rule.outcome)}
				<article use:reveal={i * 90} class="rule-card">
					<p class="rule-keyword">If</p>
					<ul>
						{#each rule.conditions as condition, c (condition)}
							<li class="tnum">
								{#if c > 0}<span class="rule-and">and</span>{/if}
								{condition}
							</li>
						{/each}
					</ul>
					<p class="rule-keyword">Then</p>
					<p class="rule-outcome" data-tone={rule.tone}>{rule.outcome}</p>
				</article>
			{/each}
		</div>

		<div class="engines">
			<article use:reveal>
				<h3>NAL <span>Non-Axiomatic Logic</span></h3>
				<p>
					Reasons with evidence that can be incomplete, changing or contradictory. It revises
					confidence as new evidence arrives, connects related facts, accumulates repeated
					observations and surfaces plausible relationships.
				</p>
			</article>

			<article use:reveal={100}>
				<h3>PLN <span>Probabilistic Logic Networks</span></h3>
				<p>Reasons across combinations of facts.</p>
				<div class="pln-example" aria-label="Example inference">
					<p>Readers want more on X</p>
					<span aria-hidden="true">+</span>
					<p>X belongs to an active storyline</p>
					<span aria-hidden="true">↓</span>
					<p class="pln-result">Higher editorial priority</p>
				</div>
			</article>
		</div>
	</div>
</section>

<style>
	.section-intro {
		max-width: 57rem;
	}

	.rule-cards {
		display: grid;
		gap: 1.25rem;
		margin-top: 4.5rem;
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.rule-card {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--border-strong);
		border-radius: 1.25rem;
		background: var(--surface);
		padding: 1.75rem;
	}

	.rule-keyword {
		font-size: 0.6875rem;
		font-weight: 720;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--muted-foreground);
	}

	.rule-card ul {
		flex: 1;
		margin-block: 0.9rem 1.5rem;
	}

	.rule-card li {
		padding-block: 0.3rem;
		font-size: 1rem;
		font-weight: 620;
		letter-spacing: 0.01em;
	}

	.rule-and {
		margin-inline-end: 0.4rem;
		font-size: 0.6875rem;
		font-weight: 720;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--muted-foreground);
	}

	.rule-outcome {
		margin-top: 0.6rem;
		font-size: 1.375rem;
		font-weight: 740;
		letter-spacing: -0.02em;
	}

	.rule-outcome[data-tone='flagged'] {
		color: var(--flagged);
	}

	.rule-outcome[data-tone='hedged'] {
		color: var(--foreground);
	}

	.rule-outcome[data-tone='blocked'] {
		color: var(--blocked);
	}

	.engines {
		display: grid;
		gap: 4rem 5rem;
		margin-top: 5.5rem;
		border-top: 1px solid var(--border-strong);
		padding-top: 3rem;
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.engines h3 {
		display: flex;
		align-items: baseline;
		gap: 0.9rem;
		font-size: 1.5rem;
		font-weight: 740;
		letter-spacing: -0.02em;
	}

	.engines h3 span {
		font-size: 0.8125rem;
		font-weight: 620;
		letter-spacing: 0.04em;
		color: var(--muted-foreground);
	}

	.engines p {
		max-width: 32rem;
		margin-top: 1rem;
		font-size: 0.9875rem;
		line-height: 1.65;
		color: var(--muted-foreground);
	}

	.pln-example {
		max-width: 26rem;
		margin-top: 1.5rem;
		border-inline-start: 2px solid var(--accent);
		padding-inline-start: 1.25rem;
	}

	.pln-example p {
		margin-top: 0;
		font-size: 0.9375rem;
		font-weight: 620;
		color: var(--foreground);
	}

	.pln-example span {
		display: block;
		padding-block: 0.2rem;
		font-size: 0.9375rem;
		color: var(--muted-foreground);
	}

	.pln-result {
		font-size: 1.05rem !important;
		font-weight: 720 !important;
		color: var(--accent) !important;
	}

	@media (max-width: 900px) {
		.rule-cards {
			gap: 1rem;
			margin-top: 3rem;
			grid-template-columns: 1fr;
		}

		.rule-card {
			padding: 1.5rem;
		}

		.engines {
			gap: 3rem;
			margin-top: 4rem;
			grid-template-columns: 1fr;
		}
	}
</style>
