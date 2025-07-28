/**
 * Brand.tsx
 * Apple-grade copy that speaks to outcome‑greed. Seamless with Hero via shared backdrop.
 */

import { motion, Variants } from 'motion/react';
import { useMemo, useRef } from 'react';

const fadeInUp: Variants = {
  start: { y: 24, opacity: 0, filter: 'blur(8px)' },
  end:   { y: 0,  opacity: 1, filter: 'blur(0px)', transition: { duration: 0.55, ease: 'easeOut' } },
};

const Brand = () => {
  const root = useRef<HTMLElement>(null);
  // const inView = useInView(root, { once: true, amount: 0.3 });

  const headline = useMemo(
    () => [
      'Close while intent is at peak.',
      'Cash in before the follow‑up.',
    ],
    []
  );

  return (
    <section ref={root} className="section relative overflow-hidden">
      {/* No local background. We ride on SeamlessBackdrop from Hero. */}

      <div className="container max-w-screen-lg">
        {/* Headline */}
        <div className="relative text-center">
          {headline.map((ln, i) => (
            <motion.h2
              key={ln}
              custom={i}
              variants={fadeInUp}
              initial="start"
              whileInView="end"
              viewport={{ once: true, amount: 0.5 }}
              className={`font-black tracking-tight leading-[1.06] ${
                i === 0
                  ? 'text-4xl md:text-5xl lg:text-6xl'
                  : 'text-3xl md:text-4xl lg:text-5xl mt-2'
              }`}
            >
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg,#f59e0b 0%, #fb923c 18%, #f43f5e 48%, #e879f9 82%, #f59e0b 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'brandGradient 10s linear infinite',
                  textShadow:
                    '0 0 18px rgba(253,186,116,0.24), 0 0 32px rgba(244,63,94,0.18), 0 0 42px rgba(217,70,239,0.14)',
                }}
              >
                {ln}
              </span>
            </motion.h2>
          ))}
        </div>

        {/* Subcopy */}
        <motion.p
          variants={fadeInUp}
          initial="start"
          whileInView="end"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-6 md:mt-8 text-center text-lg md:text-xl text-slate-300 max-w-3xl mx-auto"
        >
          Elystra listens once and does the paperwork for you. Structured scope. On‑brand proposal.
          E‑sign baked in. Deposit link included. Fewer steps. More wins.
        </motion.p>

        {/* Benefit chips (elegant, not childish) */}
        <motion.div
          variants={fadeInUp}
          initial="start"
          whileInView="end"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          {[
            'E‑sign + payment in one flow',
            'On‑brand in a single pass',
            'Every detail accounted for',
            'Minutes, not days',
          ].map((t) => (
            <span
              key={t}
              className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-sm text-foreground/90 backdrop-blur-md"
              style={{
                backgroundImage:
                  'radial-gradient(60% 60% at 50% 50%, rgba(251,146,60,0.10), rgba(244,63,94,0.10))',
              }}
            >
              {t}
            </span>
          ))}
        </motion.div>

        {/* Hairline divider to next content */}
        <motion.div
          aria-hidden
          variants={fadeInUp}
          initial="start"
          whileInView="end"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 md:mt-12 h-px w-full"
          style={{
            background:
              'linear-gradient(90deg, rgba(251,146,60,0), rgba(251,146,60,0.45), rgba(244,63,94,0.45), rgba(217,70,239,0.45), rgba(217,70,239,0))',
          }}
        />
      </div>

      <style>{`
        @keyframes brandGradient { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
      `}</style>
    </section>
  );
};

export default Brand;
