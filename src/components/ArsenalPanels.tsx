/**
 * ArsenalPanels.tsx
 * ELYSTRA — Living product panels for the FullArsenal rail.
 *
 * These are NOT screenshots and NOT a CRM. They are faithful, dependency-free
 * reconstructions of the real Elystra surfaces, running one coherent story:
 * a single deal — "Apex Media" — weaponised across the entire rail.
 *
 * 3 panels per tab. A CRM stores. Elystra reads, predicts, collects, and fires.
 *
 *   SCOPE  → Build (call→priced scope) · Sign & Pay (one screen) · Automate (ops cascade)
 *   INTEL  → Signal (comparison-shopping) · X-Ray (attention map) · Forecast (prediction engine)
 *   CLOSE  → Autopsy (death map) · War Room (AI rescue) · Velocity (sent→cash)
 *   CLIENT → Health (churn/expansion) · Concentration (portfolio risk) · Portal (auto-billing)
 */

import { memo, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Lock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  PenLine,
  CreditCard,
  Check,
  Database,
  FileCheck2,
  FolderPlus,
  Bell,
  Mail,
  Eye,
  Clock,
  AlertTriangle,
  ScanLine,
  Users,
  TrendingDown,
  TrendingUp,
  Gauge,
  PieChart,
  Repeat,
  Zap,
} from 'lucide-react';

/* ════════════════════════════════════════════════════════════════════════
   SHARED PRIMITIVES — Elystra dark-glass design language
   ════════════════════════════════════════════════════════════════════════ */

type Tone = 'violet' | 'red' | 'emerald' | 'amber';

const TONE_PILL: Record<Tone, string> = {
  violet: 'text-violet-300 border-violet-400/25 bg-violet-500/10',
  red: 'text-red-300 border-red-400/25 bg-red-500/10',
  emerald: 'text-emerald-300 border-emerald-400/25 bg-emerald-500/10',
  amber: 'text-amber-300 border-amber-400/25 bg-amber-500/10',
};

const PanelShell = ({
  kicker,
  title,
  status,
  statusTone = 'violet',
  footer,
  children,
}: {
  kicker: string;
  title: string;
  status?: string;
  statusTone?: Tone;
  footer?: ReactNode;
  children: ReactNode;
}) => (
  <div className="relative w-full overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-[rgba(8,8,12,0.82)] shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    <div
      className="pointer-events-none absolute -top-16 right-6 h-40 w-40 rounded-full blur-3xl opacity-40"
      style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4), transparent 65%)' }}
    />

    <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3 md:px-5">
      <div className="flex items-center gap-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </div>
        <span className="ml-1 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-zinc-500">
          {kicker}
        </span>
      </div>
      {status && (
        <span className={`rounded-full border px-2.5 py-0.5 text-[0.6rem] font-medium uppercase tracking-[0.16em] ${TONE_PILL[statusTone]}`}>
          {status}
        </span>
      )}
    </div>

    <div className="px-4 py-4 md:px-6 md:py-5">
      <h4 className="mb-4 text-sm font-light text-white/90 md:text-base">{title}</h4>
      {children}
    </div>

    {footer && (
      <div className="border-t border-white/[0.06] px-4 py-2.5 md:px-6">
        <p className="flex items-center gap-1.5 text-[0.62rem] leading-relaxed text-zinc-500">{footer}</p>
      </div>
    )}
  </div>
);

const Bar = ({ pct, tone, delay = 0 }: { pct: number; tone: string; delay?: number }) => (
  <div className="h-full w-full overflow-hidden rounded-md bg-white/[0.03]">
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${Math.max(pct, 3)}%` }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`h-full rounded-md ${tone}`}
    />
  </div>
);

const Ring = ({ score, label, tone }: { score: number; label: string; tone: 'red' | 'emerald' }) => {
  const r = 34;
  const c = 2 * Math.PI * r;
  const progress = (Math.min(score, 100) / 100) * c;
  const stroke = tone === 'emerald' ? 'stroke-emerald-400' : 'stroke-red-400';
  const text = tone === 'emerald' ? 'text-emerald-400' : 'text-red-400';
  const glow = tone === 'emerald' ? 'rgba(52,211,153,0.45)' : 'rgba(248,113,113,0.45)';

  return (
    <div className="relative flex items-center justify-center">
      <svg width="92" height="92" className="-rotate-90">
        <circle cx="46" cy="46" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
        <motion.circle
          cx="46"
          cy="46"
          r={r}
          fill="none"
          className={stroke}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c - progress }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: `drop-shadow(0 0 6px ${glow})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-extralight tracking-tight ${text}`}>{score}</span>
        <span className="text-[0.5rem] uppercase tracking-[0.2em] text-zinc-600">{label}</span>
      </div>
    </div>
  );
};

const engDot = (eng: 'hot' | 'warm' | 'cold') =>
  eng === 'hot' ? 'bg-red-400' : eng === 'warm' ? 'bg-amber-400' : 'bg-zinc-600';

const Row = ({
  children,
  i = 0,
  tone = 'plain',
}: {
  children: ReactNode;
  i?: number;
  tone?: 'plain' | 'violet' | 'red' | 'emerald' | 'amber' | 'orange';
}) => {
  const bg = {
    plain: 'bg-white/[0.02] border-white/[0.04]',
    violet: 'bg-violet-500/[0.05] border-violet-500/20',
    red: 'bg-red-500/[0.05] border-red-500/20',
    emerald: 'bg-emerald-500/[0.05] border-emerald-500/20',
    amber: 'bg-amber-500/[0.05] border-amber-500/20',
    orange: 'bg-orange-500/[0.05] border-orange-500/20',
  }[tone];
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 + i * 0.07 }}
      className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${bg}`}
    >
      {children}
    </motion.div>
  );
};

/* ════════════════════════════════════════════════════════════════════════
   SCOPE — Proposal Builder weapon
   ════════════════════════════════════════════════════════════════════════ */

const ScopeBuildPanel = memo(() => (
  <PanelShell
    kicker="Proposal Builder"
    title="Apex Media — Growth Retainer"
    status="Generated · 47s"
    statusTone="violet"
    footer={<><Lock className="h-3 w-3 text-emerald-400/70" /> Pricing, terms &amp; deposit locked to your standard</>}
  >
    <div className="mb-4 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300">
        <FileText className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs text-zinc-300">Discovery call · 38 min · uploaded</p>
        <p className="text-[0.62rem] text-zinc-600">Scope, deliverables &amp; pricing extracted automatically</p>
      </div>
      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-zinc-600" />
    </div>

    <div className="space-y-2">
      {[
        { k: 'Paid media management', v: '3 platforms' },
        { k: 'Creative production', v: '12 assets / mo' },
        { k: 'Conversion tracking + reporting', v: 'Weekly' },
      ].map((row, i) => (
        <Row key={row.k} i={i}>
          <span className="flex items-center gap-2 text-xs text-zinc-300">
            <span className="h-1 w-1 rounded-full bg-violet-400" />
            {row.k}
          </span>
          <span className="ml-auto text-[0.68rem] text-zinc-500">{row.v}</span>
        </Row>
      ))}
    </div>

    <div className="mt-4 grid grid-cols-2 gap-2">
      <div className="rounded-xl border border-violet-500/15 bg-violet-500/[0.06] px-3 py-3">
        <p className="text-[0.58rem] uppercase tracking-[0.18em] text-violet-300/70">Investment</p>
        <p className="mt-1 text-xl font-extralight tracking-tight text-white">$24,000</p>
        <p className="text-[0.6rem] text-zinc-500">50% deposit on signature</p>
      </div>
      <div className="flex flex-col justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3">
        <span className="flex items-center gap-1.5 text-[0.62rem] text-emerald-300/80">
          <Sparkles className="h-3 w-3" /> Sent while intent is hot
        </span>
        <span className="mt-2 flex items-center gap-1.5 text-[0.62rem] text-zinc-400">
          <ShieldCheck className="h-3 w-3 text-zinc-500" /> On-brand &amp; compliant
        </span>
      </div>
    </div>
  </PanelShell>
));
ScopeBuildPanel.displayName = 'ScopeBuildPanel';

const SignPayPanel = memo(() => (
  <PanelShell
    kicker="Sign + Pay · one screen"
    title="Apex Media signed — and paid — in the same minute"
    status="Closed in one motion"
    statusTone="emerald"
    footer={<><Zap className="h-3 w-3 text-emerald-400/80" /> Old way: sign today, invoice, chase 1–3 weeks. On the rail: 0 days.</>}
  >
    {/* signature */}
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
      <div className="flex items-center justify-between">
        <span className="text-[0.6rem] uppercase tracking-[0.18em] text-zinc-500">Signature</span>
        <span className="flex items-center gap-1 text-[0.6rem] text-emerald-400"><Check className="h-3 w-3" /> Verified</span>
      </div>
      <div className="mt-2 flex items-end justify-between border-b border-dashed border-white/10 pb-2">
        <span className="font-[cursive] text-2xl text-white/90" style={{ fontFamily: 'Brush Script MT, cursive' }}>
          Marcus Reyes
        </span>
        <PenLine className="h-4 w-4 text-violet-300/70" />
      </div>
      <p className="mt-1.5 text-[0.6rem] text-zinc-600">Signed electronically · 2:14 PM · IP logged</p>
    </div>

    {/* payment success */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="mt-3 flex items-center gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] px-3.5 py-3"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
        <Check className="h-4 w-4 text-emerald-400" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-light text-white">$12,000 deposit collected</p>
        <p className="flex items-center gap-1.5 text-[0.62rem] text-zinc-500">
          <CreditCard className="h-3 w-3" /> Visa ••4291 · charged 2:14 PM
        </p>
      </div>
      <span className="shrink-0 text-[0.6rem] uppercase tracking-[0.14em] text-emerald-400">Cleared</span>
    </motion.div>

    <div className="mt-3 grid grid-cols-2 gap-2">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-center">
        <p className="text-lg font-extralight text-white">0 days</p>
        <p className="text-[0.58rem] uppercase tracking-[0.14em] text-zinc-600">chasing payment</p>
      </div>
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-center">
        <p className="text-lg font-extralight text-emerald-400">$12,000</p>
        <p className="text-[0.58rem] uppercase tracking-[0.14em] text-zinc-600">in the bank, same call</p>
      </div>
    </div>
  </PanelShell>
));
SignPayPanel.displayName = 'SignPayPanel';

const AutomatePanel = memo(() => (
  <PanelShell
    kicker="Post-signature automation"
    title="One signature fired six systems"
    status="Triggered"
    statusTone="violet"
    footer={<><Sparkles className="h-3 w-3 text-violet-400/70" /> One signature → six systems update. You touched nothing.</>}
  >
    <div className="space-y-1.5">
      {[
        { icon: Database, label: 'HubSpot deal → Closed Won', sub: 'CRM' },
        { icon: FileCheck2, label: 'Invoice filed in Xero', sub: 'Accounting' },
        { icon: FolderPlus, label: 'Project created in ClickUp', sub: 'Delivery' },
        { icon: Bell, label: 'Team pinged in Slack', sub: 'Comms' },
        { icon: FolderPlus, label: 'Client folder created in Drive', sub: 'Files' },
        { icon: Mail, label: 'Kickoff email sent', sub: 'Onboarding' },
      ].map((r, i) => (
        <motion.div
          key={r.label}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 * i }}
          className="flex items-center gap-3 rounded-lg bg-white/[0.02] px-3 py-2"
        >
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-violet-500/10 text-violet-300">
            <r.icon className="h-3 w-3" />
          </div>
          <span className="min-w-0 flex-1 truncate text-[0.74rem] text-zinc-300">{r.label}</span>
          <span className="text-[0.56rem] uppercase tracking-[0.14em] text-zinc-600">{r.sub}</span>
          <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
        </motion.div>
      ))}
    </div>
  </PanelShell>
));
AutomatePanel.displayName = 'AutomatePanel';

/* ════════════════════════════════════════════════════════════════════════
   INTEL — Deal Intelligence (anti-CRM: interpret + predict)
   ════════════════════════════════════════════════════════════════════════ */

const IntelSignalPanel = memo(() => (
  <PanelShell
    kicker="Deal Intelligence"
    title="Apex Media is comparison-shopping"
    status="Critical"
    statusTone="red"
    footer={<>Pattern confidence <span className="mx-1 text-zinc-300">72%</span> — matches deals lost to competitors within 7 days.</>}
  >
    <div className="mb-4 flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
      <Ring score={38} label="Health" tone="red" />
      <div className="min-w-0 flex-1 space-y-1.5">
        {[
          { icon: Eye, label: 'Revisited pricing', val: '4× in 48h' },
          { icon: Clock, label: 'Time on scope', val: '0 min' },
          { icon: Clock, label: 'Time on pricing', val: '6m 12s' },
        ].map((r) => (
          <div key={r.label} className="flex items-center justify-between text-[0.7rem]">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <r.icon className="h-3 w-3 text-zinc-600" />
              {r.label}
            </span>
            <span className="tabular-nums text-zinc-200">{r.val}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="rounded-xl border border-red-500/25 bg-red-500/[0.05] p-3.5">
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-red-500/15">
          <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-light text-white">Buyer is price-anchoring against an alternative.</p>
          <div className="mt-2 flex items-start gap-1.5 rounded-lg bg-white/[0.03] px-2.5 py-2">
            <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-violet-400" />
            <p className="text-[0.72rem] leading-relaxed text-violet-200/90">
              Send the value-framed pricing note now — call within 24h before they commit elsewhere.
            </p>
          </div>
        </div>
      </div>
    </div>
  </PanelShell>
));
IntelSignalPanel.displayName = 'IntelSignalPanel';

const DealXrayPanel = memo(() => {
  const sections = [
    { label: 'Pricing', time: '6m 12s', opens: '6 opens', pct: 100, tone: 'bg-red-400/70', hot: true },
    { label: 'Case studies', time: '1m 40s', opens: '2 opens', pct: 42, tone: 'bg-amber-400/60', hot: false },
    { label: 'Terms', time: '0m 18s', opens: '1 open', pct: 12, tone: 'bg-violet-400/50', hot: false },
    { label: 'Scope of work', time: '0m 00s', opens: 'skipped', pct: 3, tone: 'bg-zinc-600', hot: false },
  ];
  return (
    <PanelShell
      kicker="Deal X-Ray"
      title="Where the buyer's attention actually went"
      status="Read complete"
      statusTone="violet"
      footer={<><ScanLine className="h-3 w-3 text-violet-400/70" /> A CRM logs a “view.” Elystra shows you where their eyes went.</>}
    >
      <div className="space-y-2.5">
        {sections.map((s, i) => (
          <div key={s.label} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-[0.7rem] text-zinc-400">{s.label}</span>
            <div className="relative h-6 flex-1">
              <Bar pct={s.pct} tone={s.tone} delay={i * 0.08} />
              <span className="absolute inset-y-0 left-2.5 flex items-center text-[0.66rem] tabular-nums text-white/90">
                {s.time}
              </span>
            </div>
            <span className={`w-16 shrink-0 text-right text-[0.62rem] tabular-nums ${s.hot ? 'text-red-300' : 'text-zinc-600'}`}>
              {s.opens}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-xl border border-violet-500/20 bg-violet-500/[0.05] px-3.5 py-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300">
          <Users className="h-3.5 w-3.5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.74rem] text-white/90">Forwarded to 2 new viewers</p>
          <p className="text-[0.6rem] text-zinc-500">CFO-level device entered the proposal · decision is going up</p>
        </div>
      </div>
    </PanelShell>
  );
});
DealXrayPanel.displayName = 'DealXrayPanel';

const ForecastPanel = memo(() => (
  <PanelShell
    kicker="Revenue Forecast"
    title="Probability-weighted — not a wishlist"
    status="Falling · -12%"
    statusTone="amber"
    footer={<><TrendingDown className="h-3 w-3 text-amber-400/80" /> 2 hot deals went quiet this week — momentum is cooling.</>}
  >
    <div className="mb-3 flex items-end justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
      <div>
        <p className="text-[0.58rem] uppercase tracking-[0.18em] text-zinc-600">Weighted pipeline</p>
        <p className="mt-1 text-3xl font-extralight tracking-tight text-white">$214K</p>
      </div>
      <div className="flex gap-2">
        {[
          { l: 'Hot', v: '61%', d: 'bg-red-400' },
          { l: 'Warm', v: '24%', d: 'bg-amber-400' },
          { l: 'Cold', v: '7%', d: 'bg-zinc-500' },
        ].map((t) => (
          <div key={t.l} className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5 text-center">
            <span className={`mx-auto mb-1 block h-1.5 w-1.5 rounded-full ${t.d}`} />
            <p className="text-[0.7rem] tabular-nums text-zinc-200">{t.v}</p>
            <p className="text-[0.5rem] uppercase tracking-[0.12em] text-zinc-600">{t.l}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-1.5">
      {[
        { name: 'Northwind Rebrand', amt: '$38K', prob: 78, eng: 'hot' as const, ev: '$30K' },
        { name: 'Apex Media — Retainer', amt: '$24K', prob: 41, eng: 'warm' as const, ev: '$10K' },
        { name: 'Cedar & Co — SEO', amt: '$16K', prob: 22, eng: 'cold' as const, ev: '$4K' },
      ].map((d) => (
        <div key={d.name} className="flex items-center gap-3 rounded-lg bg-white/[0.02] px-3 py-2">
          <span className={`h-2 w-2 shrink-0 rounded-full ${engDot(d.eng)}`} />
          <span className="min-w-0 flex-1 truncate text-[0.72rem] text-zinc-300">{d.name}</span>
          <span className="text-[0.68rem] tabular-nums text-zinc-500">{d.amt}</span>
          <span
            className={`w-11 rounded-md py-0.5 text-center text-[0.66rem] tabular-nums ${
              d.prob >= 70 ? 'bg-emerald-500/10 text-emerald-400' : d.prob >= 40 ? 'bg-violet-500/10 text-violet-300' : 'bg-white/[0.04] text-zinc-500'
            }`}
          >
            {d.prob}%
          </span>
          <span className="w-12 text-right text-[0.66rem] tabular-nums text-zinc-500">{d.ev}</span>
        </div>
      ))}
    </div>
  </PanelShell>
));
ForecastPanel.displayName = 'ForecastPanel';

/* ════════════════════════════════════════════════════════════════════════
   CLOSE — Find money, rescue it, collect it
   ════════════════════════════════════════════════════════════════════════ */

const AutopsyPanel = memo(() => {
  const funnel = [
    { label: 'Created', count: 24, pct: 100, tone: 'bg-white/20', color: 'text-white' },
    { label: 'Viewed', count: 18, pct: 75, tone: 'bg-violet-500/50', color: 'text-violet-300' },
    { label: 'Signed', count: 9, pct: 38, tone: 'bg-violet-400/60', color: 'text-violet-200' },
    { label: 'Paid', count: 6, pct: 25, tone: 'bg-emerald-500/60', color: 'text-emerald-400' },
  ];
  return (
    <PanelShell
      kicker="Money Autopsy"
      title="Where revenue dies — in dollars"
      status="$63K on the table"
      statusTone="amber"
      footer={<><AlertTriangle className="h-3 w-3 text-orange-400/80" /> $63K already signed and uncollected — surfaced, not buried.</>}
    >
      <div className="space-y-2">
        {funnel.map((r, i) => (
          <div key={r.label} className="flex items-center gap-3">
            <span className="w-14 text-right text-[0.68rem] text-zinc-500">{r.label}</span>
            <div className="relative h-7 flex-1">
              <Bar pct={r.pct} tone={r.tone} delay={i * 0.1} />
              <span className={`absolute inset-y-0 left-3 flex items-center text-xs tabular-nums ${r.color}`}>{r.count}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { n: 6, l: 'never opened', v: '$71K', c: 'text-red-400/80' },
          { n: 9, l: 'viewed, stalled', v: '$148K', c: 'text-amber-400/80' },
          { n: 3, l: 'signed, unpaid', v: '$63K', c: 'text-orange-400/80' },
        ].map((d) => (
          <div key={d.l} className="rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">
            <p className={`text-xl font-extralight tabular-nums ${d.c}`}>{d.n}</p>
            <p className="text-[0.56rem] uppercase tracking-[0.1em] text-zinc-600">{d.l}</p>
            <p className="mt-1 text-[0.62rem] tabular-nums text-zinc-500">{d.v}</p>
          </div>
        ))}
      </div>
    </PanelShell>
  );
});
AutopsyPanel.displayName = 'AutopsyPanel';

const WarRoomPanel = memo(() => (
  <PanelShell
    kicker="Revenue Rescue · War Room"
    title="Every stalled deal gets a diagnosis and a move"
    status="$96K exposure"
    statusTone="amber"
    footer={<><Sparkles className="h-3 w-3 text-violet-400/70" /> Elystra writes the follow-up. You approve and fire.</>}
  >
    <div className="space-y-2.5">
      {[
        {
          name: 'Riverside Co.',
          amt: '$45K',
          eng: 'warm' as const,
          blocker: 'Price uncertainty — read pricing 3×, no sign',
          move: 'ROI one-pager drafted',
        },
        {
          name: 'Vantage Group',
          amt: '$51K',
          eng: 'hot' as const,
          blocker: 'Awaiting legal — signer went quiet 4 days',
          move: 'Signer nudge drafted',
        },
      ].map((d, i) => (
        <motion.div
          key={d.name}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * i }}
          className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
        >
          <div className="flex items-center gap-2.5">
            <span className={`h-2 w-2 shrink-0 rounded-full ${engDot(d.eng)}`} />
            <span className="min-w-0 flex-1 truncate text-[0.78rem] text-white/90">{d.name}</span>
            <span className="text-[0.72rem] tabular-nums text-zinc-400">{d.amt}</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[0.64rem] text-zinc-500">
            <span className="rounded bg-red-500/10 px-1.5 py-0.5 text-red-300/80">Blocker</span>
            <span className="truncate">{d.blocker}</span>
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-violet-500/[0.06] px-2.5 py-1.5">
            <Mail className="h-3 w-3 shrink-0 text-violet-300" />
            <span className="min-w-0 flex-1 truncate text-[0.66rem] text-violet-200/90">{d.move}</span>
            <span className="flex shrink-0 items-center gap-1 rounded-md bg-violet-500/20 px-2 py-0.5 text-[0.58rem] uppercase tracking-[0.12em] text-violet-100">
              Send <ArrowRight className="h-2.5 w-2.5" />
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  </PanelShell>
));
WarRoomPanel.displayName = 'WarRoomPanel';

const VelocityPanel = memo(() => {
  const stages = [
    { label: 'Sent → Viewed', days: '1.2d', pct: 20, tone: 'bg-violet-500/60' },
    { label: 'Viewed → Signed', days: '6.0d', pct: 100, tone: 'bg-violet-400/60' },
    { label: 'Signed → Paid', days: '0.1d', pct: 4, tone: 'bg-emerald-500/70' },
  ];
  return (
    <PanelShell
      kicker="Deal Velocity"
      title="Sent → cash, measured"
      status="11 days"
      statusTone="emerald"
      footer={<><Gauge className="h-3 w-3 text-emerald-400/80" /> Signed→paid is near-zero — because signing and paying happen together.</>}
    >
      <div className="mb-4 flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <div>
          <p className="text-[0.58rem] uppercase tracking-[0.18em] text-zinc-600">Full cycle</p>
          <p className="mt-1 text-2xl font-extralight text-white">11 days</p>
        </div>
        <p className="text-[0.62rem] text-emerald-400/80">9 days faster than email</p>
      </div>

      <div className="space-y-3">
        {stages.map((s, i) => (
          <div key={s.label} className="flex items-center gap-3">
            <span className="w-28 text-[0.68rem] text-zinc-500">{s.label}</span>
            <div className="relative h-6 flex-1">
              <Bar pct={s.pct} tone={s.tone} delay={i * 0.1} />
              <span className="absolute inset-y-0 left-3 flex items-center text-[0.7rem] tabular-nums text-white/90">{s.days}</span>
            </div>
          </div>
        ))}
      </div>
    </PanelShell>
  );
});
VelocityPanel.displayName = 'VelocityPanel';

/* ════════════════════════════════════════════════════════════════════════
   CLIENT — Continuity (anti-CRM: retention + expansion + protection)
   ════════════════════════════════════════════════════════════════════════ */

const ClientHealthPanel = memo(() => (
  <PanelShell
    kicker="Client Portal"
    title="Apex Media — retained account"
    status="Healthy"
    statusTone="emerald"
    footer={<><Sparkles className="h-3 w-3 text-violet-400/70" /> Cold buyer → loyal account, without leaving the rail.</>}
  >
    <div className="mb-4 flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
      <Ring score={82} label="Health" tone="emerald" />
      <div className="min-w-0 flex-1 space-y-2">
        <div>
          <div className="flex items-center justify-between text-[0.66rem]">
            <span className="text-zinc-500">Churn risk</span>
            <span className="text-emerald-400">Low</span>
          </div>
          <div className="mt-1 h-1.5"><Bar pct={18} tone="bg-emerald-400/60" /></div>
        </div>
        <div>
          <div className="flex items-center justify-between text-[0.66rem]">
            <span className="text-zinc-500">Expansion probability</span>
            <span className="text-violet-300">64%</span>
          </div>
          <div className="mt-1 h-1.5"><Bar pct={64} tone="bg-violet-400/60" delay={0.1} /></div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-2">
      {[
        { l: 'Total invested', v: '$148K' },
        { l: 'Active agreements', v: '3' },
        { l: 'Next payment', v: 'Mar 1' },
      ].map((k) => (
        <div key={k.l} className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
          <p className="text-[0.56rem] uppercase tracking-[0.14em] text-zinc-600">{k.l}</p>
          <p className="mt-1 text-base font-extralight tracking-tight text-white">{k.v}</p>
        </div>
      ))}
    </div>

    <div className="mt-3 flex items-center gap-3 rounded-xl border border-violet-500/20 bg-violet-500/[0.05] px-3.5 py-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300">
        <Repeat className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[0.74rem] text-white/90">Expansion request — add SEO retainer</p>
        <p className="text-[0.6rem] text-zinc-500">Submitted from the client portal · +$6K / mo</p>
      </div>
      <TrendingUp className="h-4 w-4 shrink-0 text-violet-300" />
    </div>
  </PanelShell>
));
ClientHealthPanel.displayName = 'ClientHealthPanel';

const ConcentrationPanel = memo(() => {
  const clients = [
    { name: 'Apex Media', pct: 38, amt: '$148K', risk: true },
    { name: 'Vantage Group', pct: 22, amt: '$86K', risk: false },
    { name: 'Northwind', pct: 14, amt: '$54K', risk: false },
    { name: 'Cedar & Co', pct: 9, amt: '$35K', risk: false },
  ];
  return (
    <PanelShell
      kicker="Portfolio Risk"
      title="Revenue concentration — see the cliff early"
      status="Elevated risk"
      statusTone="amber"
      footer={<><PieChart className="h-3 w-3 text-amber-400/80" /> One client is 38% of revenue. Know the risk before churn becomes a crisis.</>}
    >
      <div className="space-y-3">
        {clients.map((c, i) => (
          <div key={c.name} className="flex items-center gap-3">
            <span className="w-6 text-center text-[0.66rem] text-zinc-600">{i + 1}</span>
            <span className="w-24 shrink-0 truncate text-[0.72rem] text-zinc-300">{c.name}</span>
            <div className="h-1.5 flex-1">
              <Bar pct={c.pct} tone={c.risk ? 'bg-amber-400/60' : 'bg-violet-500/50'} delay={i * 0.08} />
            </div>
            <span className={`w-9 text-right text-[0.66rem] tabular-nums ${c.risk ? 'text-amber-300' : 'text-zinc-500'}`}>
              {c.pct}%
            </span>
            <span className="w-12 text-right text-[0.62rem] tabular-nums text-zinc-600">{c.amt}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/[0.05] px-3.5 py-2.5">
        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400" />
        <p className="text-[0.68rem] leading-relaxed text-amber-100/80">
          If Apex Media churns, you lose 38% of revenue overnight. Elystra flags it while you can still diversify.
        </p>
      </div>
    </PanelShell>
  );
});
ConcentrationPanel.displayName = 'ConcentrationPanel';

const PortalBillingPanel = memo(() => (
  <PanelShell
    kicker="Client Portal · Billing"
    title="Recurring revenue collects itself"
    status="On autopilot"
    statusTone="emerald"
    footer={<><CreditCard className="h-3 w-3 text-emerald-400/80" /> No invoices. No chasing. Retainers charge on schedule, every month.</>}
  >
    <div className="space-y-2">
      {[
        { name: 'Growth Retainer', amt: '$18K / mo', state: 'Active', next: 'Mar 1' },
        { name: 'SEO Retainer', amt: '$6K / mo', state: 'Active', next: 'Mar 1' },
      ].map((s, i) => (
        <Row key={s.name} i={i} tone="emerald">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300">
            <Repeat className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.74rem] text-white/90">{s.name}</p>
            <p className="text-[0.6rem] text-zinc-500">Auto-charge · next {s.next}</p>
          </div>
          <div className="text-right">
            <p className="text-[0.74rem] tabular-nums text-emerald-300">{s.amt}</p>
            <p className="text-[0.56rem] uppercase tracking-[0.12em] text-emerald-400/70">{s.state}</p>
          </div>
        </Row>
      ))}
    </div>

    <div className="mt-3 flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
      <div>
        <p className="text-[0.58rem] uppercase tracking-[0.18em] text-zinc-600">Recurring / month</p>
        <p className="mt-1 text-2xl font-extralight tracking-tight text-white">$24,000</p>
      </div>
      <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[0.6rem] uppercase tracking-[0.14em] text-emerald-300">
        <Check className="h-3 w-3" /> Scheduled
      </span>
    </div>

    <div className="mt-2.5 space-y-1.5">
      {[
        { d: 'Feb 1', a: '$24,000', s: 'Paid' },
        { d: 'Jan 1', a: '$24,000', s: 'Paid' },
      ].map((r) => (
        <div key={r.d} className="flex items-center justify-between rounded-lg bg-white/[0.02] px-3 py-1.5">
          <span className="text-[0.66rem] text-zinc-500">{r.d}</span>
          <span className="text-[0.66rem] tabular-nums text-zinc-300">{r.a}</span>
          <span className="flex items-center gap-1 text-[0.6rem] text-emerald-400"><Check className="h-2.5 w-2.5" /> {r.s}</span>
        </div>
      ))}
    </div>
  </PanelShell>
));
PortalBillingPanel.displayName = 'PortalBillingPanel';

/* ════════════════════════════════════════════════════════════════════════
   REGISTRY + DISPATCHER
   ════════════════════════════════════════════════════════════════════════ */

export type ArsenalSubPanel = { label: string; node: ReactNode };

export const ARSENAL_PANELS: Record<string, ArsenalSubPanel[]> = {
  scope: [
    { label: 'Build', node: <ScopeBuildPanel /> },
    { label: 'Sign & Pay', node: <SignPayPanel /> },
    { label: 'Automate', node: <AutomatePanel /> },
  ],
  intel: [
    { label: 'Signal', node: <IntelSignalPanel /> },
    { label: 'Deal X-Ray', node: <DealXrayPanel /> },
    { label: 'Forecast', node: <ForecastPanel /> },
  ],
  close: [
    { label: 'Autopsy', node: <AutopsyPanel /> },
    { label: 'War Room', node: <WarRoomPanel /> },
    { label: 'Velocity', node: <VelocityPanel /> },
  ],
  client: [
    { label: 'Health', node: <ClientHealthPanel /> },
    { label: 'Concentration', node: <ConcentrationPanel /> },
    { label: 'Portal Billing', node: <PortalBillingPanel /> },
  ],
};

export function getArsenalPanels(id: string): ArsenalSubPanel[] {
  return ARSENAL_PANELS[id] ?? [];
}
