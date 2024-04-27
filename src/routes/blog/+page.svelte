<script lang="ts">
	import type { PageData } from './$types';
	import Layout from '$lib/layout/Layout.svelte';
	import Hero from '$lib/Blog/Hero.svelte';
	import BlogCard from '$lib/Blog/BlogCard.svelte';
	import ResponsiveCards from '$lib/layout/ResponsiveCards.svelte';

	export let data: PageData;

	const blogs = data.blogs;
	const latestBlog = blogs[0];
	const blogsWithoutFirstPost = blogs?.filter((blog) => blog.id !== latestBlog?.id);
</script>

<section class=" my-6 mx-20">
	<div>
		<Hero {...latestBlog} />
		<div class="pb-4">
			<ResponsiveCards gap="112px" width="580px">
				{#each blogsWithoutFirstPost as { description, id, photo_url, title, post_slug, created_at }}
					<BlogCard {title} {description} image={photo_url} url={id} {created_at} />
				{/each}
			</ResponsiveCards>
		</div>
	</div>
</section>
