/**
 * Title.tsx — Linear-Quality Text Reveal Animation
 * 
 * The psychology of great text animation:
 * 1. Blur → Sharp (perceived emergence from depth)
 * 2. Subtle Y movement (10-20px max, not dramatic)
 * 3. Spring easing (feels organic, alive)
 * 4. Perfect staggering (0.06-0.1s between words)
 * 5. Scale micro-animation (0.97 → 1.0 for perceived "pop")
 * 
 * This creates the "Linear feel" — refined, intentional, magnetic.
 */

import { motion, Variants } from 'motion/react';

/* ═══════════════════════════════════════════════════════════
   ANIMATION VARIANTS — Linear-inspired timing
   ═══════════════════════════════════════════════════════════ */

/** Word-by-word reveal with blur + subtle lift */
const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(10px)',
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
  },
};

/** Subtext reveal — follows title with delay */
const subtextVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1], // Smooth out-expo
    },
  },
};

/** Gradient accent word — special treatment */
const accentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
    filter: 'blur(12px)',
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1], // Expo out — the "snap" feel
    },
  },
};

/* ═══════════════════════════════════════════════════════════
   TITLE COMPONENT
   ═══════════════════════════════════════════════════════════ */

interface TitleProps {
  title: string;
  deco: string;
  subtext?: string;
}

const Title = ({ title, deco, subtext }: TitleProps) => {
  // Split title into individual words for staggered animation
  const words = title.split(' ');

  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Ambient glow — breathes behind text */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 45%, rgba(251,146,60,0.15), transparent 70%)',
          filter: 'blur(60px)',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0, 0.6, 0.4],
          scale: [0.8, 1.1, 1],
        }}
        transition={{
          duration: 2,
          ease: 'easeOut',
          times: [0, 0.6, 1],
        }}
      />

      <div className="relative">
        {/* ═══ MAIN TITLE ═══ */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] text-white text-center">
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              className="inline-block mr-[0.25em] last:mr-0"
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 0.7,
                delay: i * 0.08, // 80ms stagger — Linear's sweet spot
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* ═══ ACCENT WORD (Gradient) ═══ */}
        <motion.h2
          className="mt-2 md:mt-4 text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[1.0] text-center"
          variants={accentVariants}
          initial="hidden"
          animate="visible"
          transition={{
            delay: words.length * 0.08 + 0.15, // After title completes + small gap
          }}
        >
          <span
            className="relative inline-block bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #fb923c 0%, #f43f5e 50%, #e879f9 100%)',
            }}
          >
            {deco}
            
            {/* Underline glow — pulses subtly */}
            <motion.span
              className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-[3px] md:h-1 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #fb923c, #f43f5e, #e879f9)',
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                delay: words.length * 0.08 + 0.4,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
            
            {/* Glow behind underline */}
            <motion.span
              className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-2 md:h-3"
              style={{
                background: 'linear-gradient(90deg, #fb923c, #f43f5e, #e879f9)',
                filter: 'blur(12px)',
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ 
                scaleX: 1, 
                opacity: [0, 0.8, 0.5],
              }}
              transition={{
                delay: words.length * 0.08 + 0.5,
                duration: 0.8,
                ease: 'easeOut',
              }}
            />
          </span>
        </motion.h2>

        {/* ═══ SUBTEXT ═══ */}
        {subtext && (
          <motion.p
            className="mt-6 md:mt-8 text-lg md:text-xl lg:text-2xl text-slate-300/90 text-center max-w-3xl mx-auto leading-relaxed font-light"
            variants={subtextVariants}
            initial="hidden"
            animate="visible"
            transition={{
              delay: words.length * 0.08 + 0.6, // After accent word
            }}
          >
            {subtext}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default Title;
