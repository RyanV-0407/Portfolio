import { useEffect, useState } from "react";

export const LoadingScreen = ({ onComplete }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fading out after 2.2 seconds (allowing ~2s for main animations)
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2200);

    // Call onComplete and unmount after fade completes (0.8s fade duration)
    const mountTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(mountTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-700 pointer-events-none ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
      style={{
        backgroundColor: "var(--color-ink)",
        color: "var(--color-background)",
      }}
    >
      <div className="relative mb-8 w-24 h-24 sm:w-32 sm:h-32 flex justify-center items-center">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          stroke="var(--color-background)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* V */}
          <path
            d="M 25 30 L 45 75 L 60 30"
            strokeDasharray="150"
            strokeDashoffset="150"
            style={{
              animation: "dash 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.2s",
            }}
          />
          {/* S */}
          <path
            d="M 80 35 C 80 20, 55 20, 55 35 C 55 55, 80 50, 80 70 C 80 85, 45 85, 45 65"
            strokeDasharray="200"
            strokeDashoffset="200"
            style={{
              animation: "dash 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.6s",
            }}
          />
        </svg>
      </div>

      <div
        className="font-mono text-xs sm:text-sm tracking-[0.2em] text-center uppercase opacity-0"
        style={{
          animation: "fadeIn 1s ease-out forwards 1.2s",
        }}
      >
        Vikram Singh Rathour &mdash; AI/ML Developer
      </div>

      {/* Progress Bar Container */}
      <div className="absolute bottom-12 sm:bottom-20 w-48 sm:w-64 h-[2px] bg-white/10 overflow-hidden">
        {/* Progress Fill */}
        <div
          className="h-full w-full"
          style={{
            background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
            transformOrigin: "left",
            transform: "scaleX(0)",
            animation: "fillProgress 2s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.2s",
          }}
        />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fillProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}} />
    </div>
  );
};
