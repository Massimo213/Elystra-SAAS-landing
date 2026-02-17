/**
 * ProcessComparison.tsx
 * ELYSTRA — PREMIUM TIER
 * Cinematic comparison table with stunning effects
 */

import { motion, Variants } from 'framer-motion';
import { 
  X, Check, Clock, FileText, Send, 
  CreditCard, AlertCircle, Zap, Sparkles 
} from 'lucide-react';

/* ---------------- Comparison Data ---------------- */
const comparisonData = [
  {
    step: 'Proposal Build',
    oldWay: 'Hours to days hunting templates, copying scopes, formatting decks.',
    newWay: 'Your exact proposal structure. Done in minutes. No matter how complex the scope, Elystra builds it.',
    oldIcon: Clock,
    newIcon: Zap,
  },
  {
    step: 'Design & Brand',
    oldWay: 'Every proposal rebuilt from scratch. Format, sections, and wording — all manual.',
    newWay: 'Elystra adapts to your proposal. Same structure, same story — just faster and consistent.',
    oldIcon: FileText,
    newIcon: Sparkles,
  },
  {
    step: 'Sending',
    oldWay:
      'You push a PDF / DocuSign link and pray. Maybe you see “opened”, but you still don’t know who read it, who matters, or if the deal is already dying.',
    newWay:
      'One send from Elystra and the rail takes over: every viewer is fingerprinted, decision-makers are surfaced, intent is scored, and the exact next move lands in your follow-up queue. No hope, no guessing — just controlled progression of the deal.',
    oldIcon: Send,
    newIcon: Zap,
  },
  {
    step: 'Signature',
    oldWay: 'Separate DocuSign. Another link. Another tab.',
    newWay: 'Embedded. Signs on the proposal page.',
    oldIcon: FileText,
    newIcon: Check,
  },
  {
    step: 'Payment',
    oldWay: 'Separate Stripe invoice. Wait 7-14 days.',
    newWay: 'Pays same screen. Deposit in minutes.',
    oldIcon: CreditCard,
    newIcon: Zap,
  },
  {
    step: 'Follow-up',
    oldWay: 'Follow-up is random. Same template. Wrong timing. Deals rot.',
    newWay: 'Follow-up is signal-driven: the system tells you who to call, why, and what to send next. Precision, not guesswork.',
    oldIcon: AlertCircle,
    newIcon: Sparkles,
  },
];

/* ---------------- Motion Variants ---------------- */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const ProcessComparison = () => {
  return (
    <section id="how-it-works" className="relative py-28 md:py-36 overflow-hidden bg-transparent">
      {/* Optimized Background - Static gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, transparent 60%)',
          }}
        />
        <div 
          className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header - Binary Contrast */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extralight tracking-tight mb-4">
            <span className="text-zinc-500">Proposal tools help you </span>
            <span 
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              send documents.
            </span>
          </h2>
          <h2 className="text-3xl md:text-5xl font-extralight tracking-tight">
            <span className="text-zinc-500">Elystra helps you </span>
            <span 
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              collect money.
            </span>
          </h2>
        </motion.div>

        {/* Comparison Table - Premium Glass Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Static outer glow */}
          <div
            className="absolute -inset-[2px] rounded-[2rem] opacity-30"
            style={{
              background: 'linear-gradient(135deg, rgba(239,68,68,0.2), transparent 50%, rgba(16,185,129,0.2))',
            }}
          />
          
          {/* Border gradient */}
          <div 
            className="absolute inset-0 rounded-[2rem] p-[1px]"
            style={{
              background: 'linear-gradient(135deg, rgba(239,68,68,0.4), rgba(255,255,255,0.1) 50%, rgba(16,185,129,0.4))',
            }}
          >
            <div className="w-full h-full bg-black rounded-[calc(2rem-1px)]" />
          </div>
          
          <div className="relative bg-black/90 rounded-[2rem] overflow-hidden border border-white/[0.05]">
            {/* Inner glow */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: 'linear-gradient(135deg, rgba(239,68,68,0.05) 0%, transparent 50%, rgba(16,185,129,0.05) 100%)',
              }}
            />
            
            {/* Table Header */}
            <div className="relative grid grid-cols-[1fr,1.5fr,1.5fr] border-b border-white/[0.08]">
              <div className="p-6 md:p-8">
                <span className="text-xs tracking-[0.2em] uppercase text-zinc-600">Step</span>
              </div>
              <div className="p-6 md:p-8" style={{ background: 'rgba(239, 68, 68, 0.03)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <X className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-sm font-medium text-red-400">The Old Way</span>
                </div>
              </div>
              <div className="p-6 md:p-8" style={{ background: 'rgba(16, 185, 129, 0.03)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium text-emerald-400">The Elystra Way</span>
                </div>
              </div>
            </div>

            {/* Table Rows */}
            {comparisonData.map((row, index) => {
              const OldIcon = row.oldIcon;
              const NewIcon = row.newIcon;
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative grid grid-cols-[1fr,1.5fr,1.5fr] border-b border-white/[0.05] last:border-b-0
                           hover:bg-white/[0.01] transition-colors duration-300"
                >
                  {/* Step name */}
                  <div className="p-6 md:p-8 flex items-center">
                    <span className="text-sm text-white font-light">{row.step}</span>
                  </div>
                  
                  {/* Old Way */}
                  <div 
                    className="p-6 md:p-8 flex items-start gap-4 border-x border-white/[0.05]"
                    style={{ background: 'rgba(239, 68, 68, 0.02)' }}
                  >
                    <div className="w-7 h-7 rounded-lg bg-red-500/5 border border-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <OldIcon className="w-3.5 h-3.5 text-red-400/40" />
                    </div>
                    <span className="text-sm text-zinc-500 font-light leading-relaxed">{row.oldWay}</span>
                  </div>
                  
                  {/* New Way */}
                  <div 
                    className="p-6 md:p-8 flex items-start gap-4"
                    style={{ background: 'rgba(16, 185, 129, 0.02)' }}
                  >
                    <div 
                      className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5"
                    >
                      <NewIcon className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span className="text-sm text-white font-light leading-relaxed">{row.newWay}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Kill Shot Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <div 
            className="max-w-3xl mx-auto p-6 rounded-2xl text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(249, 115, 22, 0.03) 100%)',
              border: '1px solid rgba(239, 68, 68, 0.15)',
            }}
          >
            <p className="text-base md:text-lg text-zinc-300 font-light leading-relaxed">
              If your stack still needs a separate tool for signature, another for Stripe, and manual follow-up —{' '}
              <span className="text-white font-medium">you don't have a rail.</span>{' '}
              <span 
                style={{
                  background: 'linear-gradient(135deg, #f87171 0%, #fb923c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                You have friction.
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessComparison;
