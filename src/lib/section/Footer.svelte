<script lang="ts">
	import type { Component } from 'svelte';
	import Twitter from '@lucide/svelte/icons/twitter';
	import Facebook from '@lucide/svelte/icons/facebook';
	import Youtube from '@lucide/svelte/icons/youtube';
	import Linkedin from '@lucide/svelte/icons/linkedin';
	import Send from '@lucide/svelte/icons/send';
	import Mail from '@lucide/svelte/icons/mail';

	const footerDate = String(new Date().getFullYear());

	// Lucide has no Telegram glyph; Send is its paper-plane equivalent. Kept in
	// the same family rather than reintroducing a hand-rolled path.
	const socialLinks: { name: string; url: string; icon: Component }[] = [
		{ name: 'Twitter', url: 'https://twitter.com/Mindplex_AI', icon: Twitter },
		{ name: 'Facebook', url: 'https://www.facebook.com/MindplexAI', icon: Facebook },
		{
			name: 'YouTube',
			url: 'https://www.youtube.com/channel/UCUwdBITXX-aDXgt2ZmBD-IA',
			icon: Youtube
		},
		{ name: 'LinkedIn', url: 'https://www.linkedin.com/company/79915299/', icon: Linkedin },
		{ name: 'Telegram', url: 'https://t.me/mindplex_ai', icon: Send }
	];

	const quickLinks = [
		{ name: 'Terms and Privacy', url: 'https://magazine.mindplex.ai/terms/' },
		{ name: 'News', url: 'https://magazine.mindplex.ai/news/' }
	];

	const aboutLinks = [
		{ name: 'Newsletter', url: 'https://magazine.mindplex.ai/#newsletter' },
		// Root-relative so it resolves from /blog and /roadmap too.
		{ name: 'Our Team', url: '/#team' }
	];

	const legalLinks = [
		{ name: 'Privacy Policy', url: 'https://magazine.mindplex.ai/privacy-policy' },
		{ name: 'Terms of Service', url: 'https://magazine.mindplex.ai/terms' }
	];

	const contactEmail = 'contact@mindplex.ai';
</script>

<footer id="footer" class="border-t border-border">
	<div class="section-wide px-[var(--gutter)] py-16 lg:py-20">
		<div class="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] lg:gap-12">
			<div>
				<a href="/" class="inline-flex items-center gap-2.5" aria-label="Mindplex home">
					<img src="/logo.png" alt="" width="32" height="32" class="h-8 w-8" />
					<span class="text-[0.9375rem] font-semibold tracking-tight">Mindplex</span>
				</a>

				<p class="mt-5 max-w-[42ch] text-sm leading-relaxed text-muted-foreground">
					Mindplex is an AI startup, a futuristic media platform, and a network providing a dynamic
					space for science enthusiasts, creators, influencers, and media aficionados to connect and
					collaborate.
				</p>
			</div>

			<nav aria-labelledby="footer-quick">
				<h2 id="footer-quick" class="text-[0.8125rem] font-semibold">Quick links</h2>
				<ul class="mt-4 space-y-2.5">
					{#each quickLinks as link (link.url)}
						<li>
							<a
								href={link.url}
								class="text-sm text-muted-foreground transition-colors hover:text-foreground"
							>
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<nav aria-labelledby="footer-about">
				<h2 id="footer-about" class="text-[0.8125rem] font-semibold">About us</h2>
				<ul class="mt-4 space-y-2.5">
					{#each aboutLinks as link (link.url)}
						<li>
							<a
								href={link.url}
								class="text-sm text-muted-foreground transition-colors hover:text-foreground"
							>
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<div>
				<h2 class="text-[0.8125rem] font-semibold">Connect</h2>

				<ul class="mt-4 flex flex-wrap gap-2">
					{#each socialLinks as social (social.name)}
						<li>
							<a
								href={social.url}
								target="_blank"
								rel="noreferrer"
								aria-label={social.name}
								class="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
							>
								<social.icon size={16} strokeWidth={1.75} />
							</a>
						</li>
					{/each}
				</ul>

				<a
					href="mailto:{contactEmail}"
					class="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
				>
					<Mail size={15} strokeWidth={1.75} />
					{contactEmail}
				</a>
			</div>
		</div>

		<div
			class="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center"
		>
			<p class="text-sm text-muted-foreground">
				© {footerDate} Mindplex. All rights reserved.
			</p>

			<ul class="flex items-center gap-6">
				{#each legalLinks as link (link.url)}
					<li>
						<a
							href={link.url}
							class="text-sm text-muted-foreground transition-colors hover:text-foreground"
						>
							{link.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</footer>
