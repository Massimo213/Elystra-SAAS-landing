/** ——————————————————————————————
 *  HERO TITLE (Agency-style)
 *  Cascade words → DAYS badge → kinetic "60 SECONDS"
 *  Warm palette (amber → rose → fuchsia). Chrome-safe.
 *  —————————————————————————————— */

import { motion, Variants } from 'motion/react';

/** Smooth shimmer: constant-velocity, no mix-blend */






const Title = ({ deco }: { title?: string; deco: string }) => {
  /** Cascade for the first four words */
  const cascadeVar: Variants = {
    visible: { transition: { staggerChildren: 0.07 } },
  };
  
  const secondsVar: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: [0.9, 1.12, 1],
      transition: { duration: 1, ease: 'easeOut' },
    },
  };

  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Warm halo (no blur filters) */}
      <motion.div
        className="absolute -inset-6 rounded-[36px] opacity-35"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(251,146,60,0.4), rgba(244,63,94,0.4), rgba(217,70,239,0.4), rgba(251,146,60,0.4))',
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />

      {/* LINE 1 — Cascade words + DAYS badge + to + kinetic 60 SECONDS */}
      <div className="relative isolate">
        <motion.h1
          className="select-none text-[2.8rem] md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08]"
          initial="hidden"
          animate="visible"
          variants={cascadeVar}
        >
          {/* cascade words */}
         

          {/* DAYS badge
          <motion.span
            initial={{ scale: 0.6, rotate: -6, opacity: 0 }}
            animate={{ scale: [0.6, 1.1, 1], rotate: [0, 2, 0], opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative inline-block mr-2 align-middle"
          >
            <span className="relative z-10 px-2 py-1 rounded-md text-white font-semibold shadow-lg"
              style={{
                background:
                  'linear-gradient(135deg, rgba(245,158,11,1), rgba(244,63,94,1))',
              }}
            >
              DAYS
            </span>
            <span
              className="absolute inset-0 rounded-md"
              style={{ background: 'rgba(245,158,11,0.55)', filter: 'blur(14px)' }}
              aria-hidden
            />
          </motion.span> */}

          

          {/* 60 SECONDS */}
          <motion.span variants={secondsVar} className="inline-block font-semibold relative align-middle">
            <span className="mr-2 align-middle">
             60
            </span>
            <span
              className="bg-clip-text text-transparent align-middle"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #fb923c 0%, #f43f5e 45%, #e879f9 100%)',
              }}
            >
              SECONDS
            </span>

            {/* chrome-safe shimmer over the whole phrase */}
            {/* <SmoothShimmer /> */}
          </motion.span>
        </motion.h1>

        {/* Subline (deco) with underline pulse */}
        <motion.h2
          className="mt-3 md:mt-4 select-none text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.06] relative inline-block"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
         
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(90deg, #fb923c 0%, #f43f5e 45%, #e879f9 100%)',
              textShadow:
                '0 0 18px rgba(251,146,60,0.35), 0 0 34px rgba(244,63,94,0.25), 0 0 54px rgba(217,70,239,0.25)',
            }}
          >
            {deco}
          </span>
        </motion.h2>
      </div>
    </div>
  );
};

export default Title;
