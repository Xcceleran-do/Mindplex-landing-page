<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import Lock from '@lucide/svelte/icons/lock';

	// The control plane, as a designed diagram rather than the ASCII tree it
	// started as. Real DOM boxes so it stays selectable and responsive, and so
	// the boundary between the two halves can carry visual weight.
	const controlPlane = [
		'Tasks, prompts, permissions',
		'Validation and CMS',
		'Search and deep-pull tools',
		'Knowledge graph tool'
	];

	const workers = ['Ingestion / curator', 'Writer', 'Comment reply'];

	const blocked = ['Database', 'CMS', 'Search providers', 'Atomspace'];
</script>

<!-- Layout family: split, statement against a designed system diagram. -->
<section id="omegaclaw" class="section">
	<div class="section-wide">
		<div class="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
			<div use:reveal>
				<!-- Eyebrow 2 of 3 for the page. -->
				<p class="eyebrow">OmegaClaw</p>

				<h2 class="display mt-5">
					Mindplex controls.<br />
					<span class="text-accent">OmegaClaw reasons.</span>
				</h2>

				<p class="lead mt-7 max-w-[48ch]">
					The engine gets tasks, calls approved tools, and returns typed output. It never touches
					your systems directly.
				</p>

				<div class="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2">
					<span class="inline-flex items-center gap-2 text-sm font-medium">
						<Lock size={15} strokeWidth={2} class="text-accent" />
						No direct access to
					</span>
					{#each blocked as item (item)}
						<span
							class="rounded-md border border-dashed border-border px-2.5 py-1 text-sm text-muted-foreground"
						>
							{item}
						</span>
					{/each}
				</div>
			</div>

			<div use:reveal={120}>
				<div class="overflow-hidden rounded-2xl border border-border bg-surface">
					<!-- Upper half: what Mindplex owns. -->
					<div class="p-6 lg:p-8">
						<p class="panel-label">Mindplex</p>
						<div class="mt-4 grid gap-2 sm:grid-cols-2">
							{#each controlPlane as item (item)}
								<div
									class="rounded-lg border border-border bg-background px-3.5 py-3 text-sm font-medium"
								>
									{item}
								</div>
							{/each}
						</div>
					</div>

					<!-- The boundary itself, given weight because it is the whole point. -->
					<div class="relative border-y border-border-strong bg-background/60 px-6 py-3 lg:px-8">
						<p class="font-mono text-xs tracking-[0.14em] text-accent uppercase">
							Tasks down · typed JSON up
						</p>
					</div>

					<!-- Lower half: what OmegaClaw runs. -->
					<div class="p-6 lg:p-8">
						<p class="panel-label">OmegaClaw workers</p>
						<div class="mt-4 flex flex-wrap gap-2">
							{#each workers as worker (worker)}
								<div
									class="rounded-lg border border-accent/35 bg-accent/10 px-3.5 py-2 text-sm font-medium text-accent"
								>
									{worker}
								</div>
							{/each}
						</div>
					</div>
				</div>

				<p class="mt-6 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
					Workers reach memory through a controlled query tool. Questions in natural language are
					parsed into constrained queries, checked for scope and safety, and returned with
					provenance.
				</p>
			</div>
		</div>
	</div>
</section>
