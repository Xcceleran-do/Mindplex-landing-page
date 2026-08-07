<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import EngineCanvas from '$lib/components/EngineCanvas.svelte';

	/**
	 * Chapter 06: publication authority stays human. The visual is the same
	 * particle "human at the gate" figure from the engine canvas, held on its
	 * final stage.
	 */
</script>

<section id="editor" class="section editor-section">
	<div class="section-wide editor-layout">
		<div use:reveal class="editor-copy">
			<p class="section-kicker tnum">06 · The last word</p>
			<h2 class="landing-heading">A human gets the last word.</h2>
			<p class="landing-lead">The machine investigates. The editor publishes.</p>
			<p class="editor-body">
				OmegaClaw does not get a publish button. The completed draft, its source ledger and the
				reasoning results are handed to Mindplex, where an editor can inspect the evidence, change
				the story, reject it — or publish it.
			</p>
			<p class="editor-close">
				And the version that becomes authoritative memory is the one the editor published — not the
				AI's original draft.
			</p>
		</div>

		<div class="editor-visual" aria-hidden="true">
			<EngineCanvas activeStage={3} />
		</div>
	</div>
</section>

<style>
	.editor-layout {
		display: grid;
		align-items: center;
		gap: clamp(3rem, 7vw, 7rem);
		grid-template-columns: minmax(0, 1.05fr) minmax(18rem, 0.85fr);
	}

	.editor-copy {
		max-width: 38rem;
	}

	.editor-body {
		margin-top: 2rem;
		font-size: 1.05rem;
		line-height: 1.65;
	}

	.editor-close {
		margin-top: 1.5rem;
		font-family: var(--font-display);
		font-style: italic;
		font-size: 1.25rem;
		line-height: 1.45;
		color: color-mix(in oklab, var(--foreground) 90%, var(--background));
	}

	.editor-visual {
		position: relative;
		min-height: min(58vh, 34rem);
	}

	@media (max-width: 900px) {
		.editor-layout {
			grid-template-columns: 1fr;
		}

		.editor-visual {
			min-height: 24rem;
		}
	}
</style>
