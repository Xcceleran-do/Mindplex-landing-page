<script lang="ts">
	import type { PageData } from './$types';

	import { MetaTags, JsonLd } from 'svelte-meta-tags';
	import Seo from '$lib/Seo.svelte';

	export let data: PageData;
	const blog = data.blogs.blogs;


	const pageTitle = blog[0]?.title.substring(0, 50);
	const url = `http://localhost:5173/${blog[0]?.title}`;
	const pageDescription = blog[0]?.description.substring(0, 150);

</script>

<Seo
	title={pageTitle}
	description={pageDescription}
	canonicalUrl="http://localhost:5173/blog"
	imageUrl={blog.photo_url}
/>

<section class=" mx-96 my-24">
	<div class="hero__background bg-[url('/hero_ellipse.svg') w-full"></div>

	<div class="blog-content">
		<h1 class="blog-heading text-4xl my-16">
			{@html blog[0]?.title}
		</h1>
		<div class="social-icons"></div>

		<!-- <img class="heading-img" src={blog.photo_url} alt="" /> -->

		<div class="blog-content prose prose-invert prose-a:text-cyan-700 lg:prose-xl">
			{@html blog[0]?.description}
		</div>
	</div>
</section>
