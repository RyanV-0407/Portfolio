import { Github, Linkedin, Mail, Code2, Trophy } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/RyanV-0407", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/vikram-singh-r0407/", label: "LinkedIn" },
  { icon: Code2, href: "https://leetcode.com/u/vikramsingh3124k/", label: "LeetCode" },
  { icon: Trophy, href: "https://www.hackerrank.com/profile/vikramsingh3124k", label: "HackerRank" },
  { icon: Mail, href: "mailto:vikramsingh3124k@gmail.com", label: "Mail" },
];

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-12 border-t border-border"
      style={{
        background:
          "linear-gradient(180deg, color-mix(in srgb, var(--color-surface) 90%, var(--color-secondary) 10%) 0%, color-mix(in srgb, var(--color-surface) 65%, var(--color-ink) 35%) 100%)",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a href="#" className="font-serif text-xl tracking-tight text-foreground" data-hover>
              VR<span className="text-primary">.</span>
            </a>
            <p className="text-sm mt-2" style={{ color: "var(--color-muted-foreground)" }}>
              © {currentYear} Vikram Singh Rathour. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs tracking-wider uppercase hover:text-primary transition-colors"
                style={{ color: "var(--color-muted-foreground)" }}
                data-hover
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2 border transition-all"
                style={{ borderColor: "var(--color-border)", color: "var(--color-muted-foreground)" }}
                data-hover
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-primary)"; e.currentTarget.style.color = "var(--color-primary)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.color = "var(--color-muted-foreground)"; }}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
