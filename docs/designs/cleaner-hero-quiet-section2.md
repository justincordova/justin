# Cleaner Hero + Spacebar Scroll + Quiet Section 2

## Context

The home page currently stacks Hero + FeaturedProjects + (RecentActivity | LocationWidget) all together, so the first viewport feels crowded. The featured project cards and the two widgets below them carry heavy chrome (borders, filled surfaces, nested boxes, pill badges), making section 2 feel like a dashboard pasted under an airy hero.

This redesign does two things:

1. Splits the home page into two clean "screens" — Hero alone fills the first viewport; everything else lives below.
2. Strips the chrome from section 2 — project cards become a single-column quiet list, and the commits/location widgets shed their containers entirely. The whole section becomes typographic and calm, matching the hero's airiness.

A spacebar shortcut scrolls from the hero to the content section for keyboard users; a visible chevron + caption signals it for everyone else.

## Goals

- Hero fills the first viewport, vertically centered, with breathing room
- Section 2 starts fully below the fold (not visible on first paint)
- Scroll affordance is obvious (animated chevron + caption)
- Spacebar smooth-scrolls from hero to content when the user is on the hero
- Section 2 visually matches the hero's quiet, editorial vibe — no card chrome where it isn't earned
- `ProjectCard` (used by `/projects`) stays untouched

## Non-Goals

- Redesigning navigation, footer, or the `/projects` page
- Changing the Hero content itself (photo, name, tagline, roles, tech icons all stay)
- Adding page-wide scroll-snap
- Changing the underlying data hooks (`useGitHubProjects`, `useGitHubCommits`)

## Design

### Nav height as a design token

- Add `h-16` to the Navigation outer container so its rendered height is fixed at 64px (currently uses `py-4` + variable content, which drifts)
- Expose `--nav-h: 64px` inside the existing `@theme` block in `src/index.css` — single source of truth, accessed as `var(--nav-h)` throughout

### Section 1 — Hero

- Wrap Hero in a section with `id="hero"`, `min-h-[100svh]`, `flex items-center`
- Inner content wrapper gets `pt-[var(--nav-h)]` so content visually centers *below* the sticky nav (nav overlays, doesn't push)
- This guarantees section 2 starts at exactly `100svh` — fully off-screen on first paint
- All existing Hero content unchanged (photo, name, tagline, roles, tech icons, stagger animations)
- New `HeroScrollHint` component pinned bottom-center of the hero section:
  - Slow, subtle chevron animation (custom `bounce-soft` keyframe, ~2.5s duration, ~3px travel — restrained, avoids the generic landing-page bounce cliché)
  - Caption in Geist Mono, uppercase, `text-[10px]` or `text-[11px]`, `tracking-wider`, `text-faint`
  - Caption text is breakpoint-aware: `PRESS SPACE` on desktop (`hidden md:inline`), `SCROLL` on mobile (`md:hidden`)
  - Hover state: caption + chevron shift from `text-faint` → `text-muted`, ~150ms transition
  - Clickable — triggers smooth scroll to `#content`
  - Opacity tied to scroll position: `1` at top, fades to `0` between 0–30% of viewport scrolled (small scroll listener with `requestAnimationFrame`)
  - Bounce disabled under `prefers-reduced-motion`; element still visible & clickable

### Spacebar scroll (one-way)

- New hook `useSpaceScrollToHero` in `src/hooks/`
- Mounted in `Home.tsx`
- On `keydown` for `' '` (Space):
  - Skip if `event.target` is `input` / `textarea` / `[contenteditable]` / has `role="textbox"`
  - Skip if any modifier key held (`shift` / `ctrl` / `meta` / `alt`) — preserves Shift+Space for native page-up
  - Skip if the user is **not** within the hero. Definition: `window.scrollY < (heroElement.offsetHeight - 100)`. Outside that zone, native browser behavior (page-down) wins.
  - When within the hero: `preventDefault()` and `scrollIntoView({ behavior: 'smooth', block: 'start' })` on `#content`
- Cleanup on unmount
- `prefers-reduced-motion` → fall back to `behavior: 'auto'` (instant)
- One-way only — no "scroll back to hero" toggle. Avoids disorienting jumps from deep in section 2 back to the top.

### Section 2 — Quiet List

Wraps in a section with `id="content"`, `max-w-container`, generous top padding (`pt-24 md:pt-32`).

A hairline `<div className="h-px bg-edge/30" />` (or `border-t border-edge/30` on the wrapper) sits at the very top of section 2, full container width — a single quiet anchor between hero and content, especially needed on tall monitors where the seam would otherwise be raw whitespace.

**Featured projects — single-column rows:**

Layout:

```
FEATURED                                         (mono, uppercase, text-faint/60, mb-6)
─────────────────────────────────────────────────  (hairline border-edge/40, section anchor)
[logo]  Seshr                                                              [gh]
        Session-based collaborative coding tool
        react · typescript · vite · tailwind
─────────────────────────────────────────────────
[logo]  Findu                                                              [gh]
        …
```

- New component `src/components/projects/ProjectRow.tsx` (separate from `ProjectCard` — `ProjectCard` stays untouched for `/projects`)
- Grid layout: `auto` logo column + flexible content column + `auto` GitHub-icon column, `gap-4` or `gap-5`
- Logo: 28px (`h-7 w-7`), no background, no border, `object-contain`
- Logo fallback (missing logo): faint GitHub octocat SVG at `text-faint/60`, same 28px footprint — consistent visual weight with logo rows (vs. a single mono character which reads as "missing image")
- Name: sans, `text-base`, `font-medium`, `text-content`
- Description: `text-sm text-muted`, single-line `truncate` with `min-w-0` on flex parent
- Topics: Geist Mono, `text-xs`, `text-faint`, dot-separated, max 4. Format: `react · typescript · vite · tailwind`. Drop the topic icons.
- **No arrow at the end of the row** — full-row hover wash + name color shift is enough affordance (real editorial sites don't put arrows on every link)
- **GitHub icon at the end of the row** — small (h-3.5 w-3.5), `text-faint`, `opacity-0 group-hover:opacity-100`, links to the repo. Click event stops propagation so it doesn't trigger the row action. Preserves the source-repo path that the old card had.
- Whole row is the click target (preserves existing `customUrl` / gallery open / nothing behavior from `ProjectCard`)
- Hover: subtle `bg-surface/30` wash on the row, name shifts from `text-content` to `text-primary`, GitHub icon fades in
- Rows separated by `border-b border-edge/40`; last row no bottom border
- Row padding: `py-5`

"View all projects" link below: existing minimal style, spacing tightened (`mt-6` or `mt-8`).

**Currently based in — inline single-line under featured projects:**

Sits immediately below the "View all projects" link, max-w-container, centered. Format:

```
based in stewartsville, nj  ·  ☼ 3:42 pm et
```

- Lowercase, `text-xs`, `text-muted` for text, Geist Mono for the time
- Tiny sun/moon icon inline (`h-3.5 w-3.5`)
- No caption, no container, no border — a single quiet line of metadata
- Drops the asymmetric 2-col layout (recent commits is much taller than location, leaving 80% empty whitespace on the right)
- Keeps the minute-tick update interval logic exactly as it is
- Replaces the dedicated `BASED IN` column entirely

**Recent commits — full-width:**

Now occupies the full container width (no longer half a 2-col grid), positioned below the "based in" line with comfortable top margin (`mt-16 md:mt-20`).

```
RECENT                          (mono, uppercase, text-faint/60, mb-6)

feat: add scroll hint
seshr · 2h · +12 -3

fix: kbd handler edge case
justin · 5h · +4 -1

refactor: hero spacing
seshr · 1d · +28 -16
```

- Caption: Geist Mono, uppercase, `text-[11px]`, `text-faint/60`, `tracking-wider`, `mb-6` — extra-faint so it reads as metadata, not a heading
- Drop the surrounding `bg-surface` card, the `<h2>` header, the `GitCommit` icon, the `ExternalLink` icon
- Render as a flex column of commit entries, `gap-4` (or `gap-5`)
- Each commit:
  - Wrapping `<a>` to `commit.commitUrl`, external, `group` for hover
  - Line 1: commit message (first line only), `text-sm text-content truncate`, on hover shifts to `text-primary`
  - Line 2: `repo · timeago · +N -N` in Geist Mono, `text-xs text-faint`
    - Repo: `text-faint` (was `text-primary` — too loud)
    - `+N`: `text-emerald-500/70` (faded)
    - `-N`: `text-red-400/70` (faded)
    - Omit the delta segment cleanly if both additions and deletions are 0 (no trailing ` · `)
- Skeleton: use new `CommitRowSkeleton` (see below)
- Error: inline `text-sm text-faint` with retry; no container box

**FEATURED caption:**

- Geist Mono, uppercase, `text-[11px]`, `text-faint/60`, `tracking-wider`, `mb-6`
- Same faint weight as `RECENT` for consistency — all section-2 captions read as structural metadata, not headers

**Skeletons (new, matching the quiet layout):**

- New `ProjectRowSkeleton` in `SkeletonLoader.tsx`: 28px circle placeholder + 1 name line (~30% width) + 1 description line (~70% width) + 1 topics line (~40% width). Same row padding & hairline as the real component. No border, no surface bg.
- New `CommitRowSkeleton` in `SkeletonLoader.tsx`: 1 message line (~80% width) + 1 metadata line (~40% width). No container, no border.
- Old `ProjectCardSkeleton` and `CommitItemSkeleton` stay (still used elsewhere or for `/projects`)

**Page-level rhythm of section 2:**

```
[hairline anchor]
FEATURED
[project row]
[project row]
[project row]
[project row]
View all projects →
based in stewartsville, nj · ☼ 3:42 pm et
                                              (mt-16 md:mt-20)
RECENT
[commit row]
[commit row]
[commit row]
```

### Animation

- Hero animations unchanged
- Section 2: single `animate-fade-up` on first paint (matches current FeaturedProjects animation), no per-row stagger — keeps it calm
- New `bounce-soft` keyframe added to `@theme` block in `index.css` for the scroll hint chevron (~2.5s, ~3px travel)

### Files touched

- `src/index.css` — add `--nav-h` inside `@theme`, add `bounce-soft` keyframe in `@theme`
- `src/components/layout/Navigation.tsx` — add `h-16` to nav outer container (fixed nav height)
- `src/pages/Home.tsx` — add section wrappers (`#hero`, `#content`), wire up `useSpaceScrollToHero`, restructure layout (featured → view-all → based-in line → recent commits)
- `src/components/home/Hero.tsx` — wrap in full-viewport flex section with `pt-[var(--nav-h)]`, mount `HeroScrollHint`
- `src/components/home/FeaturedProjects.tsx` — rewrite to use `ProjectRow`, single column, add `FEATURED` caption, hairlines
- `src/components/home/RecentActivity.tsx` — rewrite without container/header/icons, add `RECENT` caption
- `src/components/home/LocationWidget.tsx` — rewrite to inline single-line `based in city · ☼ time` format
- `src/components/projects/ProjectRow.tsx` — **new**, quiet list row
- `src/components/home/HeroScrollHint.tsx` — **new**, chevron + caption + scroll-fade + hover state
- `src/hooks/useSpaceScrollToHero.ts` — **new**, one-way spacebar handler
- `src/components/shared/SkeletonLoader.tsx` — add `ProjectRowSkeleton` and `CommitRowSkeleton`

### Files NOT touched

- `src/components/projects/ProjectCard.tsx` — preserved for `/projects` page
- Existing `ProjectCardSkeleton` and `CommitItemSkeleton` — preserved (still used by `/projects`)
- Any data hooks — same APIs, same data shapes

## Key Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Nav height | Fixed via `h-16` on nav; expose `--nav-h: 64px` in `@theme` | Single source of truth, prevents drift, CSS-only |
| Hero math | `min-h-[100svh]` + `pt-[var(--nav-h)]` on inner content | Sticky nav overlays, doesn't push — this math is correct for that case |
| Scroll affordance | Subtle chevron (2.5s/3px) + breakpoint-aware caption | Discoverability with less generic landing-page feel |
| Caption text | `PRESS SPACE` on desktop, `SCROLL` on mobile | Accurate per-platform; mobile has no spacebar |
| Spacebar | One-way only (hero → content); native behavior elsewhere | Predictable; avoids disorienting jumps from deep in content |
| Project rows | Single column, hairline-separated, no arrow | Editorial rhythm; bg wash + name shift is enough hover |
| Logos | 28px naked, no box; faint octocat fallback | Consistent visual weight without card-in-card |
| GitHub icon per row | Small, end of row, opacity-0 → opacity-100 on hover | Preserves source-repo path from old card |
| Topics | Mono, dot-separated, faint, max 4 | Reads as metadata; deletes pill chrome |
| Description | Single-line truncate | Restraint over completeness |
| Captions | Geist Mono uppercase `text-faint/60` (extra faint) | Reads as structural metadata, not headers |
| Layout asymmetry | Move "based in" inline below view-all; recent commits goes full-width | Solves the empty-right-column problem |
| Recent commits | No container, 2-line typographic entries | Drops dashboard tile feel |
| Section anchor | Hairline at top of section 2 | Quiet seam between hero and content |
| New skeletons | `ProjectRowSkeleton`, `CommitRowSkeleton` matching new layout | Prevents jank between loading and loaded states |
| Section 2 entrance | Single fade-up, no row stagger | Quietness over visual chatter |

## Rejected Alternatives

- **Direction B — Soft Grid** — softened cards still read as cards; doesn't address the core "bulky" complaint
- **Direction C — Bento Asymmetric** — different site vibe entirely; over-designed for a personal portfolio
- **Keeping topic pills** — they account for a large share of the visual weight per row
- **Per-row stagger animation** — adds chatter against the "quiet" goal
- **Peek of next section as scroll hint** — user wants section 2 fully off-screen on first view
- **Trimming Hero content** — user explicitly wanted to keep all existing Hero content
- **Transparent nav over hero** — user wants no nav changes
- **Page-wide scroll-snap** — overrides browser scroll globally; one-way space achieves the intent with less surprise
- **Bidirectional spacebar toggle** — failure mode (jumping back from deep in section 2) was worse than the benefit
- **Hardcoded `--nav-h: 64px` without fixing nav height** — would drift; fixing nav with `h-16` is the real solution
- **`min-h-[calc(100svh - var(--nav-h))]` on hero** — math is wrong when nav is sticky/overlay (creates a gap instead of a fit)
- **Arrow at end of each project row** — redundant with full-row click target; competes visually with topics line
- **Mono initial as logo fallback** — reads as "missing image"; octocat keeps visual consistency
- **2-column recent/based-in grid** — based-in column is sparse; creates ~80% empty whitespace on desktop
- **Logos in framed boxes** — recreates the card-in-card weight we're trying to remove
- **2-line description on rows** — pulls bulk back in; truncation is enough since the row links out
- **"Back to hero" affordance after scroll** — home page isn't deep enough to need it; accept one-way discoverability
- **Default fast/large bounce on the chevron** — generic AI landing-page cliché; slower/smaller is more sophisticated

## Edge Cases & Constraints

- Nav height: `h-16` must actually render at 64px on all viewports — verify in dev after adding the class
- Long commit messages: `truncate` requires `min-w-0` on the flex parent
- Commits with no additions and no deletions: omit the delta segment cleanly, no trailing ` · `
- Missing logos: faint GitHub octocat SVG, same 28px footprint, `text-faint/60`
- Mobile: featured rows stack the same (already single column), recent commits already full-width — minimal layout changes needed
- Spacebar must not fire when focus is inside any text input (search bars, modal inputs, etc.)
- Spacebar must not fire when user is past the hero — native page-down stays intact for normal page navigation
- `prefers-reduced-motion`: smooth scroll falls back to instant; chevron bounce disabled
- Hero short-viewport (≤600px): `min-h-[100svh]` + `pt-[var(--nav-h)]` may push content tight — verify icons row wraps gracefully
- Section 2 first paint: must be far enough below the hero that no part is visible at scroll position 0 (handled by `min-h-[100svh]` on hero)
- Skeleton-to-real swap: new skeletons must match real component dimensions to avoid layout shift on load
- GitHub-icon click in each row must `stopPropagation` to avoid double-triggering the row action

## Open Questions

None — all resolved.
