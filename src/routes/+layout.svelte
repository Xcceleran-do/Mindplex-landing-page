<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/section/Navbar.svelte';
	import Footer from '$lib/section/Footer.svelte';

	let { children } = $props();
</script>

<a class="skip-link" href="#main-content">Skip to content</a>
<Navbar />
{@render children()}
<Footer />
