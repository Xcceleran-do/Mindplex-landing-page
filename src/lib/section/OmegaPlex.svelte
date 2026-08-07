<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { reveal } from '$lib/actions/reveal';

	/**
	 * Chapter 09: one reasoning architecture, configured into different beats.
	 */

	const beats = [
		{ name: 'AGI & Frontier AI', live: true },
		{ name: 'Decentralized AI', live: false },
		{ name: 'Biotech & Longevity', live: false },
		{ name: 'Geopolitics of Compute', live: false }
	];

	const perBeat = [
		'Watchlist',
		'Source hierarchy',
		'Methodology',
		'Voice',
		'Memory namespace',
		'Engagement rules'
	];
</script>

<section id="beats" class="section beats-section">
	<div class="section-wide">
		<div use:reveal class="section-intro">
			<p class="section-kicker tnum">09 · Beats</p>
			<h2 class="landing-heading">One engine. Many minds.</h2>
			<p class="landing-lead">
				The same agent architecture, configured into different reporters. Each beat is its own mind
				with the same machinery underneath.
			</p>
		</div>

		<div use:reveal={100} class="beats-board">
			<div class="beats-tree">
				<p class="tree-root">OmegaClaw</p>
				<ul>
					{#each beats as beat, i (beat.name)}
						<li use:reveal={150 + i * 80}>
							{beat.name}
							{#if beat.live}<span class="live-badge">Live</span>{/if}
						</li>
					{/each}
				</ul>
				<a href="https://magazine.mindplex.ai">
					Open the publication
					<ArrowUpRight size={17} strokeWidth={2} aria-hidden="true" />
				</a>
			</div>

			<div class="beats-config">
				<p class="board-label">Each beat gets its own</p>
				<ul>
					{#each perBeat as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
				<p class="config-note">But every beat shares the same reasoning architecture.</p>
			</div>
		</div>
	</div>
</section>

<style>
	.beats-section {
		position: relative;
		overflow: hidden;
	}

	.section-intro {
		max-width: 55rem;
	}

	.beats-board {
		position: relative;
		display: grid;
		margin-top: 4.5rem;
		overflow: hidden;
		border: 1px solid var(--border-strong);
		border-radius: 1.25rem;
		background: var(--surface);
		box-shadow: 0 2rem 7rem color-mix(in oklab, var(--accent) 8%, transparent);
		grid-template-columns: minmax(0, 1.3fr) minmax(18rem, 0.7fr);
	}

	.beats-board::after {
		position: absolute;
		top: 0;
		left: 0;
		width: 38%;
		height: 2px;
		background: var(--accent);
		content: '';
	}

	.beats-tree,
	.beats-config {
		padding: clamp(2rem, 5vw, 4.5rem);
	}

	.beats-tree {
		border-inline-end: 1px solid var(--border);
	}

	.tree-root {
		font-size: clamp(2.25rem, 4.5vw, 3.75rem);
		font-weight: 720;
		line-height: 1;
		letter-spacing: -0.045em;
		color: var(--accent);
	}

	/* The beats hang off one trunk line under the engine's name. */
	.beats-tree ul {
		margin-top: 2rem;
		border-inline-start: 2px solid var(--border-strong);
		margin-inline-start: 0.25rem;
		padding-inline-start: 0;
	}

	.beats-tree li {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.9rem;
		padding-block: 0.95rem;
		padding-inline-start: 2rem;
		font-size: clamp(1.125rem, 1.8vw, 1.5rem);
		font-weight: 680;
		letter-spacing: -0.015em;
	}

	.beats-tree li::before {
		position: absolute;
		top: 50%;
		inset-inline-start: 0;
		width: 1.35rem;
		height: 2px;
		background: var(--border-strong);
		content: '';
	}

	.live-badge {
		border: 1px solid color-mix(in oklab, var(--accent) 55%, transparent);
		border-radius: 999px;
		padding: 0.2rem 0.7rem;
		font-size: 0.6875rem;
		font-weight: 750;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--accent);
	}

	.beats-tree a {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 2.25rem;
		border-bottom: 1px solid var(--border-strong);
		padding-bottom: 0.3rem;
		font-size: 0.9375rem;
		font-weight: 680;
		transition:
			border-color 180ms ease,
			color 180ms ease;
	}

	.beats-tree a:hover {
		border-color: var(--accent);
		color: var(--accent);
	}

	.beats-config {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.board-label {
		font-size: 0.8125rem;
		font-weight: 650;
		color: var(--muted-foreground);
	}

	.beats-config ul {
		margin-top: 2rem;
	}

	.beats-config li {
		border-top: 1px solid var(--border);
		padding-block: 1rem;
		font-size: 1rem;
		font-weight: 620;
	}

	.config-note {
		max-width: 24rem;
		margin-top: 2rem;
		font-size: 0.9rem;
		line-height: 1.55;
		color: var(--muted-foreground);
	}

	@media (max-width: 767px) {
		.beats-board {
			margin-top: 3rem;
			grid-template-columns: 1fr;
		}

		.beats-tree {
			border-inline-end: 0;
			border-block-end: 1px solid var(--border);
		}
	}
</style>
