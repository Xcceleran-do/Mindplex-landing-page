<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import CompressionCanvas from '$lib/components/CompressionCanvas.svelte';

	const remembered = [
		{ term: 'Entities', example: 'OpenAI → frontier-model developer' },
		{ term: 'Storylines', example: 'Frontier-model governance → active' },
		{ term: 'Claims', example: 'Previous statements and their evidence' },
		{ term: 'Open questions', example: 'What remains unresolved' },
		{ term: 'Editorial decisions', example: 'What the newsroom already concluded' },
		{ term: 'Reader signals', example: 'What readers challenged or wanted investigated' }
	];
</script>

<section id="memory" class="section memory-section">
	<div class="section-wide">
		<div use:reveal class="memory-heading">
			<p class="section-kicker tnum">03 · Memory</p>
			<h2 class="landing-heading">It remembers what happened before.</h2>
			<p class="landing-lead">
				Every morning does not start from zero. Traditional AI summarizers get a pile of documents
				and produce a summary. OmegaPlex has persistent symbolic memory.
			</p>
		</div>

		<dl class="memory-grid">
			{#each remembered as item, i (item.term)}
				<div use:reveal={i * 60}>
					<dt>{item.term}</dt>
					<dd>{item.example}</dd>
				</div>
			{/each}
		</dl>

		<h3 use:reveal class="display-sm scene-heading">
			300 comments in.
			<br />One piece of knowledge out.
		</h3>

		<div
			class="compression"
			aria-label="Three hundred scattered dots pull together as the page scrolls and fuse into a single connected, brain-like knowledge structure"
		>
			<div class="compression-canvas" aria-hidden="true">
				<CompressionCanvas />
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

	.memory-grid {
		display: grid;
		gap: 2.5rem 3rem;
		margin-top: 4rem;
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.memory-grid > div {
		border-top: 1px solid var(--border-strong);
		padding-top: 1.1rem;
	}

	.memory-grid dt {
		font-size: 1rem;
		font-weight: 700;
	}

	.memory-grid dd {
		margin-top: 0.5rem;
		font-size: 0.9rem;
		line-height: 1.55;
		color: var(--muted-foreground);
	}

	.scene-heading {
		margin-top: 7rem;
	}

	.compression {
		position: relative;
		height: clamp(26rem, 58vh, 33rem);
		margin-top: 3rem;
	}

	.compression-canvas {
		position: absolute;
		inset: 0;
	}

	@media (max-width: 900px) {
		.memory-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 767px) {
		.memory-grid {
			gap: 1.75rem;
			margin-top: 3rem;
		}

		.scene-heading {
			margin-top: 4.5rem;
		}

		.compression {
			height: 42rem;
			margin-top: 2.5rem;
		}
	}

	@media (max-width: 480px) {
		/* The hard break orphans "in." on narrow screens; let balance wrap it. */
		.scene-heading :global(br) {
			display: none;
		}

		.memory-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
