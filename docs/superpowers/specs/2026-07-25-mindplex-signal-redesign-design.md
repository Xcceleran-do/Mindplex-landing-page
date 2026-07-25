# Mindplex site redesign: Signal

Date: 2026-07-25
Branch: `redesign/signal`
Status: design spec, awaiting review
Companion: [design assessment](../../design/2026-07-25-design-assessment.md)

---

## 1. What this is

A full visual redesign of the Mindplex marketing site, keeping the positioning, information architecture and copy strategy established by the in-progress refactor on `main`, and replacing the visual language.

**In scope:** `/`, `/blog`, `/blog/[slug]`, `/roadmap`, `/roadmap/[quarter]`, `/campaign`, plus the shared shell (Navbar, Footer) and the token layer in `app.css`.

**Out of scope:** the beta product at `beta.mindplex.ai` (separate repo), the WordPress API, authentication, and any change to route slugs or anchor IDs.

**Preserved without change:** URL structure, anchor IDs (`#why`, `#inside`, `#trust`, `#community`), all outbound links to `beta.mindplex.ai`, the Mindplex wordmark and mark, and the API contracts in `+page.server.ts` / `+layout.server.ts`.

---

## 2. Design read

The front door to an independent futurist publication and community, for readers who follow AI, neuroscience, space, consciousness and cyberculture, and for the writers and researchers who want to publish into that room.

Dials: `DESIGN_VARIANCE 8` · `MOTION_INTENSITY 6` · `VISUAL_DENSITY 4`
Mode: redesign, overhaul. Content and IA preserved; visual language replaced.

The direction is called **Signal**: the four brand hues that already exist in three uncoordinated places across the codebase become one canonical system of **editorial channels**, and the page is organised around them.

---

## 3. Token system

All tokens live in `src/app.css` under `:root`. No Tailwind theme extension for these. They are consumed as CSS custom properties so the roadmap and blog routes can use them from inline styles where they currently use hardcoded hexes.

### 3.1 Channels

Four editorial desks. Each is tuned to relative luminance 0.470, giving every channel exactly 9.19:1 against `--page`. No channel reads louder than another; all pass WCAG AA for small text and AAA for large.

| Token | Hex | Desk | Existing topics it covers |
| --- | --- | --- | --- |
| `--ch-intelligence` | `#22D07F` | Intelligence | `topics/ai`, `topics/robotics` |
| `--ch-cosmos` | `#87B9FC` | Cosmos | `topics/space` |
| `--ch-mind` | `#F598D9` | Mind | `topics/consciousness`, `topics/cyberpunk` |
| `--ch-commons` | `#EAAB3F` | Commons | `topics/blockchain` |

Every desk label links to a real beta topic route. A desk is a landing-page grouping over existing topics, never a new URL and never a new taxonomy in the product.

**The rule that keeps four hues from becoming noise:**

- Channel hues are used **only** for semantic category marking: topic labels, story categories, desk headings, channel band cells, roadmap year markers.
- **Every interactive element on the site uses one accent: `--accent`, set to `--ch-intelligence`.** Every button, link hover, focus ring and inline link is that one green, sitewide. No blue CTAs, no magenta buttons.
- A channel hue never appears as a large fill. Maximum surface for a channel is a label, a 1px rule, a small chip, or a gradient at ≤26% opacity.

This is categorical data colour, not decoration, which is why it does not break the single-accent discipline.

### 3.2 Surfaces and ink

Carried over from the refactor unchanged. These are already correct and already match the beta product.

```
--page:           #121317
--surface:        #191B20
--surface-strong: #202329
--ink:            #EDF0F3
--ink-muted:      #A8ADB5
--ink-faint:      #747A84
--line:           rgba(237, 240, 243, 0.13)
--line-strong:    rgba(237, 240, 243, 0.24)
--on-accent:      #0B1410
```

Dark only, page-level lock. No section inverts. `color-scheme: dark`.

### 3.3 Radii and easing

One radius scale, applied everywhere. Two values, no pills, no sharp corners, no exceptions:

```
--radius-control: 0.625rem   /* buttons, inputs, chips */
--radius-media:   0.75rem    /* images, contained surfaces, cards */
```

```
--ease-out:    cubic-bezier(0.23, 1, 0.32, 1)
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)
```

---

## 4. Typography

### 4.1 Faces

Two self-hosted variable/static WOFF2 files, already committed to `static/fonts/`. Total latin payload 102KB.

**Michroma** (`michroma-latin.woff2`, 12KB, single weight 400) is the brand utility face.
Permitted uses, and no others:
- the wordmark in Navbar and Footer
- channel and desk labels
- section markers
- eyebrows

Always uppercase, always `0.10em` to `0.14em` tracking, always between 11px and 13px, with one exception: the wordmark may go to 2rem. **Michroma is never used for a headline, a paragraph, a button label, or any string longer than three words.**

**Archivo Variable** (`archivo-var-latin.woff2`, 90KB, `wght 100-900`, `wdth 62-125`) carries display and body.
The width axis is the reason this face was chosen: expanded display settings echo Michroma's wide geometry so the two faces share a skeleton instead of colliding.

Both declared with `font-display: swap` and preloaded in `app.html`. `archivo-var-latin-ext.woff2` is declared with the latin-ext unicode-range but not preloaded.

### 4.2 Scale

| Role | Size | `wdth` | `wght` | Tracking | Leading |
| --- | --- | --- | --- | --- | --- |
| Display XL | `clamp(3.25rem, 6.5vw, 5.5rem)` | 112 | 620 | `-0.045em` | 0.94 |
| Display L | `clamp(2.25rem, 4vw, 3.5rem)` | 108 | 620 | `-0.038em` | 0.98 |
| Display M | `clamp(1.75rem, 2.6vw, 2.25rem)` | 104 | 640 | `-0.028em` | 1.04 |
| Heading | `1.375rem` | 100 | 650 | `-0.015em` | 1.20 |
| Body L | `1.1875rem` | 100 | 400 | `0` | 1.60 |
| Body | `1rem` | 100 | 400 | `0` | 1.65 |
| Caption | `0.8125rem` | 100 | 500 | `0.004em` | 1.50 |
| Label (Michroma) | `0.6875rem` | n/a | 400 | `0.12em` | 1.30 |

Tracking is size-specific by design: display tightens as it grows, body sits at zero, caption opens slightly. Numbers use `font-variant-numeric: tabular-nums` on Archivo; no separate mono family.

**Descender clearance:** any display line containing `y g j p q` gets `line-height` no lower than 1.0 plus `padding-bottom: 0.08em` on the wrapping element. This specifically fixes `Context over virality.` which currently sets `line-height: 0.83`.

### 4.3 Display headline budget

At most **three** Display XL/L moments on the homepage: the hero, the manifesto, and the final CTA. Every other section uses Display M or Heading. The footer gets no display headline at all.

---

## 5. The signature: the channel band

Replaces the current `topic-rail` marquee.

**What it is.** A full-width band directly under the hero, divided into four cells, one per desk. Each cell carries its desk label in Michroma tinted with the channel hue, and the latest headline from that desk.

**Resting state.** Near-monochrome. Each cell shows a bottom-anchored gradient of its channel hue at 10% opacity, the desk label in full channel colour, and the headline in `--ink-muted`. Read as a quiet four-column index.

**Active state.** On pointer hover, or on scroll progress through the band, one cell comes forward: its gradient rises to 26%, its headline lifts to `--ink`, and the other three recede to line-work. One channel is active at a time.

**Why it earns its place.** It states the product argument visually (four desks, one page) rather than describing it in another headline, it doubles as topic navigation into the beta's real topic routes, and it is the one thing on the page a visitor will remember. It is also the only marquee-class device on the site.

**Reduced motion.** Collapses to a static four-column index with all four cells at rest. No transition on the gradient. The cells remain links and remain keyboard-focusable.

**Fallback.** Built with CSS transitions on hover plus an `IntersectionObserver` for scroll-driven activation. `animation-timeline: view()` is not required for it to work.

---

## 6. Page specifications

### 6.1 Homepage `/`

Nine sections, eight layout families. Only "full-width statement" appears twice (manifesto and final CTA), and those are the two moments where a single sentence is the whole point. This replaces the current page, where seven of nine sections open with the identical Display headline over a hairline list.

| # | Section | Layout family | Notes |
| --- | --- | --- | --- |
| 1 | Hero | Asymmetric split | Michroma eyebrow, Display XL (2 lines max), deck ≤20 words, `Open Mindplex` + `Read the magazine`. Right column is one lead image with a channel-tinted frame. |
| 2 | Channel band | Signature | Section 5. |
| 3 | Manifesto | Full-width statement | The second and last Display XL. |
| 4 | Three ways in | Three panels with imagery | **Numbering removed.** These are parallel entry points, not a sequence. Each panel gets a real image and a channel tint. |
| 5 | Stories | Editorial grid | Graded thumbnails, category label in channel colour. |
| 6 | Trust and reputation | Attribution device | See below. |
| 7 | AI in the workflow | Horizontal progression | **Numbering kept.** Find → Filter → Shape → Publish is a real sequence. Replaces the four bordered cells. |
| 8 | Destinations | Index | Six beta routes. Hover uses `transform`, not `padding`. |
| 9 | Final CTA | Full-width statement | Display L. |

**Hero constraints.** Top padding ≤ `pt-24` at desktop. Maximum four text elements: eyebrow, headline, deck, CTA pair. `min-height` uses `100dvh` minus header, but content is top-aligned within the first 80% rather than centred, so it does not float on tall displays.

**Section 6, trust and reputation.** This is Mindplex's genuinely distinctive editorial claim and currently it is three hairline rows. It becomes a concrete device: a rendered author line showing byline, desk channel, publication date, and an earned-standing indicator derived from contribution rather than follower count. It shows what reputation looks like on a Mindplex article instead of describing it in prose.

> **Open question for the editors:** whether the standing indicator can show real MPXR-derived data, or whether it must be presented as an illustrative example. If it cannot be real, it is labelled as an example in the markup. No invented metrics ship either way.

### 6.2 Navbar

- Height 65px, matching the beta. Single line at desktop.
- Wordmark in Michroma.
- Links unchanged: `Why Mindplex`, `Inside`, `Trust`, `Community`.
- Actions: `Sign in` (text link) and `Open Mindplex` (primary).
- Translucent: `backdrop-filter: blur(20px) saturate(145%)` over `rgba(18,19,23,0.9)`, with a solid fallback under `prefers-reduced-transparency`.
- The scroll boundary becomes a gradient mask rather than a 1px border.

### 6.3 Footer

- **The Display headline is removed.** It currently restates the hero one screen below the final CTA.
- Opens with the wordmark and a single Body L line, then the three link columns, then the legal row.
- Column headings move to Michroma labels.

### 6.4 CTA vocabulary

One label per intent, everywhere on the site. This resolves the current four-labels-for-two-intents problem.

| Intent | Label |
| --- | --- |
| Enter the platform | `Open Mindplex` |
| Authenticate | `Sign in` |
| Contribute work | `Start writing` |
| Browse editorial | `Read the magazine` |

`Enter Mindplex`, `Explore the magazine`, `Browse the latest stories`, `Contribute to Mindplex` and `Meet the community` are all retired.

### 6.5 Blog `/blog`

Currently the least-touched page and fully un-refactored: a pulsing dot in a glass pill, gradient clip-text on the H1, two blurred gradient blobs, and `BlogCard` with a gradient-on-hover title, an `opacity-0` reveal arrow, a hand-rolled SVG calendar icon and a decorative quarter-circle gradient.

Rebuilt as:
- Michroma eyebrow, Display L heading, no gradient text, no blur blobs, no pulsing dot.
- Search input styled to the token system, label above the field, WCAG AA placeholder contrast. Currently the field is unlabelled.
- `BlogCard` rewritten: graded thumbnail with a reserved aspect ratio, date in Caption with `tabular-nums`, title in Heading, no gradient hover, no hand-rolled SVG. Icons come from `@lucide/svelte`, which is already a dependency, at a single global `strokeWidth`.
- **Empty and error states added.** `filteredBlogs` can return zero results from the search box and there is currently no empty state. The `+page.server.ts` throws on API failure with no designed error surface.

### 6.6 Blog post `/blog/[slug]`

- `prose-a:text-cyan-700` is a contrast failure on a dark background. Links become `--accent`.
- A real prose scale on the token system: measure capped at 68ch, Display M for `h1`, Heading for `h2`, Body L for paragraphs.
- The `onMount` YouTube embed rewriter is kept but given a reserved aspect-ratio container so it stops causing layout shift.

### 6.7 Roadmap `/roadmap/[quarter]`

- The per-year palette `#83E9FF / #EE83FF / #5BFFB0 / #FFB05B` is replaced by the four canonical channels, cycled by year exactly as now. Same mechanism, canonical values.
- The glowing dots (`box-shadow: 0 0 15px, 0 0 30px`) lose the neon glow. Active state is communicated by fill opacity, scale and a channel-coloured rule.
- `boxColors` alternating fills on step rows are replaced by a single surface with a channel-coloured leading rule.
- Font sizes currently jump `text-xs → text-sm → text-3xl` across breakpoints with no intermediate step. Replaced by the type scale.
- The timeline keeps working from the live API; no change to `+layout.server.ts`.

### 6.8 Campaign `/campaign`

Currently `{@html marked(content)}` into a bare `prose` container with the same `text-cyan-700` link problem.

- Same prose treatment as the blog post route.
- The content references `magazine.mindplex.ai` while the rest of the site has moved to `beta.mindplex.ai`.

> **Open question:** is this campaign still running? It offers a monthly prize pool. If it is dormant the route should be unpublished rather than restyled; if it is live the domain references need updating. This is a content decision, not a design one.

---

## 7. Imagery

**The problem being solved.** Three images on a 7,800px page, one of which (`mark-fisher-film.webp`, saturated cyan) breaks the palette, one of which (`artemis-moon-window.webp`) is near-black on a near-black surface, and one of which (`tony-parisi-interview.webp`) is a flat daylight snapshot.

**Grade pass.** A single CSS treatment applied to every editorial image so the page reads as one publication:
- a desaturation floor so nothing out-saturates the channel hues
- black point lifted to meet `--page`, so images sit on the surface instead of punching a hole in it
- a channel-hue tint at low opacity on the **frame**, never on the photograph

Photographs are not duotoned or recoloured. Reporting imagery keeps its integrity; cohesion comes from the frame and the black point.

**Density.** Minimum one visual per two sections. Sections 1, 4, 5 and 6 carry imagery.

**Sourcing.** No hand-rolled decorative SVG, no div-based fake screenshots. Assets come from the beta product's real editorial library. Every slot that needs an asset I cannot source is left as a labelled placeholder with its required dimensions and reported back, not filled with a substitute.

**The hero lead image** needs either a replacement with more tonal range or an exposure lift plus scrim so the subject reads at a glance. Flagged as a specific asset decision.

**Performance.** Hero image `fetchpriority="high"`, explicit `width`/`height` on every image to reserve space, everything below the fold `loading="lazy"`.

---

## 8. Motion

`MOTION_INTENSITY 6`. Every animation below has a stated job.

| Moment | Job | Implementation |
| --- | --- | --- |
| Hero entry stagger | Establishes reading order on load | CSS `animation-delay` cascade, 70/125/180ms |
| Channel band activation | Feedback, and reveals which desk is in focus | CSS transition on hover, `IntersectionObserver` on scroll |
| Section reveals | Pacing on a long page | `IntersectionObserver` adding a class, with `animation-timeline: view()` as progressive enhancement |
| Button press | Confirms the interface heard the user | `transform: scale(0.97)`, 140ms `--ease-out` |
| Image hover | Affordance on a link | `transform: scale(1.018)`, 500ms |

**The current reveal implementation is the bug being fixed.** It sits inside `@supports (animation-timeline: view())` with no fallback, so in Firefox and older Safari the page is entirely static. The `IntersectionObserver` path becomes the baseline and the scroll-driven version the enhancement.

No layout-triggering property is animated: no `width`, `height`, `padding`, `margin`, `top` or `left`. All movement is carried by `transform` and `opacity`; paint-only transitions such as `background-color` and `box-shadow` are permitted on interactive states. The destination grid's current `padding` transition on hover is replaced with `transform`.

`prefers-reduced-motion: reduce` collapses all of the above to static or to short opacity cross-fades. Nothing loops perpetually at any setting.

---

## 9. Quality floor

Non-negotiable before this is called done:

1. Every CTA passes WCAG AA against its background. `--accent` on `--on-accent` is 9.2:1.
2. Every form control has a label above the field, AA placeholder contrast, and a visible focus ring.
3. Empty, loading and error states exist for `/blog` search and both API-backed routes.
4. Keyboard navigable end to end, with a visible focus ring at 2px offset 4px.
5. `prefers-reduced-motion`, `prefers-reduced-transparency` and `prefers-contrast` all honoured.
6. Mobile collapse declared explicitly per section. `min-h-[100dvh]`, never `h-screen`.
7. LCP < 2.5s, CLS < 0.1. No remote runtime dependency in the hero.
8. Zero em-dashes in any user-visible string.
9. No `Al` where `AI` is meant, anywhere in the tree.
10. `pnpm check` and `pnpm lint` clean; existing Playwright and Vitest suites pass.

---

## 10. Decisions taken

- **Four hues, one accent.** Channels are semantic; interaction is monochrome green. This is what makes a multi-hue system safe on a marketing page.
- **Michroma stays small.** It is a one-weight, very wide face. Used as a utility label face it carries the brand; used as a display face it is unreadable.
- **Archivo over Geist or Inter.** Its width axis lets display type echo Michroma's geometry. Honest limitation: Archivo is a well-built workhorse, not a statement face. The identity is carried by Michroma plus channel colour, with Archivo as the disciplined substrate.
- **Numbering only where content is sequential.** Removed from the three entry modes, kept on the four workflow steps.
- **The footer loses its headline.** Restating the hero one screen after the final CTA is headline fatigue, not reinforcement.

## 11. Open questions carried into implementation

1. Desk names `Intelligence / Cosmos / Mind / Commons` need editorial sign-off. They are implemented as tokens so they can be renamed without structural rework.
2. Whether the reputation indicator in section 6 can show real MPXR-derived data or must be labelled as an example.
3. Whether `/campaign` is still live, and if so whether its `magazine.mindplex.ai` references should move to `beta.mindplex.ai`.
4. Whether the hero lead image is replaced or graded.
