/**
 * Hero.tsx
 * Chrome-safe hero with simplified animations - no blur/backdrop filters
 */

import {
  motion,
  Variants,
  useScroll,
  useTransform,
  useInView,
} from 'motion/react';
import { useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';

import p1 from '@/assets/p1.png';
import p2 from '@/assets/p2.png';
import p3 from '@/assets/p3.png';
import p4 from '@/assets/p4.png';
import demoVideo from '@/assets/EIUM_DEMO (1) (1).mp4';

import { heroData } from '@/constants';
import Title from './Title';

/* ---------------- Motion variants (Chrome-safe - no filters) ---------------- */
const heroVariant: Variants = { 
  start: {}, 
  end: { 
    transition: { staggerChildren: 0.35 } 
  } 
};

const heroChildVariant: Variants = {
  start: { y: 30, opacity: 0 },
  end: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const demoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 80 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] } },
};

/* ---------------- Simple static orbs (no blur at all) ---------------- */
const SimpleOrb = ({ size = 'w-4 h-4', left = '10%', top = '20%', color = 'bg-orange-400' }: { 
  size?: string; 
  left?: string; 
  top?: string; 
  color?: string; 
}) => (
  <div
    className={`absolute ${size} ${color} rounded-full opacity-20`}
    style={{ left, top }}
  />
);



/* ---------------- Hero ---------------- */
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const isDemoInView = useInView(demoRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start end', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -42]);

  // Demo video refs for 2× autoplay
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const dialogVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const pv = previewVideoRef.current;
    const dv = dialogVideoRef.current;
    const setSpeed = (el?: HTMLVideoElement | null) => { 
      if (!el) return; 
      try { el.playbackRate = 2; } catch {} 
    };
    const handleLoaded = (e: Event) => setSpeed(e.currentTarget as HTMLVideoElement);

    if (pv) { 
      pv.muted = true; 
      pv.setAttribute('playsinline', ''); 
      pv.style.transform = 'translateZ(0)'; 
      pv.addEventListener('loadedmetadata', handleLoaded); 
      setSpeed(pv); 
    }
    if (dv) { 
      dv.muted = true; 
      dv.setAttribute('playsinline', ''); 
      dv.addEventListener('loadedmetadata', handleLoaded); 
      setSpeed(dv); 
    }

    return () => { 
      pv?.removeEventListener('loadedmetadata', handleLoaded); 
      dv?.removeEventListener('loadedmetadata', handleLoaded); 
    };
  }, []);

  return (
    <section className="py-10 md:py-16 relative overflow-hidden" ref={heroRef}>
      {/* Simple static background elements */}
      <SimpleOrb size="w-24 h-24" left="5%" top="10%" color="bg-orange-400" />
      <SimpleOrb size="w-28 h-28" left="85%" top="20%" color="bg-rose-400" />
      <SimpleOrb size="w-20 h-20" left="50%" top="80%" color="bg-purple-400" />

      <motion.div
        variants={heroVariant}
        initial="start"
        animate="end"
        className="container text-center relative z-10"
        style={{ y: titleY }}
      >
        <div className="max-w-screen-md mx-auto">
          {/* Badge - simplified, no backdrop-blur */}
          <motion.p
            variants={heroChildVariant}
            className="text-xs md:text-sm uppercase tracking-wider max-w-max mx-auto px-4 py-2 rounded-full border mb-6 md:mb-8 bg-gradient-to-r from-orange-500/10 to-rose-500/10 border-orange-500/30 text-orange-200 shadow-lg"
          >
            {heroData.sectionSubtitle}
          </motion.p>

          {/* Title (Chrome-safe) */}
          <motion.div variants={heroChildVariant}>
            <div className="relative">
            <Title deco={heroData.decoTitle} />
            </div>
          </motion.div>

          

          {/* Subcopy */}
          <motion.p
            variants={heroChildVariant}
            className="md:text-xl text-slate-300 mt-6"
          >
            {heroData.sectionText}
          </motion.p>

          {/* CTA */}
          <motion.div variants={heroChildVariant} className="flex justify-center gap-2 mt-6 md:mt-8">
            <a href="https://app.elystra.online/sign-up">
              <Button className="bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white px-8 py-3 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                Start Now
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
          className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <div className="relative">
            <div className="flex -space-x-3 sm:-space-x-4">
              <img src={p1} alt="User 1" className="w-10 h-10 sm:w-12 sm:h-10 rounded-full object-cover border-2 border-background shadow-md" />
              <img src={p2} alt="User 2" className="w-10 h-10 sm:w-12 sm:h-10 rounded-full object-cover border-2 border-background shadow-md" />
              <img src={p3} alt="User 3" className="w-10 h-10 sm:w-12 sm:h-10 rounded-full object-cover border-2 border-background shadow-md" />
              <img src={p4} alt="User 4" className="w-10 h-10 sm:w-12 sm:h-10 rounded-full object-cover border-2 border-background shadow-md" />
            </div>
            {/* Simple hearts - no complex animations */}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 text-rose-400 text-sm pointer-events-none"
                initial={{ opacity: 0, scale: 0.6, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 0.9, 0],
                  scale: [0.6, 1, 0.85],
                  x: [0, Math.round(Math.random() * 60 - 30), Math.round(Math.random() * 80 - 40)],
                  y: [0, -40 - Math.random() * 24, -70 - Math.random() * 30],
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2, 
                  delay: Math.random() * 2, 
                  repeat: Infinity, 
                  ease: 'easeOut' 
                }}
              >
                ♥︎
              </motion.span>
            ))}
          </div>
          <p className="text-sm sm:text-base text-slate-400 font-medium">
            Loved and Trusted by more than 1200+ Users
          </p>
        </motion.div>

        {/* DEMO - Chrome safe */}
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
              From messy client calls to polished proposals in seconds. No friction. No fluff.
            </motion.p>
          </motion.div>

          <motion.div
            className="relative max-w-6xl mx-auto"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={isDemoInView ? { scale: 1, opacity: 1 } : { scale: 0.98, opacity: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Simple rotating border - no blur */}
            <motion.div
              className="absolute -inset-1 rounded-3xl opacity-80 bg-gradient-to-r from-orange-500 via-rose-500 to-purple-500"
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

                  {/* Simple overlay UI - no backdrop-blur */}
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
      </motion.div>
    </section>
  );
};

export default Hero;
