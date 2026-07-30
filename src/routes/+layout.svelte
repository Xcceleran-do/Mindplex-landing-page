<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/section/Navbar.svelte';
	import Footer from '$lib/section/Footer.svelte';
	import { theme } from '$lib/theme.svelte';

	let { children } = $props();

	// Track the OS preference while the user has not chosen for themselves, so
	// the page follows a system theme change without a reload.
	$effect(() => theme.watchSystem());
</script>

<Navbar />
{@render children()}
<Footer />
