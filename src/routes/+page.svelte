<script lang="ts">
	import HomeHero from '$lib/section/home/HomeHero.svelte';
	import MeetOmegaPlex from '$lib/section/home/MeetOmegaPlex.svelte';
	import Surfaces from '$lib/section/home/Surfaces.svelte';
	import ConvergenceLoop from '$lib/section/home/ConvergenceLoop.svelte';
	import TechClosing from '$lib/section/home/TechClosing.svelte';
</script>

<svelte:head>
	<title>Mindplex | Where humans and AI think together</title>
	<meta
		name="description"
		content="Mindplex is a publishing and discussion platform for the ideas shaping the future. Humans write, OmegaPlex investigates, and readers argue with both."
	/>
</svelte:head>

<div class="landing-shell">
	<HomeHero />
	<MeetOmegaPlex />
	<Surfaces />
	<ConvergenceLoop />
	<TechClosing />
</div>
