<script lang="ts">
	import Hero from '$lib/section/Hero.svelte';
	import AboutUs from '$lib/section/AboutUs.svelte';
	import OmegaPlex from '$lib/section/OmegaPlex.svelte';
	import HowItWorks from '$lib/section/HowItWorks.svelte';
	import OmegaClaw from '$lib/section/OmegaClaw.svelte';
	import Memory from '$lib/section/Memory.svelte';
	import WhyDifferent from '$lib/section/WhyDifferent.svelte';
	import OurTeam from '$lib/section/OurTeam.svelte';
	import JoinUs from '$lib/section/JoinUs.svelte';
</script>

<svelte:head>
	<title>Mindplex | AI-native media that reasons, remembers, and shows its work</title>
	<meta
		name="description"
		content="Mindplex is an AI-native media platform. Its first publication, OmegaPlex, researches a defined news beat, reasons over trusted sources and long-term memory, and publishes only with human editorial approval."
	/>
</svelte:head>

<!-- Narrative order: what the problem is, what we built, how it runs, what makes
     it different, who is behind it, how to join. -->
<Hero />
<AboutUs />
<OmegaPlex />
<HowItWorks />
<OmegaClaw />
<Memory />
<WhyDifferent />
<OurTeam />
<JoinUs />
