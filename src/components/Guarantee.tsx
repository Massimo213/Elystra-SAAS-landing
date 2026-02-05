/**
 * Guarantee.tsx
 * ELYSTRA — Simplified one-line guarantee
 */

import { motion } from 'framer-motion';
import { Shield, ArrowRight } from 'lucide-react';

const Guarantee = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-transparent">
      {/* Optimized Background - Static gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Simple Card */}
          <div 
            className="inline-block p-10 md:p-14 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(52, 211, 153, 0.04) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}
          >
            {/* Icon */}
            <div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(52, 211, 153, 0.1) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}
            >
              <Shield className="w-7 h-7 text-emerald-400" />
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight mb-6">
              <span 
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                30-Day Profitability Guarantee
              </span>
            </h2>

            {/* The One Line */}
            <p className="text-lg md:text-xl text-zinc-300 font-light max-w-xl mx-auto mb-4">
              We don't win unless you win.
            </p>
            <p className="text-base text-zinc-500 font-light max-w-lg mx-auto mb-10">
              If your close-rate or time-to-cash doesn't move, you pay nothing.
              <br />
              <span className="text-zinc-400">Enforced ruthlessly.</span>
            </p>

            {/* CTA */}
            <motion.a
              href="#demo"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(52, 211, 153, 0.1) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm font-light text-white">Start Risk-Free</span>
              <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Guarantee;
