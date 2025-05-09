
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineItems = useRef<(HTMLDivElement | null)[]>([]);

  // Timeline data
  const timeline = [
    {
      year: "2016",
      title: "Bachelor's in Computer Science",
      description: "Graduated with honors, specializing in software engineering."
    },
    {
      year: "2018",
      title: "Software Developer at TechCorp",
      description: "Led development of enterprise applications using modern frameworks."
    },
    {
      year: "2020",
      title: "Senior Web Developer",
      description: "Created cutting-edge web solutions for Fortune 500 clients."
    },
    {
      year: "2021",
      title: "Network Engineering Certification",
      description: "Expanded expertise into network infrastructure and security."
    },
    {
      year: "2023",
      title: "Launched Freelance Business",
      description: "Founded NG Codes, providing full-stack development solutions."
    }
  ];

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

    timelineItems.current.forEach(item => {
      if (item) observer.observe(item);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      timelineItems.current.forEach(item => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  return (
    <section 
      id="about" 
      className="py-20 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 opacity-0 translate-y-10 transform transition-all duration-700 delay-100"
             ref={(el) => (sectionRef.current = el)}>
          <h2 className="section-title">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            My journey into the digital world, driven by passion and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Bio and profile */}
          <div className="space-y-6 opacity-0 translate-y-10 transform transition-all duration-700 delay-200"
               ref={(el) => (timelineItems.current[0] = el)}>
            <div className="relative">
              <div className="aspect-square w-full max-w-md mx-auto rounded-2xl overflow-hidden glass border-2 border-primary/20">
                {/* This would be replaced with an actual image or 3D model */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background to-primary/10">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary to-blue-500 opacity-80 flex items-center justify-center text-white text-8xl font-display">
                    A
                  </div>
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-primary rounded-2xl opacity-20 blur-lg animate-pulse-glow"></div>
              <div className="absolute top-1/2 -left-3 transform -translate-y-1/2 w-6 h-32 bg-blue-400 rounded-full opacity-20 animate-float"></div>
            </div>
          </div>

          {/* Bio content */}
          <div className="space-y-8 opacity-0 translate-y-10 transform transition-all duration-700 delay-300"
               ref={(el) => (timelineItems.current[1] = el)}>
            <h3 className="text-2xl font-display font-bold text-gradient">Passion for Technology</h3>
            <p className="text-muted-foreground">
              With over 7 years of experience in software development, web development, and network engineering, 
              I bring a unique blend of technical expertise and creative problem-solving to every project. 
              My approach combines cutting-edge technologies with user-centered design principles.
            </p>
            
            <p className="text-muted-foreground">
              I'm passionate about creating digital solutions that not only meet technical requirements 
              but also deliver exceptional user experiences. Whether building complex software applications, 
              designing responsive websites, or optimizing network infrastructure, I focus on delivering 
              high-quality results that exceed expectations.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full text-sm">Problem Solver</span>
              <span className="bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full text-sm">Creative Thinker</span>
              <span className="bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full text-sm">Detail-Oriented</span>
              <span className="bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full text-sm">Collaborative</span>
              <span className="bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full text-sm">Continuous Learner</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-24">
          <div className="text-center mb-12 opacity-0 translate-y-10 transform transition-all duration-700 delay-400"
               ref={(el) => (timelineItems.current[2] = el)}>
            <h3 className="text-2xl font-display font-bold text-gradient">My Journey</h3>
            <p className="text-muted-foreground">Key milestones in my professional career</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary/50 via-primary to-primary/50"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div 
                  key={index}
                  className={cn(
                    "relative flex flex-col md:flex-row opacity-0 translate-y-10 transform transition-all duration-700",
                    index % 2 === 0 ? "md:flex-row-reverse" : "",
                  )}
                  ref={(el) => (timelineItems.current[index + 3] = el)}
                  style={{transitionDelay: `${500 + index * 200}ms`}}
                >
                  <div className="md:w-1/2"></div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1 w-5 h-5 rounded-full border-4 border-background bg-primary shadow-glow"></div>
                  
                  {/* Content */}
                  <div className={cn(
                    "relative md:w-1/2 glass-card ml-6 md:ml-0",
                    index % 2 === 0 ? "md:mr-6" : "md:ml-6"
                  )}>
                    <span className="absolute -top-3 left-4 bg-primary text-primary-foreground text-sm px-2 py-0.5 rounded">
                      {item.year}
                    </span>
                    <h4 className="text-xl font-display font-bold mt-4">{item.title}</h4>
                    <p className="text-muted-foreground mt-2">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
