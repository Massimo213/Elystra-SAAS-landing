/**
 * BleedingCalculator.tsx
 * ELYSTRA — PREMIUM TIER
 * Stunning interactive calculator with cinematic effects
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { Calculator, TrendingDown, AlertTriangle, ArrowRight, Flame } from 'lucide-react';

/* ---------------- Animated Counter ---------------- */
const AnimatedNumber = ({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) => {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => {
    if (latest >= 1000000) return `${prefix}${(latest / 1000000).toFixed(1)}M${suffix}`;
    if (latest >= 1000) return `${prefix}${Math.round(latest / 1000)}K${suffix}`;
    return `${prefix}${Math.round(latest)}${suffix}`;
  });

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    });
    return controls.stop;
  }, [value, motionValue]);

  return <motion.span>{rounded}</motion.span>;
};

const BleedingCalculator = () => {
  const [proposalsPerMonth, setProposalsPerMonth] = useState(10);
  const [avgDealSize, setAvgDealSize] = useState(15000);
  const [closeRate, setCloseRate] = useState(30);

  // Decay factor: 30% of lost deals were recoverable (conservative, defensible)
  const DECAY_FACTOR = 0.30;

  // Calculate the bleeding
  const lostDeals = proposalsPerMonth * (1 - closeRate / 100);
  const recoverableDeals = lostDeals * DECAY_FACTOR;
  const monthlyDecay = recoverableDeals * avgDealSize;
  const quarterlyDecay = monthlyDecay * 3;
  const yearlyDecay = monthlyDecay * 12;

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${Math.round(value / 1000)}K`;
    return `$${Math.round(value)}`;
  };

  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-transparent">
      {/* Optimized Background - Static gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 60%)',
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-10"
            style={{
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))',
              border: '1px solid rgba(239, 68, 68, 0.2)',
            }}
            whileHover={{ scale: 1.02 }}
          >
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-xs tracking-[0.25em] uppercase text-red-400/80 font-light">
              THE MATH YOUR COMPETITORS DON'T SHOW YOU
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-extralight tracking-tight mb-6">
            <span 
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              How Much Are You{' '}
            </span>
            <span className="relative inline-block">
              <span 
                style={{
                  background: 'linear-gradient(135deg, #f87171 0%, #ef4444 50%, #dc2626 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Bleeding
              </span>
            </span>
            <span 
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ?
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-zinc-500 font-extralight max-w-xl mx-auto">
            Input your numbers. See how many deals are dying in the gap.
          </p>
        </motion.div>

        {/* Calculator Card - Premium Glass */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Static border gradient */}
          <div
            className="absolute -inset-[1px] rounded-[2rem] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(239,68,68,0.3), rgba(249,115,22,0.2), rgba(239,68,68,0.3))',
            }}
          />
          
          <div className="relative bg-black/90 rounded-[2rem] p-10 md:p-14 overflow-hidden">
            {/* Inner atmospheric glow */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: 'radial-gradient(ellipse at 30% 20%, rgba(239, 68, 68, 0.1), transparent 50%)',
              }}
            />
            
            <div className="relative grid md:grid-cols-2 gap-14">
              {/* Inputs */}
              <div className="space-y-10">
                <div className="flex items-center gap-4 mb-10">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <Calculator className="w-5 h-5 text-zinc-400" />
                  </div>
                  <span className="text-xl font-extralight text-white tracking-wide">Your Numbers</span>
                </div>

                {/* Proposals per month */}
                <div className="space-y-5">
                  <div className="flex justify-between items-baseline">
                    <label className="text-sm text-zinc-500 font-light">Proposals sent per month</label>
                    <motion.span 
                      key={proposalsPerMonth}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-3xl font-extralight text-white"
                    >
                      {proposalsPerMonth}
                    </motion.span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={proposalsPerMonth}
                      onChange={(e) => setProposalsPerMonth(Number(e.target.value))}
                      className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer
                               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
                               [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                               [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(255,255,255,0.4)]
                               [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-300
                               [&::-webkit-slider-thumb]:hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
                    />
                    {/* Track fill */}
                    <div 
                      className="absolute top-0 left-0 h-2 bg-gradient-to-r from-white/20 to-white/40 rounded-full pointer-events-none"
                      style={{ width: `${(proposalsPerMonth / 50) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-zinc-600">
                    <span>1</span>
                    <span>50</span>
                  </div>
                </div>

                {/* Average deal size */}
                <div className="space-y-5">
                  <div className="flex justify-between items-baseline">
                    <label className="text-sm text-zinc-500 font-light">Average deal size</label>
                    <motion.span 
                      key={avgDealSize}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-3xl font-extralight text-white"
                    >
                      {formatCurrency(avgDealSize)}
                    </motion.span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="1000"
                      max="100000"
                      step="1000"
                      value={avgDealSize}
                      onChange={(e) => setAvgDealSize(Number(e.target.value))}
                      className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer
                               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
                               [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                               [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                    />
                    <div 
                      className="absolute top-0 left-0 h-2 bg-gradient-to-r from-white/20 to-white/40 rounded-full pointer-events-none"
                      style={{ width: `${((avgDealSize - 1000) / 99000) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-zinc-600">
                    <span>$1K</span>
                    <span>$100K</span>
                  </div>
                  {/* Quick select */}
                  <div className="flex gap-2 flex-wrap">
                    {[5000, 10000, 15000, 25000, 50000].map((val) => (
                      <motion.button
                        key={val}
                        onClick={() => setAvgDealSize(val)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 text-xs rounded-xl border transition-all duration-300 ${
                          avgDealSize === val
                            ? 'bg-white/10 border-white/30 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                            : 'bg-transparent border-white/[0.06] text-zinc-500 hover:border-white/15 hover:text-zinc-300'
                        }`}
                      >
                        ${val / 1000}k
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Current close rate */}
                <div className="space-y-5">
                  <div className="flex justify-between items-baseline">
                    <label className="text-sm text-zinc-500 font-light">Current close rate</label>
                    <motion.span 
                      key={closeRate}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-3xl font-extralight text-white"
                    >
                      {closeRate}%
                    </motion.span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="5"
                      max="60"
                      value={closeRate}
                      onChange={(e) => setCloseRate(Number(e.target.value))}
                      className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer
                               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
                               [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                               [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                    />
                    <div 
                      className="absolute top-0 left-0 h-2 bg-gradient-to-r from-white/20 to-white/40 rounded-full pointer-events-none"
                      style={{ width: `${((closeRate - 5) / 55) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-zinc-600">
                    <span>5%</span>
                    <span>60%</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/[0.06]">
                  <p className="text-xs text-zinc-600 font-light">
                    Based on 145+ agencies: ~30% of "lost" deals are recoverable with proper follow-up timing.
                  </p>
                </div>
              </div>

              {/* Results */}
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.05))',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      boxShadow: '0 0 30px rgba(239, 68, 68, 0.15)',
                    }}
                  >
                    <TrendingDown className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="text-xl font-extralight text-white tracking-wide">Your Deal Decay</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${proposalsPerMonth}-${avgDealSize}-${closeRate}`}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    {/* Monthly decay - MAIN NUMBER */}
                    <div 
                      className="relative p-10 rounded-2xl overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                      }}
                    >
                      {/* Static subtle glow */}
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          background: 'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.15), transparent 70%)',
                        }}
                      />
                      
                      <div className="relative">
                        <div className="flex items-center gap-2 mb-4">
                          <Flame className="w-4 h-4 text-red-400/60" />
                          <p className="text-xs tracking-[0.2em] uppercase text-red-400/60">
                            Monthly Deal Decay
                          </p>
                        </div>
                        <p className="text-6xl md:text-7xl font-extralight text-red-400">
                          <AnimatedNumber value={monthlyDecay} prefix="$" />
                        </p>
                        <p className="text-sm text-zinc-500 mt-4 font-light">
                          {recoverableDeals.toFixed(1)} deals/month dying in the gap
                        </p>
                      </div>
                    </div>

                    {/* Quarterly & Yearly */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 rounded-2xl glass-glow">
                        <p className="text-xs text-zinc-500 mb-3 font-light">Per Quarter</p>
                        <p className="text-3xl font-extralight text-orange-400">
                          <AnimatedNumber value={quarterlyDecay} prefix="$" />
                        </p>
                      </div>
                      <div className="p-6 rounded-2xl glass-glow">
                        <p className="text-xs text-zinc-500 mb-3 font-light">Per Year</p>
                        <p className="text-3xl font-extralight text-red-400">
                          <AnimatedNumber value={yearlyDecay} prefix="$" />
                        </p>
                      </div>
                    </div>

                    {/* The punchline */}
                    <div 
                      className="p-6 rounded-2xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                      }}
                    >
                      <p className="text-sm text-zinc-400 font-light">
                        <span className="text-emerald-400 font-medium">Elystra costs less than losing one deal.</span>{' '}
                        Average user recovers {formatCurrency(avgDealSize * 2)}-{formatCurrency(avgDealSize * 4)} in deals that were going dark. Per quarter.
                      </p>
                    </div>

                    {/* CTA */}
                    <motion.a
                      href="https://calendly.com/onboarding-elystra/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-medium text-white overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)',
                        boxShadow: '0 0 40px rgba(139, 92, 246, 0.3)',
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: '0 0 60px rgba(139, 92, 246, 0.4)'
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
                        }}
                      />
                      <span className="relative z-10">Stop the Bleeding</span>
                      <ArrowRight className="w-5 h-5 relative z-10" />
                    </motion.a>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BleedingCalculator;
