/** ——————————————————————————————
 *  HERO TITLE (Agency-style)
 *  Cascade words → DAYS badge → kinetic "60 SECONDS"
 *  Warm palette (amber → rose → fuchsia). Chrome-safe.
 *  —————————————————————————————— */

import { motion, Variants } from 'motion/react';

/** Smooth shimmer: constant-velocity, no mix-blend */






const Title = ({ title, deco }: { title: string; deco: string }) => {
  // Split title into lines for cascading drop animation
  const titleWords = title.split(' ');
  
  // "Where Proposals" drops first
  const line1 = titleWords.slice(0, 2).join(' ');
  // "Become Revenue" drops second
  const line2 = titleWords.slice(2).join(' ');
  
  /** Cascading drop animation variants */
  const dropVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: -60,
      rotateX: -90,
      scale: 0.8,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      } 
    },
  };

  return (
    <div className="relative mx-auto max-w-5xl" style={{ perspective: '1200px' }}>
      {/* Dynamic glow behind title - pulses and shifts */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(251,146,60,0.2), transparent)',
          filter: 'blur(80px)',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <div className="relative isolate">
        {/* Line 1: "Where Proposals" - drops first */}
        <motion.h1
          className="select-none text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] text-white mb-2"
          initial="hidden"
          animate="visible"
          variants={dropVariants}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {line1}
        </motion.h1>

        {/* Line 2: "Become Revenue" - drops second */}
        <motion.h1
          className="select-none text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] text-white mb-2"
          initial={{ opacity: 0, y: -60, rotateX: -90, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ 
            duration: 0.8,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {line2}
        </motion.h1>

        {/* Line 3: "Instantly." - drops third with extra impact */}
        <motion.h2
          className="mt-2 md:mt-4 select-none text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[1.0]"
          initial={{ opacity: 0, y: -80, rotateX: -90, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ 
            duration: 1,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <span
            className="bg-clip-text text-transparent relative inline-block"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #fb923c 0%, #f43f5e 50%, #e879f9 100%)',
            }}
          >
            {deco}
            {/* Animated glow under "Instantly" */}
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-1 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #fb923c, #f43f5e, #e879f9)',
                filter: 'blur(8px)',
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scaleX: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </span>
        </motion.h2>
      </div>
    </div>
  );
};

export default Title;
