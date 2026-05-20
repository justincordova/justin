import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import FocusLock from "react-focus-lock";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useSpacePageScroll } from "@/hooks/useSpacePageScroll";

const MONO_FONT = "'Geist Mono', ui-monospace, monospace";

// Image variants generated at build time via vite-imagetools:
//   - thumb: small WebP + JPEG, sized for the grid (max width 800, accounts for 2x DPR on phones)
//   - full:  larger WebP + JPEG, sized for the lightbox (max width 1920)
// `as=picture` returns `{ img: { src, w, h }, sources: { webp, jpg } }` so we
// can drop it straight into a <picture> element with proper srcset fallbacks.
type PictureSource = {
  img: { src: string; w: number; h: number };
  sources: Record<string, string>;
};

const thumbModules = import.meta.glob<PictureSource>("../assets/pics/*.{jpg,JPG,jpeg,JPEG}", {
  eager: true,
  query: { w: "400;800", format: "webp;jpg", as: "picture" },
  import: "default",
});

const fullModules = import.meta.glob<PictureSource>("../assets/pics/*.{jpg,JPG,jpeg,JPEG}", {
  eager: true,
  query: { w: "1200;1920", format: "webp;jpg", as: "picture" },
  import: "default",
});

const imagePaths = Object.keys(thumbModules).sort();

// Build the in-memory variant tables once at module load. Since the globs are
// `eager: true`, this is synchronous — no useEffect/loading dance needed.
const thumbs = imagePaths.map((p) => thumbModules[p]);
const fulls = imagePaths.map((p) => fullModules[p]);

export default function Pics() {
  // Note: useSpacePageScroll handles its own input-target guards so it won't
  // fire while a user is typing.
  useSpacePageScroll();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  const total = imagePaths.length;
  const selectedFull = selectedIndex !== null ? fulls[selectedIndex] : null;

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
        {/* Header — mirrors Projects page typography for cross-page consistency */}
        <header className="animate-fade-up stagger-1 mb-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h1
            className="tracking-tight text-content"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
            }}
          >
            Pics
          </h1>
          {total > 0 && (
            <p className="truncate text-xs text-faint" style={{ fontFamily: MONO_FONT }}>
              {total} photo{total === 1 ? "" : "s"}
            </p>
          )}
        </header>

        {/* CSS columns masonry — respects each image's natural aspect ratio,
            no JS measurement required. break-inside avoids splits mid-figure.
            <picture> emits WebP with a JPEG fallback; explicit width/height
            on <img> prevents layout shift as each photo loads. */}
        <div className="animate-fade-up stagger-2 columns-2 gap-3 lg:columns-3 [&>figure]:mb-3">
          {thumbs.map((thumb, index) => (
            <figure key={imagePaths[index]} className="group break-inside-avoid">
              <button
                type="button"
                onClick={() => open(index)}
                aria-label={`Open photo ${index + 1} of ${total}`}
                className="block w-full overflow-hidden rounded-lg border border-edge bg-surface/40 transition-all duration-300 hover:border-edge/80 hover:shadow-lg hover:shadow-black/20"
              >
                <picture>
                  {thumb.sources.webp && <source srcSet={thumb.sources.webp} type="image/webp" />}
                  <img
                    src={thumb.img.src}
                    srcSet={thumb.sources.jpg}
                    width={thumb.img.w}
                    height={thumb.img.h}
                    alt={`Photo ${index + 1} of ${total}`}
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
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {selectedFull !== null && selectedIndex !== null && (
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
            <picture key={selectedFull.img.src}>
              {selectedFull.sources.webp && (
                <source srcSet={selectedFull.sources.webp} type="image/webp" />
              )}
              <img
                src={selectedFull.img.src}
                srcSet={selectedFull.sources.jpg}
                width={selectedFull.img.w}
                height={selectedFull.img.h}
                alt={`Enlarged view - Photo ${selectedIndex + 1} of ${total}`}
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
