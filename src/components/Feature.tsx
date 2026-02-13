/**
 * Feature.tsx
 * ELYSTRA — Transformation Pillars tied to hard numbers
 */

import { motion, Variants } from 'framer-motion';
import { FileText, Workflow, BarChart3, Zap, ArrowRight } from 'lucide-react';

/* ---------------- Pillar Data with Numbers ---------------- */
const pillars = [
  {
    num: '01',
    icon: FileText,
    title: 'Proposal, Sign, Pay. One Rail.',
    desc: 'Build and send branded proposals in minutes. Signature and payment live on the same screen. No separate Stripe links, no chasing invoices.',
    netEffect: 'Average agency goes from 3–7 days between "yes" and send… to under 10 minutes.',
    color: 'violet',
  },
  {
    num: '02',
    icon: Workflow,
    title: 'Ops That Move Themselves',
    desc: 'One close updates CRM, PM tool, Slack, and Finance automatically. Sales stops doing follow-through admin.',
    netEffect: 'Your ops team saves 8–12 hours per week on manual handoffs. Zero dropped balls.',
    color: 'blue',
  },
  {
    num: '03',
    icon: BarChart3,
    title: 'Know What Prints Money',
    desc: 'Templates ranked by cash collected, not views. Rep performance exposed. Board-ready revenue analytics.',
    netEffect: 'Kill 10–30% of offers that never convert and pour budget into the ones that do — using data, not vibes.',
    color: 'emerald',
  },
  {
    num: '04',
    icon: Zap,
    title: 'The Proposal-to-Cash Rail',
    desc: 'You don\'t improve proposals. You remove the gap where deals die. Send. Sign. Deposit.',
    netEffect: '+20–30% close-rate lift without a single extra lead.',
    color: 'amber',
  },
];

const colorConfig: Record<string, { 
  gradient: string; 
  border: string; 
  bg: string;
  text: string;
}> = {
  violet: {
    gradient: 'from-violet-500/20 to-purple-500/10',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/10',
    text: 'text-violet-400',
  },
  blue: {
    gradient: 'from-blue-500/20 to-indigo-500/10',
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
  },
  emerald: {
    gradient: 'from-emerald-500/20 to-teal-500/10',
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
  },
  amber: {
    gradient: 'from-amber-500/20 to-orange-500/10',
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
  },
};

/* ---------------- Motion Variants ---------------- */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
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

/* ---------------- Pillar Card ---------------- */
interface PillarCardProps {
  pillar: typeof pillars[0];
}

const PillarCard = ({ pillar }: PillarCardProps) => {
  const Icon = pillar.icon;
  const config = colorConfig[pillar.color];

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      {/* Card */}
      <div className="relative bg-black/50 rounded-2xl p-8 border border-white/[0.06] 
                     hover:border-white/[0.1] transition-all duration-300 h-full">
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
          {pillar.num}
        </div>
        
        <div className="relative z-10">
          {/* Icon + Number */}
          <div className="flex items-center gap-4 mb-5">
            <div className={`w-12 h-12 rounded-xl ${config.bg} border ${config.border} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${config.text}`} />
            </div>
            <span className={`text-xs tracking-[0.15em] ${config.text} opacity-70`}>
              PILLAR {pillar.num}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-light text-white mb-4">{pillar.title}</h3>
          
          {/* Description */}
          <p className="text-sm text-zinc-400 font-light mb-6 leading-relaxed">{pillar.desc}</p>
          
          {/* Net Effect - The Money Shot */}
          <div 
            className="p-4 rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${config.bg.replace('bg-', 'rgba(').replace('/10', ', 0.1)')} 0%, rgba(0,0,0,0.2) 100%)`,
              border: `1px solid ${config.border.replace('border-', 'rgba(').replace('/20', ', 0.15)')}`,
            }}
          >
            <p className="text-xs tracking-[0.1em] uppercase text-zinc-500 mb-2">Net Effect</p>
            <p className={`text-sm font-light ${config.text}`}>{pillar.netEffect}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------------- Main Component ---------------- */
const Feature = () => {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-transparent">
      {/* Optimized Background - Static gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 60%)',
          }}
        />
        <div 
          className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full opacity-40"
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
              The Four Transformation Pillars
            </span>
          </h2>
          <p className="text-lg font-extralight text-zinc-500 max-w-2xl mx-auto">
            Each pillar ties directly to money. No fluff. Just measurable impact.
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {pillars.map((pillar) => (
            <PillarCard key={pillar.num} pillar={pillar} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="#demo"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-sm font-light text-white">See the Numbers in Your Context</span>
            <ArrowRight className="w-4 h-4 text-violet-400 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Feature;
