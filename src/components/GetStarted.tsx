/**
 * GetStarted.tsx
 * FAQ section with single CTA. No secondary action.
 */

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import Faq from '@/components/Faq';
import { ArrowRight, Sparkles } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.15, delayChildren: 0.2 } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const GetStarted = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section 
      id="faq" 
      ref={sectionRef}
      className="py-24 md:py-32 bg-transparent relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 60%)' }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 max-w-4xl mx-auto px-6"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-lg font-extralight text-zinc-400 max-w-2xl mx-auto mb-10">
            Proposal built from the call. Signed on screen. Deposit collected. Under 4 minutes.
            <br />
            <span className="text-zinc-500">No PDFs. No waiting. No admin.</span>
          </p>

          <motion.a
            href="https://calendly.com/onboarding-elystra/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%)',
                boxShadow: '0 0 40px rgba(139, 92, 246, 0.3)',
              }}
            />
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: 'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)' }}
            />
            <div className="relative z-10 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-lg font-medium text-white">Book a 7-Minute Demo</span>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>

          <p className="mt-5 text-sm text-zinc-600 font-light">
            30-day guarantee · close-rate moves or you pay nothing
          </p>
        </motion.div>
      </motion.div>

      <Faq />
    </section>
  );
};

export default GetStarted;
