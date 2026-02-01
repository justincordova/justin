import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "justin", path: "/" },
  { label: "about", path: "/about" },
  { label: "projects", path: "/projects" },
  { label: "pics", path: "/pics" },
];

function getPathDisplay(pathname: string): string {
  if (pathname === "/") return "~/";
  return "~" + pathname;
}

export default function Navigation() {
  const location = useLocation();
  const pathDisplay = getPathDisplay(location.pathname);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-ctp-base/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-container items-center justify-between px-6 py-4">
        <span className="font-mono text-sm tracking-wide text-ctp-overlay1">
          {pathDisplay}
        </span>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              aria-current={location.pathname === link.path ? "page" : undefined}
              className={cn(
                "relative text-sm font-medium tracking-wide transition-colors duration-200",
                location.pathname === link.path
                  ? "text-ctp-mauve"
                  : "text-ctp-subtext0 hover:text-ctp-text"
              )}
            >
              {link.label}
              {location.pathname === link.path && (
                <span className="absolute -bottom-1.5 left-0 h-px w-full bg-ctp-mauve" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-md p-2 text-ctp-subtext0 transition-colors hover:bg-ctp-surface0 hover:text-ctp-text sm:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="animate-fade-in px-6 py-4 sm:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                aria-current={location.pathname === link.path ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname === link.path
                    ? "bg-ctp-surface0 text-ctp-mauve"
                    : "text-ctp-subtext0 hover:bg-ctp-surface0/50 hover:text-ctp-text"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
