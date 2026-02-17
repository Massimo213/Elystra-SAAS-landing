/**
 * FullArsenal.tsx
 * ELYSTRA — 4 Brutal Modules
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
    tagline: 'Notes or transcript in → branded proposal out. 30 seconds. No deck surgery.',
    bullets: [
      'AI drafts from call recordings',
      'On-brand templates locked',
      'Pricing auto-calculated',
      'One-click send with tracking',
    ],
    color: 'violet',
  },
  {
    num: '02',
    icon: CreditCard,
    title: 'Close Rail',
    tagline: 'Review → sign → pay on one screen. E-sign + Stripe baked in. No invoicing gap.',
    bullets: [
      'Embedded e-signature',
      'Stripe payment same screen',
      'No DocuSign tab-hopping',
      'Deposit collected instantly',
    ],
    color: 'emerald',
  },
  {
    num: '03',
    icon: BarChart3,
    title: 'Deal Intelligence & Follow-Up',
    tagline: 'Behavioral X-ray on every deal. Follow-up queue ranked by buying signals, not tasks.',
    bullets: [
      'Time on pricing tracked',
      'Reopens & shares detected',
      'Decision-maker activity visible',
      'Auto-sequences until commit',
    ],
    color: 'amber',
  },
  {
    num: '04',
    icon: Plug,
    title: 'Ops & Client Portal',
    tagline: 'One close updates CRM, PM, Slack, Finance — client gets a portal with everything.',
    bullets: [
      'CRM auto-updated',
      'PM tasks triggered',
      'Finance notified',
      'Client portal included',
    ],
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
      {/* Card */}
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
          {/* Icon + Number */}
          <div className="flex items-center gap-4 mb-5">
            <div className={`w-12 h-12 rounded-xl ${config.bg} border ${config.border} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${config.text}`} />
            </div>
            <span className={`text-xs tracking-[0.15em] ${config.text} opacity-70`}>
              MODULE {module.num}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-light text-white mb-3">{module.title}</h3>
          
          {/* Tagline */}
          <p className="text-sm text-zinc-400 font-light mb-6 leading-relaxed">{module.tagline}</p>
          
          {/* Bullets */}
          <ul className="space-y-2">
            {module.bullets.map((bullet, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle className={`w-3.5 h-3.5 ${config.text} shrink-0`} />
                <span className="text-xs text-zinc-500 font-light">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------------- Main Component ---------------- */
const FullArsenal = () => {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-transparent">
      {/* Optimized Background - Static gradients */}
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

        {/* Modules Grid - 2x2 */}
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

        {/* Result Line */}
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
