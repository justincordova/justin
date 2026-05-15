import { useEffect, useState } from "react";

/**
 * Returns a value 0..1 representing how far the user has scrolled
 * through a given distance. 0 = top, 1 = scrolled past `distanceFactor`
 * of viewport height (or beyond).
 *
 * `distanceFactor` is the multiplier applied to `window.innerHeight` — the
 * hook reads the viewport height internally so it stays correct across
 * resizes (orientation changes, mobile browser chrome show/hide, etc.).
 *
 * Respects `prefers-reduced-motion` by always returning 0.
 */
export function useScrollProgress(distanceFactor = 1): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const distance = Math.max(1, window.innerHeight * distanceFactor);
      const ratio = Math.min(1, Math.max(0, window.scrollY / distance));
      setProgress(ratio);
    };

    const onScroll = () => {
      if (raf !== 0) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf !== 0) cancelAnimationFrame(raf);
    };
  }, [distanceFactor]);

  return progress;
}
