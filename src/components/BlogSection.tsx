
import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Building Scalable Web Applications with React and Node.js",
    excerpt: "Learn how to design and implement highly scalable web applications using React for the frontend and Node.js for the backend.",
    date: "May 1, 2023",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?q=80&w=500&auto=format&fit=crop",
    readTime: "8 min read",
    author: {
      name: "Akram NG",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=100&auto=format&fit=crop"
    }
  },
  {
    id: 2,
    title: "Implementing Role-Based Access Control in Modern Applications",
    excerpt: "Explore best practices for implementing secure role-based access control (RBAC) in your web and mobile applications.",
    date: "April 15, 2023",
    category: "Security",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=500&auto=format&fit=crop",
    readTime: "12 min read",
    author: {
      name: "Akram NG",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=100&auto=format&fit=crop"
    }
  },
  {
    id: 3,
    title: "Optimizing Network Performance for Cloud Applications",
    excerpt: "Discover strategies to enhance network performance and reduce latency in cloud-based applications and services.",
    date: "March 28, 2023",
    category: "Network Engineering",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=500&auto=format&fit=crop",
    readTime: "10 min read",
    author: {
      name: "Akram NG",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=100&auto=format&fit=crop"
    }
  }
];

const BlogSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const blogItemRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    blogItemRefs.current.forEach(item => {
      if (item) observer.observe(item);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      blogItemRefs.current.forEach(item => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  return (
    <section 
      id="blog"
      className="py-20 relative"
      ref={sectionRef}
    >
      {/* Background elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 opacity-0 translate-y-10 transform transition-all duration-700"
             ref={(el) => (sectionRef.current = el)}>
          <h2 className="section-title">Blog & Insights</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Latest articles and tutorials on development, design, and technology
          </p>
        </div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <div 
              key={post.id}
              className="opacity-0 translate-y-10 transform transition-all duration-700"
              ref={(el) => (blogItemRefs.current[index] = el)}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="h-full glass-card group hover:border-primary/40 transition-all duration-300 overflow-hidden">
                {/* Post image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary/90 backdrop-blur-sm text-xs font-medium px-3 py-1 rounded-full text-white">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Post content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-display font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4">
                    {post.excerpt}
                  </p>
                  
                  {/* Author info */}
                  <div className="flex items-center mt-6 pt-4 border-t border-border">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name} 
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <span className="text-sm font-medium">{post.author.name}</span>
                    
                    <div className="ml-auto">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="p-0 h-auto hover:text-primary hover:bg-transparent"
                      >
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View more button */}
        <div className="text-center mt-12 opacity-0 translate-y-10 transform transition-all duration-700 delay-700"
             ref={(el) => (blogItemRefs.current[blogItemRefs.current.length - 1] = el)}>
          <Button
            variant="outline"
            className="border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
