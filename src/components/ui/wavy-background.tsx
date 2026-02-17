"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, useCallback } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 0,
  speed = "slow",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = useRef(createNoise3D()).current;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const ntRef = useRef(0);

  const getSpeed = useCallback(() => {
    return speed === "fast" ? 0.002 : 0.001;
  }, [speed]);

  const waveColors = colors ?? [
    "rgba(139, 92, 246, 0.4)",
    "rgba(168, 85, 247, 0.35)",
    "rgba(192, 132, 252, 0.3)",
    "rgba(99, 102, 241, 0.25)",
    "rgba(139, 92, 246, 0.2)",
  ];

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = ctx.canvas.width = canvas.offsetWidth;
    const h = ctx.canvas.height = canvas.offsetHeight;
    if (blur > 0) ctx.filter = `blur(${blur}px)`;
    ntRef.current = 0;

    const render = () => {
      ctx.fillStyle = backgroundFill || "transparent";
      ctx.globalAlpha = waveOpacity;
      ctx.fillRect(0, 0, w, h);

      ntRef.current += getSpeed();
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth || 50;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        for (let x = 0; x < w; x += 5) {
          const y = noise(x / 800, 0.3 * i, ntRef.current) * 100;
          ctx.lineTo(x, y + h * 0.5);
        }
        ctx.stroke();
        ctx.closePath();
      }
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();
  }, [blur, backgroundFill, waveOpacity, waveWidth, waveColors, getSpeed, noise]);

  useEffect(() => {
    init();
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.canvas.width = canvas.offsetWidth;
      ctx.canvas.height = canvas.offsetHeight;
      if (blur > 0) ctx.filter = `blur(${blur}px)`;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [init, blur]);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div className={cn("relative w-full h-full", containerClassName)}>
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
