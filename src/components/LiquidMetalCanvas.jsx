import { useEffect, useRef, useState } from "react";

export const LiquidMetalCanvas = ({ theme }) => {
  const canvasRef = useRef(null);
  const cursorRingRef = useRef(null);
  const cursorDotRef = useRef(null);
  const animFrameRef = useRef(null);
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2, dx: 0, dy: 0 });
  const lastMoveRef = useRef(Date.now());
  const streaksRef = useRef([]);
  const sparksRef = useRef([]);
  const ambientRef = useRef([]);
  const [cursorSpeed, setCursorSpeed] = useState(0);

  // Mouse tracking for custom cursor div
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    if (theme !== "dark") {
      // Cleanup
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      document.body.style.cursor = "";
      streaksRef.current = [];
      sparksRef.current = [];
      ambientRef.current = [];
      return;
    }

    // Dark mode — initialize
    document.body.style.cursor = "none";
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize ambient streaks
    const createAmbientStreak = () => {
      const edge = Math.floor(Math.random() * 4);
      let x, y, vx, vy;
      const speed = 0.3 + Math.random() * 0.5;
      switch (edge) {
        case 0: // top
          x = Math.random() * canvas.width;
          y = -20;
          vx = (Math.random() - 0.5) * speed;
          vy = speed;
          break;
        case 1: // right
          x = canvas.width + 20;
          y = Math.random() * canvas.height;
          vx = -speed;
          vy = (Math.random() - 0.5) * speed;
          break;
        case 2: // bottom
          x = Math.random() * canvas.width;
          y = canvas.height + 20;
          vx = (Math.random() - 0.5) * speed;
          vy = -speed;
          break;
        default: // left
          x = -20;
          y = Math.random() * canvas.height;
          vx = speed;
          vy = (Math.random() - 0.5) * speed;
          break;
      }
      return {
        x, y, vx, vy,
        life: 0.35,
        decay: 0.0005,
        length: 40 + Math.random() * 30,
        curl: (Math.random() - 0.5) * 0.005,
        isAmbient: true,
      };
    };

    ambientRef.current = Array.from({ length: 4 }, createAmbientStreak);

    // Mouse handler
    const handleMouseMove = (e) => {
      const prev = mouseRef.current;
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      mouseRef.current = { x: e.clientX, y: e.clientY, dx, dy };
      lastMoveRef.current = Date.now();
      setCursorPos({ x: e.clientX, y: e.clientY });

      const speed = Math.sqrt(dx * dx + dy * dy);
      setCursorSpeed(speed);

      // Spawn streaks
      const count = speed > 8 ? Math.min(4, Math.floor(speed / 4)) : 1;
      for (let i = 0; i < count; i++) {
        streaksRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 4,
          y: e.clientY + (Math.random() - 0.5) * 4,
          vx: dx * 0.6 + (Math.random() - 0.5) * 2,
          vy: dy * 0.6 + (Math.random() - 0.5) * 2,
          life: 1.0,
          decay: 0.012 + Math.random() * 0.01,
          length: 18 + Math.min(42, speed * 1.5),
          curl: (Math.random() - 0.5) * 0.03,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(8,8,8,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "lighter";

      const now = Date.now();
      const isIdle = now - lastMoveRef.current > 2000;

      // --- Draw streaks ---
      const streaks = streaksRef.current;
      for (let i = streaks.length - 1; i >= 0; i--) {
        const s = streaks[i];

        // Apply curl
        const angle = Math.atan2(s.vy, s.vx) + s.curl;
        const mag = Math.sqrt(s.vx * s.vx + s.vy * s.vy) * 0.94;
        s.vx = Math.cos(angle) * mag;
        s.vy = Math.sin(angle) * mag - 0.12;

        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;

        if (s.life <= 0) {
          streaks.splice(i, 1);
          continue;
        }

        // Draw streak line with gradient
        const tailX = s.x - (s.vx / (mag || 1)) * s.length * s.life;
        const tailY = s.y - (s.vy / (mag || 1)) * s.length * s.life;

        const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        if (s.life > 0.7) {
          gradient.addColorStop(0, `rgba(180,100,20,0)`);
          gradient.addColorStop(0.5, `rgba(255,200,80,${s.life * 0.8})`);
          gradient.addColorStop(1, `rgba(255,255,255,${s.life})`);
        } else {
          gradient.addColorStop(0, `rgba(180,100,20,0)`);
          gradient.addColorStop(0.6, `rgba(255,200,80,${s.life * 0.8})`);
          gradient.addColorStop(1, `rgba(255,220,120,${s.life * 0.9})`);
        }

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5 + s.life * 1.5;
        ctx.stroke();
      }

      // --- Draw sparks ---
      const sparks = sparksRef.current;
      if (Math.random() < 0.15 && !isIdle) {
        const m = mouseRef.current;
        sparks.push({
          x: m.x + (Math.random() - 0.5) * 6,
          y: m.y + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          life: 1.0,
          decay: 0.035,
          r: 1 + Math.random(),
        });
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.vy += 0.08;
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.life -= sp.decay;

        if (sp.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,220,120,${sp.life * 0.9})`;
        ctx.fill();
      }

      // --- Ambient streaks (idle) ---
      if (isIdle) {
        const ambient = ambientRef.current;
        for (let i = 0; i < ambient.length; i++) {
          const a = ambient[i];
          const aAngle = Math.atan2(a.vy, a.vx) + a.curl;
          const aMag = Math.sqrt(a.vx * a.vx + a.vy * a.vy);
          a.vx = Math.cos(aAngle) * aMag;
          a.vy = Math.sin(aAngle) * aMag;
          a.x += a.vx;
          a.y += a.vy;

          // Re-spawn if out of screen
          if (a.x < -50 || a.x > canvas.width + 50 || a.y < -50 || a.y > canvas.height + 50) {
            ambient[i] = createAmbientStreak();
            continue;
          }

          const atX = a.x - (a.vx / (aMag || 1)) * a.length;
          const atY = a.y - (a.vy / (aMag || 1)) * a.length;
          const aGrad = ctx.createLinearGradient(atX, atY, a.x, a.y);
          aGrad.addColorStop(0, `rgba(180,100,20,0)`);
          aGrad.addColorStop(0.5, `rgba(255,200,80,${a.life * 0.6})`);
          aGrad.addColorStop(1, `rgba(255,255,255,${a.life * 0.7})`);

          ctx.beginPath();
          ctx.moveTo(atX, atY);
          ctx.lineTo(a.x, a.y);
          ctx.strokeStyle = aGrad;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      ctx.globalCompositeOperation = "source-over";

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "";
      if (canvas) {
        const c = canvas.getContext("2d");
        c.clearRect(0, 0, canvas.width, canvas.height);
      }
      streaksRef.current = [];
      sparksRef.current = [];
    };
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <>
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          display: isDark ? "block" : "none",
        }}
      />

      {/* Custom cursor ring */}
      {isDark && (
        <>
          <div
            ref={cursorRingRef}
            style={{
              position: "fixed",
              left: cursorPos.x,
              top: cursorPos.y,
              width: cursorSpeed > 6 ? 38 : 28,
              height: cursorSpeed > 6 ? 38 : 28,
              border: "1.5px solid rgba(255,200,80,0.8)",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 99998,
              transition: "width 0.12s ease, height 0.12s ease",
              boxSizing: "border-box",
            }}
          />
          {/* Center dot */}
          <div
            ref={cursorDotRef}
            style={{
              position: "fixed",
              left: cursorPos.x,
              top: cursorPos.y,
              width: 4,
              height: 4,
              backgroundColor: "#fff",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 99999,
            }}
          />
        </>
      )}
    </>
  );
};
