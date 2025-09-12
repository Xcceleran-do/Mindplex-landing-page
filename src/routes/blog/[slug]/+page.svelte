<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	import { onMount } from 'svelte';

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
				iframe.frameBorder = '0';
				iframe.allow =
					'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
				iframe.allowFullscreen = true;
				link.replaceWith(iframe);
			}
		});
	});
</script>

<!-- class="mx-96 my-24" -->
<section class="mx-auto prose mt-6 prose-invert prose-a:text-cyan-700">
	<div class="">
		<h1 class="">
			{@html blog[0]?.title}
		</h1>
		<!-- <div class="social-icons"></div> -->
		<div class="">
			{@html blog[0]?.description}
		</div>
	</div>
</section>
