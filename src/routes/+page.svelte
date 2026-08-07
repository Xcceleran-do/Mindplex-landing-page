<script lang="ts">
	import Hero from '$lib/section/Hero.svelte';
	import HowItWorks from '$lib/section/HowItWorks.svelte';
	import Memory from '$lib/section/Memory.svelte';
	import Reasoning from '$lib/section/Reasoning.svelte';
	import WhyDifferent from '$lib/section/WhyDifferent.svelte';
	import Editor from '$lib/section/Editor.svelte';
	import ReaderLoop from '$lib/section/ReaderLoop.svelte';
	import Stack from '$lib/section/Stack.svelte';
	import OmegaPlex from '$lib/section/OmegaPlex.svelte';
	import JoinUs from '$lib/section/JoinUs.svelte';
</script>

<svelte:head>
	<title>Mindplex | An AI newsroom that reasons before it writes</title>
	<meta
		name="description"
		content="OmegaPlex watches one beat continuously — discovering signals, remembering what happened before, reasoning symbolically, and testing every claim. A human editor decides what gets published."
	/>
</svelte:head>

<div class="landing-shell">
	<Hero />
	<HowItWorks />
	<Memory />
	<Reasoning />
	<WhyDifferent />
	<Editor />
	<ReaderLoop />
	<Stack />
	<OmegaPlex />
	<JoinUs />
</div>
