<script lang="ts">
	import { channels, type ChannelId } from '$lib/design/channels';

	interface Props {
		/** Current headline per desk. */
		stories: Record<ChannelId, string>;
		active: ChannelId;
		onselect: (id: ChannelId) => void;
	}

	let { stories, active, onselect }: Props = $props();
</script>

<!--
	The signature.

	Four desks along the foot of the hero. Choosing one swaps the hero's
	lead story, so the page states its own argument (four desks, one place)
	as a layout rather than as another headline.
-->
<div class="channel-band" role="group" aria-label="Mindplex editorial desks">
	{#each channels as channel}
		<button
			class="band-cell"
			type="button"
			style="--ch: {channel.hex}"
			aria-pressed={channel.id === active}
			onclick={() => onselect(channel.id)}
			onmouseenter={() => onselect(channel.id)}
			onfocus={() => onselect(channel.id)}
		>
			<span class="label desk">{channel.label}</span>
			<span class="headline">{stories[channel.id]}</span>
		</button>
	{/each}
</div>

<style>
	.channel-band {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		border-top: 1px solid var(--line);
	}

	.band-cell {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 2rem;
		min-height: 8.5rem;
		padding: 1.15rem 1.15rem 1.35rem;
		overflow: hidden;
		border: 0;
		border-right: 1px solid var(--line);
		background: transparent;
		color: inherit;
		text-align: left;
		cursor: pointer;
		isolation: isolate;
	}

	.band-cell:last-child {
		border-right: 0;
	}

	/*
	 * Resting state keeps the channel as a hint, not a fill. Capped at 26%
	 * when active so the hue never competes with the accent or the lead
	 * photography.
	 */
	.band-cell::before {
		position: absolute;
		inset: 0;
		z-index: -1;
		background: linear-gradient(
			to top,
			color-mix(in srgb, var(--ch) 26%, transparent),
			transparent
		);
		opacity: 0.38;
		content: '';
		transition: opacity 240ms var(--ease-out);
	}

	.band-cell[aria-pressed='true']::before {
		opacity: 1;
	}

	.desk {
		color: var(--ch);
		opacity: 0.65;
		transition: opacity 240ms var(--ease-out);
	}

	.band-cell[aria-pressed='true'] .desk {
		opacity: 1;
	}

	.headline {
		color: var(--ink-faint);
		font-size: 0.9375rem;
		font-variation-settings:
			'wdth' 100,
			'wght' 550;
		line-height: 1.35;
		text-wrap: balance;
		transition: color 240ms var(--ease-out);
	}

	.band-cell[aria-pressed='true'] .headline {
		color: var(--ink);
	}

	@media (max-width: 60rem) {
		.channel-band {
			grid-template-columns: repeat(2, 1fr);
		}

		.band-cell:nth-child(2) {
			border-right: 0;
		}

		.band-cell:nth-child(-n + 2) {
			border-bottom: 1px solid var(--line);
		}
	}

	@media (max-width: 34rem) {
		.channel-band {
			grid-template-columns: 1fr;
		}

		.band-cell {
			min-height: auto;
			gap: 0.85rem;
			border-right: 0;
			border-bottom: 1px solid var(--line);
		}

		.band-cell:last-child {
			border-bottom: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.band-cell::before,
		.desk,
		.headline {
			transition: none;
		}
	}
</style>
