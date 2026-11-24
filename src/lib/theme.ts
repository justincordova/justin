export type Theme = "dark" | "light";

const THEME_COLORS: Record<Theme, string> = {
  dark: "#161617",
  light: "#ffffff",
};

/**
 * Event dispatched on the window whenever the theme changes. Lets every
 * mounted ThemeSelector stay in sync — Navigation renders one for desktop
 * and one for mobile simultaneously, so a toggle on either must update the
 * other (otherwise the hidden one keeps stale state and breaks after a
 * cross-breakpoint resize).
 */
export const THEME_CHANGE_EVENT = "themechange";

/**
 * Apply a theme to the document. `persist` is false when following the OS
 * preference so that following it never gets mistaken for an explicit
 * choice (which would pin the theme and ignore later OS changes).
 */
export function applyTheme(theme: Theme, { persist = true }: { persist?: boolean } = {}) {
  document.documentElement.setAttribute("data-theme", theme);
  if (persist) localStorage.setItem("theme", theme);
  // Keep the mobile browser chrome (Safari address bar, Chrome status bar) in
  // sync with the active theme so it doesn't flash the other color on toggle.
  const meta = document.getElementById("theme-color");
  if (meta) meta.setAttribute("content", THEME_COLORS[theme]);
  window.dispatchEvent(new CustomEvent<Theme>(THEME_CHANGE_EVENT, { detail: theme }));
}

/**
 * Apply a user-chosen theme as one crossfade. Without this, every element
 * with its own `transition-colors` animates at its own speed and the page
 * changes color in a staggered ripple. Per-element transitions are
 * suppressed for the swap; where the View Transitions API exists the whole
 * page crossfades instead.
 */
export function switchTheme(theme: Theme) {
  const root = document.documentElement;
  const swap = () => {
    root.setAttribute("data-theme-switching", "");
    applyTheme(theme);
    // Force a full-document style flush so every element picks up the new
    // colors while transitions are off. (getComputedStyle on the root alone
    // would only resolve the root, leaving descendants to transition.)
    void document.body.offsetHeight;
    root.removeAttribute("data-theme-switching");
  };

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (typeof document.startViewTransition !== "function" || reduceMotion) {
    swap();
    return;
  }
  document.startViewTransition(swap);
}

/** The explicit choice saved by the toggle, or null if the user never made one. */
export function getExplicitTheme(): Theme | null {
  const stored = typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null;
  return stored === "light" || stored === "dark" ? stored : null;
}

/**
 * Resolve the user's effective theme. Honors an explicit stored preference,
 * then falls back to the OS-level `prefers-color-scheme`, then dark.
 *
 * Must mirror the inline boot script in index.html — keep these in sync or
 * the React tree will hydrate against a different theme than what painted.
 */
export function getStoredTheme(): Theme {
  const explicit = getExplicitTheme();
  if (explicit) return explicit;
  if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  return "dark";
}
