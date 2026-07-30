<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { beat } from '$lib/data/omegaplex';
</script>

<!-- Layout family: product reveal. The claim is the section; the beat sits under
     it as a single wide panel rather than another grid of cards. -->
<section id="omegaplex" class="section">
	<div class="section-wide">
		<div use:reveal class="max-w-4xl">
			<!-- Eyebrow 1 of 3 for the page. -->
			<p class="eyebrow">OmegaPlex</p>

			<h2 class="display mt-5">
				Not a newsletter written by AI.<br class="hidden sm:block" />
				<span class="text-accent">A newsletter that is an AI.</span>
			</h2>

			<p class="lead mt-7 max-w-[56ch]">
				It reads continuously, reasons across sources, remembers what happened, and shows its work.
			</p>
		</div>

		<!-- TODO: brand render slot, roughly 720x520, transparent background like
		     mindplex_ai.png. Sits right of the beat panel at lg and above. -->

		<div
			use:reveal={120}
			class="mt-16 overflow-hidden rounded-2xl border border-border bg-surface lg:mt-20"
		>
			<div class="grid divide-y divide-border lg:grid-cols-[1.1fr_1fr] lg:divide-x lg:divide-y-0">
				<div class="p-8 lg:p-12">
					<p class="panel-label">Now covering</p>
					<p class="mt-4 text-3xl font-semibold text-accent sm:text-4xl">{beat.current}</p>
					<p class="mt-5 max-w-[42ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
						A column is mostly configuration. Adding a vertical means adding a beat, not building
						another product.
					</p>
				</div>

				<div class="p-8 lg:p-12">
					<p class="panel-label">Next, possibly</p>
					<ul class="mt-4 flex flex-wrap gap-2">
						{#each beat.possibleFuture as topic (topic)}
							<li
								class="rounded-md border border-border-strong px-3 py-1.5 text-[0.9375rem] font-medium"
							>
								{topic}
							</li>
						{/each}
					</ul>
					<p class="mt-5 text-sm text-muted-foreground">Under consideration, not yet committed.</p>
				</div>
			</div>
		</div>
	</div>
</section>
