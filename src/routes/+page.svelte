<script lang="ts">
	import HomeHero from '$lib/section/home/HomeHero.svelte';
	import Platform from '$lib/section/home/Platform.svelte';
	import Sources from '$lib/section/home/Sources.svelte';
	import MeetOmegaPlex from '$lib/section/home/MeetOmegaPlex.svelte';
	import ConvergenceLoop from '$lib/section/home/ConvergenceLoop.svelte';
	import TechClosing from '$lib/section/home/TechClosing.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { page } from '$app/state';

	const organization = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Mindplex',
		url: page.url.origin,
		logo: `${page.url.origin}/logo.png`,
		sameAs: [
			'https://twitter.com/Mindplex_AI',
			'https://www.youtube.com/channel/UCUwdBITXX-aDXgt2ZmBD-IA',
			'https://www.linkedin.com/company/79915299/',
			'https://t.me/mindplex_ai'
		]
	});
</script>

<Seo
	title="Mindplex | Where humans and AI think together"
	description="Mindplex brings reporting, research, essays and discussions from across the web into one place, organized around the ideas shaping the future. Humans write, OmegaPlex investigates, and readers argue with both."
/>

<svelte:head>
	{@html `<script type="application/ld+json">${organization}<\/script>`}
</svelte:head>

<div class="landing-shell">
	<HomeHero />
	<Platform />
	<Sources />
	<MeetOmegaPlex />
	<ConvergenceLoop />
	<TechClosing />
</div>
