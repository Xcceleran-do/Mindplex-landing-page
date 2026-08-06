<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import MessagesSquare from '@lucide/svelte/icons/messages-square';
	import { reveal } from '$lib/actions/reveal';
</script>

<section class="section closing-section">
	<div use:reveal class="section-wide closing-inner">
		<div>
			<h2 class="landing-heading">The beat is already moving.</h2>
			<p class="landing-lead">
				Read the reporting, inspect the sources, and push back when the conclusion does not hold.
			</p>
		</div>

		<div class="closing-actions">
			<a class="closing-primary" href="https://magazine.mindplex.ai">
				Read OmegaPlex
				<ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
			</a>
			<a class="closing-secondary" href="https://magazine.mindplex.ai/social">
				<MessagesSquare size={17} strokeWidth={1.9} aria-hidden="true" />
				Join the discussion
			</a>
		</div>
	</div>
</section>

<style>
	.closing-section {
		position: relative;
		overflow: hidden;
	}

	/* One soft wash instead of hairline arcs: same accent presence, no wireframe. */
	.closing-section::before {
		position: absolute;
		top: -18rem;
		right: -14rem;
		width: 44rem;
		height: 44rem;
		background: radial-gradient(
			circle,
			color-mix(in oklab, var(--accent) 10%, transparent),
			transparent 65%
		);
		content: '';
	}

	.closing-inner {
		position: relative;
		z-index: 1;
		display: grid;
		align-items: end;
		gap: 3rem;
		grid-template-columns: minmax(0, 1fr) auto;
	}

	.closing-inner > div:first-child {
		max-width: 54rem;
	}

	.closing-actions {
		display: flex;
		align-items: stretch;
		flex-direction: column;
		gap: 0.75rem;
		min-width: 13rem;
	}

	.closing-actions a {
		display: inline-flex;
		min-height: 3.25rem;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		border-radius: 999px;
		padding: 0.85rem 1.25rem;
		font-size: 0.9375rem;
		font-weight: 680;
		white-space: nowrap;
		transition:
			transform 180ms ease,
			background-color 180ms ease,
			border-color 180ms ease;
	}

	.closing-actions a:hover {
		transform: translateY(-2px);
	}

	.closing-actions a:active {
		transform: translateY(1px) scale(0.98);
	}

	.closing-primary {
		background: var(--accent);
		color: var(--accent-foreground);
	}

	.closing-primary:hover {
		background: var(--accent-strong);
	}

	.closing-secondary {
		border: 1px solid var(--border-strong);
		background: var(--surface);
	}

	.closing-secondary:hover {
		border-color: var(--accent);
	}

	@media (max-width: 767px) {
		.closing-inner {
			align-items: start;
			grid-template-columns: 1fr;
		}

		.closing-actions {
			align-items: flex-start;
			flex-direction: row;
			flex-wrap: wrap;
		}
	}

	@media (max-width: 460px) {
		.closing-actions {
			align-items: stretch;
			flex-direction: column;
		}

		.closing-actions a {
			width: 100%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.closing-actions a {
			transition: none;
		}
	}
</style>
