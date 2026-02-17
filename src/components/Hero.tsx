/**
 * Hero.tsx — GREATNESS pass
 * Changes:
 * - Removed “Used by teams at …” logo strip (no placeholders).
 * - Single CTA button only (booking).
 * - CTA label keeps: “Want proof first? Book a 7-Minute Demo”.
 * - Title made more visually dominant: heavier contrast, tighter tracking, glow layer, and controlled gradient flare.
 */

import { motion, Variants } from "framer-motion";
import { ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { WavyBackground } from "@/components/ui/wavy-background";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] },
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
          colors={[
            "rgba(139, 92, 246, 0.42)",
            "rgba(168, 85, 247, 0.32)",
            "rgba(192, 132, 252, 0.26)",
            "rgba(99, 102, 241, 0.22)",
            "rgba(139, 92, 246, 0.14)",
          ]}
          waveWidth={52}
          blur={5}
          speed="slow"
          waveOpacity={0.42}
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

        {/* Luminous orbs */}
        <div
          className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-40"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(168,85,247,0.65), transparent 60%)",
          }}
        />
        <div
          className="absolute top-6 -right-32 w-[520px] h-[520px] rounded-full blur-3xl opacity-35"
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
      <div className="relative z-10 pt-28 md:pt-36 pb-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto px-6"
        >
          {/* Glass frame */}
          <div
            className="relative rounded-[30px] border border-white/[0.10] bg-black/35 backdrop-blur-xl overflow-hidden"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.05), 0 34px 100px rgba(0,0,0,0.72), 0 0 90px rgba(139,92,246,0.18)",
            }}
          >
            {/* Inner sheen */}
            <div
              className="absolute inset-0 opacity-70 pointer-events-none"
              style={{
                background:
                  "linear-gradient(120deg, rgba(255,255,255,0.10), transparent 35%, rgba(255,255,255,0.06) 65%, transparent)",
              }}
            />

            <div className="relative px-6 md:px-12 py-11 md:py-14 text-center">
            

              {/* TITLE — bigger, sharper, more “poster” */}
              <motion.h1 variants={item} className="mb-6">
                {/* glow layer */}
                <div className="relative inline-block">
                  <div
                    className="absolute -inset-6 blur-3xl opacity-35"
                    style={{
                      background:
                        "radial-gradient(circle at 35% 35%, rgba(139,92,246,0.55), rgba(99,102,241,0.25), transparent 70%)",
                    }}
                  />
                  <div className="relative" style={{ textShadow: glowTextShadow }}>
                    <div className="text-[3.05rem] md:text-[4.1rem] lg:text-[5.2rem] font-light tracking-[-0.03em] leading-[1.04] text-white">
                      Your problem isn’t leads.
                    </div>

                    <div className="mt-2 text-[2.75rem] md:text-[3.9rem] lg:text-[5.0rem] font-light tracking-[-0.03em] leading-[1.05]">
                      <span className="text-zinc-200/90">It’s the </span>

                      {/* “silent leak” — stronger, more premium */}
                      <span className="relative inline-block align-baseline">
                        <span
                          className="absolute -inset-3 rounded-3xl blur-2xl opacity-45"
                          style={{
                            background:
                              "radial-gradient(circle at 30% 30%, rgba(248,113,113,0.62), rgba(251,146,60,0.34), transparent 72%)",
                          }}
                        />
                        <span
                          className="relative"
                          style={{
                            background:
                              "linear-gradient(135deg, #fb7185 0%, #fb923c 55%, #f59e0b 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            filter:
                              "drop-shadow(0 6px 22px rgba(248,113,113,0.30))",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          silent leak
                        </span>
                      </span>

                      <span className="text-zinc-200/90"> between</span>
                    </div>

                    <div className="mt-2 text-[2.55rem] md:text-[3.7rem] lg:text-[4.8rem] font-light tracking-[-0.03em] leading-[1.06] text-zinc-200/85">
                      “send me something” and “we got paid.”
                    </div>
                  </div>
                </div>
              </motion.h1>

              {/* Subhead */}
              <motion.p
                variants={item}
                className="text-lg md:text-xl text-zinc-200/85 font-light max-w-3xl mx-auto leading-relaxed mb-10"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.65)" }}
              >
                Elystra runs everything between “I’m interested” and money in your account for  agencies.
                Every serious opportunity becomes a tracked proposal, a buying
                signal, and a clean path to payment .
              </motion.p>

              {/* Proof tiles */}
              <motion.div variants={item} className="mb-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  {[
                    { value: "145+", label: "agencies onboarded" },
                    { value: "$4.1M", label: "closed last quarter" },
                    { value: "+23%", label: "avg close-rate lift" },
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-2xl border border-white/[0.10] bg-black/45 backdrop-blur-md px-5 py-5 overflow-hidden"
                      style={{
                        boxShadow:
                          "0 0 0 1px rgba(255,255,255,0.04), 0 16px 55px rgba(0,0,0,0.55)",
                      }}
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
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Guarantee */}
              <motion.div variants={item} className="mb-10">
                <div
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(16, 185, 129, 0.22), rgba(16, 185, 129, 0.08))",
                    border: "1px solid rgba(16, 185, 129, 0.32)",
                    boxShadow: "0 0 50px rgba(16,185,129,0.10)",
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
                  {/* moving sheen */}
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    initial={{ x: "-45%" }}
                    animate={{ x: "45%" }}
                    transition={{
                      duration: 2.9,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    }}
                    style={{
                      background:
                        "linear-gradient(110deg, transparent 38%, rgba(255,255,255,0.18) 50%, transparent 62%)",
                      opacity: 0.95,
                    }}
                  />

                  {/* Soft pulse underlay */}
                  <motion.span
                    className="absolute inset-0 rounded-full opacity-30"
                    initial={{ opacity: 0.18 }}
                    animate={{ opacity: 0.32 }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    }}
                    style={{
                      background:
                        "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.20), transparent 60%)",
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
                > Agencies uplift their close-rate with Elystra without adding a single new lead nor a dime .
                </p>
              </motion.div>

              {/* Micro-benefits */}
              <motion.div
                variants={item}
                className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-400/70"
              >
                <span className="px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03]">
                  No new headcount
                </span>
                <span className="px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03]">
                  Tracks views + intent
                </span>
                <span className="px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03]">
                  E-sign → payment path
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;