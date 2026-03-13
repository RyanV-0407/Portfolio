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
        border: isDark ? "1.5px solid rgba(255,200,80,0.6)" : "1.5px solid var(--color-border)",
        background: isDark
          ? "rgba(20,18,14,0.85)"
          : "rgba(245,239,224,0.85)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: isDark ? "none" : "none",
        transition: "all 0.3s ease",
        boxShadow: isDark
          ? "0 0 20px rgba(255,200,80,0.15)"
          : "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      {isDark ? (
        <Sun size={18} color="#ffc850" strokeWidth={2} />
      ) : (
        <Moon size={18} color="#1A1108" strokeWidth={2} />
      )}
    </button>
  );
};
