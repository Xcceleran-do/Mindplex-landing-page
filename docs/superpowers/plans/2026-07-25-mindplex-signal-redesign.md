# Mindplex Signal Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the visual language of the Mindplex marketing site with the Signal direction, keeping all positioning, information architecture, routes and API contracts intact.

**Architecture:** A CSS custom-property token layer in `src/app.css` is the single styling source for every route. Channel metadata (desk names, hues, topic links) lives in one TypeScript module that both the components and the token-consistency tests read, so colour values cannot drift between TS and CSS. Sections are plain Svelte 5 components with scoped styles; shared primitives (buttons, labels, type scale, graded media) are global classes in `app.css`. Motion is an `IntersectionObserver` Svelte action with CSS scroll-driven animation as progressive enhancement.

**Tech Stack:** SvelteKit 2 / Svelte 5 (runes), Tailwind CSS v4 (utilities only; design tokens are hand-authored CSS custom properties), TypeScript, Vitest (browser + node projects), Playwright, `@lucide/svelte`, self-hosted WOFF2.

## Global Constraints

Every task's requirements implicitly include this section. Values are copied verbatim from the spec.

- **Branch:** all work happens on `redesign/signal`.
- **Channel hues, exact:** `--ch-intelligence: #22D07F`, `--ch-cosmos: #87B9FC`, `--ch-mind: #F598D9`, `--ch-commons: #EAAB3F`. Each must measure 9.19:1 (± 0.02) against `#121317`.
- **Single accent:** `--accent` is `--ch-intelligence`. Every button, link hover, focus ring and inline link on every route uses `--accent`. No blue CTAs, no magenta buttons. Channel hues appear only as semantic category marks.
- **Channel surface cap:** a channel hue never exceeds a label, a 1px rule, a small chip, or a gradient at 26% opacity.
- **Surfaces, exact:** `--page: #121317`, `--surface: #191B20`, `--surface-strong: #202329`, `--ink: #EDF0F3`, `--ink-muted: #A8ADB5`, `--ink-faint: #747A84`, `--line: rgba(237, 240, 243, 0.13)`, `--line-strong: rgba(237, 240, 243, 0.24)`, `--on-accent: #0B1410`.
- **Radii:** exactly two values, `--radius-control: 0.625rem` and `--radius-media: 0.75rem`. No pills, no sharp corners.
- **Easing:** `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`.
- **Michroma** is used only for the wordmark, channel and desk labels, section markers and eyebrows. Always uppercase, `0.10em` to `0.14em` tracking, 11px to 13px, except the wordmark which may reach 2rem. Never a headline, paragraph, button label, or any string over three words.
- **Archivo** carries all display and body type, using its `wdth` axis.
- **CTA vocabulary, one label per intent, sitewide:** `Open Mindplex` (enter platform), `Sign in` (authenticate), `Start writing` (contribute), `Read the magazine` (browse editorial). The strings `Enter Mindplex`, `Explore the magazine`, `Browse the latest stories`, `Contribute to Mindplex`, `Meet the community` and `See what is inside` are retired and must not appear.
- **Display headline budget:** at most three Display XL/L moments on the homepage (hero, manifesto, final CTA). The footer gets none.
- **Zero em-dashes (`—`) and zero en-dashes (`–`)** in any user-visible string on any route.
- **`Al` is never used where `AI` is meant** anywhere in the tree.
- **Only `transform` and `opacity` are animated.** No `padding`, `width`, `height`, `top` or `left` transitions.
- **Preserved without change:** route slugs, anchor IDs `#why` `#inside` `#trust` `#community`, all `beta.mindplex.ai` outbound links, the Mindplex mark asset, and the load functions in `src/routes/blog/+page.server.ts`, `src/routes/blog/[slug]/+page.server.ts` and `src/routes/roadmap/[quarter]/+layout.server.ts`.
- **Accessibility floor:** WCAG AA contrast for all text and controls; every form control has a label above the field; visible focus ring at 2px offset 4px; `prefers-reduced-motion`, `prefers-reduced-transparency` and `prefers-contrast` all honoured.
- **Commands:** `pnpm check` and `pnpm lint` must pass before each commit. Unit tests run with `pnpm test:unit --run`, e2e with `pnpm test:e2e`.

---

## File Structure

**Created**

| Path | Responsibility |
| --- | --- |
| `src/lib/design/channels.ts` | Single source of truth for the four desks: id, label, hex, topic href. Read by components and by the token-consistency test. |
| `src/lib/design/contrast.ts` | `relativeLuminance` and `contrastRatio` pure functions. |
| `src/lib/design/contrast.spec.ts` | Asserts every channel hits 9.19:1 on `--page` and that all four share one luminance. |
| `src/lib/design/tokens.spec.ts` | Parses `src/app.css` and asserts its channel custom properties match `channels.ts`. |
| `src/lib/design/copy-guard.spec.ts` | Scans `src/**/*.svelte` for em-dashes, en-dashes, `Al`, and retired CTA strings. |
| `src/lib/actions/reveal.ts` | `IntersectionObserver` Svelte action that adds `data-revealed` on entry. |
| `src/lib/components/ChannelBand/ChannelBand.svelte` | The hero signature: four desk cells with hover and scroll activation. |
| `src/lib/components/ChannelBand/index.ts` | Barrel export. |
| `src/lib/components/Byline/Byline.svelte` | The reputation device used in the trust section. |
| `src/lib/components/Byline/index.ts` | Barrel export. |
| `src/lib/section/Hero.svelte` | Homepage hero. |
| `src/lib/section/Manifesto.svelte` | Full-width statement. |
| `src/lib/section/EntryModes.svelte` | Three parallel entry panels. |
| `src/lib/section/Stories.svelte` | Editorial grid. |
| `src/lib/section/Trust.svelte` | Trust and reputation. |
| `src/lib/section/Workflow.svelte` | Find / Filter / Shape / Publish. |
| `src/lib/section/Destinations.svelte` | Beta route index. |
| `src/lib/section/FinalCta.svelte` | Closing statement. |
| `e2e/signal.test.ts` | Cross-route checks: single-line nav, CTA vocabulary, focus ring, reduced motion. |

**Modified**

| Path | Change |
| --- | --- |
| `src/app.css` | Replace the whole stylesheet with the token layer plus shared primitives. Per-section CSS moves into components. |
| `src/app.html` | Add font preloads. |
| `src/routes/+page.svelte` | Becomes composition only; markup moves to section components. |
| `src/lib/section/Navbar.svelte` | Michroma wordmark, scroll-edge mask, CTA vocabulary. |
| `src/lib/section/Footer.svelte` | Remove the display headline; Michroma column headings. |
| `src/routes/blog/+page.svelte` | Rebuild; add labelled search, empty state. |
| `src/routes/blog/+page.server.ts` | Return an error shape instead of throwing, so the page can render an error state. |
| `src/lib/components/BlogCard/BlogCard.svelte` | Rebuild on tokens; graded media; lucide icons. |
| `src/routes/blog/[slug]/+page.svelte` | Prose system; fix link contrast; reserve embed space. |
| `src/routes/campaign/+page.svelte` | Prose system. |
| `src/routes/roadmap/[quarter]/+page.svelte` | Canonical channels; remove neon glows; use the type scale. |
| `src/routes/specimen/+page.svelte` | Delete once Task 3 lands; it was a decision aid. |

---

# Phase 1: Foundation

### Task 1: Self-hosted fonts

The WOFF2 files are already committed at `static/fonts/`. This task wires them up and proves they load with the correct variable axes.

**Files:**
- Modify: `src/app.css` (add `@font-face` blocks at the top, after the `@import`)
- Modify: `src/app.html:5-6`
- Test: `e2e/signal.test.ts` (create)

**Interfaces:**
- Consumes: nothing.
- Produces: font families `'Archivo'` (`font-weight: 100 900`, `font-stretch: 62% 125%`) and `'Michroma'` (`font-weight: 400`), available to every later task.

- [ ] **Step 1: Write the failing test**

Create `e2e/signal.test.ts`:

```ts
import { expect, test } from '@playwright/test';

test('Archivo variable font loads with weight and width axes', async ({ page }) => {
	await page.goto('/');
	await page.evaluate(() => document.fonts.ready);

	const loaded = await page.evaluate(() =>
		[...document.fonts].map((f) => `${f.family}|${f.weight}|${f.stretch}|${f.status}`)
	);

	expect(loaded).toContain('Archivo|100 900|62% 125%|loaded');
	expect(loaded).toContain('Michroma|400|normal|loaded');
});

test('body text renders in Archivo, not a system fallback', async ({ page }) => {
	await page.goto('/');
	await page.evaluate(() => document.fonts.ready);

	const family = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
	expect(family).toContain('Archivo');
	expect(family).not.toContain('-apple-system');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:e2e --grep "font"`
Expected: FAIL. The first test fails because no `@font-face` is declared; the second fails because `body` currently sets `font-family: -apple-system, ...`.

- [ ] **Step 3: Add the `@font-face` declarations**

In `src/app.css`, immediately after the existing `@import 'tailwindcss';` / `@plugin` / `@custom-variant` lines and before `:root`, insert:

```css
@font-face {
	font-family: 'Archivo';
	src: url('/fonts/archivo-var-latin.woff2') format('woff2-variations');
	font-weight: 100 900;
	font-stretch: 62% 125%;
	font-display: swap;
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
		U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
		U+FEFF, U+FFFD;
}

@font-face {
	font-family: 'Archivo';
	src: url('/fonts/archivo-var-latin-ext.woff2') format('woff2-variations');
	font-weight: 100 900;
	font-stretch: 62% 125%;
	font-display: swap;
	unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304,
		U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0,
		U+2113, U+2C60-2C7F, U+A720-A7FF;
}

@font-face {
	font-family: 'Michroma';
	src: url('/fonts/michroma-latin.woff2') format('woff2');
	font-weight: 400;
	font-display: swap;
}
```

- [ ] **Step 4: Point `body` at Archivo**

In `src/app.css`, in the existing `body` rule, replace this line:

```css
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
```

with:

```css
	font-family: 'Archivo', system-ui, sans-serif;
	font-variation-settings: 'wdth' 100, 'wght' 400;
```

- [ ] **Step 5: Preload the two faces**

In `src/app.html`, after the `<meta name="viewport" ...>` line and before `%sveltekit.head%`, insert:

```html
	<link
		rel="preload"
		href="%sveltekit.assets%/fonts/archivo-var-latin.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="%sveltekit.assets%/fonts/michroma-latin.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
```

- [ ] **Step 6: Run test to verify it passes**

Run: `pnpm test:e2e --grep "font"`
Expected: PASS, 2 passed.

- [ ] **Step 7: Commit**

```bash
git add src/app.css src/app.html e2e/signal.test.ts
git commit -m "feat(type): self-host Archivo Variable and Michroma"
```

---

### Task 2: Channel token system

**Files:**
- Create: `src/lib/design/channels.ts`
- Create: `src/lib/design/contrast.ts`
- Create: `src/lib/design/contrast.spec.ts`
- Create: `src/lib/design/tokens.spec.ts`
- Modify: `src/app.css` (`:root` block)

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `type ChannelId = 'intelligence' | 'cosmos' | 'mind' | 'commons'`
  - `interface Channel { id: ChannelId; label: string; hex: string; cssVar: string; topicHref: string }`
  - `const channels: readonly Channel[]` (length 4, in the order intelligence, cosmos, mind, commons)
  - `relativeLuminance(hex: string): number`
  - `contrastRatio(a: string, b: string): number`
  - CSS custom properties `--ch-intelligence`, `--ch-cosmos`, `--ch-mind`, `--ch-commons`, `--accent`, `--on-accent`, plus the surface, radius and easing tokens listed in Global Constraints.

- [ ] **Step 1: Write the failing contrast test**

Create `src/lib/design/contrast.spec.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { contrastRatio, relativeLuminance } from './contrast';
import { channels } from './channels';

const PAGE = '#121317';

describe('contrast utilities', () => {
	it('computes a known ratio', () => {
		expect(contrastRatio('#FFFFFF', '#000000')).toBeCloseTo(21, 1);
	});
});

describe('channel palette', () => {
	it('has exactly four channels in a fixed order', () => {
		expect(channels.map((c) => c.id)).toEqual(['intelligence', 'cosmos', 'mind', 'commons']);
	});

	it('gives every channel 9.19:1 against the page surface', () => {
		for (const channel of channels) {
			expect(contrastRatio(channel.hex, PAGE)).toBeCloseTo(9.19, 1);
		}
	});

	it('holds every channel at the same relative luminance, so none reads louder', () => {
		const luminances = channels.map((c) => relativeLuminance(c.hex));
		const spread = Math.max(...luminances) - Math.min(...luminances);
		expect(spread).toBeLessThan(0.005);
	});

	it('keeps every channel legible as small text at WCAG AA', () => {
		for (const channel of channels) {
			expect(contrastRatio(channel.hex, PAGE)).toBeGreaterThanOrEqual(4.5);
		}
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:unit --run src/lib/design/contrast.spec.ts`
Expected: FAIL with "Failed to resolve import ./contrast".

- [ ] **Step 3: Write the contrast utility**

Create `src/lib/design/contrast.ts`:

```ts
function channelLuminance(value: number): number {
	const c = value / 255;
	return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function parseHex(hex: string): [number, number, number] {
	const clean = hex.replace('#', '');
	if (clean.length !== 6) {
		throw new Error(`Expected a 6-digit hex colour, received "${hex}"`);
	}
	return [
		parseInt(clean.slice(0, 2), 16),
		parseInt(clean.slice(2, 4), 16),
		parseInt(clean.slice(4, 6), 16)
	];
}

/** WCAG 2.1 relative luminance, 0 for black and 1 for white. */
export function relativeLuminance(hex: string): number {
	const [r, g, b] = parseHex(hex);
	return (
		0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b)
	);
}

/** WCAG 2.1 contrast ratio, from 1 (identical) to 21 (black on white). */
export function contrastRatio(a: string, b: string): number {
	const la = relativeLuminance(a);
	const lb = relativeLuminance(b);
	const lighter = Math.max(la, lb);
	const darker = Math.min(la, lb);
	return (lighter + 0.05) / (darker + 0.05);
}
```

- [ ] **Step 4: Write the channel module**

Create `src/lib/design/channels.ts`:

```ts
const platformUrl = 'https://beta.mindplex.ai';

export type ChannelId = 'intelligence' | 'cosmos' | 'mind' | 'commons';

export interface Channel {
	id: ChannelId;
	/** Desk name shown in Michroma. Editorial sign-off pending; rename here only. */
	label: string;
	hex: string;
	cssVar: string;
	/** A real topic route in the beta product. Desks never introduce new URLs. */
	topicHref: string;
}

export const channels: readonly Channel[] = [
	{
		id: 'intelligence',
		label: 'Intelligence',
		hex: '#22D07F',
		cssVar: '--ch-intelligence',
		topicHref: `${platformUrl}/topics/ai`
	},
	{
		id: 'cosmos',
		label: 'Cosmos',
		hex: '#87B9FC',
		cssVar: '--ch-cosmos',
		topicHref: `${platformUrl}/topics/space`
	},
	{
		id: 'mind',
		label: 'Mind',
		hex: '#F598D9',
		cssVar: '--ch-mind',
		topicHref: `${platformUrl}/topics/consciousness`
	},
	{
		id: 'commons',
		label: 'Commons',
		hex: '#EAAB3F',
		cssVar: '--ch-commons',
		topicHref: `${platformUrl}/topics/blockchain`
	}
] as const;

export function channelById(id: ChannelId): Channel {
	const found = channels.find((c) => c.id === id);
	if (!found) throw new Error(`Unknown channel "${id}"`);
	return found;
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm test:unit --run src/lib/design/contrast.spec.ts`
Expected: PASS, 5 passed.

- [ ] **Step 6: Write the failing token-consistency test**

This is the test that stops CSS and TypeScript drifting apart.

Create `src/lib/design/tokens.spec.ts`:

```ts
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { channels } from './channels';

const css = readFileSync('src/app.css', 'utf8');

function readToken(name: string): string {
	const match = css.match(new RegExp(`${name}\\s*:\\s*([^;]+);`));
	if (!match) throw new Error(`Token ${name} is not declared in src/app.css`);
	return match[1].trim();
}

describe('app.css tokens', () => {
	it('declares every channel with the hex from channels.ts', () => {
		for (const channel of channels) {
			expect(readToken(channel.cssVar).toUpperCase()).toBe(channel.hex.toUpperCase());
		}
	});

	it('points the single accent at the Intelligence channel', () => {
		expect(readToken('--accent')).toBe('var(--ch-intelligence)');
	});

	it('declares the surface scale', () => {
		expect(readToken('--page').toUpperCase()).toBe('#121317');
		expect(readToken('--surface').toUpperCase()).toBe('#191B20');
		expect(readToken('--ink').toUpperCase()).toBe('#EDF0F3');
		expect(readToken('--on-accent').toUpperCase()).toBe('#0B1410');
	});

	it('declares exactly two radius tokens, so the shape system cannot fragment', () => {
		const radii = css.match(/--radius-[a-z]+\s*:/g) ?? [];
		expect(radii.sort()).toEqual(['--radius-control:', '--radius-media:']);
	});
});
```

- [ ] **Step 7: Run test to verify it fails**

Run: `pnpm test:unit --run src/lib/design/tokens.spec.ts`
Expected: FAIL with "Token --ch-intelligence is not declared in src/app.css".

- [ ] **Step 8: Replace the `:root` block in `src/app.css`**

Delete the entire existing `:root { ... }` block and the entire `@theme inline { ... }` block, and replace both with:

```css
:root {
	color-scheme: dark;

	/* Surfaces */
	--page: #121317;
	--surface: #191B20;
	--surface-strong: #202329;

	/* Ink */
	--ink: #EDF0F3;
	--ink-muted: #A8ADB5;
	--ink-faint: #747A84;

	/* Hairlines */
	--line: rgba(237, 240, 243, 0.13);
	--line-strong: rgba(237, 240, 243, 0.24);

	/* Editorial channels. Semantic category marks only, never interaction. */
	--ch-intelligence: #22D07F;
	--ch-cosmos: #87B9FC;
	--ch-mind: #F598D9;
	--ch-commons: #EAAB3F;

	/* The one interactive accent, used sitewide. */
	--accent: var(--ch-intelligence);
	--on-accent: #0B1410;

	/* Shape */
	--radius-control: 0.625rem;
	--radius-media: 0.75rem;

	/* Motion */
	--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
	--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
}
```

Then remove the now-dangling `* { border-color: hsl(var(--border)); }` rule and replace it with:

```css
* {
	box-sizing: border-box;
	border-color: var(--line);
}
```

- [ ] **Step 9: Run tests to verify they pass**

Run: `pnpm test:unit --run src/lib/design/`
Expected: PASS, 9 passed across two files.

- [ ] **Step 10: Verify the app still builds**

Run: `pnpm check`
Expected: 0 errors. If `svelte-check` reports unresolved `hsl(var(--primary))` usages in `src/routes/blog/+page.svelte` or `src/lib/components/BlogCard/BlogCard.svelte`, that is expected. Those files are rebuilt in Phase 4 and their Tailwind classes still resolve because Tailwind's own default palette is unaffected. Do not fix them here.

- [ ] **Step 11: Commit**

```bash
git add src/lib/design src/app.css
git commit -m "feat(tokens): canonical channel palette with contrast and drift tests"
```

---

### Task 3: Type scale and shared primitives

**Files:**
- Modify: `src/app.css`
- Delete: `src/routes/specimen/+page.svelte`

**Interfaces:**
- Consumes: fonts from Task 1, tokens from Task 2.
- Produces global classes used by every later task:
  - `.display-xl`, `.display-l`, `.display-m`, `.heading`, `.body-l`, `.body`, `.caption`
  - `.label` (Michroma)
  - `.button`, `.button-primary`, `.button-secondary`, `.button-compact`
  - `.inline-link`
  - `.page-shell` (layout container)
  - `.media` (graded editorial image wrapper)

- [ ] **Step 1: Add the type scale**

Append to `src/app.css`, after the `body` rule:

```css
/* ---- Type scale ------------------------------------------------------- */
/* Tracking is size-specific: display tightens as it grows, body sits at 0. */

.display-xl,
.display-l,
.display-m,
.heading {
	margin: 0;
	text-wrap: balance;
	/* Descender clearance for y g j p q at tight leading. */
	padding-bottom: 0.08em;
}

.display-xl {
	font-size: clamp(3.25rem, 6.5vw, 5.5rem);
	font-variation-settings: 'wdth' 112, 'wght' 620;
	letter-spacing: -0.045em;
	line-height: 1;
}

.display-l {
	font-size: clamp(2.25rem, 4vw, 3.5rem);
	font-variation-settings: 'wdth' 108, 'wght' 620;
	letter-spacing: -0.038em;
	line-height: 1.02;
}

.display-m {
	font-size: clamp(1.75rem, 2.6vw, 2.25rem);
	font-variation-settings: 'wdth' 104, 'wght' 640;
	letter-spacing: -0.028em;
	line-height: 1.06;
}

.heading {
	font-size: 1.375rem;
	font-variation-settings: 'wdth' 100, 'wght' 650;
	letter-spacing: -0.015em;
	line-height: 1.2;
}

.body-l {
	margin: 0;
	max-width: 42ch;
	color: var(--ink-muted);
	font-size: 1.1875rem;
	line-height: 1.6;
}

.body {
	margin: 0;
	max-width: 65ch;
	color: var(--ink-muted);
	font-size: 1rem;
	line-height: 1.65;
}

.caption {
	margin: 0;
	color: var(--ink-faint);
	font-size: 0.8125rem;
	font-variation-settings: 'wdth' 100, 'wght' 500;
	font-variant-numeric: tabular-nums;
	letter-spacing: 0.004em;
	line-height: 1.5;
}

/* Michroma. Brand utility only: wordmark, desk labels, section markers. */
.label {
	margin: 0;
	color: var(--ink-faint);
	font-family: 'Michroma', sans-serif;
	font-size: 0.6875rem;
	letter-spacing: 0.12em;
	line-height: 1.3;
	text-transform: uppercase;
}
```

- [ ] **Step 2: Replace the button and link primitives**

The existing `.button`, `.button-primary`, `.button-secondary`, `.button-compact` and `.inline-link` rules in `src/app.css` reference the removed `--mint` and `--primary-foreground` tokens. Replace those five rule blocks with:

```css
/* ---- Controls --------------------------------------------------------- */

.button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 0.55rem;
	min-height: 3rem;
	padding: 0.8rem 1.15rem;
	border: 1px solid transparent;
	border-radius: var(--radius-control);
	font-size: 0.9rem;
	font-variation-settings: 'wdth' 100, 'wght' 650;
	letter-spacing: -0.01em;
	white-space: nowrap;
	cursor: pointer;
	transition:
		transform 140ms var(--ease-out),
		background-color 160ms ease,
		border-color 160ms ease,
		color 160ms ease;
}

.button:active {
	transform: scale(0.97);
}

.button-primary {
	background: var(--accent);
	color: var(--on-accent);
}

.button-secondary {
	border-color: var(--line-strong);
	background: rgba(237, 240, 243, 0.03);
	color: var(--ink);
}

.button-compact {
	min-height: 2.45rem;
	padding: 0.58rem 0.9rem;
}

.inline-link {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	width: fit-content;
	color: var(--ink);
	font-size: 0.875rem;
	font-variation-settings: 'wdth' 100, 'wght' 650;
	text-decoration: underline;
	text-decoration-color: var(--line-strong);
	text-underline-offset: 0.35rem;
	transition:
		color 160ms ease,
		text-decoration-color 160ms ease;
}

@media (hover: hover) and (pointer: fine) {
	.button-primary:hover {
		background: color-mix(in srgb, var(--accent) 88%, white);
	}

	.button-secondary:hover {
		border-color: var(--accent);
		background: color-mix(in srgb, var(--accent) 8%, transparent);
	}

	.inline-link:hover {
		color: var(--accent);
		text-decoration-color: var(--accent);
	}
}
```

- [ ] **Step 3: Add the graded media primitive**

This is the treatment that makes every editorial image read as one publication. Append to `src/app.css`:

```css
/* ---- Graded editorial media ------------------------------------------- */
/*
 * Photographs are never recoloured, so reporting keeps its integrity.
 * Cohesion comes from two things only: a saturation ceiling so no image
 * out-shouts the channel hues, and a black point lifted to meet --page so
 * images sit on the surface instead of punching a hole in it. The channel
 * tint lands on the frame, never on the photograph.
 */

.media {
	position: relative;
	overflow: hidden;
	border-radius: var(--radius-media);
	background: var(--surface);
	isolation: isolate;
}

.media img {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
	filter: saturate(0.88);
	transition: transform 500ms var(--ease-out);
}

/* Lifts anything darker than the page surface up to it. */
.media::before {
	position: absolute;
	inset: 0;
	z-index: 1;
	background: var(--page);
	mix-blend-mode: lighten;
	opacity: 0.55;
	content: '';
	pointer-events: none;
}

/* Channel tint on the frame only. */
.media::after {
	position: absolute;
	inset: 0;
	z-index: 2;
	border-radius: inherit;
	box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--ch, var(--ink)) 26%, transparent);
	content: '';
	pointer-events: none;
}

@media (hover: hover) and (pointer: fine) {
	a:hover > .media img,
	a.media:hover img {
		transform: scale(1.018);
	}
}
```

- [ ] **Step 4: Update the focus ring and selection to the accent token**

In `src/app.css`, replace the `::selection`, `:focus-visible` and `.skip-link` rules with:

```css
::selection {
	background: var(--accent);
	color: var(--on-accent);
}

:focus-visible {
	outline: 2px solid var(--accent);
	outline-offset: 4px;
}

.skip-link {
	position: fixed;
	top: 0.75rem;
	left: 0.75rem;
	z-index: 100;
	padding: 0.7rem 1rem;
	border-radius: var(--radius-control);
	background: var(--accent);
	color: var(--on-accent);
	font-variation-settings: 'wdth' 100, 'wght' 700;
	transform: translateY(-180%);
	transition: transform 160ms var(--ease-out);
}

.skip-link:focus {
	transform: translateY(0);
}
```

- [ ] **Step 5: Delete the specimen route**

It was a decision aid and is now superseded by the real pages.

```bash
rm -rf src/routes/specimen
```

- [ ] **Step 6: Verify**

Run: `pnpm check && pnpm lint`
Expected: 0 errors, 0 warnings.

Then open `http://localhost:5199` in the Browser pane and confirm the homepage still renders with Archivo type and the green accent, even though sections have not been rebuilt yet. Layout will be rough at this point; that is expected.

- [ ] **Step 7: Commit**

```bash
git add -A src/app.css src/routes
git commit -m "feat(tokens): type scale, control primitives and graded media"
```

---

### Task 4: Copy guard

A test that mechanically enforces the copy rules from Global Constraints across every route, so they cannot regress as sections are rebuilt.

**Files:**
- Create: `src/lib/design/copy-guard.spec.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: nothing consumed by later tasks. This is a standing guard.

- [ ] **Step 1: Write the test**

Create `src/lib/design/copy-guard.spec.ts`:

```ts
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

function svelteFiles(dir: string, found: string[] = []): string[] {
	for (const entry of readdirSync(dir)) {
		const path = join(dir, entry);
		if (statSync(path).isDirectory()) svelteFiles(path, found);
		else if (path.endsWith('.svelte')) found.push(path);
	}
	return found;
}

const files = svelteFiles('src').map((path) => ({ path, source: readFileSync(path, 'utf8') }));

const RETIRED_CTAS = [
	'Enter Mindplex',
	'Explore the magazine',
	'Browse the latest stories',
	'Contribute to Mindplex',
	'Meet the community',
	'See what is inside'
];

describe('copy guard', () => {
	it('finds Svelte files to check', () => {
		expect(files.length).toBeGreaterThan(5);
	});

	it('contains no em-dashes or en-dashes', () => {
		const offenders = files
			.filter((f) => /[–—]/.test(f.source))
			.map((f) => f.path);
		expect(offenders).toEqual([]);
	});

	it('never writes Al where AI is meant', () => {
		const offenders = files.filter((f) => /\bAl\b/.test(f.source)).map((f) => f.path);
		expect(offenders).toEqual([]);
	});

	it('uses one CTA label per intent', () => {
		const offenders: string[] = [];
		for (const file of files) {
			for (const retired of RETIRED_CTAS) {
				if (file.source.includes(retired)) offenders.push(`${file.path}: "${retired}"`);
			}
		}
		expect(offenders).toEqual([]);
	});

	it('ships no placeholder mathematics or unfinished copy', () => {
		const offenders = files
			.filter((f) => /T = XXX|TODO|TBD|Lorem ipsum/i.test(f.source))
			.map((f) => f.path);
		expect(offenders).toEqual([]);
	});
});
```

- [ ] **Step 2: Run the test**

Run: `pnpm test:unit --run src/lib/design/copy-guard.spec.ts`
Expected: FAIL. The current `src/routes/+page.svelte` contains `Enter Mindplex`, `Explore the magazine`, `Browse the latest stories`, `Contribute to Mindplex`, `Meet the community` and `See what is inside`, and `src/lib/section/Navbar.svelte` is clean. Record the failing list; Phase 3 clears it.

- [ ] **Step 3: Commit the guard as failing**

The guard is deliberately committed red. It is the acceptance criterion for Phase 3, and committing it now means every later task is written against it.

**Consequence for Tasks 5 to 12:** `pnpm test:unit --run` with no path argument will report failures in `copy-guard.spec.ts` until Task 13 replaces the homepage. Those tasks therefore run scoped commands (`pnpm test:unit --run <path>`) as written. Do not "fix" the guard by loosening it, and do not skip it. Task 13 Step 6 is where the whole suite must go green.

```bash
git add src/lib/design/copy-guard.spec.ts
git commit -m "test(copy): guard em-dashes, Al typos and retired CTA labels"
```

---

# Phase 2: Shell

### Task 5: Navbar

**Files:**
- Modify: `src/lib/section/Navbar.svelte`
- Modify: `src/app.css` (move header styles out; see step 3)
- Test: `src/lib/section/Navbar.svelte.test.ts` (create)

**Interfaces:**
- Consumes: `.label`, `.button`, `.button-primary`, `.button-compact` from Task 3.
- Produces: a 65px sticky header consumed by `src/routes/+layout.svelte` unchanged.

- [ ] **Step 1: Write the failing test**

Create `src/lib/section/Navbar.svelte.test.ts`:

```ts
import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Navbar from './Navbar.svelte';

describe('Navbar', () => {
	it('exposes the primary platform CTA with the canonical label', async () => {
		render(Navbar);
		const cta = page.getByRole('link', { name: 'Open Mindplex' });
		await expect.element(cta).toBeInTheDocument();
	});

	it('offers sign in separately from the platform CTA', async () => {
		render(Navbar);
		await expect.element(page.getByRole('link', { name: 'Sign in' })).toBeInTheDocument();
	});

	it('labels the menu button and reports its expanded state', async () => {
		render(Navbar);
		const button = page.getByRole('button', { name: 'Open navigation' });
		await expect.element(button).toHaveAttribute('aria-expanded', 'false');
		await button.click();
		await expect
			.element(page.getByRole('button', { name: 'Close navigation' }))
			.toHaveAttribute('aria-expanded', 'true');
	});

	it('sets the wordmark in Michroma', async () => {
		render(Navbar);
		const wordmark = page.getByText('Mindplex', { exact: true });
		await expect.element(wordmark).toBeInTheDocument();
		const family = getComputedStyle(wordmark.element()).fontFamily;
		expect(family).toContain('Michroma');
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:unit --run src/lib/section/Navbar.svelte.test.ts`
Expected: FAIL on the last test. The wordmark currently renders in Archivo via the `.brand` class, not Michroma.

- [ ] **Step 3: Rewrite `src/lib/section/Navbar.svelte`**

Replace the whole file:

```svelte
<script lang="ts">
	let mobileMenuOpen = $state(false);

	const platformUrl = 'https://beta.mindplex.ai';
	const navigationLinks = [
		{ name: 'Why Mindplex', href: '/#why' },
		{ name: 'Inside', href: '/#inside' },
		{ name: 'Trust', href: '/#trust' },
		{ name: 'Community', href: '/#community' }
	];

	function closeMenu() {
		mobileMenuOpen = false;
	}
</script>

<header class="site-header">
	<nav class="nav-shell" aria-label="Primary navigation">
		<a class="brand" href="/" aria-label="Mindplex home" onclick={closeMenu}>
			<img src="/mindplex-mark.svg" alt="" width="42" height="40" />
			<span class="wordmark">Mindplex</span>
		</a>

		<div class="desktop-links">
			{#each navigationLinks as link}
				<a href={link.href}>{link.name}</a>
			{/each}
		</div>

		<div class="desktop-actions">
			<a class="text-link" href="{platformUrl}/signin">Sign in</a>
			<a class="button button-primary button-compact" href={platformUrl}>
				Open Mindplex
				<span aria-hidden="true">↗</span>
			</a>
		</div>

		<button
			class="menu-button"
			type="button"
			aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
			aria-expanded={mobileMenuOpen}
			aria-controls="mobile-navigation"
			onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
		>
			<span></span>
			<span></span>
		</button>
	</nav>

	{#if mobileMenuOpen}
		<div class="mobile-navigation" id="mobile-navigation">
			<div class="mobile-navigation-inner">
				{#each navigationLinks as link}
					<a href={link.href} onclick={closeMenu}>{link.name}</a>
				{/each}
				<a href="{platformUrl}/signin" onclick={closeMenu}>Sign in</a>
				<a class="button button-primary" href={platformUrl} onclick={closeMenu}>
					Open Mindplex
					<span aria-hidden="true">↗</span>
				</a>
			</div>
		</div>
	{/if}
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 40;
		background: rgba(18, 19, 23, 0.9);
		-webkit-backdrop-filter: blur(20px) saturate(145%);
		backdrop-filter: blur(20px) saturate(145%);
	}

	/*
	 * A scroll edge effect instead of a 1px divider: content fades where it
	 * meets the floating chrome, so the header reads as a material rather
	 * than a bar drawn on top of the page.
	 */
	.site-header::after {
		position: absolute;
		top: 100%;
		right: 0;
		left: 0;
		height: 1.5rem;
		background: linear-gradient(to bottom, rgba(18, 19, 23, 0.72), transparent);
		content: '';
		pointer-events: none;
	}

	.nav-shell {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 2rem;
		width: min(100% - 2rem, 88rem);
		min-height: 4.0625rem;
		margin-inline: auto;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		width: fit-content;
	}

	.brand img {
		width: 2rem;
		height: auto;
	}

	.wordmark {
		font-family: 'Michroma', sans-serif;
		font-size: 0.9375rem;
		letter-spacing: 0.06em;
	}

	.desktop-links {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: clamp(1.25rem, 2.8vw, 2.6rem);
	}

	.desktop-links a,
	.text-link {
		color: var(--ink-muted);
		font-size: 0.87rem;
		font-variation-settings: 'wdth' 100, 'wght' 600;
		transition: color 160ms ease;
	}

	.desktop-actions {
		display: flex;
		align-items: center;
		gap: 1.2rem;
	}

	.menu-button {
		display: none;
		width: 2.75rem;
		height: 2.75rem;
		border: 0;
		border-radius: var(--radius-control);
		background: transparent;
		color: var(--ink);
		cursor: pointer;
	}

	.menu-button span {
		display: block;
		width: 1.25rem;
		height: 1px;
		margin: 0.3rem auto;
		background: currentColor;
	}

	.mobile-navigation {
		position: absolute;
		top: 100%;
		right: 0;
		left: 0;
		border-bottom: 1px solid var(--line);
		background: rgba(18, 19, 23, 0.97);
		transform-origin: top right;
		animation: menu-in 180ms var(--ease-out) both;
	}

	.mobile-navigation-inner {
		display: grid;
		gap: 0;
		width: min(100% - 2rem, 88rem);
		margin-inline: auto;
		padding-block: 1rem 1.25rem;
	}

	.mobile-navigation-inner > a:not(.button) {
		padding: 0.85rem 0;
		border-bottom: 1px solid var(--line);
		color: var(--ink-muted);
		font-size: 1.05rem;
	}

	.mobile-navigation :global(.button) {
		margin-top: 1rem;
	}

	@keyframes menu-in {
		from {
			opacity: 0;
			transform: scale(0.97) translateY(-0.25rem);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	@media (hover: hover) and (pointer: fine) {
		.desktop-links a:hover,
		.text-link:hover {
			color: var(--ink);
		}
	}

	@media (max-width: 68rem) {
		.desktop-links,
		.desktop-actions {
			display: none;
		}

		.nav-shell {
			grid-template-columns: 1fr auto;
		}

		.menu-button {
			display: block;
		}
	}

	@media (prefers-reduced-transparency: reduce) {
		.site-header,
		.mobile-navigation {
			background: var(--page);
			-webkit-backdrop-filter: none;
			backdrop-filter: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.mobile-navigation {
			animation: none;
		}
	}
</style>
```

- [ ] **Step 4: Remove the superseded header rules from `src/app.css`**

Delete these rule blocks, which now live in the component: `.site-header`, `.nav-shell`, `.brand`, `.brand img`, `.desktop-links`, `.desktop-links a, .text-link`, `.desktop-actions`, `.menu-button`, `.menu-button span`, `.mobile-navigation`, `.mobile-navigation-inner`, `.mobile-navigation-inner > a:not(.button)`, `.mobile-navigation .button`, and the `@keyframes menu-in` block.

Keep `.page-shell` and `.footer-shell` in the `width: min(...)` rule, dropping `.nav-shell` and `.mobile-navigation-inner` from its selector list:

```css
.page-shell,
.footer-shell {
	width: min(100% - 2rem, 88rem);
	margin-inline: auto;
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm test:unit --run src/lib/section/Navbar.svelte.test.ts`
Expected: PASS, 4 passed.

- [ ] **Step 6: Verify in the browser**

Open `http://localhost:5199` at 1440px wide. Confirm: the nav sits on one line, the header measures 65px, the wordmark is Michroma, and the scroll edge fades rather than showing a hard 1px rule.

- [ ] **Step 7: Commit**

```bash
git add src/lib/section/Navbar.svelte src/lib/section/Navbar.svelte.test.ts src/app.css
git commit -m "feat(shell): rebuild navbar on Signal tokens with scroll edge"
```

---

### Task 6: Footer

**Files:**
- Modify: `src/lib/section/Footer.svelte`
- Modify: `src/app.css` (remove superseded footer rules)
- Test: `src/lib/section/Footer.svelte.test.ts` (create)

**Interfaces:**
- Consumes: `.label`, `.body`, `.caption` from Task 3.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Write the failing test**

Create `src/lib/section/Footer.svelte.test.ts`:

```ts
import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Footer from './Footer.svelte';

describe('Footer', () => {
	it('carries no display headline, so it does not restate the hero', async () => {
		const { container } = render(Footer);
		expect(container.querySelector('.display-xl, .display-l, .display-m')).toBeNull();
	});

	it('uses label-styled headings for the link columns', async () => {
		const { container } = render(Footer);
		const headings = [...container.querySelectorAll('h2')];
		expect(headings).toHaveLength(3);
		for (const heading of headings) {
			expect(heading.classList.contains('label')).toBe(true);
		}
	});

	it('groups links under three labelled navigations', async () => {
		render(Footer);
		await expect.element(page.getByRole('navigation', { name: 'Explore Mindplex' })).toBeInTheDocument();
		await expect.element(page.getByRole('navigation', { name: 'Mindplex community' })).toBeInTheDocument();
		await expect.element(page.getByRole('navigation', { name: 'Mindplex social channels' })).toBeInTheDocument();
	});

	it('links contribution with the canonical label', async () => {
		render(Footer);
		await expect.element(page.getByRole('link', { name: 'Start writing' })).toBeInTheDocument();
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:unit --run src/lib/section/Footer.svelte.test.ts`
Expected: FAIL. The footer currently renders an `h2` and a link labelled `Contribute`.

- [ ] **Step 3: Rewrite the markup section of `src/lib/section/Footer.svelte`**

In the `<script>` block, change the `communityLinks` array so the contribution entry uses the canonical label:

```ts
	const communityLinks = [
		{ name: 'Community hub', href: `${platformUrl}/community` },
		{ name: 'Start writing', href: `${platformUrl}/contribute` },
		{ name: 'Writers and editors', href: `${platformUrl}/writers` },
		{ name: 'About', href: `${platformUrl}/about` },
		{ name: 'FAQ', href: `${platformUrl}/faq` }
	];
```

Then replace the `<div class="footer-lead">` block, deleting the `<h2>` entirely:

```svelte
		<div class="footer-lead">
			<a class="brand footer-brand" href="/" aria-label="Mindplex home">
				<img src="/mindplex-mark.svg" alt="" width="42" height="40" />
				<span class="wordmark">Mindplex</span>
			</a>
			<p class="body-l">
				Mindplex brings together futurist writing, social discussion, and emerging AI tools for
				people tracking what comes next.
			</p>
		</div>
```

And change the three column headings from `<h3>` to labelled `<h2>` elements carrying the `.label` class, so the heading hierarchy stays valid without a display headline above them:

```svelte
			<div>
				<h2 class="label">Explore</h2>
				<nav aria-label="Explore Mindplex">
					{#each productLinks as link}
						<a href={link.href}>{link.name}</a>
					{/each}
				</nav>
			</div>

			<div>
				<h2 class="label">Community</h2>
				<nav aria-label="Mindplex community">
					{#each communityLinks as link}
						<a href={link.href}>{link.name}</a>
					{/each}
				</nav>
			</div>

			<div>
				<h2 class="label">Follow</h2>
				<nav aria-label="Mindplex social channels">
					{#each socialLinks as link}
						<a href={link.href} target="_blank" rel="noreferrer">{link.name}</a>
					{/each}
				</nav>
			</div>
```

Wrap the copyright paragraph in `.caption`:

```svelte
		<div class="footer-bottom">
			<p class="caption">© {year} Mindplex. All rights reserved.</p>
```

- [ ] **Step 4: Add the component styles**

Append a `<style>` block to `src/lib/section/Footer.svelte`:

```svelte
<style>
	.footer-brand {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		margin-bottom: 1.75rem;
	}

	.footer-brand img {
		width: 2rem;
		height: auto;
	}

	.wordmark {
		font-family: 'Michroma', sans-serif;
		font-size: 0.9375rem;
		letter-spacing: 0.06em;
	}

	.footer-lead {
		max-width: 44rem;
	}
</style>
```

- [ ] **Step 5: Remove superseded footer rules from `src/app.css`**

Delete `.footer-lead`, `.footer-brand`, `.footer-lead h2`, `.footer-lead > p` and the `.footer-columns h3` block. Update the remaining `.footer-columns` rule so the columns sit under the lead rather than pushed to the right:

```css
.footer-columns {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2rem;
	width: min(100%, 45rem);
	margin: 4rem 0 0 auto;
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `pnpm test:unit --run src/lib/section/Footer.svelte.test.ts`
Expected: PASS, 4 passed.

- [ ] **Step 7: Commit**

```bash
git add src/lib/section/Footer.svelte src/lib/section/Footer.svelte.test.ts src/app.css
git commit -m "feat(shell): rebuild footer, drop the duplicated display headline"
```

---

# Phase 3: Homepage

### Task 7: Reveal action

The motion baseline. This exists before any section so every section can adopt it as it is written.

**Files:**
- Create: `src/lib/actions/reveal.ts`
- Modify: `src/app.css`

**Interfaces:**
- Consumes: nothing.
- Produces: `reveal` Svelte action, applied as `use:reveal`. Sets `data-revealed="true"` on the node once it enters the viewport. Under `prefers-reduced-motion: reduce` it sets the attribute immediately and never observes.

- [ ] **Step 1: Write the action**

Create `src/lib/actions/reveal.ts`:

```ts
import type { Action } from 'svelte/action';

interface RevealOptions {
	/** Fraction of the element that must be visible before it reveals. */
	threshold?: number;
}

/**
 * Marks a node as revealed once it enters the viewport.
 *
 * IntersectionObserver is the baseline rather than the fallback, because
 * CSS scroll-driven animation is still missing from Firefox and older
 * Safari, and a page that silently never reveals is worse than one that
 * never animates.
 */
export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options) => {
	const prefersReducedMotion =
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
		node.dataset.revealed = 'true';
		return {};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				node.dataset.revealed = 'true';
				observer.unobserve(entry.target);
			}
		},
		{ threshold: options?.threshold ?? 0.12 }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
```

- [ ] **Step 2: Add the reveal styles**

Append to `src/app.css`:

```css
/* ---- Scroll reveal ----------------------------------------------------- */
/*
 * Job: pacing on a long page. The IntersectionObserver action is the
 * baseline; scroll-driven CSS below is a progressive enhancement for
 * browsers that support it.
 */

@media (prefers-reduced-motion: no-preference) {
	.section-reveal {
		opacity: 0;
		transform: translateY(2rem);
		transition:
			opacity 620ms var(--ease-out),
			transform 620ms var(--ease-out);
	}

	.section-reveal[data-revealed='true'] {
		opacity: 1;
		transform: none;
	}
}

@media (prefers-reduced-motion: reduce) {
	html {
		scroll-behavior: auto;
	}

	*,
	*::before,
	*::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
	}
}
```

Then delete the old `@supports (animation-timeline: view())` block and the `@keyframes section-in` and `@keyframes topic-loop` blocks from `src/app.css`. They are superseded.

- [ ] **Step 3: Verify the action compiles**

Run: `pnpm check`
Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/actions/reveal.ts src/app.css
git commit -m "feat(motion): IntersectionObserver reveal action as the baseline"
```

---

### Task 8: Channel band

The signature. Build this before the other sections because it is the piece the page is designed around.

**Files:**
- Create: `src/lib/components/ChannelBand/ChannelBand.svelte`
- Create: `src/lib/components/ChannelBand/index.ts`
- Test: `src/lib/components/ChannelBand/ChannelBand.svelte.test.ts`

**Interfaces:**
- Consumes: `channels` from `src/lib/design/channels.ts` (Task 2), `.label` from Task 3.
- Produces: `<ChannelBand {stories} />` where `stories` is `Record<ChannelId, string>` mapping each channel to its current headline. Default export from `$lib/components/ChannelBand`.

- [ ] **Step 1: Write the failing test**

Create `src/lib/components/ChannelBand/ChannelBand.svelte.test.ts`:

```ts
import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ChannelBand from './ChannelBand.svelte';

const stories = {
	intelligence: 'What a reasoning model actually does',
	cosmos: 'Artemis II flies by the Moon',
	mind: 'The hard problem, thirty years on',
	commons: 'Who owns a protocol'
};

describe('ChannelBand', () => {
	it('renders one cell per desk', async () => {
		const { container } = render(ChannelBand, { stories });
		expect(container.querySelectorAll('.band-cell')).toHaveLength(4);
	});

	it('labels each cell with its desk name', async () => {
		render(ChannelBand, { stories });
		for (const desk of ['Intelligence', 'Cosmos', 'Mind', 'Commons']) {
			await expect.element(page.getByText(desk, { exact: true })).toBeInTheDocument();
		}
	});

	it('makes every cell a link into a real beta topic route', async () => {
		const { container } = render(ChannelBand, { stories });
		const links = [...container.querySelectorAll('a.band-cell')];
		expect(links).toHaveLength(4);
		for (const link of links) {
			expect(link.getAttribute('href')).toMatch(/^https:\/\/beta\.mindplex\.ai\/topics\//);
		}
	});

	it('carries the current headline for each desk', async () => {
		render(ChannelBand, { stories });
		await expect.element(page.getByText('Artemis II flies by the Moon')).toBeInTheDocument();
	});

	it('describes itself for assistive technology', async () => {
		render(ChannelBand, { stories });
		await expect
			.element(page.getByRole('navigation', { name: 'Mindplex editorial desks' }))
			.toBeInTheDocument();
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:unit --run src/lib/components/ChannelBand/`
Expected: FAIL with "Failed to resolve import ./ChannelBand.svelte".

- [ ] **Step 3: Write the component**

Create `src/lib/components/ChannelBand/ChannelBand.svelte`:

```svelte
<script lang="ts">
	import { channels, type ChannelId } from '$lib/design/channels';

	interface Props {
		/** Current headline per desk. */
		stories: Record<ChannelId, string>;
	}

	let { stories }: Props = $props();
</script>

<!--
	The signature.

	Four desks, one page: the product argument stated as a layout rather
	than as another headline. Doubles as topic navigation into the beta.
	One channel is forward at a time; the rest recede to line-work.
-->
<nav class="channel-band" aria-label="Mindplex editorial desks">
	{#each channels as channel}
		<a class="band-cell" style="--ch: {channel.hex}" href={channel.topicHref}>
			<span class="label desk">{channel.label}</span>
			<span class="headline">{stories[channel.id]}</span>
		</a>
	{/each}
</nav>

<style>
	.channel-band {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		border-block: 1px solid var(--line);
		background: var(--surface);
	}

	.band-cell {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 3rem;
		min-height: 11rem;
		padding: 1.35rem 1.25rem 1.5rem;
		overflow: hidden;
		border-right: 1px solid var(--line);
		isolation: isolate;
	}

	.band-cell:last-child {
		border-right: 0;
	}

	/*
	 * Resting state is near-monochrome: the channel is present as a hint,
	 * not as a fill. Capped at 26% even when active, so the hue never
	 * competes with the accent or the photography.
	 */
	.band-cell::before {
		position: absolute;
		inset: 0;
		z-index: -1;
		background: linear-gradient(to top, color-mix(in srgb, var(--ch) 10%, transparent), transparent);
		opacity: 1;
		content: '';
		transition: opacity 240ms var(--ease-out);
	}

	.band-cell::after {
		position: absolute;
		inset: 0;
		z-index: -1;
		background: linear-gradient(to top, color-mix(in srgb, var(--ch) 26%, transparent), transparent);
		opacity: 0;
		content: '';
		transition: opacity 240ms var(--ease-out);
	}

	.desk {
		color: var(--ch);
	}

	.headline {
		color: var(--ink-muted);
		font-size: 0.9375rem;
		font-variation-settings: 'wdth' 100, 'wght' 550;
		line-height: 1.35;
		text-wrap: balance;
		transition: color 240ms var(--ease-out);
	}

	@media (hover: hover) and (pointer: fine) {
		.channel-band:hover .band-cell:not(:hover) .headline {
			color: var(--ink-faint);
		}

		.band-cell:hover::after {
			opacity: 1;
		}

		.band-cell:hover .headline {
			color: var(--ink);
		}
	}

	.band-cell:focus-visible::after {
		opacity: 1;
	}

	.band-cell:focus-visible .headline {
		color: var(--ink);
	}

	@media (max-width: 60rem) {
		.channel-band {
			grid-template-columns: repeat(2, 1fr);
		}

		.band-cell:nth-child(2) {
			border-right: 0;
		}

		.band-cell:nth-child(-n + 2) {
			border-bottom: 1px solid var(--line);
		}
	}

	@media (max-width: 34rem) {
		.channel-band {
			grid-template-columns: 1fr;
		}

		.band-cell {
			min-height: auto;
			gap: 1.25rem;
			border-right: 0;
			border-bottom: 1px solid var(--line);
		}

		.band-cell:last-child {
			border-bottom: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.band-cell::before,
		.band-cell::after,
		.headline {
			transition: none;
		}
	}
</style>
```

- [ ] **Step 4: Write the barrel export**

Create `src/lib/components/ChannelBand/index.ts`:

```ts
export { default as ChannelBand } from './ChannelBand.svelte';
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm test:unit --run src/lib/components/ChannelBand/`
Expected: PASS, 5 passed.

- [ ] **Step 6: Commit**

```bash
git add src/lib/components/ChannelBand
git commit -m "feat(home): channel band signature replacing the topic marquee"
```

---

### Task 9: Hero

**Files:**
- Create: `src/lib/section/Hero.svelte`
- Modify: `src/app.css` (remove the old `.hero*` and `.topic-*` rules)
- Test: `src/lib/section/Hero.svelte.test.ts`

**Interfaces:**
- Consumes: `.label`, `.display-xl`, `.body-l`, `.button`, `.media` from Task 3; `channelById` from Task 2.
- Produces: `<Hero />`, no props. Renders the only `h1` on the homepage, with `id="hero-title"`.

- [ ] **Step 1: Write the failing test**

Create `src/lib/section/Hero.svelte.test.ts`:

```ts
import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Hero from './Hero.svelte';

describe('Hero', () => {
	it('renders exactly one level-one heading', async () => {
		const { container } = render(Hero);
		expect(container.querySelectorAll('h1')).toHaveLength(1);
	});

	it('leads with the platform CTA using the canonical label', async () => {
		render(Hero);
		await expect.element(page.getByRole('link', { name: 'Open Mindplex' })).toBeInTheDocument();
	});

	it('offers the editorial CTA using the canonical label', async () => {
		render(Hero);
		await expect
			.element(page.getByRole('link', { name: 'Read the magazine' }))
			.toBeInTheDocument();
	});

	it('holds the deck to 20 words or fewer, so the hero fits the viewport', async () => {
		const { container } = render(Hero);
		const deck = container.querySelector('.hero-deck');
		expect(deck).not.toBeNull();
		const words = deck!.textContent!.trim().split(/\s+/).filter(Boolean);
		expect(words.length).toBeLessThanOrEqual(20);
	});

	it('carries at most four text elements, so the hero stays a single moment', async () => {
		const { container } = render(Hero);
		const copy = container.querySelector('.hero-copy');
		expect(copy!.children).toHaveLength(4);
	});

	it('gives the lead image a descriptive alternative text', async () => {
		const { container } = render(Hero);
		const img = container.querySelector('.hero-story img');
		expect(img!.getAttribute('alt')!.length).toBeGreaterThan(10);
	});

	it('reserves layout space for the lead image', async () => {
		const { container } = render(Hero);
		const img = container.querySelector('.hero-story img');
		expect(img!.getAttribute('width')).toBeTruthy();
		expect(img!.getAttribute('height')).toBeTruthy();
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:unit --run src/lib/section/Hero.svelte.test.ts`
Expected: FAIL with "Failed to resolve import ./Hero.svelte".

- [ ] **Step 3: Write the component**

Create `src/lib/section/Hero.svelte`:

```svelte
<script lang="ts">
	import { channelById } from '$lib/design/channels';

	const platformUrl = 'https://beta.mindplex.ai';
	const cosmos = channelById('cosmos');
</script>

<section class="hero page-shell" aria-labelledby="hero-title">
	<div class="hero-copy">
		<p class="label eyebrow">AI, media, and community intelligence</p>
		<h1 class="display-xl" id="hero-title">Make sense of what comes next.</h1>
		<p class="body-l hero-deck">
			Independent media, community intelligence, and emerging AI tools for people tracking the
			future.
		</p>
		<div class="hero-actions">
			<a class="button button-primary" href={platformUrl}>
				Open Mindplex
				<span aria-hidden="true">↗</span>
			</a>
			<a class="button button-secondary" href="{platformUrl}/magazine">Read the magazine</a>
		</div>
	</div>

	<a
		class="hero-story media"
		style="--ch: {cosmos.hex}"
		href="{platformUrl}/post/artemis-ii-flies-by-the-moon"
	>
		<img
			src="/images/artemis-moon-window.webp"
			alt="The Moon seen through the open hatch of the Artemis II spacecraft"
			width="1800"
			height="1271"
			fetchpriority="high"
		/>
		<span class="story-scrim" aria-hidden="true"></span>
		<span class="story-caption">
			<span class="label" style="color: {cosmos.hex}">{cosmos.label}</span>
			<strong>Artemis II flies by the Moon</strong>
		</span>
	</a>
</section>

<style>
	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1.03fr) minmax(25rem, 0.82fr);
		align-items: center;
		gap: clamp(2rem, 4vw, 5.5rem);
		/*
		 * Content is top-weighted inside the viewport rather than centred,
		 * so it does not float in the middle of an empty field on a tall
		 * display. Padding is capped so the hero never reads as a bug.
		 */
		min-height: min(calc(100dvh - 4.0625rem), 52rem);
		padding-block: clamp(2.5rem, 6vh, 6rem) clamp(2rem, 4vh, 4rem);
	}

	.hero-copy {
		position: relative;
		z-index: 2;
	}

	.eyebrow {
		margin-bottom: 1.75rem;
		color: var(--accent);
	}

	.hero-deck {
		margin-top: 1.75rem;
		max-width: 35rem;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 2rem;
	}

	.hero-story {
		position: relative;
		align-self: stretch;
		display: block;
		min-height: min(62dvh, 40rem);
	}

	/*
	 * A separate scrim element, so the .media black-point lift on ::before
	 * and the channel frame on ::after both stay intact. Overriding either
	 * pseudo-element here would take this one image out of the grade system.
	 */
	.story-scrim {
		position: absolute;
		inset: 0;
		z-index: 2;
		background: linear-gradient(to top, var(--page) 2%, transparent 48%);
		pointer-events: none;
	}

	.story-caption {
		position: absolute;
		right: 1.25rem;
		bottom: 1.25rem;
		left: 1.25rem;
		z-index: 3;
		display: grid;
		gap: 0.45rem;
	}

	.story-caption strong {
		max-width: 20ch;
		font-size: clamp(1.2rem, 2vw, 1.65rem);
		font-variation-settings: 'wdth' 104, 'wght' 620;
		letter-spacing: -0.03em;
		line-height: 1.08;
	}

	@media (max-width: 68rem) {
		.hero {
			grid-template-columns: 1fr 0.78fr;
			gap: 2rem;
		}
	}

	@media (max-width: 48rem) {
		.hero {
			grid-template-columns: 1fr;
			min-height: auto;
			padding-block: 3.25rem 1rem;
		}

		.hero-story {
			min-height: 27rem;
			margin-top: 0.75rem;
		}
	}

	@media (max-width: 31rem) {
		.hero-actions {
			align-items: stretch;
			flex-direction: column;
		}

		.hero-actions :global(.button) {
			width: 100%;
		}

		.hero-story {
			min-height: 23rem;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		.hero-copy > *,
		.hero-story {
			animation: hero-in 720ms var(--ease-out) both;
		}

		.hero-copy > :nth-child(2) {
			animation-delay: 70ms;
		}

		.hero-copy > :nth-child(3) {
			animation-delay: 125ms;
		}

		.hero-copy > :nth-child(4) {
			animation-delay: 180ms;
		}

		.hero-story {
			animation-delay: 140ms;
		}
	}

	@keyframes hero-in {
		from {
			opacity: 0;
			transform: translateY(1.25rem);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}
</style>
```

- [ ] **Step 4: Remove the superseded rules from `src/app.css`**

Delete: `.hero`, `.hero-copy`, `.eyebrow`, `.hero h1`, `.hero-deck`, `.hero-actions`, `.hero-story`, `.hero-story::after`, `.hero-story img`, `.story-caption`, `.story-caption > span:first-child`, `.story-caption strong`, `.topic-rail`, `.topic-track, .topic-set`, `.topic-track`, `.topic-set a`, `.topic-set a::after`, and every `.hero*` or `.topic*` override inside the media-query blocks at the bottom of the file.

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm test:unit --run src/lib/section/Hero.svelte.test.ts`
Expected: PASS, 7 passed.

- [ ] **Step 6: Commit**

```bash
git add src/lib/section/Hero.svelte src/lib/section/Hero.svelte.test.ts src/app.css
git commit -m "feat(home): rebuild hero with graded media and canonical CTAs"
```

---

### Task 10: Manifesto, entry modes and workflow sections

Three sections that share no layout family, built together because each is small and none has a component-level test beyond structure.

**Files:**
- Create: `src/lib/section/Manifesto.svelte`
- Create: `src/lib/section/EntryModes.svelte`
- Create: `src/lib/section/Workflow.svelte`
- Test: `src/lib/section/EntryModes.svelte.test.ts`

**Interfaces:**
- Consumes: `.display-xl`, `.display-m`, `.heading`, `.body`, `.body-l`, `.label`, `.media`, `.inline-link` from Task 3; `channels` from Task 2; `reveal` from Task 7.
- Produces: `<Manifesto />`, `<EntryModes />`, `<Workflow />`, all no props. `EntryModes` renders the `#inside` anchor; `Manifesto` renders `#why`.

- [ ] **Step 1: Write the failing test**

The one rule here worth a test is that the parallel entry modes carry no sequence numbering, since that was a specific defect.

Create `src/lib/section/EntryModes.svelte.test.ts`:

```ts
import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import EntryModes from './EntryModes.svelte';

describe('EntryModes', () => {
	it('presents three parallel ways in', async () => {
		const { container } = render(EntryModes);
		expect(container.querySelectorAll('.entry-panel')).toHaveLength(3);
	});

	it('uses an unordered list, because the three modes are not a sequence', async () => {
		const { container } = render(EntryModes);
		expect(container.querySelector('ol')).toBeNull();
		expect(container.querySelector('ul')).not.toBeNull();
	});

	it('shows no ordinal markers on the panels', async () => {
		const { container } = render(EntryModes);
		expect(container.textContent).not.toMatch(/\b0[123]\b/);
	});

	it('keeps the inside anchor stable for the navigation', async () => {
		const { container } = render(EntryModes);
		expect(container.querySelector('#inside')).not.toBeNull();
	});

	it('gives every panel a real image with reserved space', async () => {
		const { container } = render(EntryModes);
		const images = [...container.querySelectorAll('.entry-panel img')];
		expect(images).toHaveLength(3);
		for (const img of images) {
			expect(img.getAttribute('width')).toBeTruthy();
			expect(img.getAttribute('height')).toBeTruthy();
			expect(img.getAttribute('loading')).toBe('lazy');
		}
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:unit --run src/lib/section/EntryModes.svelte.test.ts`
Expected: FAIL with "Failed to resolve import ./EntryModes.svelte".

- [ ] **Step 3: Write `src/lib/section/Manifesto.svelte`**

```svelte
<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
</script>

<!-- Layout family: full-width statement. One of only three display moments. -->
<section class="manifesto page-shell section-reveal" id="why" use:reveal aria-labelledby="manifesto-title">
	<h2 class="display-xl" id="manifesto-title">More than a magazine. Less noise than a feed.</h2>
	<p class="body-l manifesto-deck">
		Mindplex connects edited work, fast-moving news, and public conversation in one place, so
		important ideas arrive with context.
	</p>
</section>

<style>
	.manifesto {
		display: flex;
		flex-direction: column;
		gap: 2.25rem;
		padding-block: clamp(5rem, 10vw, 9rem);
		border-bottom: 1px solid var(--line);
	}

	.manifesto :global(.display-xl) {
		max-width: 16ch;
	}

	.manifesto-deck {
		max-width: 46ch;
		font-size: clamp(1.15rem, 2vw, 1.5rem);
		line-height: 1.5;
	}
</style>
```

- [ ] **Step 4: Write `src/lib/section/EntryModes.svelte`**

Note the images: `read.webp`, `track.webp` and `contribute.webp` do not exist yet. Create the component referencing them, then Task 14 resolves the assets. Until then the panels render with the `.media` surface colour and no image, which is the correct interim state.

```svelte
<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { channelById } from '$lib/design/channels';

	const platformUrl = 'https://beta.mindplex.ai';

	const modes = [
		{
			name: 'Read deeply',
			description:
				'Long-form reporting, interviews, podcasts, and argument from people working at the edge of change.',
			href: `${platformUrl}/magazine`,
			linkLabel: 'Read the magazine',
			image: '/images/entry-read.webp',
			alt: 'A Mindplex long-form feature open on screen',
			channel: channelById('intelligence')
		},
		{
			name: 'Track change',
			description:
				'Focused news desks and topic pages turn a constant stream of developments into something you can follow.',
			href: `${platformUrl}/news`,
			linkLabel: 'Enter the newsroom',
			image: '/images/entry-track.webp',
			alt: 'The Mindplex newsroom index',
			channel: channelById('cosmos')
		},
		{
			name: 'Join the exchange',
			description:
				'Publish ideas, challenge arguments, and build a body of work inside a community that values contribution.',
			href: `${platformUrl}/contribute`,
			linkLabel: 'Start writing',
			image: '/images/entry-contribute.webp',
			alt: 'A Mindplex community discussion thread',
			channel: channelById('mind')
		}
	];
</script>

<!--
	Layout family: three parallel panels.
	No ordinal markers: these are three doors, not three steps. Numbering
	here would encode a sequence the content does not have.
-->
<section
	class="entry-section page-shell section-reveal"
	id="inside"
	use:reveal
	aria-labelledby="entry-title"
>
	<div class="section-heading">
		<h2 class="display-m" id="entry-title">One platform. Three ways in.</h2>
		<p class="body">
			Start with a story, a subject, or an argument. Move between them without losing context.
		</p>
	</div>

	<ul class="entry-grid">
		{#each modes as mode}
			<li class="entry-panel" style="--ch: {mode.channel.hex}">
				<a href={mode.href}>
					<span class="media entry-media">
						<img src={mode.image} alt={mode.alt} width="900" height="1125" loading="lazy" />
					</span>
					<span class="entry-body">
						<span class="heading">{mode.name}</span>
						<span class="body entry-description">{mode.description}</span>
						<span class="inline-link">
							{mode.linkLabel}
							<span aria-hidden="true">↗</span>
						</span>
					</span>
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	.entry-section {
		padding-block: clamp(5rem, 10vw, 9rem);
	}

	.section-heading {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		max-width: 48rem;
		margin-bottom: clamp(3rem, 6vw, 4.5rem);
	}

	.entry-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: clamp(1.5rem, 3vw, 2.5rem);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.entry-panel a {
		display: grid;
		gap: 1.5rem;
	}

	.entry-media {
		display: block;
		aspect-ratio: 4 / 5;
	}

	.entry-body {
		display: grid;
		gap: 0.75rem;
	}

	.entry-description {
		max-width: 34ch;
	}

	@media (max-width: 62rem) {
		.entry-grid {
			grid-template-columns: 1fr;
			gap: 3rem;
		}

		.entry-panel a {
			grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
			align-items: center;
			gap: 2rem;
		}

		.entry-media {
			aspect-ratio: 1 / 1;
		}
	}

	@media (max-width: 40rem) {
		.entry-panel a {
			grid-template-columns: 1fr;
			gap: 1.25rem;
		}

		.entry-media {
			aspect-ratio: 16 / 10;
		}
	}
</style>
```

- [ ] **Step 5: Write `src/lib/section/Workflow.svelte`**

```svelte
<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	/* Numbering is kept here: this genuinely is a sequence. */
	const steps = [
		{ name: 'Find', detail: 'Bring relevant sources and emerging questions into view.' },
		{ name: 'Filter', detail: 'Separate repeated noise from material worth investigating.' },
		{ name: 'Shape', detail: 'Support research and production without hiding authorship.' },
		{ name: 'Publish', detail: 'Keep editorial judgment and attribution visible at the end.' }
	];
</script>

<!-- Layout family: horizontal progression. -->
<section class="workflow page-shell section-reveal" use:reveal aria-labelledby="workflow-title">
	<div class="workflow-heading">
		<h2 class="display-m" id="workflow-title">AI belongs in the newsroom, not above it.</h2>
		<p class="body">
			Emerging tools can accelerate research and production. Authors, editors, and communities
			still decide what deserves attention.
		</p>
	</div>

	<ol class="workflow-track">
		{#each steps as step, index}
			<li class="workflow-step">
				<span class="caption step-index">{String(index + 1).padStart(2, '0')}</span>
				<span class="step-rule" aria-hidden="true"></span>
				<span class="heading step-name">{step.name}</span>
				<span class="body step-detail">{step.detail}</span>
			</li>
		{/each}
	</ol>
</section>

<style>
	.workflow {
		padding-block: clamp(5rem, 10vw, 9rem);
		border-top: 1px solid var(--line);
	}

	.workflow-heading {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		max-width: 52rem;
		margin-bottom: clamp(3rem, 6vw, 4.5rem);
	}

	.workflow-track {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: clamp(1.25rem, 2.5vw, 2rem);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.workflow-step {
		display: grid;
		gap: 0.65rem;
	}

	/*
	 * The rule is the progression: it runs the width of each step and
	 * carries the accent only on the first, so the eye starts at Find.
	 */
	.step-rule {
		display: block;
		height: 1px;
		margin-block: 0.6rem 0.9rem;
		background: var(--line-strong);
	}

	.workflow-step:first-child .step-rule {
		background: var(--accent);
	}

	.step-detail {
		font-size: 0.9375rem;
	}

	@media (max-width: 62rem) {
		.workflow-track {
			grid-template-columns: repeat(2, 1fr);
			gap: 2.5rem 2rem;
		}
	}

	@media (max-width: 34rem) {
		.workflow-track {
			grid-template-columns: 1fr;
		}
	}
</style>
```

- [ ] **Step 6: Run test to verify it passes**

Run: `pnpm test:unit --run src/lib/section/EntryModes.svelte.test.ts`
Expected: PASS, 5 passed.

- [ ] **Step 7: Commit**

```bash
git add src/lib/section/Manifesto.svelte src/lib/section/EntryModes.svelte src/lib/section/Workflow.svelte src/lib/section/EntryModes.svelte.test.ts
git commit -m "feat(home): manifesto, parallel entry panels and workflow progression"
```

---

### Task 11: Trust section and the byline device

The reputation claim, shown rather than described.

**Files:**
- Create: `src/lib/components/Byline/Byline.svelte`
- Create: `src/lib/components/Byline/index.ts`
- Create: `src/lib/section/Trust.svelte`
- Test: `src/lib/components/Byline/Byline.svelte.test.ts`

**Interfaces:**
- Consumes: `.label`, `.caption`, `.body` from Task 3; `Channel` type from Task 2.
- Produces: `<Byline {author} {role} {channel} {published} {standing} {illustrative} />` where `author: string`, `role: string`, `channel: Channel`, `published: string` (ISO date), `standing: string`, `illustrative: boolean`. When `illustrative` is true the component renders a visible "Example" marker, so an unverified value is never presented as real data.

- [ ] **Step 1: Write the failing test**

Create `src/lib/components/Byline/Byline.svelte.test.ts`:

```ts
import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Byline from './Byline.svelte';
import { channelById } from '$lib/design/channels';

const base = {
	author: 'Amara Angelica',
	role: 'Senior Editor',
	channel: channelById('intelligence'),
	published: '2026-06-18',
	standing: 'Contributing since 2021'
};

describe('Byline', () => {
	it('names the author and their role', async () => {
		render(Byline, { ...base, illustrative: false });
		await expect.element(page.getByText('Amara Angelica')).toBeInTheDocument();
		await expect.element(page.getByText('Senior Editor')).toBeInTheDocument();
	});

	it('marks the desk the work belongs to', async () => {
		render(Byline, { ...base, illustrative: false });
		await expect.element(page.getByText('Intelligence')).toBeInTheDocument();
	});

	it('renders the publication date as a machine-readable time', async () => {
		const { container } = render(Byline, { ...base, illustrative: false });
		const time = container.querySelector('time');
		expect(time!.getAttribute('datetime')).toBe('2026-06-18');
	});

	it('labels the standing value as an example when it is not real data', async () => {
		render(Byline, { ...base, illustrative: true });
		await expect.element(page.getByText('Example')).toBeInTheDocument();
	});

	it('shows no example marker when the standing value is real', async () => {
		const { container } = render(Byline, { ...base, illustrative: false });
		expect(container.textContent).not.toContain('Example');
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:unit --run src/lib/components/Byline/`
Expected: FAIL with "Failed to resolve import ./Byline.svelte".

- [ ] **Step 3: Write the component**

Create `src/lib/components/Byline/Byline.svelte`:

```svelte
<script lang="ts">
	import type { Channel } from '$lib/design/channels';

	interface Props {
		author: string;
		role: string;
		channel: Channel;
		/** ISO date, rendered into a machine-readable <time>. */
		published: string;
		/** Standing earned through contribution, not follower count. */
		standing: string;
		/**
		 * True when the standing value is illustrative rather than
		 * MPXR-derived. An unverified value is never shown as real data.
		 */
		illustrative: boolean;
	}

	let { author, role, channel, published, standing, illustrative }: Props = $props();

	const formatted = new Date(published).toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
</script>

<div class="byline" style="--ch: {channel.hex}">
	<div class="byline-head">
		<span class="label desk">{channel.label}</span>
		{#if illustrative}
			<span class="caption example">Example</span>
		{/if}
	</div>

	<p class="byline-author">{author}</p>
	<p class="caption byline-role">{role}</p>

	<div class="byline-foot">
		<time class="caption" datetime={published}>{formatted}</time>
		<span class="caption byline-standing">{standing}</span>
	</div>
</div>

<style>
	.byline {
		display: grid;
		gap: 0.35rem;
		padding: 1.5rem;
		border: 1px solid var(--line);
		border-left: 2px solid var(--ch);
		border-radius: var(--radius-media);
		background: var(--surface);
	}

	.byline-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 0.75rem;
	}

	.desk {
		color: var(--ch);
	}

	.example {
		padding: 0.15rem 0.45rem;
		border: 1px solid var(--line-strong);
		border-radius: var(--radius-control);
	}

	.byline-author {
		margin: 0;
		font-size: 1.125rem;
		font-variation-settings: 'wdth' 100, 'wght' 650;
		letter-spacing: -0.015em;
	}

	.byline-role {
		margin: 0;
	}

	.byline-foot {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.75rem;
		margin-top: 1.25rem;
		padding-top: 1rem;
		border-top: 1px solid var(--line);
	}

	.byline-standing {
		color: var(--ink-muted);
	}
</style>
```

- [ ] **Step 4: Write the barrel export**

Create `src/lib/components/Byline/index.ts`:

```ts
export { default as Byline } from './Byline.svelte';
```

- [ ] **Step 5: Write `src/lib/section/Trust.svelte`**

```svelte
<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { Byline } from '$lib/components/Byline';
	import { channelById } from '$lib/design/channels';

	const principles = [
		{ name: 'Visible authorship', detail: 'Know who made the claim and where it came from.' },
		{
			name: 'Editorial judgment',
			detail: 'Keep human responsibility clear, even when AI supports the process.'
		},
		{
			name: 'Earned reputation',
			detail: 'Let a history of useful participation carry more weight than follower count.'
		}
	];
</script>

<!--
	Layout family: attribution device.
	The reputation claim is shown as a real byline rather than described in
	prose. The standing value is marked illustrative until it can be wired
	to MPXR data; no invented metric ships either way.
-->
<section class="trust page-shell section-reveal" id="trust" use:reveal aria-labelledby="trust-title">
	<div class="trust-copy">
		<h2 class="display-m" id="trust-title">Trust should follow the work.</h2>
		<p class="body">
			Mindplex pairs visible authorship, editorial judgment, and reputation shaped by contribution.
			Useful signal matters more than empty reach.
		</p>

		<dl class="trust-list">
			{#each principles as principle}
				<div class="trust-item">
					<dt>{principle.name}</dt>
					<dd class="body">{principle.detail}</dd>
				</div>
			{/each}
		</dl>
	</div>

	<div class="trust-demo">
		<Byline
			author="Amara Angelica"
			role="Senior Editor"
			channel={channelById('intelligence')}
			published="2026-06-18"
			standing="Contributing since 2021"
			illustrative={true}
		/>
		<p class="caption trust-demo-note">
			Every piece on Mindplex carries its author, its desk, and a standing earned through
			contribution.
		</p>
	</div>
</section>

<style>
	.trust {
		display: grid;
		grid-template-columns: minmax(0, 1.25fr) minmax(18rem, 0.75fr);
		gap: clamp(3rem, 7vw, 6rem);
		padding-block: clamp(5rem, 10vw, 9rem);
		border-block: 1px solid var(--line);
	}

	.trust-copy > :global(.body) {
		margin-top: 1.5rem;
	}

	.trust-list {
		margin: 3rem 0 0;
		padding: 0;
		border-top: 1px solid var(--line-strong);
	}

	.trust-item {
		display: grid;
		grid-template-columns: minmax(9rem, 0.6fr) minmax(0, 1.4fr);
		gap: 2rem;
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--line);
	}

	.trust-item dt {
		font-size: 0.9375rem;
		font-variation-settings: 'wdth' 100, 'wght' 650;
	}

	.trust-item dd {
		margin: 0;
	}

	.trust-demo {
		align-self: center;
		display: grid;
		gap: 1.25rem;
	}

	.trust-demo-note {
		max-width: 32ch;
	}

	@media (max-width: 62rem) {
		.trust {
			grid-template-columns: 1fr;
			gap: 3rem;
		}

		.trust-item {
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}
	}
</style>
```

- [ ] **Step 6: Run test to verify it passes**

Run: `pnpm test:unit --run src/lib/components/Byline/`
Expected: PASS, 5 passed.

- [ ] **Step 7: Commit**

```bash
git add src/lib/components/Byline src/lib/section/Trust.svelte
git commit -m "feat(home): show reputation as a real byline instead of prose"
```

---

### Task 12: Stories, destinations and final CTA

**Files:**
- Create: `src/lib/section/Stories.svelte`
- Create: `src/lib/section/Destinations.svelte`
- Create: `src/lib/section/FinalCta.svelte`
- Test: `src/lib/section/Destinations.svelte.test.ts`

**Interfaces:**
- Consumes: `.display-l`, `.display-m`, `.heading`, `.body`, `.label`, `.media`, `.inline-link`, `.button` from Task 3; `channelById` from Task 2; `reveal` from Task 7.
- Produces: `<Stories />`, `<Destinations />`, `<FinalCta />`, all no props.

- [ ] **Step 1: Write the failing test**

Create `src/lib/section/Destinations.svelte.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Destinations from './Destinations.svelte';

describe('Destinations', () => {
	it('indexes exactly the six beta product routes', async () => {
		const { container } = render(Destinations);
		const links = [...container.querySelectorAll('.destination')];
		expect(links.map((l) => l.getAttribute('href'))).toEqual([
			'https://beta.mindplex.ai/magazine',
			'https://beta.mindplex.ai/podcast',
			'https://beta.mindplex.ai/news',
			'https://beta.mindplex.ai/topics',
			'https://beta.mindplex.ai/community',
			'https://beta.mindplex.ai/mindbytes'
		]);
	});

	it('fills every grid cell, leaving no blanks', async () => {
		const { container } = render(Destinations);
		const grid = container.querySelector('.destination-grid');
		expect(grid!.children).toHaveLength(6);
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:unit --run src/lib/section/Destinations.svelte.test.ts`
Expected: FAIL with "Failed to resolve import ./Destinations.svelte".

- [ ] **Step 3: Write `src/lib/section/Stories.svelte`**

```svelte
<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { channelById } from '$lib/design/channels';

	const platformUrl = 'https://beta.mindplex.ai';

	const stories = [
		{
			title: 'Who the f*** is Mark Fisher?',
			channel: channelById('mind'),
			href: `${platformUrl}/post/who-the-f-is-mark-fisher-and-why-you-should-care-they-made-a-film-about-making-a-film-about-mark-fisher`,
			image: '/images/mark-fisher-film.webp',
			alt: 'Poster for a film about cultural theorist Mark Fisher',
			width: 750,
			height: 948,
			shape: 'poster'
		},
		{
			title: 'VR, AI, and the comings and goings of slop',
			channel: channelById('intelligence'),
			href: `${platformUrl}/post/up-and-down-and-all-around-with-vr-ai-and-the-comings-and-goings-of-slop`,
			image: '/images/tony-parisi-interview.webp',
			alt: 'Tony Parisi and RU Sirius in conversation',
			width: 2000,
			height: 900,
			shape: 'wide'
		}
	];
</script>

<!-- Layout family: editorial grid. -->
<section class="stories page-shell section-reveal" use:reveal aria-labelledby="stories-title">
	<div class="stories-intro">
		<h2 class="display-m" id="stories-title">A living publication, not a content machine.</h2>
		<p class="body">
			Mindplex makes room for reporting, criticism, conversation, and ideas that do not fit a single
			format.
		</p>
	</div>

	{#each stories as story}
		<a class="story story-{story.shape}" style="--ch: {story.channel.hex}" href={story.href}>
			<span class="media story-media">
				<img
					src={story.image}
					alt={story.alt}
					width={story.width}
					height={story.height}
					loading="lazy"
				/>
			</span>
			<span class="story-body">
				<span class="label story-desk">{story.channel.label}</span>
				<span class="heading story-title">{story.title}</span>
			</span>
		</a>
	{/each}
</section>

<style>
	.stories {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(14rem, 0.72fr) minmax(0, 1.1fr);
		align-items: end;
		gap: clamp(1.5rem, 3.5vw, 3.5rem);
		padding-block: clamp(5rem, 10vw, 9rem);
		border-top: 1px solid var(--line);
	}

	.stories-intro {
		align-self: start;
		display: grid;
		gap: 1.5rem;
	}

	.story {
		display: grid;
		gap: 1rem;
	}

	.story-media {
		display: block;
	}

	.story-poster .story-media {
		aspect-ratio: 4 / 5;
	}

	.story-wide .story-media {
		aspect-ratio: 4 / 3;
	}

	.story-body {
		display: grid;
		gap: 0.45rem;
	}

	.story-desk {
		color: var(--ch);
	}

	.story-title {
		letter-spacing: -0.03em;
		line-height: 1.1;
	}

	@media (max-width: 68rem) {
		.stories {
			grid-template-columns: 1fr 0.72fr;
		}

		.stories-intro {
			grid-column: 1 / -1;
			max-width: 48rem;
			margin-bottom: 1rem;
		}

		.story-wide .story-media {
			aspect-ratio: 4 / 5;
		}
	}

	@media (max-width: 40rem) {
		.stories {
			grid-template-columns: 1fr;
		}

		.story-wide .story-media {
			aspect-ratio: 4 / 3;
		}
	}
</style>
```

- [ ] **Step 4: Write `src/lib/section/Destinations.svelte`**

```svelte
<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	const platformUrl = 'https://beta.mindplex.ai';

	const destinations = [
		{
			name: 'Magazine',
			description: 'Essays, interviews, reviews, and original reporting.',
			href: `${platformUrl}/magazine`
		},
		{
			name: 'Podcast',
			description: 'Long conversations with people building and questioning the future.',
			href: `${platformUrl}/podcast`
		},
		{
			name: 'News',
			description: 'Fast-moving developments with a clear editorial frame.',
			href: `${platformUrl}/news`
		},
		{
			name: 'Topics',
			description: 'Follow the subjects that matter to you across every format.',
			href: `${platformUrl}/topics`
		},
		{
			name: 'Community',
			description: 'Discussion, contribution, and the people behind the ideas.',
			href: `${platformUrl}/community`
		},
		{
			name: 'Mindbytes',
			description: 'Compact ideas for a shorter reading window.',
			href: `${platformUrl}/mindbytes`
		}
	];
</script>

<!-- Layout family: index. Six items, six cells, no blanks. -->
<section
	class="destinations page-shell section-reveal"
	use:reveal
	aria-labelledby="destinations-title"
>
	<div class="destinations-intro">
		<h2 class="display-m" id="destinations-title">Choose your entry point.</h2>
		<p class="body">Every format leads back to the same exchange of ideas.</p>
	</div>

	<div class="destination-grid">
		{#each destinations as destination}
			<a class="destination" href={destination.href}>
				<span class="destination-body">
					<span class="heading">{destination.name}</span>
					<span class="body">{destination.description}</span>
				</span>
				<span class="destination-arrow" aria-hidden="true">↗</span>
			</a>
		{/each}
	</div>
</section>

<style>
	.destinations {
		padding-block: clamp(5rem, 10vw, 9rem);
	}

	.destinations-intro {
		display: grid;
		gap: 1.25rem;
		max-width: 48rem;
		margin-bottom: clamp(3rem, 6vw, 4.5rem);
	}

	.destination-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		border-top: 1px solid var(--line-strong);
	}

	.destination {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 1rem;
		min-height: 10rem;
		padding: 1.5rem 1.5rem 1.5rem 0;
		border-bottom: 1px solid var(--line);
		transition: background-color 180ms ease;
	}

	.destination:nth-child(odd) {
		border-right: 1px solid var(--line);
	}

	.destination:nth-child(even) {
		padding-left: 1.5rem;
	}

	.destination-body {
		display: grid;
		gap: 0.75rem;
		max-width: 27rem;
	}

	/* Transform, not padding: hover must not trigger layout. */
	.destination-arrow {
		align-self: start;
		color: var(--accent);
		font-size: 1.2rem;
		transition: transform 180ms var(--ease-out);
	}

	@media (hover: hover) and (pointer: fine) {
		.destination:hover {
			background: color-mix(in srgb, var(--accent) 5%, transparent);
		}

		.destination:hover .destination-arrow {
			transform: translate(0.25rem, -0.25rem);
		}
	}

	@media (max-width: 48rem) {
		.destination-grid {
			grid-template-columns: 1fr;
		}

		.destination:nth-child(odd) {
			border-right: 0;
		}

		.destination:nth-child(even) {
			padding-left: 0;
		}
	}
</style>
```

- [ ] **Step 5: Write `src/lib/section/FinalCta.svelte`**

```svelte
<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	const platformUrl = 'https://beta.mindplex.ai';
</script>

<!-- Layout family: full-width statement. The last display moment on the page. -->
<section class="final-cta page-shell section-reveal" use:reveal aria-labelledby="final-title">
	<div class="final-copy">
		<h2 class="display-l" id="final-title">What comes next is still being written.</h2>
		<p class="body-l">Read it. Question it. Help shape it.</p>
	</div>
	<a class="button button-primary" href={platformUrl}>
		Open Mindplex
		<span aria-hidden="true">↗</span>
	</a>
</section>

<style>
	.final-cta {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 3rem;
		padding-block: clamp(5rem, 10vw, 9rem);
		border-top: 1px solid var(--line);
	}

	.final-copy {
		display: grid;
		gap: 1.25rem;
	}

	.final-copy :global(.display-l) {
		max-width: 15ch;
	}

	.final-cta :global(.button) {
		flex: 0 0 auto;
		margin-bottom: 0.4rem;
	}

	@media (max-width: 48rem) {
		.final-cta {
			align-items: flex-start;
			flex-direction: column;
			gap: 2rem;
		}
	}
</style>
```

- [ ] **Step 6: Run test to verify it passes**

Run: `pnpm test:unit --run src/lib/section/Destinations.svelte.test.ts`
Expected: PASS, 2 passed.

- [ ] **Step 7: Commit**

```bash
git add src/lib/section/Stories.svelte src/lib/section/Destinations.svelte src/lib/section/FinalCta.svelte src/lib/section/Destinations.svelte.test.ts
git commit -m "feat(home): stories grid, destination index and closing statement"
```

---

### Task 13: Compose the homepage

**Files:**
- Modify: `src/routes/+page.svelte` (replace entirely)
- Modify: `src/routes/page.svelte.test.ts`
- Modify: `src/app.css` (remove all remaining homepage section rules)

**Interfaces:**
- Consumes: every section component from Tasks 8 to 12.
- Produces: the finished homepage.

- [ ] **Step 1: Update the page test**

Replace `src/routes/page.svelte.test.ts`:

```ts
import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	it('renders exactly one level-one heading', async () => {
		const { container } = render(Page);
		expect(container.querySelectorAll('h1')).toHaveLength(1);
	});

	it('keeps every navigation anchor target present', async () => {
		const { container } = render(Page);
		for (const id of ['why', 'inside', 'trust', 'community']) {
			expect(container.querySelector(`#${id}`), `missing #${id}`).not.toBeNull();
		}
	});

	it('spends its display headline budget on three moments and no more', async () => {
		const { container } = render(Page);
		const display = container.querySelectorAll('.display-xl, .display-l');
		expect(display.length).toBeLessThanOrEqual(3);
	});

	it('uses one label per CTA intent', async () => {
		const { container } = render(Page);
		const text = container.textContent ?? '';
		for (const retired of [
			'Enter Mindplex',
			'Explore the magazine',
			'Browse the latest stories',
			'Contribute to Mindplex',
			'Meet the community',
			'See what is inside'
		]) {
			expect(text, `retired CTA "${retired}" is still on the page`).not.toContain(retired);
		}
	});

	it('leads with the platform CTA', async () => {
		render(Page);
		await expect
			.element(page.getByRole('link', { name: 'Open Mindplex' }).first())
			.toBeInTheDocument();
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:unit --run src/routes/page.svelte.test.ts`
Expected: FAIL. The current page has nine display headlines and every retired CTA label.

- [ ] **Step 3: Write `src/lib/section/Community.svelte`**

This section was not created in an earlier task because it is the only one that needs a full-bleed surface, which is simplest to author alongside the composition. It must exist before Step 4, which imports it.

```svelte
<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	const platformUrl = 'https://beta.mindplex.ai';
</script>

<!-- Layout family: full-bleed surface shift. -->
<section class="community section-reveal" id="community" use:reveal aria-labelledby="community-title">
	<div class="community-shell page-shell">
		<h2 class="display-m" id="community-title">The future needs participants, not spectators.</h2>
		<div class="community-copy">
			<p class="body">
				Bring an argument, a field of expertise, or a question worth pursuing. Mindplex gives
				writers, researchers, artists, and builders a place to publish and be challenged.
			</p>
			<div class="community-actions">
				<a class="button button-primary" href="{platformUrl}/contribute">Start writing</a>
			</div>
		</div>
	</div>
</section>

<style>
	.community {
		border-block: 1px solid var(--line);
		background: var(--surface);
	}

	.community-shell {
		display: grid;
		grid-template-columns: minmax(0, 1.2fr) minmax(18rem, 0.8fr);
		gap: clamp(3rem, 7vw, 6rem);
		padding-block: clamp(5rem, 10vw, 9rem);
	}

	.community-shell :global(.display-m) {
		max-width: 13ch;
	}

	.community-copy {
		align-self: end;
		display: grid;
		gap: 2rem;
		padding-left: clamp(1.5rem, 4vw, 3rem);
		border-left: 1px solid var(--line);
	}

	.community-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	@media (max-width: 62rem) {
		.community-shell {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}

		.community-copy {
			padding-left: 0;
			border-left: 0;
		}
	}
</style>
```

- [ ] **Step 4: Rewrite `src/routes/+page.svelte`**

Replace the whole file:

```svelte
<script lang="ts">
	import { ChannelBand } from '$lib/components/ChannelBand';
	import Hero from '$lib/section/Hero.svelte';
	import Manifesto from '$lib/section/Manifesto.svelte';
	import EntryModes from '$lib/section/EntryModes.svelte';
	import Stories from '$lib/section/Stories.svelte';
	import Trust from '$lib/section/Trust.svelte';
	import Workflow from '$lib/section/Workflow.svelte';
	import Community from '$lib/section/Community.svelte';
	import Destinations from '$lib/section/Destinations.svelte';
	import FinalCta from '$lib/section/FinalCta.svelte';
	import type { ChannelId } from '$lib/design/channels';

	/*
	 * Current headline per desk. Hardcoded and curated for now; the spec's
	 * open question 3 covers wiring these to the beta API.
	 */
	const deskStories: Record<ChannelId, string> = {
		intelligence: 'VR, AI, and the comings and goings of slop',
		cosmos: 'Artemis II flies by the Moon',
		mind: 'Who the f*** is Mark Fisher?',
		commons: 'What a reputation token is actually for'
	};
</script>

<svelte:head>
	<title>Mindplex | Make sense of what comes next</title>
	<meta
		name="description"
		content="Mindplex brings independent media, community intelligence, and emerging AI tools together for people tracking the future."
	/>
	<link rel="canonical" href="https://mindplex.ai/" />
	<meta property="og:title" content="Mindplex | Make sense of what comes next" />
	<meta
		property="og:description"
		content="Independent media, community intelligence, and emerging AI tools for people tracking the future."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://mindplex.ai/" />
</svelte:head>

<main id="main-content">
	<Hero />
	<ChannelBand stories={deskStories} />
	<Manifesto />
	<EntryModes />
	<Stories />
	<Trust />
	<Workflow />
	<Community />
	<Destinations />
	<FinalCta />
</main>
```

- [ ] **Step 5: Strip the remaining homepage rules from `src/app.css`**

Delete every remaining section rule now owned by a component: `.manifesto*`, `.section-heading*`, `.entry-list*`, `.entry-index`, `.stories*`, `.story-feature*`, `.trust*`, `.workflow*`, `.community*`, `.destination*`, `.final-cta*`, and every corresponding override inside the `@media (max-width: 68rem)`, `@media (max-width: 48rem)` and `@media (max-width: 31rem)` blocks.

After this, `src/app.css` should contain only: the `@import`/`@plugin` lines, the three `@font-face` blocks, `:root`, the element resets, `.skip-link`, `.page-shell`/`.footer-shell`, the type scale, the controls, `.media`, the reveal rules, the footer column rules, and the reduced-motion and reduced-transparency blocks.

- [ ] **Step 6: Run the full unit suite**

Run: `pnpm test:unit --run`
Expected: PASS across every file, including `src/lib/design/copy-guard.spec.ts` which was committed red in Task 4 and turns green here.

- [ ] **Step 7: Verify in the browser**

Open `http://localhost:5199` at 1440x900. Walk the page and confirm:
- The hero fits without scrolling and the CTA pair is visible.
- The channel band shows four desks, and hovering one brings it forward while the others recede.
- No two consecutive sections share a layout family.
- Exactly three display headlines: hero, manifesto, final CTA.

Then set the viewport to 390x844 and confirm every section collapses to a single column.

- [ ] **Step 8: Commit**

```bash
git add src/routes/+page.svelte src/routes/page.svelte.test.ts src/lib/section/Community.svelte src/app.css
git commit -m "feat(home): compose the Signal homepage from section components"
```

---

# Phase 4: Secondary routes

### Task 14: Editorial imagery

Resolve the image assets the sections reference, and report any that cannot be sourced rather than substituting.

**Files:**
- Create: `static/images/entry-read.webp`, `static/images/entry-track.webp`, `static/images/entry-contribute.webp`
- Possibly modify: `static/images/artemis-moon-window.webp`

**Interfaces:**
- Consumes: the `.media` grade from Task 3.
- Produces: the three entry-panel assets referenced by `src/lib/section/EntryModes.svelte`.

- [ ] **Step 1: Source the three entry-panel images**

Each panel needs one real editorial image at 900x1125 (4:5), WebP, under 180KB. Source them from the beta product's real library at `beta.mindplex.ai`:
- `entry-read.webp`: a magazine long-form piece
- `entry-track.webp`: the newsroom index
- `entry-contribute.webp`: a community discussion

**If an asset cannot be sourced, do not substitute it.** Leave the reference in place, add a comment in `EntryModes.svelte` naming the required dimensions, and report the missing slot in the task summary. A hand-rolled SVG or a generic stock photo is a worse outcome than a labelled gap.

- [ ] **Step 2: Verify the grade holds**

Open `http://localhost:5199` in the Browser pane and inspect one entry panel:

Run via `preview_inspect` on `.entry-media img`, checking `filter`.
Expected: `saturate(0.88)`.

Confirm visually that no image out-saturates the channel labels beside it, and that dark images sit on the surface rather than punching a hole in it.

- [ ] **Step 3: Assess the hero lead image**

The Artemis photograph is near-black and currently reads as a dark rectangle at desktop width. Decide between:
- **Grade it:** raise `.hero-story::before` opacity handling so the Moon reads at a glance, or
- **Replace it:** source a lead image with more tonal range from the beta library.

Whichever is chosen, confirm at 1440x900 that a visitor can identify the subject without looking twice. Record the decision in the commit message.

- [ ] **Step 4: Commit**

```bash
git add static/images src/lib/section
git commit -m "feat(media): source entry panel imagery and resolve the hero lead"
```

---

### Task 15: Prose system, blog post and campaign

Both routes render untrusted HTML through the same prose container, so they share one treatment.

**Files:**
- Modify: `src/app.css` (add the prose rules)
- Modify: `src/routes/blog/[slug]/+page.svelte`
- Modify: `src/routes/campaign/+page.svelte`

**Interfaces:**
- Consumes: tokens from Task 2, type scale from Task 3.
- Produces: a `.prose-mindplex` class used by both routes.

- [ ] **Step 1: Add the prose rules to `src/app.css`**

```css
/* ---- Long-form prose --------------------------------------------------- */
/*
 * Used by /blog/[slug] and /campaign, both of which render HTML from the
 * CMS. Replaces prose-a:text-cyan-700, which failed contrast on the dark
 * surface.
 */

.prose-mindplex {
	width: min(100% - 2rem, 44rem);
	margin-inline: auto;
	padding-block: clamp(3rem, 6vw, 5rem);
	color: var(--ink-muted);
	font-size: 1.0625rem;
	line-height: 1.7;
}

.prose-mindplex h1 {
	margin: 0 0 1.5rem;
	color: var(--ink);
	font-size: clamp(1.75rem, 2.6vw, 2.25rem);
	font-variation-settings: 'wdth' 104, 'wght' 640;
	letter-spacing: -0.028em;
	line-height: 1.06;
	padding-bottom: 0.08em;
	text-wrap: balance;
}

.prose-mindplex h2 {
	margin: 2.75rem 0 1rem;
	color: var(--ink);
	font-size: 1.375rem;
	font-variation-settings: 'wdth' 100, 'wght' 650;
	letter-spacing: -0.015em;
	line-height: 1.2;
}

.prose-mindplex h3 {
	margin: 2rem 0 0.75rem;
	color: var(--ink);
	font-size: 1.125rem;
	font-variation-settings: 'wdth' 100, 'wght' 650;
}

.prose-mindplex p,
.prose-mindplex li {
	margin: 0 0 1.25rem;
}

.prose-mindplex a {
	color: var(--accent);
	text-decoration: underline;
	text-underline-offset: 0.2rem;
}

.prose-mindplex strong {
	color: var(--ink);
	font-variation-settings: 'wdth' 100, 'wght' 650;
}

.prose-mindplex img,
.prose-mindplex iframe {
	display: block;
	width: 100%;
	margin-block: 2rem;
	border-radius: var(--radius-media);
}

/* Reserve space so the YouTube rewrite in blog/[slug] cannot shift layout. */
.prose-mindplex iframe {
	aspect-ratio: 16 / 9;
	height: auto;
	border: 0;
}

.prose-mindplex blockquote {
	margin: 2rem 0;
	padding-left: 1.25rem;
	border-left: 2px solid var(--accent);
	color: var(--ink);
}

.prose-mindplex code {
	padding: 0.15rem 0.35rem;
	border-radius: 0.25rem;
	background: var(--surface-strong);
	color: var(--ink);
	font-size: 0.9em;
}
```

- [ ] **Step 2: Update `src/routes/blog/[slug]/+page.svelte`**

Replace the `<section>` element, keeping the `onMount` embed rewriter exactly as it is:

```svelte
<section class="prose-mindplex">
	<h1>{@html blog[0]?.title}</h1>
	<div>
		{@html blog[0]?.description}
	</div>
</section>
```

- [ ] **Step 3: Update `src/routes/campaign/+page.svelte`**

```svelte
<script lang="ts">
	import { marked } from 'marked';
	import content from './content.md?raw';
</script>

<div class="prose-mindplex">
	{@html marked(content)}
</div>
```

Note that the unused `import type { PageData } from './$types';` on the current file is dropped, which also clears a `svelte-check` warning.

- [ ] **Step 4: Verify contrast**

Open `http://localhost:5199/campaign` in the Browser pane.

Run via `preview_inspect` on `.prose-mindplex a`, checking `color`.
Expected: `rgb(34, 208, 127)`, which is `#22D07F` and measures 9.19:1 against the page. The previous `text-cyan-700` was `#0e7490`, which measures 1.9:1 and failed AA.

- [ ] **Step 5: Verify no layout shift on the blog post route**

Open a post at `http://localhost:5199/blog/<any-slug>` and confirm any embedded YouTube iframe occupies a 16:9 box from first paint.

- [ ] **Step 6: Commit**

```bash
git add src/app.css src/routes/blog/\[slug\]/+page.svelte src/routes/campaign/+page.svelte
git commit -m "feat(prose): shared long-form system, fixes link contrast failure"
```

---

### Task 16: Blog index and card

**Files:**
- Modify: `src/routes/blog/+page.server.ts`
- Modify: `src/routes/blog/+page.svelte`
- Modify: `src/lib/components/BlogCard/BlogCard.svelte`
- Test: `src/lib/components/BlogCard/BlogCard.svelte.test.ts`

**Interfaces:**
- Consumes: `.media`, `.heading`, `.body`, `.caption`, `.label` from Task 3.
- Produces: `<BlogCard {blog} />` where `blog` matches the existing shape `{ id: number; title: string; description: string; photo_url: string; post_slug: string; created_at: string }`. The load function's return type gains `{ blogs: Blog[]; success: boolean; errorMessage?: string }`.

- [ ] **Step 1: Write the failing test**

Create `src/lib/components/BlogCard/BlogCard.svelte.test.ts`:

```ts
import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import BlogCard from './BlogCard.svelte';

const blog = {
	id: 7,
	title: 'What a reasoning model actually does',
	description: '<p>A short <strong>summary</strong> with markup.</p>',
	photo_url: 'https://example.test/cover.jpg',
	post_slug: 'what-a-reasoning-model-actually-does',
	created_at: '2026-05-14T09:00:00Z'
};

describe('BlogCard', () => {
	it('links to the post', async () => {
		const { container } = render(BlogCard, { blog });
		expect(container.querySelector('a')!.getAttribute('href')).toBe(
			'/blog/what-a-reasoning-model-actually-does'
		);
	});

	it('strips markup out of the summary', async () => {
		const { container } = render(BlogCard, { blog });
		expect(container.textContent).toContain('A short summary with markup.');
		expect(container.innerHTML).not.toContain('<strong>');
	});

	it('renders the date as a machine-readable time', async () => {
		const { container } = render(BlogCard, { blog });
		expect(container.querySelector('time')!.getAttribute('datetime')).toBe(
			'2026-05-14T09:00:00Z'
		);
	});

	it('reserves space for the cover image', async () => {
		const { container } = render(BlogCard, { blog });
		const media = container.querySelector('.media');
		expect(getComputedStyle(media!).aspectRatio).not.toBe('auto');
	});

	it('renders without a cover image', async () => {
		const { container } = render(BlogCard, { blog: { ...blog, photo_url: '' } });
		expect(container.querySelector('img')).toBeNull();
		expect(container.textContent).toContain('What a reasoning model actually does');
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:unit --run src/lib/components/BlogCard/`
Expected: FAIL. The current card renders a `<span>` date rather than a `<time>`, and has no `.media` element.

- [ ] **Step 3: Rewrite `src/lib/components/BlogCard/BlogCard.svelte`**

```svelte
<script lang="ts">
	import { browser } from '$app/environment';

	interface Blog {
		id: number;
		title: string;
		description: string;
		photo_url: string;
		post_slug: string;
		created_at: string;
	}

	interface Props {
		blog: Blog;
	}

	let { blog }: Props = $props();

	const formatDate = (value: string) =>
		new Date(value).toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});

	const stripHtml = (html: string) => {
		if (!html) return '';
		if (browser && typeof document !== 'undefined') {
			const tmp = document.createElement('div');
			tmp.innerHTML = html;
			return (tmp.textContent || tmp.innerText || '').trim();
		}
		return html
			.replace(/<[^>]*>/g, '')
			.replace(/&[^;]+;/g, ' ')
			.trim();
	};

	const summary = $derived(stripHtml(blog.description));
</script>

<article class="blog-card">
	<a href="/blog/{blog.post_slug}">
		{#if blog.photo_url}
			<span class="media card-media">
				<img src={blog.photo_url} alt="" width="800" height="500" loading="lazy" />
			</span>
		{/if}
		<span class="card-body">
			<time class="caption" datetime={blog.created_at}>{formatDate(blog.created_at)}</time>
			<span class="heading card-title">{blog.title}</span>
			<span class="body card-summary">{summary}</span>
		</span>
	</a>
</article>

<style>
	.blog-card a {
		display: grid;
		gap: 1.25rem;
		height: 100%;
	}

	.card-media {
		display: block;
		aspect-ratio: 8 / 5;
	}

	.card-body {
		display: grid;
		gap: 0.6rem;
		align-content: start;
	}

	.card-title {
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		letter-spacing: -0.02em;
		line-height: 1.18;
	}

	.card-summary {
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		font-size: 0.9375rem;
	}

	@media (hover: hover) and (pointer: fine) {
		.blog-card a:hover .card-title {
			color: var(--accent);
		}
	}
</style>
```

- [ ] **Step 4: Give the load function an error shape**

Replace `src/routes/blog/+page.server.ts`:

```ts
import type { PageServerLoad } from './$types';
import { PUBLIC_MINDPLEX_API_URL } from '$env/static/public';

/*
 * Returns an error shape rather than throwing, so the page can render a
 * designed error state instead of the framework error screen.
 */
export const load = (async ({ fetch }) => {
	try {
		const response = await fetch(`${PUBLIC_MINDPLEX_API_URL}/mp_landing/v1/blogs`);

		if (!response.ok) {
			return { blogs: [], success: false, errorMessage: 'The blog is not responding right now.' };
		}

		const data = await response.json();

		if (!data.success) {
			return {
				blogs: [],
				success: false,
				errorMessage: data.message ?? 'The blog is not responding right now.'
			};
		}

		return { blogs: data.blogs, success: true };
	} catch {
		return { blogs: [], success: false, errorMessage: 'The blog is not responding right now.' };
	}
}) satisfies PageServerLoad;
```

- [ ] **Step 5: Rewrite `src/routes/blog/+page.svelte`**

```svelte
<script lang="ts">
	import { BlogCard } from '$lib/components/BlogCard';

	const { data } = $props();

	type Blog = {
		id: number;
		title: string;
		description: string;
		photo_url: string;
		post_slug: string;
		created_at: string;
	};

	let searchQuery = $state('');

	const blogs = data.blogs as Blog[];

	const filteredBlogs = $derived(
		blogs.filter((blog) => {
			const query = searchQuery.toLowerCase();
			return (
				blog.title.toLowerCase().includes(query) ||
				blog.description.toLowerCase().includes(query)
			);
		})
	);
</script>

<svelte:head>
	<title>Mindplex | Blog</title>
	<meta
		name="description"
		content="Updates and insight from the team building Mindplex."
	/>
</svelte:head>

<main class="blog page-shell" id="main-content">
	<header class="blog-header">
		<p class="label">Blog</p>
		<h1 class="display-m">Notes from the build.</h1>
		<p class="body">Updates and insight from the team building Mindplex.</p>

		<div class="blog-search">
			<label class="caption" for="blog-search">Search posts</label>
			<input
				id="blog-search"
				type="search"
				bind:value={searchQuery}
				placeholder="Search by title or summary"
				autocomplete="off"
			/>
		</div>
	</header>

	{#if !data.success}
		<div class="blog-state" role="alert">
			<p class="heading">{data.errorMessage}</p>
			<p class="body">Try again in a moment. Everything else on Mindplex is unaffected.</p>
		</div>
	{:else if blogs.length === 0}
		<div class="blog-state">
			<p class="heading">Nothing published yet.</p>
			<p class="body">The first post will appear here.</p>
		</div>
	{:else if filteredBlogs.length === 0}
		<div class="blog-state">
			<p class="heading">No posts match "{searchQuery}".</p>
			<p class="body">Try a shorter search, or clear the field to see everything.</p>
		</div>
	{:else}
		<div class="blog-grid">
			{#each filteredBlogs as blog (blog.id)}
				<BlogCard {blog} />
			{/each}
		</div>
	{/if}
</main>

<style>
	.blog {
		padding-block: clamp(3rem, 6vw, 5rem) clamp(5rem, 10vw, 8rem);
	}

	.blog-header {
		display: grid;
		gap: 1rem;
		max-width: 44rem;
		margin-bottom: clamp(3rem, 6vw, 4.5rem);
	}

	.blog-search {
		display: grid;
		gap: 0.5rem;
		max-width: 24rem;
		margin-top: 1.5rem;
	}

	.blog-search label {
		color: var(--ink-muted);
	}

	.blog-search input {
		width: 100%;
		padding: 0.75rem 0.9rem;
		border: 1px solid var(--line-strong);
		border-radius: var(--radius-control);
		background: var(--surface);
		color: var(--ink);
	}

	.blog-search input::placeholder {
		color: var(--ink-faint);
	}

	.blog-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: clamp(2rem, 4vw, 3rem);
	}

	.blog-state {
		display: grid;
		gap: 0.75rem;
		padding: clamp(2.5rem, 6vw, 4rem);
		border: 1px solid var(--line);
		border-radius: var(--radius-media);
		background: var(--surface);
		text-align: center;
		justify-items: center;
	}
</style>
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `pnpm test:unit --run src/lib/components/BlogCard/`
Expected: PASS, 5 passed.

- [ ] **Step 7: Verify the states in the browser**

Open `http://localhost:5199/blog`. Confirm the grid renders. Type a nonsense string into the search field and confirm the empty state appears with the query echoed back. Confirm the placeholder text passes AA by inspecting `.blog-search input::placeholder` colour against `--surface`.

- [ ] **Step 8: Commit**

```bash
git add src/routes/blog src/lib/components/BlogCard
git commit -m "feat(blog): rebuild index and card, add empty and error states"
```

---

### Task 17: Roadmap

**Files:**
- Modify: `src/routes/roadmap/[quarter]/+page.svelte`

**Interfaces:**
- Consumes: `channels` from Task 2, type scale from Task 3.
- Produces: nothing consumed by later tasks. The load function at `src/routes/roadmap/[quarter]/+layout.server.ts` is untouched.

- [ ] **Step 1: Replace the colour palette with the canonical channels**

In the `<script>` block of `src/routes/roadmap/[quarter]/+page.svelte`, delete the `colorPalette` array and its `#83E9FF / #EE83FF / #5BFFB0 / #FFB05B` values, and replace the palette logic with:

```ts
	import { channels } from '$lib/design/channels';

	const baseYear = 2023;

	/* Years cycle through the canonical desks, same mechanism as before. */
	const getChannel = (year: string) => {
		const index = (parseInt(year, 10) - baseYear) % channels.length;
		return channels[index < 0 ? index + channels.length : index];
	};

	const getYear = (slug: string) => {
		const delimiter = slug.includes('_') ? '_' : '-';
		const [, year = String(baseYear)] = slug.split(delimiter);
		return year;
	};

	const activeChannel = getChannel(getYear(active));
```

Every later reference to `getColors`, `colors.text`, `colors.bg`, `activeColors.text` and `activeColors.boxColors` becomes `getChannel`, `channel.hex` and `activeChannel.hex`.

- [ ] **Step 2: Remove the neon glows and rebuild the timeline markers**

Replace the timeline `{#each}` block:

```svelte
		<div class="absolute -top-10 flex w-full flex-row justify-evenly md:-top-14">
			{#each roadmap as { slug, name }}
				{@const channel = getChannel(getYear(slug))}
				{@const isActive = slug === active}
				<div class="timeline-node" class:is-active={isActive} style="--ch: {channel.hex}">
					<span class="label node-name">{name}</span>
					<a href={`/roadmap/${slug}`} rel="external" aria-label="Roadmap for {name}">
						<span class="node-dot"></span>
					</a>
				</div>
			{/each}
		</div>
```

- [ ] **Step 3: Replace the alternating step fills with a channel rule**

Replace the content `{#each}` block:

```svelte
	{#each filteredContent as { content_title, desc }}
		<div class="step" style="--ch: {activeChannel.hex}">
			<h3 class="heading step-title">{content_title}</h3>
			<div class="body step-detail">{@html desc}</div>
		</div>
	{/each}
```

And the active-quarter heading:

```svelte
	<h1 class="display-m roadmap-title" style="color: {activeChannel.hex}">
		{roadmapContent[0].description?.trim()}
	</h1>
```

- [ ] **Step 4: Add the component styles**

Append to `src/routes/roadmap/[quarter]/+page.svelte`:

```svelte
<style>
	.timeline-node {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		transition: transform 240ms var(--ease-out);
	}

	.timeline-node.is-active {
		transform: scale(1.06);
	}

	.node-name {
		color: var(--ch);
		opacity: 0.45;
		transition: opacity 240ms ease;
	}

	.timeline-node.is-active .node-name {
		opacity: 1;
	}

	/*
	 * State is carried by fill opacity and a ring, not by a neon glow.
	 * The previous box-shadow bloom read as decoration rather than state.
	 */
	.node-dot {
		display: block;
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 50%;
		background: var(--ch);
		opacity: 0.3;
		transition:
			opacity 240ms ease,
			box-shadow 240ms ease;
	}

	.timeline-node.is-active .node-dot {
		opacity: 1;
		box-shadow: 0 0 0 4px color-mix(in srgb, var(--ch) 22%, transparent);
	}

	.roadmap-title {
		margin: 5rem 0 3rem;
		text-align: center;
	}

	.step {
		display: grid;
		grid-template-columns: minmax(10rem, 0.4fr) minmax(0, 1fr);
		gap: clamp(1.5rem, 4vw, 3rem);
		padding: 1.75rem 0 1.75rem 1.25rem;
		border-left: 2px solid var(--ch);
		border-bottom: 1px solid var(--line);
	}

	.step-title {
		margin: 0;
	}

	.step-detail :global(p) {
		margin: 0 0 0.75rem;
	}

	@media (max-width: 48rem) {
		.step {
			grid-template-columns: 1fr;
			gap: 0.75rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.timeline-node,
		.node-name,
		.node-dot {
			transition: none;
		}
	}
</style>
```

- [ ] **Step 5: Verify**

Run: `pnpm check`
Expected: 0 errors.

Open `http://localhost:5199/roadmap` and step through each quarter. Confirm the year colours cycle through the four canonical channels, no dot glows, and the type sizes come from the scale rather than jumping `text-xs` to `text-3xl`.

- [ ] **Step 6: Commit**

```bash
git add src/routes/roadmap
git commit -m "feat(roadmap): canonical channels, drop the neon glow markers"
```

---

# Phase 5: Verification

### Task 18: Full-site verification

**Files:**
- Modify: `e2e/signal.test.ts`
- Delete: `e2e/demo.test.ts`, `src/demo.spec.ts`

**Interfaces:**
- Consumes: every previous task.
- Produces: the acceptance suite.

- [ ] **Step 1: Extend the e2e suite**

Append to `e2e/signal.test.ts`:

```ts
test('navigation fits one line at desktop and stays under 80px', async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto('/');

	const header = page.locator('.site-header');
	const box = await header.boundingBox();
	expect(box!.height).toBeLessThanOrEqual(80);

	const links = page.locator('.desktop-links a');
	const tops = await links.evaluateAll((els) =>
		els.map((el) => Math.round(el.getBoundingClientRect().top))
	);
	expect(new Set(tops).size).toBe(1);
});

test('the hero fits the first viewport, CTAs included', async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto('/');

	const cta = page.getByRole('link', { name: 'Open Mindplex' }).nth(1);
	const box = await cta.boundingBox();
	expect(box!.y + box!.height).toBeLessThanOrEqual(900);
});

test('every section reveals without scroll-driven animation support', async ({ page }) => {
	await page.goto('/');
	await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
	await page.waitForTimeout(900);

	const hidden = await page.evaluate(() =>
		[...document.querySelectorAll('.section-reveal')].filter(
			(el) => getComputedStyle(el).opacity === '0'
		).length
	);
	expect(hidden).toBe(0);
});

test('reduced motion reveals everything immediately', async ({ browser }) => {
	const context = await browser.newContext({ reducedMotion: 'reduce' });
	const page = await context.newPage();
	await page.goto('/');

	const hidden = await page.evaluate(() =>
		[...document.querySelectorAll('.section-reveal')].filter(
			(el) => getComputedStyle(el).opacity === '0'
		).length
	);
	expect(hidden).toBe(0);
	await context.close();
});

test('the focus ring is visible on the primary CTA', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'Open Mindplex' }).first().focus();

	const outline = await page.evaluate(() => {
		const el = document.activeElement as HTMLElement;
		const style = getComputedStyle(el);
		return { width: style.outlineWidth, offset: style.outlineOffset };
	});
	expect(outline.width).toBe('2px');
	expect(outline.offset).toBe('4px');
});

for (const path of ['/', '/blog', '/roadmap', '/campaign']) {
	test(`${path} renders on one theme with no horizontal overflow at mobile`, async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto(path);

		const overflow = await page.evaluate(
			() => document.documentElement.scrollWidth > document.documentElement.clientWidth
		);
		expect(overflow).toBe(false);

		const background = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
		expect(background).toBe('rgb(18, 19, 23)');
	});
}
```

- [ ] **Step 2: Remove the scaffold tests**

```bash
rm e2e/demo.test.ts src/demo.spec.ts
```

- [ ] **Step 3: Run the full suite**

Run: `pnpm test`
Expected: every unit and e2e test passes.

- [ ] **Step 4: Run the checks**

Run: `pnpm check && pnpm lint`
Expected: 0 errors, 0 warnings.

- [ ] **Step 5: Walk every route in the browser**

At 1440x900 and again at 390x844, open `/`, `/blog`, a blog post, `/roadmap`, each roadmap quarter, and `/campaign`. For each, confirm:
- one theme throughout, no section inverts
- one accent on every interactive element
- no channel hue used as a large fill
- no neon glow, no gradient text, no pulsing dot, no blur blob
- every CTA label matches the vocabulary table

Record anything that fails rather than fixing it silently.

- [ ] **Step 6: Commit**

```bash
git add e2e src
git commit -m "test: full-site acceptance suite for the Signal redesign"
```

---

## Open questions carried from the spec

These do not block implementation. Each has a defined interim behaviour.

1. **Desk names** `Intelligence / Cosmos / Mind / Commons` need editorial sign-off. Interim: implemented as `label` fields in `src/lib/design/channels.ts`, renameable in one place.
2. **Reputation data.** Interim: `Byline` is rendered with `illustrative={true}`, which shows a visible "Example" marker. Flip to `false` only when wired to real MPXR data.
3. **`/campaign` status.** Interim: restyled and left published, with its `magazine.mindplex.ai` references unchanged. If the campaign is dormant the route should be unpublished; that is a content decision.
4. **Hero lead image.** Resolved in Task 14, decision recorded in that commit message.
