<script>
	import { mindplexTokens } from '$lib/content/index';
	import { onMount } from 'svelte';

	onMount(() => {
		document.querySelectorAll('.plus-icon').forEach((item) => {
			item.addEventListener('click', (event) => {
				const cardInner = event.target.closest('.card-inner');
				cardInner.classList.toggle('is-flipped');
			});
		});

		document.querySelectorAll('.minus-icon').forEach((item) => {
			item.addEventListener('click', (event) => {
				const cardInner = event.target.closest('.card-inner');
				cardInner.classList.toggle('is-flipped');
			});
		});
	});
</script>

<section class="card_grid_section" id="mindplexTokens">
	<div class="heading_container">
		<div
			class="flex flex-row items-center justify-center gap-6 w-full overflow-hidden mb-8 max-w-5xl mx-auto"
		>
			<img src="/line.svg" alt="line" class="transform rotate-180 w-full max-w-sm" />
			<h2 class="text-lg md:text-4xl uppercase font-semibold min-w-fit text-center">
				Mindplex Tokens
			</h2>
			<img src="/line.svg" alt="line" class="w-full max-w-sm" />
		</div>
		<p
			class="text-white font-montserrat text-sm md:text-lg font-normal leading-5 mb-12 md:px-12 max-w-6xl mx-auto"
		>
			Mindplex operates based on a carefully designed tokenomics system involving a liquid
			cryptographic token (MPX) which is used to incentivize good content and good conduct, and a
			non-liquid soulbound token, the Mindplex Reputation Token (MPXR), which is used to measure and
			quantify the weight of users credibility.
		</p>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each mindplexTokens as { imageSource, title, description, color }}
			<div class="card-container relative">
				<div
					class={`card-inner relative transform transition duration-700 ease-in-out ${color} flex flex-col mb-10 px-8 py-7 justify-evenly rounded-3xl h-[598px] max-w-[367px]`}
				>
					<div
						class="card-back absolute backface-hidden w-full h-full transform rotateY-180 bg-white p-4 left-0 rounded-3xl"
					>
						<p class="text-gray-800 text-base">{description}</p>
						<img
							src="/icons/minus-icon.svg"
							class="w-8 cursor-pointer minus-icon absolute bottom-5 right-5"
							alt="icon"
						/>
					</div>
					<h2 class="text-2xl font-semibold uppercase text-left mb-5">
						{title}
					</h2>
					<img src={imageSource} class="w-full h-full" alt="cardimage" />
					<img
						src="/icons/plus-icon.svg"
						class="w-8 self-end cursor-pointer plus-icon"
						alt="icon"
					/>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.backface-hidden {
		backface-visibility: hidden;
	}
	.card-container {
		perspective: 1000px;
	}
	.card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.6s;
		transform-style: preserve-3d;
		cursor: pointer;
	}
	.card-inner.is-flipped {
		transform: rotateY(180deg);
	}
	.card-front,
	.card-back {
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
	}
	.card-back {
		transform: rotateY(180deg);
	}
</style>
