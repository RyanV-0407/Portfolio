import { useState, useEffect, useRef } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { GhostButton } from "@/components/GhostButton";
import { StaggerReveal } from "@/components/StaggerReveal";
import emailjs from "@emailjs/browser";

const commands = [
  { cmd: "whoami", label: "Name", out: "Vishal Singh", color: "#C8860A" },
  { cmd: "cat email.txt", label: "Email", out: "Vishalrw007@gmail.com", color: "#8B3A1C", href: "mailto:Vishalrw007@gmail.com" },
  { cmd: "cat phone.txt", label: "Phone", out: "+91-7355752539", color: "#8B3A1C", href: "tel:+917355752539" },
  { cmd: "open github", label: "GitHub", out: "github.com/Vishal-047", color: "#C8860A", href: "https://github.com/Vishal-047" },
  { cmd: "open linkedin", label: "LinkedIn", out: "linkedin.com/in/vishal0407", color: "#C8860A", href: "https://www.linkedin.com/in/vishal0407" },
  { cmd: "locate user", label: "Location", out: "Punjab, India 📍", color: "#6B5B3E" },
  { cmd: "status --check", label: "Status", out: "● Available for Internship", color: "#C8860A" },
];

function TerminalLine({ line, delay }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (!visible) return null;

  return (
    <div style={{ marginBottom: 10, animation: "slideIn 0.3s ease forwards" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ color: "#C8860A", fontWeight: "bold" }}>vishal@dev</span>
        <span style={{ color: "#6B5B3E" }}>:</span>
        <span style={{ color: "#8B3A1C" }}>~</span>
        <span style={{ color: "#6B5B3E" }}>$</span>
        <span style={{ color: "#1A1108" }}>{line.cmd}</span>
      </div>
      <div style={{ paddingLeft: 16, marginTop: 3, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "#6B5B3E", fontSize: 11 }}>→</span>
        {line.href ? (
          <a
            href={line.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: line.color, textDecoration: "none", fontSize: 13,
              fontFamily: "'DM Mono', monospace",
              borderBottom: `1px dashed ${line.color}60`,
              transition: "border-color 0.2s",
            }}
            data-hover
          >
            {line.out}
          </a>
        ) : (
          <span style={{ color: line.color, fontSize: 13, fontFamily: "'DM Mono', monospace" }}>{line.out}</span>
        )}
      </div>
    </div>
  );
}

export const Contact = () => {
  const [started, setStarted] = useState(false);
  const bottomRef = useRef();

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: "" });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [started]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS configuration is missing. Please check your environment variables.");
      }

      await emailjs.send(serviceId, templateId, {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }, publicKey);

      setSubmitStatus({ type: "success", message: "Message sent successfully! I'll get back to you soon." });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setSubmitStatus({ type: "error", message: err.text || "Failed to send message. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Watermark */}
      <span className="watermark top-4 right-4 md:right-16">08</span>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <StaggerReveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label">Contact</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-ink">
            Let's build something{" "}
            <span className="font-serif italic font-normal text-rust">
              great together.
            </span>
          </h2>
          <p className="text-muted-foreground">
            Open to internship opportunities, collaborations, and exciting projects.
            Run the terminal or drop me a message.
          </p>
        </StaggerReveal>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* LEFT — Contact Form */}
          <div className="bg-card p-8 md:p-10 border border-border">
            <h3 className="text-xl font-bold mb-6 font-serif text-ink">Send me a message</h3>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="contact-name" className="block font-mono text-xs font-medium mb-2 text-muted-foreground tracking-wider uppercase">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Your name..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-sans"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block font-mono text-xs font-medium mb-2 text-muted-foreground tracking-wider uppercase">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-sans"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block font-mono text-xs font-medium mb-2 text-muted-foreground tracking-wider uppercase">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message..."
                  className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none font-sans"
                />
              </div>

              <GhostButton className="w-full justify-center" size="lg" type="submit" disabled={isLoading}>
                {isLoading ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
              </GhostButton>

              {submitStatus.type && (
                <div className={`flex items-center gap-3 p-4 border ${submitStatus.type === "success"
                  ? "bg-amber-50 border-primary/30 text-primary"
                  : "bg-red-50 border-rust/30 text-rust"
                  }`}>
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <p className="text-sm">{submitStatus.message}</p>
                </div>
              )}
            </form>
          </div>

          {/* RIGHT — Terminal */}
          <div style={{
            background: "#2A200F",
            border: "1px solid #3D2F18",
            overflow: "hidden",
            fontFamily: "'DM Mono', monospace",
            fontSize: 13,
          }}>
            {/* Title bar */}
            <div style={{
              background: "#1A1108", padding: "10px 16px",
              display: "flex", alignItems: "center", gap: 8,
              borderBottom: "1px solid #3D2F18",
            }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#8B3A1C" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#C8860A" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#6B5B3E" }} />
              <span style={{ color: "#6B5B3E", fontSize: 12, marginLeft: 8, letterSpacing: 1 }}>
                contact_info.sh
              </span>
            </div>

            {/* Terminal body */}
            <div style={{ padding: 20, minHeight: 380, maxHeight: 450, overflowY: "auto", background: "#F5EFE0" }}>
              <div style={{ color: "#6B5B3E", marginBottom: 14, fontSize: 12 }}>
                # Run contact lookup script
              </div>

              {!started ? (
                <div>
                  <div style={{ color: "#1A1108", marginBottom: 16 }}>
                    <span style={{ color: "#C8860A" }}>vishal@dev</span>
                    <span style={{ color: "#6B5B3E" }}>:~$ </span>
                    <span>./contact_info.sh</span>
                  </div>
                  <button
                    onClick={() => setStarted(true)}
                    data-hover
                    style={{
                      background: "transparent",
                      border: "1px solid #C8860A",
                      color: "#C8860A", padding: "8px 20px",
                      fontFamily: "'DM Mono', monospace", fontSize: 12,
                      letterSpacing: 2,
                    }}
                  >
                    ▶ RUN SCRIPT
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{ color: "#1A1108", marginBottom: 16 }}>
                    <span style={{ color: "#C8860A" }}>vishal@dev</span>
                    <span style={{ color: "#6B5B3E" }}>:~$ </span>
                    <span>./contact_info.sh</span>
                  </div>
                  <div style={{ color: "#8B3A1C", marginBottom: 14, fontSize: 12 }}>
                    Fetching developer contact details...
                  </div>
                  {commands.map((line, i) => (
                    <TerminalLine key={i} line={line} delay={i * 400 + 300} />
                  ))}
                  <div ref={bottomRef} />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};
