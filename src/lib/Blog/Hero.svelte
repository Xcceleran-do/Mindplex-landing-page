<script>
	export let id = '';
	export let post_slug = '';
	export let title = '';
	export let description = '';
	export let photo_url = '';
	import GlowingBtn from '$lib/ui/GlowingBtn.svelte';

	const url = `/blog/${post_slug}`;
</script>

<section class="hero flex justify-evenly my-24">
	<div class="hero__background"></div>
	<div class="hero__background__decoration"></div>
	<div class="hero__content flex flex-col w-1/2 mr-36 gap-8">
		<h1 class="hero__title text-4xl font-bold">{title}</h1>
		<div class="hero__description">
			<p>{@html description}</p>
		</div>
		<div class="hero__cta max-w-36">
			<GlowingBtn href={url} text="Read more" fontSize="text-lg" />
		</div>
	</div>
	<div class="hero__image max-w-[500px] max-h-[570px] m-auto md:m-0">
		<img src={photo_url} alt="description" class="w-full max-w-xs md:max-w-none" />
	</div>
</section>
