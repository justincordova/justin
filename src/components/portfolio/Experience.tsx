import { Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Software Developer Intern",
    company: "Pure Technology Inc.",
    period: "August 2025 – Present",
    location: "Remote",
    highlights: [
      "Reduced database bloat by building a C# cleanup utility that processed 100K+ legacy records, cutting storage costs by 40% and improving query performance by 25%.",
      "Architected a layered backend (data, service, UI) using dependency injection and NHibernate ORM, enabling stable batch operations exceeding 1M records per hour with full transactional integrity and automated validation.",
      "Developed robust backend services for large-scale database manipulation, performance optimization, and safe cleanup workflows.",
      "Delivered a .NET WinForms interface featuring SQL connection pooling, table selection, change previews, and atomic rollback to enable customers to safely execute production cleanup operations.",
      "Created an end-to-end database management tool integrating backend batch processing with a user-friendly UI to streamline customer workflows.",
    ],
    skills: [
      ".NET",
      "C#",
      "WinForms",
      "EF Core",
      "NHibernate",
      "Layered Architecture",
      "Dependency Injection",
      "Azure Data Studio",
      "MySQL",
      "Database Management",
      "Backend Development",
      "UI Design",
      "Software Maintenance",
    ],
  },
  {
    title: "Full-Stack Developer Intern",
    company: "AbeScott Enterprises",
    period: "July 2025 – September 2025",
    location: "Remote",
    "highlights": [
      "Served as project lead for a cross-platform transportation platform unifying multiple ride services (Uber, Lyft, DoorDash) into a single comparison interface.",
      "Led a 10-engineer team using React Native (Expo), Node.js, Express, and Supabase, coordinating milestones, code reviews, and collaboration workflows.",
      "Architected a transportation aggregator integrating multiple ride-sharing APIs through a unified services layer for seamless user experience.",
      "Designed RESTful backend APIs with Node.js and Express alongside Supabase authentication, achieving sub-200ms average endpoint response times.",
      "Oversaw backend authentication, API routing, and transit service integrations ensuring reliability and consistent cross-service behavior.",
      "Facilitated 6 sprint cycles, driving a 30% reduction in bugs and maintaining 95% on-time delivery through structured reviews and retrospectives."
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
