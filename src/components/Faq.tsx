/**
 * Faq.tsx
 * ELYSTRA — Full FAQ with objection-killing answers
 * Speaks in money, risk, and time — not features
 */

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

/* ---------------- FAQ Data ---------------- */
const faqs = [
  {
    q: "Does Elystra require me to change my workflow?",
    a: "No.\nYou keep your sales calls, your CRM, your PM tool, your pricing.\n\nElystra sits under your current process and removes one thing only: the 2–14 day gap between \"yes\" and money in the account.\n\nIf you can run a call, send a proposal, and collect a payment — you already know how to \"use\" Elystra. We just compress it into one rail.",
  },
  {
    q: "How fast can I close my first deal with Elystra?",
    a: "Usually within 24–72 hours of turning it on.\n\nFor most agencies:\n• Demo day: we build your first template on the call.\n• Same day: you run a real prospect through the rail.\n• Within 1–3 days: that deal is either signed + paid, or you have a crystal-clear \"no\".\n\nOur 30-day guarantee is built around this: \"Run at least one real deal through Elystra. If your close-rate doesn't move, you pay nothing.\"",
  },
  {
    q: "What tools does Elystra replace?",
    a: "At minimum:\n• Proposal software (PandaDoc/Proposify/etc.)\n• DocuSign / e-signature tools\n• Stripe payment links / manual invoices\n• Spreadsheet tracking of \"who signed / who paid / which template works\"\n\nIn many shops it also quietly replaces:\n• A chunk of sales admin headcount\n• A chunk of \"follow-up\" time that never happens\n\nYou keep your CRM and PM. Elystra becomes the proposal → sign → pay layer that connects them.",
  },
  {
    q: "Will Elystra work with my revenue model (retainers, projects, performance, hybrids)?",
    a: "Yes. The rail doesn't care what you sell.\n• Monthly retainers\n• One-off projects\n• Performance / rev-share\n• Hybrid retainers + upsells\n• Irregular, \"we build a custom thing each time\" work\n\nYou define how you charge. Elystra just ensures that once someone says \"yes\", they sign and pay inside that same motion instead of drifting for 2–3 weeks.",
  },
  {
    q: "Will it work with custom pricing or service scopes?",
    a: "Yes. That's the default, not the edge case.\n• We build your first templates on the demo call.\n• You or your team tweak scope, pricing, clauses per deal.\n• The system keeps everything on-brand, trackable and fast.\n\nIf your current \"custom scope\" approach is \"Copy old deck → rewrite → reformat → export PDF\"… you'll feel the speed difference in the first week.",
  },
  {
    q: "How does pricing work?",
    a: "Flat monthly. Unlimited users. Unlimited proposals. Unlimited signatures. Unlimited deposits.\n\nNo per-seat tax. No per-proposal tax. No % of deals.\n\nIf you're losing even one deal a month to the \"we'll get back to you\" gap, Elystra is cheaper than your current system.\n\nAnd if the first 30 days don't move your close-rate? We refund you and switch you off. No forms, no \"conditions\".",
  },
  {
    q: "What if my clients are slow to sign?",
    a: "That's exactly what Elystra is built to kill.\n\nSlow signing usually means:\n• proposal went cold in their inbox\n• no clear payment path\n• no structured follow-up\n• multiple people internally, no one owning the decision\n\nElystra attacks all of that:\n• They review → sign → pay on one screen\n• Behavioral X-ray shows who's reading what, when, and with whom\n• Follow-up queue tells your team who to call now vs who to ignore\n\nYour \"slow\" clients either commit inside the call window, or they cleanly disqualify themselves. No more 3-week limbo.",
  },
  {
    q: "Does Elystra work for high-ticket agencies?",
    a: "Yes. Elystra was built for high-ticket first.\n\nWhether it's $5K retainers, $50K projects, or $150K+ scopes — they all run on the same rail:\n• scoped from the call\n• signed on the proposal page\n• deposit collected immediately\n• internal onboarding triggered automatically\n\nThe bigger the deal, the more expensive your current \"gap\" is. Elystra makes that gap smaller.",
  },
  {
    q: "What if I have a complex, multi-step onboarding process?",
    a: "Elystra doesn't remove steps. It removes manual handoffs.\n\nAfter signature + payment, you can have Elystra:\n• create the deal in your CRM\n• fire tasks + checklists in your PM tool\n• send Slack/Email notifications to your team\n• trigger finance workflows (invoice, PO, records)\n\nYour internal process can stay as complex as you like. You just stop depending on humans to remember 12 steps after every close.",
  },
  {
    q: "Do I need to change my sales calls?",
    a: "No.\n• You don't need a new script.\n• You don't need \"Elystra-style closing lines\".\n• You don't need training modules.\n\nTalk the way you talk today. Elystra listens to the call / notes, builds the proposal, and gives you a rail where \"yes\" automatically routes to signed + paid.\n\nIf anything, Elystra lets you be more direct: \"If this makes sense, we'll send you the proposal while we're still on the call and you can sign + pay in one motion.\"",
  },
  {
    q: "What is the learning curve?",
    a: "For a closer who can already sell: about one deal.\n• We set up your first templates on the demo + onboarding.\n• You run one real call through it.\n• After that, you repeat the same clicks.\n\nIf someone can't pick this up in under 5 minutes, they don't have a tech problem. They have a performance problem.",
  },
  {
    q: "What if I already have a proposal system?",
    a: "Then you know its limits better than anyone.\n\nIf your current \"system\" still involves typing into a doc, formatting, exporting, attaching, waiting… you don't have a system. You have manual labor with nicer UI.\n\nElystra isn't \"another proposal tool\". It's:\n• proposal generation from call\n• signature on the page\n• payment on the page\n• follow-up automation\n• deal intelligence\n• ops handoff\n\nIf your current stack truly closes deals on the call with full analytics and zero admin, keep it. If not, Elystra will feel like cheating.",
  },
  {
    q: "Does Elystra support retainers?",
    a: "Yes. This is where it prints the most money.\n\nA typical retainer flow:\n1. You set monthly/quarterly rate inside Elystra.\n2. Client signs the retainer agreement on the proposal page.\n3. Stripe handles recurring billing on autopilot.\n4. You get predictable cash every month/quarter with zero chasing.\n\nNo manual invoices. No \"just bumping this to the top of your inbox.\" You either have a live retainer lane, or you don't.",
  },
  {
    q: "What if my team does not use it?",
    a: "Then two things are true:\n1. Your close-rate and time-to-cash won't change.\n2. You shouldn't keep paying for Elystra.\n\nWe don't make money if Elystra becomes \"another icon on the dock\". Our best customers make it clear internally: \"This is the rail. Deals run on this or they don't run.\"\n\nWe support you with templates, onboarding, and a simple playbook. But enforcement is on your side. If you won't enforce it, don't book a demo.",
  },
  {
    q: "Who is Elystra not for?",
    a: "• Agencies who are comfortable waiting 7–21 days for signed proposals\n• Teams who hate process and ignore any tool you give them\n• Owners who want \"shiny\" software, not more closed revenue\n\nIf you're happy typing into docs, sending PDFs, chasing signatures, waiting for Stripe invoices to be paid… you don't need Elystra.\n\nIf you look at your pipeline and know there's money dying between \"yes\" and \"paid\", the only logical next step is to see the rail live for 7 minutes.\n\nBook the demo. Judge it in your own numbers.",
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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-transparent">
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
            Real questions from agencies. Straight answers.
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
              key={index}
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
          <p className="text-sm text-zinc-500 font-light">
            Still have questions?{' '}
            <a 
              href="https://calendly.com/onboarding-elystra/30min" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 transition-colors underline underline-offset-4"
            >
              Book a demo and we will answer everything live
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;
