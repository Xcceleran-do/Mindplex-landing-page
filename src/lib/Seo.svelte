<script>
	import { MetaTags, JsonLd } from 'svelte-meta-tags';
	export let title = '';
	export let description = '';
	export let canonicalUrl = '';
	export let imageUrl = '';
</script>

<MetaTags
	{title}
	titleTemplate="%s "
	{description}
	canonical={canonicalUrl}
	openGraph={{
		type: 'website',
		url: imageUrl,
		title: title,
		description: description,
		images: [
			{
				url: imageUrl,
				alt: 'mindplex',
				width: 800,
				height: 400,
				secureUrl: imageUrl,
				type: 'image/png'
			}
		]
	}}
	twitter={{
		handle: '@handle',
		site: '@mindplex',
		cardType: 'summary',
		title: title,
		description: description,
		image: imageUrl,
		imageAlt: 'mindplex'
	}}
/>
