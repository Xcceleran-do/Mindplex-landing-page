<script lang="ts">
	import { theme } from '$lib/theme.svelte';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';

	// The label names the action, not the current state, so a screen reader
	// announces what pressing it will do.
	const label = $derived(
		theme.current === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
	);
</script>

<button
	type="button"
	onclick={() => theme.toggle()}
	aria-label={label}
	title={label}
	class="relative flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground active:translate-y-px"
>
	<!-- Both icons are always rendered and cross-faded, so the swap has no layout
	     step. aria-hidden because the button's own label carries the meaning. -->
	<span class="icon" data-active={theme.current === 'light'} aria-hidden="true">
		<Sun size={16} strokeWidth={1.75} />
	</span>
	<span class="icon" data-active={theme.current === 'dark'} aria-hidden="true">
		<Moon size={16} strokeWidth={1.75} />
	</span>
</button>

<style>
	.icon {
		position: absolute;
		display: flex;
		opacity: 0;
		transform: rotate(-45deg) scale(0.7);
		transition:
			opacity 180ms ease,
			transform 260ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.icon[data-active='true'] {
		opacity: 1;
		transform: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.icon {
			transition: none;
			transform: none;
		}
	}
</style>
