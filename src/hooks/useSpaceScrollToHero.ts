import { useEffect, useRef } from "react";

export function useSpaceScrollToHero() {
  const inHero = useRef(true);

  useEffect(() => {
    let scrollRaf = 0;

    const syncOnScroll = () => {
      scrollRaf = 0;
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
      const block = inHero.current ? "center" : "start";
      inHero.current = !inHero.current;

      const prefersReducedMotion =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      destination.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block,
      });
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
}
