<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	const roadmap = data.navigationData;
	const roadmapContent = data.contentData;
	const filteredContent = roadmapContent[0]?.steps;
	const active = data.active;

	const colorMapping = {
		'2023': {
			text: '#83E9FF',
			bg: '#83E9FF',
			boxColors: ['#529890', '#62AABA']
		},
		'2024': {
			text: '#EE83FF',
			bg: '#EE83FF',
			boxColors: ['#904490', '#A562BA']
		},
		'2025': {
			text: '#5BFFB0',
			bg: '#5BFFB0',
			boxColors: ['#529062', '#62BA90']
		},
		'2026': {
			text: '#FFB05B',
			bg: '#FFB05B',
			boxColors: ['#905290', '#BA62AA']
		}
	};

	const getYear = (slug: string) => slug.split('_')[1];
</script>

<section class="roadmap mx-6 my-32">
	<div class="relative w-full">
		<img alt="line" src="/3-version-line.svg" class="w-full" />
		<div class="absolute -top-10 flex w-full flex-row justify-evenly md:-top-14">
			{#each roadmap as { slug, name }}
				{@const year = getYear(slug)}
				{@const colors = colorMapping[year]}
				<div class="flex flex-col items-center">
					<div>
						<h3 class="w-full text-xs sm:text-sm md:text-3xl" style:color={colors?.text}>
							{name}
						</h3>
					</div>
					<a href={`/roadmap/${slug}`} rel="external">
						<div
							class="relative h-14 w-14 rounded-full opacity-20"
							style:background-color={colors?.bg}
						></div>
						<div
							class="absolute top-7 ml-3 h-8 w-8 rounded-full md:top-12"
							style:background-color={colors?.bg}
							style:opacity={slug === active ? '1' : '0.25'}
						></div>
					</a>
				</div>
			{/each}
		</div>
	</div>

	<div>
		<h1 class="mt-20 text-center text-4xl" style:color={colorMapping[getYear(active)]?.text}>
			{roadmapContent[0].description?.trim()}
		</h1>
	</div>

	{#each filteredContent as { content_title, desc }, index}
		<div class="mt-12 mb-6 flex w-full flex-row gap-4 md:gap-28 lg:gap-36">
			<div
				class="w-[251px] rounded-xl px-2 py-5 text-center text-xs sm:px-8 sm:text-sm md:text-2xl lg:w-[985px] lg:px-20"
				style:background-color={colorMapping[getYear(active)]?.boxColors[index % 2]}
			>
				{content_title}
			</div>

			<div class="flex w-full flex-row gap-4 lg:gap-10">
				<div
					class="min-w-[8px] rounded-2xl sm:min-w-[15px]"
					style:background-color={colorMapping[getYear(active)]?.text}
				></div>
				<p class="w-full text-xs sm:w-fit sm:text-sm md:text-2xl">
					{@html desc}
				</p>
			</div>
		</div>
	{/each}
</section>
