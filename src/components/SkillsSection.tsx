
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Define skill categories and items
const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React", level: 95, description: "Building interactive UIs with React and Next.js" },
      { name: "JavaScript", level: 90, description: "ES6+, TypeScript, and modern JS frameworks" },
      { name: "CSS/SCSS", level: 85, description: "Responsive design with TailwindCSS and styled-components" },
      { name: "Vue.js", level: 75, description: "Component-based UIs with Vue.js ecosystem" },
      { name: "UI/UX", level: 80, description: "Designing intuitive user interfaces and experiences" },
    ]
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 90, description: "RESTful APIs and server-side applications" },
      { name: "Python", level: 85, description: "Web frameworks, data processing, and automation" },
      { name: "Databases", level: 85, description: "SQL, NoSQL, and database optimization" },
      { name: "GraphQL", level: 70, description: "Schema design and efficient data querying" },
      { name: "Java", level: 75, description: "Enterprise applications and Android development" },
    ]
  },
  {
    name: "DevOps & Networking",
    skills: [
      { name: "Docker", level: 85, description: "Containerization and orchestration" },
      { name: "AWS", level: 80, description: "Cloud infrastructure and serverless architecture" },
      { name: "CI/CD", level: 75, description: "Automated testing and deployment pipelines" },
      { name: "Network Security", level: 80, description: "Implementing secure network protocols" },
      { name: "Infrastructure", level: 85, description: "Designing and managing network infrastructure" },
    ]
  }
];

const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Animation with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    skillItemsRef.current.forEach(item => {
      if (item) observer.observe(item);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      skillItemsRef.current.forEach(item => {
        if (item) observer.unobserve(item);
      });
    };
  }, [activeCategory]);

  return (
    <section
      id="skills"
      className="py-20 relative bg-gradient-to-b from-background to-background/90"
      ref={sectionRef}
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      <div className="absolute top-20 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 opacity-0 translate-y-10 transform transition-all duration-700"
             ref={(el) => (skillItemsRef.current[0] = el)}>
          <h2 className="section-title">Technical Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Expertise across a wide range of technologies and frameworks
          </p>
        </div>

        {/* Skills visualization */}
        <div className="max-w-5xl mx-auto">
          {/* Category selector */}
          <div 
            className="flex flex-wrap justify-center gap-4 mb-12 opacity-0 translate-y-10 transform transition-all duration-700 delay-200"
            ref={(el) => (skillItemsRef.current[1] = el)}
          >
            {skillCategories.map((category, index) => (
              <button
                key={index}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeCategory === index
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-primary/10 hover:bg-primary/20"
                )}
                onClick={() => setActiveCategory(index)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Skills list with radar chart visualization */}
          <div 
            className="mt-12 opacity-0 translate-y-10 transform transition-all duration-700 delay-300"
            ref={(el) => (skillItemsRef.current[2] = el)}
          >
            <div className="flex flex-col space-y-6">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <div 
                  key={index}
                  className="opacity-0 translate-y-10 transform transition-all duration-700"
                  ref={(el) => (skillItemsRef.current[index + 3] = el)}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="group relative glass-card hover:border-primary/30 transition-all duration-300">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-display font-bold text-lg">{skill.name}</h4>
                      <span className="text-primary font-mono">{skill.level}%</span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="h-2 w-full bg-primary/20 rounded-full">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-primary rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%`, transitionDelay: `${600 + index * 100}ms` }}
                      ></div>
                    </div>
                    
                    {/* Hover description */}
                    <div className="mt-2 text-sm text-muted-foreground opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      {skill.description}
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -right-1 -top-1 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    <div className="absolute -left-1 -bottom-1 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Skills */}
        <div 
          className="mt-20 text-center opacity-0 translate-y-10 transform transition-all duration-700 delay-700"
          ref={(el) => (skillItemsRef.current[8] = el)}
        >
          <h3 className="text-xl font-display font-bold mb-6 text-gradient">Additional Expertise</h3>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {[
              "Git", "Figma", "Testing", "Redux", "MongoDB", "Express", 
              "Firebase", "Laravel", "WordPress", "SEO", "Mobile-First Design", 
              "Performance Optimization", "Agile", "SCRUM", "REST API"
            ].map((skill, index) => (
              <span 
                key={index}
                className="bg-primary/5 border border-primary/20 px-3 py-1.5 rounded-full text-sm hover:bg-primary/20 transition-colors duration-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
