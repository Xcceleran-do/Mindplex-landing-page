<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	export let data: PageData;
	const blog = data.blogs.blogs;

	onMount(() => {
		const linkContainers: NodeListOf<HTMLDivElement> = document.querySelectorAll(
			'.wp-block-embed__wrapper'
		);
		linkContainers?.forEach((link) => {
			if (link.innerText.includes('youtube.com')) {
				const videoId = link.innerText.split('v=')[1];
				const iframe = document.createElement('iframe');
				iframe.width = '100%';
				iframe.height = '315';
				iframe.src = `https://www.youtube.com/embed/${videoId}`;
				iframe.title = 'YouTube video player';
				iframe.frameborder = '0';
				iframe.allow =
					'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
				iframe.allowfullscreen = true;
				link.replaceWith(iframe);
			}
		});
	});
</script>

<section class=" mx-96 my-24">
	<div class="hero__background bg-[url('/hero_ellipse.svg') w-full"></div>

	<div class="blog-content">
		<h1 class="blog-heading text-4xl my-16">{@html blog[0]?.title}</h1>
		<div class="social-icons"></div>
		<!-- <img class="heading-img" src={blog.photo_url} alt="" /> -->
		<div class="blog-content prose prose-invert prose-a:text-cyan-700 lg:prose-xl">
			{@html blog[0]?.description}
		</div>
	</div>
</section>
