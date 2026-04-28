import FeaturedProjects from "@/components/home/FeaturedProjects";
import Hero from "@/components/home/Hero";
import LocationWidget from "@/components/home/LocationWidget";
import RecentActivity from "@/components/home/RecentActivity";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProjects />

      <section className="px-6 pt-8 pb-0">
        <div className="mx-auto max-w-container">
          <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_280px]">
            <RecentActivity />
            <LocationWidget />
          </div>
        </div>
      </section>

      <section className="px-6 pt-12 pb-0">
        <div className="mx-auto flex max-w-container flex-col items-center gap-6 sm:gap-8">
          <div className="max-w-[600px] space-y-4 text-left text-lg leading-relaxed text-content sm:text-2xl">
            <p>
              I'm a software developer intern at{" "}
              <span className="text-accent underline decoration-dotted underline-offset-4">
                Pure Technology Inc
              </span>
              , building software for a <span className="text-accent">POS</span> system — utilities,
              extensions, services, and everything in between with{" "}
              <span className="text-accent">C# and .NET</span>.
            </p>
            <p>
              I work across the full stack: <span className="text-accent">TypeScript</span>,{" "}
              <span className="text-accent">React</span>,{" "}
              <span className="text-accent">Node.js</span>,{" "}
              <span className="text-accent">Express</span>,{" "}
              <span className="text-accent">Next.js</span>,{" "}
              <span className="text-accent">PostgreSQL</span>,{" "}
              <span className="text-accent">NoSQL</span>, <span className="text-accent">MySQL</span>
              .
            </p>
            <p>
              I've also been learning <span className="text-accent">Go</span>, building backend
              projects and small CLI tools.
            </p>
            <p>
              My go-to AI tool is <span className="text-accent">Claude</span> — I use it across all
              my projects. I use <span className="text-accent">GLM</span> as a fallback.
            </p>
            <p>
              Outside of code, I play <span className="text-accent">racquetball</span> and{" "}
              <span className="text-accent">tennis</span>, hit the gym and run a few times a week. I
              also enjoy <span className="text-accent">photography</span> and I'm always down to
              explore new places.
            </p>
            <p>
              If you want to say hi, you can find me on{" "}
              <a
                href="https://www.linkedin.com/in/justinalolorcordova/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-4 transition-opacity hover:opacity-80"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
