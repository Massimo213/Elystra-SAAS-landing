/**
 * Guarantee.tsx
 * One clean block. Concrete. Then shut up.
 */

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const Guarantee = () => {
  return (
    <section id="guarantee" className="relative py-20 md:py-28 overflow-hidden bg-transparent">
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 60%)' }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div 
            className="inline-block p-10 md:p-14 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(52, 211, 153, 0.04) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}
          >
            <div 
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-8"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(52, 211, 153, 0.1) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}
            >
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>

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

            <p className="text-base md:text-lg text-zinc-300 font-light max-w-xl mx-auto leading-relaxed mb-3">
              Run your real pipeline through Elystra for 30 days.
            </p>
            <p className="text-base md:text-lg text-zinc-300 font-light max-w-xl mx-auto leading-relaxed mb-3">
              If your closed revenue and time-to-cash don't move, we refund the month.
            </p>
            <p className="text-sm text-zinc-500 font-light max-w-lg mx-auto mt-6">
              If Elystra doesn't make you money, we don't keep yours.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Guarantee;
