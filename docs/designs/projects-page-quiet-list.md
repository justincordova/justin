# Projects Page — Quiet List Grouped by Year

## Context

The `/projects` page currently renders 20 curated projects as a 3-column grid of bordered `ProjectCard`s sorted by `created_at` desc. Visually it doesn't match the home page (which now uses quiet typographic rows), every card looks identical, and there's no temporal scent — early-CS work sits next to recent flagship projects with equal weight.

This redesign rebuilds the page around the same `ProjectRow` vocabulary used on the home page, grouped by year, with a tiny metadata header.

## Goals

- Visual cohesion with the home page (same row vocabulary, no card chrome)
- Temporal scent — year groupings let visitors perceive evolution at a glance
- Reuse `ProjectRow` (no new card component)
- Mark featured projects with a tiny indicator so the flagship work signals itself
- One fade-up on the page, no per-item stagger (20 items × stagger = chatter)

## Non-Goals

- No filtering, no search, no toggles
- No project tier curation (every project is equal within its year)
- No screenshots / rich previews
- No new data — uses existing `useGitHubProjects(CURATED_PROJECTS)` hook

## Design

### Page header

```
PROJECTS                                              20 projects · 2021 – 2026
```

- Left: `PROJECTS` in Geist Mono uppercase, `text-[11px]`, `text-faint/60`, `tracking-[0.15em]` — matches `FEATURED` caption on home
- Right: small metadata line in Geist Mono, `text-xs text-faint` — auto-computed from the data: `{count} projects · {oldestYear} – {newestYear}`
- Wrapper: flex row, `items-baseline justify-between`, max-w-container, px-6
- `mb-12` below the header before the first year group

### Year groups

Repos sorted by `created_at` desc, then grouped by year. Each year that has at least one project gets:

```
2026 ───────────────────────────────────────────────
[logo]  seshr  ★            session-based collab tool          react · typescript · vite · tailwind  [gh]
[logo]  findu  ★            find people near you               react · firebase · typescript          [gh]

2025 ───────────────────────────────────────────────
...
```

Year caption row:
- Geist Mono, `text-xs text-faint/60`, `tracking-[0.15em]` — the year number
- Flanked on the right by a hairline rule that fills remaining width: `<div className="h-px flex-1 bg-edge/30" />`
- Gap between year and rule: `gap-4`
- `mb-2` below the caption before the first row of the group
- `mt-12` between groups (no top margin on the first group)

Rows within a group:
- Reuse `ProjectRow` exactly as-is from the home page
- Sort within group by `created_at` desc (newest first within each year)
- Featured projects (the 4 in `FEATURED_PROJECTS`) get a tiny `★` indicator after the name — `text-faint`, `text-xs`, half-opacity. Drawn in the row, not as a badge.

### Featured indicator on `ProjectRow`

Add an optional `featured?: boolean` prop to `ProjectRow`. When true, render a small star glyph next to the name:

```tsx
<h3>
  {repo.name}
  {featured && <span className="ml-1.5 text-xs text-faint/60">★</span>}
</h3>
```

Subtle. Doesn't shout "featured." Just a tiny mark.

### Animation

- One `animate-fade-up` on the whole grouped list container
- No per-row stagger
- Year captions inherit the fade-up

### Loading state

- Hide the header until data loads (so we don't show `0 projects · NaN – NaN`)
- Render 6 `ProjectRowSkeleton`s in a single column (no year grouping — the skeletons are temporal-agnostic)

### Empty / error state

- Reuse `ErrorMessage` as-is. Inline, no container box.

### Files touched

- `src/pages/Projects.tsx` — rewrite
- `src/components/projects/ProjectRow.tsx` — add optional `featured` prop

### Files NOT touched

- `src/components/projects/ProjectCard.tsx` — now orphaned but leaving it (no other consumers, but safe to keep for future use)
- Data hooks, lib/github.ts, types — unchanged

## Key Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Layout vocabulary | Reuse `ProjectRow` from home | Cohesion, no new component |
| Grouping | By year (`created_at`) | Temporal scent without filtering UX |
| Sort order | Year desc, then `created_at` desc within year | Newest work first, both globally and per group |
| Year caption style | Mono uppercase + extending hairline | Section anchor, matches home captions |
| Featured marker | Tiny `★` next to name | Subtle hierarchy without breaking row uniformity |
| Page header | `PROJECTS` caption + count/year-range metadata | Matches home caption pattern |
| Animation | Single fade-up, no per-row stagger | 20 items × stagger = visual chatter |
| Skeleton | 6 `ProjectRowSkeleton`s, no year grouping during load | Simpler, accurate enough |

## Rejected Alternatives

- **Direction B — Filterable Grid** — adds new chrome (filter chips, state) just removed from home; doesn't match the typographic vibe
- **Direction C — Curated Tiers** — requires ongoing curation maintenance; less data-driven
- **Per-row stagger** — gets noisy at 20 items
- **Drop `ProjectCard` immediately** — keeping it for now (orphan deletion is a separate cleanup pass)
- **Logo box framing** — same anti-pattern we removed on home

## Edge Cases & Constraints

- Year computed from `repo.created_at` — must handle invalid dates defensively (skip silently)
- A year with zero projects after the current latest doesn't appear (no `2023 — (empty)`)
- Year range in metadata uses min/max year across the dataset, not a hardcoded span
- If only one year is represented, the metadata reads `20 projects · 2026` (no dash)
- 20 projects in one column is long — make sure spacing per row is tight enough to keep the page reasonable. `py-5` per row from `ProjectRow` is appropriate.
- `★` glyph must be visible in both light and dark themes — `text-faint/60` works in both

## Open Questions

None.
