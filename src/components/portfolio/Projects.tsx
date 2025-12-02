import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projects = [
    {
      title: "FindU",
      subtitle: "College-Exclusive Dating App",
      period: "August 2025 - Present",
      technologies: [
        "React Native Expo",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Socket.IO",
        "Zustand",
        "Stripe"
      ],
      description:
        "A dating app exclusively for college students with .edu emails. Users can only connect with students from their own college. Includes profiles, likes, super likes, subscriptions, safety features, and a community-driven experience.",
      features: [
        "College-restricted authentication using .edu emails",
        "User profiles with likes, super likes, and matchmaking",
        "Subscription tiers for premium features",
        "Real-time messaging, notifications, and presence via Socket.IO",
        "Safety and community-driven features to foster a secure environment"
      ],
      color: "portfolio-glow",
      codeLink: "https://github.com/justincordova/findu",
      demoLink: "https://findu-demo.com"
    },
    {
      title: "Bunso",
      subtitle: "Full-Stack Social Media Platform",
      period: "May 2025 - July 2025",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      description:
        "Built a full-stack social media platform with real-time post creation, commenting, and user interaction, featuring secure authentication and rate limiting.",
      features: [
        "Designed a responsive React frontend with advanced features like search, bookmarks, messaging, and notifications",
        "Developed RESTful APIs and integrated custom logging and error handling for robust backend performance and maintainability"
      ],
      color: "portfolio-glow",
      codeLink: "https://github.com/justincordova/bunso",
      demoLink: "https://bunso-demo.com"
    },
    {
      title: "Plush Pals",
      subtitle: "Multi-Page E-commerce Web App",
      period: "May 2025",
      technologies: ["Django", "Python", "HTML", "CSS"],
      description:
        "Developed a multi-page web app to showcase a collection of handcrafted plush toys with images, descriptions, and pricing.",
      features: [
        "Built interactive features including star ratings and user-submitted reviews using Django Forms and template logic",
        "Designed a custom admin panel to manage products and view reviews"
      ],
      color: "portfolio-accent",
      codeLink: "https://github.com/justincordova/PlushPals",
      demoLink: "https://plushpals.onrender.com/"
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
        "Matplotlib"
      ],
      description:
        "Built a supervised machine learning pipeline to predict student depression based on academic, social, and emotional indicators from a Kaggle dataset.",
      features: [
        "Trained and tuned Logistic Regression (78.3% accuracy, 0.82 F1-score) and Random Forest (76.3% accuracy, 0.80 F1-score) using GridSearchCV",
        "Applied preprocessing such as normalization, encoding, and correlation-based feature selection; visualized insights using Matplotlib and Seaborn"
      ],
      color: "portfolio-glow",
      codeLink: "https://github.com/JustinCordova/student-depression-prediction"
    }
  ];

  return (
    <section
      className="py-16 sm:py-20 px-4 sm:px-6 bg-portfolio-section/30"
      id="projects"
    >
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-text bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          <p className="text-lg sm:text-xl text-muted-foreground mt-4 sm:mt-6 max-w-3xl mx-auto px-4">
            A showcase of my passion for building innovative solutions across
            full-stack development and machine learning
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-500 hover:scale-[1.02] group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardHeader className="pb-4 sm:pb-6">
                <div className="flex flex-col gap-4">
                  <div className="flex-1">
                    <CardTitle
                      className={`text-xl sm:text-2xl text-${project.color} group-hover:text-portfolio-glow transition-colors duration-300`}
                    >
                      {project.title}
                    </CardTitle>

                    <p className="text-base sm:text-lg text-portfolio-accent font-medium mb-2 sm:mb-3">
                      {project.subtitle}
                    </p>

                    <span className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 block">
                      {project.period}
                    </span>

                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-portfolio-glow/30 hover:border-portfolio-glow hover:bg-portfolio-glow/10 w-full sm:w-auto"
                    >
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Code
                      </a>
                    </Button>

                    {project.demoLink && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-portfolio-accent/30 hover:border-portfolio-accent hover:bg-portfolio-accent/10 w-full sm:w-auto"
                      >
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  {project.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="p-3 sm:p-4 bg-portfolio-section rounded-lg border border-border/30 hover:border-portfolio-glow/30 transition-all duration-300"
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div
                          className={`w-2 h-2 bg-${project.color} rounded-full mt-2 flex-shrink-0`}
                        ></div>
                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                          {feature}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold mb-2 sm:mb-3 text-foreground text-sm sm:text-base">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className={`hover:bg-${project.color}/20 hover:border-${project.color}/50 transition-all duration-300 hover:scale-105 text-xs sm:text-sm`}
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

        <div className="mt-12 sm:mt-16 text-center">
          <Card className="bg-gradient-card border-border/50 max-w-2xl mx-auto">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-portfolio-glow">
                More Projects Coming Soon
              </h3>
              <Button
                variant="outline"
                className="border-portfolio-accent/30 hover:border-portfolio-accent hover:bg-portfolio-accent/10 w-full sm:w-auto"
              >
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
