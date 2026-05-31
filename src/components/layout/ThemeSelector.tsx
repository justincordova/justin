import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { applyTheme, getStoredTheme, THEME_CHANGE_EVENT, type Theme } from "@/lib/theme";

export default function ThemeSelector() {
  const [current, setCurrent] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    applyTheme(getStoredTheme());
  }, []);

  // Stay in sync with any other ThemeSelector instance (Navigation mounts a
  // desktop and a mobile one at the same time) so the hidden instance never
  // holds stale state.
  useEffect(() => {
    const sync = (e: Event) => {
      const next = (e as CustomEvent<Theme>).detail;
      setCurrent(next === "light" || next === "dark" ? next : getStoredTheme());
    };
    window.addEventListener(THEME_CHANGE_EVENT, sync);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, sync);
  }, []);

  function toggle() {
    const next: Theme = current === "dark" ? "light" : "dark";
    applyTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-md p-2 text-muted transition-colors hover:bg-surface hover:text-content"
      aria-label={`Switch to ${current === "dark" ? "light" : "dark"} theme`}
    >
      {current === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
