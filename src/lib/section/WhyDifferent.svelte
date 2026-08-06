<script lang="ts">
	import BadgeCheck from '@lucide/svelte/icons/badge-check';
	import CircleAlert from '@lucide/svelte/icons/circle-alert';
	import CircleSlash from '@lucide/svelte/icons/circle-slash';
	import { reveal } from '$lib/actions/reveal';
	import { differentiators, dispositions } from '$lib/data/omegaplex';

	const verdicts = dispositions.map((item, i) => ({
		...item,
		icon: [BadgeCheck, CircleAlert, CircleSlash][i]
	}));

	const principles = [differentiators[1], differentiators[3], differentiators[5]];
</script>

<section id="trust" class="section trust-section">
	<div class="section-wide">
		<div use:reveal class="section-intro">
			<h2 class="landing-heading">Trust is built into the draft.</h2>
			<p class="landing-lead">
				Every claim leaves a source trail, meets an explicit rule, and reaches a person before it
				reaches you.
			</p>
		</div>

		<div class="trust-layout">
			<div use:reveal={100} class="verdict-machine">
				<div class="claim-input">
					<span>Draft claim</span>
					<strong>Evidence and memory checked</strong>
				</div>

				<div class="verdict-rule" aria-hidden="true"></div>

				<div class="verdicts">
					{#each verdicts as item (item.name)}
						<div>
							<item.icon
								class="mt-0.5 text-accent"
								size={20}
								strokeWidth={1.9}
								aria-hidden="true"
							/>
							<h3>{item.name}</h3>
							<p>{item.body}</p>
						</div>
					{/each}
				</div>
			</div>

			<div class="trust-principles">
				{#each principles as item, i (item.title)}
					<article use:reveal={i * 80}>
						<item.icon class="mt-0.5 text-accent" size={21} strokeWidth={1.75} aria-hidden="true" />
						<div>
							<h3>{item.title}</h3>
							<p>{item.description}</p>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.trust-section {
		border-block: 1px solid var(--border);
		background: var(--surface);
	}

	.section-intro {
		max-width: 57rem;
	}

	.trust-layout {
		display: grid;
		align-items: start;
		gap: clamp(3rem, 7vw, 7rem);
		margin-top: 4.5rem;
		grid-template-columns: minmax(0, 1.15fr) minmax(18rem, 0.65fr);
	}

	.verdict-machine {
		overflow: hidden;
		border: 1px solid var(--border-strong);
		border-radius: 1.25rem;
		background: var(--background);
	}

	.claim-input {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		padding: 1.35rem 1.5rem;
	}

	.claim-input span {
		font-size: 0.75rem;
		font-weight: 680;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--muted-foreground);
	}

	.claim-input strong {
		font-size: 0.875rem;
		font-weight: 650;
		text-align: end;
	}

	.verdict-rule {
		position: relative;
		overflow: hidden;
		height: 4.5rem;
		border-block: 1px solid var(--border);
		background: linear-gradient(90deg, transparent, var(--accent-wash), transparent);
	}

	/* Full-width carrier with the dot painted at its left edge: translateX in
	   percent then moves the dot relative to the strip, staying off layout. */
	.verdict-rule::before {
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		height: 0.65rem;
		background: radial-gradient(circle closest-side, var(--accent) 62%, transparent) left center /
			0.65rem 0.65rem no-repeat;
		filter: drop-shadow(0 0 0.75rem color-mix(in oklab, var(--accent) 55%, transparent));
		content: '';
		transform: translate(30%, -50%);
		animation: scan 3.2s ease-in-out infinite;
	}

	.verdicts > div {
		display: grid;
		align-items: start;
		gap: 1rem;
		border-top: 1px solid var(--border);
		padding: 1.5rem;
		grid-template-columns: auto minmax(5rem, 0.35fr) minmax(0, 1fr);
	}

	.verdicts > div:first-child {
		border-top: 0;
	}

	.verdicts h3 {
		font-size: 0.9375rem;
		font-weight: 720;
	}

	.verdicts p {
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--muted-foreground);
	}

	.trust-principles article {
		display: grid;
		gap: 1.1rem;
		border-top: 1px solid var(--border-strong);
		padding-block: 1.75rem;
		grid-template-columns: auto 1fr;
	}

	.trust-principles article:first-child {
		padding-top: 0;
	}

	.trust-principles h3 {
		font-size: 1rem;
		font-weight: 700;
	}

	.trust-principles p {
		margin-top: 0.5rem;
		font-size: 0.9rem;
		line-height: 1.65;
		color: var(--muted-foreground);
	}

	@keyframes scan {
		0%,
		100% {
			transform: translate(30%, -50%);
		}
		50% {
			transform: translate(66%, -50%);
		}
	}

	@media (max-width: 900px) {
		.trust-layout {
			grid-template-columns: 1fr;
		}

		.trust-principles {
			display: grid;
			gap: 1.5rem;
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}

		.trust-principles article {
			display: block;
			border-top: 1px solid var(--border-strong);
			padding-top: 1.5rem;
		}

		.trust-principles h3 {
			margin-top: 1.1rem;
		}
	}

	@media (max-width: 700px) {
		.trust-layout {
			margin-top: 3rem;
		}

		.claim-input {
			align-items: flex-start;
			flex-direction: column;
			gap: 0.5rem;
		}

		.claim-input strong {
			text-align: start;
		}

		.verdicts > div {
			gap: 0.75rem;
			grid-template-columns: auto 1fr;
		}

		.verdicts p {
			grid-column: 2;
		}

		.trust-principles {
			grid-template-columns: 1fr;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.verdict-rule::before {
			animation: none;
		}
	}
</style>
