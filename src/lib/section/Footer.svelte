<script lang="ts">
	import type { Component } from 'svelte';
	import Twitter from '@lucide/svelte/icons/twitter';
	import Youtube from '@lucide/svelte/icons/youtube';
	import Linkedin from '@lucide/svelte/icons/linkedin';
	import Send from '@lucide/svelte/icons/send';
	import Mail from '@lucide/svelte/icons/mail';

	const footerDate = String(new Date().getFullYear());

	const socialLinks: { name: string; url: string; icon: Component }[] = [
		{ name: 'Twitter', url: 'https://twitter.com/Mindplex_AI', icon: Twitter },
		{
			name: 'YouTube',
			url: 'https://www.youtube.com/channel/UCUwdBITXX-aDXgt2ZmBD-IA',
			icon: Youtube
		},
		{ name: 'LinkedIn', url: 'https://www.linkedin.com/company/79915299/', icon: Linkedin },
		{ name: 'Telegram', url: 'https://t.me/mindplex_ai', icon: Send }
	];

	const productLinks = [
		{ name: 'How it works', url: '/#how-it-works' },
		{ name: 'Memory', url: '/#memory' },
		{ name: 'Trust', url: '/#trust' },
		{ name: 'Roadmap', url: '/roadmap' }
	];

	const companyLinks = [
		{ name: 'Blog', url: '/blog' },
		{ name: 'Whitepaper', url: 'https://docs.mindplex.ai' },
		{ name: 'Contact', url: 'https://magazine.mindplex.ai/contact-us' },
		{ name: 'Privacy', url: 'https://magazine.mindplex.ai/privacy-policy' }
	];

	const contactEmail = 'contact@mindplex.ai';
</script>

<footer id="footer" class="site-footer">
	<div class="section-wide footer-inner">
		<div class="footer-brand">
			<a href="/" class="footer-logo" aria-label="Mindplex home">
				<img src="/logo.png" alt="" width="36" height="36" />
				<span>Mindplex</span>
			</a>
			<p>OmegaPlex is Mindplex's AI-native publication for continuous, source-backed coverage.</p>
			<a href="mailto:{contactEmail}" class="footer-email">
				<Mail size={16} strokeWidth={1.8} aria-hidden="true" />
				{contactEmail}
			</a>
		</div>

		<nav aria-labelledby="footer-product">
			<h2 id="footer-product">OmegaPlex</h2>
			<ul>
				{#each productLinks as link (link.url)}
					<li><a href={link.url}>{link.name}</a></li>
				{/each}
			</ul>
		</nav>

		<nav aria-labelledby="footer-company">
			<h2 id="footer-company">Mindplex</h2>
			<ul>
				{#each companyLinks as link (link.url)}
					<li><a href={link.url}>{link.name}</a></li>
				{/each}
			</ul>
		</nav>
	</div>

	<div class="section-wide footer-bottom">
		<p>© {footerDate} Mindplex. All rights reserved.</p>
		<ul aria-label="Social links">
			{#each socialLinks as social (social.name)}
				<li>
					<a href={social.url} target="_blank" rel="noreferrer" aria-label={social.name}>
						<social.icon size={17} strokeWidth={1.8} aria-hidden="true" />
					</a>
				</li>
			{/each}
		</ul>
	</div>
</footer>

<style>
	.site-footer {
		border-top: 1px solid var(--border);
		background: var(--surface);
	}

	.footer-inner {
		display: grid;
		gap: 3rem;
		padding: 4.5rem var(--gutter) 3.5rem;
		grid-template-columns: minmax(0, 1.8fr) repeat(2, minmax(10rem, 0.6fr));
	}

	.footer-brand {
		max-width: 31rem;
	}

	.footer-logo {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 1rem;
		font-weight: 720;
	}

	.footer-logo img {
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 0.5rem;
	}

	.footer-brand p {
		max-width: 32rem;
		margin-top: 1.25rem;
		font-size: 0.9rem;
		line-height: 1.65;
		color: var(--muted-foreground);
	}

	.footer-email {
		display: inline-flex;
		min-height: 2.75rem;
		align-items: center;
		gap: 0.55rem;
		margin-top: 1.1rem;
		font-size: 0.875rem;
		font-weight: 620;
		color: var(--muted-foreground);
	}

	.footer-email:hover {
		color: var(--accent);
	}

	nav h2 {
		font-size: 0.8125rem;
		font-weight: 700;
	}

	nav ul {
		margin-top: 1.15rem;
	}

	nav a {
		display: flex;
		min-height: 2.5rem;
		align-items: center;
		font-size: 0.875rem;
		color: var(--muted-foreground);
		transition: color 180ms ease;
	}

	nav a:hover {
		color: var(--foreground);
	}

	.footer-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		border-top: 1px solid var(--border);
		padding: 1.5rem var(--gutter) 2rem;
	}

	.footer-bottom p {
		font-size: 0.8125rem;
		color: var(--muted-foreground);
	}

	.footer-bottom ul {
		display: flex;
		gap: 0.3rem;
	}

	.footer-bottom a {
		display: flex;
		width: 2.75rem;
		height: 2.75rem;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		color: var(--muted-foreground);
		transition:
			background-color 180ms ease,
			color 180ms ease;
	}

	.footer-bottom a:hover {
		background: var(--background);
		color: var(--accent);
	}

	@media (max-width: 767px) {
		.footer-inner {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.footer-brand {
			max-width: none;
			grid-column: 1 / -1;
		}
	}

	@media (max-width: 480px) {
		.footer-inner {
			grid-template-columns: 1fr;
		}

		.footer-brand {
			grid-column: auto;
		}

		.footer-bottom {
			align-items: flex-start;
			flex-direction: column;
		}
	}
</style>
