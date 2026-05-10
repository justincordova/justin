import {
  siDotnet,
  siDocker,
  siExpress,
  siGit,
  siGithubactions,
  siGo,
  siJupyter,
  siLinux,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPostman,
  siReact,
  siSharp,
  siTypescript,
  siVite,
} from "simple-icons";

interface Skill {
  name: string;
  path: string;
  color: string;
}

interface SkillGroup {
  label: string;
  skills: Skill[];
}

const groups: SkillGroup[] = [
  {
    label: "Languages",
    skills: [
      { name: "TypeScript", path: siTypescript.path, color: `#${siTypescript.hex}` },
      { name: "Go", path: siGo.path, color: `#${siGo.hex}` },
      { name: "C#", path: siSharp.path, color: `#${siSharp.hex}` },
    ],
  },
  {
    label: "Frameworks & libs",
    skills: [
      { name: "React", path: siReact.path, color: `#${siReact.hex}` },
      { name: "Next.js", path: siNextdotjs.path, color: "#a1a1aa" },
      { name: "Node.js", path: siNodedotjs.path, color: `#${siNodedotjs.hex}` },
      { name: "Express", path: siExpress.path, color: "#71717a" },
      { name: ".NET", path: siDotnet.path, color: `#${siDotnet.hex}` },
    ],
  },
  {
    label: "Databases",
    skills: [
      { name: "PostgreSQL", path: siPostgresql.path, color: `#${siPostgresql.hex}` },
      { name: "MongoDB", path: siMongodb.path, color: `#${siMongodb.hex}` },
      { name: "MySQL", path: siMysql.path, color: `#${siMysql.hex}` },
    ],
  },
  {
    label: "Dev tools",
    skills: [
      { name: "Git", path: siGit.path, color: `#${siGit.hex}` },
      { name: "Docker", path: siDocker.path, color: `#${siDocker.hex}` },
      { name: "Linux", path: siLinux.path, color: `#${siLinux.hex}` },
      { name: "Vite", path: siVite.path, color: `#${siVite.hex}` },
      { name: "GitHub Actions", path: siGithubactions.path, color: `#${siGithubactions.hex}` },
      { name: "Postman", path: siPostman.path, color: `#${siPostman.hex}` },
      { name: "Jupyter", path: siJupyter.path, color: `#${siJupyter.hex}` },
    ],
  },
];

function Badge({ skill }: { skill: Skill }) {
  return (
    <span
      className="group inline-flex items-center gap-2 rounded-md border border-edge bg-surface px-3 py-2 text-xs font-medium text-muted transition-all duration-200 hover:border-[--badge-color] hover:text-content"
      style={
        {
          "--badge-color": skill.color,
          fontFamily: "'Geist Mono', ui-monospace, monospace",
        } as React.CSSProperties
      }
    >
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5 shrink-0 opacity-60 transition-opacity duration-200 group-hover:opacity-100"
        style={{ fill: skill.color }}
        aria-hidden="true"
      >
        <path d={skill.path} />
      </svg>
      {skill.name}
    </span>
  );
}

export default function SkillBadges() {
  return (
    <section className="animate-fade-up stagger-6 px-6 pt-6 pb-0">
      <div className="mx-auto flex max-w-container flex-col items-center gap-8 md:flex-row md:gap-16">
        {/* Spacer that mirrors the avatar so content aligns under the text column */}
        <div className="hidden h-48 w-48 shrink-0 md:block" aria-hidden="true" />

        <div className="flex w-full flex-col gap-4">
          {groups.map((group) => (
            <div key={group.label} className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-widest text-faint">
                {group.label}
              </span>
              <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                {group.skills.map((skill) => (
                  <Badge key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
