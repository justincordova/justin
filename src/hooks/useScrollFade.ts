import { useEffect, useState } from "react";

/**
 * Returns a value 0..1 representing how far the user has scrolled
 * through the first viewport-height of the page. 0 = top, 1 = scrolled
 * a full viewport (or beyond).
 *
 * Respects `prefers-reduced-motion` by always returning 0.
 */
export function useScrollProgress(distance = window.innerHeight): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const scrollY = window.scrollY;
      const ratio = Math.min(1, Math.max(0, scrollY / Math.max(1, distance)));
      setProgress(ratio);
    };

    const onScroll = () => {
      if (raf !== 0) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf !== 0) cancelAnimationFrame(raf);
    };
  }, [distance]);

  return progress;
}
