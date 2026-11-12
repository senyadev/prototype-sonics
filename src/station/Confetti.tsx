import { useEffect, useRef } from "react";

const COLORS = ["#FF682C", "#FF8656", "#FFB38F", "#FFD9C7", "#B9B9B9"];
const COUNT = 160;
const DURATION = 3800;

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  angle: number;
  spin: number;
  tilt: number;
  color: string;
};

/** Одноразовый залп конфетти из нижних углов экрана. Без зависимостей. */
export default function Confetti() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Скорость залпа масштабируется по высоте экрана, чтобы на телефоне
    // конфетти не улетало за верх, а на десктопе долетало до середины.
    const power = Math.sqrt(height) * 0.95;
    const pieces: Piece[] = Array.from({ length: COUNT }, (_, i) => {
      const fromLeft = i % 2 === 0;
      const spread = (Math.random() - 0.5) * 0.6;
      const angle = (fromLeft ? -Math.PI / 3 : (-2 * Math.PI) / 3) + spread;
      const speed = power * (0.6 + Math.random() * 0.5);
      return {
        x: fromLeft ? -10 : width + 10,
        y: height * 0.85,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        w: 6 + Math.random() * 6,
        h: 4 + Math.random() * 4,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.3,
        tilt: Math.random() * Math.PI * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    });

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      ctx.clearRect(0, 0, width, height);
      const fade = Math.min(1, Math.max(0, (DURATION - elapsed) / 800));
      ctx.globalAlpha = fade;
      for (const p of pieces) {
        p.vx *= 0.985;
        p.vy = p.vy * 0.985 + 0.35;
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;
        p.tilt += 0.1;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.scale(1, Math.cos(p.tilt));
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (elapsed < DURATION) frame = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, width, height);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="station-confetti" aria-hidden="true" />;
}
