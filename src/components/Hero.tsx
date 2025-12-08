/**
 * Hero.tsx
 * Chrome-safe hero with simplified animations - no blur/backdrop filters
 */

import {
  motion,
  Variants,
  useInView,
} from 'motion/react';
import { useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';

import demoVideo from '@/assets/EIUM_DEMO (1) (1).mp4';

import { heroData } from '@/constants';
import Title from './Title';
import VideoMaskedHero from './VideoMaskedHero';
import './VideoMaskedHero.css';

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

const demoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 80 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] } },
};

/* ---------------- Hero ---------------- */
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const isDemoInView = useInView(demoRef, { once: true, amount: 0.3 });

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
    <section className="py-16 md:py-24 relative overflow-hidden" ref={heroRef}>
      {/* STUNNING CINEMATIC BACKGROUND - Lightning & Energy */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Rich atmospheric base */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-950/10 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-rose-950/10 via-transparent to-transparent" />
        </div>
        
        {/* DRAMATIC BOTTOM GLOW - Foundation light */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[600px]"
          style={{
            background: 'radial-gradient(ellipse 100% 50% at 50% 100%, rgba(251,146,60,0.15), rgba(244,63,94,0.1) 40%, transparent 70%)',
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* GIANT SOFT AURORA CLOUDS - Smooth, beautiful */}
        <motion.div
          className="absolute w-[1200px] h-[800px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(251,146,60,0.12) 0%, rgba(244,63,94,0.08) 50%, transparent 80%)',
            left: '-10%',
            top: '20%',
            filter: 'blur(120px)',
          }}
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          className="absolute w-[1000px] h-[700px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(244,63,94,0.10) 0%, rgba(217,70,239,0.08) 50%, transparent 80%)',
            right: '-5%',
            top: '10%',
            filter: 'blur(110px)',
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* ELECTRIC LIGHTNING BOLTS */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`lightning-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: `${20 + i * 30}%`,
              top: '0%',
              width: '2px',
              height: '100%',
              background: `linear-gradient(180deg, 
                transparent 0%, 
                rgba(251,146,60,${0.3 + i * 0.1}) 20%, 
                rgba(244,63,94,${0.4 + i * 0.1}) 40%,
                rgba(251,146,60,${0.3 + i * 0.1}) 60%,
                transparent 100%
              )`,
              filter: 'blur(2px)',
              transformOrigin: 'top center',
            }}
            animate={{
              opacity: [0, 0, 0.8, 0.5, 0.9, 0, 0],
              scaleY: [0, 0.3, 1, 0.8, 1, 0.6, 0],
              x: [0, -10, 5, -5, 0, 10, 0],
            }}
            transition={{
              duration: 2 + i * 0.5,
              delay: i * 2,
              repeat: Infinity,
              repeatDelay: 4 + i,
              ease: 'easeOut',
            }}
          />
        ))}
        
        {/* ENERGY BEAMS - Dramatic light rays */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`beam-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: `${15 + i * 25}%`,
              bottom: '0',
              width: '1px',
              height: '80%',
              background: `linear-gradient(0deg, 
                rgba(251,146,60,0.2) 0%, 
                rgba(244,63,94,0.15) 50%, 
                transparent 100%
              )`,
              filter: 'blur(1px)',
            }}
            animate={{
              opacity: [0.2, 0.6, 0.3, 0.7, 0.2],
              scaleY: [0.8, 1, 0.9, 1, 0.8],
            }}
            transition={{
              duration: 3 + i * 0.5,
              delay: i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
        
        {/* FLOATING ENERGY PARTICLES - Intentional, beautiful */}
        {Array.from({ length: 20 }).map((_, i) => {
          const size = 1 + Math.random() * 2;
          const startX = Math.random() * 100;
          const startY = 60 + Math.random() * 40;
          
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${startX}%`,
                top: `${startY}%`,
                width: `${size}px`,
                height: `${size}px`,
                background: i % 3 === 0 
                  ? 'rgba(251,146,60,0.6)' 
                  : i % 3 === 1 
                  ? 'rgba(244,63,94,0.5)' 
                  : 'rgba(217,70,239,0.4)',
                boxShadow: `0 0 ${size * 3}px currentColor`,
                filter: `blur(${size * 0.3}px)`,
              }}
              animate={{
                y: [0, -400],
                x: [0, (Math.random() - 0.5) * 100],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.3],
              }}
              transition={{
                duration: 6 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: 'easeOut',
              }}
            />
          );
        })}
        
        {/* GLOWING HORIZON LINE */}
        <motion.div
          className="absolute left-0 right-0 h-[2px] pointer-events-none"
          style={{
            top: '40%',
            background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.4) 20%, rgba(244,63,94,0.5) 50%, rgba(251,146,60,0.4) 80%, transparent)',
            filter: 'blur(3px)',
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scaleX: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* RADIAL GLOW BURSTS - Strategic placement */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: '20%',
            top: '30%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(251,146,60,0.15) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          className="absolute pointer-events-none"
          style={{
            right: '15%',
            top: '50%',
            width: '350px',
            height: '350px',
            background: 'radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 60%)',
            filter: 'blur(50px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 5,
            delay: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* SUBTLE FILM GRAIN for premium feel */}
        <div 
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />
        
        {/* VIGNETTE for depth */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
          }}
        />
      </div>

      <motion.div
        variants={heroVariant}
        initial="start"
        animate="end"
        className="container text-center relative z-10"
      >
        <div className="max-w-6xl mx-auto px-4">
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
              <Title title={heroData.sectionTitle} deco={heroData.decoTitle} />
            </div>
          </motion.div>

          {/* Subcopy - revenue proof, specific outcomes */}
          <motion.p
            variants={heroChildVariant}
            className="text-xl md:text-2xl text-slate-200 mt-10 md:mt-12 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            {heroData.sectionText}
          </motion.p>

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

      {/* CINEMATIC VIDEO-MASKED TEXT SECTION */}
      {/* <VideoMaskedHero /> */}
    </section>
  );
};

export default Hero;
