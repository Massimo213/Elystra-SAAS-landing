/**
 * Brand.tsx
 * ELYSTRA — PREMIUM TIER
 * Outcome-driven statement with cinematic glass styling
 */

import { motion, Variants } from 'framer-motion';
import { Zap, Sparkles, Target, Rocket } from 'lucide-react';

const fadeInUp: Variants = {
  start: { y: 30, opacity: 0, filter: 'blur(10px)' },
  end: { 
    y: 0, 
    opacity: 1, 
    filter: 'blur(0px)', 
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
};

const staggerContainer: Variants = {
  start: {},
  end: { transition: { staggerChildren: 0.12 } },
};

const benefits = [
  { text: 'E‑sign + payment in one flow', Icon: Zap },
  { text: 'On‑brand in a single pass', Icon: Sparkles },
  { text: 'Every detail accounted for', Icon: Target },
  { text: 'Minutes, not days', Icon: Rocket },
];

const Brand = () => {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden bg-transparent">
      {/* Optimized Background - Static gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-50"
          style={{
            background: 'radial-gradient(ellipse, rgba(251,146,60,0.08) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Headline */}
        <motion.div
          initial="start"
          whileInView="end"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-14"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight"
          >
            <motion.span
              style={{
                backgroundImage: 'linear-gradient(135deg, #fb923c 0%, #f43f5e 40%, #e879f9 70%, #a855f7 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '200% 50%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              Close while intent is at peak.
            </motion.span>
          </motion.h2>
          
          {/* Glow under headline */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-20 -z-10"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(251,146,60,0.1), transparent 70%)',
              filter: 'blur(40px)',
            }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.div>

        {/* Benefit chips */}
        <motion.div
          variants={staggerContainer}
          initial="start"
          whileInView="end"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {benefits.map((benefit) => {
            const IconComponent = benefit.Icon;
            return (
              <motion.div
                key={benefit.text}
                variants={fadeInUp}
                whileHover={{ scale: 1.04, y: -3 }}
                className="group relative"
              >
                {/* Hover glow */}
                <motion.div 
                  className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle, rgba(251,146,60,0.15), transparent 70%)',
                    filter: 'blur(15px)',
                  }}
                />
                
                {/* Chip */}
                <div 
                  className="relative px-5 py-3 rounded-full flex items-center gap-3 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div 
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, rgba(251,146,60,0.1) 0%, rgba(244,63,94,0.05) 100%)',
                      border: '1px solid rgba(251,146,60,0.2)',
                    }}
                  >
                    <IconComponent className="w-3.5 h-3.5 text-orange-400" />
                  </div>
                  <span className="text-sm text-white/90 font-light">{benefit.text}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
          className="mt-20 h-px w-full origin-center"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(251,146,60,0.4) 25%, rgba(244,63,94,0.4) 50%, rgba(168,85,247,0.4) 75%, transparent 100%)',
          }}
        />
      </div>
    </section>
  );
};

export default Brand;
