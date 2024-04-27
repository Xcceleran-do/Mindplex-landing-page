<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	const roadmap = data.filteredData;
	console.log(roadmap);
	let count = 0;
	let opacity: any;
</script>

<section class="roadmap my-32">
	<div class="relative w-full">
		<img alt="" src="/3-version-line.svg" class="w-full" />
		<div class="absolute -top-10 flex flex-row justify-evenly w-full md:-top-14">
			{#each roadmap as { quarter }}
				<!-- {#if id == `Q1_${currentYear}`}
					{(opacity = 100)}
				{:else}
					{(opacity = 25)}
				{/if}
				{#if (id.includes(currentYear) || id.includes(`Q4_${currentYear - 1}`)) && count < 4}
					{#if count++} -->
				<div>
					<div>
						<h3 class="text-xs w-full sm:text-sm md:text-3xl">
							{quarter}
						</h3>
					</div>
					<a href={`roadmap/${quarter}`}>
						<div class=" w-14 h-14 rounded-full opacity-20 relative"></div>
						<div class=" w-8 h-8 absolute top-7 ml-3 rounded-full" style="opacity: {opacity};" />
					</a>
				</div>
				<!-- {/if}
				{/if} -->
			{/each}
		</div>
	</div>

	{#each roadmap as { steps }}
		<div>
			<h1 class={` text-4xl mt-20 text-center`}>
				{steps.step.content.title}
			</h1>
		</div>
		<div class="flex flex-row mb-6 w-full mt-12 gap-4 md:gap-28 lg:gap-36">
			<div
				class={`  py-5 px-2 rounded-xl text-center text-xs sm:px-8 sm:text-sm w-[251px]  lg:w-[985px] md:text-2xl lg:px-20 `}
			>
				{steps.step.content.title}
			</div>

			<div class=" w-full flex flex-row gap-4 lg:gap-10">
				<div class={`  min-w-[8px] rounded-2xl sm:min-w-[15px]`} />
				<p class=" w-full text-xs sm:text-sm sm:w-fit md:text-2xl">
					{steps.step.content.description}
				</p>
			</div>
		</div>
	{/each}
</section>
