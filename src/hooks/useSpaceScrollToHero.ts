import { useEffect, useRef } from "react";

export function useSpaceScrollToHero() {
  const inHero = useRef(true);
  const isProgrammaticScroll = useRef(false);

  useEffect(() => {
    let scrollRaf = 0;

    const syncOnScroll = () => {
      scrollRaf = 0;
      if (isProgrammaticScroll.current) return;
      if (window.scrollY < 50) {
        inHero.current = true;
      }
    };

    const onScroll = () => {
      if (scrollRaf !== 0) return;
      scrollRaf = requestAnimationFrame(syncOnScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollRaf !== 0) cancelAnimationFrame(scrollRaf);
    };
  }, []);

  useEffect(() => {
    let resetTimer: ReturnType<typeof setTimeout> | undefined;

    const handler = (event: KeyboardEvent) => {
      if (event.key !== " " && event.code !== "Space") return;
      if (event.shiftKey || event.ctrlKey || event.metaKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          target.isContentEditable ||
          target.getAttribute("role") === "textbox"
        ) {
          return;
        }
      }

      const hero = document.getElementById("hero");
      const content = document.getElementById("content");
      if (!hero || !content) return;

      event.preventDefault();

      const destination = inHero.current ? content : hero;
      inHero.current = !inHero.current;

      const prefersReducedMotion =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      isProgrammaticScroll.current = true;
      destination.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });

      // Clear any pending reset so rapid presses don't let an earlier timer
      // flip the suppression flag back on mid-scroll. Tracked so it can also
      // be cancelled on unmount.
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 800);
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, []);
}
