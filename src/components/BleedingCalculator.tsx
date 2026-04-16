/**
 * BleedingCalculator.tsx
 * ELYSTRA — PREMIUM TIER
 * Stunning interactive calculator with cinematic effects
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { Calculator, TrendingDown, TrendingUp, AlertTriangle, ArrowRight, Flame, Layers, Zap } from 'lucide-react';
import { useDemoBooking } from '@/contexts/DemoBookingContext';

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
  const { openDemoBooking } = useDemoBooking();
  const phaseScrollerRef = useRef<HTMLDivElement>(null);
  const [phaseIndex, setPhaseIndex] = useState(0);

  const onPhaseScroll = useCallback(() => {
    const el = phaseScrollerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    if (w <= 0) return;
    setPhaseIndex(Math.min(1, Math.round(el.scrollLeft / w)));
  }, []);

  const scrollToPhase = useCallback((idx: number) => {
    const el = phaseScrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' });
  }, []);

  const [proposalsPerMonth, setProposalsPerMonth] = useState(10);
  const [avgDealSize, setAvgDealSize] = useState(15000);
  const [closeRate, setCloseRate] = useState(30);

  // Decay factor: 30% of lost deals were recoverable (conservative, defensible)
  const DECAY_FACTOR = 0.30;
  // Illustrative paid-close lift on identical proposal volume (rail + follow-up brain; not additive to recapture in reality — shown as separate “headroom” signal)
  const ILLUSTRATIVE_CLOSE_LIFT_PTS = 12;
  const RAIL_CLOSE_CEILING = 50;

  // Phase 1 — their baseline & leak
  const lostDeals = proposalsPerMonth * (1 - closeRate / 100);
  const recoverableDeals = lostDeals * DECAY_FACTOR;
  const monthlyDecay = recoverableDeals * avgDealSize;
  const quarterlyDecay = monthlyDecay * 3;
  const yearlyDecay = monthlyDecay * 12;

  const liftedClose = Math.min(closeRate + ILLUSTRATIVE_CLOSE_LIFT_PTS, RAIL_CLOSE_CEILING);
  const extraDealsFromLift =
    proposalsPerMonth * Math.max(0, (liftedClose - closeRate) / 100);
  const monthlyFromCloseHeadroom = extraDealsFromLift * avgDealSize;

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${Math.round(value / 1000)}K`;
    return `$${Math.round(value)}`;
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-transparent">
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
          className="text-center mb-10 md:mb-12"
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
              LEAK → RECOVERY · SAME PIPELINE
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
              First the leak.{' '}
            </span>
            <span className="relative inline-block">
              <span 
                style={{
                  background: 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Then the recovery.
              </span>
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-zinc-500 font-extralight max-w-2xl mx-auto leading-relaxed">
            This is what your current sales motion is leaving on the table.
          </p>
          <p className="mt-4 text-lg md:text-xl text-zinc-500 font-extralight max-w-2xl mx-auto leading-relaxed">
            Then this is what Elystra can recover from the same pipeline once the rail is in place.
          </p>
          <p className="mt-8 text-lg md:text-xl text-zinc-500 font-extralight max-w-2xl mx-auto leading-relaxed">
            Elystra strengthens the part of the sale where agencies usually lose control: after buyer interest exists, before the money lands.
          </p>
          <p className="mt-4 text-lg md:text-xl text-zinc-300 font-extralight max-w-2xl mx-auto leading-relaxed">
            The result is simple: more of the same pipeline moves to signed, paid, and collected revenue.
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
            
            {/* Horizontal phases — saves vertical space */}
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-2" role="tablist" aria-label="Calculator phase">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={phaseIndex === 0}
                    onClick={() => scrollToPhase(0)}
                    className={`rounded-full px-4 py-1.5 text-xs tracking-wide transition-colors ${
                      phaseIndex === 0
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'text-zinc-500 border border-transparent hover:text-zinc-300'
                    }`}
                  >
                    Leak
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={phaseIndex === 1}
                    onClick={() => scrollToPhase(1)}
                    className={`rounded-full px-4 py-1.5 text-xs tracking-wide transition-colors ${
                      phaseIndex === 1
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'text-zinc-500 border border-transparent hover:text-zinc-300'
                    }`}
                  >
                    Recovery
                  </button>
                </div>
                <span className="text-[11px] text-zinc-600 font-light hidden sm:inline">
                  Swipe horizontally or use tabs
                </span>
              </div>

              <div
                ref={phaseScrollerRef}
                onScroll={onPhaseScroll}
                className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth touch-pan-x pb-1 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin]"
              >
                {/* ——— Panel 1: Leak ——— */}
                <div className="min-w-full w-full shrink-0 snap-center snap-always box-border pr-1 md:pr-2">
                  <div className="relative flex items-center gap-3 mb-6">
                    <span className="text-[10px] tracking-[0.35em] uppercase text-zinc-500 font-medium">
                      Leak
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent max-w-[100px]" />
                    <span className="text-xs text-zinc-500 font-light">What your motion leaves on the table</span>
                  </div>

                  <div className="relative grid md:grid-cols-2 gap-10 md:gap-12">
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
                  <div>
                    <span className="text-xl font-extralight text-white tracking-wide block">Your current sales motion</span>
                    <span className="text-xs text-zinc-600 font-light">The pipeline you already generate today</span>
                  </div>
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
                  <p className="text-xs text-zinc-600 font-light leading-relaxed">
                    Conservative model. Based on what we keep seeing across 170+ agency pipelines, a meaningful share of apparently lost deals are not truly lost. They are leaking through delay, weak follow-up, fragmented commitment, and lack of visibility.
                  </p>
                </div>
              </div>

              {/* Phase 1 — leak output */}
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
                  <div>
                    <span className="text-xl font-extralight text-white tracking-wide block">What your current sales motion is leaking</span>
                    <span className="text-xs text-zinc-600 font-light">Revenue left exposed without infrastructure underneath</span>
                  </div>
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
                            Monthly revenue leaking in the gap
                          </p>
                        </div>
                        <p className="text-6xl md:text-7xl font-extralight text-red-400">
                          <AnimatedNumber value={monthlyDecay} prefix="$" />
                        </p>
                        <p className="text-sm text-zinc-500 mt-4 font-light">
                          Roughly {recoverableDeals.toFixed(1)} deals/month slipping out after buyer interest already existed
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

                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

                  <div className="mt-8 flex flex-col items-center gap-2 text-center border-t border-white/[0.06] pt-6">
                    <div className="flex items-center justify-center gap-2 text-zinc-500 text-xs tracking-[0.2em] uppercase">
                      <Layers className="w-4 h-4 text-zinc-600 shrink-0" />
                      Same pipeline · stronger motion
                    </div>
                    <p className="text-xs text-zinc-600 font-light max-w-md">
                      → Swipe or tap <span className="text-zinc-400">Recovery</span> for what the rail returns on this same motion.
                    </p>
                  </div>
                </div>

                {/* ——— Panel 2: Recovery ——— */}
                <div className="min-w-full w-full shrink-0 snap-center snap-always box-border pl-1 md:pl-2">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="text-[10px] tracking-[0.35em] uppercase text-emerald-500/90 font-medium">
                      Recovery
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-emerald-500/30 to-transparent min-w-[80px]" />
                    <span className="text-xs text-zinc-500 font-light">Same pipeline once the rail is in place</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                <motion.div
                  key={`delta-${proposalsPerMonth}-${avgDealSize}-${closeRate}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                  className="relative p-10 rounded-2xl overflow-hidden md:col-span-1"
                  style={{
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(5, 150, 105, 0.06))',
                    border: '1px solid rgba(16, 185, 129, 0.28)',
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-40 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 40% 30%, rgba(16, 185, 129, 0.2), transparent 65%)',
                    }}
                  />
                  <div className="relative flex items-center gap-3 mb-4">
                    <Zap className="w-5 h-5 text-emerald-400" />
                    <p className="text-xs tracking-[0.2em] uppercase text-emerald-400/80">
                      Monthly value recaptured
                    </p>
                  </div>
                  <p className="text-5xl md:text-6xl font-extralight text-emerald-400 mb-3">
                    <AnimatedNumber value={monthlyDecay} prefix="$" />
                  </p>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed">
                    Conservative value currently leaking in stalled, softened, or badly-followed-up opportunities. Elystra is built to pull that value back from the same pipeline, with the same offers, through a stronger finish from buyer interest to collected cash.
                  </p>
                  <div
                    className="mt-5 p-4 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06]"
                  >
                    <p className="text-[11px] tracking-[0.15em] uppercase text-emerald-500/80 mb-2">The pattern we keep seeing</p>
                    <p className="text-sm text-zinc-300 font-light leading-relaxed">
                      Across 170+ agency pipelines, the same failure modes repeat. When Elystra is installed properly, agencies usually recover{' '}
                      <span className="text-emerald-400/95">1–2 deals from the same pipeline</span> inside the first few weeks, then benefit from a cleaner finish on everything after that.
                    </p>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-black/30 border border-white/[0.06]">
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Quarter</p>
                      <p className="text-xl font-extralight text-emerald-300/90">
                        <AnimatedNumber value={quarterlyDecay} prefix="$" />
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-black/30 border border-white/[0.06]">
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Year</p>
                      <p className="text-xl font-extralight text-emerald-300/90">
                        <AnimatedNumber value={yearlyDecay} prefix="$" />
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  key={`headroom-${proposalsPerMonth}-${avgDealSize}-${closeRate}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.08 }}
                  className="space-y-6"
                >
                  <div
                    className="p-8 rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="w-5 h-5 text-zinc-400" />
                      <p className="text-xs tracking-[0.2em] uppercase text-zinc-500">
                        Close-rate headroom
                      </p>
                    </div>
                    <p className="text-3xl md:text-4xl font-extralight text-white mb-3">
                      {closeRate}% → {liftedClose}%
                    </p>
                    <p className="text-sm text-zinc-400 font-light mb-2 leading-relaxed">
                      Same pipeline, stronger finish. That shift means more of the work you already do actually turns into paid business.
                    </p>
                    <p className="text-sm text-zinc-500 font-light">
                      ~<span className="text-zinc-300">{extraDealsFromLift.toFixed(1)}</span> extra deals/month ≈{' '}
                      <span className="text-emerald-400/90">{formatCurrency(monthlyFromCloseHeadroom)}/month</span>
                      <span className="text-zinc-600"> · +{liftedClose - closeRate} pts paid close (cap {RAIL_CLOSE_CEILING}%)</span>
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl border border-white/[0.06] bg-black/20">
                    <p className="text-sm text-zinc-400 font-light leading-relaxed">
                      Elystra strengthens the part of the sale where agencies usually lose control: after buyer interest exists, before the money lands.
                    </p>
                    <p className="text-sm text-zinc-300 font-light leading-relaxed mt-4">
                      The result is simple: more of the same pipeline moves to signed, paid, and collected revenue.
                    </p>
                  </div>

                  <motion.button
                    type="button"
                    onClick={openDemoBooking}
                    className="relative flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-medium text-white overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)',
                      boxShadow: '0 0 40px rgba(139, 92, 246, 0.3)',
                    }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 0 60px rgba(139, 92, 246, 0.4)',
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
                      }}
                    />
                    <span className="relative z-10">Book a 7-Minute Revenue Review</span>
                    <ArrowRight className="w-5 h-5 relative z-10" />
                  </motion.button>
                </motion.div>
              </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BleedingCalculator;
