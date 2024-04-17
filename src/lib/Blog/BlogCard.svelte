<script lang="ts">
	export let url = '';
	export let title = '';
	export let image = '';
	export let description = '';
	export let created_at = '';

	import { formatTimeAgo } from '$lib/utils/fomatAgo';

	function cropText(text: string, limit: number) {
		const words = text.split(' ');
		return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text;
	}

	function stripHtml(dirtyString: string) {
		return dirtyString.replace(/(<([^>]+)>)/gi, '');
	}
</script>

<a
	class="card flex justify-between shadow-md bg-gradient-to-br from-[#1b3049] to-[#205d5c] rounded-lg max-w-xl cursor-pointer w-full"
	href={`/blog/${url}`}
>
	<div class="left flex flex-col p-6">
		<span class="text-gray-400 text-sm">{formatTimeAgo(created_at)}</span>
		<h1 class="font-bold text-xl mt-2">{cropText(title, 10)}</h1>
		<div class="mt-2 text-sm text-gray-400">{stripHtml(cropText(description, 10))}</div>
	</div>
	<img
		class="card-img w-full max-w-[40%] rounded-r-lg md:max-w-none md:w-48"
		src={image}
		alt="title"
	/>
</a>
