<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import EngineCanvas from '$lib/components/EngineCanvas.svelte';

	/**
	 * Chapters 01–02 of the story: triage (eye) and pattern detection (spiral galaxy).
	 * The sticky particle symbol morphs as the reader scrolls between them.
	 */

	const tiers = [
		{ source: 'arXiv paper', tier: 'Primary evidence', rank: 0 },
		{ source: 'Company release', tier: 'Primary evidence', rank: 0 },
		{ source: 'Reuters report', tier: 'Corroboration', rank: 1 },
		{ source: 'Aggregator', tier: 'Secondary', rank: 2 },
		{ source: 'X post', tier: 'Signal only', rank: 3 }
	];

	const accumulation = [
		{ n: '14', label: 'mentions' },
		{ n: '5', label: 'independent sources' },
		{ n: '3', label: 'days' },
		{ n: '2', label: 'related companies' },
		{ n: '1', label: 'unresolved storyline' }
	];

	let activeStage = $state(0);

	function activateStage(node: HTMLElement, index: number) {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) activeStage = index;
			},
			{ rootMargin: '-30% 0px -48% 0px', threshold: 0.1 }
		);

		observer.observe(node);
		return { destroy: () => observer.disconnect() };
	}
</script>

<section id="how-it-works" class="section engine-section">
	<div class="section-wide">
		<div class="engine-layout">
			<div class="engine-sticky" aria-hidden="true">
				<div class="engine-visual">
					<EngineCanvas {activeStage} />
				</div>
			</div>

			<ol class="engine-copy">
				<li use:activateStage={0} class:active={activeStage === 0}>
					<p class="chapter tnum">01 · Signals</p>
					<h3>The web moves. <span>OmegaPlex is already watching.</span></h3>
					<p>
						Hundreds of new signals appear across research papers, lab announcements, policy
						documents, GitHub repositories, company posts, news reports and social feeds. OmegaPlex
						does not treat them equally.
					</p>
					<p class="chapter-detail">
						It knows which sources can establish a fact, which can corroborate one, and which are
						useful only as an early signal.
					</p>

					<div class="tier-ladder" role="table" aria-label="Source hierarchy">
						{#each tiers as row (row.source)}
							<div role="row" class="tier-row" data-rank={row.rank}>
								<span role="cell">{row.source}</span>
								<span role="cell" class="tier-label">{row.tier}</span>
							</div>
						{/each}
					</div>

					<p class="chapter-close">
						A viral post can tell OmegaPlex where to look. It cannot tell OmegaPlex what is true.
					</p>
				</li>

				<li use:activateStage={1} class:active={activeStage === 1}>
					<p class="chapter tnum">02 · Patterns</p>
					<h3>It looks for patterns.</h3>
					<p>
						A story is more than a trending link. OmegaPlex compares today's signals with entities,
						events and storylines it has been following across previous reporting cycles. Repeated
						observations leave symbolic breadcrumbs.
					</p>
					<p class="chapter-detail">
						NAL accumulates those observations and derives that something is becoming significant.
						PLN combines signals, like an active storyline or rising reader demand, to raise a
						candidate's editorial priority.
					</p>

					<div class="accumulation" aria-label="Signals accumulating into a pattern">
						<ul class="tnum">
							{#each accumulation as item (item.label)}
								<li><strong>{item.n}</strong> {item.label}</li>
							{/each}
						</ul>
						<div class="derivation">
							<span class="derivation-arrow" aria-hidden="true">↓</span>
							<p>
								<span>Emerging pattern</span>
								<strong>Frontier model governance</strong>
							</p>
						</div>
					</div>

					<p class="chapter-close">
						The question changes from &ldquo;What's new?&rdquo; to &ldquo;What changed?&rdquo;
					</p>
				</li>
			</ol>
		</div>
	</div>
</section>

<style>
	.engine-section {
		border-block: 1px solid var(--border);
		background: var(--surface);
	}

	.engine-layout {
		display: grid;
		align-items: start;
		gap: clamp(3rem, 8vw, 8rem);
		grid-template-columns: minmax(0, 1.05fr) minmax(20rem, 0.75fr);
	}

	.engine-sticky {
		position: sticky;
		top: 6.5rem;
	}

	.engine-visual {
		position: relative;
		min-height: min(66vh, 42rem);
	}

	.engine-copy > li {
		display: flex;
		min-height: 60vh;
		flex-direction: column;
		justify-content: center;
		border-top: 1px solid var(--border);
		padding-block: 3.5rem;
		opacity: 0.45;
		transition:
			opacity 360ms ease,
			transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.engine-copy > li.active {
		opacity: 1;
		transform: translateX(-0.75rem);
	}

	.chapter {
		font-size: 0.75rem;
		font-weight: 720;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--accent);
	}

	.engine-copy h3 {
		margin-top: 1.25rem;
		font-size: clamp(1.9rem, 3.4vw, 3rem);
		font-weight: 710;
		line-height: 1.02;
		letter-spacing: -0.04em;
		text-wrap: balance;
	}

	.engine-copy h3 span {
		color: var(--accent);
	}

	.engine-copy p:not(.chapter) {
		max-width: 34rem;
		margin-top: 1.25rem;
		font-size: 1.05rem;
		line-height: 1.6;
	}

	.chapter-detail {
		font-size: 0.95rem !important;
		color: var(--muted-foreground);
	}

	.chapter-close {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 1.2rem !important;
		line-height: 1.45;
		color: color-mix(in oklab, var(--foreground) 90%, var(--background));
	}

	/* ---- 01: the source ladder ---- */

	.tier-ladder {
		margin-top: 2rem;
		border-top: 1px solid var(--border-strong);
		max-width: 34rem;
	}

	.tier-row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1.5rem;
		border-bottom: 1px solid var(--border);
		padding-block: 0.8rem;
		font-size: 0.9375rem;
		font-weight: 620;
	}

	.tier-label {
		flex: none;
		font-size: 0.6875rem;
		font-weight: 720;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	/* The ladder fades with the rank: fact-establishing sources bright and
	   accented, signal-only sources visibly demoted. */
	.tier-row[data-rank='0'] .tier-label {
		color: var(--accent);
	}

	.tier-row[data-rank='1'] .tier-label {
		color: var(--foreground);
	}

	.tier-row[data-rank='2'],
	.tier-row[data-rank='3'] {
		color: var(--muted-foreground);
	}

	.tier-row[data-rank='2'] .tier-label,
	.tier-row[data-rank='3'] .tier-label {
		color: var(--muted-foreground);
	}

	.tier-row[data-rank='3'] {
		color: color-mix(in oklab, var(--muted-foreground) 72%, var(--background));
	}

	/* ---- 02: accumulation ---- */

	.accumulation {
		max-width: 34rem;
		margin-top: 2rem;
		border-top: 1px solid var(--border-strong);
		padding-top: 1.25rem;
	}

	.accumulation ul li {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		padding-block: 0.35rem;
		font-size: 0.9375rem;
		color: var(--muted-foreground);
	}

	.accumulation ul strong {
		min-width: 1.6ch;
		font-size: 1.05rem;
		font-weight: 720;
		text-align: end;
		color: var(--foreground);
	}

	.derivation {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-top: 1.25rem;
	}

	.derivation-arrow {
		font-size: 1.25rem;
		color: var(--accent);
	}

	.derivation p span {
		display: block;
		font-size: 0.6875rem;
		font-weight: 720;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--muted-foreground);
	}

	.derivation p strong {
		display: block;
		margin-top: 0.3rem;
		font-size: 1.25rem;
		font-weight: 720;
		letter-spacing: -0.02em;
		color: var(--accent);
	}

	@media (max-width: 900px) {
		.engine-layout {
			grid-template-columns: 1fr;
		}

		.engine-sticky {
			position: relative;
			top: auto;
		}

		.engine-visual {
			min-height: 26rem;
		}

		.engine-copy > li {
			min-height: 0;
			opacity: 1;
		}

		.engine-copy > li.active {
			transform: none;
		}
	}

	@media (max-width: 640px) {
		.engine-visual {
			min-height: 20rem;
		}

		.engine-copy > li {
			padding-block: 2.5rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.engine-copy > li {
			transition: none;
		}
	}
</style>
