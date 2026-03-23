import { useEffect, useRef, useState } from "react";

export const CustomCursor = ({ isDark = false }) => {
  const coreRef = useRef(null);
  const haloRef = useRef(null);
  const auraRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const soft = useRef({ x: 0, y: 0 });
  const trail = useRef({ x: 0, y: 0 });

  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const handleMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleOver = (e) => {
      const target = e.target;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-hover]") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      ) {
        setIsHovering(true);
      }
    };

    const handleOut = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    let raf;
    let spin = 0;

    const animate = () => {
      spin += 0.02;
      soft.current.x += (mouse.current.x - soft.current.x) * 0.18;
      soft.current.y += (mouse.current.y - soft.current.y) * 0.18;
      trail.current.x += (mouse.current.x - trail.current.x) * 0.08;
      trail.current.y += (mouse.current.y - trail.current.y) * 0.08;

      if (coreRef.current) {
        const size = isHovering ? 11 : 9;
        coreRef.current.style.width = `${size}px`;
        coreRef.current.style.height = `${size}px`;
        coreRef.current.style.transform = `translate(${mouse.current.x - size / 2}px, ${mouse.current.y - size / 2}px) rotate(45deg)`;
      }

      if (haloRef.current) {
        const haloSize = isHovering ? 42 : 34;
        haloRef.current.style.width = `${haloSize}px`;
        haloRef.current.style.height = `${haloSize}px`;
        haloRef.current.style.transform = `translate(${soft.current.x - haloSize / 2}px, ${soft.current.y - haloSize / 2}px) rotate(${spin}rad)`;
      }

      if (auraRef.current) {
        const auraSize = isHovering ? 70 : 58;
        auraRef.current.style.width = `${auraSize}px`;
        auraRef.current.style.height = `${auraSize}px`;
        auraRef.current.style.transform = `translate(${trail.current.x - auraSize / 2}px, ${trail.current.y - auraSize / 2}px)`;
      }

      raf = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [isHovering]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={auraRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 58,
          height: 58,
          borderRadius: "999px",
          background: "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 25%, transparent) 0%, transparent 68%)",
          pointerEvents: "none",
          zIndex: 99997,
          transition: "width 0.15s ease, height 0.15s ease",
          mixBlendMode: isDark ? "screen" : "multiply",
        }}
      />

      <div
        ref={haloRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 34,
          height: 34,
          borderRadius: "10px",
          border: "1.2px solid color-mix(in srgb, var(--color-primary) 50%, transparent)",
          boxShadow: "0 0 0 1px color-mix(in srgb, var(--color-accent) 20%, transparent)",
          pointerEvents: "none",
          zIndex: 99998,
          transition: "width 0.15s ease, height 0.15s ease",
          mixBlendMode: isDark ? "screen" : "multiply",
        }}
      />

      <div
        ref={coreRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 9,
          height: 9,
          borderRadius: "2px",
          backgroundColor: "var(--color-primary)",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "width 0.12s ease, height 0.12s ease",
          mixBlendMode: isDark ? "screen" : "multiply",
        }}
      />
    </>
  );
};
