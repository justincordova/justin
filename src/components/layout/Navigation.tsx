import type { LucideProps } from "lucide-react";
import { FileText, Mail, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import ThemeSelector from "@/components/layout/ThemeSelector";
import ResumeModal from "@/components/shared/ResumeModal";
import { cn } from "@/lib/utils";

function GitHubIcon({ className, ...props }: LucideProps) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedInIcon({ className, ...props }: LucideProps) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const navLinks = [
  { label: "justin", path: "/" },
  { label: "projects", path: "/projects" },
  { label: "pics", path: "/pics" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/justincordova",
    icon: GitHubIcon,
    color: "hover:text-content",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/justinalolorcordova/",
    icon: LinkedInIcon,
    color: "hover:text-primary",
  },
  {
    label: "Email",
    href: "mailto:justinavodroc@gmail.com",
    icon: Mail,
    color: "hover:text-secondary",
  },
];

function getPathDisplay(pathname: string): string {
  if (pathname === "/") return "~/justin";
  return `~${pathname}`;
}

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathDisplay = getPathDisplay(location.pathname);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const pageRoutes = ["/", "/projects", "/pics"];
  const currentIndex = pageRoutes.indexOf(location.pathname);

  const handleToggle = () => {
    const nextIndex = (currentIndex + 1) % pageRoutes.length;
    navigate(pageRoutes[nextIndex]);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-bg/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-container items-center justify-between px-6 py-4">
          <div className="hidden items-center gap-6 sm:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                aria-current={location.pathname === link.path ? "page" : undefined}
                className={cn(
                  "relative text-sm font-medium tracking-wide transition-colors duration-200",
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted hover:text-content",
                )}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-primary" />
                )}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={handleToggle}
            className="group absolute left-1/2 -translate-x-1/2 cursor-pointer px-6 py-2"
          >
            <span className="block select-none font-mono text-sm tracking-wide opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <span className="text-primary">~</span>
              <span className="text-muted">{pathDisplay.slice(1)}</span>
            </span>
          </button>

          <div className="hidden items-center gap-1 sm:flex">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                className={`group rounded-lg p-2 text-muted transition-all duration-200 hover:bg-surface ${link.color}`}
              >
                <link.icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              </a>
            ))}
            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              aria-label="Resume"
              className="group rounded-lg p-2 text-muted transition-all duration-200 hover:bg-surface hover:text-secondary"
            >
              <FileText className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
            </button>
            <ThemeSelector />
          </div>

          <div className="ml-auto flex items-center gap-2 sm:hidden">
            <ThemeSelector />
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-md p-2 text-muted transition-colors hover:bg-surface hover:text-content"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div id="mobile-menu" className="animate-fade-in px-6 py-4 sm:hidden">
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
                      ? "bg-surface text-primary"
                      : "text-muted hover:bg-surface/50 hover:text-content",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 pt-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={link.label}
                    className="rounded-lg p-2 text-muted transition-colors hover:bg-surface hover:text-content"
                  >
                    <link.icon className="h-4 w-4" />
                  </a>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setResumeOpen(true);
                  }}
                  aria-label="Resume"
                  className="rounded-lg p-2 text-muted transition-colors hover:bg-surface hover:text-secondary"
                >
                  <FileText className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
