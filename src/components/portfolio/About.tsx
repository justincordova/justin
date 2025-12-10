import { Badge } from "@/components/ui/badge";

const About = () => {
  const softSkills = [
    "Reliability",
    "Adaptability",
    "Creativity",
    "Flexibility",
    "Positive Attitude",
  ];

  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6" id="about">
      <div className="container max-w-5xl mx-auto">
        <div className="mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
            About Me
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Profile - takes more space */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                Profile
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Computer Science student at NJIT with hands-on experience in full-stack development and software engineering. I specialize in building mobile, web, and desktop applications with a focus on clean code and user-centric design.
              </p>
            </div>

            {/* Education Timeline */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-3">
                <span className="h-0.5 w-8 bg-primary" />
                Education
              </h3>
              <div className="pl-6 border-l-2 border-primary/30 space-y-1">
                <h4 className="text-lg font-medium text-foreground">
                  New Jersey Institute of Technology
                </h4>
                <p className="text-primary font-medium text-sm">
                  B.S. Computer Science
                </p>
                <p className="text-muted-foreground text-sm">
                  Expected December 2026 • Newark, NJ
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="secondary" className="text-xs font-normal">
                    Highlander Achievement Scholarship
                  </Badge>
                  <Badge variant="secondary" className="text-xs font-normal">
                    Dean's Scholar
                  </Badge>
                </div>
              </div>
            </div>

            {/* Current Focus */}
            <div className="p-6 rounded-lg border border-primary/20 bg-primary/5">
              <h4 className="text-base font-semibold text-primary mb-3">
                Current Focus
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Currently diving deep into .NET development (C#, ASP.NET Core, Winforms) and building projects with React, Node.js, and Express.
              </p>
            </div>
          </div>

          {/* Soft Skills - sidebar */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Key Attributes
            </h3>
            <div className="space-y-3">
              {softSkills.map((skill) => (
                <div
                  key={skill}
                  className="group flex items-center gap-3 p-4 rounded-lg border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                >
                  <span className="w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform duration-300" />
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
