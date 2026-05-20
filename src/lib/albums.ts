/**
 * Album registry.
 *
 * Each album renders as a section on the /pics page with its photos in a
 * masonry grid underneath the section header.
 *
 * To add a new album:
 *   1. Drop the photos into `src/assets/pics/<slug>/`
 *   2. Add an entry below — slug must match the folder name
 *
 * Order in this array controls display order on /pics (top → bottom).
 */
export type AlbumMeta = {
  slug: string;
  title: string;
  /** Short date string, e.g. "March 2025" or "2024 – 2025". */
  date: string;
  /** Optional one-line location, shown next to the date in the section header. */
  location?: string;
};

export const ALBUMS: AlbumMeta[] = [
  {
    slug: "california-2025",
    title: "California",
    date: "2025",
    location: "San Francisco & Yosemite",
  },
];
