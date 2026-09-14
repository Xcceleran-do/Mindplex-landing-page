# Mindplex landing page

The public marketing site for Mindplex and OmegaPlex. It explains the platform, how the OmegaPlex newsroom works, and sends readers to the magazine.

Live: https://mindplex-landing-page-five.vercel.app

## Pages

| Route                             | What it is                                                                 |
| --------------------------------- | -------------------------------------------------------------------------- |
| `/`                               | Home. The platform, where Mindplex reads, Meet OmegaPlex, the reader loop. |
| `/omegaplex`                      | How OmegaPlex works, chapter by chapter.                                   |
| `/blog`, `/blog/[slug]`           | Team posts, read from the WordPress API.                                   |
| `/roadmap/[quarter]`, `/campaign` | Legacy pages. Not linked from the navigation. Reachable by URL only.       |

## Stack

SvelteKit 2 and Svelte 5, TypeScript, `@sveltejs/adapter-vercel`. Vitest for unit tests, Playwright for e2e. Fonts and canvases are local; the only runtime dependency is the WordPress API.

## Run it

```bash
pnpm install
pnpm dev
```

Blog and roadmap read one environment variable. Create `.env`:

```
PUBLIC_MINDPLEX_API_URL=https://console.mindplex.ai/wp-json
```

Without it the blog renders its empty state and the roadmap fails.

## Checks

```bash
pnpm lint
pnpm check
pnpm test
```

`pnpm check` reports 4 known errors in `src/routes/roadmap/[quarter]`. They predate the current pages.

## Copy rules

The OmegaPlex copy must match what the stack does today. Keep these straight:

- The runtime is OmegaClaw on PeTTa (MeTTa). Beat memory is a PeTTaChainer knowledge base. There is no Atomspace.
- The writer's gate is a source check: every cited page must be one OmegaPlex actually opened. Claim-level verdicts are a next step, not live.
- The editorial methodology is a versioned prompt per beat (discovery and writing). Editors edit it, and any version can be restored.
- A human editor publishes. OmegaClaw has no publish button.

## Deploy

Vercel builds every push. A pull request gets a preview URL. Merging to `main` deploys the live URL.
