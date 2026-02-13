/**
 * Hero.tsx
 * ELYSTRA — Strategic Hero with new copy framework
 */

import { motion, Variants } from 'framer-motion';
import { ShieldCheck, ArrowRight, Sparkles, FileText, CreditCard, BarChart3, Users } from 'lucide-react';

/* ---------------- Motion variants ---------------- */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } 
  }
};

/* ---------------- Hero ---------------- */
const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent">
      {/* Optimized Background */}
      <div className="absolute inset-0 z-[1] will-change-transform">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139, 92, 246, 0.25), transparent),
              radial-gradient(ellipse 60% 40% at 70% 10%, rgba(168, 85, 247, 0.15), transparent)
            `,
          }}
        />
      </div>
      
      {/* Static orbs - no animation, pure CSS */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div
          className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2), transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15), transparent 70%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-32 md:pt-40 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto px-6 text-center"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
              <Users className="w-4 h-4 text-violet-400" />
              <span className="text-xs tracking-[0.2em] uppercase text-zinc-400 font-light">
                For Marketing & Advertising Agencies
              </span>
            </div>
          </motion.div>

          {/* H1 - The Problem */}
          <motion.h1 variants={itemVariants} className="mb-8">
            <span 
              className="block text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight leading-[1.15]"
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Your problem isn't leads.
            </span>
            <span 
              className="block text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight leading-[1.15] mt-2"
            >
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
            <span 
              className="block text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight leading-[1.15] mt-2 text-zinc-500"
            >
              "send me something" and "we got paid."
            </span>
          </motion.h1>

          {/* Subhead - What Elystra Is */}
          <motion.div variants={itemVariants} className="mb-10">
            <p className="text-xl md:text-2xl text-zinc-400 font-extralight max-w-3xl mx-auto leading-relaxed">
              Elystra is{' '}
              <span 
                style={{
                  background: 'linear-gradient(135deg, #a855f7 0%, #c084fc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                proposal-to-cash infrastructure
              </span>{' '}
              for agencies.
            </p>
            <p className="text-lg text-zinc-500 font-extralight max-w-2xl mx-auto mt-4 leading-relaxed">
              It sits under your existing calls and tools and does one thing ruthlessly well:
              turn every serious opportunity into a tracked proposal, a clear buying signal, 
              and a clean path to payment — without adding headcount or changing your offer.
            </p>
          </motion.div>

          {/* Pain + Universality */}
          <motion.div variants={itemVariants} className="mb-10">
            <div 
              className="inline-block px-6 py-4 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(249, 115, 22, 0.03) 100%)',
                border: '1px solid rgba(239, 68, 68, 0.15)',
              }}
            >
              <p className="text-sm md:text-base text-zinc-400 font-light">
                Whether you sell <span className="text-white">$3K retainers</span> or{' '}
                <span className="text-white">$300K projects</span>, the pattern is the same:
                <br className="hidden md:block" />
                deals stall after the proposal, follow-up is non-systematized, no one knows which offers print money,
                <br className="hidden md:block" />
                and{' '}
                <span 
                  style={{
                    background: 'linear-gradient(135deg, #f87171 0%, #fb923c 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  revenue dies in the gap.
                </span>
              </p>
            </div>
          </motion.div>

          {/* Guarantee Badge */}
          <motion.div variants={itemVariants} className="mb-10">
            <div 
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))',
                border: '1px solid rgba(16, 185, 129, 0.2)',
              }}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400/90 font-light">
                <strong className="font-medium">30-day guarantee:</strong> Close-rate moves or you pay nothing
              </span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="relative mb-20">
            <motion.a
              href="https://calendly.com/onboarding-elystra/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-4 px-12 py-6 rounded-full text-white font-medium text-xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)',
                boxShadow: '0 0 60px rgba(139, 92, 246, 0.3)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Static shine highlight */}
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
                }}
              />
              
              <Sparkles className="w-6 h-6 relative z-10" />
              <span className="relative z-10 tracking-wide">See the Rail in Action</span>
              <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>

            <p className="mt-6 text-sm text-zinc-500 font-light">
              7-minute demo. Zero pitch. Pure product.
            </p>
          </motion.div>
        </motion.div>

        {/* What Elystra Gives You - Stacked Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-center text-xs tracking-[0.2em] uppercase text-zinc-600 mb-8">
              What Elystra gives you
            </p>
            
            <div 
              className="relative p-[1px] rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.4), rgba(168,85,247,0.2))',
              }}
            >
              <div className="bg-black/90 rounded-3xl p-8 md:p-10">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { 
                      icon: FileText, 
                      text: 'Proposals drafted from call recordings',
                      sub: 'in minutes, not days'
                    },
                    { 
                      icon: CreditCard, 
                      text: 'Embedded e-sign + payment in the same rail',
                      sub: 'no DocuSign/Stripe hopscotch'
                    },
                    { 
                      icon: BarChart3, 
                      text: 'Behavioral X-ray and ranked follow-up queue',
                      sub: 'for every deal'
                    },
                    { 
                      icon: Users, 
                      text: 'Portfolio-level revenue analytics',
                      sub: 'by offer, by closer, by month'
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]
                               hover:bg-white/[0.04] hover:border-white/[0.1] transition-colors"
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)',
                          border: '1px solid rgba(139, 92, 246, 0.2)',
                        }}
                      >
                        <item.icon className="w-4 h-4 text-violet-400" />
                      </div>
                      <div>
                        <p className="text-white font-light text-sm">{item.text}</p>
                        <p className="text-xs text-zinc-500 mt-1">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-16"
        >
          <div className="max-w-3xl mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {[
                { value: '145+', label: 'agencies on the rail' },
                { value: '$4.1M', label: 'closed last quarter' },
                { value: '+23%', label: 'avg close-rate lift' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p 
                    className="text-3xl md:text-4xl font-extralight tracking-tight"
                    style={{
                      background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.6) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-zinc-500 mt-2 font-light">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
