import { useState } from "react";
import { GithubIcon, LinkedinIcon, FileText, Mail } from "lucide-react";
import ResumeModal from "@/components/shared/ResumeModal";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/justincordova",
    icon: GithubIcon,
    color: "hover:text-ctp-text",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/justinalolorcordova/",
    icon: LinkedinIcon,
    color: "hover:text-ctp-blue",
  },
  {
    label: "Resume",
    href: "#resume",
    icon: FileText,
    color: "hover:text-ctp-green",
  },
  {
    label: "Email",
    href: "mailto:justinavodroc@gmail.com",
    icon: Mail,
    color: "hover:text-ctp-peach",
  },
];

export default function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <section className="flex min-h-[40vh] items-center justify-center px-6 pt-2 pb-0">
      <div className="max-w-2xl text-center">
        <h1 className="animate-fade-up stagger-1 text-4xl tracking-tight text-ctp-text sm:text-5xl">
          Hey! I'm <span className="text-ctp-mauve">Justin Cordova</span>
        </h1>
        <p className="animate-fade-up stagger-2 mt-4 text-base leading-relaxed text-ctp-subtext1 sm:text-lg">
          I'm currently an SDE Intern @{" "}
          <span className="font-medium text-ctp-peach">Pure Technology Inc</span>.
          I'm learning to build software in{" "}
          <span className="text-ctp-blue">Go</span> and{" "}
          <span className="text-ctp-lavender">C#/.NET</span>, while in the past
          I've built full-stack applications with{" "}
          <span className="text-ctp-sapphire">TypeScript</span>. Building
          software from scratch is what makes it fun for me.
        </p>
        <div className="animate-fade-up stagger-3 mt-4 flex items-center justify-center gap-2">
          {socialLinks.map((link) =>
            link.label === "Resume" ? (
              <button
                key={link.label}
                onClick={() => setResumeOpen(true)}
                aria-label={link.label}
                className={`group rounded-lg p-3 text-ctp-overlay1 transition-all duration-200 hover:bg-ctp-surface0 ${link.color}`}
              >
                <link.icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              </button>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={link.label}
                className={`group rounded-lg p-3 text-ctp-overlay1 transition-all duration-200 hover:bg-ctp-surface0 ${link.color}`}
              >
                <link.icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              </a>
            )
          )}
        </div>
      </div>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}
