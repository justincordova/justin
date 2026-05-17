import { useEffect } from "react";

/**
 * Page-down / page-up via spacebar:
 * - Space → smooth-scroll one viewport down
 * - Shift+Space → smooth-scroll one viewport up
 *
 * Skips inputs/contenteditable and ignores Ctrl/Meta/Alt modifiers.
 */
export function useSpacePageScroll() {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key !== " " && event.code !== "Space") return;
      if (event.ctrlKey || event.metaKey || event.altKey) return;

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

      event.preventDefault();

      const prefersReducedMotion =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Leave a little overlap so users don't lose their place between pages.
      const delta = window.innerHeight * 0.9 * (event.shiftKey ? -1 : 1);
      window.scrollBy({
        top: delta,
        left: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
}
