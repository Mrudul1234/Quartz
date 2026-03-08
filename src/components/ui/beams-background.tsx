import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BeamsBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: "subtle" | "medium" | "strong";
}

interface Beam {
  x: number; y: number; width: number; length: number;
  angle: number; speed: number; opacity: number;
  hue: number; pulse: number; pulseSpeed: number;
}

function createBeam(w: number, h: number): Beam {
  return {
    x: Math.random() * w * 1.5 - w * 0.25,
    y: Math.random() * h * 1.5 - h * 0.25,
    width: 30 + Math.random() * 60,
    length: h * 2.5,
    angle: -35 + Math.random() * 10,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.12 + Math.random() * 0.16,
    hue: 190 + Math.random() * 70,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  };
}

export function BeamsBackground({ className, children, intensity = "medium" }: BeamsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const frameRef = useRef<number>(0);
  const opMap = { subtle: 0.7, medium: 0.85, strong: 1 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      beamsRef.current = Array.from({ length: 30 }, () => createBeam(canvas.width, canvas.height));
    };
    resize();
    window.addEventListener("resize", resize);

    function resetBeam(beam: Beam, i: number, total: number) {
      if (!canvas) return beam;
      const col = i % 3;
      const sp = canvas.width / 3;
      beam.y = canvas.height + 100;
      beam.x = col * sp + sp / 2 + (Math.random() - 0.5) * sp * 0.5;
      beam.width = 100 + Math.random() * 100;
      beam.speed = 0.5 + Math.random() * 0.4;
      beam.hue = 190 + (i * 70) / total;
      beam.opacity = 0.2 + Math.random() * 0.1;
      return beam;
    }

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = "blur(35px)";
      const total = beamsRef.current.length;
      beamsRef.current.forEach((b, i) => {
        b.y -= b.speed;
        b.pulse += b.pulseSpeed;
        if (b.y + b.length < -100) resetBeam(b, i, total);
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate((b.angle * Math.PI) / 180);
        const op = b.opacity * (0.8 + Math.sin(b.pulse) * 0.2) * opMap[intensity];
        const g = ctx.createLinearGradient(0, 0, 0, b.length);
        g.addColorStop(0, `hsla(${b.hue},85%,65%,0)`);
        g.addColorStop(0.1, `hsla(${b.hue},85%,65%,${op * 0.5})`);
        g.addColorStop(0.4, `hsla(${b.hue},85%,65%,${op})`);
        g.addColorStop(0.6, `hsla(${b.hue},85%,65%,${op})`);
        g.addColorStop(0.9, `hsla(${b.hue},85%,65%,${op * 0.5})`);
        g.addColorStop(1, `hsla(${b.hue},85%,65%,0)`);
        ctx.fillStyle = g;
        ctx.fillRect(-b.width / 2, 0, b.width, b.length);
        ctx.restore();
      });
      frameRef.current = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [intensity]);

  return (
    <div className={cn("relative min-h-screen w-full overflow-hidden", className)} style={{ backgroundColor: '#0e0e0e' }}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ filter: "blur(15px)" }} />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: 'rgba(14,14,14,0.05)', backdropFilter: "blur(50px)" }}
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
      />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
