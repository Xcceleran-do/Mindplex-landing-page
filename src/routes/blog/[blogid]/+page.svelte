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

<section>
	<div
		class="hero__background absolute bg-[url('/hero_ellipse.svg')] w-full h-[109%] bg-no-repeat right-0 top-[-67px] max-w-[797px] z-[-1] hidden md:block"
	></div>

	<div class="blog-content mx-4 flex flex-col items-center">
		<h1
			class="blog-heading font-bold text-left max-w-[820px] text-[#f2f2f2] font-montserrat text-4xl leading-normal my-8"
		>
			{@html blog[0]?.title}
		</h1>
		<div class="social-icons flex justify-end gap-2"></div>
		<!-- <img class="heading-img" src={blog.photo_url} alt="" /> -->
		<div
			class="blog-content my-8 prose prose-invert prose-p:text-left prose:lg prose-p:text-[#f2f2f2] prose-p:font-montserrat prose-p:text-xl prose-p:leading-10 prose-figure:w-full prose-img:w-full prose-figcaption:text-center prose-a:text-cyan-700 md:prose-xl"
		>

			{@html blog[0]?.description}
		</div>
	</div>
</section>
