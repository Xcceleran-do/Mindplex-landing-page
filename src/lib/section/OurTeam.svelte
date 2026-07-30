<script lang="ts">
	import { ourTeam } from '$lib/data/OurTeam';
	import { reveal } from '$lib/actions/reveal';
	import Linkedin from '@lucide/svelte/icons/linkedin';
</script>

<!-- Layout family: portrait grid with captions below the image. Names and roles
     are always visible; the previous build hid them behind a hover state. -->
<section id="team" class="section">
	<div class="section-wide">
		<div use:reveal class="max-w-3xl">
			<h2 class="display-sm">The people behind it</h2>
			<p class="lead mt-6 max-w-[46ch]">
				Researchers, editors, and engineers building what comes after the feed.
			</p>
		</div>

		<ul
			class="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 xl:grid-cols-4"
		>
			{#each ourTeam as member, i (member.name)}
				<li use:reveal={Math.min(i, 3) * 70}>
					<div class="overflow-hidden rounded-lg border border-border bg-surface">
						<img
							src={member.imageUrl}
							alt={member.name}
							loading="lazy"
							decoding="async"
							class="aspect-[4/5] w-full object-cover"
							style={member.customImageStyle}
						/>
					</div>

					<div class="mt-4 flex items-start justify-between gap-3">
						<div>
							<h3 class="text-[0.9375rem] font-semibold">{member.name}</h3>
							<p class="mt-0.5 text-sm text-muted-foreground">{member.position}</p>
						</div>

						{#if member.socialLink.trim()}
							<a
								href={member.socialLink.trim()}
								target="_blank"
								rel="noreferrer"
								aria-label="{member.name} on LinkedIn"
								class="mt-0.5 flex-shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:text-accent"
							>
								<Linkedin size={17} strokeWidth={1.75} />
							</a>
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>
