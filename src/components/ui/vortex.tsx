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
  /** Intensity mode: 'subtle', 'medium', 'aggressive' */
  intensity?: 'subtle' | 'medium' | 'aggressive';
}

// Intensity presets for different effects
const intensityPresets = {
  subtle: { particles: 400, speed: 0.8, radius: 1.5, glow: 1 },
  medium: { particles: 800, speed: 1.2, radius: 2, glow: 1.5 },
  aggressive: { particles: 1200, speed: 1.8, radius: 2.5, glow: 2 },
};

export const Vortex = (props: VortexProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get intensity preset
  const preset = intensityPresets[props.intensity || 'medium'];
  
  const particleCount = props.particleCount || preset.particles;
  const particlePropCount = 9;
  const particlePropsLength = particleCount * particlePropCount;
  const rangeY = props.rangeY || 300;
  const baseTTL = 80;
  const rangeTTL = 200;
  const baseSpeed = props.baseSpeed || 0.02;
  const rangeSpeed = props.rangeSpeed || preset.speed;
  const baseRadius = props.baseRadius || preset.radius;
  const rangeRadius = props.rangeRadius || 3;
  const baseHue = props.baseHue || 260;
  const rangeHue = 80;
  const noiseSteps = 4;
  const xOff = 0.00125;
  const yOff = 0.00125;
  const zOff = 0.0006;
  const backgroundColor = props.backgroundColor || "#000000";

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

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        resize(canvas, ctx);
        initParticles();
        draw(canvas, ctx);
      }
    }
  }, []);

  const initParticles = () => {
    tick.current = 0;
    particleProps.current = new Float32Array(particlePropsLength);

    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i);
    }
  };

  const initParticle = (i: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const x = rand(canvas.width);
    const y = center.current[1] + randRange(rangeY);
    const vx = 0;
    const vy = 0;
    const life = 0;
    const ttl = baseTTL + rand(rangeTTL);
    const speed = baseSpeed + rand(rangeSpeed);
    const radius = baseRadius + rand(rangeRadius);
    const hue = baseHue + rand(rangeHue);

    particleProps.current.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
  };

  const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    tick.current++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawParticles(ctx);
    renderGlow(canvas, ctx);
    renderToScreen(canvas, ctx);

    requestAnimationFrame(() => draw(canvas, ctx));
  };

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      updateParticle(i, ctx);
    }
  };

  const updateParticle = (i: number, ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const i2 = 1 + i,
      i3 = 2 + i,
      i4 = 3 + i,
      i5 = 4 + i,
      i6 = 5 + i,
      i7 = 6 + i,
      i8 = 7 + i,
      i9 = 8 + i;

    const n = noise3D.current(
      particleProps.current[i] * xOff,
      particleProps.current[i2] * yOff,
      tick.current * zOff
    ) * noiseSteps * TAU;

    const vx = lerp(particleProps.current[i3], Math.cos(n), 0.5);
    const vy = lerp(particleProps.current[i4], Math.sin(n), 0.5);

    let x = particleProps.current[i] + vx * particleProps.current[i7];
    let y = particleProps.current[i2] + vy * particleProps.current[i7];
    let life = particleProps.current[i5];
    const ttl = particleProps.current[i6];
    const radius = particleProps.current[i8];
    const hue = particleProps.current[i9];

    drawParticle(x, y, life, ttl, radius, hue, ctx);

    life++;

    particleProps.current[i] = x;
    particleProps.current[i2] = y;
    particleProps.current[i3] = vx;
    particleProps.current[i4] = vy;
    particleProps.current[i5] = life;

    (checkBounds(x, y, canvas) || life > ttl) && initParticle(i);
  };

  const drawParticle = (
    x: number,
    y: number,
    life: number,
    ttl: number,
    radius: number,
    hue: number,
    ctx: CanvasRenderingContext2D
  ) => {
    ctx.save();
    ctx.fillStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, TAU);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  };

  const checkBounds = (x: number, y: number, canvas: HTMLCanvasElement) => {
    return x > canvas.width || x < 0 || y > canvas.height || y < 0;
  };

  const resize = (
    canvas: HTMLCanvasElement,
    _ctx: CanvasRenderingContext2D
  ) => {
    const { innerWidth, innerHeight } = window;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    center.current = [0.5 * canvas.width, 0.5 * canvas.height];
  };

  const renderGlow = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => {
    // First glow pass - large blur for ambient glow
    ctx.save();
    ctx.filter = `blur(${12 * preset.glow}px) brightness(250%)`;
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();

    // Second glow pass - medium blur for intensity
    ctx.save();
    ctx.filter = `blur(${6 * preset.glow}px) brightness(200%)`;
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
    
    // Third glow pass - tight blur for sharp cores
    ctx.save();
    ctx.filter = `blur(${2 * preset.glow}px) brightness(180%)`;
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  };

  const renderToScreen = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  };

  useEffect(() => {
    setup();
    const handleResize = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx) {
        resize(canvas, ctx);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setup]);

  return (
    <div className={cn("relative h-full w-full", props.containerClassName)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        ref={containerRef}
        className="absolute inset-0 z-0 bg-transparent flex items-center justify-center"
      >
        <canvas ref={canvasRef} className={cn("", props.className)}></canvas>
      </motion.div>

      <div className="relative z-10">{props.children}</div>
    </div>
  );
};

export default Vortex;
