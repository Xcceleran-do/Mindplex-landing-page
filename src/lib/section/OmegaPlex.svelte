<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { reveal } from '$lib/actions/reveal';
	import { beat } from '$lib/data/omegaplex';
</script>

<section id="coverage" class="section coverage-section">
	<div class="section-wide">
		<div use:reveal class="section-intro">
			<h2 class="landing-heading">One beat. Continuous context.</h2>
			<p class="landing-lead">
				OmegaPlex never wakes up to a blank page. Each story starts with what the beat already
				knows.
			</p>
		</div>

		<div use:reveal={100} class="coverage-board">
			<div class="current-beat">
				<p class="board-label">Now covering</p>
				<h3>{beat.current}</h3>
				<p>
					Sources, storylines, disputes, and open questions stay connected from one reporting cycle
					to the next.
				</p>
				<a href="https://magazine.mindplex.ai">
					Open the publication
					<ArrowUpRight size={17} strokeWidth={2} aria-hidden="true" />
				</a>
			</div>

			<div class="next-beats">
				<p class="board-label">The same engine can follow</p>
				<ul>
					{#each beat.planned as topic (topic)}
						<li>{topic}</li>
					{/each}
				</ul>
				<p class="next-note">One system. Different beats. Shared editorial discipline.</p>
			</div>
		</div>
	</div>
</section>

<style>
	.coverage-section {
		position: relative;
		overflow: hidden;
	}

	.section-intro {
		max-width: 55rem;
	}

	.coverage-board {
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

	.coverage-board::after {
		position: absolute;
		top: 0;
		left: 0;
		width: 38%;
		height: 2px;
		background: var(--accent);
		content: '';
	}

	.current-beat,
	.next-beats {
		padding: clamp(2rem, 5vw, 4.5rem);
	}

	.current-beat {
		border-inline-end: 1px solid var(--border);
	}

	.board-label {
		font-size: 0.8125rem;
		font-weight: 650;
		color: var(--muted-foreground);
	}

	.current-beat h3 {
		max-width: 12ch;
		margin-top: 1.25rem;
		font-size: clamp(2.5rem, 6vw, 5.5rem);
		font-weight: 720;
		line-height: 0.96;
		letter-spacing: -0.055em;
		color: var(--accent);
		text-wrap: balance;
	}

	.current-beat > p:not(.board-label) {
		max-width: 39rem;
		margin-top: 1.75rem;
		font-size: 1.05rem;
		line-height: 1.65;
		color: var(--muted-foreground);
	}

	.current-beat a {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 2rem;
		border-bottom: 1px solid var(--border-strong);
		padding-bottom: 0.3rem;
		font-size: 0.9375rem;
		font-weight: 680;
		transition:
			border-color 180ms ease,
			color 180ms ease;
	}

	.current-beat a:hover {
		border-color: var(--accent);
		color: var(--accent);
	}

	.next-beats {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.next-beats ul {
		margin-top: 2rem;
	}

	.next-beats li {
		border-top: 1px solid var(--border);
		padding-block: 1.1rem;
		font-size: 1rem;
		font-weight: 620;
	}

	.next-note {
		max-width: 24rem;
		margin-top: 2rem;
		font-size: 0.9rem;
		line-height: 1.55;
		color: var(--muted-foreground);
	}

	@media (max-width: 767px) {
		.coverage-board {
			margin-top: 3rem;
			grid-template-columns: 1fr;
		}

		.current-beat {
			border-inline-end: 0;
			border-block-end: 1px solid var(--border);
		}

		.current-beat h3 {
			font-size: clamp(2.7rem, 13vw, 4.5rem);
		}
	}
</style>
