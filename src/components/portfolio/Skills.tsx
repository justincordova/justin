import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages & Databases",
      icon: "💻",
      skills: ["JavaScript", "TypeScript", "Python", "C++", "C", "Java", "PHP", "MongoDB", "PostgreSQL"],
      color: "portfolio-glow"
    },
    {
      title: "Frameworks & Libraries", 
      icon: "🚀",
      skills: ["Django", "React", "Node", "Express", "Next.js", "Bootstrap", "Tailwind CSS"],
      color: "portfolio-accent"
    },
    {
      title: "ML Libraries",
      icon: "🤖", 
      skills: ["NumPy", "Pandas", "Seaborn", "Scikit-learn", "TensorFlow", "NLTK"],
      color: "portfolio-glow"
    },
    {
      title: "Developer Tools & Methodologies",
      icon: "🛠️",
      skills: ["Git", "Postman", "MongoDB Compass", "Bash", "Agile", "Scrum", "Jupyter Notebook", "ChatGPT", "Claude", "Cursor"],
      color: "portfolio-accent"
    }
  ];

  return (
    <section className="py-20 px-6 bg-portfolio-section/30" id="skills">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-text bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          <p className="text-xl text-muted-foreground mt-6 max-w-3xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <Card
              key={category.title}
              className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-500 hover:scale-105 group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </span>
                  <span className={`text-${category.color} group-hover:text-portfolio-glow transition-colors duration-300`}>
                    {category.title}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className={`hover:bg-${category.color}/20 hover:border-${category.color}/50 transition-all duration-300 hover:scale-105 cursor-default`}
                      style={{ animationDelay: `${(index * 150) + (skillIndex * 50)}ms` }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-gradient-card border-border/50 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-portfolio-glow">Always Learning</h3>
              <p className="text-muted-foreground">
                Technology evolves rapidly, and so do I. I'm constantly exploring new frameworks, 
                tools, and methodologies to stay at the forefront of software development and machine learning.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;