import { useEffect, useRef } from "react";

const ORB_COUNT = 42;
const BG = "#edf6ff";
const PRIMARY = [14, 165, 162];
const ACCENT = [29, 78, 216];

const lerp = (a, b, t) => a + (b - a) * t;

export const ParallaxConstellation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const smooth = { ...mouse };
    let raf;
    let t = 0;

    const orbs = Array.from({ length: ORB_COUNT }, () => ({
      cx: Math.random(),
      cy: Math.random(),
      radius: 30 + Math.random() * 110,
      speed: 0.001 + Math.random() * 0.0022,
      angle: Math.random() * Math.PI * 2,
      size: 1 + Math.random() * 2.5,
      hueMix: Math.random(),
      glow: 0.18 + Math.random() * 0.35,
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawFlowBands = (w, h, mx, my) => {
      const bands = [
        { y: h * 0.2, amp: 26, width: 1.1, alpha: 0.11 },
        { y: h * 0.45, amp: 36, width: 1.4, alpha: 0.12 },
        { y: h * 0.72, amp: 22, width: 1.0, alpha: 0.1 },
      ];

      for (const b of bands) {
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, `rgba(${PRIMARY[0]}, ${PRIMARY[1]}, ${PRIMARY[2]}, ${b.alpha * 0.3})`);
        grad.addColorStop(0.5, `rgba(${ACCENT[0]}, ${ACCENT[1]}, ${ACCENT[2]}, ${b.alpha})`);
        grad.addColorStop(1, `rgba(${PRIMARY[0]}, ${PRIMARY[1]}, ${PRIMARY[2]}, ${b.alpha * 0.25})`);

        ctx.beginPath();
        for (let x = 0; x <= w; x += 6) {
          const n = Math.sin(x * 0.008 + t * 1.5) + Math.cos(x * 0.005 - t * 1.2);
          const y = b.y + n * b.amp + my * 0.02 + Math.sin(t + x * 0.002) * 8;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = grad;
        ctx.lineWidth = b.width;
        ctx.stroke();

        ctx.beginPath();
        for (let x = 0; x <= w; x += 12) {
          const y = b.y + Math.sin(x * 0.01 + t * 2.1) * (b.amp * 0.35) + mx * 0.008;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${PRIMARY[0]}, ${PRIMARY[1]}, ${PRIMARY[2]}, ${b.alpha * 0.45})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      t += 0.008;

      smooth.x = lerp(smooth.x, mouse.x, 0.06);
      smooth.y = lerp(smooth.y, mouse.y, 0.06);
      const mx = smooth.x - w / 2;
      const my = smooth.y - h / 2;

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, w, h);

      drawFlowBands(w, h, mx, my);

      for (const orb of orbs) {
        orb.angle += orb.speed;

        const ox = orb.cx * w + Math.cos(orb.angle) * orb.radius + mx * 0.015;
        const oy = orb.cy * h + Math.sin(orb.angle * 0.9) * (orb.radius * 0.65) + my * 0.015;

        const c = orb.hueMix > 0.5 ? PRIMARY : ACCENT;
        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.size * 8);
        g.addColorStop(0, `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${orb.glow})`);
        g.addColorStop(1, `rgba(${c[0]}, ${c[1]}, ${c[2]}, 0)`);

        ctx.beginPath();
        ctx.arc(ox, oy, orb.size * 8, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(ox, oy, orb.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, 0.42)`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const handleMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};
