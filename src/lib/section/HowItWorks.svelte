<script lang="ts">
	import Binoculars from '@lucide/svelte/icons/binoculars';
	import BrainCircuit from '@lucide/svelte/icons/brain-circuit';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import UserCheck from '@lucide/svelte/icons/user-check';
	import { reveal } from '$lib/actions/reveal';
	import EngineCanvas from '$lib/components/EngineCanvas.svelte';

	const stages = [
		{
			name: 'Observe',
			short: 'Sources in',
			body: 'Collect, filter, cluster, and rank source candidates across one defined beat.',
			detail: 'The system narrows the feed before it spends time reading deeply.',
			icon: Binoculars
		},
		{
			name: 'Remember',
			short: 'Context joins',
			body: 'Pull prior storylines, disputes, editorial decisions, and unresolved questions.',
			detail: 'Yesterday becomes context for today instead of disappearing into an archive.',
			icon: BrainCircuit
		},
		{
			name: 'Verify',
			short: 'Claims tested',
			body: 'Deep-read selected sources and test every draft claim against evidence and memory.',
			detail: 'Unsupported claims are flagged or removed before an editor sees the piece.',
			icon: ShieldCheck
		},
		{
			name: 'Hand off',
			short: 'Editor decides',
			body: 'Deliver the unpublished draft to a human editor with the source trail attached.',
			detail: 'Nothing is published until a person approves it.',
			icon: UserCheck
		}
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
		<div use:reveal class="section-intro">
			<h2 class="landing-heading">From signal to story.</h2>
			<p class="landing-lead">
				One continuous reporting loop, with memory behind every decision and a person at the final
				gate.
			</p>
		</div>

		<div class="engine-layout">
			<div class="engine-sticky" aria-hidden="true">
				<div class="engine-visual">
					<EngineCanvas {activeStage} />
					<!-- <p class="engine-caption">Controlled tools in. Typed output out.</p> -->
				</div>
			</div>

			<ol class="engine-copy">
				{#each stages as stage, i (stage.name)}
					<li use:activateStage={i} class:active={activeStage === i}>
						<div class="stage-icon" aria-hidden="true">
							<stage.icon size={20} strokeWidth={1.8} />
						</div>
						<h3>{stage.name}</h3>
						<p>{stage.body}</p>
						<span>{stage.detail}</span>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>

<style>
	.engine-section {
		border-block: 1px solid var(--border);
		background: var(--surface);
	}

	.section-intro {
		max-width: 55rem;
	}

	.engine-layout {
		display: grid;
		align-items: start;
		gap: clamp(3rem, 8vw, 8rem);
		margin-top: 4.5rem;
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

	.engine-caption {
		position: absolute;
		right: 1.5rem;
		bottom: 1.25rem;
		left: 1.5rem;
		font-size: 0.75rem;
		font-weight: 620;
		text-align: center;
		color: var(--muted-foreground);
	}

	.engine-copy li {
		display: flex;
		min-height: 40vh;
		flex-direction: column;
		justify-content: center;
		border-top: 1px solid var(--border);
		padding-block: 3rem;
		opacity: 0.45;
		transition:
			opacity 360ms ease,
			transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.engine-copy li.active {
		opacity: 1;
		transform: translateX(-0.75rem);
	}

	.stage-icon {
		display: flex;
		width: 2.75rem;
		height: 2.75rem;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--border-strong);
		border-radius: 50%;
		color: var(--accent);
	}

	.engine-copy h3 {
		margin-top: 1.5rem;
		font-size: clamp(2rem, 4vw, 3.5rem);
		font-weight: 710;
		line-height: 1;
		letter-spacing: -0.045em;
	}

	.engine-copy p {
		max-width: 34rem;
		margin-top: 1.25rem;
		font-size: 1.08rem;
		line-height: 1.6;
	}

	.engine-copy li > span {
		max-width: 31rem;
		margin-top: 0.75rem;
		font-size: 0.9rem;
		line-height: 1.6;
		color: var(--muted-foreground);
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
			min-height: 32rem;
		}

		.engine-copy {
			display: grid;
			gap: 0;
			grid-template-columns: repeat(2, 1fr);
		}

		.engine-copy li {
			min-height: 0;
			padding: 2rem 1.5rem 2.5rem 0;
			opacity: 1;
		}

		.engine-copy li.active {
			transform: none;
		}
	}

	@media (max-width: 640px) {
		.engine-layout {
			margin-top: 3rem;
		}

		.engine-visual {
			min-height: 24rem;
		}

		.engine-copy {
			grid-template-columns: 1fr;
		}

		.engine-copy li {
			border-top: 1px solid var(--border);
			padding: 2rem 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.engine-copy li {
			transition: none;
		}
	}
</style>
