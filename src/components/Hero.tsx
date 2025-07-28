/**
 * Hero.tsx
 * Warm-tone title with ultra-smooth shimmer + 2× autoplay demo
 */

/**
 * Node modules
 */
import {
  motion,
  Variants,
  useScroll,
  useTransform,
  useInView,
} from 'motion/react';
import { useEffect, useRef } from 'react';

/**
 * Components
 */
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';

/**
 * Assets
 */
import p1 from '@/assets/p1.png';
import p2 from '@/assets/p2.png';
import p3 from '@/assets/p3.png';
import p4 from '@/assets/p4.png';
import demoVideo from '@/assets/EIUM_DEMO (1) (1).mp4';

/**
 * Constants
 */
import { heroData } from '@/constants';

/**
 * Framer motion variants
 */
const heroVariant: Variants = {
  start: {},
  end: { transition: { staggerChildren: 0.35 } },
};

const heroChildVariant: Variants = {
  start: { y: 30, opacity: 0, filter: 'blur(6px)' },
  end: {
    y: 0,
    opacity: 1,
    filter: 'blur(0)',
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const demoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 80, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/** ————————————————
 *  Warm Aura Orbs (no blue)
 *  ———————————————— */
const FloatingOrb = ({ delay = 0, size = 'w-4 h-4' }: { delay?: number; size?: string }) => {
  return (
    <motion.div
      className={`absolute ${size} rounded-full blur-md opacity-25`}
      style={{
        background:
          'radial-gradient(60% 60% at 50% 50%, rgba(251,146,60,0.0) 0%, rgba(251,113,133,0.45) 20%, rgba(217,70,239,0.40) 70%, rgba(251,146,60,0.0) 100%)',
      }}
      animate={{
        x: [0, 28, -18, 0],
        y: [0, -36, 18, 0],
        scale: [1, 1.15, 0.9, 1],
        opacity: [0.25, 0.6, 0.35, 0.25],
      }}
      transition={{ duration: 8, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
};

/** ————————————————
 *  Particle Burst for Title
 *  ———————————————— */
const Spark = ({ i = 0 }: { i?: number }) => {
  const d = 2 + Math.random() * 2.5;
  const r = 40 + Math.random() * 80;
  const angle = Math.random() * Math.PI * 2;
  const x = Math.cos(angle) * r;
  const y = Math.sin(angle) * r;

  return (
    <motion.span
      className="absolute w-1 h-1 rounded-full"
      style={{
        left: '50%',
        top: '50%',
        background:
          'radial-gradient(50% 50% at 50% 50%, rgba(253,186,116,1) 0%, rgba(244,63,94,1) 70%, rgba(244,63,94,0) 100%)',
        boxShadow:
          '0 0 24px rgba(251,146,60,0.6), 0 0 48px rgba(244,63,94,0.35), 0 0 64px rgba(217,70,239,0.25)',
      }}
      initial={{ x: 0, y: 0, opacity: 0, scale: 0.6 }}
      animate={{ x, y, opacity: [0, 1, 0], scale: [0.6, 1.1, 0.8] }}
      transition={{ duration: d, delay: (i % 7) * 0.08, repeat: Infinity, repeatDelay: 1.4 }}
    />
  );
};

/** ————————————————
 *  Ultra‑smooth shimmer sweep (GPU-friendly, no end easing, no pause)
 *  ———————————————— */
const SmoothShimmer = () => {
  return (
    <>
      {/* Main broad sweep */}
      <motion.span
        className="pointer-events-none absolute -inset-y-1 -inset-x-3 rotate-[10deg] mix-blend-screen will-change-transform"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 12%, rgba(255,255,255,0.85) 18%, rgba(255,255,255,0.55) 24%, rgba(255,255,255,0) 36%)',
          filter: 'blur(0.5px)',
        }}
        animate={{ x: ['-160%', '160%'] }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: 'linear', // constant velocity
          repeatDelay: 0,
        }}
      />
      {/* Thin gloss line riding ahead for depth */}
      <motion.span
        className="pointer-events-none absolute -inset-y-1 -inset-x-3 rotate-[10deg] mix-blend-screen will-change-transform"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 49%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.25) 51%, rgba(255,255,255,0) 100%)',
          opacity: 0.65,
        }}
        animate={{ x: ['-180%', '180%'] }}
        transition={{
          duration: 5.6,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 0,
        }}
      />
    </>
  );
};

/** ————————————————
 *  Title: molten gold/rose/fuchsia + smooth shimmer
 *  ———————————————— */
const Title = ({
  title,
  deco,
}: {
  title: string;
  deco: string;
}) => {
  const letterVar: Variants = {
    hidden: { opacity: 0, y: 30, rotateX: -70, rotateZ: 0.0001, filter: 'blur(6px)' },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: { delay: 0.02 * i, duration: 0.5, ease: 'easeOut' },
    }),
    hover: {
      y: -2,
      rotateZ: [-1.5, 1.5, -1.5],
      transition: { duration: 0.8, repeat: Infinity, repeatType: 'reverse' },
    },
  };

  const split = (s: string) => Array.from(s);

  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Back halo */}
      <motion.div
        className="absolute -inset-6 rounded-[36px] blur-2xl"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(251,146,60,0.25), rgba(244,63,94,0.28), rgba(217,70,239,0.28), rgba(251,146,60,0.25))',
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />

      {/* Title rows */}
      <div className="relative isolate [perspective:1000px]">
        {/* Main line (heroData.sectionTitle) */}
        <motion.h1 className="select-none text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
          <span className="relative inline-block">
            {/* Chromatic layers */}
            <span
              className="absolute inset-0 -z-10 blur-md"
              style={{
                background: 'linear-gradient(90deg, #f59e0b 0%, #f43f5e 45%, #d946ef 100%)',
                WebkitMaskImage:
                  'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.6))',
                maskImage:
                  'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.6))',
              }}
            />
            <span
              className="absolute inset-0 -z-10 blur-[36px] opacity-70"
              style={{
                background:
                  'radial-gradient(40% 50% at 50% 50%, rgba(253,186,116,0.5), rgba(244,63,94,0.35), rgba(217,70,239,0.3) 70%, transparent 100%)',
              }}
            />
            {/* Per-letter animation */}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #f59e0b 0%, #fb923c 18%, #f43f5e 48%, #e879f9 82%, #f59e0b 100%)',
                backgroundSize: '200% 100%',
                textShadow:
                  '0 0 22px rgba(253,186,116,0.35), 0 0 40px rgba(244,63,94,0.25), 0 0 60px rgba(217,70,239,0.25)',
                willChange: 'background-position',
              }}
            >
              {split(title).map((ch, i) => (
                <motion.span
                  key={`t-${i}-${ch}`}
                  className="inline-block will-change-transform"
                  variants={letterVar}
                  custom={i}
                  initial="hidden"
                  animate="show"
                  whileHover="hover"
                >
                  {ch === ' ' ? <span className="inline-block w-2" /> : ch}
                </motion.span>
              ))}
            </span>

            {/* SMOOTH shimmer sweep (replaces the old jittery one) */}
            <SmoothShimmer />
          </span>
        </motion.h1>

        {/* Deco word (heroData.decoTitle) */}
        <motion.h2 className="mt-3 md:mt-4 select-none text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.06] relative inline-block">
          {/* Underline pulse bar */}
          <motion.span
            className="absolute -bottom-3 left-0 right-0 h-[10px] rounded-full -z-10"
            style={{
              background:
                'linear-gradient(90deg, rgba(251,146,60,0.55), rgba(244,63,94,0.55), rgba(217,70,239,0.55))',
              filter: 'blur(10px)',
            }}
            animate={{ opacity: [0.5, 1, 0.5], scaleX: [0.9, 1.1, 0.9] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Per-letter molten gradient */}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(90deg, #fb923c 0%, #f43f5e 45%, #e879f9 100%)',
              backgroundSize: '180% 100%',
              textShadow:
                '0 0 18px rgba(251,146,60,0.35), 0 0 34px rgba(244,63,94,0.25), 0 0 54px rgba(217,70,239,0.25)',
              willChange: 'background-position',
            }}
          >
            {split(deco).map((ch, i) => (
              <motion.span
                key={`d-${i}-${ch}`}
                className="inline-block will-change-transform"
                variants={{
                  hidden: { opacity: 0, y: 26, rotateY: -50, filter: 'blur(6px)' },
                  show: (k: number) => ({
                    opacity: 1,
                    y: 0,
                    rotateY: 0,
                    filter: 'blur(0px)',
                    transition: { delay: 0.018 * k, duration: 0.45, ease: 'easeOut' },
                  }),
                  hover: {
                    y: -3,
                    rotateX: [0, 12, -8, 0],
                    transition: { duration: 1.2, repeat: Infinity, repeatType: 'mirror' },
                  },
                }}
                custom={i}
                initial="hidden"
                animate="show"
                whileHover="hover"
              >
                {ch === ' ' ? <span className="inline-block w-2" /> : ch}
              </motion.span>
            ))}
          </span>

          {/* Particle bursts */}
          <div className="absolute inset-0 -z-10">
            {Array.from({ length: 24 }).map((_, i) => (
              <Spark key={i} i={i} />
            ))}
          </div>
        </motion.h2>
      </div>
    </div>
  );
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const isDemoInView = useInView(demoRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -42]);

  // Demo video refs for 2× autoplay
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const dialogVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const pv = previewVideoRef.current;
    const dv = dialogVideoRef.current;

    const setSpeed = (el?: HTMLVideoElement | null) => {
      if (!el) return;
      try {
        el.playbackRate = 2;
      } catch {}
    };

    const handleLoaded = (e: Event) => setSpeed(e.currentTarget as HTMLVideoElement);

    if (pv) {
      pv.muted = true;
      pv.setAttribute('playsinline', '');
      pv.addEventListener('loadedmetadata', handleLoaded);
      setSpeed(pv);
    }
    if (dv) {
      dv.muted = true; // user can unmute in dialog
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
      {/* Warm background motion */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingOrb delay={0} size="w-10 h-10" />
        <FloatingOrb delay={2} size="w-6 h-6" />
        <FloatingOrb delay={4} size="w-14 h-14" />
        <FloatingOrb delay={1} size="w-8 h-8" />
      </div>

      <motion.div
        variants={heroVariant}
        initial="start"
        animate="end"
        className="container text-center relative z-10"
        style={{ y: titleY }}
      >
        <div className="max-w-screen-md mx-auto">
          <motion.p
            variants={heroChildVariant}
            className="text-xs md:text-sm uppercase tracking-wider max-w-max mx-auto px-4 py-2 rounded-full border backdrop-blur-xl mb-6 md:mb-8"
            style={{
              color: 'rgba(254,215,170,0.95)',
              borderColor: 'rgba(251,146,60,0.35)',
              background:
                'linear-gradient(90deg, rgba(251,146,60,0.10), rgba(244,63,94,0.10))',
              boxShadow: '0 0 20px rgba(251,146,60,0.25)',
            }}
          >
            {heroData.sectionSubtitle}
          </motion.p>

          {/* NEW TITLE */}
          <motion.div variants={heroChildVariant}>
            <div className="relative">
              <Title title={heroData.sectionTitle} deco={heroData.decoTitle} />

              {/* Subtle warm glows */}
              <motion.div
                className="absolute -top-12 -left-10 w-28 h-28 rounded-full blur-2xl"
                style={{
                  background:
                    'radial-gradient(50% 50% at 50% 50%, rgba(251,146,60,0.22) 0%, rgba(251,146,60,0.0) 70%)',
                }}
                animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.5, 0.25] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full blur-2xl"
                style={{
                  background:
                    'radial-gradient(50% 50% at 50% 50%, rgba(244,63,94,0.24) 0%, rgba(244,63,94,0.0) 70%)',
                }}
                animate={{ scale: [1.08, 0.95, 1.08], opacity: [0.3, 0.55, 0.3] }}
                transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>

          <motion.p
            variants={heroChildVariant}
            className=" md:text-xl bg-gradient-to-r from-slate-300 to-slate-200 bg-clip-text text-transparent"
          >
            {heroData.sectionText}
          </motion.p>

          <motion.div variants={heroChildVariant} className="flex justify-center gap-2 mt-6 md:mt-8">
            <a href="https://app.elystra.online/sign-up">
              <Button className="bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white px-8 py-3 rounded-full font-semibold shadow-[0_0_24px_rgba(251,146,60,0.35)] hover:shadow-[0_0_36px_rgba(244,63,94,0.45)] transition-all duration-300 transform hover:scale-[1.03]">
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
              <img
                src={p1}
                alt="User 1"
                className="w-10 h-10 sm:w-12 sm:h-10 rounded-full object-cover border-2 border-background shadow-md"
              />
              <img
                src={p2}
                alt="User 2"
                className="w-10 h-10 sm:w-12 sm:h-10 rounded-full object-cover border-2 border-background shadow-md"
              />
              <img
                src={p3}
                alt="User 3"
                className="w-10 h-10 sm:w-12 sm:h-10 rounded-full object-cover border-2 border-background shadow-md"
              />
              <img
                src={p4}
                alt="User 4"
                className="w-10 h-10 sm:w-12 sm:h-10 rounded-full object-cover border-2 border-background shadow-md"
              />
            </div>
            {/* Subtle hearts in warm tone */}
            {Array.from({ length: 7 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 text-rose-400/90 text-base pointer-events-none"
                initial={{ opacity: 0, scale: 0.6, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 0.9, 0],
                  scale: [0.6, 1, 0.85],
                  x: [0, Math.random() * 70 - 35, Math.random() * 100 - 50],
                  y: [0, -50 - Math.random() * 30, -80 - Math.random() * 40],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              >
                ♥︎
              </motion.span>
            ))}
          </div>
          <p className="text-sm sm:text-base text-muted-foreground font-medium">
            Loved and Trusted by more than 1200+ Users
          </p>
        </motion.div>

        {/* DEMO SECTION — Autoplay @ 2× */}
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
              className="inline-block text-[11px] md:text-xs uppercase tracking-[0.18em] font-bold mb-3 px-5 py-2 rounded-full border backdrop-blur-xl"
              style={{
                color: 'rgba(254,215,170,0.95)',
                borderColor: 'rgba(251,146,60,0.35)',
                background:
                  'linear-gradient(90deg, rgba(251,146,60,0.10), rgba(244,63,94,0.10))',
                boxShadow: '0 0 20px rgba(251,146,60,0.25)',
              }}
            >
              See It In Action
            </motion.span>

            <motion.h3
              className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, rgba(226,232,240,1), rgba(203,213,225,1))',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
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

          {/* Demo Video Container (Autoplay @ 2×) */}
          <motion.div
            className="relative max-w-6xl mx-auto"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={isDemoInView ? { scale: 1, opacity: 1 } : { scale: 0.98, opacity: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Animated warm ring */}
            <motion.div
              className="absolute -inset-[3px] rounded-3xl blur-sm opacity-80"
              style={{
                background:
                  'conic-gradient(from 0deg, rgba(251,146,60,0.6), rgba(244,63,94,0.6), rgba(217,70,239,0.6), rgba(251,146,60,0.6))',
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            />

            <Dialog>
              <DialogTrigger asChild>
                <motion.div
                  className="relative bg-black rounded-3xl overflow-hidden shadow-[0_0_64px_rgba(251,146,60,0.35)] cursor-pointer group"
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
                    >
                      <source src={demoVideo} type="video/mp4" />
                    </video>
                  </AspectRatio>

                  {/* Overlay UI */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span className="select-none text-[11px] md:text-xs font-semibold text-white/90 px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-sm bg-white/10">
                        2×
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                      <span className="select-none text-[11px] md:text-xs text-slate-200/90 px-2.5 py-1 rounded-full border border-white/15 backdrop-blur-sm bg-black/20">
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
                        try {
                          (e.currentTarget as HTMLVideoElement).playbackRate = 2;
                        } catch {}
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
