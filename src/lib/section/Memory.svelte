<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import Minus from '@lucide/svelte/icons/minus';
	import { reveal } from '$lib/actions/reveal';
	import CompressionCanvas from '$lib/components/CompressionCanvas.svelte';

	const kept = ['Entities', 'Storylines', 'Unresolved questions', 'Editorial decisions'];
	const leftBehind = ['Raw articles', 'Drafts', 'Full conversations', 'Comment threads'];

	// Scattered like fragments floating in the signal field, not a list.
	const signals = [
		{ label: 'Objections', x: 2, y: 6, scale: 1 },
		{ label: 'Questions', x: 50, y: 16, scale: 0.92 },
		{ label: 'Disputes', x: 20, y: 40, scale: 1.06 },
		{ label: 'Context', x: 54, y: 60, scale: 0.9 },
		{ label: 'Leads', x: 12, y: 76, scale: 0.84 }
	];
</script>

<section id="memory" class="section memory-section">
	<div class="section-wide">
		<div use:reveal class="memory-heading">
			<p class="section-kicker">Symbolic memory</p>
			<h2 class="landing-heading">300 comments in.<br />One atom out.</h2>
			<p class="landing-lead">
				A full day of discussion becomes reusable knowledge. The graph keeps the signal, not the raw
				conversation.
			</p>
		</div>

		<div class="compression" aria-label="Reader discussion compressed into one structured digest">
			<div class="compression-canvas" aria-hidden="true">
				<CompressionCanvas />
			</div>

			<div class="signal-cloud" aria-hidden="true">
				{#each signals as s, i (s.label)}
					<span
						use:reveal={i * 70}
						class="chip"
						style="left: {s.x}%; top: {s.y}%; --chip-scale: {s.scale}; --drift: {6 + i * 1.4}s"
					>
						{s.label}
					</span>
				{/each}
			</div>

			<div use:reveal={420} class="atom-caption">
				<span>Structured digest</span>
				<strong>Reusable knowledge</strong>
			</div>
		</div>

		<div class="memory-ledger">
			<div use:reveal>
				<h3>Memory keeps</h3>
				<ul>
					{#each kept as item (item)}
						<li>
							<Check class="flex-none text-accent" size={16} strokeWidth={2} aria-hidden="true" />
							{item}
						</li>
					{/each}
				</ul>
			</div>

			<div use:reveal={100}>
				<h3>Memory leaves behind</h3>
				<ul class="muted-list">
					{#each leftBehind as item (item)}
						<li>
							<Minus class="flex-none" size={16} strokeWidth={2} aria-hidden="true" />
							{item}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

<style>
	.memory-section {
		position: relative;
		overflow: hidden;
	}

	.memory-heading {
		position: relative;
		z-index: 1;
		max-width: 60rem;
	}

	.compression {
		position: relative;
		display: grid;
		min-height: 28rem;
		align-items: center;
		gap: 3rem;
		margin-top: 5rem;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
	}

	.compression-canvas {
		position: absolute;
		inset: 0;
	}

	.signal-cloud {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: 26rem;
		height: clamp(14rem, 26vw, 18rem);
		justify-self: center;
	}

	/* Frosted chips floating in the particle field: the stream blurs through
	   them, tying the labels to the scene instead of sitting beside it. */
	.signal-cloud .chip {
		position: absolute;
		border: 1px solid color-mix(in oklab, var(--accent) 16%, var(--border));
		border-radius: 999px;
		background: color-mix(in oklab, var(--surface) 45%, transparent);
		backdrop-filter: blur(10px);
		box-shadow: inset 0 1px 0 oklch(100% 0 0 / 0.07);
		padding: 0.7rem 1.4rem;
		font-size: 0.9rem;
		font-weight: 620;
		color: var(--muted-foreground);
		scale: var(--chip-scale);
		animation: chip-drift var(--drift) ease-in-out infinite alternate;
	}

	@keyframes chip-drift {
		to {
			translate: 0.4rem -0.35rem;
		}
	}

	@media (prefers-reduced-transparency: reduce) {
		.signal-cloud .chip {
			background: var(--surface);
			backdrop-filter: none;
		}
	}

	/* Caption pinned under the atom's spot in the canvas. */
	.atom-caption {
		position: relative;
		z-index: 1;
		align-self: end;
		justify-self: center;
		text-align: center;
	}

	.atom-caption span {
		display: block;
		font-size: 0.75rem;
		font-weight: 680;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--muted-foreground);
	}

	.atom-caption strong {
		display: block;
		margin-top: 0.55rem;
		font-size: clamp(1.375rem, 2.5vw, 1.875rem);
		line-height: 1;
		color: var(--accent);
	}

	.memory-ledger {
		display: grid;
		gap: 5rem;
		margin-top: 6rem;
		border-top: 1px solid var(--border-strong);
		padding-top: 3rem;
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.memory-ledger > div + div {
		border-inline-start: 1px solid var(--border);
		padding-inline-start: 5rem;
	}

	.memory-ledger h3 {
		font-size: 1rem;
		font-weight: 700;
	}

	.memory-ledger ul {
		display: grid;
		gap: 0.85rem 2rem;
		margin-top: 1.5rem;
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.memory-ledger li {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.9375rem;
		font-weight: 620;
	}

	.memory-ledger .muted-list li {
		font-weight: 500;
		color: var(--muted-foreground);
	}

	@media (max-width: 767px) {
		.compression {
			min-height: 34rem;
			gap: 1.5rem;
			margin-top: 3.5rem;
			grid-template-columns: 1fr;
		}

		.signal-cloud {
			align-self: start;
			padding-top: 1rem;
		}

		.atom-caption {
			align-self: end;
			padding-bottom: 0.5rem;
		}

		.memory-ledger {
			gap: 2.5rem;
			margin-top: 4rem;
			grid-template-columns: 1fr;
		}

		.memory-ledger > div + div {
			border-top: 1px solid var(--border);
			border-inline-start: 0;
			padding-top: 2.5rem;
			padding-inline-start: 0;
		}
	}

	@media (max-width: 480px) {
		/* The hard break orphans "in." on narrow screens; let balance wrap it. */
		.memory-heading h2 :global(br) {
			display: none;
		}

		.memory-ledger ul {
			grid-template-columns: 1fr;
		}
	}
</style>
