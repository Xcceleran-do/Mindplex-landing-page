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
			<span>Mindplex</span>
		</a>

		<div class="desktop-links" aria-label="Landing page sections">
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
