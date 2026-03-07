/**
 * Hero.tsx — GREATNESS pass
 * Changes:
 * - Removed "Used by teams at …" logo strip (no placeholders).
 * - Single CTA button only (booking).
 * - CTA label keeps: "Want proof first? Book a 7-Minute Demo".
 * - Title made more visually dominant: heavier contrast, tighter tracking, glow layer, and controlled gradient flare.
 */

import { motion, Variants } from "framer-motion";
import { ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { WavyBackground } from "@/components/ui/wavy-background";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const easeOutExpo = [0.16, 0.84, 0.44, 1] as const;
const easeOutQuart = [0.25, 0.46, 0.45, 0.94] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: easeOutQuart },
  },
};

const titleLine: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

const frameVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, ease: easeOutExpo },
  },
};

const glowTextShadow =
  "0 2px 18px rgba(0,0,0,0.88), 0 0 44px rgba(0,0,0,0.60)";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent">
      {/* Bottom Waves only */}
      <div className="absolute bottom-0 left-0 right-0 h-[46%] z-[1]">
        <WavyBackground
          colors={["#a78bfa", "#8b5cf6", "#6366f1", "#818cf8"]}
          speed="slow"
          waveOpacity={0.88}
          backgroundFill="transparent"
          containerClassName="w-full h-full"
        />
      </div>
      
      {/* Premium overlays */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {/* Subtle noise */}
        <div
          className="absolute inset-0 opacity-[0.12] mix-blend-soft-light"
        style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/></filter><rect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22 opacity=%220.35%22/></svg>')",
          }}
        />

        {/* Top violet wash */}
        <div
          className="absolute inset-0 opacity-70"
                style={{
            background: `
              radial-gradient(ellipse 85% 55% at 50% 0%, rgba(139, 92, 246, 0.34), transparent 62%),
              radial-gradient(ellipse 55% 45% at 72% 10%, rgba(168, 85, 247, 0.22), transparent 55%),
              radial-gradient(ellipse 55% 55% at 20% 18%, rgba(99, 102, 241, 0.16), transparent 55%)
            `,
          }}
        />

        {/* Luminous orbs — drifting */}
        <div
          className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-40 hero-orb-drift"
                style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(168,85,247,0.65), transparent 60%)",
          }}
        />
        <div
          className="absolute top-6 -right-32 w-[520px] h-[520px] rounded-full blur-3xl opacity-35 hero-orb-drift animation-delay-2000"
                  style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.55), transparent 62%)",
          }}
        />

        {/* Dark center mask for readability */}
        <div
          className="absolute inset-0"
                  style={{
            background:
              "radial-gradient(ellipse 72% 58% at 50% 42%, rgba(0,0,0,0.74) 0%, rgba(0,0,0,0.28) 45%, transparent 72%)",
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-56"
                  style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.88) 42%, rgba(0,0,0,0.2) 72%, transparent 100%)",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
                style={{
            background:
              "radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.62) 100%)",
                }}
              />
          </div>

      {/* Content */}
      <div className="relative z-10 pt-4 md:pt-6 pb-16 flex flex-col justify-center min-h-[calc(100vh-6rem)]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto px-6"
        >
          {/* Glass frame — living glow, cinematic entrance */}
          <motion.div
            variants={frameVariants}
            className="relative rounded-[30px] border border-white/[0.10] bg-black/60 overflow-hidden hero-frame-glow"
          >
            {/* Inner sheen */}
            <div
              className="absolute inset-0 opacity-70 pointer-events-none"
              style={{
                background:
                  "linear-gradient(120deg, rgba(255,255,255,0.10), transparent 35%, rgba(255,255,255,0.06) 65%, transparent)",
              }}
            />

            <div className="relative px-6 md:px-12 py-8 md:py-10 text-center">
            

              {/* TITLE — staggered entrance + gradient shift */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 28, scale: 0.98 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.6,
                      staggerChildren: 0.12,
                      delayChildren: 0.05,
                    },
                  },
                }}
                className="mb-4"
              >
                <div className="relative inline-block">
                  <div
                    className="absolute -inset-6 blur-3xl opacity-35"
                    style={{
                      background:
                        "radial-gradient(circle at 35% 35%, rgba(139,92,246,0.55), rgba(99,102,241,0.25), transparent 70%)",
                    }}
                  />
                  <div className="relative" style={{ textShadow: glowTextShadow }}>
                <motion.div
                      variants={titleLine}
                      className="text-[3.05rem] md:text-[4.1rem] lg:text-[5.2rem] font-light tracking-[-0.03em] leading-[1.1]"
                    >
                      <EncryptedText
                        text="Control the Deal."
                        encryptedClassName="text-zinc-500"
                        revealedClassName="text-white"
                        revealDelayMs={85}
                        flipDelayMs={60}
                      />
                </motion.div>
                    <motion.div
                      variants={titleLine}
                      className="mt-2 text-[2.75rem] md:text-[3.9rem] lg:text-[5.0rem] font-light tracking-[-0.03em] leading-[1.1] hero-gradient-shift"
                      style={{
                        background: "linear-gradient(135deg, #a855f7 0%, #34d399 50%, #a855f7 100%)",
                        backgroundSize: "200% 200%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      <EncryptedText
                        text="Collect the Money."
                        encryptedClassName="text-zinc-500/80"
                        revealedClassName="text-inherit"
                        revealDelayMs={85}
                        flipDelayMs={60}
                        startDelayMs={1600}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.h1>

              {/* Subhead */}
              <motion.div
                variants={item}
                className="mb-6 text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.65)" }}
              >
                <TextGenerateEffect
                  words="Elystra is the sales infrastructure for agencies. The system that standardizes, controls, and accelerates the agency sales process after interest exists."
                  className="font-light"
                  wordClassName="text-zinc-200/90"
                  filter={true}
                  duration={0.5}
                  staggerDelay={0.05}
                  startDelay={3.4}
                />
      </motion.div>

              {/* Proof tiles — breathe + stagger */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 28, scale: 0.98 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
                  },
                }}
                className="mb-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  {[
                    { value: "170+", label: "agencies running deals on the rail" },
                    { value: "$4.6M", label: "closed last quarter" },
                    { value: "+23%", label: "average close-rate lift" },
                  ].map((s, idx) => (
      <motion.div
                      key={idx}
                      variants={item}
                      whileHover={{ scale: 1.05, y: -4 }}
                      className="relative rounded-2xl border border-white/[0.10] bg-black/50 px-5 py-5 overflow-hidden hero-tile-breathe"
                      style={{ animationDelay: `${idx * 0.35}s` }}
                    >
                      <div
                        className="absolute -top-10 -right-10 w-44 h-44 rounded-full blur-2xl opacity-30"
                        style={{
                          background:
                            "radial-gradient(circle at 30% 30%, rgba(139,92,246,0.55), transparent 60%)",
                        }}
                      />
                      <div className="relative mt-1 text-center">
                        <p className="text-3xl md:text-[2.1rem] font-light tracking-tight text-white">
                          {s.value}
                        </p>
                        <p className="text-sm text-zinc-300/80 mt-1 font-light">
                          {s.label}
                        </p>
            </div>
                    </motion.div>
                  ))}
            </div>
              </motion.div>

              {/* Guarantee — pulse */}
              <motion.div variants={item} className="mb-6">
                <div
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full hero-guarantee-pulse"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(16, 185, 129, 0.22), rgba(16, 185, 129, 0.08))",
                    border: "1px solid rgba(16, 185, 129, 0.32)",
                    boxShadow: "0 0 50px rgba(16,185,129,0.1)",
                  }}
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span className="text-sm text-emerald-200/90 font-light">
                    Close-rate moves or you pay nothing
                  </span>
        </div>
      </motion.div>

              {/* SINGLE CTA — booking only */}
              <motion.div variants={item} className="mb-4">
                <motion.a
                  href="https://calendly.com/onboarding-elystra/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-4 px-10 md:px-12 py-5 md:py-6 rounded-full text-white overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(124,58,237,1) 0%, rgba(147,51,234,1) 55%, rgba(99,102,241,1) 100%)",
                    boxShadow:
                      "0 22px 70px rgba(139,92,246,0.34), 0 0 0 1px rgba(255,255,255,0.10) inset",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Moving shine */}
                  <span
                    className="absolute inset-0 rounded-full overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
                      backgroundSize: "50% 100%",
                    }}
                  />
                  <span
                    className="absolute inset-0 rounded-full hero-cta-shine pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
                      width: "40%",
                    }}
                  />

                  <Sparkles className="w-5 h-5 relative z-10" />

                  {/* Two-line label inside one button */}
                  <span className="relative z-10 text-left leading-tight">
                    <span className="block text-[0.7rem] md:text-xs uppercase tracking-[0.24em] text-white/80 font-light">
                      Want proof in 7 minutes?
                    </span>
                    <span className="block text-lg md:text-xl font-medium tracking-wide">
                      Book a 7-Minute Demo
                    </span>
                  </span>

                  <ArrowRight className="w-5 h-5 relative z-10 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.a>

                <p
                  className="mt-5 text-sm text-zinc-300/70 font-light"
                  style={{ textShadow: "0 1px 8px rgba(0,0,0,0.55)" }}
                >
                  Same leads. Same team. Higher close-rate. That's the rail.
                </p>
              </motion.div>

              {/* Micro-benefits — hover lift */}
      <motion.div
                variants={item}
                className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-400/70"
              >
                {[
                  "Proposals from calls in minutes",
                  "Sign + pay on one screen",
                  "Every deal tracked to close",
                ].map((text, i) => (
                  <motion.span
                    key={i}
                    variants={item}
                    whileHover={{ scale: 1.05, y: -1 }}
                    className="px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] transition-colors hover:border-white/[0.12] hover:text-zinc-300"
                  >
                    {text}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        </div>
    </section>
  );
};

export default Hero;