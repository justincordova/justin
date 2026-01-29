# Portfolio Website Redesign - Minimalist Multi-Page Design

**Date:** 2026-01-29
**Author:** Justin Cordova
**Status:** Design Phase

## Overview

Complete redesign of personal portfolio website from a long single-page layout to a clean, minimalist multi-page site inspired by jasoncameron.dev. The new design prioritizes simplicity, content focus, and smooth user experience while maintaining personality through thoughtful interactions and a cohesive dark theme.

## Goals

- **Minimalist aesthetic**: Short, focused pages with intentional white space
- **Multi-page architecture**: Clean separation of content across routes
- **Desktop-first with mobile support**: Optimized for desktop but fully responsive
- **Automated content**: Pull project data from GitHub API to reduce manual updates
- **Fast and cached**: Smart data fetching with caching to minimize API calls
- **Modern tech stack**: Leverage Bun runtime and modern React patterns

## Tech Stack

- **Runtime**: Bun (replace Node.js)
- **Framework**: React 18+ with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with Catppuccin Mocha theme
- **Data Fetching**: React Query or SWR for caching and state management
- **Icons**: Lucide React or React Icons
- **Fonts**: DM Serif Display (headings) + Inter (body) - from current site
- **Build Tool**: Vite (configured with Bun)

## Site Architecture

### Pages & Routing

| Route | Path Display | Content |
|-------|-------------|---------|
| Home | `~/` | Hero, companies, featured projects, recent activity, location |
| Projects | `~/projects` | Full curated project list in grid |
| About | `~/about` | Profile picture + custom bio paragraph |
| Pics | `~/pics` | Image gallery (placeholder structure for now) |

### Shared Components

**Navigation Bar** (appears on all pages):
- **Top left**: Current path indicator (e.g., "~/", "~/projects") in monospace font
- **Center/Right**: Nav links: "justin" \| "about" \| "projects" \| "pics"
  - "justin" links to home (~/)
  - Active link highlighted with Catppuccin accent (`ctp-mauve`)
  - Smooth hover effects
- Sticky or fixed positioning with subtle background

**Footer** (appears on all pages):
- Simple centered text: "© 2026 Justin Cordova"
- Small font size in `ctp-subtext0` color
- Minimal padding

## Page Specifications

### Home Page (~/)

**1. Hero Section** (80-90vh height)
- **Heading**: "Hey! I'm Justin Cordova"
  - Font: DM Serif Display, large (3-4rem)
  - Color: `ctp-text` (Catppuccin Mocha)
- **Intro paragraph**:
  - "I'm currently an SDE Intern @ Pure Technology Inc. I'm learning to build software in Go and C#/.NET, while in the past I've built full-stack applications with TypeScript. Building software from scratch is what makes it fun for me."
  - Font: Inter, weight 400-500, size 1.2-1.5rem
  - Color: `ctp-text`
- **Social Links**: 4 icon buttons in horizontal row
  - GitHub (→ github.com/justincordova)
  - LinkedIn (→ linkedin profile)
  - Resume (→ PDF link)
  - Email (→ mailto: or copy-to-clipboard)
  - Icons styled with `ctp-mauve` or `ctp-blue`
  - Hover: scale slightly or add glow effect
- **Animation**: Smooth fade-in on page load
- **Layout**: Centered content with ample whitespace

**2. Company Badges Section**
- Horizontal row, centered, ~2-3rem gap between badges
- **Left Badge - Pure Technology Inc**:
  - Company logo/icon (provided by user)
  - Full color, normal opacity
  - Text: "Pure Technology Inc" (Inter font)
  - Card styling: `ctp-surface0` background, subtle border
  - Hover: slight scale or glow
- **Right Badge - AbeScott Enterprises**:
  - Company logo/icon (provided by user)
  - Greyed out with ~50-60% opacity
  - Text: "AbeScott Enterprises" + small "prev." label in `ctp-subtext0`
  - Same card styling but more muted
  - No/minimal hover effect

**3. Featured Projects Section**
- **Heading**: "Featured Projects" (DM Serif Display)
- **Grid**: 3 columns (responsive: 2 on tablet, 1 on mobile)
- **Featured repos**: dotcor, findu, bunso
- **Project Card Component**:
  - GitHub repo name as title (Inter semi-bold, `ctp-text`)
  - Repo description from GitHub (Inter regular, `ctp-subtext1`, 2-3 lines max with ellipsis)
  - Tech stack icons at bottom (from GitHub repo topics)
    - Use Simple Icons or Devicons
    - Monochrome style with Catppuccin accent colors
  - Card background: `ctp-surface0`, rounded corners, subtle border
  - Hover: elevation/shadow + border color change to `ctp-mauve`
  - Clickable, links to GitHub repo
- **Button**: "View all projects" below grid
  - Outlined button style with Catppuccin accent
  - Navigates to ~/projects

**4. Two-Column Section**

**Left Column - Recent Activity**:
- **Heading**: "Recent Activity"
- **Content**: Last 5 commits from GitHub
  - Fetch from GitHub API: `https://api.github.com/users/justincordova/events`
  - Filter for `PushEvent` types, extract commits
  - Display: commit message, repo name, relative timestamp
  - Styled as list items with Catppuccin colors
  - Link each commit to GitHub commit page

**Right Column - Location Widget**:
- **Icon**: Map pin icon
- **Text**: "Currently based in Stewartsville, NJ"
- **Live Time**: Display current time in Eastern timezone (America/New_York)
  - Update every minute
- **Day/Night Icon**: Sun or moon icon based on current time
  - Sun: 6am-6pm
  - Moon: 6pm-6am
- **Zip Code**: 08886 (for reference, not displayed)
- **Styling**: Card with `ctp-surface0` background, centered content

**5. Footer**

### Projects Page (~/projects)

**Layout**:
- **Heading**: "Projects" (DM Serif Display)
- **Grid**: 3 columns (responsive: 2 on tablet, 1 on mobile)
- **Content**: All 18 curated projects displayed at once, chronological order
- **No pagination**: Show all projects immediately

**Curated Project List**:
1. findu
2. dotcor
3. JobDaemon
4. student-depression-prediction
5. Min-OSS
6. bunso
7. PlushPals
8. CookieBoy
9. LetsType
10. expense-tracker
11. task-manager
12. to-do-app
13. sort-algos
14. decode-sec
15. rotating-image-gallery
16. mini-calendar
17. image-generator
18. file-downloader

**Project Cards**: Same component as featured projects on home page
- GitHub repo name as title
- Repo description from GitHub API
- Tech stack icons from repo topics
- Clickable, links to GitHub repo
- Hover effects with Catppuccin accents

### About Page (~/about)

**Two-Column Layout** (stacks vertically on mobile):

**Left Column (40% width)**:
- Profile picture (provided later by user)
- Rounded corners or circular frame
- Catppuccin Mocha border/shadow
- Fixed aspect ratio, good size

**Right Column (60% width)**:
- Large custom paragraph about Justin
- Font: Inter, size ~1.1rem
- Color: `ctp-text`
- Multiple paragraphs if needed
- Content provided later by user

**Layout**:
- Centered content with max-width for readability
- Ample whitespace between columns
- Mobile: picture on top, paragraph below

### Pics Page (~/pics)

**Current State**: Placeholder - grid structure ready but no images yet

**Structure**:
- Empty image gallery grid (masonry or standard grid)
- Future: Lightbox/modal on click to view full-size
- Catppuccin Mocha styling

**Future Implementation** (when images provided):
- Masonry or grid layout
- Image optimization/lazy loading
- Lightbox interaction

## Component Specifications

### ProjectCard Component

**Props**:
```typescript
interface ProjectCardProps {
  repoName: string;        // e.g., "justincordova/dotcor"
  description: string;     // From GitHub API
  topics: string[];        // From GitHub API (tech stack)
  repoUrl: string;         // GitHub repo URL
}
```

**Layout**:
- Card container with `ctp-surface0` background
- Padding: 1.5rem
- Rounded corners (0.5rem)
- Border: 1px solid `ctp-surface1`
- Hover: border color → `ctp-mauve`, slight elevation

**Content**:
- **Title**: repo name, Inter semi-bold, 1.25rem, `ctp-text`
- **Description**: 2-3 lines, Inter regular, 0.95rem, `ctp-subtext1`, ellipsis overflow
- **Tech Icons**: row at bottom, small circular icons with spacing

### CommitItem Component

**Props**:
```typescript
interface CommitItemProps {
  message: string;
  repoName: string;
  timestamp: string;     // ISO date string
  commitUrl: string;
}
```

**Layout**:
- List item with subtle hover effect
- Display commit message (truncate if long)
- Repo name in smaller, lighter text
- Relative timestamp (e.g., "2 hours ago")
- Link to GitHub commit

### LocationWidget Component

**Features**:
- Static location text: "Currently based in Stewartsville, NJ"
- Live time display (updates every minute)
- Day/night icon (sun/moon) based on time of day
- Map pin icon
- Card styling with `ctp-surface0` background

**Implementation**:
- Use browser's `Date` object with timezone: "America/New_York"
- Update time every 60 seconds with `setInterval`
- Determine day/night from hour (6am-6pm = day)

## Data Fetching & Caching

### GitHub API Integration

**Endpoints**:
- Projects: `https://api.github.com/repos/{owner}/{repo}` for each curated repo
- Commits: `https://api.github.com/users/justincordova/events` (filter PushEvent)

**Caching Strategy** (using React Query or SWR):
- **Stale time**: 5 minutes (don't refetch if data is fresh)
- **Cache time**: 30 minutes (keep in cache even when component unmounts)
- **Refetch on window focus**: No (avoid unnecessary calls)
- **Retry**: 2 attempts with exponential backoff

**Loading States**:
- Skeleton loaders for project cards and commit items
- Maintain layout to prevent content shift
- Catppuccin Mocha styling for skeletons

**Error Handling**:
- Display error message if API fails
- Provide "Retry" button
- Graceful degradation: show cached data if available

**Rate Limits**:
- GitHub API: 60 requests/hour (unauthenticated)
- Consider adding GitHub token to env variables for 5000/hour
- Not a concern for personal portfolio with low traffic

## Styling & Theme

### Catppuccin Mocha Palette

```css
/* Primary colors */
--ctp-base: #1e1e2e;        /* Background */
--ctp-surface0: #313244;    /* Cards, elevated surfaces */
--ctp-surface1: #45475a;    /* Borders, dividers */
--ctp-text: #cdd6f4;        /* Primary text */
--ctp-subtext0: #a6adc8;    /* Secondary text */
--ctp-subtext1: #bac2de;    /* Tertiary text */
--ctp-mauve: #cba6f7;       /* Primary accent */
--ctp-blue: #89b4fa;        /* Secondary accent */
```

### Typography

**Headings**:
- Font: DM Serif Display
- Sizes: h1 (3-4rem), h2 (2-2.5rem), h3 (1.5-2rem)
- Weight: normal (400)
- Color: `ctp-text`

**Body**:
- Font: Inter
- Size: 1rem base
- Weights: 400 (regular), 500 (medium), 600 (semi-bold)
- Color: `ctp-text` or `ctp-subtext1`

**Monospace** (for path indicator):
- Font: monospace system stack
- Size: 0.9rem

### Spacing & Layout

- **Container max-width**: 1200px
- **Section padding**: 4-6rem vertical, 2rem horizontal
- **Card padding**: 1.5rem
- **Gap between items**: 1.5-2rem
- **Mobile breakpoints**:
  - sm: 640px
  - md: 768px
  - lg: 1024px

## Responsive Design

### Desktop First Approach

**Desktop (>1024px)**:
- Full navigation with all elements visible
- 3-column grids for projects
- Two-column layout for recent activity + location
- Ample whitespace and larger typography

**Tablet (768px-1024px)**:
- 2-column grids for projects
- Maintain two-column for recent activity + location
- Slightly reduced spacing
- Same navigation

**Mobile (<768px)**:
- Single column layouts
- Stack recent activity above location widget
- Hamburger menu for navigation (optional) or full nav if space allows
- Touch-friendly click targets (min 44x44px)
- Reduced font sizes slightly

## Animations & Transitions

### Page Transitions

**Route changes**:
- Smooth fade or slide effect between pages
- Duration: 200-300ms
- Easing: ease-in-out
- Minimal, not distracting

**Implementation**: Use React Router with transition library (e.g., Framer Motion) or CSS transitions

### Component Animations

- **Fade-in on load**: Hero section, project cards
- **Hover effects**: Scale (1.02-1.05), color changes, subtle shadows
- **Loading skeletons**: Pulse animation for skeleton loaders
- **All animations**: Respect `prefers-reduced-motion` media query

## Implementation Strategy

### Fresh Start - Clean Slate

**IMPORTANT: Starting from scratch**
- **Delete ALL existing code** except `/public` folder
- **Keep `/public` folder contents**:
  - TBA icon (favicon or logo)
  - Resume PDF file
- This is a complete rebuild, not a refactor
- No reusing old components - build fresh with new architecture

### Context Management Strategy

**When context reaches 80%:**
1. Pause current work
2. Commit all changes with clear commit message
3. Use context compaction/summarization
4. Resume with fresh context
5. Continue with next phase

**Why 80%?** Leaves buffer for tool results, error handling, and user interaction without hitting context limits.

### Development Workflow

1. **Create new branch**: `redesign-minimal-portfolio` ✓ (already created)
2. **Delete all code except `/public`**: Clean slate for rebuild
3. **Use Bun as runtime**: All npm/node commands replaced with bun
4. **Use frontend-design plugin** for implementation assistance
5. **Subagent-driven development**: Break work into parallel phases (see below)
6. **Test on multiple devices**: Desktop, tablet, mobile viewports
7. **Commit frequently**: Small, logical commits after each phase

## Implementation Phases

Break implementation into phases for parallel subagent work where possible.

### Phase 0: Project Setup & Foundation
**Can be done in parallel by multiple subagents**

**Subagent A: Project Initialization**
- Delete all existing code except `/public` folder
- Initialize fresh Vite + React + TypeScript project with Bun
- Configure `bun.lockb` and dependencies
- Set up project structure (folders: components, pages, hooks, lib, types)
- Configure environment variables (.env.example)

**Subagent B: Styling & Theme Setup**
- Install and configure Tailwind CSS
- Set up Catppuccin Mocha color palette in Tailwind config
- Add DM Serif Display and Inter fonts to index.html
- Create base CSS file with global styles and theme variables
- Configure responsive breakpoints

**Subagent C: Routing & Layout Foundation**
- Install React Router v6
- Set up App.tsx with routes for all 4 pages
- Create page placeholders (Home, Projects, About, Pics)
- Implement smooth page transitions (minimal fade/slide)

**Dependencies**: None between these subagents - all can run in parallel

**Deliverable**: Working project skeleton with routing and styling foundation

---

### Phase 1: Shared Components
**Sequential within phase, but independent from Phase 2-5**

**Tasks**:
- Build Navigation component (path indicator + nav links)
- Build Footer component
- Build SkeletonLoader component (for loading states)
- Build ErrorMessage component (for API errors)
- Test components in isolation

**Dependencies**: Requires Phase 0 complete

**Deliverable**: Reusable shared components

---

### Phase 2: GitHub API Integration
**Can be done in parallel with Phase 1 (after Phase 0)**

**Tasks**:
- Install React Query or SWR for caching
- Create GitHub API helper functions (lib/github.ts)
- Create TypeScript interfaces for GitHub data (types/github.ts)
- Implement useGitHubProjects custom hook
- Implement useGitHubCommits custom hook
- Set up caching strategy (5min stale, 30min cache)
- Add error handling and retry logic
- Test API integration with console logs

**Dependencies**: Requires Phase 0 complete

**Deliverable**: Working GitHub API integration with caching

---

### Phase 3: Home Page Components
**Can be parallelized by multiple subagents**

**Subagent A: Hero Section**
- Build Hero.tsx component
- Implement heading, intro paragraph, social icons
- Add fade-in animation
- Style with Catppuccin Mocha theme
- Make responsive

**Subagent B: Company Badges**
- Build CompanyBadges.tsx component
- Implement two-badge layout (current + previous)
- Style with proper opacity/greying for previous
- Add hover effects
- Make responsive

**Subagent C: Featured Projects**
- Build FeaturedProjects.tsx component
- Build ProjectCard.tsx component (shared with Projects page)
- Integrate with useGitHubProjects hook
- Show 3 featured repos (dotcor, findu, bunso)
- Add "View all projects" button → navigate to ~/projects
- Add skeleton loaders
- Make responsive (3 col → 2 col → 1 col)

**Subagent D: Recent Activity & Location**
- Build RecentActivity.tsx component
- Build CommitItem subcomponent
- Integrate with useGitHubCommits hook
- Build LocationWidget.tsx component
- Implement live time with timezone (America/New_York)
- Add day/night icon logic (6am-6pm = sun, else moon)
- Add skeleton loaders
- Make two-column responsive layout (stacks on mobile)

**Dependencies**: Requires Phase 0, Phase 1, Phase 2 complete

**Deliverable**: All Home page components working

---

### Phase 4: Home Page Assembly
**Sequential - after Phase 3**

**Tasks**:
- Assemble all components in Home.tsx
- Wire up all props and data flow
- Test full page functionality
- Verify API calls, caching, loading states, errors
- Test responsive design (desktop, tablet, mobile)
- Verify animations and transitions

**Dependencies**: Requires Phase 3 complete

**Deliverable**: Fully functional Home page

---

### Phase 5: Projects Page
**Can be done in parallel with Phase 6-7 (after Phase 0, 1, 2)**

**Tasks**:
- Build Projects.tsx page component
- Reuse ProjectCard component from Phase 3
- Fetch all 18 curated repos from GitHub API
- Display in 3-column grid (responsive: 3 → 2 → 1)
- Sort chronologically (newest first)
- Add skeleton loaders
- Add error handling
- Test responsive design

**Dependencies**: Requires Phase 0, Phase 1, Phase 2 complete

**Deliverable**: Fully functional Projects page

---

### Phase 6: About Page
**Can be done in parallel with Phase 5, 7 (after Phase 0, 1)**

**Tasks**:
- Build About.tsx page component
- Implement two-column layout (40% image, 60% text)
- Add placeholder for profile picture
- Add placeholder text for bio paragraph
- Style with Catppuccin Mocha theme
- Make responsive (stacks on mobile: image top, text bottom)

**Dependencies**: Requires Phase 0, Phase 1 complete

**Deliverable**: About page with placeholders (ready for content)

---

### Phase 7: Pics Page
**Can be done in parallel with Phase 5, 6 (after Phase 0, 1)**

**Tasks**:
- Build Pics.tsx page component
- Create empty grid structure (masonry or standard grid)
- Style with Catppuccin Mocha theme
- Make responsive
- Add comments for future implementation (lightbox, lazy loading)

**Dependencies**: Requires Phase 0, Phase 1 complete

**Deliverable**: Pics page structure (empty, ready for images later)

---

### Phase 8: Final Polish & Testing
**Sequential - after all pages complete**

**Tasks**:
- Test all routes and navigation
- Verify page transitions smooth and minimal
- Test all GitHub API integrations end-to-end
- Verify caching works (check network tab)
- Test error states (disconnect network, verify error handling)
- Test loading states (throttle network, verify skeletons)
- Responsive testing on all breakpoints
- Accessibility audit (keyboard nav, ARIA labels, semantic HTML)
- Performance audit (load times, bundle size)
- Cross-browser testing (Chrome, Firefox, Safari)

**Dependencies**: Requires all phases complete

**Deliverable**: Production-ready site

---

### Phase 9: Assets & Content
**Can be done anytime, but needed before production**

**Tasks** (user provides):
- Add company logos to `/public/companies/`
- Add profile picture to `/public/images/`
- Write custom bio paragraph for About page
- Verify resume PDF in `/public/`
- Add images for Pics page (future)

**Dependencies**: None - can be done in parallel with development

**Deliverable**: All assets and content ready

---

### Parallelization Strategy

**Phase 0**: Run 3 subagents in parallel (A, B, C)
**Phase 1**: Single agent (shared components are interdependent)
**Phase 2**: Parallel with Phase 1 (API integration independent)
**Phase 3**: Run 4 subagents in parallel (A, B, C, D)
**Phase 4**: Single agent (assembly)
**Phase 5, 6, 7**: Run 3 subagents in parallel (Projects, About, Pics pages)
**Phase 8**: Single agent (final testing)
**Phase 9**: User provides assets (parallel with development)

**Estimated Phases**: 9 phases total, ~4 can be parallelized

### Environment Variables

```env
VITE_GITHUB_USERNAME=justincordova
VITE_GITHUB_TOKEN=<optional, for higher rate limits>
```

### Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── CompanyBadges.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── RecentActivity.tsx
│   │   └── LocationWidget.tsx
│   ├── projects/
│   │   └── ProjectCard.tsx
│   └── shared/
│       ├── SkeletonLoader.tsx
│       └── ErrorMessage.tsx
├── pages/
│   ├── Home.tsx
│   ├── Projects.tsx
│   ├── About.tsx
│   └── Pics.tsx
├── hooks/
│   ├── useGitHubProjects.ts
│   └── useGitHubCommits.ts
├── lib/
│   ├── github.ts           # GitHub API helpers
│   └── utils.ts
├── types/
│   └── github.ts           # TypeScript interfaces
└── App.tsx                 # Routes setup
```

### Featured Projects

On home page, show these 3 repos in this order:
1. dotcor
2. findu
3. bunso

### Data to be Provided Later

- Company logos for Pure Technology Inc and AbeScott Enterprises
- Profile picture for About page
- Custom bio paragraph for About page
- Images for Pics page (future)
- Resume PDF file

## Success Criteria

- [ ] All 4 pages render correctly with proper routing
- [ ] Navigation and footer present on all pages
- [ ] GitHub API data fetches and displays correctly
- [ ] Caching works, stale data updates appropriately
- [ ] Skeleton loaders show during data fetch
- [ ] Error handling displays gracefully
- [ ] Catppuccin Mocha theme applied consistently
- [ ] Responsive design works on desktop, tablet, mobile
- [ ] Page transitions smooth and minimal
- [ ] Location widget shows live time with day/night icon
- [ ] All 18 projects display on projects page
- [ ] 3 featured projects show on home page
- [ ] Recent commits (5) display correctly
- [ ] All links functional (social, GitHub repos, navigation)
- [ ] Performance: fast load times, smooth interactions
- [ ] Accessibility: keyboard navigation, semantic HTML, ARIA labels

## Next Steps

1. Confirm design approval
2. Set up new branch and clean slate
3. Configure Bun runtime
4. Implement using frontend-design plugin
5. Integrate GitHub API with caching
6. Test responsive design
7. Review and iterate
8. Gather remaining assets (logos, images, content)
9. Deploy

---

**End of Design Document**
