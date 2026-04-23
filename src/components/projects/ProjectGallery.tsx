import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import FocusLock from "react-focus-lock";

interface ProjectGalleryProps {
  name: string;
  images: string[];
  open: boolean;
  onClose: () => void;
}

export default function ProjectGallery({ name, images, open, onClose }: ProjectGalleryProps) {
  const [index, setIndex] = useState(0);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (open) {
      setIndex(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose, prev, next]);

  if (!open) return null;

  return createPortal(
    <FocusLock returnFocus>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${name} screenshots`}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="animate-fade-in relative mx-4 flex w-full max-w-3xl flex-col items-center gap-4 rounded-xl border border-edge bg-surface p-4 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex w-full items-center justify-between">
            <span className="text-sm font-medium text-muted">{name}</span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1.5 text-muted transition-colors hover:bg-surface-2 hover:text-red-400"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="relative w-full aspect-video">
            <img
              src={images[index]}
              alt={`${name} screenshot ${index + 1}`}
              className="absolute inset-0 h-full w-full rounded-lg object-contain"
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-surface-2/80 p-2 text-muted transition-colors hover:bg-surface-2 hover:text-content"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-surface-2/80 p-2 text-muted transition-colors hover:bg-surface-2 hover:text-content"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === index ? "w-6 bg-primary" : "w-3 bg-surface-2 hover:bg-faint"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </FocusLock>,
    document.body,
  );
}
