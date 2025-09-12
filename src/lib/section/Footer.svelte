<script lang="ts">
	const footerDate = String(new Date().getFullYear());

	const socialLinks = [
		{ name: 'Twitter', url: 'https://twitter.com/Mindplex_AI', icon: 'twitter' },
		{ name: 'Facebook', url: 'https://www.facebook.com/MindplexAI', icon: 'facebook' },
		{
			name: 'YouTube',
			url: 'https://www.youtube.com/channel/UCUwdBITXX-aDXgt2ZmBD-IA',
			icon: 'youtube'
		},
		{ name: 'LinkedIn', url: 'https://www.linkedin.com/company/79915299/', icon: 'linkedin' },
		{ name: 'Telegram', url: 'https://t.me/mindplex_ai', icon: 'telegram' }
	];

	const quickLinks = [
		{ name: 'Terms and Privacy', url: 'https://magazine.mindplex.ai/terms/' },
		{ name: 'News', url: 'https://magazine.mindplex.ai/news/' }
		// { name: 'Content Factory', url: 'https://magazine.mindplex.ai/coming-soon/' }
	];

	const aboutLinks = [
		{ name: 'Newsletter', url: 'https://magazine.mindplex.ai/coming-soon/?type=newsletter' },
		{ name: 'Our Team', url: '#team' }
	];

	const legalLinks = [
		{ name: 'Privacy Policy', url: '/privacy' },
		{ name: 'Terms of Service', url: '/terms' }
	];

	const contactInfo = {
		email: 'contact@mindplex.ai'
	};
</script>

<footer id="footer" class="relative overflow-hidden border-t border-border/50 bg-background">
	<div
		class="absolute top-0 left-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl"
	></div>
	<div
		class="absolute right-0 bottom-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-secondary/5 blur-3xl"
	></div>

	<div class="relative z-10 px-4 py-12 md:px-8 lg:px-16">
		<div class="mx-auto max-w-7xl">
			<div class="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
				<div class="lg:col-span-1">
					<a href="/" class="mb-6 inline-block">
						<div class="group flex items-center gap-2">
							<img src="/logo.png" alt="logo" class="h-10 w-10" />
							<span class="text-xl font-bold text-foreground">Mindplex</span>
						</div>
					</a>

					<p class="mb-6 text-sm leading-relaxed text-muted-foreground">
						Mindplex is an AI startup, a futuristic media platform, and a network providing a
						dynamic space for science enthusiasts, creators, influencers, and media aficionados to
						connect and collaborate.
					</p>

					<div
						class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/50 px-3 py-1.5 backdrop-blur-sm"
					>
						<div class="h-1.5 w-1.5 animate-pulse rounded-full bg-primary"></div>
						<span class="text-xs text-muted-foreground">Building the Future</span>
					</div>
				</div>

				<div>
					<h3 class="mb-4 text-sm font-semibold tracking-wide text-foreground uppercase">
						Quick Links
					</h3>
					<ul class="space-y-3">
						{#each quickLinks as link}
							<li>
								<a
									href={link.url}
									class="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
								>
									<span>{link.name}</span>
									<svg
										class="h-3 w-3 -translate-x-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 5l7 7-7 7"
										></path>
									</svg>
								</a>
							</li>
						{/each}
					</ul>
				</div>

				<div>
					<h3 class="mb-4 text-sm font-semibold tracking-wide text-foreground uppercase">
						About Us
					</h3>
					<ul class="space-y-3">
						{#each aboutLinks as link}
							<li>
								<a
									href={link.url}
									class="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
								>
									<span>{link.name}</span>
									<svg
										class="h-3 w-3 -translate-x-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 5l7 7-7 7"
										></path>
									</svg>
								</a>
							</li>
						{/each}
					</ul>
				</div>

				<div>
					<h3 class="mb-4 text-sm font-semibold tracking-wide text-foreground uppercase">
						Connect
					</h3>

					<div class="mb-6 flex flex-wrap gap-3">
						{#each socialLinks as social}
							<a
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								class="group flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/10"
								aria-label={social.name}
							>
								{#if social.icon === 'twitter'}
									<svg
										class="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
										/>
									</svg>
								{:else if social.icon === 'facebook'}
									<svg
										class="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
										/>
									</svg>
								{:else if social.icon === 'youtube'}
									<svg
										class="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
										/>
									</svg>
								{:else if social.icon === 'linkedin'}
									<svg
										class="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
										/>
									</svg>
								{:else if social.icon === 'telegram'}
									<svg
										class="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
										/>
									</svg>
								{/if}
							</a>
						{/each}
					</div>

					<a
						href="mailto:{contactInfo.email}"
						class="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
					>
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							></path>
						</svg>
						<span>{contactInfo.email}</span>
					</a>
				</div>
			</div>

			<div class="border-t border-border/50 pt-8">
				<div class="flex flex-col items-center justify-between gap-4 md:flex-row">
					<p class="text-sm text-muted-foreground">
						© {footerDate} Mindplex. All rights reserved.
					</p>

					<div class="flex items-center gap-6">
						{#each legalLinks as link}
							<a
								href={link.url}
								class="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
							>
								{link.name}
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</footer>
