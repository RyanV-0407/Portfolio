import { ChevronLeft, ChevronRight, Award } from "lucide-react";
import { useState } from "react";
import { StaggerReveal } from "@/components/StaggerReveal";

const certifications = [
  {
    title: "Packet Switching Networks and Algorithms",
    issuer: "Coursera",
    date: "October 2023",
    description:
      "Gained in-depth understanding of how data packets are routed across networks, switching algorithms, and network performance optimization — directly applicable to building reliable, networked web applications.",
    badge: "🌐",
    color: "#C8860A",
    courseLink: "https://www.coursera.org/learn/packet-switching-networks-algorithms",
    verifyLink: "https://www.coursera.org/account/accomplishments",
  },
  {
    title: "Crash Course in Python",
    issuer: "Technical Course",
    date: "March 2024",
    description:
      "Completed a comprehensive Python programming course covering core syntax, data structures, OOPs, and scripting — strengthening backend and automation skills used in AI-powered projects.",
    badge: "🐍",
    color: "#8B3A1C",
    courseLink: "https://www.coursera.org/learn/python-crash-course",
    verifyLink: "https://www.coursera.org/account/accomplishments",
  },
  {
    title: "Cloud Computing",
    issuer: "NPTEL Certification",
    date: "May 2025",
    description:
      "Earned NPTEL certification in Cloud Computing covering cloud architecture, virtualization, deployment models, and cloud security — supporting scalable application deployment on platforms like Firebase and Vercel.",
    badge: "☁️",
    color: "#C8860A",
    courseLink: "https://nptel.ac.in/courses/106104079",
    verifyLink: "https://nptel.ac.in/noc/E_Certificate/linkedin/noc",
  },
  {
    title: "C++ Programming — OOPs & Data Structures",
    issuer: "Training Program",
    date: "July 2025",
    description:
      "Completed intensive C++ training focused on Object-Oriented Programming and Data Structures. Applied concepts by building a hospital ER triage system using Binary Heap with real-world features.",
    badge: "⚙️",
    color: "#8B3A1C",
    courseLink: "#",
    verifyLink: "#",
  },
];

export const Certifications = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const next = () => setActiveIdx((prev) => (prev + 1) % certifications.length);
  const previous = () => setActiveIdx((prev) => (prev - 1 + certifications.length) % certifications.length);

  const cert = certifications[activeIdx];

  return (
    <section id="certifications" className="py-32 relative overflow-hidden">
      {/* Watermark */}
      <span className="watermark top-4 right-4 md:right-16">07</span>

      <div className="container mx-auto px-6 relative z-10">

        {/* Section Header */}
        <StaggerReveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label">Certifications</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-ink">
            Credentials that{" "}
            <span className="font-serif italic font-normal text-rust">
              back the work.
            </span>
          </h2>
          <p className="text-muted-foreground">
            Every certificate represents a skill I actively use — not just a badge to collect.
          </p>
        </StaggerReveal>

        {/* Certification Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">

            {/* Card */}
            <div
              key={activeIdx}
              className="bg-card p-8 md:p-12 border border-border relative animate-fade-in"
              style={{ borderTop: `3px solid ${cert.color}` }}
            >
              {/* Issuer + Date */}
              <div className="flex items-center justify-between mb-6 pt-4">
                <span
                  className="font-mono text-xs font-semibold tracking-widest uppercase px-3 py-1"
                  style={{ background: `${cert.color}15`, color: cert.color, border: `1px solid ${cert.color}30` }}
                >
                  {cert.issuer}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1 font-mono">
                  <Award className="w-4 h-4" /> {cert.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-ink font-serif">
                {cert.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-base leading-relaxed">
                {cert.description}
              </p>

              {/* Links */}
              <div className="flex gap-3 mt-6">
                <a
                  href={cert.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ghost-btn ghost-btn-sm"
                  style={{ borderColor: cert.color, color: cert.color }}
                  data-hover
                >
                  <Award className="w-3 h-3" /> Verify Certificate
                </a>
                <a
                  href={cert.courseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ghost-btn ghost-btn-sm"
                  data-hover
                >
                  View Course →
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                className="p-3 border border-border hover:border-primary hover:text-primary transition-all"
                onClick={previous}
                data-hover
              >
                <ChevronLeft />
              </button>

              <div className="flex gap-2">
                {certifications.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`h-2 transition-all duration-300 ${
                      idx === activeIdx
                        ? "w-8 bg-primary"
                        : "w-2 bg-border hover:bg-muted-foreground/50"
                    }`}
                    data-hover
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-3 border border-border hover:border-primary hover:text-primary transition-all"
                data-hover
              >
                <ChevronRight />
              </button>
            </div>

            {/* Counter */}
            <p className="text-center text-sm text-muted-foreground mt-4 font-mono">
              {activeIdx + 1} / {certifications.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};