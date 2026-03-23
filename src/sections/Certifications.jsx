import { ChevronLeft, ChevronRight, Award } from "lucide-react";
import { useState } from "react";
import { StaggerReveal } from "@/components/StaggerReveal";

const certifications = [
  {
    title: "Cloud Computing",
    issuer: "NPTEL (SWAYAM)",
    date: "Apr 2026",
    description:
      "Completed NPTEL coursework focused on cloud fundamentals, service models, deployment concepts, and practical cloud computing workflows.",
    badge: "☁",
    color: "var(--color-primary)",
    courseLink: "https://onlinecourses.nptel.ac.in/",
    verifyLink: "https://swayam.gov.in/",
    certificateFile: "/certificates/cloud-computing-nptel.png",
  },
  {
    title: "Introduction to Hardware and Operating Systems",
    issuer: "IBM via Coursera",
    date: "Sep 2024",
    description:
      "Learned core hardware concepts, operating system fundamentals, and system-level knowledge useful for robust software development.",
    badge: "🖥",
    color: "var(--color-rust)",
    courseLink: "https://www.coursera.org/",
    verifyLink: "https://www.coursera.org/",
    certificateFile: "/certificates/ibm-hardware-os.pdf",
  },
  {
    title: "Building Website",
    issuer: "freeCodeCamp",
    date: "Oct 2023",
    description:
      "Completed foundational web development training, strengthening practical HTML/CSS and frontend structuring skills.",
    badge: "🌍",
    color: "var(--color-primary)",
    courseLink: "https://www.freecodecamp.org/",
    verifyLink: "https://www.freecodecamp.org/",
    certificateFile: "/certificates/freecodecamp-building-website.pdf",
  },
  {
    title: "Python Programming",
    issuer: "Infosys",
    date: "Mar 2023",
    description:
      "Completed foundational Python training covering syntax, data structures, and problem-solving essentials used across ML and backend projects.",
    badge: "🐍",
    color: "var(--color-rust)",
    courseLink: "https://www.infosys.com/",
    verifyLink: "https://www.infosys.com/",
    certificateFile: "/certificates/infosys-python-programming.pdf",
  },
  {
    title: "TCP/IP and Advanced Topics",
    issuer: "University of Colorado System via Coursera",
    date: "Coursera",
    description:
      "Completed an in-depth networking course covering IP addressing, subnetting, CIDR, DHCP, ARP, IPv6, TCP handshake, flow control, and congestion control, along with advanced topics including mobile IP, multicast routing, OpenFlow, SDN, NFV, and network security threats.",
    badge: "🌐",
    color: "var(--color-primary)",
    courseLink: "https://www.coursera.org/",
    verifyLink: "https://www.coursera.org/",
    certificateFile: "/certificates/TCP.pdf",
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
            Focused credentials that support my work in cloud, systems, web development, and Python.
          </p>
        </StaggerReveal>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[1.35fr_0.95fr] gap-6 items-start">
            <div className="relative">
              <div
                key={activeIdx}
                className="section-shell edge-clip p-7 md:p-10 animate-fade-in"
                style={{ borderTop: `3px solid ${cert.color}` }}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="font-mono text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{ background: `${cert.color}15`, color: cert.color, border: `1px solid ${cert.color}30` }}
                    >
                      {cert.issuer}
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1 font-mono">
                      <Award className="w-4 h-4" /> {cert.date}
                    </span>
                  </div>

                  <div className="flex items-start gap-4 mb-5">
                    <span
                      className="w-12 h-12 rounded-xl border flex items-center justify-center text-xl shrink-0"
                      style={{ borderColor: `${cert.color}55`, color: cert.color, background: `${cert.color}12` }}
                    >
                      {cert.badge}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-ink font-serif leading-tight">{cert.title}</h3>
                  </div>

                  <p className="text-muted-foreground text-base leading-relaxed">{cert.description}</p>

                  <div className="flex flex-wrap gap-3 mt-7">
                    <a
                      href={cert.certificateFile || cert.verifyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ghost-btn ghost-btn-sm"
                      style={{ borderColor: cert.color, color: cert.color }}
                      data-hover
                    >
                      <Award className="w-3 h-3" /> {cert.certificateFile ? "View Certificate" : "Verify Certificate"}
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
              </div>

              <div className="flex items-center justify-between gap-4 mt-6">
                <button
                  className="p-3 border border-border rounded-xl hover:border-primary hover:text-primary transition-all"
                  onClick={previous}
                  data-hover
                >
                  <ChevronLeft />
                </button>

                <p className="text-center text-sm text-muted-foreground font-mono">
                  {activeIdx + 1} / {certifications.length}
                </p>

                <button
                  onClick={next}
                  className="p-3 border border-border rounded-xl hover:border-primary hover:text-primary transition-all"
                  data-hover
                >
                  <ChevronRight />
                </button>
              </div>
            </div>

            <aside className="section-shell rounded-2xl p-4 md:p-5 md:sticky md:top-28 h-fit">
              <div className="relative z-10 space-y-2">
                {certifications.map((item, idx) => (
                  <button
                    key={item.title}
                    onClick={() => setActiveIdx(idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-300 ${
                      idx === activeIdx
                        ? "border-primary/60 bg-primary/10"
                        : "border-border bg-background/60 hover:border-primary/35"
                    }`}
                    data-hover
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="w-8 h-8 rounded-lg border flex items-center justify-center text-sm shrink-0"
                        style={{ borderColor: `${item.color}55`, color: item.color, background: `${item.color}12` }}
                      >
                        {item.badge}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-ink leading-snug">{item.title}</p>
                        <p className="font-mono text-[0.62rem] uppercase tracking-[0.15em] text-muted-foreground mt-1">{item.issuer}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};