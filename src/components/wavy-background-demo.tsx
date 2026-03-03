"use client";
import { WavyBackground } from "@/components/ui/wavy-background";

export default function WavyBackgroundDemo() {
  return (
    <WavyBackground
      className="max-w-4xl mx-auto pb-40"
      containerClassName="h-screen w-full"
      colors={["#a78bfa", "#8b5cf6", "#6366f1", "#818cf8"]}
      blur={8}
      waveOpacity={0.55}
      speed="slow"
    >
      <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold text-center">
        Hero waves are cool
      </p>
      <p className="text-base md:text-lg mt-4 text-white font-normal text-center">
        Leverage the power of canvas to create a beautiful hero section
      </p>
    </WavyBackground>
  );
}
