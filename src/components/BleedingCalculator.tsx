import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowRight, Calculator, Sparkles, TrendingUp } from 'lucide-react';
import { useDemoBooking } from '@/contexts/DemoBookingContext';

const AnimatedNumber = ({
  value,
  prefix = '',
  suffix = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) => {
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
  const [phase, setPhase] = useState<'leak' | 'recovery'>('leak');

  const [proposalsPerMonth, setProposalsPerMonth] = useState(10);
  const [avgDealSize, setAvgDealSize] = useState(15000);
  const [closeRate, setCloseRate] = useState(30);

  const currentMonthlyWonRevenue = proposalsPerMonth * avgDealSize * (closeRate / 100);
  const currentAnnualWonRevenue = currentMonthlyWonRevenue * 12;
  const exposedAfterInterest = proposalsPerMonth * avgDealSize - currentMonthlyWonRevenue;

  const modeledCloseRate = Math.min(closeRate + 12, 55);
  const modeledMonthlyWonRevenue = proposalsPerMonth * avgDealSize * (modeledCloseRate / 100);
  const modeledAnnualWonRevenue = modeledMonthlyWonRevenue * 12;
  const monthlyRecoveredRevenue = modeledMonthlyWonRevenue - currentMonthlyWonRevenue;
  const annualRecoveredRevenue = modeledAnnualWonRevenue - currentAnnualWonRevenue;
  const closeRateHeadroom = modeledCloseRate - closeRate;

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${Math.round(value / 1000)}K`;
    return `$${Math.round(value)}`;
  };

  return (
    <section className="relative overflow-hidden bg-transparent py-16 md:py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-20 left-0 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-60"
          style={{
            background:
              'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0.02) 48%, transparent 68%)',
          }}
        />
        <div
          className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-45"
          style={{
            background:
              'radial-gradient(circle, rgba(217,70,239,0.08) 0%, rgba(217,70,239,0.01) 52%, transparent 68%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mb-5 text-xs font-light uppercase tracking-[0.28em] text-zinc-500">
            Revenue indictment
          </p>
          <h2 className="text-3xl font-extralight leading-[1.06] tracking-[-0.05em] text-white sm:text-4xl md:text-6xl">
            Your pipeline is not the problem.
            <span className="bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-300 bg-clip-text text-transparent">
              {' '}Your finish is.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base font-light leading-[1.65] text-zinc-300 md:text-lg">
            See what your current motion converts today. Then compare it to what the same pipeline can do with a stronger finish.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mx-auto mt-12 max-w-5xl"
        >
          <div className="mb-5 flex flex-col items-center gap-3 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.02] p-1">
              <button
                type="button"
                onClick={() => setPhase('leak')}
                className={`rounded-full px-4 py-2 text-[0.72rem] font-light uppercase tracking-[0.18em] transition-colors ${
                  phase === 'leak' ? 'bg-violet-500/14 text-white' : 'text-zinc-500 hover:text-white'
                }`}
              >
                Leak
              </button>
              <button
                type="button"
                onClick={() => setPhase('recovery')}
                className={`rounded-full px-4 py-2 text-[0.72rem] font-light uppercase tracking-[0.18em] transition-colors ${
                  phase === 'recovery' ? 'bg-violet-500/14 text-white' : 'text-zinc-500 hover:text-white'
                }`}
              >
                Recovery
              </button>
            </div>

            {phase === 'leak' && (
              <motion.button
                type="button"
                onClick={() => setPhase('recovery')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/8 px-4 py-2 text-sm font-light text-violet-100"
              >
                See Recovery
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            )}
          </div>

          {phase === 'leak' ? (
            <div className="rounded-[2rem] border border-white/10 bg-[rgba(10,10,14,0.62)] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.2)] backdrop-blur-[2px] md:p-6">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-zinc-500">
                    Current Motion
                  </p>
                  <h3 className="mt-2 text-2xl font-extralight tracking-[-0.03em] text-white md:text-3xl">
                    What your current motion is converting today.
                  </h3>
                </div>
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(139,92,246,0.14), rgba(255,255,255,0.03))',
                    border: '1px solid rgba(167,139,250,0.16)',
                  }}
                >
                  <Calculator className="h-5 w-5 text-violet-300/80" />
                </div>
              </div>

              <div className="space-y-5">
                <RangeField
                  label="Proposals per month"
                  valueLabel={`${proposalsPerMonth}`}
                  minLabel="1"
                  maxLabel="50"
                  value={proposalsPerMonth}
                  min={1}
                  max={50}
                  onChange={setProposalsPerMonth}
                />

                <RangeField
                  label="Average deal size"
                  valueLabel={formatCurrency(avgDealSize)}
                  minLabel="$1K"
                  maxLabel="$100K"
                  value={avgDealSize}
                  min={1000}
                  max={100000}
                  step={1000}
                  onChange={setAvgDealSize}
                />

                <RangeField
                  label="Current close rate"
                  valueLabel={`${closeRate}%`}
                  minLabel="5%"
                  maxLabel="60%"
                  value={closeRate}
                  min={5}
                  max={60}
                  onChange={setCloseRate}
                />
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <MetricCard
                  label="Current monthly won revenue"
                  value={<AnimatedNumber value={currentMonthlyWonRevenue} prefix="$" />}
                />
                <MetricCard
                  label="Current annualized won revenue"
                  value={<AnimatedNumber value={currentAnnualWonRevenue} prefix="$" />}
                />
                <MetricCard
                  label="Current collected revenue"
                  value={<AnimatedNumber value={currentMonthlyWonRevenue} prefix="$" />}
                  subtle="Per month"
                />
                <MetricCard
                  label="Revenue exposed after interest"
                  value={<AnimatedNumber value={exposedAfterInterest} prefix="$" />}
                  accent
                />
              </div>

              <p className="mt-6 text-sm font-light leading-[1.6] text-zinc-500">
                This is what your current motion is converting today.
              </p>
              <p className="mt-2 text-[0.82rem] font-light leading-[1.6] text-zinc-600">
                No extra leads. No extra headcount. Just your current pipeline under its current finish.
              </p>

              <div className="mt-8 flex justify-center">
                <motion.button
                  type="button"
                  onClick={() => setPhase('recovery')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/8 px-5 py-2.5 text-sm font-light text-violet-100"
                >
                  See Recovery
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="rounded-[2rem] border border-white/10 bg-[rgba(10,10,14,0.62)] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.2)] backdrop-blur-[2px] md:p-6">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-violet-300/80">
                    With Elystra
                  </p>
                  <h3 className="mt-2 text-2xl font-extralight tracking-[-0.03em] text-white md:text-3xl">
                    Same pipeline. Stronger finish.
                  </h3>
                </div>
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(139,92,246,0.18), rgba(168,85,247,0.06))',
                    border: '1px solid rgba(167,139,250,0.18)',
                  }}
                >
                  <TrendingUp className="h-5 w-5 text-violet-200" />
                </div>
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                {['Same pipeline', 'Same team', 'Same demand', 'Stronger finish'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.72rem] font-light uppercase tracking-[0.16em] text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <MetricCard
                  label="Monthly recovered revenue"
                  value={<AnimatedNumber value={monthlyRecoveredRevenue} prefix="$" />}
                  accent
                />
                <MetricCard
                  label="Annual recovered revenue"
                  value={<AnimatedNumber value={annualRecoveredRevenue} prefix="$" />}
                  accent
                />
                <MetricCard
                  label="Close-rate headroom"
                  value={`${closeRate}% → ${modeledCloseRate}%`}
                  subtle={`+${closeRateHeadroom} pts`}
                />
                <MetricCard
                  label="Faster path to collected cash"
                  value="Tighter"
                  subtle="Same-call send. Less post-yes drag."
                />
              </div>

              <div
                className="mt-6 rounded-[1.5rem] border p-4 md:p-5"
                style={{
                  borderColor: 'rgba(139,92,246,0.16)',
                  background:
                    'linear-gradient(145deg, rgba(139,92,246,0.09), rgba(255,255,255,0.02), rgba(10,10,14,0.28))',
                }}
              >
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-zinc-500">
                  Elystra proof
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <ProofStat value="$6.2M" label="Extra revenue for agencies" sub="Q1 2026" />
                  <ProofStat value="55% / 92%" label="Median close rate" sub="Outbound / inbound" />
                  <ProofStat value="62%" label="Cold buyers to loyal accounts" sub="Converted into continuity" />
                </div>
              </div>

              <div className="mt-8 flex flex-col items-center gap-3">
                <motion.button
                  type="button"
                  onClick={() => setPhase('leak')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-light text-zinc-300"
                >
                  Back to Leak
                </motion.button>

                <motion.button
                  type="button"
                  onClick={openDemoBooking}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3 text-sm font-light text-white"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 50%, #a855f7 100%)',
                    boxShadow:
                      '0 0 38px rgba(139,92,246,0.28), inset 0 1px 0 rgba(255,255,255,0.15)',
                  }}
                >
                  <span
                    className="absolute inset-0 -translate-x-full transition-transform duration-700 group-hover:translate-x-full"
                    style={{
                      background:
                        'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.15) 50%, transparent 80%)',
                    }}
                  />
                  <span
                    className="absolute left-1/2 top-0 h-[1px] w-3/4 -translate-x-1/2"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
                    }}
                  />
                  <Sparkles className="relative z-10 h-3.5 w-3.5" />
                  <span className="relative z-10 tracking-wide">Book a 7-Minute Revenue Review</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

function RangeField({
  label,
  valueLabel,
  minLabel,
  maxLabel,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  valueLabel: string;
  minLabel: string;
  maxLabel: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  const fill = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2.5">
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-sm font-light text-zinc-500">{label}</label>
        <span className="text-2xl font-extralight tabular-nums text-white md:text-3xl">
          {valueLabel}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="h-2 w-full appearance-none rounded-full bg-white/5 cursor-pointer
                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                   [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
                   [&::-webkit-slider-thumb]:shadow-[0_0_18px_rgba(139,92,246,0.45)]"
        />
        <div
          className="pointer-events-none absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r from-violet-500/40 via-violet-400/35 to-violet-300/25"
          style={{ width: `${fill}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-zinc-600">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  subtle,
  accent = false,
}: {
  label: string;
  value: React.ReactNode;
  subtle?: string;
  accent?: boolean;
}) {
  return (
    <div
      className="rounded-[1.35rem] border p-4"
      style={{
        borderColor: accent ? 'rgba(139,92,246,0.18)' : 'rgba(255,255,255,0.08)',
        background: accent
          ? 'linear-gradient(145deg, rgba(139,92,246,0.09), rgba(255,255,255,0.02))'
          : 'linear-gradient(145deg, rgba(255,255,255,0.025), rgba(255,255,255,0.015))',
      }}
    >
      <p className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-extralight tracking-[-0.03em] text-white md:text-3xl">
        {value}
      </p>
      {subtle && <p className="mt-1.5 text-sm font-light text-zinc-500">{subtle}</p>}
    </div>
  );
}

function ProofStat({
  value,
  label,
  sub,
}: {
  value: string;
  label: string;
  sub: string;
}) {
  return (
    <div className="rounded-[1.2rem] border border-white/8 bg-black/10 p-3.5">
      <p className="text-2xl font-extralight tracking-[-0.03em] text-white">{value}</p>
      <p className="mt-1 text-sm font-light leading-[1.4] text-zinc-300">{label}</p>
      <p className="mt-1 text-[0.72rem] font-light uppercase tracking-[0.16em] text-zinc-500">
        {sub}
      </p>
    </div>
  );
}

export default BleedingCalculator;
