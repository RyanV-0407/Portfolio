import { useEffect, useRef, useState } from "react";

export const CustomCursor = ({ isDark = false }) => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const ring2Ref = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const ring2 = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
        setIsTouch(true);
      }
    };
    checkTouch();

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
    const animate = () => {
      // Inner ring — faster follow
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;
      // Outer ring — slower, laggy follow
      ring2.current.x += (mouse.current.x - ring2.current.x) * 0.07;
      ring2.current.y += (mouse.current.y - ring2.current.y) * 0.07;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 5}px, ${mouse.current.y - 5}px)`;
      }
      if (ringRef.current) {
        const s1 = isHovering ? 1.5 : 1;
        ringRef.current.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px) scale(${s1})`;
      }
      if (ring2Ref.current) {
        const s2 = isHovering ? 1.3 : 1;
        ring2Ref.current.style.transform = `translate(${ring2.current.x - 28}px, ${ring2.current.y - 28}px) scale(${s2})`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      cancelAnimationFrame(raf);
    };
  }, [isHovering]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#C8860A",
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: isDark ? "normal" : "multiply",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.2px solid rgba(200,134,10,0.45)",
          pointerEvents: "none",
          zIndex: 99998,
          mixBlendMode: isDark ? "normal" : "multiply",
          transition: "transform 0.12s ease-out",
        }}
      />
      <div
        ref={ring2Ref}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: "1px solid rgba(200,134,10,0.2)",
          pointerEvents: "none",
          zIndex: 99997,
          mixBlendMode: isDark ? "normal" : "multiply",
          transition: "transform 0.15s ease-out",
        }}
      />
    </>
  );
};
