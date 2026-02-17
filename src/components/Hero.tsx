/**
 * Hero.tsx
 * ELYSTRA — Waves (Hero only) + Vortex bleeds through from global.
 * One screen: pain + outcome + proof + risk reversal.
 */

import { motion, Variants } from 'framer-motion';
import { ShieldCheck, ArrowRight, Sparkles, Users } from 'lucide-react';
import { WavyBackground } from '@/components/ui/wavy-background';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } 
  }
};

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent">
      {/* Waves — Hero only, positioned at bottom half */}
      <div className="absolute inset-0 z-[1]">
        <WavyBackground
          colors={[
            "rgba(139, 92, 246, 0.35)",
            "rgba(168, 85, 247, 0.3)",
            "rgba(192, 132, 252, 0.25)",
            "rgba(99, 102, 241, 0.2)",
            "rgba(139, 92, 246, 0.15)",
          ]}
          waveWidth={50}
          blur={4}
          speed="slow"
          waveOpacity={0.4}
          backgroundFill="transparent"
          containerClassName="w-full h-full"
        />
      </div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {/* Top violet wash */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139, 92, 246, 0.3), transparent 60%),
              radial-gradient(ellipse 50% 40% at 70% 10%, rgba(168, 85, 247, 0.2), transparent 50%)
            `,
          }}
        />
        {/* Bottom fade to black — seamless transition */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, transparent 100%)',
          }}
        />
        {/* Vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-28 md:pt-36 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto px-6 text-center"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/40 border border-white/[0.1]">
              <Users className="w-4 h-4 text-violet-400" />
              <span className="text-xs tracking-[0.2em] uppercase text-zinc-400 font-light">
                For agencies sending 8+ proposals / month
              </span>
            </div>
          </motion.div>

          {/* H1 */}
          <motion.h1 variants={itemVariants} className="mb-6">
            <span 
              className="block text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight leading-[1.15]"
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.85) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Your problem isn't leads.
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight leading-[1.15] mt-2">
              <span className="text-zinc-500">It's the </span>
              <span
                style={{
                  background: 'linear-gradient(135deg, #f87171 0%, #fb923c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                silent leak
              </span>
              <span className="text-zinc-500"> between</span>
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight leading-[1.15] mt-2 text-zinc-500">
              "send me something" and "we got paid."
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-lg md:text-xl text-zinc-400 font-extralight max-w-2xl mx-auto leading-relaxed">
              Elystra is proposal-to-cash infrastructure for agencies.
              It turns every serious opportunity into a tracked proposal, a buying signal,
              and a clean path to payment — without adding headcount.
            </p>
          </motion.div>

          {/* Proof Strip */}
          <motion.div variants={itemVariants} className="mb-6">
            <div 
              className="inline-flex flex-wrap items-center justify-center gap-6 md:gap-10 px-8 py-4 rounded-2xl"
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {[
                { value: '145+', label: 'agencies' },
                { value: '$4.1M', label: 'closed last quarter' },
                { value: '+23%', label: 'avg close-rate lift' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p 
                    className="text-2xl md:text-3xl font-extralight tracking-tight"
                    style={{
                      background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.6) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 font-light">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Guarantee */}
          <motion.div variants={itemVariants} className="mb-10">
            <div 
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05))',
                border: '1px solid rgba(16, 185, 129, 0.25)',
              }}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400/90 font-light">
                30-day guarantee · close-rate moves or you pay nothing
              </span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="mb-16">
            <motion.a
              href="https://calendly.com/onboarding-elystra/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-4 px-12 py-6 rounded-full text-white font-medium text-xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)',
                boxShadow: '0 0 60px rgba(139, 92, 246, 0.4)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
                }}
              />
              <Sparkles className="w-6 h-6 relative z-10" />
              <span className="relative z-10 tracking-wide">Book a 7-Minute Demo</span>
              <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
            <p className="mt-5 text-sm text-zinc-500 font-light">
              Zero pitch. Pure product. See a real close happen.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
