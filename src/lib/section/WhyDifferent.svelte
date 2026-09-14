<script lang="ts">
	import { onMount } from 'svelte';
	import BadgeCheck from '@lucide/svelte/icons/badge-check';
	import CircleAlert from '@lucide/svelte/icons/circle-alert';
	import CircleSlash from '@lucide/svelte/icons/circle-slash';
	import { reveal } from '$lib/actions/reveal';

	/**
	 * Chapter 05: the self-critique pipeline. One claim per disposition, played
	 * through the verdict machine — auto-cycling until the reader takes over.
	 */

	const claims = [
		{
			name: 'Backed',
			icon: BadgeCheck,
			tone: 'backed',
			claim: 'Model Y was released on Thursday.',
			findings: ['Primary source found.', 'Consistent with existing memory.']
		},
		{
			name: 'Flagged',
			icon: CircleAlert,
			tone: 'flagged',
			claim: 'Model Y appears to outperform every competitor.',
			findings: ['Evidence is incomplete.', 'Comparative claim requires stronger corroboration.']
		},
		{
			name: 'Blocked',
			icon: CircleSlash,
			tone: 'blocked',
			claim: 'Company X has secretly cancelled Project Z.',
			findings: ['Only source: an anonymous social post.', 'Removed before editorial review.']
		}
	] as const;

	const checkedAgainst = [
		'Its cited sources',
		'The source hierarchy',
		'The methodology rules',
		'Existing symbolic memory',
		'Previously published claims',
		'Unresolved reader disputes'
	];

	let active = $state(0);
	let timer: ReturnType<typeof setInterval> | undefined;

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		timer = setInterval(() => (active = (active + 1) % claims.length), 5000);
		return () => clearInterval(timer);
	});

	// First manual pick ends the auto-cycle for good: the reader is driving now.
	function select(i: number) {
		clearInterval(timer);
		active = i;
	}
</script>

<section id="trust" class="section critique-section">
	<div class="section-wide">
		<div use:reveal class="section-intro">
			<p class="section-kicker tnum">05 · Self-critique</p>
			<h2 class="landing-heading">The AI argues with its own draft.</h2>
			<p class="landing-lead">
				Writing is only the first pass. No read, no cite: every source in a draft must be a page
				OmegaPlex actually opened, or the draft is rejected before an editor sees it. Next, each
				important claim gets its own verdict.
			</p>
		</div>

		<div class="critique-layout">
			<div use:reveal={100} class="verdict-machine">
				<div class="verdict-tabs" role="group" aria-label="Claim dispositions">
					{#each claims as c, i (c.name)}
						<button
							type="button"
							class:selected={active === i}
							data-tone={c.tone}
							aria-pressed={active === i}
							onclick={() => select(i)}
						>
							<c.icon size={16} strokeWidth={2.1} aria-hidden="true" />
							{c.name}
						</button>
					{/each}
				</div>

				{#key active}
					<div class="verdict-panel">
						<blockquote class="verdict-claim">
							&ldquo;{claims[active].claim}&rdquo;
						</blockquote>
						<ul class="verdict-findings">
							{#each claims[active].findings as finding, f (finding)}
								<li style="--i: {f}">{finding}</li>
							{/each}
						</ul>
						<p class="verdict-stamp" data-tone={claims[active].tone}>
							{claims[active].name}
						</p>
					</div>
				{/key}
			</div>

			<div class="critique-side">
				<article use:reveal class="extraction">
					<p class="extraction-label">A claim, extracted from the draft</p>
					<p class="extraction-claim">&ldquo;Company X released model Y.&rdquo;</p>
					<dl class="tnum">
						<div>
							<dt>Claim type</dt>
							<dd>factual</dd>
						</div>
						<div>
							<dt>Source</dt>
							<dd>company announcement</dd>
						</div>
						<div>
							<dt>Source tier</dt>
							<dd>1</dd>
						</div>
						<div>
							<dt>Corroborated</dt>
							<dd>yes</dd>
						</div>
					</dl>
				</article>

				<div use:reveal={90} class="checked-against">
					<h3>Every claim is checked against</h3>
					<ul>
						{#each checkedAgainst as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.critique-section {
		border-block: 1px solid var(--border);
		background: var(--surface);
	}

	.section-intro {
		max-width: 57rem;
	}

	.critique-layout {
		display: grid;
		align-items: start;
		gap: clamp(3rem, 7vw, 7rem);
		margin-top: 4.5rem;
		grid-template-columns: minmax(0, 1.15fr) minmax(18rem, 0.65fr);
	}

	/* ---- The verdict machine ---- */

	.verdict-machine {
		overflow: hidden;
		border: 1px solid var(--border-strong);
		border-radius: 1.25rem;
		background: var(--background);
	}

	.verdict-tabs {
		display: grid;
		border-bottom: 1px solid var(--border);
		grid-template-columns: repeat(3, 1fr);
	}

	.verdict-tabs button {
		display: flex;
		min-height: 3.25rem;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		border-inline-end: 1px solid var(--border);
		font-size: 0.875rem;
		font-weight: 680;
		color: var(--muted-foreground);
		transition:
			color 180ms ease,
			background-color 180ms ease,
			box-shadow 180ms ease;
	}

	.verdict-tabs button:last-child {
		border-inline-end: 0;
	}

	.verdict-tabs button:hover {
		color: var(--foreground);
	}

	.verdict-tabs button.selected {
		color: var(--tone);
		background: color-mix(in oklab, var(--tone) 8%, transparent);
		box-shadow: inset 0 -2px 0 var(--tone);
	}

	.verdict-tabs button[data-tone='backed'],
	.verdict-stamp[data-tone='backed'] {
		--tone: var(--backed);
	}

	.verdict-tabs button[data-tone='flagged'],
	.verdict-stamp[data-tone='flagged'] {
		--tone: var(--flagged);
	}

	.verdict-tabs button[data-tone='blocked'],
	.verdict-stamp[data-tone='blocked'] {
		--tone: var(--blocked);
	}

	.verdict-panel {
		display: flex;
		min-height: 21rem;
		flex-direction: column;
		padding: clamp(1.75rem, 4vw, 3rem);
	}

	/* The analyzer reads the sentence: the claim wipes in left to right. */
	.verdict-claim {
		max-width: 22ch;
		font-family: var(--font-display);
		font-style: italic;
		font-weight: 440;
		font-size: clamp(1.6rem, 2.8vw, 2.4rem);
		line-height: 1.2;
		letter-spacing: -0.01em;
		text-wrap: balance;
		animation: claim-scan 0.5s ease-out both;
	}

	.verdict-findings {
		flex: 1;
		margin-top: 1.75rem;
	}

	.verdict-findings li {
		position: relative;
		padding-block: 0.35rem;
		padding-inline-start: 1.25rem;
		font-size: 0.9375rem;
		line-height: 1.55;
		color: var(--muted-foreground);
		animation: finding-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
		animation-delay: calc(0.4s + var(--i) * 0.14s);
	}

	.verdict-findings li::before {
		position: absolute;
		inset-inline-start: 0;
		content: '–';
		color: var(--accent);
	}

	/* The copy desk's rubber stamp: lands late, slightly crooked, with a thump. */
	.verdict-stamp {
		align-self: flex-start;
		margin-top: 1.5rem;
		border: 2px solid var(--tone);
		border-radius: 0.5rem;
		padding: 0.4rem 1rem;
		font-size: 1rem;
		font-weight: 800;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--tone);
		rotate: -3deg;
		animation: stamp-land 0.32s cubic-bezier(0.34, 1.56, 0.64, 1) both;
		animation-delay: 0.85s;
	}

	@keyframes claim-scan {
		from {
			clip-path: inset(0 100% 0 0);
		}
		to {
			clip-path: inset(0 0 0 0);
		}
	}

	@keyframes finding-enter {
		from {
			opacity: 0;
			transform: translateY(0.5rem);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	@keyframes stamp-land {
		from {
			opacity: 0;
			scale: 1.7;
			rotate: -9deg;
		}
		to {
			opacity: 1;
			scale: 1;
			rotate: -3deg;
		}
	}

	/* ---- Side column ---- */

	.extraction {
		border: 1px solid var(--border-strong);
		border-radius: 1rem;
		padding: 1.5rem;
	}

	.extraction-label {
		font-size: 0.6875rem;
		font-weight: 720;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--muted-foreground);
	}

	.extraction-claim {
		margin-top: 0.9rem;
		font-family: var(--font-display);
		font-style: italic;
		font-size: 1.25rem;
	}

	.extraction dl {
		margin-top: 1.25rem;
		border-top: 1px solid var(--border);
	}

	.extraction dl div {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		border-bottom: 1px solid var(--border);
		padding-block: 0.55rem;
		font-size: 0.845rem;
	}

	.extraction dt {
		color: var(--muted-foreground);
	}

	.extraction dd {
		font-weight: 650;
	}

	.checked-against {
		margin-top: 2.5rem;
	}

	.checked-against h3 {
		font-size: 1rem;
		font-weight: 700;
	}

	.checked-against ul {
		margin-top: 1rem;
	}

	.checked-against li {
		border-top: 1px solid var(--border);
		padding-block: 0.65rem;
		font-size: 0.9rem;
		color: var(--muted-foreground);
	}

	@media (max-width: 900px) {
		.critique-layout {
			grid-template-columns: 1fr;
		}

		.critique-side {
			display: grid;
			align-items: start;
			gap: 2.5rem;
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.checked-against {
			margin-top: 0;
		}
	}

	@media (max-width: 700px) {
		.critique-layout {
			margin-top: 3rem;
		}

		.critique-side {
			grid-template-columns: 1fr;
		}

		.verdict-panel {
			min-height: 23rem;
		}

		.verdict-tabs button {
			font-size: 0.8125rem;
			gap: 0.35rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.verdict-claim,
		.verdict-findings li,
		.verdict-stamp {
			animation: none;
		}
	}
</style>
