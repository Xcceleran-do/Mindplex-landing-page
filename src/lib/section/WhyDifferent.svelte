<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { differentiators } from '$lib/data/omegaplex';
</script>

<!-- Layout family: feature grid. Six items, six cells. -->
<section id="approach" class="section section-tint">
	<div class="section-wide">
		<div use:reveal class="max-w-3xl">
			<!-- Eyebrow 3 of 3 for the page. -->
			<p class="eyebrow">The difference</p>

			<h2 class="display mt-5">Most AI news tools summarize. This one covers a beat.</h2>
			<p class="lead mt-6 max-w-[52ch]">
				The things that only start to matter once a system has to show up again tomorrow.
			</p>
		</div>

		<div class="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
			{#each differentiators as item, i (item.title)}
				<div use:reveal={Math.min(i, 3) * 70}>
					<div
						class="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/12 text-accent"
					>
						<item.icon size={19} strokeWidth={1.75} />
					</div>
					<h3 class="mt-5 text-lg font-semibold">{item.title}</h3>
					<p class="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
						{item.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>
