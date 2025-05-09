
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  toggleTheme: () => void;
  theme: string;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, theme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed w-full top-0 left-0 z-50 transition-all duration-300 py-4",
        scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-md py-2"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="#home" className="text-2xl font-display font-bold text-gradient">
            NG<span className="text-primary">Codes</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium hover:text-primary transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Hire Me Button (Desktop) */}
          <Button
            className="hidden md:inline-flex bg-primary hover:bg-primary/80 text-white transition-all duration-300"
          >
            Hire Me
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={cn(
                "block h-0.5 w-full bg-foreground transition-all duration-300",
                mobileMenuOpen && "rotate-45 translate-y-2"
              )}></span>
              <span className={cn(
                "block h-0.5 w-full bg-foreground transition-all duration-300",
                mobileMenuOpen && "opacity-0"
              )}></span>
              <span className={cn(
                "block h-0.5 w-full bg-foreground transition-all duration-300",
                mobileMenuOpen && "-rotate-45 -translate-y-2"
              )}></span>
            </div>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl transition-all duration-300 overflow-hidden md:hidden",
          mobileMenuOpen ? "max-h-[500px] border-b border-border" : "max-h-0"
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-lg font-medium px-4 py-2 hover:bg-primary/10 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Button
              className="mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Hire Me
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
