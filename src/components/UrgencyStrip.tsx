/**
 * UrgencyStrip.tsx
 * ELYSTRA — Infrastructure-grade banner. No fake scarcity.
 * States a fact. Links to action.
 */

import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';

const UrgencyStrip = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative overflow-hidden py-3"
      style={{
        background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.12) 0%, rgba(168, 85, 247, 0.18) 50%, rgba(139, 92, 246, 0.12) 100%)',
        borderBottom: '1px solid rgba(139, 92, 246, 0.15)',
      }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-center gap-x-5 text-sm">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-zinc-300 font-light">
              <strong className="font-medium text-white">170+ agencies</strong> are closing on the rail.
            </span>
          </div>

          <a
            href="https://calendly.com/onboarding-elystra/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-xs text-violet-300 hover:text-white transition-colors font-light"
          >
            See it live
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default UrgencyStrip;
