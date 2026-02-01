import { Tag } from "lucide-react";
import type { GitHubRepo } from "@/types/github";
import { getTopicIconUrl } from "@/lib/topic-icons";

interface ProjectCardProps {
  repo: GitHubRepo;
}

function TopicBadge({ topic }: { topic: string }) {
  const iconUrl = getTopicIconUrl(topic);

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-ctp-surface1/60 px-2 py-1 text-[11px] text-ctp-subtext0">
      {iconUrl ? (
        <img src={iconUrl} alt="" className="h-3 w-3" loading="lazy" />
      ) : (
        <Tag className="h-2.5 w-2.5 text-ctp-overlay0" />
      )}
      {topic}
    </span>
  );
}

export default function ProjectCard({ repo }: ProjectCardProps) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl border border-ctp-surface1 bg-ctp-surface0 p-5 transition-all duration-200 hover:border-ctp-mauve/60 hover:shadow-lg hover:shadow-ctp-mauve/5"
    >
      <h3 className="mb-1.5 font-sans text-base font-semibold text-ctp-text transition-colors group-hover:text-ctp-mauve">
        {repo.name}
      </h3>
      <p className="mb-4 flex-1 line-clamp-3 text-sm leading-relaxed text-ctp-subtext0">
        {repo.description || "No description available."}
      </p>
      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 6).map((topic) => (
            <TopicBadge key={topic} topic={topic} />
          ))}
        </div>
      )}
    </a>
  );
}
