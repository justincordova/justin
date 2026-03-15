export default function About() {
  return (
    <div className="flex h-full flex-col px-6 py-4 overflow-hidden">
      <div className="mx-auto grid max-w-container flex-shrink-0 items-start gap-6 md:grid-cols-[2fr_3fr]">
        <div className="animate-fade-up stagger-1 mt-12 flex justify-center">
          <img
            src="/about.PNG"
            alt="Justin Cordova"
            className="max-h-[45vh] max-w-full rounded-xl border border-ctp-surface1"
          />
        </div>

        <div className="animate-fade-up stagger-2 min-h-0">
          <h1 className="mb-3 text-3xl tracking-tight text-ctp-text">About</h1>
          <div className="space-y-3 leading-relaxed text-ctp-subtext1">
            <p>
              Hey! I'm Justin, an SDE Intern at <span className="text-ctp-mauve">Pure Technology Inc</span>. I build software both professionally and for fun, and I'm always tinkering with new ideas when I have free time.
            </p>
            <p>
              Lately, I've been really interested in <span className="text-ctp-mauve">Go</span>, especially for backend services and tooling. For my current internship, though, I'm diving deep into <span className="text-ctp-mauve">C# and .NET</span>, working on production systems and getting hands-on experience with real-world engineering challenges. In the past, I've built a variety of full-stack applications using TypeScript, React, Node.js, Express, and related tooling.
            </p>
            <p>
              My latest project is <span className="text-ctp-mauve">dotcor</span>, a simple symlink-based dotfile manager focused on being lightweight and easy to reason about. Before that, I built <span className="text-ctp-mauve">FindU</span>, a college-exclusive dating app designed to connect verified students on campus, with an emphasis on privacy, safety, and clean UX.
            </p>
            <p>
              Outside of software, I play <span className="text-ctp-mauve">racquetball</span> and <span className="text-ctp-mauve">tennis</span>, hit the <span className="text-ctp-mauve">gym</span> daily, and run a couple of times a week. I also enjoy <span className="text-ctp-mauve">photography</span>, as you can probably tell from my photos, and I'm always down to explore new places and experiences.
            </p>
          </div>
        </div>
      </div>

      <div className="animate-fade-up stagger-3 mx-auto mt-4 flex max-w-container flex-col items-center justify-center flex-1 min-h-0">
        <h2 className="mb-3 text-lg font-semibold text-ctp-mauve">For Fun</h2>
        <div className="flex flex-row gap-4 justify-center items-center">
          <img
            src="/ai-ghibli/g1.png"
            alt="AI Ghibli style artwork"
            className="h-40 w-auto rounded-lg border border-ctp-surface1 transition-all duration-200 hover:scale-105 hover:border-ctp-mauve"
          />
          <img
            src="/ai-ghibli/g2.png"
            alt="AI Ghibli style artwork"
            className="h-40 w-auto rounded-lg border border-ctp-surface1 transition-all duration-200 hover:scale-105 hover:border-ctp-mauve"
          />
          <img
            src="/ai-ghibli/g3.png"
            alt="AI Ghibli style artwork"
            className="h-40 w-auto rounded-lg border border-ctp-surface1 transition-all duration-200 hover:scale-105 hover:border-ctp-mauve"
          />
          <img
            src="/ai-ghibli/g4.png"
            alt="AI Ghibli style artwork"
            className="h-40 w-auto rounded-lg border border-ctp-surface1 transition-all duration-200 hover:scale-105 hover:border-ctp-mauve"
          />
          <img
            src="/ai-ghibli/g5.png"
            alt="AI Ghibli style artwork"
            className="h-40 w-auto rounded-lg border border-ctp-surface1 transition-all duration-200 hover:scale-105 hover:border-ctp-mauve"
          />
        </div>
      </div>
    </div>
  );
}
