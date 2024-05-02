<script lang="ts">
	import GlowingBtn from '$lib/ui/GlowingBtn.svelte';

	import type { BlogContent } from '$lib/types/blog';

	const { id, description, title, photo_url, post_slug }: BlogContent = $props();
	const url = `/blog/${post_slug}`;
</script>

<section class="hero flex my-24">
	<div
		class="hero__background absolute bg-[url('/hero_ellipse.svg')] w-full h-[109%] bg-no-repeat right-0 top-[-67px] max-w-[797px] z-[-1] hidden md:block"
	></div>
	<div class="hero__background__decoration"></div>

	<div class="flex flex-col-reverse gap-10 sm:justify-center md:flex-row">
		<div class="hero__content flex flex-col mr-36 gap-8 w-full md:w-1/2">
			<h1 class="hero__title text-4xl font-bold">{title}</h1>
			<div class="hero__description">
				<p>{@html description}</p>
			</div>
			<div class="hero__cta max-w-36">
				<GlowingBtn href={url} text="Read more" fontSize="text-lg" />
			</div>
		</div>
		<div class="hero__image max-w-[500px] max-h-[570px] m-auto md:m-0">
			<img src={photo_url} alt="description" class="w-full h-[289px] md:max-w-none" />
		</div>
	</div>
</section>
