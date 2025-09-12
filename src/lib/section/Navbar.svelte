<script lang="ts">
	import { page } from '$app/state';

	let mobileMenuOpen = $state(false);

	const navigationLinks = [
		{ name: 'About', href: '/#about' },
		{ name: 'Our AI', href: '/#ourAi' },
		{ name: 'Roadmap', href: '/roadmap', exactMatch: true },
		{ name: 'Tokens', href: '/#mindplexTokens' },
		{ name: 'Blog', href: '/blog', exactMatch: true },
		{ name: 'Team', href: '/#team' },
		{ name: 'Whitepaper', href: 'https://docs.mindplex.ai', external: true }
	];

	const ctaLinks = [
		{
			name: 'Contact Us',
			href: 'https://magazine.mindplex.ai/contact-us',
			variant: 'outline'
		},
		{
			name: 'Join Mindplex',
			href: 'https://magazine.mindplex.ai/?type=register&source=landingPage',
			variant: 'primary'
		}
	];

	const isActiveLink = (link: typeof navigationLinks) => {
		if (link.exactMatch) {
			return page.url.pathname === link.href;
		}
		return false;
	};
</script>

<nav
	class="relative z-50 border-b border-border/50 bg-background/80 px-4 py-4 backdrop-blur-md md:px-8 lg:px-16"
>
	<div class="mx-auto flex max-w-7xl items-center justify-between">
		<div class="flex-shrink-0">
			<a href="/" class="group flex items-center gap-2">
				<img src="/logo.png" alt="logo" class="h-15 w-15" />
				<span class="hidden text-xl font-bold text-foreground sm:block">Mindplex</span>
			</a>
		</div>

		<div class="hidden items-center gap-8 lg:flex">
			{#each navigationLinks as link}
				<a
					href={link.href}
					target={link.external ? '_blank' : undefined}
					class="text-sm font-medium transition-colors duration-200 hover:text-foreground"
					class:text-foreground={isActiveLink(link)}
					class:text-muted-foreground={!isActiveLink(link)}
				>
					{link.name}
				</a>
			{/each}
		</div>

		<div class="hidden items-center gap-3 lg:flex">
			{#each ctaLinks as cta}
				<a
					href={cta.href}
					class="rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200"
					class:border={cta.variant === 'outline'}
					class:border-border={cta.variant === 'outline'}
					class:text-foreground={cta.variant === 'outline'}
					class:hover:bg-card={cta.variant === 'outline'}
					class:bg-gradient-to-r={cta.variant === 'primary'}
					class:from-primary={cta.variant === 'primary'}
					class:to-secondary={cta.variant === 'primary'}
					class:text-primary-foreground={cta.variant === 'primary'}
					class:hover:opacity-90={cta.variant === 'primary'}
					class:hover:shadow-lg={cta.variant === 'primary'}
				>
					<!-- class:hover:shadow-primary/20={cta.variant === 'primary'} -->
					{cta.name}
				</a>
			{/each}
		</div>

		<button
			class="p-2 text-foreground lg:hidden"
			onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
		>
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				{#if mobileMenuOpen}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					></path>
				{:else}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					></path>
				{/if}
			</svg>
		</button>
	</div>

	{#if mobileMenuOpen}
		<div
			class="absolute top-full right-0 left-0 border-b border-border/50 bg-background/95 p-4 backdrop-blur-md lg:hidden"
		>
			<div class="flex flex-col gap-4">
				{#each navigationLinks as link}
					<a
						href={link.href}
						target={link.external ? '_blank' : undefined}
						class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
					>
						{link.name}
					</a>
				{/each}

				<div class="flex flex-col gap-2 border-t border-border/50 pt-4">
					{#each ctaLinks as cta}
						<a
							href={cta.href}
							class="rounded-lg px-5 py-2.5 text-center text-sm font-medium transition-all duration-200"
							class:border={cta.variant === 'outline'}
							class:border-border={cta.variant === 'outline'}
							class:text-foreground={cta.variant === 'outline'}
							class:hover:bg-card={cta.variant === 'outline'}
							class:bg-gradient-to-r={cta.variant === 'primary'}
							class:from-primary={cta.variant === 'primary'}
							class:to-secondary={cta.variant === 'primary'}
							class:text-primary-foreground={cta.variant === 'primary'}
							class:hover:opacity-90={cta.variant === 'primary'}
						>
							{cta.name}
						</a>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</nav>
