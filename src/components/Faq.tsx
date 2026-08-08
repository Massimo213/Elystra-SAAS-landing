/**
 * Faq.tsx — Final 9-question FAQ (commercial OS positioning)
 */

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useDemoBooking } from '@/contexts/DemoBookingContext';
import { FAQ_ITEMS as faqs } from '@/data/faqs';

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
          <p className="text-base font-extralight text-zinc-500"> How the commercial layer works, on and off the rail. </p>
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
              onClick={() => openDemoBooking()}
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
