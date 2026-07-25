# Mindplex landing: design assessment

Date: 2026-07-25
Scope: `mindplex.ai` (production), the in-progress refactor on `main` (unstaged), and brand material in the sibling repos.
Supersedes the framing in `DESIGN-AUDIT.md`, which covered production only.

---

## Design read

Reading this as: **the front door to an independent futurist publication and community**, for readers who follow AI, neuroscience, space, consciousness and cyberculture, plus the writers and researchers who want to publish into that room. Not a token launch, not a SaaS product page, not a second content site.

Dials: `DESIGN_VARIANCE 8` · `MOTION_INTENSITY 6` · `VISUAL_DENSITY 4`.
Mode: **redesign, overhaul** — content and IA are being kept, the visual language is being replaced.

---

## Part 1 — What is wrong with production

### 1.1 Positioning

The hero leads with the implementation, not the reader: "Blockchain-based Decentralized Media Network." The subject of the sentence is the infrastructure. Nothing on the first screen tells a visitor what they get.

Nine top-level nav items carry equal weight (About, Our AI, Roadmap, Tokens, Blog, Team, Whitepaper, Contact Us, Join Mindplex). Four of those are investor-relations surfaces sitting in a reader's navigation. The single CTA, "Explore Magazine," points at a product the page never describes.

### 1.2 Content that damages credibility

These are shipped to production right now:

- **An unfinished formula.** The governance card ends: `f(x) = T + sqrt(x-T), for x › T with T = XXX`. It also contains OCR garbage: `tIP`, `x :/ T`, `›` instead of `>`.
- **"anyone can stake MPX and we compensate handsomely."** Lowercase sentence start, and language no institution can use about a financial instrument.
- **`Al` instead of `AI`, throughout.** Capital A, lowercase L. It appears in `OurAi.ts` and `MindplexToken.ts` repeatedly. This is a PDF copy-paste artifact that was never proofread, on an AI company's website.
- **"creditability metrics"**, "Our vision" in lowercase next to five ALL-CAPS siblings.

A visitor who notices any one of these stops trusting the editorial claim on the same page. This is a larger problem than any visual defect.

### 1.3 Visual system

The page is a crypto landing-page kit:

- Remote Spline 3D scene loaded at runtime in the hero (`prod.spline.design/VEuho3NWmFQK-bnv`) — a network dependency in front of the value proposition, and an LCP risk.
- Three `animate-pulse` blurred gradient circles positioned absolutely behind the hero, with staggered `animation-delay`. Decoration tied to nothing.
- Gradient clip-text on the H1.
- A pulsing dot inside a glass pill labelled "Next-Gen Media Platform" — a decorative status indicator carrying no state.
- Six token cards, each with an arbitrary hardcoded background: `#354057`, `#958834`, `#57908C`, `#668744`, `#41789F`, `#D85E4C`. Six unrelated colors. There is no palette; there are six one-off decisions.
- Every section is a card, so hierarchy collapses. Nothing on the page is more important than anything else.

---

## Part 2 — The refactor: what it got right, and where it stops

The unstaged work on `main` is a real improvement and the strategy behind it is correct. Positioning moved from infrastructure to outcome ("Make sense of what comes next"). Tokens are unified. Spline is gone. Reduced-motion and reduced-transparency are honored. Focus states are systematised. Copy is disciplined. Keep all of that.

It stops short in seven places, and they are the reason it still reads as templated.

### 2.1 There is no typeface

`src/app.css:80` — the entire page runs on `-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial`.

Everything the page does typographically — `letter-spacing: -0.065em`, `font-weight: 620`, `line-height: 0.91` — is applied to SF Pro Display. On a Mac it looks like Apple marketing. On Windows it becomes Segoe UI at weight 600 and the identity evaporates. On Linux it is whatever is installed.

This is the single biggest reason the page reads as generic. A landing page whose display face is the operating system's default has outsourced its personality.

**And there is a brand face already in the building:** the beta product ships `Michroma.ttf`, `Barlow-Regular.ttf` and `TrainOne-Regular.ttf` in `mindplex-futuristic-theme/static/`. Michroma is the Mindplex display face. The landing page uses none of them.

### 2.2 The brand is being actively contradicted

The Mindplex mark (`static/mindplex-mark.svg`) is a magenta → violet → blue → teal gradient: `#E02DA7` → `#8E43BC` → `#295FD6` → `#17995E`.

The page is mint-only, `#59c99a`.

So the logo is the only saturated, multi-hue object on a 7,800px monochrome page, sitting in the top-left corner of every screen, matching nothing. It reads as a foreign object. Either the mark is wrong or the palette is wrong — right now they are simply unrelated.

The beta product also defines a real secondary palette that the landing page ignores entirely:

| Token | Value |
| --- | --- |
| `--color-mindplex-green-300` | `#8AFFC3` |
| `--color-mindplex-pink-400` | `#FF8ADE` |
| `--color-mindplex-blue-300` | `#81C1FF` |
| `--color-mindplex-orange-400` | `#D1A349` |
| `--color-mindplex-black-100` | `#1F1F1F` |

Mindplex has a four-hue identity. The landing page chose one flat green that is not any of them.

### 2.3 The imagery is article thumbnails, not art direction

Three images on the entire page.

- **Hero (`artemis-moon-window.webp`).** Near-black photograph on a `#121317` background. At 1440px the hero's right half reads as a dark rectangle with a small grey circle in it. The subject is genuinely good; the tonal range is wrong for this surface, and nothing has been done to it.
- **`mark-fisher-film.webp`.** A saturated cyan film poster. It is the brightest, loudest thing on the page and it belongs to a completely different color world. The color-consistency lock is broken by a thumbnail.
- **`tony-parisi-interview.webp`.** Two people on a patio sofa in flat daylight. It is a real photo of a real conversation, which is honest, but as a design asset on a marketing page it looks like a snapshot pasted into a layout.

The rest of the page — roughly 6,000 vertical pixels — has no visual asset of any kind. That is not minimalism; it is an unfinished page.

### 2.4 Every section is the same section

Nine consecutive typographic moments, all the same move: a huge left-aligned display headline at `clamp(2.8rem, 5.2vw, 5.25rem)`, `font-weight: 590`, `letter-spacing: -0.055em`, followed by a grey paragraph, followed by hairline-separated rows.

- More than a magazine. Less noise than a feed.
- One platform. Three ways in.
- A living publication, not a content machine.
- Trust should follow the work.
- AI belongs in the newsroom, not above it.
- The future needs participants, not spectators.
- Choose your entry point.
- What comes next is still being written.
- AI, media, and community intelligence. *(footer, restating the hero)*

Each line is well written. Together they are exhausting, and nothing is memorable because everything is set at maximum. The hairline-row list pattern is used three separate times (`.entry-list`, `.trust-copy ul`, `.destination-grid`).

### 2.5 Dead space is doing the work that composition should do

- The trust section's left column holds four words and then roughly 500px of nothing.
- The hero's left column has a large void above the eyebrow before the copy begins.
- `.hero` uses `min-height: calc(100dvh - 4.0625rem)` with `align-items: center`, so on a tall display the copy floats in the middle of an empty field and the image column stretches to match.

Airiness has to be composed. Right now the gaps are a by-product of centering short content in tall containers.

### 2.6 Motion is claimed but not delivered

The whole motion budget is: one 32s marquee (`topic-loop`), a four-step hero stagger, and section reveals.

The section reveals are behind `@supports (animation-timeline: view())`. In any browser without scroll-driven animation support, that block does nothing and the page is static — with no IntersectionObserver fallback. There is no signature moment anywhere on the page, and no interaction that belongs to Mindplex specifically.

### 2.7 CTA labels are not consistent

On one page: `Sign in` and `Open Mindplex` in the nav, `Enter Mindplex` in the hero, `Enter Mindplex` in the final CTA, `Contribute to Mindplex` and `Meet the community` in the community section. Two intents, four labels. Pick one verb per intent and use it everywhere.

### 2.8 Smaller items

- `.trust-statement p` sets `line-height: 0.83` on text containing "virality." — the `y` descender has no clearance.
- The footer's lead headline duplicates the final CTA one screen above it.
- `.destination-grid > a:hover` transitions `padding`, which triggers layout on every hover. Use `transform`.
- `01 / 02 / 03` markers on "Read deeply / Track change / Join the exchange" imply a sequence. These are three parallel entry points, not steps. The numbering encodes something untrue. The `Find / Filter / Shape / Publish` numbering is fine — that *is* a sequence.

---

## Part 3 — Where the design direction should come from

The material is already here, and none of it is being used.

**The name.** A "mindplex," in Ben Goertzel's usage, is a set of minds coupled tightly enough to think as one while staying individual. That is the product: individual authorship plus collective intelligence, with the seam visible. The logo already draws it — a synapse, a network, two lobes.

**The subject matter.** AI, robotics, space, consciousness, cyberculture, decentralization. The instruments of that world are legible: spectra, signal traces, orbital diagrams, neural graphs, telemetry. This is not an excuse for sci-fi decoration; it is a source of structural devices that mean something.

**The four-hue palette.** Green, pink, blue, orange already exist in the product. Used as topic coding rather than decoration, they solve the logo problem and give every section a reason to differ.

**MPXR / reputation.** Mindplex's genuinely distinctive editorial claim is that credibility is earned and visible. That is a design problem worth solving on the page, not a bullet in a list.

---

## Part 4 — Three directions

### A. Signal — *recommended*

A dark editorial system where the four brand hues are **topic channels**, not decoration. Every story, topic and section inherits one channel color; the logo finally sits inside its own palette instead of fighting it. Display type is a real wide grotesk (Michroma, or a licensed alternative, used sparingly at large sizes only) against a workhorse body face. The signature is a **live topic spectrum** in the hero: the six topics rendered as a horizontal signal band, each channel colored, where hovering or scrolling brings one channel forward and pulls the current story with it. One idea, executed properly, that no other AI-media site has.

Risk: the four-hue system needs discipline or it becomes noise. Mitigated by keeping surfaces monochrome and letting color appear only on channel markers, story categories and one accent per section.

### B. Broadcast

Treat the landing page as a front page, not a marketing page. Real stories, real bylines, real dates, pulled from the beta. Dense, gridded, high information rate — closer to a masthead than a SaaS page. The credibility argument is made by showing the work instead of describing it.

Risk: it needs a live content feed to stay honest, and it competes with the beta homepage rather than pointing at it.

### C. Instrument

Near-monochrome, one accent, everything driven by a single sustained device: an interactive rendering of the mindplex itself — a network graph where nodes are contributors and edges are attributed work, and the page's sections are positions within it. Maximum distinctiveness, maximum build cost, and it risks becoming the 3D-blob problem in a smarter costume.

**Recommendation: A.** It resolves the two concrete defects (no typeface, brand at war with palette) rather than papering over them, it uses assets that already exist, and it has one memorable idea instead of eight competent ones.

---

## Part 5 — What must be true before this ships

Regardless of direction:

1. A real self-hosted display face and body face, with `font-display: swap` and preloaded WOFF2. No `-apple-system` for display type.
2. The palette must include the logo. If the mark stays, the system is multi-hue.
3. Art direction on every image: consistent tonal treatment, a duotone or grade that puts article thumbnails into the page's color world, and reserved layout space. Minimum one strong visual per two sections.
4. At most three sections may use the giant-display-headline treatment. The rest get a different structural device.
5. One verb per intent across nav, hero, body and footer.
6. Motion with a fallback path: `IntersectionObserver` where `animation-timeline` is unsupported, and one signature moment that belongs to Mindplex.
7. Numbering only where the content is a real sequence.
8. No unfinished copy, no `Al` for `AI`, no placeholder mathematics anywhere in the tree.

---

## Open questions

1. **Repo.** This is currently the `mindplex-landing` working tree with the refactor unstaged. Should the overhaul live in a new repository, a branch here, or a worktree?
2. **Typeface budget.** Is there budget for a licensed display face, or should this be built on high-quality open faces plus the existing Michroma?
3. **Content source.** Should featured stories be hardcoded and curated, or pulled live from the beta API?
4. **Deprecated surfaces.** The roadmap, blog and campaign routes still exist in this repo. Are they in scope, or is this homepage-only?
