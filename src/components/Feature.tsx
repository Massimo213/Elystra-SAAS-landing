// sections/Feature.tsx
// Exceptionally designed outcomes section. Warm palette. Seamless with global backdrop.
// Includes interactive ROI calculator (recharts), marquee integrations, and greedy benefit framing.

import { useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Zap, Crown, Shield, CreditCard, Building2, FileSpreadsheet, Mail, Link2, FileText } from 'lucide-react';
import { featureData } from '@/constants';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from 'recharts';

/* --------------------------------
   Little utils
----------------------------------*/
const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');

/* --------------------------------
   Ambient particles — warm palette (no blue)
----------------------------------*/
const FloatingParticle = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full"
    style={{
      background:
        'linear-gradient(90deg, rgba(251,146,60,1), rgba(244,63,94,1), rgba(217,70,239,1))',
    }}
    animate={{ y: [-18, -54, -18], x: [0, 28, 0], opacity: [0, 1, 0], scale: [0, 1, 0] }}
    transition={{ duration: 4, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

/* --------------------------------
   Feature Card
----------------------------------*/
type FeatureItem = {
  icon: React.ReactNode;
  iconBoxColor: string;
  title: string;
  benefit: string;
  desc: string;
};

const FeatureCard = ({
  f,
  index,
  active,
  onClick,
}: {
  f: FeatureItem;
  index: number;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={cn(
        'relative overflow-hidden rounded-3xl cursor-pointer group',
        'bg-white/[0.04] backdrop-blur-xl border border-white/10',
        active ? 'ring-2 ring-amber-400/40 shadow-[0_0_40px_rgba(251,146,60,0.25)]' : ''
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Ambient */}
      {[...Array(5)].map((_, i) => (
        <FloatingParticle key={i} delay={i * 0.38} />
      ))}

      {/* Hover glow */}
      <motion.div
        className="pointer-events-none absolute -inset-1 rounded-3xl blur-md opacity-0 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(90deg, rgba(251,146,60,0.35), rgba(244,63,94,0.35), rgba(217,70,239,0.35))',
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10 p-7">
        <div className="mb-5 flex items-center gap-3">
          <div className={cn('w-14 h-14 rounded-2xl grid place-items-center text-white', f.iconBoxColor, 'relative overflow-hidden')}>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-25 transition" />
            {f.icon}
            {index > 0 && (
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 grid place-items-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Crown size={12} className="text-white" />
              </motion.div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-[linear-gradient(90deg,#f8fafc,#e2e8f0)]">
              {f.title}
            </h3>
            <p className="text-amber-200/90 text-[13px]">{f.benefit}</p>
          </div>
        </div>

        <p className="text-slate-200/90 leading-relaxed text-[15px]">{f.desc}</p>

        <div className="mt-5">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium border border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07] transition">
            Show me the money <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Progress bar on enter */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 rounded-br-3xl"
        style={{
          background:
            'linear-gradient(90deg, rgba(251,146,60,1), rgba(244,63,94,1), rgba(217,70,239,1))',
        }}
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        transition={{ duration: 1.2, delay: index * 0.08 }}
      />

      {/* Minimal overlay when active */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="absolute inset-0 rounded-3xl bg-black/60 backdrop-blur-xl grid place-items-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center px-8 py-10">
              <motion.div
                className="w-14 h-14 mx-auto mb-4 rounded-full grid place-items-center bg-gradient-to-r from-amber-500 to-rose-600"
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                <Zap className="text-white" size={22} />
              </motion.div>
              <h4 className="text-white text-lg font-semibold mb-2">{f.title}</h4>
              <p className="text-slate-300 text-sm max-w-md">{f.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* --------------------------------
   Integrations Marquee (warm, subtle)
----------------------------------*/
const Integrations = () => {
  const items = [
    { icon: <CreditCard size={18} />, label: 'Stripe' },
    { icon: <FileSpreadsheet size={18} />, label: 'Google Sheets' },
    { icon: <FileText size={18} />, label: 'Google Docs' },
    { icon: <Mail size={18} />, label: 'Gmail' },
    { icon: <Building2 size={18} />, label: 'HubSpot' },
    { icon: <Link2 size={18} />, label: 'Slack' },
  ];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md py-3">
      <div className="absolute inset-0 pointer-events-none" style={{ maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)' }} />
      <motion.div
        className="flex items-center gap-6 px-6"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        style={{ width: '200%' }}
      >
        {[...items, ...items].map((it, i) => (
          <div key={i} className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04]">
            <span className="text-white/90">{it.icon}</span>
            <span className="text-[13px] text-white/80">{it.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* --------------------------------
   ROI Calculator — interactive + chart
----------------------------------*/
type CalcState = {
  dealSize: number;
  proposalsPerWeek: number;
  closeRate: number; // baseline %
  uplift: number; // % absolute uplift (from better speed/fit)
  depositPct: number; // immediate cash %
};

const formatCurrency = (n: number) =>
  n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const ROICalculator = () => {
  const [s, setS] = useState<CalcState>({
    dealSize: 5000,
    proposalsPerWeek: 8,
    closeRate: 0.25,
    uplift: 0.12,
    depositPct: 0.4,
  });

  const monthly = useMemo(() => {
    const weeks = 4;
    const sends = s.proposalsPerWeek * weeks;
    const newClose = Math.min(0.95, s.closeRate + s.uplift);
    const oldWins = sends * s.closeRate;
    const newWins = sends * newClose;

    const oldDeposits = oldWins * s.dealSize * s.depositPct;
    const newDeposits = newWins * s.dealSize * s.depositPct;

    const upliftCash = newDeposits - oldDeposits;

    const data = Array.from({ length: 12 }).map((_, i) => {
      const monthFactor = 1 + i * 0.02; // modest growth signal
      return {
        m: `M${i + 1}`,
        old: oldDeposits * monthFactor,
        withElystra: newDeposits * monthFactor,
      };
    });

    return {
      sends,
      oldWins,
      newWins,
      oldDeposits,
      newDeposits,
      upliftCash,
      data,
    };
  }, [s]);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Controls */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6">
        <h4 className="text-white font-semibold mb-4">ROI Calculator</h4>

        <div className="grid gap-4">
          {/* Deal size */}
          <div>
            <label className="text-[12px] text-white/70">Average deal size</label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="range"
                min={1000}
                max={50000}
                step={500}
                value={s.dealSize}
                onChange={(e) => setS((p) => ({ ...p, dealSize: Number(e.target.value) }))}
                className="w-full"
              />
              <span className="text-white/85 text-sm w-28 text-right">{formatCurrency(s.dealSize)}</span>
            </div>
          </div>
          {/* Proposals per week */}
          <div>
            <label className="text-[12px] text-white/70">Proposals per week</label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="range"
                min={1}
                max={40}
                step={1}
                value={s.proposalsPerWeek}
                onChange={(e) => setS((p) => ({ ...p, proposalsPerWeek: Number(e.target.value) }))}
                className="w-full"
              />
              <span className="text-white/85 text-sm w-28 text-right">{s.proposalsPerWeek} / wk</span>
            </div>
          </div>
          {/* Close rate baseline */}
          <div>
            <label className="text-[12px] text-white/70">Baseline close rate</label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="range"
                min={0.05}
                max={0.6}
                step={0.01}
                value={s.closeRate}
                onChange={(e) => setS((p) => ({ ...p, closeRate: Number(e.target.value) }))}
                className="w-full"
              />
              <span className="text-white/85 text-sm w-28 text-right">{Math.round(s.closeRate * 100)}%</span>
            </div>
          </div>
          {/* Uplift */}
          <div>
            <label className="text-[12px] text-white/70">Win‑rate uplift with Elystra</label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="range"
                min={0.02}
                max={0.35}
                step={0.01}
                value={s.uplift}
                onChange={(e) => setS((p) => ({ ...p, uplift: Number(e.target.value) }))}
                className="w-full"
              />
              <span className="text-white/85 text-sm w-28 text-right">+{Math.round(s.uplift * 100)} pts</span>
            </div>
          </div>
          {/* Deposit percent */}
          <div>
            <label className="text-[12px] text-white/70">Deposit collected on signature</label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="range"
                min={0.1}
                max={0.9}
                step={0.05}
                value={s.depositPct}
                onChange={(e) => setS((p) => ({ ...p, depositPct: Number(e.target.value) }))}
                className="w-full"
              />
              <span className="text-white/85 text-sm w-28 text-right">{Math.round(s.depositPct * 100)}%</span>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[12px] text-white/70">Immediate deposits / mo</p>
            <p className="text-lg font-semibold text-white">{formatCurrency(monthly.newDeposits)}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[12px] text-white/70">Extra cash vs old way</p>
            <p className="text-lg font-semibold text-emerald-300">{formatCurrency(monthly.upliftCash)}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[12px] text-white/70">Wins / month</p>
            <p className="text-lg font-semibold text-white">{Math.round(monthly.newWins)}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[12px] text-white/70">Sends / month</p>
            <p className="text-lg font-semibold text-white">{monthly.sends}</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6">
        <h4 className="text-white font-semibold mb-4">Projected deposits (next 12 months)</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthly.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gOld" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.7}/>
                  <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="gNew" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fb923c" stopOpacity={0.85}/>
                  <stop offset="50%" stopColor="#f43f5e" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#d946ef" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="m" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ stroke: 'rgba(255,255,255,0.2)' }}
                contentStyle={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }}
                formatter={(v: number) => [formatCurrency(v), '']}
              />
              <Area type="monotone" dataKey="old" stroke="#94a3b8" strokeWidth={1.5} fill="url(#gOld)" />
              <Area type="monotone" dataKey="withElystra" stroke="#fb923c" strokeWidth={2} fill="url(#gNew)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-3 text-[12px] text-white/60">
          Includes baseline vs Elystra with your inputs. Not a guarantee—shows impact of faster sends and higher win‑rate.
        </p>
      </div>
    </div>
  );
};

/* --------------------------------
   Main Feature Section
----------------------------------*/
const Feature = () => {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <div id="feature" ref={containerRef}>
      <section className="section relative overflow-hidden">
        {/* Ambient accents — warm */}
        <motion.div className="absolute inset-0 opacity-30" style={{ y }}>
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, rgba(251,146,60,1), rgba(244,63,94,1), rgba(217,70,239,1))',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, delay: Math.random() * 3 }}
            />
          ))}
        </motion.div>

        <motion.div style={{ opacity }} className="container relative z-10">
          {/* Header */}
          <div className="section-head text-center max-w-5xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md mb-5"
            >
              <Sparkles className="text-amber-400" size={16} />
              <span className="text-[12px] text-white/85 tracking-wide uppercase">
                {featureData.sectionSubtitle}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black leading-tight text-transparent bg-clip-text bg-[linear-gradient(90deg,#f8fafc,#e2e8f0)]"
            >
              {featureData.sectionTitle}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 text-slate-300 max-w-3xl mx-auto"
            >
              {featureData.sectionText}
            </motion.p>
          </div>

          {/* Integrations Marquee */}
          <div className="mb-10">
            <Integrations />
          </div>

          {/* Greed-first outcome grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {featureData.features.map((f: FeatureItem, i: number) => (
              <FeatureCard key={i} f={f} index={i} active={active === i} onClick={() => setActive(i)} />
            ))}
          </div>

          {/* ROI Calculator */}
          <div className="mt-16">
            <ROICalculator />
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <a href="https://app.elystra.online/">
              <button
                className="px-8 py-4 rounded-2xl text-white font-bold text-lg relative overflow-hidden
                           border border-white/10 bg-white/[0.04] backdrop-blur-md
                           hover:border-white/20 hover:bg-white/[0.07] transition"
              >
                <span
                  className="absolute inset-0 -z-10"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(251,146,60,0.55), rgba(244,63,94,0.55), rgba(217,70,239,0.55))',
                    filter: 'blur(18px)',
                    opacity: 0.6,
                  }}
                />
                <span className="inline-flex items-center gap-2">
                  <Shield size={18} />
                  Start Free — collect deposits this week
                </span>
              </button>
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Feature;
