import { Tag } from "lucide-react";
import { useState } from "react";
import { getTopicIconUrl } from "@/lib/topic-icons";
import type { GitHubRepo } from "@/types/github";
import ProjectGallery from "./ProjectGallery";

const PROJECT_LOGOS: Record<string, string> = {
  seshr: "/logos/seshr.png",
  dotcor: "/logos/dotcor.png",
  findu: "/logos/findu.png",
};

const PROJECT_GALLERY: Record<string, string[]> = {
  seshr: ["/demo/seshr1.png", "/demo/seshr2.png", "/demo/seshr3.png"],
  dotcor: ["/demo/dotcor1.png", "/demo/dotcor2.png", "/demo/dotcor3.png"],
};

interface ProjectCardProps {
  repo: GitHubRepo;
}

function TopicBadge({ topic }: { topic: string }) {
  const iconUrl = getTopicIconUrl(topic);

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-surface-2/60 px-2 py-1 text-[11px] text-muted">
      {iconUrl ? (
        <img src={iconUrl} alt="" className="h-3 w-3" loading="lazy" />
      ) : (
        <Tag className="h-2.5 w-2.5 text-faint" />
      )}
      {topic}
    </span>
  );
}

function ProjectThumbnail({ name }: { name: string }) {
  const logo = PROJECT_LOGOS[name];

  if (logo) {
    return (
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-t-xl">
        <img
          src={logo}
          alt={`${name} logo`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-t-xl bg-gradient-to-br from-surface-2 to-surface">
      <span className="text-4xl font-light text-faint/40 select-none">
        {name.slice(0, 1).toUpperCase()}
      </span>
    </div>
  );
}

export default function ProjectCard({ repo }: ProjectCardProps) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const gallery = PROJECT_GALLERY[repo.name] ?? [];

  return (
    <>
      <button
        type="button"
        onClick={() => gallery.length > 0 && setGalleryOpen(true)}
        className={`group flex h-full w-full flex-col overflow-hidden rounded-xl border border-edge bg-surface text-left transition-all duration-200 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/5 ${
          gallery.length > 0 ? "cursor-pointer hover:scale-105" : ""
        }`}
      >
        <div className="relative flex justify-center">
          <ProjectThumbnail name={repo.name} />
          {gallery.length > 0 && (
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-1 right-1 rounded-lg bg-surface-2/80 p-1.5 text-muted opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-surface-2 hover:text-content group-hover:opacity-100"
              aria-label="View on GitHub"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="currentColor"
                role="img"
                aria-label="GitHub"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          )}
        </div>
        <div className="flex flex-1 flex-col p-3">
          <h3 className="mb-0.5 font-sans text-sm font-semibold text-content transition-colors group-hover:text-primary">
            {repo.name}
          </h3>
          <p className="mb-2 flex-1 line-clamp-2 text-xs leading-relaxed text-muted">
            {repo.description || "No description available."}
          </p>
          {repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {repo.topics.slice(0, 3).map((topic) => (
                <TopicBadge key={topic} topic={topic} />
              ))}
            </div>
          )}
        </div>
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
