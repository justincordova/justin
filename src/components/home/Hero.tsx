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
import { useScrollProgress } from "@/hooks/useScrollFade";

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

export default function Hero() {
  // Fade content as user scrolls through the hero. 70vh feels right —
  // fully faded by the time hero is mostly out of view, not instantly.
  const progress = useScrollProgress(
    typeof window !== "undefined" ? window.innerHeight * 0.7 : 600,
  );
  const opacity = 1 - progress * 0.7;
  const translateY = progress * -24;

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center px-6"
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
          className="h-40 w-40 shrink-0 rounded-xl border border-edge transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-edge/50 md:h-48 md:w-48"
        />
        <div className="text-center md:text-left">
          <p className="animate-fade-up stagger-1 text-base text-muted">Hi there! I'm</p>
          <h1
            className="animate-fade-up stagger-2 tracking-tight text-primary"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: "40px", fontWeight: 650 }}
          >
            Justin Cordova
          </h1>
          <p
            className="animate-fade-up stagger-3 tracking-tight text-secondary"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: "40px", fontWeight: 650 }}
          >
            I make things on the internet.
          </p>
          <p className="animate-fade-up stagger-4 mt-2 text-base text-content">
            Software Developer Intern @{" "}
            <a
              href="https://pureittech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-opacity hover:opacity-80"
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

          <div className="animate-fade-up stagger-6 mt-5 flex items-center justify-center gap-3 md:justify-start">
            {icons.map((icon) => (
              <div key={icon.name} className="group relative">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 opacity-40 transition-all duration-200 group-hover:opacity-100 group-hover:scale-110"
                  style={{ fill: icon.color }}
                  aria-label={icon.name}
                >
                  <path d={icon.path} />
                </svg>
                {/* Tooltip */}
                <span
                  className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-surface-2 px-2 py-1 text-xs text-content opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                  style={{ fontFamily: "'Geist Mono', ui-monospace, monospace" }}
                >
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
