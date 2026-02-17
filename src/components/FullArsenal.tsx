/**
 * FullArsenal.tsx
 * ELYSTRA — Four Modules. One Rail.
 */

import { motion, Variants } from 'framer-motion';
import { 
  FileText, CreditCard, BarChart3, Plug, 
  ArrowRight, CheckCircle
} from 'lucide-react';

/* ---------------- 4 Core Modules ---------------- */
const modules = [
  {
    num: '01',
    icon: FileText,
    title: 'Proposal Engine',
    headline: 'Your proposal. Same structure. Done while the call is still warm.',
    subline: "Call recording, notes, or docs in \u2192 your branded scope out. Elystra doesn\u2019t invent a new way to sell. It makes your existing way instant and consistent.",
    bullets: [
      'Takes whatever you have \u2014 notes, transcript, Zoom/Loom link, existing doc \u2014 and turns it into a clean scope',
      'Uses your proposal structure, your pricing logic, your language',
      'Layout and branding are locked to your look; no slide surgery, no manual formatting',
      'Output is send-ready by the time the prospect has finished "thinking about it"',
    ],
    result: 'Proposals that used to take days are out while trust and urgency are still high.',
    color: 'violet',
  },
  {
    num: '02',
    icon: CreditCard,
    title: 'Close Rail',
    headline: 'Review \u2192 sign \u2192 pay in one motion. No invoice gap.',
    subline: 'The client sees the scope, signs, and pays on the same screen. No DocuSign hop, no Stripe link chase, no "I\u2019ll do it later".',
    bullets: [
      'Client reviews the full scope, accepts, and signs on the proposal page',
      'Deposit, retainer, or full fee collected in the same flow',
      'No separate DocuSign tab, no separate Stripe invoice, no "I\u2019ll pay when I get to it"',
      'Deal is marked closed, payment routed, and the job moves forward off that one action',
    ],
    result: 'Once someone says "yes", there is no dead time for them to cool off or shop around.',
    color: 'emerald',
  },
  {
    num: '03',
    icon: BarChart3,
    title: 'Deal Intelligence & Follow-Up Brain',
    headline: 'Every proposal becomes a monitored asset, not a file you lose in email.',
    subline: 'Elystra watches what happens after send and tells you exactly who to move on, when, and why.',
    bullets: [
      'Tracks who opened, how long they stayed, and where they sat on pricing',
      'Detects forwards and new decision-makers \u2014 turns "mystery CCs" into a visible map',
      'Every deal is auto-ranked by heat so your team always knows which 5 to touch today',
      'Follow-up queue gives concrete next moves (call, email, nudge) instead of generic "reminders"',
      'When a deal is clearly dead, it\u2019s marked dead \u2014 no zombie pipeline',
    ],
    result: 'Follow-up stops being guesswork and becomes a list of precise, high-leverage actions for your closers.',
    color: 'amber',
  },
  {
    num: '04',
    icon: Plug,
    title: 'Ops & Client Portal',
    headline: 'One close updates your entire stack. Your client gets a live control panel.',
    subline: 'For the agency, a close pushes data into CRM, PM, finance, and Slack. For the client, the portal becomes the only place they expect to see agreements, payments, and renewals.',
    bullets: [
      'One close updates CRM, creates PM tasks, notifies finance, and posts the win into your internal channels',
      'All agreements, invoices, receipts, and renewals live in a single portal instead of 40 email threads',
      'Clients can review past work, pay outstanding balances, and request new work without pinging your team',
      'Portal activity (logins, document views, renewal clicks) feeds back into deal intelligence',
      'Over time, clients get trained: "if it\u2019s not in the portal, it doesn\u2019t exist" \u2014 making it painful to leave',
    ],
    result: "The rail doesn\u2019t end at \"paid\". It locks in the relationship and turns your client base into a recurring, visible, expandable book of business.",
    color: 'blue',
  },
];

const colorConfig: Record<string, { 
  gradient: string; 
  border: string; 
  glow: string;
  bg: string;
  text: string;
}> = {
  violet: {
    gradient: 'from-violet-500/20 to-purple-500/10',
    border: 'border-violet-500/20',
    glow: 'rgba(139, 92, 246, 0.15)',
    bg: 'bg-violet-500/10',
    text: 'text-violet-400',
  },
  emerald: {
    gradient: 'from-emerald-500/20 to-green-500/10',
    border: 'border-emerald-500/20',
    glow: 'rgba(16, 185, 129, 0.15)',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
  },
  amber: {
    gradient: 'from-amber-500/20 to-orange-500/10',
    border: 'border-amber-500/20',
    glow: 'rgba(245, 158, 11, 0.15)',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
  },
  blue: {
    gradient: 'from-blue-500/20 to-indigo-500/10',
    border: 'border-blue-500/20',
    glow: 'rgba(59, 130, 246, 0.15)',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
  },
};

/* ---------------- Motion Variants ---------------- */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

/* ---------------- Module Card ---------------- */
interface ModuleCardProps {
  module: typeof modules[0];
}

const ModuleCard = ({ module }: ModuleCardProps) => {
  const Icon = module.icon;
  const config = colorConfig[module.color];

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      <div 
        className="relative bg-black/50 rounded-2xl p-8 border border-white/[0.06] 
                  hover:border-white/[0.1] transition-all duration-300 h-full"
      >
        {/* Inner gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-20 rounded-2xl`} />
        
        {/* Number watermark */}
        <div 
          className="absolute -right-2 -top-4 text-[5rem] font-extralight tracking-tight opacity-[0.04] select-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.1) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {module.num}
        </div>
        
        <div className="relative z-10">
          {/* Icon + Module label */}
          <div className="flex items-center gap-4 mb-5">
            <div className={`w-12 h-12 rounded-xl ${config.bg} border ${config.border} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${config.text}`} />
            </div>
            <span className={`text-xs tracking-[0.15em] ${config.text} opacity-70`}>
              MODULE {module.num}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-light text-white mb-2">{module.title}</h3>

          {/* Headline */}
          <p className="text-sm text-zinc-200 font-medium mb-3 leading-relaxed">{module.headline}</p>

          {/* Subline */}
          <p className="text-sm text-zinc-400 font-light mb-6 leading-relaxed">{module.subline}</p>
          
          {/* Bullets */}
          <ul className="space-y-2.5 mb-6">
            {module.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle className={`w-3.5 h-3.5 ${config.text} shrink-0 mt-0.5`} />
                <span className="text-xs text-zinc-400 font-light leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Result */}
          <div 
            className="px-4 py-3 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <p className="text-xs text-zinc-300 font-light leading-relaxed">
              <span className="text-white font-medium">Result: </span>
              {module.result}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------------- Main Component ---------------- */
const FullArsenal = () => {
  return (
    <section id="the-rail" className="relative py-28 md:py-36 overflow-hidden bg-transparent">
      {/* Static background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 60%)',
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight mb-6">
            <span 
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Four Modules. One Rail.
            </span>
          </h2>
          <p className="text-lg font-extralight text-zinc-500 max-w-2xl mx-auto">
            Everything you need to go from call to cash. Nothing you don't.
          </p>
        </motion.div>

        {/* Modules Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {modules.map((module) => (
            <ModuleCard key={module.num} module={module} />
          ))}
        </motion.div>

        {/* Bottom result line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div 
            className="inline-block px-8 py-4 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(16, 185, 129, 0.05) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.15)',
            }}
          >
            <p className="text-base md:text-lg text-zinc-300 font-light">
              <span className="text-white font-medium">Result:</span> your team stops "chasing paperwork".{' '}
              <span 
                style={{
                  background: 'linear-gradient(135deg, #a855f7 0%, #10b981 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                They talk, the rail does the rest.
              </span>
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="https://calendly.com/onboarding-elystra/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-sm font-light text-white">Book a 7-Minute Demo</span>
            <ArrowRight className="w-4 h-4 text-violet-400 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FullArsenal;
