import { StaggerReveal } from "@/components/StaggerReveal";

const experiences = [
  {
    period: "Jun 2025 - Jul 2025",
    role: "DSA Using Java Training",
    company: "Cipher Schools",
    description:
      "Completed structured training in Java, OOP, and algorithms including Binary Search, Quick Sort, and Merge Sort. Built an Event Reminder System and solved 50+ DSA problems on LeetCode and HackerRank.",
    technologies: ["Java", "OOP", "DSA", "LeetCode", "HackerRank"],
    current: false,
  },
  {
    period: "2025",
    role: "Hackathon Achievement",
    company: "LPU Hackathon",
    description:
      "Secured runner-up position at the LPU Hackathon by delivering a working prototype under strict time constraints with strong teamwork and rapid iteration.",
    technologies: ["Problem Solving", "Team Collaboration", "Rapid Prototyping"],
    current: false,
  },
  {
    period: "Ongoing",
    role: "Competitive Coding Milestones",
    company: "HackerRank and LeetCode",
    description:
      "Achieved 5-star ratings on HackerRank in Python, C++, Java, and Problem Solving, and solved 100+ DSA problems on LeetCode through consistent algorithm practice.",
    technologies: ["Python", "C++", "Java", "Problem Solving", "DSA"],
    current: false,
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* Watermark */}
      <span className="watermark -top-4 left-4 md:left-12">06</span>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <StaggerReveal className="max-w-3xl mx-auto text-center mb-16">
          <span className="section-label">Growth Timeline</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-ink">
            Training and
            <span className="font-serif italic font-normal text-rust">
              {" "}achievements.
            </span>
          </h2>
          <p className="text-muted-foreground">
            A snapshot of structured learning, competition milestones, and
            consistent problem-solving progress.
          </p>
        </StaggerReveal>

        {/* Timeline */}
        <div className="relative">
          <div
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2"
            style={{
              background: "linear-gradient(to bottom, var(--color-primary), var(--color-accent), transparent)",
            }}
          />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="relative grid md:grid-cols-2 gap-8 animate-fade-in"
                style={{ animationDelay: `${(idx + 1) * 150}ms` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-primary rounded-full -translate-x-1/2 ring-4 ring-background z-10">
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                  )}
                </div>

                {/* Content */}
                <div
                  className={`pl-8 md:pl-0 ${
                    idx % 2 === 0
                      ? "md:pr-16 md:text-right"
                      : "md:col-start-2 md:pl-16"
                  }`}
                >
                  <div className="bg-card p-6 border border-border hover:border-primary/50 transition-all duration-500">
                    <span className="font-mono text-xs text-primary tracking-wider">
                      {exp.period}
                    </span>
                    <h3 className="text-xl font-bold mt-2 text-ink font-serif">{exp.role}</h3>
                    <p className="text-muted-foreground font-mono text-sm">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mt-4">
                      {exp.description}
                    </p>
                    <div
                      className={`flex flex-wrap gap-2 mt-4 ${
                        idx % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      {exp.technologies.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="filter-tag"
                          style={{ fontSize: "0.65rem" }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};