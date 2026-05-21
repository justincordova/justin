import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import FocusLock from "react-focus-lock";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useSpacePageScroll } from "@/hooks/useSpacePageScroll";
import { type AlbumPhoto, getAlbumPhotos } from "@/lib/album-images";
import { ALBUMS, type AlbumMeta } from "@/lib/albums";

const MONO_FONT = "'Geist Mono', ui-monospace, monospace";

type Section = {
  meta: AlbumMeta;
  photos: AlbumPhoto[];
  /** Index of the first photo in this section within the flat photo list. */
  offset: number;
};

export default function Photos() {
  // Note: useSpacePageScroll handles its own input-target guards so it won't
  // fire while a user is typing.
  useSpacePageScroll();

  // Flatten albums into one ordered list of photos plus an index of sections.
  // The lightbox steps through the flat list so prev/next traverses sections
  // naturally; sections themselves are just visual groupings.
  const { sections, allPhotos } = useMemo(() => {
    const flat: AlbumPhoto[] = [];
    const list: Section[] = [];
    for (const meta of ALBUMS) {
      const photos = getAlbumPhotos(meta.slug);
      if (photos.length === 0) continue;
      list.push({ meta, photos, offset: flat.length });
      flat.push(...photos);
    }
    return { sections: list, allPhotos: flat };
  }, []);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  const total = allPhotos.length;
  const selectedPhoto = selectedIndex !== null ? allPhotos[selectedIndex] : null;

  const close = useCallback(() => setSelectedIndex(null), []);

  const goPrev = useCallback(() => {
    setSelectedIndex((i) => {
      if (i === null || total === 0) return i;
      return (i - 1 + total) % total;
    });
    setImageLoading(true);
  }, [total]);

  const goNext = useCallback(() => {
    setSelectedIndex((i) => {
      if (i === null || total === 0) return i;
      return (i + 1) % total;
    });
    setImageLoading(true);
  }, [total]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, close, goPrev, goNext]);

  // Reset loading state when lightbox closes so a canceled load doesn't
  // leave the next open stuck in a "loading" state.
  useEffect(() => {
    if (selectedIndex === null) setImageLoading(false);
  }, [selectedIndex]);

  useBodyScrollLock(selectedIndex !== null);

  const open = (index: number) => {
    setImageLoading(true);
    setSelectedIndex(index);
  };

  return (
    <div className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-container">
        {/* Header — same shape as Projects page for cross-page consistency */}
        <header className="animate-fade-up stagger-1 mb-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h1
            className="tracking-tight text-content"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
            }}
          >
            Photos
          </h1>
          {total > 0 && (
            <p className="truncate text-xs text-faint" style={{ fontFamily: MONO_FONT }}>
              {total} photo{total === 1 ? "" : "s"}
            </p>
          )}
        </header>

        {sections.length === 0 ? (
          <p className="text-sm text-muted">No photos yet.</p>
        ) : (
          sections.map((section, sectionIndex) => (
            <section key={section.meta.slug} className={sectionIndex === 0 ? "" : "mt-16"}>
              {/* Sticky section header — mirrors the year groupings on the
                  Projects page so the page feels of-a-piece. Uses a near-opaque
                  background instead of /80 so the title doesn't visually merge
                  with the photos passing behind it on scroll. */}
              <div
                className="sticky z-10 mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 bg-bg/95 py-2 backdrop-blur-sm"
                style={{ top: "var(--nav-h)" }}
              >
                <h2
                  className="tracking-tight text-content"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 500,
                    fontSize: "1.125rem",
                  }}
                >
                  {section.meta.title}
                </h2>
                <span
                  className="text-xs tracking-[0.15em] text-muted"
                  style={{ fontFamily: MONO_FONT }}
                >
                  {section.meta.date}
                  {section.meta.location ? ` · ${section.meta.location}` : ""}
                  {" · "}
                  {section.photos.length} photo{section.photos.length === 1 ? "" : "s"}
                </span>
                {/* Spacer line only shows when content fits on a single row */}
                <div className="hidden h-px flex-1 self-center bg-edge/40 sm:block" />
              </div>

              {/* CSS columns masonry — respects each image's natural aspect
                  ratio, no JS measurement required. break-inside avoids
                  splits mid-figure. <picture> emits WebP with a JPEG
                  fallback; explicit width/height on <img> prevents layout
                  shift as each photo loads. */}
              <div className="columns-2 gap-3 lg:columns-3 [&>figure]:mb-3">
                {section.photos.map((photo, i) => {
                  const flatIndex = section.offset + i;
                  return (
                    <figure key={photo.path} className="group break-inside-avoid">
                      <button
                        type="button"
                        onClick={() => open(flatIndex)}
                        aria-label={`Open photo ${flatIndex + 1} of ${total}`}
                        className="block w-full overflow-hidden rounded-lg border border-edge bg-surface/40 transition-all duration-300 hover:border-edge/80 hover:shadow-lg hover:shadow-black/20"
                      >
                        <picture>
                          {photo.thumb.sources.webp && (
                            <source srcSet={photo.thumb.sources.webp} type="image/webp" />
                          )}
                          <img
                            src={photo.thumb.img.src}
                            srcSet={photo.thumb.sources.jpg}
                            width={photo.thumb.img.w}
                            height={photo.thumb.img.h}
                            alt={`${section.meta.title} - photo ${i + 1} of ${section.photos.length}`}
                            loading="lazy"
                            decoding="async"
                            sizes="(min-width: 1024px) 350px, 50vw"
                            className="block w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                          />
                        </picture>
                      </button>
                      <figcaption
                        className="mt-1.5 px-0.5 text-[10px] tracking-[0.15em] text-faint/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ fontFamily: MONO_FONT }}
                      >
                        {String(i + 1).padStart(2, "0")} /{" "}
                        {String(section.photos.length).padStart(2, "0")}
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </section>
          ))
        )}
      </div>

      {selectedPhoto !== null && selectedIndex !== null && (
        <FocusLock returnFocus>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/85 p-4"
            onClick={close}
          >
            {/* Counter — top-left, mono, intentionally understated */}
            <span
              className="pointer-events-none absolute left-4 top-4 z-10 text-xs tracking-[0.2em] text-white/70"
              style={{ fontFamily: MONO_FONT }}
              aria-live="polite"
            >
              {String(selectedIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={close}
              aria-label="Close lightbox"
              className="absolute right-3 top-3 z-10 rounded-full bg-surface p-2 text-content transition-colors hover:bg-surface-2"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-surface/90 p-2 text-content transition-colors hover:bg-surface-2 sm:left-6"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-surface/90 p-2 text-content transition-colors hover:bg-surface-2 sm:right-6"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </>
            )}

            {imageLoading && <Loader2 className="absolute h-12 w-12 animate-spin text-primary" />}
            <picture key={selectedPhoto.full.img.src}>
              {selectedPhoto.full.sources.webp && (
                <source srcSet={selectedPhoto.full.sources.webp} type="image/webp" />
              )}
              <img
                src={selectedPhoto.full.img.src}
                srcSet={selectedPhoto.full.sources.jpg}
                width={selectedPhoto.full.img.w}
                height={selectedPhoto.full.img.h}
                alt={`Enlarged view - photo ${selectedIndex + 1} of ${total}`}
                onLoad={() => setImageLoading(false)}
                onClick={(e) => e.stopPropagation()}
                sizes="90vw"
                className={`max-h-[90vh] max-w-[90vw] rounded-lg object-contain ${imageLoading ? "opacity-0" : "animate-zoom-in"}`}
              />
            </picture>
          </div>
        </FocusLock>
      )}
    </div>
  );
}
