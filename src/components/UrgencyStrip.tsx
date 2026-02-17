/**
 * UrgencyStrip.tsx
 * ELYSTRA — PREMIUM TIER
 * Subtle urgency banner with cinematic effects
 */

import { motion } from 'framer-motion';
import { Clock, Users, Sparkles } from 'lucide-react';

const UrgencyStrip = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative overflow-hidden py-3"
      style={{
        background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.15) 0%, rgba(168, 85, 247, 0.2) 50%, rgba(139, 92, 246, 0.15) 100%)',
        borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
      }}
    >
      {/* Static shimmer highlight */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
        }}
      />

      {/* Subtle glow */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.2), transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <div 
              className="w-5 h-5 rounded flex items-center justify-center"
              style={{
                background: 'rgba(139, 92, 246, 0.2)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
              }}
            >
              <Users className="w-3 h-3 text-violet-400" />
            </div>
            <span className="text-zinc-300 font-light">
              <strong className="font-medium text-white">6 onboarding slots</strong> left this week
            </span>
          </motion.div>
          
          <span className="hidden md:inline text-white/20">|</span>
          
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <div 
              className="w-5 h-5 rounded flex items-center justify-center"
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
              }}
            >
              <Clock className="w-3 h-3 text-red-400" />
            </div>
            
          </motion.div>
          
          <span className="hidden lg:inline text-white/20">|</span>
          
          <motion.a
            href="https://calendly.com/onboarding-elystra/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-200"
            style={{
              background: 'rgba(139, 92, 246, 0.2)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
            }}
            whileHover={{ 
              scale: 1.03,
              background: 'rgba(139, 92, 246, 0.3)',
            }}
          >
            <Sparkles className="w-3 h-3 text-violet-400" />
            <span className="text-xs text-white font-light">Claim Your Spot</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default UrgencyStrip;
