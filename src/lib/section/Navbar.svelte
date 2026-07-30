<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Menu from '@lucide/svelte/icons/menu';
	import X from '@lucide/svelte/icons/x';

	type NavLink = {
		name: string;
		href: string;
		exactMatch?: boolean;
		external?: boolean;
	};

	let mobileMenuOpen = $state(false);

	const navigationLinks: NavLink[] = [
		{ name: 'About', href: '/#about' },
		{ name: 'OmegaPlex', href: '/#omegaplex' },
		{ name: 'OmegaClaw', href: '/#omegaclaw' },
		{ name: 'Roadmap', href: '/roadmap', exactMatch: true },
		{ name: 'Blog', href: '/blog', exactMatch: true },
		{ name: 'Team', href: '/#team' },
		{ name: 'Whitepaper', href: 'https://docs.mindplex.ai', external: true }
	];

	const contactHref = 'https://magazine.mindplex.ai/contact-us';
	const joinHref = 'https://magazine.mindplex.ai/?type=register&source=landingPage';

	const isActive = (link: NavLink) => link.exactMatch === true && page.url.pathname === link.href;

	// Close on navigation, so tapping an anchor link on mobile does not leave the
	// panel covering the section it just scrolled to.
	afterNavigate(() => {
		mobileMenuOpen = false;
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape') mobileMenuOpen = false;
	}}
/>

<header class="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
	<nav
		aria-label="Main"
		class="section-wide flex h-[68px] items-center justify-between gap-6 px-[var(--gutter)]"
	>
		<a
			href="/"
			class="flex flex-shrink-0 items-center gap-2.5 rounded-sm"
			aria-label="Mindplex home"
		>
			<!-- logo.png has an opaque dark background baked in, so it is presented
			     as a solid mark rather than keyed out, which would fringe the glyph. -->
			<img src="/logo.png" alt="" width="32" height="32" class="h-8 w-8 rounded-md" />
			<span class="text-[0.9375rem] font-semibold tracking-tight">Mindplex</span>
		</a>

		<ul class="hidden items-center gap-7 lg:flex">
			{#each navigationLinks as link (link.href)}
				<li>
					<a
						href={link.href}
						target={link.external ? '_blank' : undefined}
						rel={link.external ? 'noreferrer' : undefined}
						aria-current={isActive(link) ? 'page' : undefined}
						class="text-sm transition-colors hover:text-foreground {isActive(link)
							? 'text-foreground'
							: 'text-muted-foreground'}"
					>
						{link.name}
					</a>
				</li>
			{/each}
		</ul>

		<div class="hidden items-center gap-2 lg:flex">
			<ThemeToggle />
			<a
				href={contactHref}
				class="rounded-md px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
			>
				Contact
			</a>
			<a
				href={joinHref}
				class="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-strong active:translate-y-px"
			>
				Join Mindplex
			</a>
		</div>

		<div class="flex items-center gap-1 lg:hidden">
			<ThemeToggle />

			<button
				type="button"
				class="-mr-2 rounded-md p-2 text-foreground"
				aria-expanded={mobileMenuOpen}
				aria-controls="mobile-menu"
				aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
			>
				{#if mobileMenuOpen}
					<X size={20} strokeWidth={1.75} />
				{:else}
					<Menu size={20} strokeWidth={1.75} />
				{/if}
			</button>
		</div>
	</nav>

	{#if mobileMenuOpen}
		<div
			id="mobile-menu"
			class="border-t border-border bg-background px-[var(--gutter)] py-5 lg:hidden"
		>
			<ul class="flex flex-col">
				{#each navigationLinks as link (link.href)}
					<li>
						<a
							href={link.href}
							target={link.external ? '_blank' : undefined}
							rel={link.external ? 'noreferrer' : undefined}
							class="block py-2.5 text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground"
						>
							{link.name}
						</a>
					</li>
				{/each}
			</ul>

			<div class="mt-5 flex flex-col gap-2 border-t border-border pt-5">
				<a
					href={contactHref}
					class="rounded-md border border-border-strong px-4 py-2.5 text-center text-sm text-foreground"
				>
					Contact
				</a>
				<a
					href={joinHref}
					class="rounded-md bg-accent px-4 py-2.5 text-center text-sm font-medium text-accent-foreground"
				>
					Join Mindplex
				</a>
			</div>
		</div>
	{/if}
</header>
