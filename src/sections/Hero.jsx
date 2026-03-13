import { GhostButton } from "@/components/GhostButton";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Download,
  Code2,
  Trophy,
} from "lucide-react";

const handleDownloadCV = () => {
  const link = document.createElement('a');
  link.href = '/vishal-singh-cv.pdf';
  link.download = 'Vishal-Singh-CV.pdf';
  link.click();
};

const skills = [
  "React.js", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS",
  "Tailwind CSS", "Bootstrap", "Node.js", "JWT Authentication",
  "MongoDB", "MySQL", "SQLite", "Mongoose",
  "C++", "Python", "JAVA",
  "Git", "GitHub", "Docker", "Firebase", "Vercel",
  "Wireshark", "Burp Suite", "Nmap", "Metasploit",
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Number Watermark */}
      <span className="watermark top-12 right-8 md:right-16">01</span>

      {/* Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 border border-border font-mono text-xs tracking-wider uppercase text-primary">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Driven Full-Stack Developer
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in animation-delay-100 text-ink">
                Turning <span className="text-primary">Ideas</span>
                <br />
                into <span className="text-rust">full-stack</span>
                <br />
                <span className="font-serif italic font-normal text-ink/70">
                  experiences.
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-200 font-sans">
                Hey, I'm Vishal — a 21 year old developer from India, also a CSE student who loves building things that actually work.
              </p>
              <span className="block font-mono text-sm text-primary animate-fade-in animation-delay-200 tracking-wider">
                Code. Build. Ship. Repeat.
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
              <GhostButton
                size="lg"
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Contact Me <ArrowRight className="w-4 h-4" />
              </GhostButton>
              <GhostButton size="lg" onClick={handleDownloadCV}>
                <Download className="w-4 h-4" />
                Download CV
              </GhostButton>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 animate-fade-in animation-delay-400">
              <span className="font-mono text-xs text-muted-foreground tracking-wider uppercase">Follow:</span>
              {[
                { icon: Github, href: "https://github.com/Vishal-047" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/vishal0407" },
                { icon: Code2, href: "https://leetcode.com/u/Vishal407/" },
                { icon: Trophy, href: "https://www.geeksforgeeks.org/profile/vishal407" },
                { icon: Mail, href: "mailto:vishalrw007@gmail.com" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-border hover:border-primary hover:text-primary transition-all duration-300"
                  data-hover
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <div className="relative animate-fade-in animation-delay-300">
            <div className="relative max-w-md mx-auto">
              <div className="relative border border-border p-2">
                <img
                  src="/meee.jpeg"
                  alt="Vishal Singh"
                  className="w-full aspect-[4/5] object-cover"
                />
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-4 bg-background border border-primary px-4 py-3 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                    <span className="font-mono text-xs text-primary tracking-wider uppercase">
                      Available for work
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-20 animate-fade-in animation-delay-600">
          <p className="section-label mb-6 text-center">
            Technologies I work with
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="filter-tag"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
