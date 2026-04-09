import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { applyTheme, getStoredTheme, type Theme } from "@/lib/theme";

export default function ThemeSelector() {
  const [current, setCurrent] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    applyTheme(getStoredTheme());
  }, []);

  function toggle() {
    const next: Theme = current === "dark" ? "light" : "dark";
    setCurrent(next);
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
