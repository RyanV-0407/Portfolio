import { Moon, Sun } from "lucide-react";

export const ThemeToggle = ({ theme, onToggle }) => {
  const isDark = theme === "dark";

  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      data-hover
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9999,
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: isDark
          ? "1.5px solid color-mix(in srgb, var(--color-primary) 72%, transparent)"
          : "1.5px solid color-mix(in srgb, var(--color-border) 90%, var(--color-primary) 10%)",
        background: isDark
          ? "color-mix(in srgb, var(--color-surface) 82%, transparent)"
          : "color-mix(in srgb, var(--color-background) 76%, var(--color-secondary) 24%)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: isDark ? "none" : "none",
        transition: "all 0.3s ease",
        boxShadow: isDark
          ? "0 0 24px color-mix(in srgb, var(--color-primary) 38%, transparent)"
          : "0 8px 22px color-mix(in srgb, var(--color-accent) 22%, transparent)",
      }}
    >
      {isDark ? (
        <Sun size={18} color="var(--color-primary)" strokeWidth={2} />
      ) : (
        <Moon size={18} color="var(--color-ink)" strokeWidth={2} />
      )}
    </button>
  );
};
