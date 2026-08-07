<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ArrowDown from '@lucide/svelte/icons/arrow-down';

	/**
	 * Type-led opener for the /omegaplex story. Deliberately no canvas: the
	 * homepage hero owns the FlowCanvas scene, and EngineCanvas arrives one
	 * scroll down. The chapter index doubles as the page's table of contents.
	 */

	const chapters = [
		{ n: '01', name: 'Signals', href: '#how-it-works' },
		{ n: '02', name: 'Patterns', href: '#how-it-works' },
		{ n: '03', name: 'Memory', href: '#memory' },
		{ n: '04', name: 'Reasoning', href: '#reasoning' },
		{ n: '05', name: 'Self-critique', href: '#trust' },
		{ n: '06', name: 'The last word', href: '#editor' },
		{ n: '07', name: 'The loop', href: '#loop' },
		{ n: '08', name: 'Under the newsroom', href: '#stack' },
		{ n: '09', name: 'Beats', href: '#beats' }
	];
</script>

<section class="section opener">
	<div class="section-wide opener-grid">
		<div class="opener-copy">
			<p class="opener-kicker">OmegaPlex</p>
			<h1 class="opener-title">An AI newsroom that <span>reasons before it writes.</span></h1>
			<p class="opener-lead">
				OmegaPlex watches one beat continuously. It discovers signals, detects emerging patterns,
				remembers what happened before, reasons over what it knows, tests every important claim, and
				drafts the story. A human editor decides what gets published.
			</p>

			<div class="opener-actions">
				<a class="button button-primary" href="https://magazine.mindplex.ai">
					Read OmegaPlex
					<ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
				</a>
				<a class="button button-ghost" href="#how-it-works">
					Watch how it thinks
					<ArrowDown size={16} strokeWidth={2} aria-hidden="true" />
				</a>
			</div>

			<p class="opener-note">Powered by OmegaClaw, MeTTa, Atomspace, NAL and PLN.</p>
		</div>

		<nav class="opener-index" aria-label="Chapters on this page">
			<ol>
				{#each chapters as chapter, i (chapter.n)}
					<li style="--d: {0.3 + i * 0.055}s">
						<a href={chapter.href}>
							<span class="tnum">{chapter.n}</span>
							{chapter.name}
						</a>
					</li>
				{/each}
			</ol>
		</nav>
	</div>
</section>

<style>
	.opener {
		position: relative;
		overflow: hidden;
		border-block-end: 1px solid var(--border);
	}

	/* One soft accent wash for depth, same device as the closing section. */
	.opener::before {
		position: absolute;
		top: -20rem;
		left: -16rem;
		width: 46rem;
		height: 46rem;
		background: radial-gradient(
			circle,
			color-mix(in oklab, var(--accent) 9%, transparent),
			transparent 65%
		);
		content: '';
	}

	.opener-grid {
		position: relative;
		z-index: 1;
		display: grid;
		align-items: center;
		gap: clamp(3rem, 7vw, 7rem);
		grid-template-columns: minmax(0, 1.15fr) minmax(16rem, 0.55fr);
	}

	/* staggered entrance: each block lands just after the one above it */
	.opener-kicker,
	.opener-title,
	.opener-lead,
	.opener-actions,
	.opener-note,
	.opener-index li {
		animation: opener-enter 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	.opener-kicker {
		animation-delay: 0.05s;
	}

	.opener-title {
		animation-delay: 0.12s;
	}

	.opener-lead {
		animation-delay: 0.2s;
	}

	.opener-actions {
		animation-delay: 0.28s;
	}

	.opener-note {
		animation-delay: 0.36s;
	}

	.opener-index li {
		animation-delay: var(--d);
	}

	.opener-kicker {
		margin-bottom: 1.5rem;
		font-size: 0.75rem;
		font-weight: 750;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--accent);
	}

	.opener-title {
		max-width: 17ch;
		font-size: clamp(2.7rem, 5vw, 5rem);
		font-weight: 760;
		line-height: 0.96;
		letter-spacing: -0.055em;
		text-wrap: balance;
	}

	.opener-title span {
		color: var(--accent-strong);
	}

	.opener-lead {
		max-width: 39rem;
		margin-top: 2rem;
		font-size: clamp(1.05rem, 1.4vw, 1.25rem);
		line-height: 1.55;
		color: var(--muted-foreground);
	}

	.opener-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 2.25rem;
	}

	.opener-note {
		margin-top: 2.5rem;
		font-size: 0.8125rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: var(--muted-foreground);
	}

	.button {
		display: inline-flex;
		min-height: 3.25rem;
		align-items: center;
		justify-content: center;
		gap: 0.65rem;
		border-radius: 999px;
		padding: 0.85rem 1.35rem;
		font-size: 0.9375rem;
		font-weight: 680;
		white-space: nowrap;
		transition:
			transform 180ms ease,
			background-color 180ms ease,
			border-color 180ms ease;
	}

	.button:hover {
		transform: translateY(-2px);
	}

	.button:active {
		transform: translateY(1px) scale(0.98);
	}

	.button-primary {
		background: var(--accent);
		color: var(--accent-foreground);
	}

	.button-primary:hover {
		background: var(--accent-strong);
	}

	.button-ghost {
		border: 1px solid var(--border-strong);
		background: var(--surface);
	}

	.button-ghost:hover {
		border-color: var(--accent);
	}

	/* The chapter index: the page's numbered spine, browsable up front. */
	.opener-index ol {
		border-block-start: 2px solid var(--foreground);
	}

	.opener-index a {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		border-block-end: 1px solid var(--border);
		padding-block: 0.7rem;
		font-size: 0.9375rem;
		font-weight: 620;
		color: var(--muted-foreground);
		transition: color 180ms ease;
	}

	.opener-index a:hover {
		color: var(--foreground);
	}

	.opener-index .tnum {
		font-size: 0.75rem;
		font-weight: 720;
		color: var(--accent);
	}

	@media (max-width: 900px) {
		.opener-grid {
			gap: 3rem;
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 420px) {
		.opener-actions {
			align-items: stretch;
			flex-direction: column;
		}

		.button {
			width: 100%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.opener-kicker,
		.opener-title,
		.opener-lead,
		.opener-actions,
		.opener-note,
		.opener-index li {
			animation: none;
		}

		.button {
			transition: none;
		}
	}
</style>
