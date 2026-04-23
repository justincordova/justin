import { Tag } from "lucide-react";
import { getTopicIconUrl } from "@/lib/topic-icons";
import type { GitHubRepo } from "@/types/github";

const PROJECT_IMAGES: Record<string, string> = {
  seshr: "/seshr.png",
  dotcor: "/dotcor.png",
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
  const src = PROJECT_IMAGES[name];

  if (src) {
    return (
      <div className="overflow-hidden rounded-t-xl">
        <img
          src={src}
          alt={`${name} preview`}
          className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-video items-center justify-center rounded-t-xl bg-gradient-to-br from-surface-2 to-surface">
      <span className="text-4xl font-light text-faint/40 select-none">
        {name.slice(0, 1).toUpperCase()}
      </span>
    </div>
  );
}

export default function ProjectCard({ repo }: ProjectCardProps) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-edge bg-surface transition-all duration-200 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/5 hover:scale-105"
    >
      <ProjectThumbnail name={repo.name} />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1.5 font-sans text-base font-semibold text-content transition-colors group-hover:text-primary">
          {repo.name}
        </h3>
        <p className="mb-4 flex-1 line-clamp-3 text-sm leading-relaxed text-muted">
          {repo.description || "No description available."}
        </p>
        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {repo.topics.slice(0, 6).map((topic) => (
              <TopicBadge key={topic} topic={topic} />
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
