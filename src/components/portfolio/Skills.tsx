import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages & Databases",
      icon: "💻",
      skills: [
        "C#",
        "JavaScript",
        "TypeScript",
        "Python",
        "C",
        "MySQL",
        "PostgreSQL"
      ],
      color: "portfolio-glow",
    },
    {
      title: "Frameworks & Libraries",
      icon: "🚀",
      skills: [
        ".NET",
        "EF Core",
        "NHibernate",
        "NUnit",
        "WinForms",
        "React",
        "React Native",
        "Expo",
        "Node.js",
        "Express",
        "Next.js",
        "Django",
        "Tailwind CSS",
        "Prisma",
        "Zustand",
        "Redux"
      ],
      color: "portfolio-accent",
    },
    {
      title: "Developer Tools & Methodologies",
      icon: "🛠️",
      skills: [
        "Git",
        "Postman",
        "Jupyter Notebook",
        "Docker",
        "Jest",
        "Agile",
        "Scrum"
      ],
      color: "portfolio-accent",
    },
    {
      title: "Data & Machine Learning",
      icon: "📊",
      skills: [
        "NumPy",
        "Pandas",
        "Scikit-learn",
        "Seaborn",
        "Matplotlib"
      ],
      color: "portfolio-glow",
    },
  ];


  return (
    <section
      className="py-16 sm:py-20 px-4 sm:px-6 bg-portfolio-section/30"
      id="skills"
    >
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-text bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          <p className="text-lg sm:text-xl text-muted-foreground mt-4 sm:mt-6 max-w-3xl mx-auto px-4">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {skillCategories.map((category, index) => (
            <Card
              key={category.title}
              className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-500 hover:scale-105 group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                  <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </span>
                  <span
                    className={`text-${category.color} group-hover:text-portfolio-glow transition-colors duration-300`}
                  >
                    {category.title}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className={`hover:bg-${category.color}/20 hover:border-${category.color}/50 transition-all duration-300 hover:scale-105 cursor-default text-xs sm:text-sm`}
                      style={{
                        animationDelay: `${index * 150 + skillIndex * 50}ms`,
                      }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
