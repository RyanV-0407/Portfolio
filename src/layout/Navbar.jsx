import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#certifications", label: "Certifications" },
];

export const Navbar = ({ onContactClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 py-5 z-50"
      style={{
        background: "linear-gradient(to bottom, var(--color-background) 40%, transparent 100%)",
      }}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="font-serif text-xl tracking-tight text-ink hover:text-primary transition-colors"
          data-hover
        >
          Vishal Singh<span className="text-primary">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <div className="border border-border px-2 py-1 flex items-center gap-1 bg-background/60 backdrop-blur-md">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={index}
                className="px-4 py-2 font-mono text-xs tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors"
                data-hover
              >
                {link.label}
              </a>
            ))}
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
          className="md:hidden p-2 text-ink"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          data-hover
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border animate-fade-in">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={index}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-mono text-sm tracking-wider uppercase text-muted-foreground hover:text-primary py-2"
                data-hover
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={() => { setIsMobileMenuOpen(false); onContactClick(); }}
              className="ghost-btn w-full justify-center"
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
