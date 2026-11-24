# justin-portfolio — Agent Context

Personal portfolio for Justin Cordova (justincordova.dev). A React 19 + TypeScript SPA built with Vite and Tailwind CSS v4, deployed on Vercel. A small serverless layer in `api/` proxies the GitHub API (repos for the project lists, latest commit for the footer) so the token stays server-side.

## Repo layout

- `src/` — the app (pages, components, hooks, lib)
- `api/` — Vercel serverless functions; `api/dev.ts` mounts them in the Vite dev server
- `public/` — static assets served as-is (logos, screenshots, fonts, résumé PDF)
- `src/assets/photos/` — album photos, processed at build time by vite-imagetools
- `docs/designs/` — design docs for in-flight or recent features

## Commands

Package manager is **pnpm** (version pinned in `package.json#packageManager`). Don't use npm, yarn, or bun — they'd create a second lockfile.

```bash
pnpm install
pnpm dev            # dev server on :3000, includes /api routes
pnpm build          # tsc -b (app, vite config, api) + vite build
pnpm check          # biome check --write ./src (lint + format, autofix)
pnpm exec biome ci ./src   # what CI runs: lint + format, no writes
pnpm preview        # serve dist/ — static only, no /api routes
```

The pre-commit gate is `pnpm build` and `pnpm exec biome ci ./src`. Both must pass. There is no test suite. CI (`.github/workflows/ci.yml`) runs the same two checks on every push to `main` and on PRs; Vercel deploys separately.

`GITHUB_TOKEN` (see `.env.example`) is optional locally; without it GitHub rate-limits to 60 requests/hour and the project lists show the rate-limit message.

## Tech stack

| Layer | Choice |
|---|---|
| Routing | React Router v7 (`react-router` package), client-side only |
| Data | TanStack Query v5; retry policy and caching set in `src/main.tsx` |
| Styling | Tailwind v4, configured entirely in `src/index.css` (`@theme`) — no `tailwind.config.js` |
| Fonts | Outfit (Google Fonts) for text, Geist Mono (self-hosted, preloaded in `index.html`) for mono |
| Images | vite-imagetools for album photos; everything in `public/` is pre-sized WebP |
| Lint/format | Biome (double quotes, 2 spaces, semicolons, trailing commas, 100 cols) |

## Key architectural patterns

- **Theming.** `data-theme="dark|light"` on `<html>`. Color tokens live in `@theme` (dark default) with overrides under `:root[data-theme="light"]`. Always use token classes (`text-content`, `text-muted`, `text-faint`, `bg-surface`, …), never raw colors. The inline boot script in `index.html` must mirror `getStoredTheme()` in `src/lib/theme.ts`. Only an explicit toggle is saved to localStorage (`applyTheme(t, { persist: false })` follows the OS); user toggles go through `switchTheme()`, which crossfades.
- **Motion.** Shared keyframes and a strong `--ease-out` (which intentionally overrides Tailwind's default) are in `@theme`. Page entrances use `animate-fade-up` with `.stagger-N`; modals use `animate-fade-in` on the backdrop and `animate-modal-in` on the panel. Keyboard-driven actions (lightbox prev/next) get opacity only.
- **Modals and overlays.** They portal to `document.body` at `z-[100]` (nav is `z-50`), use `react-focus-lock`, close on Escape and backdrop click, and lock scroll with the counted `useBodyScrollLock` (which also pads for the scrollbar width).
- **Content registries.** Curated and featured repo lists are in `src/lib/github.ts`; per-project logos, galleries, and live URLs are the maps at the top of `src/components/projects/ProjectRow.tsx`; photo albums are in `src/lib/albums.ts` (folder name = slug).

## Known gotchas

- **Tailwind v4 transforms are separate properties.** `translate-*`, `scale-*`, `rotate-*` set the CSS `translate`/`scale`/`rotate` properties, not `transform`. Arbitrary transitions must name those (`transition-[opacity,translate]`), or the motion snaps.
- **The reduced-motion and theme-switch rules in `index.css` use `!important` on purpose.** They're in `@layer base`, which loses to utilities and inline styles otherwise. Keep the Biome ignore comments around them.
- **Project rows are `div role="button"`, not `<button>`,** because they contain a nested GitHub `<a>` (invalid inside a button). Keep the keyboard handler and `biome-ignore` with it.
- **The home page's Space shortcut** (`useSpaceScrollToHero`) must skip focused controls and dialogs, and it bails if the event was already `defaultPrevented`.
- **`<picture>` sources need their own `sizes`.** The `<img>`'s `sizes` doesn't apply to `<source>`; without it the browser assumes `100vw` and over-fetches.
- **pnpm is strict about dependencies.** Anything imported directly (including `@import "tailwindcss"` in CSS) must be a direct dependency in `package.json`. Dependency build scripts must be approved under `allowBuilds` in `pnpm-workspace.yaml`.
- **The `/api` handlers only run under `pnpm dev` or on Vercel.** `pnpm preview` serves static files, so the project lists fail there.

## Further reading

- **`docs/designs/`** — design docs for the home hero, the quiet project list, and the Projects page
