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
    <section className="relative py-10 md:py-14 overflow-hidden bg-transparent min-h-0">
      {/* Atmosphere: white + gray + violet only */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-24 left-0 w-[720px] h-[720px] rounded-full opacity-70 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0.02) 45%, transparent 65%)',
          }}
        />
        <div
          className="absolute top-1/3 -right-32 w-[520px] h-[520px] rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.07) 0%, transparent 55%)',
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] opacity-50"
          style={{
            background: 'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(255, 255, 255, 0.04) 0%, transparent 55%)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-35"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.035) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Hero: full-bleed copy on the page — no box, no glass */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="flex items-center justify-center gap-2 text-xs tracking-[0.28em] uppercase text-zinc-500 font-light mb-5 md:mb-6">
            <AlertTriangle
              className="w-3.5 h-3.5 shrink-0 text-violet-500/50"
              aria-hidden
            />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-400 to-violet-400/80">
              Leak → recovery · same pipeline
            </span>
          </p>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight leading-[1.1] text-balance bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-100 to-violet-300/90"
            style={{ WebkitBackgroundClip: 'text' }}
          >
            First the leak. Then the recovery.
          </h2>
        </motion.header>
      </div>

      {/* Product proof: model sits below, on the same environment (no frame) */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.65, delay: 0.05 }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 mt-12 md:mt-16 pt-10 md:pt-12"
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-[min(100%,28rem)] pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.35), rgba(139, 92, 246, 0.25), rgba(167, 139, 250, 0.35), transparent)',
          }}
        />
        <p className="text-center text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-zinc-500 mb-4 md:mb-5">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-500 via-violet-400/70 to-zinc-500">
            Pipeline model
          </span>
        </p>
        <div className="flex flex-col gap-2 md:gap-3">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <div className="flex items-center gap-2" role="tablist" aria-label="Calculator phase">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={phaseIndex === 0}
                    onClick={() => scrollToPhase(0)}
                    className={`rounded-full px-4 py-1.5 text-xs tracking-wide transition-colors ${
                      phaseIndex === 0
                        ? 'bg-violet-500/15 text-white border border-violet-400/35 shadow-[0_0_28px_rgba(139,92,246,0.12)]'
                        : 'text-zinc-500 border border-transparent hover:text-violet-300/80'
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
                        ? 'bg-violet-500/15 text-white border border-violet-400/35 shadow-[0_0_28px_rgba(139,92,246,0.12)]'
                        : 'text-zinc-500 border border-transparent hover:text-violet-300/80'
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
                  <div className="relative flex items-center gap-2 mb-3">
                    <span className="text-[10px] tracking-[0.35em] uppercase text-zinc-500 font-medium">
                      Leak
                    </span>
                    <span
                      className="h-px flex-1 max-w-[100px]"
                      style={{
                        background: 'linear-gradient(90deg, rgba(167, 139, 250, 0.35), transparent)',
                      }}
                    />
                    <span className="text-[11px] text-zinc-500 font-light hidden min-[400px]:inline">What your motion leaves on the table</span>
                  </div>

                  <div className="relative grid md:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
              {/* Inputs */}
              <div className="space-y-4 md:space-y-5">
                <div className="flex items-center gap-3 mb-2 md:mb-3">
                  <div
                    className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(255, 255, 255, 0.03), rgba(139, 92, 246, 0.06))',
                      border: '1px solid rgba(167, 139, 250, 0.2)',
                    }}
                  >
                    <Calculator className="w-4 h-4 md:w-5 md:h-5 text-violet-300/80" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-base md:text-lg font-extralight text-white tracking-wide block leading-tight">Your current sales motion</span>
                    <span className="text-[11px] text-zinc-600 font-light">The pipeline you already generate today</span>
                  </div>
                </div>

                {/* Proposals per month */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-baseline gap-2">
                    <label className="text-xs md:text-sm text-zinc-500 font-light">Proposals sent per month</label>
                    <motion.span 
                      key={proposalsPerMonth}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl md:text-3xl font-extralight text-white tabular-nums"
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
                               [&::-webkit-slider-thumb]:shadow-[0_0_18px_rgba(139,92,246,0.45)]
                               [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-300
                               [&::-webkit-slider-thumb]:hover:shadow-[0_0_26px_rgba(167,139,250,0.5)]"
                    />
                    {/* Track fill */}
                    <div
                      className="absolute top-0 left-0 h-2 rounded-full pointer-events-none bg-gradient-to-r from-violet-500/40 via-violet-400/35 to-violet-300/25"
                      style={{ width: `${(proposalsPerMonth / 50) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-zinc-600">
                    <span>1</span>
                    <span>50</span>
                  </div>
                </div>

                {/* Average deal size */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-baseline gap-2">
                    <label className="text-xs md:text-sm text-zinc-500 font-light">Average deal size</label>
                    <motion.span 
                      key={avgDealSize}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl md:text-3xl font-extralight text-white tabular-nums"
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
                               [&::-webkit-slider-thumb]:shadow-[0_0_18px_rgba(139,92,246,0.45)]"
                    />
                    <div
                      className="absolute top-0 left-0 h-2 rounded-full pointer-events-none bg-gradient-to-r from-violet-500/40 via-violet-400/35 to-violet-300/25"
                      style={{ width: `${((avgDealSize - 1000) / 99000) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-zinc-600">
                    <span>$1K</span>
                    <span>$100K</span>
                  </div>
                  {/* Quick select */}
                  <div className="flex gap-1.5 flex-wrap">
                    {[5000, 10000, 15000, 25000, 50000].map((val) => (
                      <motion.button
                        key={val}
                        onClick={() => setAvgDealSize(val)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-2.5 py-1.5 text-[11px] rounded-lg border transition-all duration-300 ${
                          avgDealSize === val
                            ? 'bg-violet-500/15 border-violet-400/40 text-white shadow-[0_0_20px_rgba(139,92,246,0.15)]'
                            : 'bg-transparent border-white/[0.06] text-zinc-500 hover:border-violet-500/25 hover:text-violet-200/90'
                        }`}
                      >
                        ${val / 1000}k
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Current close rate */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-baseline gap-2">
                    <label className="text-xs md:text-sm text-zinc-500 font-light">Current close rate</label>
                    <motion.span 
                      key={closeRate}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl md:text-3xl font-extralight text-white tabular-nums"
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
                               [&::-webkit-slider-thumb]:shadow-[0_0_18px_rgba(139,92,246,0.45)]"
                    />
                    <div
                      className="absolute top-0 left-0 h-2 rounded-full pointer-events-none bg-gradient-to-r from-violet-500/40 via-violet-400/35 to-violet-300/25"
                      style={{ width: `${((closeRate - 5) / 55) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-zinc-600">
                    <span>5%</span>
                    <span>60%</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-violet-500/10">
                  <p className="text-[10px] md:text-[11px] text-zinc-600 font-light leading-snug">
                    Conservative model. A meaningful share of “lost” deals are leaking through delay, weak follow-up, and fragmented commitment.
                  </p>
                </div>
              </div>

              {/* Phase 1 — leak output */}
              <div>
                <div className="flex items-center gap-3 mb-2 md:mb-3">
                  <div
                    className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      border: '1px solid rgba(167, 139, 250, 0.22)',
                      background:
                        'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(24, 24, 27, 0.4))',
                    }}
                  >
                    <TrendingDown className="w-4 h-4 md:w-5 md:h-5 text-violet-300/70" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-base md:text-lg font-extralight text-white tracking-wide block leading-tight">What you&apos;re leaking</span>
                    <span className="text-[11px] text-zinc-600 font-light">Revenue left exposed</span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${proposalsPerMonth}-${avgDealSize}-${closeRate}`}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-3"
                  >
                    {/* Monthly decay - MAIN NUMBER */}
                    <div
                      className="relative p-4 md:p-5 rounded-xl overflow-hidden"
                      style={{
                        border: '1px solid rgba(139, 92, 246, 0.18)',
                        background:
                          'linear-gradient(160deg, rgba(139, 92, 246, 0.08) 0%, rgba(24, 24, 27, 0.35) 50%, rgba(24, 24, 27, 0.2) 100%)',
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-50 pointer-events-none"
                        style={{
                          background:
                            'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(167, 139, 250, 0.12), transparent 55%)',
                        }}
                      />
                      <div className="relative">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Flame className="w-3.5 h-3.5 text-violet-500/50 shrink-0" />
                          <p className="text-[10px] tracking-[0.15em] uppercase text-zinc-500">
                            Monthly revenue leaking
                          </p>
                        </div>
                        <p className="text-4xl sm:text-5xl md:text-6xl font-extralight leading-none tabular-nums text-white [text-shadow:0_0_40px_rgba(139,92,246,0.25),0_0_80px_rgba(139,92,246,0.1)]">
                          <AnimatedNumber value={monthlyDecay} prefix="$" />
                        </p>
                        <p className="text-[11px] text-zinc-500 mt-2 font-light leading-snug">
                          ~{recoverableDeals.toFixed(1)} deals/mo with interest on the table
                        </p>
                      </div>
                    </div>

                    {/* Quarterly & Yearly */}
                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                      <div
                        className="p-3 md:p-4 rounded-xl"
                        style={{
                          border: '1px solid rgba(167, 139, 250, 0.12)',
                          background:
                            'linear-gradient(145deg, rgba(139, 92, 246, 0.06), rgba(255, 255, 255, 0.02))',
                        }}
                      >
                        <p className="text-[10px] text-zinc-500 mb-1 font-light">Per Quarter</p>
                        <p className="text-xl md:text-2xl font-extralight text-zinc-100 tabular-nums">
                          <AnimatedNumber value={quarterlyDecay} prefix="$" />
                        </p>
                      </div>
                      <div
                        className="p-3 md:p-4 rounded-xl"
                        style={{
                          border: '1px solid rgba(167, 139, 250, 0.12)',
                          background:
                            'linear-gradient(145deg, rgba(139, 92, 246, 0.06), rgba(255, 255, 255, 0.02))',
                        }}
                      >
                        <p className="text-[10px] text-zinc-500 mb-1 font-light">Per Year</p>
                        <p className="text-xl md:text-2xl font-extralight text-zinc-100 tabular-nums">
                          <AnimatedNumber value={yearlyDecay} prefix="$" />
                        </p>
                      </div>
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

                  <div className="mt-3 flex flex-col items-center gap-1 text-center border-t border-violet-500/10 pt-3">
                    <div className="flex items-center justify-center gap-1.5 text-zinc-500 text-[10px] tracking-wide uppercase">
                      <Layers className="w-3.5 h-3.5 text-violet-500/50 shrink-0" />
                      Same pipeline · stronger motion
                    </div>
                    <p className="text-[10px] text-zinc-600 font-light max-w-md">
                      Swipe or tap <span className="text-violet-400/80">Recovery</span> for the second view.
                    </p>
                  </div>
                </div>

                {/* ——— Panel 2: Recovery ——— */}
                <div className="min-w-full w-full shrink-0 snap-center snap-always box-border pl-1 md:pl-2">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-[10px] tracking-[0.35em] uppercase text-zinc-500 font-medium">
                      Recovery
                    </span>
                    <span
                      className="h-px flex-1 min-w-[80px]"
                      style={{
                        background: 'linear-gradient(90deg, rgba(167, 139, 250, 0.35), transparent)',
                      }}
                    />
                    <span className="text-[11px] text-zinc-500 font-light">Same pipeline, rail in place</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                <motion.div
                  key={`delta-${proposalsPerMonth}-${avgDealSize}-${closeRate}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                  className="relative p-4 md:p-5 rounded-xl overflow-hidden md:col-span-1"
                  style={{
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    background:
                      'linear-gradient(165deg, rgba(139, 92, 246, 0.1) 0%, rgba(24, 24, 27, 0.3) 55%, rgba(0,0,0,0.2) 100%)',
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-50 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse 100% 80% at 30% 0%, rgba(167, 139, 250, 0.1), transparent 58%)',
                    }}
                  />
                  <div className="relative flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-violet-400/60 shrink-0" />
                    <p className="text-[10px] tracking-[0.15em] uppercase text-zinc-500">
                      Monthly value recaptured
                    </p>
                  </div>
                  <p className="text-4xl sm:text-5xl md:text-6xl font-extralight mb-2 leading-none tabular-nums text-white [text-shadow:0_0_40px_rgba(139,92,246,0.28),0_0_88px_rgba(167,139,250,0.12)]">
                    <AnimatedNumber value={monthlyDecay} prefix="$" />
                  </p>
                  <p className="text-[11px] text-zinc-400 font-light leading-snug">
                    Value pulled back from the same pipeline—stronger finish from interest to cash.
                  </p>
                  <div
                    className="mt-3 p-2.5 rounded-lg"
                    style={{
                      border: '1px solid rgba(167, 139, 250, 0.12)',
                      background:
                        'linear-gradient(130deg, rgba(139, 92, 246, 0.05), rgba(255, 255, 255, 0.02))',
                    }}
                  >
                    <p className="text-[10px] tracking-wide uppercase text-zinc-500 mb-1">What we see</p>
                    <p className="text-[11px] text-zinc-400 font-light leading-snug">
                      Teams often recover{' '}
                      <span className="text-violet-200/90">1–2 deals</span> in the first weeks, then a cleaner finish
                      on the rest.
                    </p>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div
                      className="p-2.5 rounded-lg"
                      style={{
                        border: '1px solid rgba(139, 92, 246, 0.12)',
                        background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.06), rgba(24, 24, 27, 0.5))',
                      }}
                    >
                      <p className="text-[9px] uppercase tracking-wider text-zinc-500 mb-0.5">Quarter</p>
                      <p className="text-lg font-extralight text-zinc-100 tabular-nums">
                        <AnimatedNumber value={quarterlyDecay} prefix="$" />
                      </p>
                    </div>
                    <div
                      className="p-2.5 rounded-lg"
                      style={{
                        border: '1px solid rgba(139, 92, 246, 0.12)',
                        background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.06), rgba(24, 24, 27, 0.5))',
                      }}
                    >
                      <p className="text-[9px] uppercase tracking-wider text-zinc-500 mb-0.5">Year</p>
                      <p className="text-lg font-extralight text-zinc-100 tabular-nums">
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
                  className="space-y-3 flex flex-col"
                >
                  <div
                    className="p-4 rounded-xl"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(139, 92, 246, 0.07), rgba(255, 255, 255, 0.02), rgba(24, 24, 27, 0.4))',
                      border: '1px solid rgba(167, 139, 250, 0.15)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-zinc-400 shrink-0" />
                      <p className="text-[10px] tracking-wide uppercase text-zinc-500">
                        Close-rate headroom
                      </p>
                    </div>
                    <p className="text-2xl md:text-3xl font-extralight text-white mb-1.5 tabular-nums">
                      {closeRate}% → {liftedClose}%
                    </p>
                    <p className="text-[11px] text-zinc-500 font-light leading-snug">
                      ~<span className="text-zinc-300">{extraDealsFromLift.toFixed(1)}</span> extra deals/mo ≈{' '}
                      <span className="text-violet-200/90">{formatCurrency(monthlyFromCloseHeadroom)}/mo</span>
                      <span className="text-zinc-600"> · +{liftedClose - closeRate} pts (cap {RAIL_CLOSE_CEILING}%)</span>
                    </p>
                  </div>

                  <div
                    className="p-3 rounded-xl"
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      background:
                        'linear-gradient(160deg, rgba(82, 82, 91, 0.25) 0%, rgba(24, 24, 27, 0.55) 100%)',
                    }}
                  >
                    <p className="text-[11px] text-zinc-400 font-light leading-snug">
                      Control where it usually breaks: after interest, before money. More pipeline → signed and collected.
                    </p>
                  </div>

                  <motion.button
                    type="button"
                    onClick={openDemoBooking}
                    className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-violet-500 to-violet-600 py-3.5 text-sm font-medium text-white mt-auto"
                    style={{
                      boxShadow: '0 0 40px rgba(139, 92, 246, 0.32)',
                    }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 0 56px rgba(167, 139, 250, 0.38)',
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
        </motion.div>
    </section>
  );
};

export default BleedingCalculator;
