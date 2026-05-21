/**
 * Build-time discovery of all album photos.
 *
 * vite-imagetools requires static glob strings, so we glob every photo under
 * src/assets/photos/<album>/ once and partition by directory. Per album, we
 * generate two variant sets:
 *   - thumb: ≤800w WebP+JPEG for grid display
 *   - full:  ≤1920w WebP+JPEG for the lightbox
 *
 * `as=picture` returns { img: { src, w, h }, sources: { webp, jpg } } which
 * drops straight into a <picture> element.
 */
export type PictureSource = {
  img: { src: string; w: number; h: number };
  sources: Record<string, string>;
};

const thumbModules = import.meta.glob<PictureSource>("../assets/photos/*/*.{jpg,JPG,jpeg,JPEG}", {
  eager: true,
  query: { w: "400;800", format: "webp;jpg", as: "picture" },
  import: "default",
});

const fullModules = import.meta.glob<PictureSource>("../assets/photos/*/*.{jpg,JPG,jpeg,JPEG}", {
  eager: true,
  query: { w: "1200;1920", format: "webp;jpg", as: "picture" },
  import: "default",
});

export type AlbumPhoto = {
  /** Absolute glob path, used as a stable React key. */
  path: string;
  /** Filename only (e.g. "DSC05864.JPG"). */
  filename: string;
  thumb: PictureSource;
  full: PictureSource;
};

/**
 * Pull the album slug out of a glob path like
 *   "../assets/photos/california-2025/DSC05864.JPG"
 */
function pathToAlbum(path: string): { slug: string; filename: string } | null {
  const m = path.match(/\/assets\/photos\/([^/]+)\/([^/]+)$/);
  if (!m) return null;
  return { slug: m[1], filename: m[2] };
}

const byAlbum: Map<string, AlbumPhoto[]> = (() => {
  const map = new Map<string, AlbumPhoto[]>();
  for (const path of Object.keys(thumbModules).sort()) {
    const parsed = pathToAlbum(path);
    if (!parsed) continue;
    const photo: AlbumPhoto = {
      path,
      filename: parsed.filename,
      thumb: thumbModules[path],
      full: fullModules[path],
    };
    const list = map.get(parsed.slug);
    if (list) list.push(photo);
    else map.set(parsed.slug, [photo]);
  }
  return map;
})();

export function getAlbumPhotos(slug: string): AlbumPhoto[] {
  return byAlbum.get(slug) ?? [];
}
