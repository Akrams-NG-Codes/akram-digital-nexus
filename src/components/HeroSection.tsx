
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax effect for hero background
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        // Create a parallax effect
        const yValue = scrollY * 0.5;
        heroRef.current.style.backgroundPositionY = `${yValue}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Animated text code effect with self-typing effect
  const CodeHighlight: React.FC = () => {
    return (
      <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 font-mono text-xs sm:text-sm shadow-xl border border-primary/30 w-full max-w-md">
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-muted-foreground">
          <span className="text-blue-400">const</span>{" "}
          <span className="text-green-400">developer</span> = {"{"}
        </div>
        <div className="pl-4">
          <span className="text-purple-400">name</span>:{" "}
          <span className="text-yellow-300">'Akram'</span>,
        </div>
        <div className="pl-4">
          <span className="text-purple-400">skills</span>: [
          <span className="text-yellow-300">
            'Software Development', 'Web Development', 'Network Engineering'
          </span>
          ],
        </div>
        <div className="pl-4">
          <span className="text-purple-400">expertise</span>:{" "}
          <span className="text-yellow-300">'Innovative Solutions'</span>,
        </div>
        <div className="pl-4 flex items-center">
          <span className="text-purple-400">status</span>:{" "}
          <span className="text-green-400">'Available for hire'</span>
          <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse"></span>
        </div>
        <div className="text-muted-foreground">{"}"}</div>
      </div>
    );
  };

  return (
    <section id="home" className="relative min-h-screen pt-20 flex items-center" ref={heroRef}>
      {/* Background elements */}
      <div className="absolute inset-0 hero-animated-bg grid-pattern"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 pt-16 lg:pt-0 mb-10 lg:mb-0">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
              <span className="text-gradient">Innovative Solutions</span><br />
              for the Digital Age
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Software Developer, Web Developer, and Network Engineer specializing in 
              creating cutting-edge digital experiences and powerful applications.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/80 text-white group transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:shadow-[0_0_25px_rgba(124,58,237,0.7)]"
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10 transition-all duration-300"
              >
                Contact Me
              </Button>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative animate-fade-in animate-delay-2">
            <div className="animate-float">
              <CodeHighlight />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
