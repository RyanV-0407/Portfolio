import { StaggerReveal } from "@/components/StaggerReveal";

const skillCategories = [
  {
    icon: "⌨️",
    title: "Coding Skills",
    skills: ["C++", "Python", "DSA", "OOPs", "DBMS", "SQL"]
  },
  {
    icon: "🌐",
    title: "Full Stack Dev",
    skills: ["HTML", "CSS", "JavaScript", "React.js", "Next.js", "Tailwind CSS", "Bootstrap", "Node.js", "Express.js", "REST APIs", "JWT Auth"]
  },
  {
    icon: "🗄️",
    title: "Databases",
    skills: ["MySQL", "SQLite", "MongoDB", "Mongoose"]
  },
  {
    icon: "🛠️",
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "Docker", "Firebase", "Vercel"]
  },
  {
    icon: "🛡️",
    title: "Cybersecurity",
    skills: ["Wireshark", "Burp Suite", "Nmap", "Metasploit", "Cisco Packet Tracer", "SETOOLKIT"]
  },
  {
    icon: "💡",
    title: "Soft Skills",
    skills: ["Problem-Solving", "Team Collaboration", "Adaptability", "Algorithmic Thinking"]
  }
];

export const Skills = () => {
  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      <span className="watermark -top-8 left-4 md:left-12">03</span>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <StaggerReveal className="space-y-14">

          {/* Section header — same pattern as About / Hero */}
          <div className="flex items-end gap-8">
            <div className="shrink-0">
              <span className="section-label mb-3 block">Skills & Expertise</span>
              <h2 className="text-4xl md:text-5xl font-bold text-ink leading-tight">
                Technical <span className="font-serif italic font-normal text-rust">arsenal.</span>
              </h2>
            </div>
            <div className="flex-1 hidden md:block border-b border-border mb-2" />
            <p className="hidden lg:block text-sm text-muted-foreground font-mono max-w-xs mb-2 text-right">
              Tools &amp; technologies I use to bring ideas to life.
            </p>
          </div>

          {/* Card grid — 3D via offset border layer (same trick as Hero floating badge) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, idx) => (
              <div key={idx} className="relative group">
                {/* Depth layer — the "3D" offset, uses border-border to stay on-theme */}
                <div className="absolute inset-0 translate-x-[5px] translate-y-[5px] border border-border bg-card transition-transform duration-300 group-hover:translate-x-[8px] group-hover:translate-y-[8px]" />

                {/* Foreground card — lifts toward viewer on hover */}
                <div className="relative bg-background border border-primary/30 p-6 flex flex-col gap-5 transition-transform duration-300 group-hover:-translate-x-[3px] group-hover:-translate-y-[3px]">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono text-xs font-bold text-ink uppercase tracking-widest">
                      {category.title}
                    </h3>
                    <span className="text-base">{category.icon}</span>
                  </div>

                  {/* Thin amber rule */}
                  <div className="w-8 h-px bg-primary" />

                  {/* Skill tags — reuse native .filter-tag */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="filter-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </StaggerReveal>
      </div>
    </section>
  );
};