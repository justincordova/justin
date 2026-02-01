import { useState, useEffect, useRef } from "react";
import { MoreVertical, Check } from "lucide-react";
import { applyTheme, getStoredFlavor, type CatppuccinFlavor } from "@/lib/theme";

const flavors: { value: CatppuccinFlavor; label: string }[] = [
  { value: "mocha", label: "Mocha" },
  { value: "macchiato", label: "Macchiato" },
  { value: "frappe", label: "Frappé" },
  { value: "latte", label: "Latte" },
];

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFlavor, setCurrentFlavor] = useState<CatppuccinFlavor>("mocha");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = getStoredFlavor();
    setCurrentFlavor(stored);
    applyTheme(stored);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  function selectFlavor(flavor: CatppuccinFlavor) {
    setCurrentFlavor(flavor);
    applyTheme(flavor);
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-md p-2 text-ctp-subtext0 transition-colors hover:bg-ctp-surface0 hover:text-ctp-text"
        aria-label="Theme selector"
        aria-expanded={isOpen}
      >
        <MoreVertical className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="animate-fade-in absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-lg border border-ctp-surface1 bg-ctp-surface0 shadow-lg">
          <div className="border-b border-ctp-surface1/50 px-3 py-2">
            <span className="text-xs font-semibold text-ctp-subtext1">Theme</span>
          </div>
          {flavors.map((flavor) => (
            <button
              key={flavor.value}
              onClick={() => selectFlavor(flavor.value)}
              className="flex w-full items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-ctp-surface1/50"
            >
              <span
                className={
                  currentFlavor === flavor.value
                    ? "text-ctp-mauve"
                    : "text-ctp-text"
                }
              >
                {flavor.label}
              </span>
              {currentFlavor === flavor.value && (
                <Check className="h-4 w-4 text-ctp-mauve" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
