<script>
	import Hero from '$lib/sections/Hero.svelte';
	import Mindplex from '$lib/sections/Mindplex.svelte';
	import MindplexTokens from '$lib/sections/MindplexTokens.svelte';
	import JoinUs from '$lib/sections/Joinus.svelte';
	import OurAi from '$lib/sections/OurAi.svelte';
	import OurTeam from '$lib/sections/OurTeam.svelte';
	import { MetaTags, JsonLd } from 'svelte-meta-tags';
	// import OurTeam from '$lib/sections/OurTeam.svelte';
	// import Roadmap from '$lib/sections/Roadmap.svelte';
</script>

<MetaTags
	title="Mindplex"
	titleTemplate="%s "
	description="Mindplex is a multimedia content site powered by fully decentralized matchmaking between content creators and content consumers."
	canonical="http://localhost:5173/"
	openGraph={{
		type: 'website',
		url: 'https://mindplex.ai/',
		title: 'Mindplex',
		description: 'multimedia content site ',
		images: [
			{
				url: '/mindplex_ai.png',
				alt: 'mindplex',
				width: 800,
				height: 400,
				secureUrl: '/mindplex_ai.png',
				type: 'image/png'
			}
		]
	}}
	twitter={{
		handle: '@handle',
		site: '@mindplex',
		cardType: 'summary',
		title: 'mindplex',
		description:
			'Mindplex is a multimedia content site powered by fully decentralized matchmaking between content creators and content consumers.',
		image: '/mindplex_ai.png',
		imageAlt: 'mindplex'
	}}
/>

<main class="m-5 sm:m-20 sm:max-w-7xl lg:m-auto">
	<Hero />
	<Mindplex />
	<MindplexTokens />
	<JoinUs />
	<OurAi />
	<OurTeam />
</main>

<!-- 
<Roadmap />


-->
