/**
 * GetStarted.tsx
 * ELYSTRA — PREMIUM TIER
 * Final conversion section with FAQ
 */

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import Faq from '@/components/Faq';
import { ArrowRight, Sparkles, Play } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.6,
      staggerChildren: 0.15,
      delayChildren: 0.2
    } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const GetStarted = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section 
      id="get-started" 
      ref={sectionRef}
      className="py-24 md:py-32 bg-transparent relative overflow-hidden"
    >
      {/* Optimized Background - Static gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 60%)',
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 60%)',
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 max-w-4xl mx-auto px-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight mb-6">
            <span 
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Close Deals While You're Still
            </span>
            <br />
            <span 
              style={{
                background: 'linear-gradient(135deg, #a855f7 0%, #c084fc 50%, #e879f9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              On the Call.
            </span>
          </h2>
          
          <p className="text-lg font-extralight text-zinc-400 max-w-2xl mx-auto mb-10">
            Elystra auto-builds your proposal, sends it live, gets the signature, and charges the card in under 4 minutes.
            <br />
            <span className="text-zinc-500">No PDFs. No waiting. No admin. Just cash.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA */}
            <motion.a
              href="https://calendly.com/onboarding-elystra/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button bg */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%)',
                  boxShadow: '0 0 40px rgba(139, 92, 246, 0.3)',
                }}
              />
              
              {/* Static shine */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
                }}
              />
              
              <div className="relative z-10 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-white" />
                <span className="text-lg font-medium text-white">
                  Book a 7-Minute Demo
                </span>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="https://app.elystra.online"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              whileHover={{ scale: 1.02, borderColor: 'rgba(139, 92, 246, 0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-zinc-300 font-light">Start Self-Onboarding</span>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      {/* FAQ Section */}
      <Faq />
    </section>
  );
};

export default GetStarted;
