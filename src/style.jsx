import { useEffect, useRef } from "react";

const BACKGROUND_COLOR = "#1c1c22";

export default function StarsBG({
  density = 0.0016,
  speed = 0.35,
  twinkle = true,
}) {
  const ref = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const mediaReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let w = 0, h = 0, dpr = 1, stars = [];

    function setCanvasSize() {
      w = window.innerWidth;
      h = window.innerHeight;

      dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initStars();
    }

    function initStars() {
      const count = Math.floor(w * h * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.3,
        a: Math.random() * 0.6 + 0.4,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        tw: Math.random() * Math.PI * 2,
      }));
    }

    function step(t) {

      ctx.fillStyle = BACKGROUND_COLOR;
      ctx.fillRect(0, 0, w, h);

      for (let s of stars) {
        s.x += s.vx; s.y += s.vy;

        if (s.x < -2) s.x = w + 2;
        if (s.x > w + 2) s.x = -2;
        if (s.y < -2) s.y = h + 2;
        if (s.y > h + 2) s.y = -2;

        let alpha = s.a;
        if (twinkle && !mediaReduce.matches) {
          alpha *= 0.75 + 0.25 * Math.sin(s.tw + t * 0.002);
        }

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(step);
    }

    setCanvasSize();
    rafRef.current = requestAnimationFrame(step);
    const onResize = () => setCanvasSize();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [density, speed, twinkle]);

  return (
    <canvas
      ref={ref}
      // styles inline pour s'afficher même sans Tailwind
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        background: BACKGROUND_COLOR,
        display: "block",
      }}
      aria-hidden="true"
    />
  );
}
