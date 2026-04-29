/**
 * Faq.tsx — Final 9-question FAQ (commercial OS positioning)
 */

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useDemoBooking } from '@/contexts/DemoBookingContext';

/* ---------------- FAQ Data ---------------- */
const faqs = [
  {
    q: "What is Elystra?",
    a:
      "Elystra is the commercial operating system for agencies.\n\nIt gives agencies control over the layer where money is usually won or lost: while the deal is live, while commitment is still loose, and long after the first payment lands.\n\nThat means control over:\nscope speed, deal visibility, blocker diagnosis, follow-up direction, offer intelligence, leakage visibility, commitment capture, payment flow, and client continuity.\n\n170+ agencies already run through the rail.\nThat matters because serious agencies do not need more noise. They need more control over how revenue actually moves.",
  },
  {
    q: "Why does Elystra matter if our agency is already selling?",
    a:
      "Because selling and controlling are not the same thing.\n\nAn agency closing 30% outbound is playing a different game from one closing 55% outbound.\nAn agency closing 55% inbound is playing a different game from one closing 90% inbound.\n\nBoth may look \"fine\" from the outside.\nOnly one is converting anywhere near its potential.\n\nElystra matters when the question stops being \"can we sell?\" and becomes \"how much more would this business collect if the motion were fully controlled?\"",
  },
  {
    q: "What does Elystra know that most agencies do not?",
    a:
      "Elystra turns the sales motion into readable commercial truth.\n\nIt shows:\nwhat is likely blocking a live deal, why Elystra believes that, what deserves attention now, which offers are actually converting, which ones are creating friction, where revenue is leaking repeatedly, and what the team should push, change, or stop selling.\n\nThat is the intelligence layer:\ndeal intelligence, offer intelligence, leakage intelligence, follow-up direction, and pipeline truth.\n\nMost agencies feel the problem.\nVery few can see it clearly enough to act with precision.",
  },
  {
    q: "What happens after the client says yes?",
    a:
      "The relationship stays under control.\n\nThe rail continues into:\naccount visibility, files, messages, billing history, relationship memory, client-facing continuity, and expansion signal.\n\nThat matters because the first close is only part of the value.\nThe retained account is where the business compounds.\n\nOn the rail, 62% of cold buyers have converted into retained client relationships where the system was actually used properly.\nThat is what happens when the relationship does not fall back into scattered systems after payment.",
  },
  {
    q: "How quickly does Elystra prove value?",
    a:
      "Fast enough that agencies usually feel it in live motion, not theory.\n\nThe right way to judge Elystra is on real opportunities, with real money exposure, inside the actual rail.\n\nOn the rail, 72% of agencies prove value in the first month.\nIn practice, that usually means the same thing: the agency recovers one or two deals in month one that would otherwise have slowed, drifted, or died.\n\nThat is why Elystra gets judged quickly.\nThe economics show up quickly.",
  },
  {
    q: "What changes economically once Elystra is installed?",
    a:
      "The same pipeline starts finishing harder.\n\nThat means:\nmore live opportunities converted, faster movement from intent to cash, less drift after verbal yes, less revenue dying in weak follow-up, better visibility into what is actually worth pushing, and stronger retained value after the close.\n\nLast quarter alone, $6.2M closed through Elystra.\nAcross agencies that actually adopted the rail properly, Elystra produced 23% average uplift.\n\nThe point is simple:\nthe value is not more software.\nThe value is more money collected from the demand you already have.",
  },
  {
    q: "Why are agencies on the rail stronger than agencies off it?",
    a:
      "Because agencies off the rail still depend on partial visibility, stitched-together tools, rep memory, and scattered follow-up.\n\nAgencies on the rail operate with:\nclearer truth, tighter movement, stronger commitment capture, better offer judgment, faster collection, and deeper control after the close.\n\nOne agency is \"selling.\"\nThe other is compounding.\n\nThat difference widens over time.",
  },
  {
    q: "Who should not use Elystra?",
    a:
      "Agencies that are comfortable with:\nloose follow-up, scattered systems, weak visibility, manual chasing, and money leaking after buyer interest already exists.\n\nAgencies that do not want operational truth should stay away.\n\nElystra is for agencies that want the commercial layer under control.",
  },
  {
    q: "Does Elystra work for retainers, projects, custom scopes, or enterprise deals?",
    a:
      "Yes.\n\nThe rail does not care whether you sell retainers, projects, hybrid engagements, custom scopes, enterprise work, or irregular high-ticket work.\n\nYou define the commercial structure.\n\nElystra controls how that structure moves through the motion:\nfrom live opportunity, to commitment, to money, to continuity.\n\nThat is why the rail works across very different agency models.\nThe offer can change. The need for control does not.",
  },
];

/* ---------------- Motion Variants ---------------- */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

/* ---------------- FAQ Item ---------------- */
interface FaqItemProps {
  faq: { q: string; a: string };
  isOpen: boolean; 
  onToggle: () => void;
}

const FaqItem = ({ faq, isOpen, onToggle }: FaqItemProps) => {
  return (
    <motion.div variants={itemVariants} className="group">
      <div 
        className={`relative bg-black/30 rounded-xl border transition-all duration-300
                   ${isOpen ? 'border-violet-500/30' : 'border-white/[0.06] hover:border-white/[0.1]'}`}
      >
        {isOpen && (
          <div
            className="absolute inset-0 rounded-xl opacity-20"
            style={{
              background: 'radial-gradient(ellipse at top, rgba(139, 92, 246, 0.15) 0%, transparent 60%)',
            }}
          />
        )}
        
      <button
        onClick={onToggle}
          className="relative z-10 w-full flex items-center justify-between gap-4 p-5 text-left"
        >
          <span className={`text-sm md:text-base font-light transition-colors duration-300
                          ${isOpen ? 'text-white' : 'text-zinc-300'}`}>
            {faq.q}
          </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-300
                       ${isOpen ? 'bg-violet-500/20 border border-violet-500/30' : 'bg-white/[0.03] border border-white/[0.06]'}`}
          >
            <ChevronDown className={`w-4 h-4 transition-colors duration-300
                                    ${isOpen ? 'text-violet-400' : 'text-zinc-500'}`} />
        </motion.div>
      </button>

        <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
              <div className="relative z-10 px-5 pb-5 pt-0">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />
                <p className="text-sm text-zinc-400 font-light leading-relaxed whitespace-pre-line">
                  {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ---------------- Main Component ---------------- */
const Faq = () => {
  const { openDemoBooking } = useDemoBooking();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 md:py-32 overflow-hidden bg-transparent">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.08) 0%, transparent 60%)',
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
            }}
          >
            <HelpCircle className="w-4 h-4 text-violet-400" />
            <span className="text-xs tracking-[0.15em] uppercase text-violet-400">FAQ</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extralight tracking-tight mb-4">
            <span 
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-base font-extralight text-zinc-500">
            How the commercial layer works—on and off the rail.
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {faqs.map((faq, index) => (
            <FaqItem
              key={faq.q}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-xl mx-auto">
            170+ agencies are already through the rail.
            <br />
            <span className="text-zinc-500">
              The question is whether your agency wants to keep operating with partial control, or start
              converting, collecting, and retaining at a higher standard.
            </span>
          </p>
          <p className="mt-6 text-sm text-zinc-500 font-light">
            <button
              type="button"
              onClick={openDemoBooking}
              className="text-violet-400 hover:text-violet-300 transition-colors underline underline-offset-4"
            >
              Book a demo
            </button>
            {' '}and we will answer what is left live.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;
