import { ArrowUpRight, Github } from "lucide-react";
import { GhostButton } from "@/components/GhostButton";
import { StaggerReveal } from "@/components/StaggerReveal";
import { useState } from "react";

const projects = [
  {
    title: "Eco-Retail: AI-Powered Circular Commerce Platform",
    description: "A scalable AI-powered e-commerce platform featuring JWT authentication, role-based access control, 15+ REST APIs, and MongoDB optimization reducing average API response time by ~25ms.",
    image: "eco.png",
    tags: ["Next.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Firebase", "YOLOv8", "JWT"],
    link: "https://eco-com-retail.vercel.app/",
    github: "https://github.com/Vishal-047/eco_retail",
  },
  {
    title: "Medicare-AI: AI-Powered Healthcare Management Platform",
    description: "A secure healthcare management system with patient records, appointment scheduling, OCR-based document processing, and integrated Stripe payments and Twilio notifications.",
    image: "medicare_ai.png",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "Stripe", "Twilio"],
    link: "https://medi-health-ai.vercel.app",
    github: "https://github.com/Vishal-047/Medicare_AI",
  },
  {
    title: "URL Shortener",
    description: "A clean and fast URL shortening service that converts long URLs into short, shareable links with redirect functionality.",
    image: "",
    tags: ["JavaScript", "Node.js"],
    link: "#",
    github: "https://github.com/Vishal-047/URL-Shortner",
  },
  {
    title: "Security Header Checker",
    description: "A web tool to analyze and validate HTTP security headers of any website, helping developers identify missing or misconfigured security headers.",
    image: "",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "#",
    github: "https://github.com/Vishal-047/Security-header-checker",
  },
];

// Collect unique tags
const allTags = ["All", ...new Set(projects.flatMap((p) => p.tags))];

// Grid span classes: all equal 6-col (2 per row)
const getSpan = () => "span-6";

export const Projects = () => {
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeTag));

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Watermark */}
      <span className="watermark top-4 right-4 md:right-16">03</span>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <StaggerReveal className="text-center mx-auto max-w-3xl mb-12">
          <span className="section-label">Featured Work</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-ink">
            Projects that
            <span className="font-serif italic font-normal text-rust">
              {" "}make an impact.
            </span>
          </h2>
          <p className="text-muted-foreground">
            A selection of my recent work, from complex web applications to
            innovative tools that solve real-world problems.
          </p>
        </StaggerReveal>

        {/* Filter Tag Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {allTags.slice(0, 12).map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`filter-tag ${activeTag === tag ? "active" : ""}`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Editorial Grid */}
        <div className="editorial-grid">
          {filtered.map((project, idx) => (
            <div
              key={idx}
              className={`group relative border border-border bg-card overflow-hidden transition-all duration-500 hover:border-primary/50 ${getSpan(idx)}`}
            >
              {/* Card Index Badge */}
              <div className="card-badge">
                {String(idx + 1).padStart(2, "0")}
              </div>

              {/* Image area */}
              <div className="relative overflow-hidden aspect-video bg-muted">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-serif text-6xl text-border/50 font-bold">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                )}
                {/* Overlay Links */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-ink/30">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-background/50 bg-background/80 hover:bg-primary hover:text-primary-foreground transition-all"
                    data-hover
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-background/50 bg-background/80 hover:bg-primary hover:text-primary-foreground transition-all"
                    data-hover
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
                  aria-label={`View ${project.title}`}
                >
                  <h3 className="text-xl font-bold text-ink group-hover:text-primary transition-colors font-serif">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0 ml-2" />
                </a>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="filter-tag"
                      style={{ fontSize: "0.65rem" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <GhostButton href="https://github.com/Vishal-047">
            View All Projects
            <ArrowUpRight className="w-4 h-4" />
          </GhostButton>
        </div>
      </div>
    </section>
  );
};
