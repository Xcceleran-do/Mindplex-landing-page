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
		{ name: 'Contribute', href: `${platformUrl}/contribute` },
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
				<span>Mindplex</span>
			</a>
			<h2>AI, media, and community intelligence.</h2>
			<p>
				Mindplex brings together futurist writing, social discussion, and emerging AI tools for
				people tracking what comes next.
			</p>
		</div>

		<div class="footer-columns">
			<div>
				<h3>Explore</h3>
				<nav aria-label="Explore Mindplex">
					{#each productLinks as link}
						<a href={link.href}>{link.name}</a>
					{/each}
				</nav>
			</div>

			<div>
				<h3>Community</h3>
				<nav aria-label="Mindplex community">
					{#each communityLinks as link}
						<a href={link.href}>{link.name}</a>
					{/each}
				</nav>
			</div>

			<div>
				<h3>Follow</h3>
				<nav aria-label="Mindplex social channels">
					{#each socialLinks as link}
						<a href={link.href} target="_blank" rel="noreferrer">{link.name}</a>
					{/each}
				</nav>
			</div>
		</div>

		<div class="footer-bottom">
			<p>© {year} Mindplex. All rights reserved.</p>
			<div>
				<a href="{platformUrl}/terms">Terms</a>
				<a href="{platformUrl}/privacy-policy">Privacy</a>
				<a href="https://docs.mindplex.ai" target="_blank" rel="noreferrer">Whitepaper</a>
			</div>
		</div>
	</div>
</footer>
