<script lang="ts">
	import Hero from '$lib/section/Hero.svelte';
	import OmegaPlex from '$lib/section/OmegaPlex.svelte';
	import HowItWorks from '$lib/section/HowItWorks.svelte';
	import Memory from '$lib/section/Memory.svelte';
	import WhyDifferent from '$lib/section/WhyDifferent.svelte';
	import JoinUs from '$lib/section/JoinUs.svelte';
</script>

<svelte:head>
	<title>OmegaPlex by Mindplex | The newsroom that never forgets</title>
	<meta
		name="description"
		content="OmegaPlex follows one news beat continuously, checks every claim against sources and memory, and publishes only after human editorial approval."
	/>
</svelte:head>

<div class="landing-shell">
	<Hero />
	<OmegaPlex />
	<HowItWorks />
	<Memory />
	<WhyDifferent />
	<JoinUs />
</div>
