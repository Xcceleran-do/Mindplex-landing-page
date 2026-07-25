<script lang="ts">
	const channels = [
		{ name: 'Intelligence', hex: '#22D07F', topics: 'AI · Robotics · AGI' },
		{ name: 'Cosmos', hex: '#87B9FC', topics: 'Space · Physics' },
		{ name: 'Mind', hex: '#F598D9', topics: 'Consciousness · Neuroscience · Longevity' },
		{ name: 'Commons', hex: '#EAAB3F', topics: 'Decentralization · Governance' }
	];

	const surfaces = [
		{ name: 'page', hex: '#121317' },
		{ name: 'surface', hex: '#191B20' },
		{ name: 'surface-strong', hex: '#202329' },
		{ name: 'ink', hex: '#EDF0F3' },
		{ name: 'ink-muted', hex: '#A8ADB5' },
		{ name: 'ink-faint', hex: '#747A84' }
	];

	const scale = [
		{ role: 'Display XL', size: '5.5rem', wdth: 112, wght: 620, track: '-0.045em', lead: 0.94 },
		{ role: 'Display L', size: '3.5rem', wdth: 108, wght: 620, track: '-0.038em', lead: 0.98 },
		{ role: 'Display M', size: '2.25rem', wdth: 104, wght: 640, track: '-0.028em', lead: 1.04 },
		{ role: 'Heading', size: '1.375rem', wdth: 100, wght: 650, track: '-0.015em', lead: 1.2 },
		{ role: 'Body L', size: '1.1875rem', wdth: 100, wght: 400, track: '0', lead: 1.6 },
		{ role: 'Body', size: '1rem', wdth: 100, wght: 400, track: '0', lead: 1.65 },
		{ role: 'Caption', size: '0.8125rem', wdth: 100, wght: 500, track: '0.004em', lead: 1.5 }
	];
</script>

<svelte:head>
	<title>Signal — type and colour specimen</title>
</svelte:head>

<div class="spec">
	<header>
		<p class="brand-label">Mindplex</p>
		<h1>Signal</h1>
		<p class="lede">
			Type and colour specimen. Michroma carries the brand at small sizes. Archivo Variable carries
			everything else, using its width axis to echo Michroma's geometry.
		</p>
	</header>

	<section>
		<p class="brand-label">Channels</p>
		<p class="note">
			Four editorial desks. All four are tuned to identical relative luminance (0.470), so each
			contrasts 9.19:1 against the page and no channel reads louder than another. AA for small text,
			AAA for large.
		</p>
		<div class="channel-grid">
			{#each channels as c}
				<div class="channel">
					<div class="swatch" style="background:{c.hex}"></div>
					<p class="brand-label" style="color:{c.hex}">{c.name}</p>
					<p class="mono">{c.hex} · 9.19:1</p>
					<p class="note small">{c.topics}</p>
					<div class="chip-row">
						<span class="chip" style="color:{c.hex}; border-color:{c.hex}44">Topic label</span>
						<span class="chip solid" style="background:{c.hex}">On fill</span>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section>
		<p class="brand-label">Surfaces</p>
		<div class="surface-row">
			{#each surfaces as s}
				<div class="surface-cell">
					<div class="swatch flat" style="background:{s.hex}"></div>
					<p class="mono">{s.name}</p>
					<p class="mono faint">{s.hex}</p>
				</div>
			{/each}
		</div>
	</section>

	<section>
		<p class="brand-label">Michroma — brand utility only</p>
		<p class="note">
			One weight, very wide advances. Wrong for headlines, right for the wordmark, channel labels
			and section markers at 11 to 13px, uppercase, 0.12em tracking.
		</p>
		<div class="michroma-demo">
			<p class="mich lg">MINDPLEX</p>
			<div class="mich-labels">
				<span class="brand-label" style="color:#22D07F">Intelligence</span>
				<span class="brand-label" style="color:#87B9FC">Cosmos</span>
				<span class="brand-label" style="color:#F598D9">Mind</span>
				<span class="brand-label" style="color:#EAAB3F">Commons</span>
			</div>
			<p class="mich bad">Michroma set as a headline is unusable</p>
			<p class="note small faint">Above: what we are not doing.</p>
		</div>
	</section>

	<section>
		<p class="brand-label">Archivo Variable — display and body</p>
		<div class="scale">
			{#each scale as s}
				<div class="scale-row">
					<p class="mono faint">
						{s.role}<br />{s.size} · wdth {s.wdth} · wght {s.wght}
					</p>
					<p
						class="sample"
						style="font-size:{s.size}; font-variation-settings:'wdth' {s.wdth},'wght' {s
							.wght}; letter-spacing:{s.track}; line-height:{s.lead}"
					>
						Make sense of what comes next
					</p>
				</div>
			{/each}
		</div>
	</section>

	<section>
		<p class="brand-label">In situ</p>
		<div class="situ">
			<div class="situ-copy">
				<p class="brand-label" style="color:#22D07F">Intelligence</p>
				<h2>Make sense of what comes next.</h2>
				<p class="deck">
					Independent media, community intelligence, and emerging AI tools for people tracking the
					future.
				</p>
				<div class="actions">
					<a class="btn primary" href="/specimen">Open Mindplex</a>
					<a class="btn ghost" href="/specimen">Read the magazine</a>
				</div>
			</div>
			<div class="situ-band">
				{#each channels as c}
					<div class="band-cell" style="--ch:{c.hex}">
						<span class="brand-label" style="color:{c.hex}">{c.name}</span>
						<p>The four desks, one page. Hover a channel.</p>
					</div>
				{/each}
			</div>
		</div>
	</section>
</div>

<style>
	@font-face {
		font-family: 'Archivo';
		src: url('/fonts/archivo-var-latin.woff2') format('woff2-variations');
		font-weight: 100 900;
		font-stretch: 62% 125%;
		font-display: swap;
	}

	@font-face {
		font-family: 'Michroma';
		src: url('/fonts/michroma-latin.woff2') format('woff2');
		font-weight: 400;
		font-display: swap;
	}

	.spec {
		--page: #121317;
		--surface: #191b20;
		--ink: #edf0f3;
		--ink-muted: #a8adb5;
		--ink-faint: #747a84;
		--line: rgba(237, 240, 243, 0.13);
		width: min(100% - 3rem, 72rem);
		margin-inline: auto;
		padding-block: 4rem 8rem;
		color: var(--ink);
		font-family: 'Archivo', system-ui, sans-serif;
		font-variation-settings: 'wdth' 100, 'wght' 400;
	}

	section {
		padding-block: 3.5rem;
		border-top: 1px solid var(--line);
	}

	header {
		padding-bottom: 1rem;
	}

	h1 {
		margin: 0.75rem 0 0;
		font-size: clamp(3.5rem, 9vw, 7rem);
		font-variation-settings: 'wdth' 112, 'wght' 620;
		letter-spacing: -0.045em;
		line-height: 0.94;
	}

	h2 {
		margin: 0.9rem 0 0;
		max-width: 14ch;
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-variation-settings: 'wdth' 108, 'wght' 620;
		letter-spacing: -0.04em;
		line-height: 0.98;
	}

	.brand-label {
		margin: 0;
		color: var(--ink-faint);
		font-family: 'Michroma', sans-serif;
		font-size: 0.6875rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.lede,
	.note,
	.deck {
		max-width: 58ch;
		margin: 1rem 0 0;
		color: var(--ink-muted);
		line-height: 1.65;
	}

	.deck {
		max-width: 42ch;
		font-size: 1.1875rem;
	}

	.note.small {
		font-size: 0.8125rem;
	}

	.faint {
		color: var(--ink-faint);
	}

	.mono {
		margin: 0.4rem 0 0;
		font-size: 0.75rem;
		font-variant-numeric: tabular-nums;
		letter-spacing: 0.01em;
	}

	.channel-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
		gap: 2rem;
		margin-top: 2.5rem;
	}

	.swatch {
		height: 5.5rem;
		border-radius: 0.75rem;
		margin-bottom: 1rem;
	}

	.swatch.flat {
		height: 3.5rem;
		border: 1px solid var(--line);
	}

	.chip-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.chip {
		padding: 0.3rem 0.6rem;
		border: 1px solid;
		border-radius: 0.5rem;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.chip.solid {
		border-color: transparent;
		color: #0b1410;
	}

	.surface-row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
		gap: 1.25rem;
		margin-top: 2.5rem;
	}

	.michroma-demo {
		margin-top: 2.5rem;
	}

	.mich {
		margin: 0;
		font-family: 'Michroma', sans-serif;
	}

	.mich.lg {
		font-size: 2rem;
		letter-spacing: 0.06em;
	}

	.mich.bad {
		margin-top: 2.5rem;
		color: var(--ink-faint);
		font-size: 2.4rem;
		line-height: 1.25;
	}

	.mich-labels {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
		margin-top: 2rem;
	}

	.scale {
		margin-top: 2.5rem;
	}

	.scale-row {
		display: grid;
		grid-template-columns: 11rem minmax(0, 1fr);
		align-items: baseline;
		gap: 2rem;
		padding-block: 1.6rem;
		border-bottom: 1px solid var(--line);
	}

	.sample {
		margin: 0;
		font-family: 'Archivo', sans-serif;
	}

	.situ {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: 3rem;
		align-items: center;
		margin-top: 2.5rem;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 2rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		min-height: 3rem;
		padding: 0.8rem 1.15rem;
		border: 1px solid transparent;
		border-radius: 0.625rem;
		font-size: 0.9rem;
		font-weight: 650;
		text-decoration: none;
		transition: transform 140ms cubic-bezier(0.23, 1, 0.32, 1);
	}

	.btn:active {
		transform: scale(0.97);
	}

	.btn.primary {
		background: #22d07f;
		color: #0b1410;
	}

	.btn.ghost {
		border-color: rgba(237, 240, 243, 0.24);
		color: var(--ink);
	}

	.situ-band {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		border: 1px solid var(--line);
		border-radius: 0.75rem;
		overflow: hidden;
	}

	.band-cell {
		padding: 1.5rem 1rem;
		min-height: 15rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-right: 1px solid var(--line);
		background: linear-gradient(to top, color-mix(in srgb, var(--ch) 10%, transparent), transparent);
		transition: background 240ms ease;
	}

	.band-cell:last-child {
		border-right: 0;
	}

	.band-cell p {
		margin: 0;
		color: var(--ink-muted);
		font-size: 0.8125rem;
		line-height: 1.5;
	}

	@media (hover: hover) and (pointer: fine) {
		.band-cell:hover {
			background: linear-gradient(
				to top,
				color-mix(in srgb, var(--ch) 26%, transparent),
				transparent
			);
		}
	}

	@media (max-width: 52rem) {
		.scale-row,
		.situ {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.situ-band {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
