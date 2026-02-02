export default function About() {
  return (
    <div className="px-6 py-10">
      <div className="mx-auto grid max-w-container items-start gap-10 md:grid-cols-[2fr_3fr]">
        <div className="flex justify-center">
          <img
            src="/about.JPG"
            alt="Justin Cordova"
            className="max-w-full rounded-xl border border-ctp-surface1"
          />
        </div>

        <div>
          <h1 className="mb-4 text-3xl tracking-tight text-ctp-text">About</h1>
          <div className="space-y-4 leading-relaxed text-ctp-subtext1">
            <p>
              Hey! I'm Justin, an SDE Intern at <span className="text-ctp-blue">Pure Technology Inc</span>. I build software both professionally and for fun, and I'm always tinkering with new ideas when I have free time.
            </p>
            <p>
              Lately, I've been really interested in <span className="text-ctp-blue">Go</span>, especially for backend services and tooling. For my current internship, though, I'm diving deep into <span className="text-ctp-blue">C# and .NET</span>, working on production systems and getting hands-on experience with real-world engineering challenges. In the past, I've built a variety of full-stack applications using TypeScript, React, Node.js, Express, and related tooling.
            </p>
            <p>
              My latest project is <span className="text-ctp-blue">dotcor</span>, a simple symlink-based dotfile manager focused on being lightweight and easy to reason about. Before that, I built <span className="text-ctp-blue">FindU</span>, a college-exclusive dating app designed to connect verified students on campus, with an emphasis on privacy, safety, and clean UX.
            </p>
            <p>
              Outside of software, I play <span className="text-ctp-blue">racquetball</span> and <span className="text-ctp-blue">tennis</span>, hit the <span className="text-ctp-blue">gym</span> daily, and run a couple of times a week. I also enjoy <span className="text-ctp-blue">photography</span>, as you can probably tell from my photos, and I'm always down to explore new places and experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
