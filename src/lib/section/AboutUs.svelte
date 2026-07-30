<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import Waves from '@lucide/svelte/icons/waves';
	import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
	import ScanSearch from '@lucide/svelte/icons/scan-search';

	const problems = [
		{
			icon: Waves,
			title: 'Too much of it',
			body: 'Content arrives faster than any newsroom can curate, and visibility collapses.'
		},
		{
			icon: TriangleAlert,
			title: 'Too much of it is fake',
			body: 'Synthetic material spreads misinformation at the speed of the feed.'
		},
		{
			icon: ScanSearch,
			title: 'No way to tell',
			body: 'There are almost no impartial measures of credibility to sort one from the other.'
		}
	];
</script>

<!-- Layout family: problem statement over a tinted band. Tinting alternates the
     section weight so the page has rhythm rather than one continuous surface. -->
<section id="about" class="section section-tint">
	<div class="section-wide">
		<div use:reveal class="max-w-3xl">
			<h2 class="display">Generative AI broke the feed</h2>
			<p class="lead mt-6 max-w-[54ch]">
				The problem is no longer producing content. It is knowing which of it is worth your time.
			</p>
		</div>

		<div class="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-3 lg:mt-16">
			{#each problems as problem, i (problem.title)}
				<div use:reveal={i * 80} class="border-t border-border pt-6">
					<problem.icon size={20} strokeWidth={1.75} class="text-accent" />
					<h3 class="mt-4 text-lg font-semibold">{problem.title}</h3>
					<p class="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
						{problem.body}
					</p>
				</div>
			{/each}
		</div>

		<div use:reveal={200} class="mt-16 border-t border-border-strong pt-10 lg:mt-20">
			<p class="max-w-[46ch] text-2xl leading-snug font-semibold sm:text-3xl">
				Mindplex is our answer. Agents do the research and the drafting. People keep the final word.
			</p>
		</div>
	</div>
</section>
