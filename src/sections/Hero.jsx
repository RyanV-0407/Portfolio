import { GhostButton } from "@/components/GhostButton";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Download,
} from "lucide-react";
export const Hero = () => {

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Number Watermark */}
      <span className="watermark top-12 right-8 md:right-16">01</span>

      {/* Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Column */}
          <div className="space-y-8 section-shell edge-clip p-7 md:p-10">
            <div className="animate-fade-in animation-delay-400">
              <span className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-full font-mono text-xs tracking-wider uppercase text-primary bg-background/40">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                AI/ML and Full-Stack Developer
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-5">
              <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.04] animate-fade-in animation-delay-600 text-ink">
                Building <span className="text-primary">Data-Driven</span>
                <br />
                <span className="text-rust">intelligent</span>
                <br />
                <span className="font-serif italic font-normal text-ink/70">
                  web products.
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-800 font-sans">
                Hey, I'm Vikram Singh Rathour, a B.Tech CSE student focused on machine learning,
                data-driven systems, and practical full-stack applications.
              </p>
              <span className="block font-mono text-sm text-primary animate-fade-in animation-delay-800 tracking-wider">
                Learn. Build. Optimize. Repeat.
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-1000">
              <GhostButton
                size="lg"
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Contact Me <ArrowRight className="w-4 h-4" />
              </GhostButton>
                <GhostButton size="lg" href="/Revised_CV.pdf" target="_blank">
                  <Download className="w-4 h-4" />
                  View Resume
                  </GhostButton>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 animate-fade-in animation-delay-1200 pt-2">
              <span className="font-mono text-xs text-muted-foreground tracking-wider uppercase">Follow:</span>
              {[
                { icon: Github, href: "https://github.com/RyanV-0407" },
                { icon: Linkedin, href: "https://linkedin.com/in/vikram-singh-r0407/" },
                { icon: Mail, href: "mailto:vikramsingh3124k@gmail.com" },
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
          <div className="relative animate-fade-in animation-delay-1000">
            <div className="relative max-w-md mx-auto">
              <div className="relative section-shell edge-clip p-3">
                <img
                  src="/meee.jpeg"
                  alt="Vikram Singh Rathour"
                  className="w-full aspect-[4/5] object-cover edge-clip"
                />
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-4 bg-background border border-primary rounded-xl px-4 py-3 animate-float shadow-[0_14px_35px_color-mix(in_srgb,var(--color-primary)_28%,transparent)]">
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
      </div>
    </section>
  );
};
