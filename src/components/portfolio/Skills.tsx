
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
        "PostgreSQL",
        "MongoDB",
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
        "NUnit",
        "Agile",
        "CI/CD",
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
    <section className="py-24 lg:py-32 px-4 sm:px-6" id="skills">
      <div className="container max-w-5xl mx-auto">
        <div className="mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
            Technical Skills
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
          <p className="text-lg text-muted-foreground mt-8 max-w-2xl">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </div>

        <div className="space-y-12 lg:space-y-16">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-2xl font-serif font-bold text-foreground">
                  {category.title}
                </h3>
                <div className="flex-1 h-0.5 bg-primary/20" />
              </div>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 text-sm font-medium text-muted-foreground border border-border/50 rounded-lg hover:border-primary/50 hover:text-foreground hover:bg-primary/5 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
