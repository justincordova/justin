import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Bunso",
      subtitle: "Full-Stack Social Media Platform",
      period: "May 2025 - July 2025",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      description:
        "Built a full-stack social media platform with real-time post creation, commenting, and user interaction, featuring secure authentication and rate limiting.",
      features: [
        "Designed a responsive React frontend with advanced features like search, bookmarks, messaging, and notifications for enhanced user engagement",
        "Developed RESTful APIs and integrated custom logging and error handling for robust backend performance and maintainability",
      ],
      color: "portfolio-glow",
      icon: "🌐",
      codeLink: "https://github.com/JustinCordova/bunso",
      demoLink: "https://bunso-demo.com",
    },
    {
      title: "Plush Pals",
      subtitle: "Multi-Page E-commerce Web App",
      period: "May 2025",
      technologies: ["Django", "Python", "HTML", "CSS"],
      description:
        "Developed a multi-page web app to showcase a collection of 8+ handcrafted plush toys, complete with images, descriptions, and pricing.",
      features: [
        "Built interactive features including star ratings (1–5) and user-submitted reviews, using Django Forms and template logic for live feedback display",
        "Designed a custom admin panel to manage products and view reviews, enabling seamless content moderation and updates",
      ],
      color: "portfolio-accent",
      icon: "🧸",
      codeLink: "https://github.com/JustinCordova/PlushPals",
      demoLink: "",
    },
    {
      title: "Student Depression Prediction",
      subtitle: "Machine Learning Classification Model",
      period: "Apr 2025",
      technologies: [
        "Python",
        "Pandas",
        "NumPy",
        "Seaborn",
        "Scikit-learn",
        "Matplotlib",
      ],
      description:
        "Built a supervised machine learning pipeline to predict student depression based on academic, social, and emotional indicators from a Kaggle dataset.",
      features: [
        "Trained and fine-tuned Logistic Regression (78.3% accuracy, 0.82 F1-score) and Random Forest (76.3% accuracy, 0.80 F1-score) models using GridSearchCV",
        "Applied preprocessing techniques such as normalization, encoding, and correlation-based feature selection; visualized key insights using Matplotlib and Seaborn",
      ],
      color: "portfolio-glow",
      icon: "🤖",
      codeLink:
        "https://github.com/JustinCordova/student-depression-prediction",
    },
  ];

  return (
    <section className="py-20 px-6 bg-portfolio-section/30" id="projects">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-text bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          <p className="text-xl text-muted-foreground mt-6 max-w-3xl mx-auto">
            A showcase of my passion for building innovative solutions across
            web development and machine learning
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-500 hover:scale-[1.02] group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardHeader className="pb-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {project.icon}
                      </span>
                      <CardTitle
                        className={`text-2xl text-${project.color} group-hover:text-portfolio-glow transition-colors duration-300`}
                      >
                        {project.title}
                      </CardTitle>
                    </div>
                    <p className="text-lg text-portfolio-accent font-medium mb-3">
                      {project.subtitle}
                    </p>
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4" />
                      <span>{project.period}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-portfolio-glow/30 hover:border-portfolio-glow hover:bg-portfolio-glow/10"
                    >
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    {project.demoLink && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-portfolio-accent/30 hover:border-portfolio-accent hover:bg-portfolio-accent/10"
                      >
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {project.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="p-4 bg-portfolio-section rounded-lg border border-border/30 hover:border-portfolio-glow/30 transition-all duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 bg-${project.color} rounded-full mt-2 flex-shrink-0`}
                        ></div>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-foreground">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className={`hover:bg-${project.color}/20 hover:border-${project.color}/50 transition-all duration-300 hover:scale-105`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-gradient-card border-border/50 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-portfolio-glow">
                More Projects Coming Soon
              </h3>
              <p className="text-muted-foreground mb-6">
                I'm constantly working on new projects that push the boundaries
                of what's possible with modern web technologies and machine
                learning. Stay tuned for more exciting developments!
              </p>
              <Button
                variant="outline"
                className="border-portfolio-accent/30 hover:border-portfolio-accent hover:bg-portfolio-accent/10"
              >
                <Github className="h-4 w-4 mr-2" />
                View All on GitHub
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Projects;
