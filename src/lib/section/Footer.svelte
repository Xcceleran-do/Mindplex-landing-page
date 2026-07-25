<script lang="ts">
	const year = new Date().getFullYear();
	const platformUrl = 'https://beta.mindplex.ai';

	const productLinks = [
		{ name: 'Magazine', href: `${platformUrl}/magazine` },
		{ name: 'Podcast', href: `${platformUrl}/podcast` },
		{ name: 'News', href: `${platformUrl}/news` },
		{ name: 'Topics', href: `${platformUrl}/topics` },
		{ name: 'Mindbytes', href: `${platformUrl}/mindbytes` }
	];

	const communityLinks = [
		{ name: 'Community hub', href: `${platformUrl}/community` },
		{ name: 'Start writing', href: `${platformUrl}/contribute` },
		{ name: 'Writers and editors', href: `${platformUrl}/writers` },
		{ name: 'About', href: `${platformUrl}/about` },
		{ name: 'FAQ', href: `${platformUrl}/faq` }
	];

	const socialLinks = [
		{ name: 'X', href: 'https://x.com/Mindplex_AI' },
		{ name: 'YouTube', href: 'https://www.youtube.com/channel/UCUwdBITXX-aDXgt2ZmBD-IA' },
		{ name: 'Telegram', href: 'https://t.me/mindplex_ai' },
		{ name: 'LinkedIn', href: 'https://www.linkedin.com/company/79915299/' }
	];
</script>

<footer class="site-footer">
	<div class="footer-shell">
		<div class="footer-lead">
			<a class="brand footer-brand" href="/" aria-label="Mindplex home">
				<img src="/mindplex-mark.svg" alt="" width="42" height="40" />
				<span class="wordmark">Mindplex</span>
			</a>
			<p class="body-l">
				Mindplex brings together futurist writing, social discussion, and emerging AI tools for
				people tracking what comes next.
			</p>
		</div>

		<div class="footer-columns">
			<div>
				<h2 class="label">Explore</h2>
				<nav aria-label="Explore Mindplex">
					{#each productLinks as link}
						<a href={link.href}>{link.name}</a>
					{/each}
				</nav>
			</div>

			<div>
				<h2 class="label">Community</h2>
				<nav aria-label="Mindplex community">
					{#each communityLinks as link}
						<a href={link.href}>{link.name}</a>
					{/each}
				</nav>
			</div>

			<div>
				<h2 class="label">Follow</h2>
				<nav aria-label="Mindplex social channels">
					{#each socialLinks as link}
						<a href={link.href} target="_blank" rel="noreferrer">{link.name}</a>
					{/each}
				</nav>
			</div>
		</div>

		<div class="footer-bottom">
			<p class="caption">© {year} Mindplex. All rights reserved.</p>
			<div>
				<a href="{platformUrl}/terms">Terms</a>
				<a href="{platformUrl}/privacy-policy">Privacy</a>
				<a href="https://docs.mindplex.ai" target="_blank" rel="noreferrer">Whitepaper</a>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer-brand {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		margin-bottom: 1.75rem;
	}

	.footer-brand img {
		width: 2rem;
		height: auto;
	}

	.wordmark {
		font-family: 'Michroma', sans-serif;
		font-size: 0.9375rem;
		letter-spacing: 0.06em;
	}

	.footer-lead {
		max-width: 44rem;
	}
</style>
