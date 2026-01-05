import { Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Software Developer Intern",
    company: "Pure Technology Inc.",
    period: "August 2025 – Present",
    location: "Remote",
    highlights: [
      "Engineered a modular cleanup engine with retention rules, estimations, and batch operations capable of processing 1M+ records/hour while maintaining 100% transactional integrity.",
      "Built a C# maintenance utility for Retail Management Hero (RMH) reducing legacy data bloat by 40% and improving average query performance by 25%.",
      "Architected a strict layered system with Fluent NHibernate, async operations, and dependency injection, increasing maintainability and reducing code duplication by 35%.",
      "Developed a scriptable CLI with REPL mode, tab-completion, history, piped input support, and automation-friendly exit codes, cutting manual maintenance time by 50%.",
      "Built NUnit test suites covering repositories, cleanup rules, schema validation, and service-layer behavior, achieving 85% test coverage and eliminating multiple production regressions during rollout.",
    ],
    skills: [
      ".NET",
      "C#",
      "WinForms",
      "Fluent NHibernate",
      "NUnit",
      "Layered Architecture",
      "Dependency Injection",
      "Batch Processing",
      "CLI Development",
      "Database Management",
      "Test Coverage",
      "LicenseSpring",
      "Backend Development",
    ],
  },
  {
    title: "Full-Stack Developer Intern",
    company: "AbeScott Enterprises",
    period: "July 2025 – September 2025",
    location: "Remote",
    highlights: [
      "Architected cross-platform transportation aggregator unifying multiple ride-sharing APIs (Uber, Lyft, DoorDash) into a single user interface for seamless service comparison.",
      "Designed RESTful API backend using Node.js and Express with Supabase authentication, achieving sub-200ms average response time across all endpoints.",
      "Led development team of 10 engineers across frontend, backend, and API integration workstreams, delegating React UI design and service layer tasks while conducting bi-weekly sprint planning meetings to coordinate deliverables.",
      "Optimized React component rendering with memoization and virtualization to handle real-time price updates from 3+ concurrent APIs without UI lag.",
    ],
    skills: [
      "Team Leadership",
      "Full-Stack Development",
      "React Native",
      "Expo",
      "Express",
      "Node.js",
      "Supabase",
      "Project Management",
      "Agile Methodologies",
      "Database Management",
    ],
  },
  {
    title: "TNT Fireworks Associate",
    company: "TNT Fireworks",
    period: "June 2024 – July 2024",
    location: "Easton, PA",
    highlights: [
      "Delivered fast and accurate checkout experiences processing 100+ transactions daily",
      "Improved operational efficiency by restocking 200+ items per shift",
      "Contributed to a 15% faster customer turnaround and positive in-store experience",
    ],
    skills: [
      "Customer Service",
      "Time Management",
      "Problem Solving",
      "Team Collaboration",
      "Process Optimization",
    ],
  },
];

const Experience = () => {
  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6" id="experience">
      <div className="container max-w-5xl mx-auto">
        <div className="mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
            Experience
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </div>

        <div className="space-y-8 lg:space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative pl-8 pb-8 border-l-2 border-primary/30 last:pb-0 last:border-l-0"
            >
              {/* Timeline dot */}
              <div className="absolute -left-4 -top-2 w-6 h-6 rounded-full bg-primary border-4 border-background" />

              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-foreground">
                    {exp.title}
                  </h3>
                  <p className="text-primary font-medium text-lg">
                    {exp.company}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 rounded-full bg-border" />
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  {exp.highlights.map((highlight, i) => (
                    <p
                      key={i}
                      className="text-muted-foreground leading-relaxed text-sm sm:text-base"
                    >
                      <span className="text-primary mr-3">→</span>
                      {highlight}
                    </p>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium text-muted-foreground border border-border/50 rounded-full hover:border-primary/50 hover:text-foreground transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
