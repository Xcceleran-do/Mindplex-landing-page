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

<!-- Layout family: opening feature. Heavy department rule, display heading, and
     a drop-capped opening paragraph, the way a magazine opens a piece. -->
<section id="about" class="section section-tint">
	<div class="section-wide">
		<div use:reveal class="rule-top pt-8">
			<h2 class="display-sm max-w-[15ch]">Generative AI broke the feed</h2>
		</div>

		<div class="mt-12 grid gap-x-16 gap-y-10 lg:grid-cols-[1.1fr_0.9fr]">
			<p class="drop-cap text-lg leading-[1.65]">
				The problem is no longer producing content. Anyone can produce content. The problem is
				knowing which of it is worth your time, and at the scale the feed now runs there is no good
				answer to that question.
			</p>

			<div class="flex flex-col justify-center gap-6">
				{#each problems as problem, i (problem.title)}
					<div use:reveal={i * 80} class="flex gap-4 border-t border-border pt-5">
						<problem.icon size={19} strokeWidth={1.75} class="mt-0.5 flex-none text-accent" />
						<div>
							<h3 class="font-semibold">{problem.title}</h3>
							<p class="mt-1 text-[0.9375rem] leading-relaxed text-muted-foreground">
								{problem.body}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Pull quote: the classic magazine interruption, and the section's thesis. -->
		<figure use:reveal={200} class="mt-16 border-t border-border pt-10 lg:mt-20">
			<blockquote class="pull-quote max-w-[24ch]">
				Agents do the research and the drafting. People keep the final word.
			</blockquote>
		</figure>
	</div>
</section>
