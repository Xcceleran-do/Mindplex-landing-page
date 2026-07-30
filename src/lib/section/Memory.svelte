<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { memory, dispositions } from '$lib/data/omegaplex';
	import Check from '@lucide/svelte/icons/check';
	import Minus from '@lucide/svelte/icons/minus';
</script>

<!-- Layout family: inverted counterpoint band. The one dark section on a light
     page, carrying the memory model and the claim dispositions. -->
<section id="memory" class="section section-invert">
	<div class="section-wide">
		<div use:reveal class="max-w-3xl">
			<h2 class="display-sm">
				It remembers the story,<br class="hidden sm:block" /> not the transcript
			</h2>
			<p class="lead mt-6 max-w-[52ch]">
				Only distilled, provenance-backed knowledge enters the graph. Everything else stays where it
				already lives.
			</p>
		</div>

		<div use:reveal={100} class="mt-16 grid gap-8 md:grid-cols-2 lg:mt-20 lg:gap-12">
			<div class="rounded-xl border border-accent/40 bg-accent/[0.07] p-7 lg:p-9">
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

			<div class="rounded-xl border border-dashed border-border p-7 lg:p-9">
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

		<!-- The compression discipline, stated as a figure. This is the clearest
		     single expression of what keeps the reasoning graph clean. -->
		<figure
			use:reveal={160}
			class="mt-16 border-t border-border pt-10 lg:mt-20 lg:flex lg:items-baseline lg:gap-14"
		>
			<blockquote class="pull-quote max-w-[16ch] text-accent lg:flex-none">
				300 comments in. One atom out.
			</blockquote>
			<figcaption class="mt-5 max-w-[54ch] text-[0.9375rem] leading-relaxed lg:mt-0">
				A day of reader discussion is compressed into a single structured digest before anything
				reaches memory. Raw threads stay in the comment store. Only the distilled signal crosses,
				which is what stops the reasoning graph filling with noise.
			</figcaption>
		</figure>

		<!-- Claim dispositions: the concrete form of "shows its work". -->
		<div use:reveal={220} class="mt-16 lg:mt-20">
			<p class="panel-label">Every claim in a draft gets one of three verdicts</p>
			<dl class="mt-6 grid gap-px overflow-hidden rounded-xl border border-border sm:grid-cols-3">
				{#each dispositions as item (item.name)}
					<div class="bg-white/[0.03] p-6 lg:p-7">
						<dt class="text-[0.8125rem] font-semibold tracking-[0.16em] text-accent uppercase">
							{item.name}
						</dt>
						<dd class="mt-3 text-[0.9375rem] leading-relaxed">{item.body}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</section>
