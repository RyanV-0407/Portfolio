import { StaggerReveal } from "@/components/StaggerReveal";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

const education = [
  {
    institution: "Lovely Professional University, Phagwara",
    degree: "B.Tech - Computer Science and Engineering",
    highlight: "CGPA: 7.70",
    location: "Phagwara, Punjab",
    period: "Jul 2023 - Jul 2027",
    current: true,
  },
  {
    institution: "Ramakrishna Vivekananda Vidyapeeth, Anuppur",
    degree: "Intermediate (PCM)",
    highlight: "Score: 95.6%",
    location: "Anuppur, Madhya Pradesh",
    period: "Jun 2021 - Jul 2022",
    current: false,
  },
  {
    institution: "Ramakrishna Vivekananda Vidyapeeth, Anuppur",
    degree: "Matriculation",
    highlight: "Score: 90%",
    location: "Anuppur, Madhya Pradesh",
    period: "Jul 2019 - Jul 2020",
    current: false,
  },
];

export const Education = () => {
  return (
    <section id="education" className="py-28 relative overflow-hidden">
      {/* Watermark */}
      <span className="watermark -top-8 left-4 md:left-12">04</span>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <StaggerReveal className="space-y-14">

          {/* Section Header */}
          <div className="flex items-end gap-8 section-shell edge-clip p-6 md:p-8">
            <div className="shrink-0">
              <span className="section-label mb-3 block">Academic Background</span>
              <h2 className="text-4xl md:text-5xl font-bold text-ink leading-tight">
                Education &amp;{" "}
                <span className="font-serif italic font-normal text-rust">qualifications.</span>
              </h2>
            </div>
            <div className="flex-1 hidden md:block border-b border-border mb-2" />
          </div>

          {/* Education cards */}
          <div className="flex flex-col gap-5">
            {education.map((edu, idx) => (
              <div key={idx} className="relative group">
                {/* 3D depth layer */}
                <div className="absolute inset-0 translate-x-[5px] translate-y-[5px] border border-border bg-card rounded-2xl transition-transform duration-300 group-hover:translate-x-[8px] group-hover:translate-y-[8px]" />

                {/* Foreground card */}
                <div className="relative bg-background border border-primary/30 rounded-2xl px-8 py-6 transition-transform duration-300 group-hover:-translate-x-[3px] group-hover:-translate-y-[3px] edge-clip">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                    {/* Left — degree info */}
                    <div className="flex gap-4 items-start">
                      <span className="mt-1 w-9 h-9 flex items-center justify-center border border-primary/30 shrink-0 text-primary rounded-lg" style={{ background: "color-mix(in srgb, var(--color-primary) 13%, transparent)" }}>
                        <GraduationCap size={16} />
                      </span>
                      <div className="space-y-1">
                        <h3 className="font-bold text-ink font-serif text-lg leading-snug">
                          {edu.institution}
                          {edu.current && (
                            <span className="ml-3 inline-flex items-center gap-1 font-mono text-[0.6rem] tracking-widest uppercase text-primary border border-primary/40 px-2 py-0.5 align-middle">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                              Current
                            </span>
                          )}
                        </h3>
                        <p className="font-mono text-sm text-muted-foreground">
                          {edu.degree}
                        </p>
                        {/* Thin amber accent */}
                        <div className="w-8 h-px bg-primary mt-2" />
                        <p className="font-mono text-xs font-bold text-primary tracking-wider mt-2">
                          {edu.highlight}
                        </p>
                      </div>
                    </div>

                    {/* Right — location & date */}
                    <div className="flex flex-col gap-1.5 md:items-end shrink-0 pl-13 md:pl-0">
                      <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                        <MapPin size={11} className="text-primary" />
                        {edu.location}
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                        <Calendar size={11} className="text-primary" />
                        {edu.period}
                      </span>
                    </div>
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
