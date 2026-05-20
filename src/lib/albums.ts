/**
 * Album registry.
 *
 * To add a new album:
 *   1. Drop the photos into `src/assets/pics/<slug>/`
 *   2. Add an entry below — slug must match the folder name
 *   3. Optionally set `cover` to a specific filename, otherwise the first
 *      photo in the folder is used.
 *
 * Order in this array controls display order on the /pics index.
 */
export type AlbumMeta = {
  slug: string;
  title: string;
  /** Short date string, e.g. "March 2025" or "2024 – 2025". */
  date: string;
  /** Optional one-line location / location-and-context. */
  location?: string;
  /** Optional one-sentence blurb shown on the album page. */
  blurb?: string;
  /** Filename (e.g. "DSC05864.JPG") to use as the cover. Defaults to first. */
  cover?: string;
};

export const ALBUMS: AlbumMeta[] = [
  {
    slug: "california-2025",
    title: "California",
    date: "2025",
    location: "San Francisco & Big Sur",
    blurb: "A week up the coast.",
  },
];

export function findAlbum(slug: string): AlbumMeta | undefined {
  return ALBUMS.find((a) => a.slug === slug);
}
