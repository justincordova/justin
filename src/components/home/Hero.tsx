export default function Hero() {
  return (
    <section className="flex items-center justify-center px-6 pt-6 pb-0">
      <div className="mx-auto flex max-w-container flex-col items-center gap-8 md:flex-row md:gap-16">
        <img
          src="/about.png"
          alt="Justin Cordova"
          width={256}
          height={256}
          className="h-40 w-40 shrink-0 rounded-xl border border-edge object-cover transition-all duration-200 hover:shadow-lg hover:shadow-edge/50 md:h-48 md:w-48"
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
        </div>
      </div>
    </section>
  );
}
