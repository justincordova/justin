import { Calendar, MapPin } from "lucide-react";
import { NamedExpCard as ExpCard } from "@/components/ui/exp-card"; // your reusable card component
import { Badge } from "@/components/ui/badge";

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
    <section className="py-16 sm:py-20 px-4 sm:px-6" id="experience">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-text bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <ExpCard key={index}>
              <ExpCard.Header>
                <div className="flex flex-col gap-4">
                  <div>
                    <ExpCard.Title className="text-xl sm:text-2xl text-portfolio-glow mb-2">
                      {exp.title}
                    </ExpCard.Title>
                    <p className="text-base sm:text-lg text-portfolio-accent font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm sm:text-base">{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm sm:text-base">
                        {exp.location}
                      </span>
                    </div>
                  </div>
                </div>
              </ExpCard.Header>

              <ExpCard.Content>
                <div className="grid gap-3 sm:gap-4 mb-4">
                  {exp.highlights.map((highlight, i) => (
                    <div
                      key={i}
                      className="p-3 sm:p-4 bg-portfolio-section rounded-lg border border-border/30"
                    >
                      <p className="text-muted-foreground text-sm sm:text-base">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-3 sm:pt-4">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-foreground text-sm sm:text-base">
                    Key Skills
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {exp.skills.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="hover:bg-portfolio-glow/20 transition-colors duration-300 text-xs sm:text-sm"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </ExpCard.Content>
            </ExpCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
