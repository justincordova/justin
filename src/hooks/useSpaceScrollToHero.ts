import { useEffect } from "react";

/**
 * Bidirectional spacebar toggle:
 * - Press space while on the hero → smooth-scroll to #content
 * - Press space while on section 2 → smooth-scroll back to #hero
 *
 * Skips inputs/contenteditable and respects modifier keys (Shift+Space etc.).
 */
export function useSpaceScrollToHero() {
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

      const withinHero = window.scrollY < hero.offsetHeight - 100;
      const destination = withinHero ? content : hero;

      event.preventDefault();
      const prefersReducedMotion =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      destination.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
}
