import { useState, useEffect, useRef } from "react";
import { StaggerReveal } from "@/components/StaggerReveal";

const skills = [
  { label: "Python / ML", value: 88, icon: "🤖", domain: "Modeling" },
  { label: "Data Analysis", value: 86, icon: "📊", domain: "Analytics" },
  { label: "DSA / Problem Solving", value: 84, icon: "🧠", domain: "Core CS" },
  { label: "React / Frontend", value: 80, icon: "⚛️", domain: "UI Engineering" },
  { label: "Flask / FastAPI", value: 82, icon: "⚙️", domain: "API" },
  { label: "Databases", value: 78, icon: "🗄️", domain: "Data Layer" },
];

function SkillRow({ skill, animate, index }) {
  return (
    <div
      className="border border-border rounded-xl bg-background/70 px-4 py-4"
      style={{
        animation: animate ? "fadeUp 0.5s ease both" : "none",
        animationDelay: `${index * 90}ms`,
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-8 h-8 rounded-lg border border-primary/30 bg-primary/10 flex items-center justify-center text-sm shrink-0">
            {skill.icon}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink truncate">{skill.label}</p>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">{skill.domain}</p>
          </div>
        </div>
        <span className="font-mono text-xs text-primary font-semibold">{skill.value}%</span>
      </div>

      <div className="h-1.5 rounded-full bg-border/60 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: animate ? `${skill.value}%` : "0%",
            transition: "width 0.95s cubic-bezier(0.22, 1, 0.36, 1)",
            background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
          }}
        />
      </div>
    </div>
  );
}

export const About = () => {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimate(true);
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <span className="watermark -top-8 left-4 md:left-12">02</span>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <StaggerReveal className="space-y-8">
            <div>
              <span className="section-label">About Me</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-ink">
              Building practical AI and data products —
              <span className="font-serif italic font-normal text-rust"> one meaningful solution at a time.</span>
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm Vikram Singh Rathour, a B.Tech CSE student at Lovely Professional University with strong interests in machine
                learning, data analysis, and full-stack development. I enjoy turning data into actionable products with clean
                engineering and practical UX.
              </p>
              <p>
                My recent work includes a content-based music recommendation system and a multi-horizon energy demand forecasting
                platform using LightGBM, feature engineering, and interactive dashboards. I focus on creating systems that are
                understandable, testable, and deployable.
              </p>
              <p>
                I am a runner-up hackathon participant, hold 5-star HackerRank badges in multiple domains, and consistently sharpen
                problem-solving through DSA and competitive coding practice.
              </p>
            </div>

            <div className="border border-primary/30 bg-card p-6 rounded-2xl">
              <p className="text-lg font-serif italic text-ink">
                "My goal is to build reliable, intelligent solutions that make data useful for real people and real decisions."
              </p>
            </div>
          </StaggerReveal>

          <div ref={ref} className="section-shell edge-clip p-7 md:p-8">
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <span className="section-label">Capability Snapshot</span>
                  <h3 className="text-xl md:text-2xl font-bold text-ink mt-2">Current strengths across core areas</h3>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[0.65rem] tracking-[0.14em] text-muted-foreground uppercase">Average Score</p>
                  <p className="text-2xl font-bold text-primary">83%</p>
                </div>
              </div>

              <div className="grid gap-3">
                {skills.map((skill, index) => (
                  <SkillRow key={skill.label} skill={skill} animate={animate} index={index} />
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-border flex items-center justify-center gap-8 text-center">
                {["100+|LeetCode", "5★|HackerRank", "4|Major ML Projects"].map((entry) => {
                  const [num, label] = entry.split("|");
                  return (
                    <div key={entry}>
                      <p className="font-mono text-lg font-bold text-primary">{num}</p>
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};
