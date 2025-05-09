
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight, ExternalLink, Github, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample projects data
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=500&auto=format&fit=crop",
    description: "A full-featured e-commerce platform with shopping cart, payment processing, and admin dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    demoUrl: "#",
    githubUrl: "#",
    detailedDescription: "This comprehensive e-commerce solution provides businesses with everything they need to sell products online. The platform includes user authentication, product catalog management, shopping cart functionality, secure payment processing via Stripe, order management, and an intuitive admin dashboard for monitoring sales and inventory."
  },
  {
    id: 2,
    title: "Financial Analytics Dashboard",
    category: "Software Development",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop",
    description: "Interactive dashboard for visualizing and analyzing financial data with real-time updates.",
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL", "WebSockets"],
    demoUrl: "#",
    githubUrl: "#",
    detailedDescription: "This financial analytics dashboard provides real-time visualization of complex financial datasets. It features interactive charts and graphs, customizable views, data filtering capabilities, and automated reporting. The application uses WebSockets for real-time updates and implements advanced data processing algorithms for trend analysis and predictive insights."
  },
  {
    id: 3,
    title: "Smart Home Network System",
    category: "Network Engineering",
    image: "https://images.unsplash.com/photo-1558002038-1055952a6c91?q=80&w=500&auto=format&fit=crop",
    description: "Secure and scalable network infrastructure for smart home devices and automation.",
    technologies: ["IoT", "MQTT", "Network Security", "Raspberry Pi", "Python"],
    demoUrl: "#",
    githubUrl: "#",
    detailedDescription: "This smart home network system provides a secure and reliable infrastructure for connecting and managing various IoT devices. The solution includes network segmentation for enhanced security, automated device discovery and configuration, centralized management console, and advanced authentication mechanisms to prevent unauthorized access."
  },
  {
    id: 4,
    title: "AI Content Generator",
    category: "Software Development",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=500&auto=format&fit=crop",
    description: "ML-powered application that generates content based on user preferences and industry trends.",
    technologies: ["Python", "TensorFlow", "NLP", "Flask", "React"],
    demoUrl: "#",
    githubUrl: "#",
    detailedDescription: "This AI-powered content generation tool leverages advanced machine learning algorithms to create high-quality, contextually relevant content based on user inputs and industry trends. The application includes sentiment analysis, keyword optimization, tone adjustment, and various content formats tailored to different platforms and audiences."
  },
  {
    id: 5,
    title: "Virtual Reality Tour Platform",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=500&auto=format&fit=crop",
    description: "Interactive VR platform for virtual property tours and immersive experiences.",
    technologies: ["Three.js", "WebVR", "React", "WebGL", "Node.js"],
    demoUrl: "#",
    githubUrl: "#",
    detailedDescription: "This virtual reality platform enables users to create, share, and experience immersive 3D tours. Built with cutting-edge WebVR technologies, the platform supports 360° panoramic views, interactive hotspots, spatial audio, and customizable navigation. It's optimized for various devices including VR headsets, desktop browsers, and mobile devices."
  },
  {
    id: 6,
    title: "Secure Messaging App",
    category: "Network Engineering",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=500&auto=format&fit=crop",
    description: "End-to-end encrypted messaging application for secure communications.",
    technologies: ["React Native", "Cryptography", "Firebase", "WebRTC", "Redux"],
    demoUrl: "#",
    githubUrl: "#",
    detailedDescription: "This secure messaging application provides end-to-end encrypted communication channels for sensitive conversations. The app implements advanced cryptographic protocols to ensure message privacy, features self-destructing messages, secure file sharing, and verification mechanisms to prevent man-in-the-middle attacks while maintaining a user-friendly interface."
  }
];

const PortfolioSection: React.FC = () => {
  const [filter, setFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const categories = ["All", ...new Set(projects.map(project => project.category))];
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(project => project.category === filter);

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

    projectRefs.current.forEach(item => {
      if (item) observer.observe(item);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      projectRefs.current.forEach(item => {
        if (item) observer.unobserve(item);
      });
    };
  }, [filter]);

  return (
    <section 
      id="portfolio"
      className="py-20 relative bg-gradient-to-b from-background/90 to-background"
      ref={sectionRef}
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 opacity-0 translate-y-10 transform transition-all duration-700"
             ref={(el) => (sectionRef.current = el)}>
          <h2 className="section-title">Portfolio</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Showcasing my latest projects and creative solutions
          </p>
        </div>

        {/* Filter options */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 opacity-0 translate-y-10 transform transition-all duration-700 delay-200"
             ref={(el) => (projectRefs.current[0] = el)}>
          {categories.map((category, index) => (
            <button
              key={index}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                filter === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-primary/10 hover:bg-primary/20"
              )}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className="opacity-0 translate-y-10 transform transition-all duration-700"
              ref={(el) => (projectRefs.current[index + 1] = el)}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div 
                className="group h-full glass-card hover:border-primary/40 transition-all duration-500 overflow-hidden"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <span className="text-xs font-medium px-3 py-1 bg-primary/80 text-white rounded-full">
                        {project.category}
                      </span>
                      <button 
                        className="p-1.5 bg-background/50 backdrop-blur-sm rounded-full text-primary hover:bg-background/80"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Project info */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold mb-2 group-hover:text-gradient transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                  
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-primary/10 rounded-md">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-primary/10 rounded-md">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View more button */}
        <div className="text-center mt-12 opacity-0 translate-y-10 transform transition-all duration-700 delay-700"
             ref={(el) => (projectRefs.current[projectRefs.current.length - 1] = el)}>
          <Button
            variant="outline"
            className="border-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Project details modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="sm:max-w-3xl overflow-hidden">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-bold text-gradient">
                  {selectedProject.title}
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => setSelectedProject(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogHeader>
              
              <div className="mt-4">
                {/* Project image */}
                <div className="relative h-60 w-full overflow-hidden rounded-lg mb-6">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                
                {/* Project description */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-2">About this project</h4>
                  <p className="text-muted-foreground">
                    {selectedProject.detailedDescription}
                  </p>
                </div>
                
                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1.5 bg-primary/10 rounded-md text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex flex-wrap gap-4 mt-6">
                  <Button 
                    className="bg-primary hover:bg-primary/80 text-white transition-all duration-300"
                    onClick={() => window.open(selectedProject.demoUrl, "_blank")}
                  >
                    Live Demo
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-primary hover:bg-primary/10"
                    onClick={() => window.open(selectedProject.githubUrl, "_blank")}
                  >
                    Source Code
                    <Github className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PortfolioSection;
