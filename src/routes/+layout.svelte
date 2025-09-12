<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/section/Navbar.svelte';
	import Footer from '$lib/section/Footer.svelte';

	let { children } = $props();
</script>

<Navbar />
{@render children()}
<Footer />
