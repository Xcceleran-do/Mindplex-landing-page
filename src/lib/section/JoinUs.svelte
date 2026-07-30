<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
</script>

<!-- Layout family: full-width closing band. The one centered composition on the
     page, which is what marks it as the end. -->
<section class="section section-tint">
	<div class="section-wide">
		<div use:reveal class="mx-auto max-w-3xl text-center">
			<h2 class="display">Argue with it</h2>

			<p class="lead mx-auto mt-6 max-w-[46ch]">
				Read the reporting, check its sources, push back on the conclusions. Good discussion becomes
				tomorrow's coverage.
			</p>

			<div class="mt-10 flex flex-wrap items-center justify-center gap-3">
				<a
					href="https://magazine.mindplex.ai/social"
					class="group inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3.5 text-base font-medium text-accent-foreground transition-colors hover:bg-accent-strong active:translate-y-px"
				>
					Go to Mindplex Social
					<ArrowRight
						size={18}
						strokeWidth={2}
						class="transition-transform duration-200 group-hover:translate-x-0.5"
					/>
				</a>

				<a
					href="https://magazine.mindplex.ai"
					class="inline-flex items-center rounded-md border border-border-strong px-6 py-3.5 text-base font-medium transition-colors hover:bg-surface"
				>
					Read the magazine
				</a>
			</div>
		</div>
	</div>
</section>
