const Projects = () => {
  const projects = [
    {
      title: "FindU",
      subtitle: "College-Exclusive Dating App",
      period: "July 2025 - Present",
      technologies: [
        "React Native",
        "Expo",
        "Node.js",
        "Express",
        "Supabase",
        "PostgreSQL",
        "Stripe"
      ],
      description:
        "A full-stack college dating app with campus-exclusive authentication using .edu email verification, real-time matching powered by a weighted algorithm analyzing 20+ user attributes, and a swipe-based discovery interface. Designed and deployed a Node.js/Express backend with Supabase PostgreSQL for authentication, user profiles, matching logic, and real-time chat.",
      features: [
        "Weighted matching algorithm based on 20+ user attributes, improving match quality and reducing time-to-match by 40%",
        "Real-time chat system with message persistence, read receipts, typing indicators, and photo sharing using Supabase Realtime",
        "Campus-exclusive authentication using .edu email verification",
        "Swipe-based discovery interface with intuitive user experience"
      ],
      color: "portfolio-glow",
      codeLink: "https://github.com/justincordova/findu"
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
      codeLink: "https://github.com/justincordova/bunso"
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
    <section className="py-24 lg:py-32 px-4 sm:px-6" id="projects">
      <div className="container max-w-5xl mx-auto">
        <div className="mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
            Featured Projects
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
          <p className="text-lg text-muted-foreground mt-8 max-w-2xl">
            A showcase of my passion for building innovative solutions across
            full-stack development and machine learning
          </p>
        </div>

        <div className="space-y-8 lg:space-y-12">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group border border-border/50 rounded-lg p-6 lg:p-8 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-3xl font-serif font-bold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-primary font-medium text-lg mb-1">
                    {project.subtitle}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {project.period}
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {project.features && (
                  <div className="space-y-2 pt-4">
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex gap-3">
                        <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                        <p className="text-sm text-muted-foreground">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium text-muted-foreground border border-border/50 rounded-full hover:border-primary/50 hover:text-foreground transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="12 3 20.12 7.46 20.12 16.54 12 21 3.88 16.54 3.88 7.46 12 3"></polyline>
                        <line x1="12" y1="12" x2="20.12" y2="7.46"></line>
                        <line x1="12" y1="12" x2="12" y2="21"></line>
                        <line x1="12" y1="12" x2="3.88" y2="7.46"></line>
                      </svg>
                      View Code
                    </a>
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        → Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 lg:mt-20 text-center">
          <p className="text-muted-foreground mb-4">
            More projects coming soon
          </p>
          <a
            href="https://github.com/justincordova"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
          >
            → View all on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
