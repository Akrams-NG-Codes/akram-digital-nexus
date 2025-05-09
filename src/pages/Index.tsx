
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import PortfolioSection from "@/components/PortfolioSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const { theme, setTheme } = useTheme();
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }

      // Update custom cursor position on scroll
      if (cursorRef.current && cursorDotRef.current) {
        cursorRef.current.style.transform = "translate(-50%, -50%)";
        cursorDotRef.current.style.transform = "translate(-50%, -50%)";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && cursorDotRef.current) {
        // Delayed follow for cursor outline
        setTimeout(() => {
          cursorRef.current!.style.left = `${e.clientX}px`;
          cursorRef.current!.style.top = `${e.clientY}px`;
        }, 100);

        // Immediate follow for cursor dot
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
      }
    };

    // Add hover effect on interactive elements
    const handleElementHover = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add("cursor-hover");
      }
    };

    const handleElementLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove("cursor-hover");
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Add hover effect to all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, [role="button"]'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleElementHover);
      el.addEventListener("mouseleave", handleElementLeave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleElementHover);
        el.removeEventListener("mouseleave", handleElementLeave);
      });
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Custom cursor (hidden on mobile) */}
      <div className="hidden md:block">
        <div
          ref={cursorRef}
          className="custom-cursor w-8 h-8 border border-primary rounded-full fixed pointer-events-none z-50 transition-transform duration-300 ease-out opacity-70"
          style={{ transform: "translate(-50%, -50%)" }}
        ></div>
        <div
          ref={cursorDotRef}
          className="custom-cursor-dot w-1.5 h-1.5 bg-primary rounded-full fixed pointer-events-none z-50 transition-transform duration-150 ease-out"
          style={{ transform: "translate(-50%, -50%)" }}
        ></div>
      </div>

      {/* Header */}
      <Header toggleTheme={toggleTheme} theme={theme} />

      {/* Main content */}
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <PortfolioSection />
        <BlogSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to top button */}
      <Button
        size="icon"
        className={cn(
          "fixed bottom-6 right-6 z-40 rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300",
          showScrollToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
        onClick={scrollToTop}
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Index;
