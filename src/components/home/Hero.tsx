import {
  siC,
  siDotnet,
  siGo,
  siJavascript,
  siMysql,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siSharp,
  siTypescript,
} from "simple-icons";
import HeroScrollHint from "@/components/home/HeroScrollHint";
import LocationWidget from "@/components/home/LocationWidget";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const icons = [
  { name: "TypeScript", path: siTypescript.path, color: `#${siTypescript.hex}` },
  { name: "JavaScript", path: siJavascript.path, color: `#${siJavascript.hex}` },
  { name: "C#", path: siSharp.path, color: `#${siSharp.hex}` },
  { name: "Go", path: siGo.path, color: `#${siGo.hex}` },
  { name: "Python", path: siPython.path, color: `#${siPython.hex}` },
  { name: "C", path: siC.path, color: `#${siC.hex}` },
  { name: "React", path: siReact.path, color: `#${siReact.hex}` },
  { name: "Node.js", path: siNodedotjs.path, color: `#${siNodedotjs.hex}` },
  { name: ".NET", path: siDotnet.path, color: `#${siDotnet.hex}` },
  { name: "PostgreSQL", path: siPostgresql.path, color: `#${siPostgresql.hex}` },
  { name: "MySQL", path: siMysql.path, color: `#${siMysql.hex}` },
];

// Shared style for the two large hero lines so the scale lives in one place.
// Font family comes from the `font-sans` class on each consumer.
const HERO_DISPLAY_STYLE: React.CSSProperties = {
  fontSize: "clamp(1.75rem, 7vw, 2.5rem)",
  fontWeight: 650,
  lineHeight: 1.1,
};

export default function Hero() {
  // Fade content as user scrolls through ~70% of the viewport.
  // Hook reads viewport height internally so this stays correct on resize.
  const progress = useScrollProgress(0.7);
  const opacity = 1 - progress * 0.7;
  const translateY = progress * -24;

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center px-6 py-12"
      style={{ marginTop: "calc(var(--nav-h) * -1)" }}
    >
      <div
        className="mx-auto flex max-w-container flex-col items-center gap-8 md:flex-row md:gap-16"
        style={{
          opacity,
          transform: `translate3d(0, ${translateY}px, 0)`,
          willChange: "opacity, transform",
        }}
      >
        <img
          src="/headshot.jpg"
          alt="Justin Cordova"
          width={256}
          height={256}
          className="h-40 w-40 shrink-0 rounded-xl border border-edge transition-transform duration-300 ease-out hover:scale-[1.02] md:h-48 md:w-48"
        />
        <div className="text-center md:text-left">
          <p className="animate-fade-up stagger-1 text-base text-muted">Hi there! I'm</p>
          <h1
            className="animate-fade-up stagger-2 font-sans tracking-tight text-primary"
            style={HERO_DISPLAY_STYLE}
          >
            Justin Cordova
          </h1>
          <p
            className="animate-fade-up stagger-3 font-sans tracking-tight text-secondary"
            style={HERO_DISPLAY_STYLE}
          >
            Making the internet slightly better.
          </p>
          <p className="animate-fade-up stagger-4 mt-2 text-base text-content">
            Software Developer Intern @{" "}
            <a
              href="https://pureittech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              Pure Technology Inc.
            </a>
          </p>
          <p className="animate-fade-up stagger-5 mt-1 text-base text-content">
            CS @{" "}
            <a
              href="https://www.njit.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              NJIT
            </a>
          </p>
          <p className="animate-fade-up stagger-5 mt-3 max-w-md text-sm text-muted">
            Building full-stack apps with TypeScript, React, C#, .NET, Go.
            <br />
            Building with AI.
          </p>

          <div className="animate-fade-up stagger-6 mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:justify-start">
            {icons.map((icon) => (
              <div key={icon.name} className="group relative flex flex-col items-center gap-0.5">
                {/* Decorative icon — not in the keyboard tab order (these
                    aren't actionable). role="img"+aria-label still lets SR
                    users hear the language name when they read the page. */}
                <span role="img" aria-label={icon.name} className="inline-flex">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 opacity-40 transition-all duration-200 group-hover:scale-110 group-hover:opacity-100"
                    style={{ fill: icon.color }}
                    aria-hidden="true"
                  >
                    <path d={icon.path} />
                  </svg>
                </span>
                {/* Desktop tooltip — appears on hover. */}
                <span className="pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 translate-y-1 whitespace-nowrap rounded bg-surface-2 px-2 py-1 font-mono text-xs text-content opacity-0 transition-all duration-200 ease-out group-hover:-translate-y-0 group-hover:opacity-100 md:block">
                  {icon.name}
                </span>
                {/* Mobile persistent label — visible by default below the
                    icon since there's no hover state to surface it. */}
                <span className="font-mono text-[9px] tracking-wide text-faint/70 md:hidden">
                  {icon.name}
                </span>
              </div>
            ))}
          </div>

          <div className="animate-fade-up stagger-6 mt-5 flex justify-center md:justify-start">
            <LocationWidget />
          </div>
        </div>
      </div>
      <HeroScrollHint />
    </section>
  );
}
