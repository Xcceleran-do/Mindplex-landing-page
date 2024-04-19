<script>
	import '../app.css';
	import Navbar from '$lib/sections/Navbar.svelte';
	import Footer from '$lib/sections/Footer.svelte';
	import Seo from '$lib/Seo.svelte';
</script>

<Seo
	title="Mindplex"
	description="Mindplex is a multimedia content site powered by fully decentralized matchmaking between content creators and content consumers."
	canonicalUrl="http://localhost:5173/blog"
	imageUrl="/mindplex_ai.png"
/>
<Navbar />
<slot />
<Footer />
