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

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div 
            className="inline-block p-10 md:p-14 rounded-3xl w-full"
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

            <h2 className="text-3xl md:text-5xl font-extralight tracking-tight mb-8 leading-tight">
              <span 
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                30-Day Infrastructure Guarantee
              </span>
            </h2>

            <div className="max-w-xl mx-auto space-y-5 mb-8">
              <p className="text-base md:text-lg text-zinc-300 font-light leading-relaxed">
                Run real deals through Elystra for 30 days. If your close-rate doesn&apos;t move and your time-to-cash doesn&apos;t compress, you get the month back.
              </p>
              <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed">
                170+ agencies on the rail. The numbers move.
              </p>
            </div>
            
            <div 
              className="inline-block px-6 py-3 rounded-xl"
              style={{
                background: 'rgba(16, 185, 129, 0.06)',
                border: '1px solid rgba(16, 185, 129, 0.15)',
              }}
            >
              <p className="text-sm md:text-base text-zinc-300 font-light">
                Either you win, or we don&apos;t get paid.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Guarantee;
