
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Mail, Phone, Github, Linkedin, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "submitting" | "submitted" | "error";

const ContactSection: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { toast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const animationRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!fullName.trim()) newErrors.fullName = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format";
    if (!message.trim()) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormStatus("submitting");
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus("submitted");
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you as soon as possible.",
      });
      
      // Reset form
      setFullName("");
      setEmail("");
      setSubject("");
      setMessage("");
      
      // After some time, reset form status
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  };

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

    animationRefs.current.forEach(item => {
      if (item) observer.observe(item);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      animationRefs.current.forEach(item => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  return (
    <section 
      id="contact"
      className="py-20 relative bg-gradient-to-b from-background to-background/90"
      ref={sectionRef}
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 opacity-0 translate-y-10 transform transition-all duration-700"
             ref={(el) => (sectionRef.current = el)}>
          <h2 className="section-title">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have a project in mind? Let's discuss how I can help bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact information */}
          <div 
            className="lg:col-span-2 space-y-6 opacity-0 translate-y-10 transform transition-all duration-700 delay-100"
            ref={(el) => (animationRefs.current[0] = el)}
          >
            <div className="glass-card">
              <h3 className="text-xl font-display font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="font-medium">akram@ngcodes.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
              
              {/* Social links */}
              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="text-sm font-medium mb-4">Connect with me</h4>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="bg-primary/10 hover:bg-primary/20 p-3 rounded-full transition-colors duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5 text-primary" />
                  </a>
                  <a 
                    href="#" 
                    className="bg-primary/10 hover:bg-primary/20 p-3 rounded-full transition-colors duration-300"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5 text-primary" />
                  </a>
                  <a 
                    href="#" 
                    className="bg-primary/10 hover:bg-primary/20 p-3 rounded-full transition-colors duration-300"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5 text-primary" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Availability status */}
            <div className="glass-card bg-gradient-to-br from-primary/20 to-background border-primary/30">
              <div className="flex items-center">
                <div className="relative mr-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full absolute inset-0 animate-ping opacity-75"></div>
                </div>
                <p className="font-medium">Currently Available for Projects</p>
              </div>
              
              <p className="text-muted-foreground mt-4 text-sm">
                I'm actively taking on new projects. Get in touch today to secure a spot in my schedule.
              </p>
            </div>
          </div>
          
          {/* Contact form */}
          <div 
            className="lg:col-span-3 opacity-0 translate-y-10 transform transition-all duration-700 delay-200"
            ref={(el) => (animationRefs.current[1] = el)}
          >
            <form 
              ref={formRef}
              onSubmit={handleSubmit} 
              className="glass-card"
            >
              <h3 className="text-xl font-display font-bold mb-6">Send a Message</h3>
              
              <div className="space-y-5">
                <div>
                  <div className="relative">
                    <Input
                      id="fullName"
                      className={cn(
                        "border-border bg-white/5 focus-visible:ring-primary",
                        errors.fullName ? "border-destructive" : ""
                      )}
                      placeholder="Your name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={formStatus === "submitting"}
                    />
                    <div className={cn(
                      "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-blue-500 transition-all duration-500",
                      fullName ? "w-full" : "w-0"
                    )}></div>
                  </div>
                  {errors.fullName && (
                    <p className="text-destructive text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>
                
                <div>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      className={cn(
                        "border-border bg-white/5 focus-visible:ring-primary",
                        errors.email ? "border-destructive" : ""
                      )}
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={formStatus === "submitting"}
                    />
                    <div className={cn(
                      "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-blue-500 transition-all duration-500",
                      email ? "w-full" : "w-0"
                    )}></div>
                  </div>
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div className="relative">
                  <Input
                    id="subject"
                    className="border-border bg-white/5 focus-visible:ring-primary"
                    placeholder="Subject (optional)"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={formStatus === "submitting"}
                  />
                  <div className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-blue-500 transition-all duration-500",
                    subject ? "w-full" : "w-0"
                  )}></div>
                </div>
                
                <div>
                  <div className="relative">
                    <Textarea
                      id="message"
                      className={cn(
                        "min-h-32 border-border bg-white/5 focus-visible:ring-primary",
                        errors.message ? "border-destructive" : ""
                      )}
                      placeholder="Your message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={formStatus === "submitting"}
                    />
                    <div className={cn(
                      "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-blue-500 transition-all duration-500",
                      message ? "w-full" : "w-0"
                    )}></div>
                  </div>
                  {errors.message && (
                    <p className="text-destructive text-xs mt-1">{errors.message}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-blue-500 text-white hover:opacity-90 transition-opacity"
                  disabled={formStatus === "submitting"}
                >
                  {formStatus === "submitting" ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
