<script lang="ts">
	import type { PageData } from './$types';
	import Layout from '$lib/layout/Layout.svelte';
	import Hero from '$lib/Blog/Hero.svelte';
	import BlogCard from '$lib/Blog/BlogCard.svelte';
	import ResponsiveCards from '$lib/layout/ResponsiveCards.svelte';

	import { MetaTags, JsonLd } from 'svelte-meta-tags';


	import type { BlogContent } from '$lib/types/blog';
	export let data: PageData;
	console.log(data);

	const blogs = data.blogs.blogs;

	const latestBlog = blogs ? blogs[0] : null;

	console.log(latestBlog);
	const pageTitle = latestBlog?.title.substring(0, 50);

	const pageDescription = latestBlog?.description.substring(0, 150);
	const blogsWithoutFirstPost = blogs?.filter((blog: any) => blog.id !== latestBlog?.id);
</script>

<MetaTags
	title={pageTitle}
	titleTemplate="%s | Mindplex"
	description={pageDescription}
	canonical="http://localhost:5173/blog"
	openGraph={{
		type: 'website',
		url: 'https://mindplex.ai/',
		title: pageTitle,
		description: pageDescription,
		images: [
			{
				url: latestBlog.photo_url,
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
		image: latestBlog.photo_url,
		imageAlt: 'blog image'
	}}
/>

<section class=" my-6 mx-20">
	<div>
		<Hero {...latestBlog} />
		<div class="pb-4">
			<ResponsiveCards gap="112px" width="580px">
				{#each blogsWithoutFirstPost as { description, id, photo_url, title, post_slug, created_at }}
					<BlogCard {title} {description} image={photo_url} url={post_slug} {created_at} />
				{/each}
			</ResponsiveCards>
		</div>
	</div>
</section>
