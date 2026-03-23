import { useState } from "react";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  Github,
  Linkedin,
  MapPin,
  Briefcase,
  User,
  ArrowUpRight,
} from "lucide-react";
import { GhostButton } from "@/components/GhostButton";
import { StaggerReveal } from "@/components/StaggerReveal";
import emailjs from "@emailjs/browser";

const contactCards = [
  { label: "Name", value: "Vikram Singh Rathour", icon: User },
  { label: "Email", value: "vikramsingh3124k@gmail.com", href: "mailto:vikramsingh3124k@gmail.com", icon: Mail },
  { label: "Phone", value: "+91 8982706433", href: "tel:+918982706433", icon: Phone },
  { label: "GitHub", value: "github.com/RyanV-0407", href: "https://github.com/RyanV-0407", icon: Github },
  { label: "LinkedIn", value: "linkedin.com/in/vikram-singh-r0407/", href: "https://linkedin.com/in/vikram-singh-r0407/", icon: Linkedin },
  { label: "Location", value: "Phagwara, Punjab, India", icon: MapPin },
  { label: "Status", value: "Open to internships and collaborations", icon: Briefcase, highlight: true },
];

function ContactCard({ item, index }) {
  const Icon = item.icon;
  const content = (
    <div
      className="group border border-border bg-background/70 p-4 rounded-xl transition-all duration-300 hover:border-primary/55 hover:-translate-y-0.5"
      style={{ animation: "fadeInPanel 0.55s ease both", animationDelay: `${index * 90}ms` }}
    >
      <div className="flex items-start gap-3">
        <span className="w-9 h-9 rounded-lg border border-primary/30 bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Icon size={15} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[0.62rem] tracking-[0.16em] uppercase text-muted-foreground mb-1">{item.label}</p>
          <p className={`text-sm break-words ${item.highlight ? "text-rust font-semibold" : "text-ink"}`}>{item.value}</p>
        </div>
        {item.href && <ArrowUpRight size={15} className="text-muted-foreground group-hover:text-primary transition-colors" />}
      </div>
    </div>
  );

  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="block" data-hover>
        {content}
      </a>
    );
  }

  return content;
}

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: "" });

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

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        publicKey
      );

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
      <span className="watermark top-4 right-4 md:right-16">08</span>

      <div className="container mx-auto px-6 relative z-10">
        <StaggerReveal className="text-center max-w-3xl mx-auto mb-16 section-shell edge-clip p-7 md:p-9">
          <span className="section-label">Contact</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-ink">
            Let's build something <span className="font-serif italic font-normal text-rust">great together.</span>
          </h2>
          <p className="text-muted-foreground">
            Open to internship opportunities, collaborations, and machine learning projects. Share your idea and connect through any preferred channel.
          </p>
        </StaggerReveal>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="bg-card p-8 md:p-10 border border-border rounded-2xl edge-clip">
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
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-sans"
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
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-sans"
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
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none font-sans"
                />
              </div>

              <GhostButton className="w-full justify-center" size="lg" type="submit" disabled={isLoading}>
                {isLoading ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
              </GhostButton>

              {submitStatus.type && (
                <div
                  className="flex items-center gap-3 p-4 border rounded-xl"
                  style={{
                    background:
                      submitStatus.type === "success"
                        ? "color-mix(in srgb, var(--color-primary) 13%, transparent)"
                        : "color-mix(in srgb, var(--color-rust) 12%, transparent)",
                    borderColor:
                      submitStatus.type === "success"
                        ? "color-mix(in srgb, var(--color-primary) 35%, transparent)"
                        : "color-mix(in srgb, var(--color-rust) 35%, transparent)",
                    color: submitStatus.type === "success" ? "var(--color-primary)" : "var(--color-rust)",
                  }}
                >
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

          <div className="section-shell rounded-2xl p-7 md:p-8">
            <div className="relative z-10">
              <h3 className="text-xl font-bold font-serif text-ink mb-2">Quick Connect</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Direct contact channels, availability status, and preferred communication details.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {contactCards.map((item, idx) => (
                  <ContactCard key={item.label} item={item} index={idx} />
                ))}
              </div>

              <div className="mt-6 border border-border rounded-xl bg-background/70 p-4">
                <p className="font-mono text-[0.68rem] tracking-[0.16em] uppercase text-primary mb-2">Collaboration Note</p>
                <p className="text-sm text-muted-foreground">
                  Best channels are email and LinkedIn for internships, project discussions, and technical collaborations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInPanel {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};
