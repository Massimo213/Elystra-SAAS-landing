/**
 * Cta.tsx
 * ELYSTRA — PREMIUM TIER
 * Final conversion push with cinematic urgency
 */

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Clock, Zap } from 'lucide-react';

const Cta = () => {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden bg-transparent">
      {/* Optimized Background - Static gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-60"
          style={{
            background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.12) 0%, transparent 60%)',
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Urgency badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10"
          style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
          }}
        >
          <motion.div 
            className="w-2 h-2 rounded-full bg-red-400"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-xs tracking-[0.12em] uppercase text-red-400">
            Limited pilot spots remaining
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight mb-8"
        >
          <span 
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Stop Bleeding Deals.
          </span>
          <br />
          <span 
            style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #c084fc 50%, #e879f9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Start Closing Them.
          </span>
        </motion.h2>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl font-extralight text-zinc-400 max-w-2xl mx-auto mb-12"
        >
          Your competitor just closed a deal while you were formatting a PDF.
          <br className="hidden md:block" />
          <span className="text-white font-light">
            Every day you wait is revenue you'll never recover.
          </span>
        </motion.p>

        {/* Value props row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          {[
            { icon: Clock, text: '15-minute setup' },
            { icon: Zap, text: 'Same-day close capability' },
            { icon: Sparkles, text: '30-day risk-free' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                whileHover={{ scale: 1.03, borderColor: 'rgba(139, 92, 246, 0.3)' }}
              >
                <Icon className="w-4 h-4 text-violet-400" />
                <span className="text-sm text-zinc-300 font-light">{item.text}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="#demo"
            className="group relative inline-flex items-center justify-center gap-3 px-12 py-6 rounded-full overflow-hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Pulsing glow layers */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.4), transparent 70%)',
                filter: 'blur(25px)',
              }}
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Button background */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%)',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            {/* Shine sweep */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)',
                backgroundSize: '200% 100%',
              }}
              animate={{
                backgroundPosition: ['-100% 0', '200% 0'],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: 'easeInOut',
              }}
            />
            
            {/* Top highlight */}
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px]"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              }}
            />

            <div className="relative z-10 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-lg font-medium text-white">
                Book a Demo — See It Close
              </span>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-sm text-zinc-600"
        >
          No credit card required · 15-minute call · See a real close happen
        </motion.p>
      </div>
    </section>
  );
};

export default Cta;
