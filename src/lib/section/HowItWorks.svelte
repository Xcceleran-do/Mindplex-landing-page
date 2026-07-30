<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { phases } from '$lib/data/omegaplex';

	// Continuous numbering across phases, so the ten steps read as one sequence
	// even though they are grouped into three. Offsets are computed up front
	// rather than incremented during render, which would keep climbing on every
	// re-render.
	const numbered = phases.map((phase, i) => ({
		...phase,
		offset: phases.slice(0, i).reduce((total, prev) => total + prev.steps.length, 0)
	}));
</script>

<!-- Layout family: phased sequence over a tinted band. Large phase numerals give
     the section a scale change; the steps stay terse. -->
<section id="how-it-works" class="section section-tint">
	<div class="section-wide">
		<div use:reveal class="max-w-3xl">
			<h2 class="display-sm">Every story, the same ten steps</h2>
			<p class="lead mt-6 max-w-[50ch]">
				From first source to published piece, with a human editor between the draft and you.
			</p>
		</div>

		<div class="mt-16 grid gap-x-10 gap-y-14 lg:mt-20 lg:grid-cols-3">
			{#each numbered as phase, i (phase.name)}
				<div use:reveal={i * 90}>
					<div class="flex items-baseline gap-4">
						<span
							class="tnum font-[family-name:var(--font-display)] text-6xl leading-none font-medium text-accent/30"
						>
							{String(i + 1).padStart(2, '0')}
						</span>
						<div>
							<h3 class="text-xl font-semibold">{phase.name}</h3>
							<p class="mt-1 text-[0.9375rem] text-muted-foreground">{phase.summary}</p>
						</div>
					</div>

					<ol class="mt-8 space-y-0 border-t border-border">
						{#each phase.steps as step, j (step)}
							<li class="flex items-baseline gap-4 border-b border-border py-3.5">
								<span class="tnum text-xs font-semibold text-muted-foreground">
									{String(phase.offset + j + 1).padStart(2, '0')}
								</span>
								<span class="text-[0.9375rem] font-medium">{step}</span>
							</li>
						{/each}
					</ol>
				</div>
			{/each}
		</div>
	</div>
</section>
