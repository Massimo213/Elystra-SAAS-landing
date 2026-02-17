/**
 * Cta.tsx
 * Final conversion push. One CTA. One behavior.
 */

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Clock, Zap } from 'lucide-react';

const Cta = () => {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden bg-transparent">
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-60"
          style={{ background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.12) 0%, transparent 60%)' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
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
            Every day you wait is revenue you won't recover.
          </span>
        </motion.p>

        {/* Value props */}
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
              <div
                key={i}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <Icon className="w-4 h-4 text-violet-400" />
                <span className="text-sm text-zinc-300 font-light">{item.text}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Single CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="https://calendly.com/onboarding-elystra/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 px-12 py-6 rounded-full overflow-hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%)',
                boxShadow: '0 0 40px rgba(139, 92, 246, 0.3)',
              }}
            />
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: 'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)' }}
            />
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
            />
            <div className="relative z-10 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-lg font-medium text-white">Book a 7-Minute Demo</span>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-sm text-zinc-600"
        >
          7 minutes. Real pipeline. Your numbers.
        </motion.p>
      </div>
    </section>
  );
};

export default Cta;
