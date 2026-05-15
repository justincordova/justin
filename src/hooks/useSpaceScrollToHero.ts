import { useEffect } from "react";

/**
 * One-way spacebar shortcut: when the user is within the hero section,
 * pressing space smooth-scrolls to the #content section. Anywhere else
 * on the page, native browser behavior (page-down) is preserved.
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
      if (!withinHero) return;

      event.preventDefault();
      const prefersReducedMotion =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      content.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
}
