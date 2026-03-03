"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth = 50,
  backgroundFill = "transparent",
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: unknown;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const noiseRef = useRef(createNoise3D());
  const colorsRef = useRef(colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ]);
  colorsRef.current = colors ?? colorsRef.current;

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getSpeed = () => (speed === "fast" ? 0.002 : 0.001);
    let nt = 0;
    let animationId: number;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = Math.max(rect.width, 300);
      canvas.height = Math.max(rect.height, 200);
      if (blur > 0) ctx.filter = `blur(${blur}px)`;
    };

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      nt += getSpeed();

      ctx.fillStyle = backgroundFill || "transparent";
      ctx.globalAlpha = waveOpacity;
      ctx.fillRect(0, 0, w, h);

      const noise = noiseRef.current;
      const waveColors = colorsRef.current;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        for (let x = 0; x < w; x += 5) {
          const y = noise(x / 800, 0.3 * i, nt) * 100;
          ctx.lineTo(x, y + h * 0.5);
        }
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    render();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [blur, backgroundFill, speed, waveOpacity, waveWidth]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full flex flex-col items-center justify-center overflow-hidden",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0 w-full h-full"
        ref={canvasRef}
        style={{
          ...(isSafari && blur > 0 ? { filter: `blur(${blur}px)` } : {}),
        }}
      />
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
