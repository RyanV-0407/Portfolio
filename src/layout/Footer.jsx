import { Github, Linkedin, Mail, Code2, Trophy } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/vishal-047", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/vishal0407", label: "LinkedIn" },
  { icon: Code2, href: "https://leetcode.com/u/Vishal407/", label: "LeetCode" },
  { icon: Trophy, href: "https://www.geeksforgeeks.org/profile/vishal407", label: "GFG" },
  { icon: Mail, href: "mailto:vishalrw007@gmail.com", label: "Mail" },
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
    <footer className="py-12 border-t border-border" style={{ background: "#635547ff" }}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a href="#" className="font-serif text-xl tracking-tight text-amber-100" data-hover>
              VS<span className="text-primary">.</span>
            </a>
            <p className="text-sm mt-2" style={{ color: "#6B5B3E" }}>
              © {currentYear} Vishal Singh. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs tracking-wider uppercase hover:text-primary transition-colors"
                style={{ color: "#6B5B3E" }}
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
                style={{ borderColor: "#3D2F18", color: "#6B5B3E" }}
                data-hover
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C8860A"; e.currentTarget.style.color = "#C8860A"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#3D2F18"; e.currentTarget.style.color = "#6B5B3E"; }}
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
