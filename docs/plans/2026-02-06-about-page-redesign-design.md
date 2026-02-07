# About Page Redesign Design

**Date:** 2026-02-06
**Status:** Approved

## Overview

Redesign the About page to display ai-ghibli images in a gallery below the bio section, ensuring all content fits on one screen without scrolling.

## Layout Structure

- **Container**: Vertical flex layout with `h-screen`, `flex flex-col`, `overflow-hidden`
- **Grid layout**: Two-column grid (about.PNG + bio text)
- **Responsive**:
  - Desktop (md+): Side-by-side with gallery below
  - Mobile: Stacked layout

## Components

### 1. Bio Section

**Image Column (Left):**
- about.PNG with reduced height: `max-h-[30vh]` (was `max-h-[60vh]`)
- Styling: `rounded-xl border border-ctp-surface1`
- Column ratio: 1.5fr

**Text Column (Right):**
- Heading: "About" at `text-3xl tracking-tight text-ctp-text mb-3`
- Body text:
  - Font size: text-base (default)
  - Line height: `leading-snug` (1.375)
  - Spacing: `space-y-3` (between paragraphs)
  - Color: `text-ctp-subtext1`
  - Highlight spans: `text-ctp-mauve`
- Column ratio: 2fr

**Grid spacing:** `gap-6` (was `gap-10`)

### 2. AI Ghibli Gallery

**Section Header:**
- Text: "For Fun"
- Style: `text-sm font-semibold text-ctp-subtext0 mb-3`

**Image Row:**
- Layout: `flex flex-row gap-3 justify-center items-center`
- Images: g1.png, g2.png, g3.png, g4.png, g5.png
- Size: `h-28` (112px height, width auto to maintain aspect ratio)
- Styling:
  - `rounded-lg`
  - `border border-ctp-surface1`
  - Hover: `hover:scale-105 hover:border-ctp-mauve`
  - Transition: `transition-all duration-200`

## Technical Details

### File Modification
- `src/pages/About.tsx` - Complete component update

### Vertical Space Calculation

- Container padding: 48px top + 48px bottom = 96px
- Grid section (image + bio): ~350px
  - Image (30vh): ~300px
  - Bio text: ~40px
  - Spacing: 12px
- Gallery section: ~150px
  - Header: 24px
  - Images (h-28): 112px
  - Spacing: 12px
- Total: ~596px

Fits comfortably within standard 1080px viewport.

### Responsive Breakpoints

- Mobile (< md): `flex flex-col` with vertical stack
- Desktop (md+): `md:grid-cols-[2fr_3fr]` for side-by-side layout

## Success Criteria

- All content fits on one screen without scrolling (desktop)
- No image cropping
- ai-ghibli images displayed in a row
- Responsive behavior on mobile
- Consistent with existing design system
