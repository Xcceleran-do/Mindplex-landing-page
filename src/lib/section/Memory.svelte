<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { memory } from '$lib/data/omegaplex';
	import Check from '@lucide/svelte/icons/check';
	import Minus from '@lucide/svelte/icons/minus';
</script>

<!-- Layout family: two-column contrast. What enters the graph against what
     deliberately does not; the boundary is the substance of the section. -->
<section id="memory" class="section">
	<div class="section-wide">
		<div use:reveal class="max-w-3xl">
			<h2 class="display">
				It remembers the story,<br class="hidden sm:block" /> not the transcript
			</h2>
			<p class="lead mt-6 max-w-[52ch]">
				Only distilled, provenance-backed knowledge enters the graph. Everything else stays where it
				already lives.
			</p>
		</div>

		<div use:reveal={100} class="mt-16 grid gap-8 md:grid-cols-2 lg:mt-20 lg:gap-12">
			<div class="rounded-2xl border border-accent/30 bg-accent/[0.04] p-7 lg:p-9">
				<h3 class="text-lg font-semibold">Kept</h3>
				<ul class="mt-6 space-y-3">
					{#each memory.stored as item (item)}
						<li class="flex items-center gap-3 text-[0.9375rem] font-medium">
							<Check size={16} strokeWidth={2.25} class="flex-none text-accent" />
							{item}
						</li>
					{/each}
				</ul>
			</div>

			<div class="rounded-2xl border border-dashed border-border p-7 lg:p-9">
				<h3 class="text-lg font-semibold text-muted-foreground">Never kept</h3>
				<ul class="mt-6 space-y-3">
					{#each memory.notStored as item (item)}
						<li class="flex items-center gap-3 text-[0.9375rem] text-muted-foreground">
							<Minus size={16} strokeWidth={2.25} class="flex-none opacity-60" />
							{item}
						</li>
					{/each}
				</ul>
				<p class="mt-7 max-w-[40ch] text-sm leading-relaxed text-muted-foreground">
					The graph is a store of reusable knowledge, not a copy of everything the system has read.
				</p>
			</div>
		</div>
	</div>
</section>
