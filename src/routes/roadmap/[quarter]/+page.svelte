<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	const roadmap = data.navigationData;
	const roadmapContent = data.contentData;
	console.log(roadmap);
	const filteredContent = roadmapContent[0].steps;

	let count = 0;
	let opacity: any;
	const ccolor = '#83E9FF';
</script>

<section class="roadmap my-32 mx-6">
	<div class="relative w-full">
		<img alt="" src="/3-version-line.svg" class="w-full" />
		<div class="absolute -top-10 flex flex-row justify-evenly w-full md:-top-14">
			{#each roadmap as { quarter, backgroundColor, color }}
				<div>
					<div>
						<h3 class={` text-xs w-full sm:text-sm md:text-3xl`} style="color: {color};">
							{quarter}
						</h3>
					</div>
					<a href={`/roadmap/${quarter}`} rel="external">
						<div
							class=" w-14 h-14 rounded-full opacity-20 relative"
							style="background-color: {backgroundColor};"
						></div>
						<div
							class="w-8 h-8 absolute top-7 ml-3 rounded-full md:top-12"
							style="background-color: {backgroundColor};"
						/>
					</a>
				</div>
			{/each}
		</div>
	</div>
	{#each filteredContent as { step, content }}
		<div class=" w-full flex flex-col justify-center items-center">
			<div>
				<h1 class="text-4xl mt-20 text-center" style="color: {content.sectionColor};">
					{step}
				</h1>
			</div>
			<div class="flex flex-row mb-6 self-center w-full mt-12 gap-4 md:gap-28 lg:gap-36">
				<div
					class="py-5 px-2 rounded-xl text-center text-xs sm:px-8 sm:text-sm w-[251px] lg:w-[985px] md:text-2xl lg:px-20"
					style="background-color: {content.color};"
				>
					{content.title}
				</div>

				<div class=" w-full flex flex-row gap-4 lg:gap-10">
					<div
						class="min-w-[8px] rounded-2xl sm:min-w-[15px]`"
						style="background-color: {content.sectionColor};"
					/>
					<p
						class={`py-5 px-2 rounded-xl text-center text-xs sm:px-8 sm:text-sm w-[251px] lg:w-[985px] md:text-2xl lg:px-20`}
					>
						{content.description}
					</p>
				</div>
			</div>
		</div>
	{/each}
</section>
