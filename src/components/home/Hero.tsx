export default function Hero() {
  return (
    <section className="flex items-center justify-center px-6 pt-2 pb-0">
      <div className="max-w-2xl text-center">
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
    </section>
  );
}
