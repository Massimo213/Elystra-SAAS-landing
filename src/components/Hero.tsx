/**
 * Hero.tsx
 * Chrome-safe hero with simplified animations - no blur/backdrop filters
 */

import {
  motion,
  Variants,
} from 'motion/react';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { SparklesCore } from '@/components/ui/sparkles';
import { WavyBackground } from '@/components/ui/wavy-background';

import { heroData } from '@/constants';
import Title from './Title';

/* ---------------- Motion variants (Chrome-safe - no filters) ---------------- */
const heroVariant: Variants = { 
  start: {}, 
  end: { 
    transition: { staggerChildren: 0.2, delayChildren: 0.5 } 
  } 
};

const heroChildVariant: Variants = {
  start: { y: 40, opacity: 0, scale: 0.95 },
  end: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/* ---------------- Hero ---------------- */
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative overflow-hidden min-h-screen" ref={heroRef}>
      {/* 🌊 WAVY BACKGROUND — Brand colors flowing */}
      <div className="absolute inset-0 z-0">
        <WavyBackground
          containerClassName="absolute inset-0"
          className="hidden"
          backgroundFill="black"
          waveOpacity={0.4}
          blur={15}
          speed="slow"
          waveWidth={80}
        />
      </div>
      
      {/* ✨ SPARKLES LAYER — on top of waves */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.8}
          particleDensity={80}
          speed={2}
          className="w-full h-full"
          particleColor="#ffffff"
        />
      </div>
      
      {/* Subtle vignette for depth */}
      <div 
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      <motion.div
        variants={heroVariant}
        initial="start"
        animate="end"
        className="container text-center relative z-10 pt-20 md:pt-28 pb-16 md:pb-24"
      >
        <div className="max-w-6xl mx-auto px-4">
          {/* Badge - simplified, no backdrop-blur */}
          <motion.p
            variants={heroChildVariant}
            className="text-xs md:text-sm uppercase tracking-wider max-w-max mx-auto px-4 py-2 rounded-full border mb-6 md:mb-8 bg-gradient-to-r from-orange-500/10 to-rose-500/10 border-orange-500/30 text-orange-200 shadow-lg"
          >
            {heroData.sectionSubtitle}
          </motion.p>

          {/* Title + Subtext — Linear-style unified animation */}
          <div className="relative">
            <Title 
              title={heroData.sectionTitle} 
              deco={heroData.decoTitle}
              subtext={heroData.sectionText}
            />
          </div>

          {/* CTA - Apple-grade glass morphic button */}
          <motion.div variants={heroChildVariant} className="flex justify-center mt-10 md:mt-12">
              <motion.div
              className="relative group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glow layer behind button */}
              <motion.div
                className="absolute -inset-2 rounded-[32px] opacity-60"
                style={{
                  background: 'linear-gradient(135deg, rgba(251,146,60,0.6), rgba(244,63,94,0.6))',
                  filter: 'blur(30px)',
                }}
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity, 
                  ease: 'easeInOut',
                }}
              />
              
            <a href="https://calendly.com/onboarding-elystra/30min" target="_blank" rel="noopener noreferrer">
              <Button 
                className="relative text-lg md:text-xl px-12 md:px-16 py-6 md:py-8 rounded-[28px] font-bold border-0 overflow-hidden transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #fb923c 0%, #f43f5e 100%)',
                  boxShadow: `
                    0 1px 2px rgba(0, 0, 0, 0.1),
                    0 2px 4px rgba(0, 0, 0, 0.1),
                    0 4px 8px rgba(0, 0, 0, 0.1),
                    0 8px 16px rgba(251, 146, 60, 0.3),
                    0 16px 32px rgba(244, 63, 94, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                  `,
                }}
              >
                {/* Glass shine overlay */}
                <span
                  className="absolute inset-0 rounded-[28px]"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
                  }}
                />
                
                {/* Animated shimmer effect */}
                <motion.span
                  className="absolute inset-0 rounded-[28px]"
                  style={{
                    background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                  }}
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 1,
                  }}
                />
                
                {/* Inner glow on hover */}
                <span
                  className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)',
                  }}
                />
                
                <span className="relative z-10 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                  Book a Call
                </span>
              </Button>
            </a>
              
              {/* Bottom reflection */}
              <div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-4 opacity-30"
                style={{
                  background: 'radial-gradient(ellipse, rgba(251,146,60,0.4), transparent)',
                  filter: 'blur(8px)',
                }}
              />
            </motion.div>
          </motion.div>
          </div>

        {/* 
          ====================================================================
          OLD DEMO SECTION - COMMENTED OUT (Will restore when new demo ready)
          ====================================================================
        */}
        {/* 
        <motion.div
          ref={demoRef}
          variants={demoVariants}
          initial="hidden"
          animate={isDemoInView ? 'visible' : 'hidden'}
          className="mt-16 md:mt-24 relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={isDemoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-center mb-10 md:mb-12"
          >
            <motion.span
              className="inline-block text-[11px] md:text-xs uppercase tracking-[0.18em] font-bold mb-3 px-5 py-2 rounded-full border bg-gradient-to-r from-orange-500/10 to-rose-500/10 border-orange-500/30 text-orange-200 shadow-lg"
            >
              See It In Action
            </motion.span>

            <motion.h3
              className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight text-slate-200"
            >
              Watch Magic Happen
            </motion.h3>

            <motion.p
              className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isDemoInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              From messy client calls to polished proposals in seconds. No friction. 
            </motion.p>
          </motion.div>

          <motion.div
            className="relative max-w-6xl mx-auto"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={isDemoInView ? { scale: 1, opacity: 1 } : { scale: 0.98, opacity: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className="absolute -inset-1 rounded-3xl opacity-75 bg-gradient-to-r from-orange-500 via-rose-500 to-purple-500"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            />
            
            <Dialog>
              <DialogTrigger asChild>
                <motion.div
                  className="relative bg-black rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <AspectRatio ratio={16 / 9}>
                    <video
                      ref={previewVideoRef}
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      style={{ transform: 'translateZ(0)' }}
                    >
                      <source src={demoVideo} type="video/mp4" />
                    </video>
                  </AspectRatio>

                  <div className="pointer-events-none absolute inset-0 rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span className="select-none text-[11px] md:text-xs font-semibold text-white bg-black/50 px-2.5 py-1 rounded-full border border-white/20">
                        2×
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                      <span className="select-none text-[11px] md:text-xs text-slate-200 bg-black/50 px-2.5 py-1 rounded-full border border-white/15">
                        Click to expand • sound available
                      </span>
                    </div>
                  </div>
                </motion.div>
              </DialogTrigger>

              <DialogContent className="p-0 overflow-hidden max-w-[92vw] max-h-[90vh] bg-black border-0 rounded-2xl">
                <div className="relative w-full h-full">
                  <AspectRatio ratio={16 / 9}>
                    <video
                      ref={dialogVideoRef}
                      className="absolute inset-0 w-full h-full object-contain"
                      controls
                      autoPlay
                      muted
                      playsInline
                      preload="auto"
                      onLoadedMetadata={(e) => {
                        try { (e.currentTarget as HTMLVideoElement).playbackRate = 2; } catch {}
                      }}
                    >
                      <source src={demoVideo} type="video/mp4" />
                    </video>
                  </AspectRatio>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </motion.div>
        */}

        {/* 
          ====================================================================
          NEW KILLER VIDEO-MASKED HERO
          ====================================================================
        */}
      </motion.div>

    </section>
  );
};

export default Hero;
