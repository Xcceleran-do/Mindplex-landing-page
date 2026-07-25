<script lang="ts">
	let mobileMenuOpen = $state(false);

	const platformUrl = 'https://beta.mindplex.ai';
	const navigationLinks = [
		{ name: 'Why Mindplex', href: '/#why' },
		{ name: 'Inside', href: '/#inside' },
		{ name: 'Trust', href: '/#trust' },
		{ name: 'Community', href: '/#community' }
	];

	function closeMenu() {
		mobileMenuOpen = false;
	}
</script>

<header class="site-header">
	<nav class="nav-shell" aria-label="Primary navigation">
		<a class="brand" href="/" aria-label="Mindplex home" onclick={closeMenu}>
			<img src="/mindplex-mark.svg" alt="" width="42" height="40" />
			<span class="wordmark">Mindplex</span>
		</a>

		<div class="desktop-links">
			{#each navigationLinks as link}
				<a href={link.href}>{link.name}</a>
			{/each}
		</div>

		<div class="desktop-actions">
			<a class="text-link" href="{platformUrl}/signin">Sign in</a>
			<a class="button button-primary button-compact" href={platformUrl}>
				Open Mindplex
				<span aria-hidden="true">↗</span>
			</a>
		</div>

		<button
			class="menu-button"
			type="button"
			aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
			aria-expanded={mobileMenuOpen}
			aria-controls="mobile-navigation"
			onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
		>
			<span></span>
			<span></span>
		</button>
	</nav>

	{#if mobileMenuOpen}
		<div class="mobile-navigation" id="mobile-navigation">
			<div class="mobile-navigation-inner">
				{#each navigationLinks as link}
					<a href={link.href} onclick={closeMenu}>{link.name}</a>
				{/each}
				<a href="{platformUrl}/signin" onclick={closeMenu}>Sign in</a>
				<a class="button button-primary" href={platformUrl} onclick={closeMenu}>
					Open Mindplex
					<span aria-hidden="true">↗</span>
				</a>
			</div>
		</div>
	{/if}
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 40;
		background: rgba(18, 19, 23, 0.9);
		-webkit-backdrop-filter: blur(20px) saturate(145%);
		backdrop-filter: blur(20px) saturate(145%);
	}

	/*
	 * A scroll edge effect instead of a 1px divider: content fades where it
	 * meets the floating chrome, so the header reads as a material rather
	 * than a bar drawn on top of the page.
	 */
	.site-header::after {
		position: absolute;
		top: 100%;
		right: 0;
		left: 0;
		height: 1.5rem;
		background: linear-gradient(to bottom, rgba(18, 19, 23, 0.72), transparent);
		content: '';
		pointer-events: none;
	}

	.nav-shell {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 2rem;
		width: min(100% - 2rem, 88rem);
		min-height: 4.0625rem;
		margin-inline: auto;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		width: fit-content;
	}

	.brand img {
		width: 2rem;
		height: auto;
	}

	.wordmark {
		font-family: 'Michroma', sans-serif;
		font-size: 0.9375rem;
		letter-spacing: 0.06em;
	}

	.desktop-links {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: clamp(1.25rem, 2.8vw, 2.6rem);
	}

	.desktop-links a,
	.text-link {
		color: var(--ink-muted);
		font-size: 0.87rem;
		font-variation-settings:
			'wdth' 100,
			'wght' 600;
		transition: color 160ms ease;
	}

	.desktop-actions {
		display: flex;
		align-items: center;
		gap: 1.2rem;
	}

	.menu-button {
		display: none;
		width: 2.75rem;
		height: 2.75rem;
		border: 0;
		border-radius: var(--radius-control);
		background: transparent;
		color: var(--ink);
		cursor: pointer;
	}

	.menu-button span {
		display: block;
		width: 1.25rem;
		height: 1px;
		margin: 0.3rem auto;
		background: currentColor;
	}

	.mobile-navigation {
		position: absolute;
		top: 100%;
		right: 0;
		left: 0;
		border-bottom: 1px solid var(--line);
		background: rgba(18, 19, 23, 0.97);
		transform-origin: top right;
		animation: menu-in 180ms var(--ease-out) both;
	}

	.mobile-navigation-inner {
		display: grid;
		gap: 0;
		width: min(100% - 2rem, 88rem);
		margin-inline: auto;
		padding-block: 1rem 1.25rem;
	}

	.mobile-navigation-inner > a:not(.button) {
		padding: 0.85rem 0;
		border-bottom: 1px solid var(--line);
		color: var(--ink-muted);
		font-size: 1.05rem;
	}

	.mobile-navigation :global(.button) {
		margin-top: 1rem;
	}

	@keyframes menu-in {
		from {
			opacity: 0;
			transform: scale(0.97) translateY(-0.25rem);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	@media (hover: hover) and (pointer: fine) {
		.desktop-links a:hover,
		.text-link:hover {
			color: var(--ink);
		}
	}

	@media (max-width: 68rem) {
		.desktop-links,
		.desktop-actions {
			display: none;
		}

		.nav-shell {
			grid-template-columns: 1fr auto;
		}

		.menu-button {
			display: block;
		}
	}

	@media (prefers-reduced-transparency: reduce) {
		.site-header,
		.mobile-navigation {
			background: var(--page);
			-webkit-backdrop-filter: none;
			backdrop-filter: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.mobile-navigation {
			animation: none;
		}
	}
</style>
