import { useState, useEffect } from "react";
import { Mail, Phone, Github, Linkedin, MapPin, Briefcase, X, User } from "lucide-react";

const contactData = [
  { key: "Name", value: "Vikram Singh Rathour", icon: User },
  { key: "Email", value: "vikramsingh3124k@gmail.com", href: "mailto:vikramsingh3124k@gmail.com", icon: Mail },
  { key: "Phone", value: "+91 8982706433", href: "tel:+918982706433", icon: Phone },
  { key: "GitHub", value: "github.com/RyanV-0407", href: "https://github.com/RyanV-0407", icon: Github },
  { key: "LinkedIn", value: "linkedin.com/in/vikram-singh-r0407/", href: "https://linkedin.com/in/vikram-singh-r0407/", icon: Linkedin },
  { key: "Location", value: "Phagwara, Punjab, India", icon: MapPin },
  { key: "Status", value: "Open to internships and collaborations", icon: Briefcase, highlight: true },
];

function DataLine({ item, index, show }) {
  const [revealed, setRevealed] = useState(false);
  const [scrambled, setScrambled] = useState(true);
  const [displayValue, setDisplayValue] = useState("");
  const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  useEffect(() => {
    if (!show) return;
    const revealTimer = setTimeout(() => {
      setRevealed(true);
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayValue(
          item.value.split("").map((char, i) => {
            if (i < iteration) return char;
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }).join("")
        );
        iteration += 1;
        if (iteration > item.value.length) {
          clearInterval(interval);
          setScrambled(false);
        }
      }, 30);
      return () => clearInterval(interval);
    }, index * 200);
    return () => clearTimeout(revealTimer);
  }, [show, index, item.value]);

  if (!revealed) return <div style={{ height: 52 }} />;

  const Icon = item.icon;
  const content = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "12px 16px",
        borderBottom: "1px solid var(--color-border)",
        animation: "revealSlide 0.4s ease forwards",
        transition: "background 0.25s ease",
      }}
      className="contact-line"
    >
      <div style={{
        width: 36, height: 36,
        display: "flex", alignItems: "center", justifyContent: "center",
        border: "1px solid var(--color-border)",
        color: item.highlight ? "var(--color-rust)" : "var(--color-primary)",
        flexShrink: 0,
      }}>
        <Icon size={16} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.12em",
          color: "var(--color-muted-foreground)",
          textTransform: "uppercase",
          marginBottom: 2,
        }}>
          {item.key}
        </div>
        <div style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: 14,
          color: item.highlight ? "var(--color-rust)" : "var(--color-ink)",
          fontWeight: item.highlight ? 600 : 400,
        }}>
          {displayValue || item.value}
        </div>
      </div>
      {item.href && (
        <span style={{ color: "var(--color-primary)", fontSize: 12 }}>→</span>
      )}
    </div>
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", display: "block" }}
        data-hover
      >
        {content}
      </a>
    );
  }
  return content;
}

export const DevContactFlash = ({ open, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      setShowData(false);
      document.body.style.overflow = "hidden";
      // Small delay before showing data for entrance animation
      const t = setTimeout(() => setShowData(true), 400);
      return () => clearTimeout(t);
    } else {
      document.body.style.overflow = "";
      setShowData(false);
      const t = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!visible) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: open
          ? "color-mix(in srgb, var(--color-ink) 62%, transparent)"
          : "color-mix(in srgb, var(--color-ink) 0%, transparent)",
        backdropFilter: open ? "blur(8px)" : "blur(0)",
        transition: "all 0.4s ease",
        opacity: open ? 1 : 0,
      }}
    >
      {/* Modal card */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--color-background)",
          border: "1px solid var(--color-border)",
          width: "min(92vw, 480px)",
          overflow: "hidden",
          transform: open ? "scale(1) translateY(0)" : "scale(0.95) translateY(20px)",
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease",
          boxShadow:
            "0 25px 80px color-mix(in srgb, var(--color-ink) 35%, transparent), 0 0 0 1px color-mix(in srgb, var(--color-primary) 25%, transparent)",
          position: "relative",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "20px 24px 16px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--color-border)",
        }}>
          <div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22,
              fontWeight: 700,
              color: "var(--color-ink)",
              margin: 0,
              lineHeight: 1.3,
            }}>
              Contact <span style={{ fontStyle: "italic", color: "var(--color-rust)" }}>Details</span>
            </h3>
            <p style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.15em",
              color: "var(--color-muted-foreground)",
              marginTop: 4,
              textTransform: "uppercase",
            }}>
              Let's connect & build together
            </p>
          </div>
          <button
            onClick={onClose}
            data-hover
            style={{
              background: "transparent",
              border: "1px solid var(--color-border)",
              width: 32, height: 32,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--color-muted-foreground)",
              transition: "all 0.25s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--color-primary)"; e.currentTarget.style.color = "var(--color-primary)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.color = "var(--color-muted-foreground)"; }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Contact data */}
        <div style={{ padding: 0 }}>
          {contactData.map((item, i) => (
            <DataLine key={i} item={item} index={i} show={showData} />
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: "12px 24px",
          borderTop: "1px solid var(--color-border)",
          textAlign: "center",
        }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.12em",
            color: "color-mix(in srgb, var(--color-muted-foreground) 50%, transparent)",
            textTransform: "uppercase",
          }}>
            Click links to connect · ESC to close
          </span>
        </div>
      </div>

      <style>{`
        @keyframes revealSlide {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .contact-line:hover {
          background: color-mix(in srgb, var(--color-primary) 10%, transparent) !important;
        }
      `}</style>
    </div>
  );
};
