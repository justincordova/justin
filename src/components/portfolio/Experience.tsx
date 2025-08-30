import { Calendar, MapPin } from "lucide-react";
import { NamedExpCard as ExpCard } from "@/components/ui/exp-card"; // your reusable card component
import { Badge } from "@/components/ui/badge";

const experiences = [
    {
    title: "Software Developer",
    company: "Pure Technolgoy - Simple POS",
    period: "August 2025 – Present",
    location: "Remote",
    highlights: [
      "Built a cleanup utility application for database record management",
      "Developed backend services for database manipulation and optimization",
      "Created frontend UI with .NET WinForms for improved user workflow"
    ],
    skills: [
      ".NET",
      "WinForms",
      "Database Management",
      "Backend Development",
      "UI Design",
      "Software Maintenance"
    ]
  },
  {
    title: "Software Engineering Intern",
    company: "MyRideLink",
    period: "July 2025 – September 2025",
    location: "Remote",
    highlights: [
      "Served as project lead for a platform unifying multiple ride services",
      "Led a team of 10 engineers using React Native (Expo), Node.js, Express, and Supabase",
      "Oversaw backend authentication systems and transit service integrations",
      "Coordinated project milestones, code reviews, and team collaboration"
    ],
    skills: [
      "Team Leadership",
      "Full-Stack Development",
      "React Native",
      "Express",
      "Node.js",
      "Database Management",
      "Project Coordination"
    ]
  },
  {
    title: "TNT Fireworks Associate",
    company: "TNT Fireworks",
    period: "June 2024 – July 2024",
    location: "Easton, PA",
    highlights: [
      "Delivered fast and accurate checkout experiences processing 100+ transactions daily",
      "Improved operational efficiency by restocking 200+ items per shift",
      "Contributed to a 15% faster customer turnaround and positive in-store experience"
    ],
    skills: [
      "Customer Service",
      "Time Management",
      "Problem Solving",
      "Team Collaboration",
      "Process Optimization"
    ]
  }
];

const Experience = () => {
  return (
    <section className="py-20 px-6" id="experience">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-text bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <ExpCard key={index}>
              <ExpCard.Header>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <ExpCard.Title className="text-2xl text-portfolio-glow mb-2">
                      {exp.title}
                    </ExpCard.Title>
                    <p className="text-lg text-portfolio-accent font-medium">{exp.company}</p>
                  </div>
                  <div className="flex flex-col md:items-end gap-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
              </ExpCard.Header>

              <ExpCard.Content>
                <div className="grid gap-4 mb-4">
                  {exp.highlights.map((highlight, i) => (
                    <div key={i} className="p-4 bg-portfolio-section rounded-lg border border-border/30">
                      <p className="text-muted-foreground">{highlight}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <h4 className="font-semibold mb-3 text-foreground">Key Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="hover:bg-portfolio-glow/20 transition-colors duration-300"
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
