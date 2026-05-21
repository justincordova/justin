export type Theme = "dark" | "light";

const THEME_COLORS: Record<Theme, string> = {
  dark: "#161617",
  light: "#ffffff",
};

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  // Keep the mobile browser chrome (Safari address bar, Chrome status bar) in
  // sync with the active theme so it doesn't flash the other color on toggle.
  const meta = document.getElementById("theme-color");
  if (meta) meta.setAttribute("content", THEME_COLORS[theme]);
}

/**
 * Resolve the user's effective theme. Honors an explicit stored preference,
 * then falls back to the OS-level `prefers-color-scheme`, then dark.
 *
 * Must mirror the inline boot script in index.html — keep these in sync or
 * the React tree will hydrate against a different theme than what painted.
 */
export function getStoredTheme(): Theme {
  const stored = typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null;
  if (stored === "light" || stored === "dark") return stored;
  if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  return "dark";
}
