<script lang="ts">
	import HomeHero from '$lib/section/home/HomeHero.svelte';
	import Platform from '$lib/section/home/Platform.svelte';
	import Sources from '$lib/section/home/Sources.svelte';
	import MeetOmegaPlex from '$lib/section/home/MeetOmegaPlex.svelte';
	import ConvergenceLoop from '$lib/section/home/ConvergenceLoop.svelte';
	import TechClosing from '$lib/section/home/TechClosing.svelte';
</script>

<svelte:head>
	<title>Mindplex | Where humans and AI think together</title>
	<meta
		name="description"
		content="Mindplex brings reporting, research, essays and discussions from across the web into one place, organized around the ideas shaping the future. Humans write, OmegaPlex investigates, and readers argue with both."
	/>
</svelte:head>

<div class="landing-shell">
	<HomeHero />
	<Platform />
	<Sources />
	<MeetOmegaPlex />
	<ConvergenceLoop />
	<TechClosing />
</div>
