# Page Load Animations Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add smooth fade-up stagger entrance animations to every element on every page when navigating between routes.

**Architecture:** Extend the existing `animate-fade-up` + `stagger-*` utilities already used on the Home hero to all page sections and components. Add `stagger-5` and `stagger-6` delay levels for project card grids. Add a key prop to the `PageTransition` wrapper div so CSS animations re-trigger on every route change.

**Tech Stack:** React, Tailwind CSS, React Router DOM

---

### Task 1: Add stagger-5 and stagger-6 delay utilities

**Files:**
- Modify: `src/index.css:42-46`

**Step 1: Add the two new stagger levels**

In `src/index.css`, extend the `@layer components` block:

```css
@layer components {
  .stagger-1 { animation-delay: 0ms; }
  .stagger-2 { animation-delay: 60ms; }
  .stagger-3 { animation-delay: 120ms; }
  .stagger-4 { animation-delay: 180ms; }
  .stagger-5 { animation-delay: 240ms; }
  .stagger-6 { animation-delay: 300ms; }
}
```

**Step 2: Verify dev server still compiles**

Run: `npm run dev` (or `bun run dev`)
Expected: No errors, dev server starts on port 3000

**Step 3: Commit**

```
git add src/index.css
git commit -m "feat(animations): add stagger-5 and stagger-6 delay utilities"
```

---

### Task 2: Fix PageTransition so animations re-trigger on every navigation

**Files:**
- Modify: `src/App.tsx:26-34`

**Context:** The `PageTransition` wrapper div currently has no `key` prop. Without a key change on navigation, React reuses the same DOM node and CSS animations do not re-fire. Adding `key={displayLocation.pathname}` forces a remount of the wrapper on each route swap, resetting all `animate-*` animations inside it.

**Step 1: Add key to the wrapper div**

In `src/App.tsx`, update the return of `PageTransition`:

```tsx
return (
  <div
    key={displayLocation.pathname}
    className={`transition-opacity duration-120 ${transitioning ? "opacity-0" : "opacity-100"}`}
  >
    <Routes location={displayLocation}>
      {children}
    </Routes>
  </div>
);
```

**Step 2: Verify navigation re-triggers animations**

Run the dev server, navigate between pages, and confirm elements animate in on each visit.

**Step 3: Commit**

```
git add src/App.tsx
git commit -m "fix(animations): remount page wrapper on navigation to re-trigger animations"
```

---

### Task 3: Animate the Home page sections

**Files:**
- Modify: `src/pages/Home.tsx`
- Modify: `src/components/home/FeaturedProjects.tsx` (add wrapper animation)
- Modify: `src/components/home/RecentActivity.tsx` (add wrapper animation)
- Modify: `src/components/home/LocationWidget.tsx` (add wrapper animation)

**Context:** `Hero` and `CompanyBadges` already have `animate-fade-up stagger-*` on their internal elements. The remaining three sections (`FeaturedProjects`, `RecentActivity`, `LocationWidget`) have no entrance animation. Animate them as whole-section units from the `Home.tsx` grid level — no need to touch internals.

**Step 1: Add stagger classes to the bottom grid section in Home.tsx**

In `src/pages/Home.tsx`, wrap `RecentActivity` and `LocationWidget` with stagger classes at the section level:

```tsx
<section className="px-6 py-10">
  <div className="mx-auto grid max-w-container items-stretch gap-6 lg:grid-cols-[1fr_280px]">
    <div className="animate-fade-up stagger-3">
      <RecentActivity />
    </div>
    <div className="animate-fade-up stagger-4">
      <LocationWidget />
    </div>
  </div>
</section>
```

**Step 2: Add animation to FeaturedProjects**

Open `src/components/home/FeaturedProjects.tsx`. Find the outermost `<section>` or root `<div>` and add `animate-fade-up stagger-2` to it.

**Step 3: Verify Home page**

Navigate to `/` and confirm: hero fades up first, badges second, featured projects third, commits/location last.

**Step 4: Commit**

```
git add src/pages/Home.tsx src/components/home/FeaturedProjects.tsx
git commit -m "feat(home): add stagger entrance animations to all sections"
```

---

### Task 4: Animate the About page

**Files:**
- Modify: `src/pages/About.tsx`

**Context:** About has three logical groups: (1) the photo, (2) the bio text block, (3) the "For Fun" Ghibli images row. Animate them with stagger-1 through stagger-3.

**Step 1: Add animate classes to each group**

```tsx
export default function About() {
  return (
    <div className="flex h-full flex-col px-6 py-4 overflow-hidden">
      <div className="mx-auto grid max-w-container flex-shrink-0 items-start gap-6 md:grid-cols-[2fr_3fr]">
        <div className="animate-fade-up stagger-1 mt-12 flex justify-center">
          <img ... />
        </div>

        <div className="animate-fade-up stagger-2 min-h-0">
          <h1 ...>About</h1>
          <div ...>
            {/* paragraphs unchanged */}
          </div>
        </div>
      </div>

      <div className="animate-fade-up stagger-3 mx-auto mt-4 flex max-w-container flex-col items-center justify-center flex-1 min-h-0">
        <h2 ...>For Fun</h2>
        <div ...>
          {/* images unchanged */}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Verify About page**

Navigate to `/about` and confirm photo, bio, and Ghibli row animate in sequentially.

**Step 3: Commit**

```
git add src/pages/About.tsx
git commit -m "feat(about): add stagger entrance animations"
```

---

### Task 5: Animate the Projects page

**Files:**
- Modify: `src/pages/Projects.tsx`

**Context:** Projects has a heading and a grid of cards. Animate the heading as stagger-1, then each card with an index-based stagger capped at stagger-6.

**Step 1: Animate the heading**

```tsx
<h1 className="animate-fade-up stagger-1 mb-8 text-3xl tracking-tight text-ctp-text">Projects</h1>
```

**Step 2: Animate each project card by index**

```tsx
const staggerClass = (i: number) => {
  const levels = ["stagger-1", "stagger-2", "stagger-3", "stagger-4", "stagger-5", "stagger-6"];
  return levels[Math.min(i, levels.length - 1)];
};

// In the repos.map():
{repos.map((repo, i) => (
  <div key={repo.name} className={`animate-fade-up ${staggerClass(i)}`}>
    <ProjectCard repo={repo} />
  </div>
))}
```

**Step 3: Verify Projects page**

Navigate to `/projects` and confirm heading and cards animate in with a cascading stagger.

**Step 4: Commit**

```
git add src/pages/Projects.tsx
git commit -m "feat(projects): add stagger entrance animations to heading and cards"
```

---

### Task 6: Animate the Pics page

**Files:**
- Modify: `src/pages/Pics.tsx`

**Context:** Pics has a heading and a photo grid. Animate heading as stagger-1, grid container as stagger-2 (individual images don't need per-item stagger — there are too many).

**Step 1: Add animate classes**

```tsx
<h1 className="animate-fade-up stagger-1 mb-8 text-3xl tracking-tight text-ctp-text">Pics</h1>

<div className="animate-fade-up stagger-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
  {/* images unchanged */}
</div>
```

**Step 2: Verify Pics page**

Navigate to `/pics` and confirm heading and grid animate in sequentially.

**Step 3: Commit**

```
git add src/pages/Pics.tsx
git commit -m "feat(pics): add stagger entrance animations"
```
