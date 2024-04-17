<script lang="ts">
	import type { PageData } from './$types';
	import { MetaTags, JsonLd } from 'svelte-meta-tags';

	export let data: PageData;
	console.log(data);
	const blog = data.blogs.blogs;

	const pageTitle = blog[0]?.title.substring(0, 50);
	const url = `http://localhost:5173/${blog[0]?.title}`;
	const pageDescription = blog[0]?.description.substring(0, 150);
</script>

<MetaTags
	title={pageTitle}
	titleTemplate="%s | Mindplex"
	description={pageDescription}
	canonical={url}
	openGraph={{
		type: 'website',
		url: 'https://mindplex.ai/',
		title: pageTitle,
		description: pageDescription,
		images: [
			{
				url: blog.photo_url,
				alt: 'mindplex',
				width: 800,
				height: 400,
				secureUrl: '/mindplex_ai.png',
				type: 'image/png'
			}
		]
	}}
	twitter={{
		handle: '@handle',
		site: '@mindplex',
		cardType: 'summary',
		title: pageTitle,
		description: pageDescription,
		image: blog.photo_url,
		imageAlt: 'blog image'
	}}
/>

<section class=" mx-96 my-24">
	<div class="hero__background bg-[url('/hero_ellipse.svg') w-full"></div>

	<div class="blog-content">
		<h1 class="blog-heading text-4xl my-16">{@html blog[0]?.title}</h1>
		<div class="social-icons"></div>
		<!-- <img class="heading-img" src={blog.photo_url} alt="" /> -->
		<div class="blog-content prose prose-invert prose-a:text-cyan-700 lg:prose-xl" />
		{@html blog[0]?.description}
	</div>
</section>

<style>
</style>
