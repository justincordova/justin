# CLAUDE.md — justin-portfolio

## Project

Personal portfolio site for Justin Cordova. Built with React 19, TypeScript, Tailwind CSS v4, and Vite. Deployed on Vercel. Includes a lightweight serverless API layer under `/api/`.

## Stack

- **Frontend**: React 19, TypeScript, React Router v7, TanStack Query v5
- **Styling**: Tailwind CSS v4 (CSS-only config in `src/index.css`, no `tailwind.config.js`)
- **Fonts**: Outfit (Google Fonts, body + headings), Geist Mono (local, `/public/fonts/`), DM Serif Display (Google Fonts, legacy serif)
- **Linter/Formatter**: Biome (`biome.json`) — double quotes, 2-space indent, semicolons, trailing commas
- **API**: Serverless functions under `/api/`, proxied locally via `api/dev.ts`
- **Path alias**: `@` → `src/`

## Commands

```bash
bun run dev       # start dev server on :3000
bun run build     # tsc + vite build
bun run check     # biome check + autofix
bun run lint      # biome lint
bun run format    # biome format --write
```

## Theming

Dark/light mode is controlled via `data-theme` attribute on `<html>`. Default is `dark`, toggled and persisted in localStorage. CSS variables are defined in `src/index.css` under `@layer base`:

- Default (dark): no override needed — base variables apply
- Light mode: `:root[data-theme="light"]` overrides

Use `text-content`, `text-muted`, etc. for theme-aware colors. Avoid hardcoded `text-white` — it breaks in light mode.

## Structure

```
src/
  components/
    home/       # Hero, FeaturedProjects, RecentActivity, LocationWidget
    layout/     # Navigation, Footer, ThemeSelector
    projects/   # ProjectCard
    shared/     # SkeletonLoader, ErrorMessage, ResumeModal
  pages/        # Home, Projects, Pics
  hooks/        # useGitHubProjects, etc.
  lib/          # github.ts, topic-icons.ts, etc.
  types/        # github.ts
api/
  github/       # serverless GitHub API handlers
  lib/          # shared API utilities
public/
  fonts/        # GeistSansVariable.woff2, GeistMonoVariable.woff2
```
