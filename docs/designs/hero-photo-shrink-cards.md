# Hero Photo + Smaller Project Cards

## Context

The home page first viewport is dominated by 3 large aspect-square project cards (~350x350px, ~41% of viewport). The profile photo and bio text are entirely below the fold. This redesign shrinks the project cards and brings the profile photo into the Hero, making the first impression more personal and freeing viewport space.

## Goals

- Get the profile photo above the fold as part of the Hero
- Reduce the vertical footprint of featured project cards
- Keep the grid/square card aesthetic (not switching to landscape or list)
- Maintain the existing bio text below the fold without the duplicate photo

## Non-Goals

- Redesigning the navigation or footer
- Changing the RecentActivity or LocationWidget sections
- Modifying the ProjectCard component beyond sizing

## Design

### Hero — Side-by-side with photo

**Desktop (lg+):** Flex row layout inside `max-w-container`. Profile photo on the left (~180-200px), text block on the right, vertically centered. Photo styled with `rounded-xl border border-edge` to match existing card conventions. Stagger fade-up animations remain on the text side.

**Tablet (md):** Same flex row, photo slightly smaller (~150px).

**Mobile:** Stacks vertically — photo centered on top (`h-40 w-auto`), text below. Preserves the current centered text feel with the photo added above.

Photo source: existing `/about.png`.

### FeaturedProjects — Constrained square cards

Remove `aspect-square` from ProjectCard and constrain with `max-h-[200px]` (or similar). Keep the 3-column grid (`lg:grid-cols-3`). Thumbnail images inside cards scale down proportionally. All internal layout (gradient overlay, name, description, topic badges, GitHub link) stays the same — just more compact.

Skeleton loaders should match the new constrained height.

### About section — Bio text only

Remove the `<img>` tag, the lightbox state (`selectedImage`, `imageLoading`), the modal dialog, and the `FocusLock` import. Keep the 6 bio paragraphs in their existing container. Possibly add a subtle "More about me" heading if it feels orphaned without the photo.

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Card sizing approach | Keep squares, constrain max height | Maintains grid aesthetic while reducing footprint |
| Photo placement | Inside Hero, left side | First impression is personal; photo + intro together |
| Photo shape | Rounded rectangle (`rounded-xl`) | Consistent with card styling |
| About section photo | Remove | Eliminates duplicate; photo now lives in Hero |
| About section bio | Keep | Still valuable long-form content below the fold |

## Rejected Alternatives

- **Horizontal/landscape cards** — user prefers square grid aesthetic
- **Compact list rows** — too different from current visual style
- **Photo in a standalone section between Hero and Projects** — wastes vertical space vs. integrating into Hero
- **Photo above text, centered** — less efficient use of horizontal space on desktop

## Edge Cases & Constraints

- The `ProjectCard` component is a `<button>` element (for gallery click). Constrained height must still allow the gradient overlay to be readable.
- The lightbox modal code needs full removal — including `FocusLock` import and related state.
- The photo should have `object-cover` to handle any aspect ratio gracefully.
- Mobile layout must gracefully stack photo + text without the Hero becoming too tall.

## Open Questions

None — all resolved during brainstorm.
