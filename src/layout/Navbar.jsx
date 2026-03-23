import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#certifications", label: "Certifications" },
];

export const Navbar = ({ onContactClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, current) => {
            return prev.intersectionRatio > current.intersectionRatio ? prev : current;
          });
          setActiveSection(`#${mostVisible.target.id}`);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    const sections = navLinks.map((link) => document.querySelector(link.href)).filter(Boolean);
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 py-4 z-50 animate-fade-in animation-delay-200"
      style={{
        background: "linear-gradient(to bottom, var(--color-background) 40%, transparent 100%)",
      }}
    >
      <nav className="container mx-auto px-4 sm:px-6">
        <div className="nav-shell px-4 sm:px-5 py-3 flex items-center justify-between gap-3">
        <a
          href="#"
          className="font-serif text-2xl sm:text-3xl tracking-tight text-ink hover:text-primary transition-colors"
          data-hover
        >
          Vikram Rathour
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <div className="px-2 py-1 flex items-center gap-1 bg-background/40 rounded-full">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  href={link.href}
                  key={index}
                  className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? "text-primary font-bold bg-primary/12 shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-primary)_45%,transparent)]"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  data-hover
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button
            onClick={onContactClick}
            className="ghost-btn ghost-btn-sm"
            data-hover
          >
            ⟩ Contact Details
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-ink rounded-full border border-border"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          data-hover
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border animate-fade-in">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  href={link.href}
                  key={index}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-mono text-sm tracking-wider uppercase py-2 transition-colors ${
                    isActive
                      ? "text-primary font-bold border-l-2 border-primary pl-2"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  data-hover
                >
                  {link.label}
                </a>
              );
            })}

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onContactClick();
              }}
              className="ghost-btn w-full justify-center mt-4"
              data-hover
            >
              ⟩ Contact Details
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
