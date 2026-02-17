"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useCallback } from "react";
import { createNoise3D } from "simplex-noise";
import { motion } from "framer-motion";

interface VortexProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
}

export const Vortex = (props: VortexProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);

  const particleCount = props.particleCount || 300;
  const particlePropCount = 9;
  const particlePropsLength = particleCount * particlePropCount;
  const rangeY = props.rangeY || 300;
  const baseTTL = 80;
  const rangeTTL = 200;
  const baseSpeed = props.baseSpeed || 0.02;
  const rangeSpeed = props.rangeSpeed || 0.8;
  const baseRadius = props.baseRadius || 1.5;
  const rangeRadius = props.rangeRadius || 2.5;
  const baseHue = props.baseHue || 260;
  const rangeHue = 80;
  const noiseSteps = 4;
  const xOff = 0.00125;
  const yOff = 0.00125;
  const zOff = 0.0006;
  const backgroundColor = props.backgroundColor || "transparent";

  const tick = useRef(0);
  const noise3D = useRef(createNoise3D());
  const particleProps = useRef(new Float32Array(particlePropsLength));
  const center = useRef<[number, number]>([0, 0]);

  const TAU: number = 2 * Math.PI;
  const rand = (n: number): number => n * Math.random();
  const randRange = (n: number): number => n - rand(2 * n);
  const fadeInOut = (t: number, m: number): number => {
    const hm = 0.5 * m;
    return Math.abs(((t + hm) % m) - hm) / hm;
  };
  const lerp = (n1: number, n2: number, speed: number): number =>
    (1 - speed) * n1 + speed * n2;

  const initParticle = useCallback((i: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const x = rand(canvas.width);
    const y = center.current[1] + randRange(rangeY);
    particleProps.current.set(
      [x, y, 0, 0, 0, baseTTL + rand(rangeTTL), baseSpeed + rand(rangeSpeed), baseRadius + rand(rangeRadius), baseHue + rand(rangeHue)],
      i
    );
  }, [rangeY, baseTTL, rangeTTL, baseSpeed, rangeSpeed, baseRadius, rangeRadius, baseHue, rangeHue]);

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        resize(canvas);
        tick.current = 0;
        particleProps.current = new Float32Array(particlePropsLength);
        for (let i = 0; i < particlePropsLength; i += particlePropCount) {
          initParticle(i);
        }
        draw(canvas, ctx);
      }
    }
  }, [initParticle, particlePropsLength]);

  const resize = (canvas: HTMLCanvasElement) => {
    const container = containerRef.current;
    if (!container) return;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    center.current = [0.5 * canvas.width, 0.5 * canvas.height];
  };

  const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    tick.current++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (backgroundColor !== "transparent") {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      const i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i, i6 = 5 + i, i7 = 6 + i, i8 = 7 + i, i9 = 8 + i;

      const n = noise3D.current(
        particleProps.current[i] * xOff,
        particleProps.current[i2] * yOff,
        tick.current * zOff
      ) * noiseSteps * TAU;

      const vx = lerp(particleProps.current[i3], Math.cos(n), 0.5);
      const vy = lerp(particleProps.current[i4], Math.sin(n), 0.5);
      const x = particleProps.current[i] + vx * particleProps.current[i7];
      const y = particleProps.current[i2] + vy * particleProps.current[i7];
      let life = particleProps.current[i5];
      const ttl = particleProps.current[i6];
      const radius = particleProps.current[i8];
      const hue = particleProps.current[i9];

      ctx.save();
      ctx.fillStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, TAU);
      ctx.fill();
      ctx.closePath();
      ctx.restore();

      life++;
      particleProps.current[i] = x;
      particleProps.current[i2] = y;
      particleProps.current[i3] = vx;
      particleProps.current[i4] = vy;
      particleProps.current[i5] = life;

      if (x > canvas.width || x < 0 || y > canvas.height || y < 0 || life > ttl) {
        initParticle(i);
      }
    }

    // Single glow pass — performant
    ctx.save();
    ctx.filter = "blur(8px) brightness(200%)";
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();

    animFrameRef.current = requestAnimationFrame(() => draw(canvas, ctx));
  };

  useEffect(() => {
    setup();
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) resize(canvas);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [setup]);

  return (
    <div className={cn("relative h-full w-full", props.containerClassName)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        ref={containerRef}
        className="absolute inset-0 z-0 flex items-center justify-center"
      >
        <canvas ref={canvasRef} className={cn("w-full h-full", props.className)} />
      </motion.div>
      <div className="relative z-10">{props.children}</div>
    </div>
  );
};

export default Vortex;
