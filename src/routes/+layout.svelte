<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/section/Navbar.svelte';
	import Footer from '$lib/section/Footer.svelte';

	let { children } = $props();
</script>

<a href="#main-content" class="skip-link">Skip to content</a>
<Navbar />
<main id="main-content" tabindex="-1">
	{@render children()}
</main>
<Footer />
