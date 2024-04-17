<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data);
	const blog = data.blogs.blogs;
</script>

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
