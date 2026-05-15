import { useState } from "react";
import type { GitHubRepo } from "@/types/github";
import ProjectGallery from "./ProjectGallery";

const PROJECT_LOGOS: Record<string, string> = {
  seshr: "/logos/seshr.png",
  findu: "/logos/findu.png",
  rumi: "/logos/rumi.png",
  arcadeai: "/logos/arcadeai.png",
  dotcor: "/logos/dotcor.png",
};

const PROJECT_URLS: Record<string, string> = {
  arcadeai: "https://arcadeai.fly.dev/",
};

const PROJECT_GALLERY: Record<string, string[]> = {
  seshr: ["/demo/seshr1.png", "/demo/seshr2.png", "/demo/seshr3.png"],
  findu: ["/demo/findu1.jpeg", "/demo/findu2.jpeg", "/demo/findu3.png", "/demo/findu4.png"],
  rumi: ["/demo/rumi1.png", "/demo/rumi2.png", "/demo/rumi3.png", "/demo/rumi4.png"],
  dotcor: ["/demo/dotcor1.png", "/demo/dotcor2.png", "/demo/dotcor3.png"],
};

interface ProjectRowProps {
  repo: GitHubRepo;
  featured?: boolean;
  /** Index used to stagger fade-in on mount. */
  index?: number;
}

const OCTOCAT_PATH =
  "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z";

function ProjectLogo({ name }: { name: string }) {
  const logo = PROJECT_LOGOS[name.toLowerCase()];

  if (logo) {
    return (
      <img
        src={logo}
        alt={`${name} logo`}
        className="h-7 w-7 shrink-0 object-contain"
        loading="lazy"
      />
    );
  }

  // Faint GitHub octocat fallback — keeps consistent visual weight when no logo is set
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7 shrink-0 text-faint/60"
      fill="currentColor"
      role="img"
      aria-label="GitHub repository"
    >
      <path d={OCTOCAT_PATH} />
    </svg>
  );
}

export default function ProjectRow({ repo, featured, index = 0 }: ProjectRowProps) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const gallery = PROJECT_GALLERY[repo.name] ?? [];
  const customUrl = PROJECT_URLS[repo.name.toLowerCase()];
  const isInteractive = Boolean(customUrl) || gallery.length > 0;
  const animationDelay = `${Math.min(index, 12) * 40}ms`;

  const handleRowClick = () => {
    if (customUrl) {
      window.open(customUrl, "_blank", "noopener,noreferrer");
    } else if (gallery.length > 0) {
      setGalleryOpen(true);
    }
  };

  const topics = repo.topics.slice(0, 4);

  // Snappy expo-out curve — front-loads motion so the row "snaps" to its
  // hover state. Pairs with longer durations than ease-out would feel right at.
  const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

  const content = (
    <>
      {/* Leading accent bar — slides in from the left edge */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 h-10 w-[2px] -translate-y-1/2 -translate-x-2 rounded-full bg-primary opacity-0 transition-[transform,opacity] group-hover:translate-x-0 group-hover:opacity-100"
        style={{
          transitionDuration: "350ms",
          transitionTimingFunction: EASE,
        }}
      />

      <ProjectLogo name={repo.name} />

      <div className="min-w-0 flex-1">
        <h3 className="flex items-center gap-2 font-sans text-base font-medium text-content transition-colors duration-[250ms] ease-out group-hover:text-primary">
          <span className="truncate">{repo.name}</span>
          {featured && (
            <span
              className="shrink-0 text-xs text-faint/60"
              title="Featured"
              aria-hidden="true"
            >
              ★
            </span>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${repo.name} on GitHub`}
            className="shrink-0 text-faint/70 transition-colors duration-200 hover:text-content"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
              role="img"
              aria-label="GitHub"
            >
              <path d={OCTOCAT_PATH} />
            </svg>
          </a>
        </h3>
        <p
          className="mt-0.5 truncate text-sm text-muted transition-colors duration-[250ms] ease-out group-hover:text-content"
          style={{ transitionDelay: "60ms" }}
        >
          {repo.description || "No description available."}
        </p>
        {topics.length > 0 && (
          <p
            className="mt-1.5 truncate text-xs text-faint transition-colors duration-[250ms] ease-out group-hover:text-muted"
            style={{
              fontFamily: "'Geist Mono', ui-monospace, monospace",
              transitionDelay: "80ms",
            }}
          >
            {topics.join(" · ")}
          </p>
        )}
      </div>

    </>
  );

  const baseClass =
    "animate-fade-up group relative flex w-full items-center gap-5 border-b border-edge/40 px-2 py-5 text-left last:border-b-0";

  if (isInteractive) {
    return (
      <>
        <button
          type="button"
          onClick={handleRowClick}
          style={{
            animationDelay,
            transitionProperty: "background-color",
            transitionDuration: "250ms",
            transitionTimingFunction: "ease-out",
          }}
          className={`${baseClass} hover:bg-surface/30`}
        >
          {content}
        </button>

        {gallery.length > 0 && (
          <ProjectGallery
            name={repo.name}
            images={gallery}
            open={galleryOpen}
            onClose={() => setGalleryOpen(false)}
          />
        )}
      </>
    );
  }

  // Non-interactive row — no hover motion, no nested button needed
  return (
    <div style={{ animationDelay }} className={baseClass}>
      {content}
    </div>
  );
}
