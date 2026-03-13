import { useEffect, useRef } from "react";

/* ── Config ─────────────────────────────────────────────────── */
const LAYERS = [
  { count: 60, speed: 0.08, parallax: 0.01, radius: [0.8, 1.4], connect: 70, opacity: 0.18 },
  { count: 45, speed: 0.14, parallax: 0.025, radius: [1.2, 2.0], connect: 90, opacity: 0.28 },
  { count: 30, speed: 0.22, parallax: 0.05, radius: [1.8, 3.0], connect: 110, opacity: 0.38 },
  { count: 18, speed: 0.35, parallax: 0.09, radius: [2.8, 4.5], connect: 140, opacity: 0.52 },
];

const BG = "#faf6ee";
const AMBER = [185, 145, 72];
const CORE_COLOR = "rgba(255,245,220,0.9)";

/* ── Component ──────────────────────────────────────────────── */
export const ParallaxConstellation = () => {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    /* --- state --- */
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const smoothMouse = { x: mouse.x, y: mouse.y };
    let layers = [];
    let bursts = [];
    let shootingStars = [];
    let raf;
    let lastShootingStar = 0;

    /* --- helpers --- */
    const lerp = (a, b, t) => a + (b - a) * t;

    const createParticle = (cfg, w, h) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * cfg.speed,
      vy: (Math.random() - 0.5) * cfg.speed,
      r: cfg.radius[0] + Math.random() * (cfg.radius[1] - cfg.radius[0]),
      twinkleSpeed: 0.008 + Math.random() * 0.02,
      twinklePhase: Math.random() * Math.PI * 2,
      hexTimer: 0,
      hexCooldown: 300 + Math.random() * 600,
    });

    const buildLayers = () => {
      const w = canvas.width;
      const h = canvas.height;
      layers = LAYERS.map((cfg) => ({
        cfg,
        particles: Array.from({ length: cfg.count }, () => createParticle(cfg, w, h)),
      }));
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildLayers();
    };
    resize();
    window.addEventListener("resize", resize);

    /* --- events --- */
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleClick = (e) => {
      bursts.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.max(canvas.width, canvas.height) * 0.6,
        speed: 6,
        life: 1.0,
      });
    };
    window.addEventListener("click", handleClick);

    /* --- draw loop --- */
    let frame = 0;

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      frame++;

      // smooth mouse
      smoothMouse.x = lerp(smoothMouse.x, mouse.x, 0.06);
      smoothMouse.y = lerp(smoothMouse.y, mouse.y, 0.06);
      const cx = w / 2;
      const cy = h / 2;
      const mdx = smoothMouse.x - cx;
      const mdy = smoothMouse.y - cy;

      // clear
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, w, h);

      // update bursts
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.radius += b.speed;
        b.life = 1 - b.radius / b.maxRadius;
        if (b.life <= 0) { bursts.splice(i, 1); }
      }

      // shooting stars
      const now = Date.now();
      if (now - lastShootingStar > 4000 + Math.random() * 6000) {
        lastShootingStar = now;
        const startX = Math.random() * w * 0.8;
        const angle = 0.3 + Math.random() * 0.5;
        shootingStars.push({
          x: startX, y: -10,
          vx: Math.cos(angle) * 3.5,
          vy: Math.sin(angle) * 3.5,
          life: 1.0,
          len: 40 + Math.random() * 50,
        });
      }

      // draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.008;
        if (s.life <= 0 || s.y > h * 0.5) {
          shootingStars.splice(i, 1);
          continue;
        }
        const tailX = s.x - (s.vx / Math.sqrt(s.vx * s.vx + s.vy * s.vy)) * s.len;
        const tailY = s.y - (s.vy / Math.sqrt(s.vx * s.vx + s.vy * s.vy)) * s.len;
        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, `rgba(${AMBER[0]},${AMBER[1]},${AMBER[2]},0)`);
        grad.addColorStop(1, `rgba(${AMBER[0]},${AMBER[1]},${AMBER[2]},${s.life * 0.35})`);
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // draw layers
      for (let li = 0; li < layers.length; li++) {
        const { cfg, particles } = layers[li];
        const px = mdx * cfg.parallax;
        const py = mdy * cfg.parallax;
        const isNear = li >= 2;

        // update & draw particles
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          // wrap
          if (p.x < -20) p.x = w + 20;
          if (p.x > w + 20) p.x = -20;
          if (p.y < -20) p.y = h + 20;
          if (p.y > h + 20) p.y = -20;

          // twinkle
          const twinkle = 0.5 + 0.5 * Math.sin(frame * p.twinkleSpeed + p.twinklePhase);
          const alpha = cfg.opacity * (0.5 + twinkle * 0.5);

          const dx = p.x + px;
          const dy = p.y + py;

          // burst brightening
          let burstBoost = 0;
          for (const b of bursts) {
            const bd = Math.sqrt((dx - b.x) ** 2 + (dy - b.y) ** 2);
            const ringDist = Math.abs(bd - b.radius);
            if (ringDist < 60) {
              burstBoost = Math.max(burstBoost, (1 - ringDist / 60) * b.life * 0.6);
            }
          }

          // hex flash (near layers only)
          if (isNear && p.r > 3) {
            p.hexTimer++;
            if (p.hexTimer > p.hexCooldown) {
              p.hexTimer = 0;
              p.hexCooldown = 300 + Math.random() * 600;
              // draw hex
              ctx.beginPath();
              for (let hi = 0; hi < 6; hi++) {
                const ha = (Math.PI / 3) * hi - Math.PI / 6;
                const hx = dx + Math.cos(ha) * (p.r * 4);
                const hy = dy + Math.sin(ha) * (p.r * 4);
                if (hi === 0) ctx.moveTo(hx, hy); else ctx.lineTo(hx, hy);
              }
              ctx.closePath();
              ctx.strokeStyle = `rgba(${AMBER[0]},${AMBER[1]},${AMBER[2]},0.15)`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }

          // main particle
          ctx.beginPath();
          ctx.arc(dx, dy, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${AMBER[0]},${AMBER[1]},${AMBER[2]},${Math.min(1, alpha + burstBoost)})`;
          ctx.fill();

          // glow core (near layers)
          if (isNear && p.r > 2) {
            ctx.beginPath();
            ctx.arc(dx, dy, p.r * 0.35, 0, Math.PI * 2);
            ctx.fillStyle = CORE_COLOR;
            ctx.fill();
          }
        }

        // draw connections within this layer
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const ddx = (a.x + px) - (b.x + px);
            const ddy = (a.y + py) - (b.y + py);
            const dist = Math.sqrt(ddx * ddx + ddy * ddy);
            if (dist < cfg.connect) {
              const t = 1 - dist / cfg.connect;
              const quad = t * t;

              // burst boost on connections
              const midX = (a.x + b.x) / 2 + px;
              const midY = (a.y + b.y) / 2 + py;
              let connBurst = 0;
              for (const br of bursts) {
                const bd = Math.sqrt((midX - br.x) ** 2 + (midY - br.y) ** 2);
                const ringDist = Math.abs(bd - br.radius);
                if (ringDist < 80) {
                  connBurst = Math.max(connBurst, (1 - ringDist / 80) * br.life * 0.5);
                }
              }

              ctx.beginPath();
              ctx.moveTo(a.x + px, a.y + py);
              ctx.lineTo(b.x + px, b.y + py);
              ctx.strokeStyle = `rgba(${AMBER[0]},${AMBER[1]},${AMBER[2]},${Math.min(0.5, quad * cfg.opacity * 0.8 + connBurst)})`;
              ctx.lineWidth = 0.4 + quad * 2;
              ctx.stroke();
            }
          }
        }
      }

      // draw burst rings
      for (const b of bursts) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${AMBER[0]},${AMBER[1]},${AMBER[2]},${b.life * 0.2})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      raf = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
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
