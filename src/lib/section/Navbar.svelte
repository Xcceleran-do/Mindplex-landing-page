<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
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
		{ name: 'OmegaPlex', href: '/omegaplex', exactMatch: true },
		{ name: 'Blog', href: '/blog', exactMatch: true }
	];

	const publicationHref = 'https://magazine.mindplex.ai';

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

<header class="sticky top-0 z-50 border-b border-border bg-background/92 backdrop-blur-xl">
	<nav
		aria-label="Main"
		class="section-wide flex h-[68px] items-center justify-between gap-6 px-[var(--gutter)]"
	>
		<a
			href="/"
			class="flex flex-shrink-0 items-center gap-2.5 rounded-sm"
			aria-label="Mindplex home"
		>
			<img src="/logo.png" alt="" width="32" height="32" class="h-8 w-8 rounded-md" />
			<span class="text-[0.9375rem] font-semibold tracking-tight">Mindplex</span>
		</a>

		<ul class="hidden items-center gap-5 xl:flex">
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

		<div class="hidden items-center xl:flex">
			<a
				href={publicationHref}
				class="inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold whitespace-nowrap text-accent-foreground transition-transform hover:-translate-y-0.5 hover:bg-accent-strong active:translate-y-px"
			>
				Read Mindplex
			</a>
		</div>

		<div class="flex items-center xl:hidden">
			<button
				type="button"
				class="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-foreground"
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
			class="border-t border-border bg-background px-[var(--gutter)] py-5 xl:hidden"
		>
			<ul class="flex flex-col">
				{#each navigationLinks as link (link.href)}
					<li>
						<a
							href={link.href}
							target={link.external ? '_blank' : undefined}
							rel={link.external ? 'noreferrer' : undefined}
							class="flex min-h-11 items-center text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground"
						>
							{link.name}
						</a>
					</li>
				{/each}
			</ul>

			<div class="mt-5 border-t border-border pt-5">
				<a
					href={publicationHref}
					class="flex min-h-11 items-center justify-center rounded-full bg-accent px-4 text-center text-sm font-semibold text-accent-foreground"
				>
					Read Mindplex
				</a>
			</div>
		</div>
	{/if}
</header>
