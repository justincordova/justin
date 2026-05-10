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
  return (
    <section className="flex items-center justify-center px-6 pt-6 pb-0">
      <div className="mx-auto flex max-w-container flex-col items-center gap-8 md:flex-row md:gap-16">
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
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-surface-2 px-2 py-1 text-xs text-content opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                  style={{ fontFamily: "'Geist Mono', ui-monospace, monospace" }}
                >
                  {icon.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
