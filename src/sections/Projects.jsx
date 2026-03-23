import { ArrowUpRight, Code2, Sparkles, ExternalLink } from "lucide-react";
import { GhostButton } from "@/components/GhostButton";
import { StaggerReveal } from "@/components/StaggerReveal";
import { useEffect, useMemo, useState } from "react";

const projects = [
  {
    title: "Music Recommendation System",
    description:
      "Built a content-based recommendation engine using feature vectors and cosine similarity to suggest similar songs. Developed a Flask web interface for real-time recommendations and integrated data preprocessing with Pandas and Scikit-learn.",
    image: "music.avif",
    tags: ["Python", "Pandas", "Scikit-learn", "Cosine Similarity", "Flask"],
    link: null,
    github: "https://github.com/RyanV-0407/Music-Recommendation-using-ML",
  },
  {
    title: "Multi-Horizon Energy Demand Forecasting System",
    description:
      "Designed a forecasting pipeline with EDA, time-series feature engineering, and LightGBM model training for multiple prediction horizons. Exposed model outputs through a Flask API and built a Streamlit dashboard for visual analysis.",
    image: "grid.jpg",
    tags: ["Python", "LightGBM", "Pandas", "Scikit-learn", "Flask", "Streamlit"],
    link: "https://small-area-gridforecasting.streamlit.app/",
    github:
      "https://github.com/RyanV-0407/Grid_Forecasting_system-Multi-Horizon-Energy-Demand-Prediction-System",
  },
  {
    title: "Language Identification in Low-Resource Settings",
    description:
      "Developed an NLP-based language identification model for low-resource datasets, addressing data scarcity and class imbalance. Implemented text preprocessing and n-gram feature extraction to capture linguistic patterns across multiple languages. Trained and evaluated classification models using accuracy, precision, and recall for performance optimization.",
    image: "language.png",
    tags: ["Python", "NLP", "Scikit-learn"],
    link: null,
    github: "https://github.com/Ankit8797/Language-identification-with-low-resource",
  },
  {
    title: "Event Reminder System",
    description:
      "Designed a Java-based reminder application using OOP and DSA concepts for efficient scheduling and retrieval. Integrated a database-backed storage system (MySQL/SQLite) with optional file handling for persistence. Enabled fast retrieval and reliable reminder tracking for managing user events effectively.",
    image: "event.png",
    tags: ["Java", "OOP", "DSA", "File Handling", "MySQL", "SQLite"],
    link: null,
    github: "https://github.com/RyanV-0407/Event-Reminder-System",
  },
];

const allTags = ["All", ...new Set(projects.flatMap((p) => p.tags))];

export const Projects = () => {
  const [activeTag, setActiveTag] = useState("All");
  const [activeProject, setActiveProject] = useState(0);

  const filtered = useMemo(
    () =>
      activeTag === "All"
        ? projects
        : projects.filter((project) => project.tags.includes(activeTag)),
    [activeTag]
  );

  useEffect(() => {
    setActiveProject(0);
  }, [activeTag]);

  const current = filtered[activeProject] || filtered[0];

  if (!current) return null;

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <span className="watermark top-4 right-4 md:right-16">05</span>

      <div className="container mx-auto px-6 relative z-10">
        <StaggerReveal className="text-center mx-auto max-w-4xl mb-12 section-shell edge-clip p-7 md:p-10">
          <span className="section-label">Project Showcase</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-ink">
            Crafted products with
            <span className="font-serif italic font-normal text-rust"> real engineering depth.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore a fresh curated showcase of my selected builds spanning recommendation systems, forecasting, NLP, and full-stack execution.
          </p>
        </StaggerReveal>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {allTags.slice(0, 14).map((tag) => {
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-full font-mono text-[0.68rem] tracking-[0.12em] uppercase border transition-all duration-300 ${
                  isActive
                    ? "text-primary border-primary bg-primary/10 shadow-[0_10px_24px_color-mix(in_srgb,var(--color-primary)_25%,transparent)]"
                    : "text-muted-foreground border-border bg-background/65 hover:text-ink hover:border-primary/45"
                }`}
                data-hover
              >
                {tag}
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-[1.35fr_0.9fr] gap-6 items-start">
          <article className="relative overflow-hidden rounded-3xl border border-border bg-card/95 shadow-[0_30px_70px_color-mix(in_srgb,var(--color-accent)_22%,transparent)]">
            <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-primary/18 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

            <div className="relative z-10 p-4 md:p-5">
              <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-muted aspect-[16/9]">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-contain transition-transform duration-700 hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/35 bg-background/70 text-primary font-mono text-[0.62rem] uppercase tracking-[0.15em]">
                  <Sparkles size={12} /> Featured Build
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full border border-border/80 bg-background/70 text-muted-foreground font-mono text-[0.62rem] uppercase tracking-[0.15em]">
                  {String(activeProject + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
                </div>
              </div>

              <div className="px-2 md:px-3 pt-7 pb-3">
                <h3 className="text-2xl md:text-3xl font-bold text-ink leading-tight font-serif mb-4">{current.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{current.description}</p>

                <div className="flex flex-wrap gap-2 mb-7">
                  {current.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full border border-border/80 bg-background/70 text-[0.65rem] font-mono text-muted-foreground uppercase tracking-[0.12em]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {current.link && (
                    <a
                      href={current.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_24px_color-mix(in_srgb,var(--color-primary)_30%,transparent)]"
                      data-hover
                    >
                      <ExternalLink size={15} /> Live Demo
                    </a>
                  )}

                  {current.github && (
                    <a
                      href={current.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-primary/55 text-primary font-semibold text-sm bg-background/70 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/10"
                      data-hover
                    >
                      <Code2 size={15} /> Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>

          <aside className="section-shell rounded-3xl p-4 md:p-5 md:sticky md:top-28 h-fit">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4 px-1">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">Project Reel</p>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-primary">Select to preview</p>
              </div>

              <div className="space-y-3">
                {filtered.map((project, idx) => {
                  const isActive = idx === activeProject;
                  return (
                    <button
                      key={project.title}
                      onClick={() => setActiveProject(idx)}
                      className={`w-full text-left rounded-2xl border p-3 transition-all duration-300 ${
                        isActive
                          ? "border-primary/60 bg-primary/10 shadow-[0_16px_26px_color-mix(in_srgb,var(--color-primary)_18%,transparent)]"
                          : "border-border bg-background/70 hover:border-primary/35"
                      }`}
                      data-hover
                    >
                      <div className="flex gap-3 items-start">
                        <div className="w-20 h-14 rounded-lg overflow-hidden border border-border/70 bg-muted shrink-0">
                          <img src={project.image} alt={project.title} className="w-full h-full object-contain" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <p className="text-sm font-semibold text-ink leading-snug line-clamp-2">{project.title}</p>
                            <span className="font-mono text-[0.62rem] text-muted-foreground">{String(idx + 1).padStart(2, "0")}</span>
                          </div>
                          <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground truncate">
                            {project.tags.slice(0, 3).join(" • ")}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>

        <div className="text-center mt-12">
          <GhostButton href="https://github.com/RyanV-0407">
            View All Projects
            <ArrowUpRight className="w-4 h-4" />
          </GhostButton>
        </div>
      </div>
    </section>
  );
};
