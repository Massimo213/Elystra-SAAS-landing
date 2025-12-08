/**
 * Feature.tsx - 3 Transformation Pillars
 * World-class execution. Cinematic depth. Ruthless clarity.
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { Zap, Repeat, TrendingUp, Rocket } from 'lucide-react';
import { useRef } from 'react';

/* --------------------------------
   3 DOMINANT PILLARS
----------------------------------*/
const pillars = [
  {
    icon: Zap,
    number: '01',
    title: 'Close in the call',
    headline: 'Sign and pay before the call ends.',
    lines: [
      'Same-call close. No “send it over.”',
      'Card in, cash hits. Stripe fires on the call.',
      '4-minute average. Talk → sign → paid.',
    ],
    gradient: 'from-orange-600/20 via-orange-500/5 to-transparent',
    glowColor: 'rgba(251,146,60,0.2)',
    accentColor: 'text-orange-400',
    iconBg: 'bg-orange-500/10',
    iconBorder: 'border-orange-500/30',
  },
  {
    icon: Repeat,
    number: '02',
    title: 'Ops that move themselves',
    headline: 'You sell. Elystra drags the rest of the company with it.',
    lines: [
      'Zero manual follow-through. CRM, Slack, ClickUp update themselves.',
      'Finance already knows. PO + invoice + tasks pre-filled.',
      'No DM babysitting. Everyone gets what they need, instantly.',
    ],
    gradient: 'from-rose-600/20 via-rose-500/5 to-transparent',
    glowColor: 'rgba(244,63,94,0.2)',
    accentColor: 'text-rose-400',
    iconBg: 'bg-rose-500/10',
    iconBorder: 'border-rose-500/30',
  },
  {
    icon: TrendingUp,
    number: '03',
    title: 'Know what prints money',
    headline: 'See exactly what converts. Kill everything else.',
    lines: [
      'Templates ranked by cash. Not vibes. Numbers.',
      'Reps exposed. Who closes in 6 minutes, who drags.',
      'Board story on tap. Revenue views, no spreadsheets.',
    ],
    gradient: 'from-purple-600/20 via-purple-500/5 to-transparent',
    glowColor: 'rgba(217,70,239,0.2)',
    accentColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10',
    iconBorder: 'border-purple-500/30',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'The Speed-to-Money Engine',
    headline: 'Compress talk → scope → proposal → sign → pay into one motion.',
    lines: [
      'Same headcount. More closed revenue.',
      'Zero blind spots. You see every stall + every buyer.',
      '145+ agencies. $4.1M closed last quarter.',
    ],
    gradient: 'from-sky-600/20 via-sky-500/5 to-transparent',
    glowColor: 'rgba(56,189,248,0.2)',
    accentColor: 'text-sky-400',
    iconBg: 'bg-sky-500/10',
    iconBorder: 'border-sky-500/30',
  },
];

/* --------------------------------
   Pillar Band - Full Visual Drama
----------------------------------*/
const PillarBand = ({ pillar, index }: { pillar: typeof pillars[0]; index: number }) => {
  const Icon = pillar.icon;
  const bandRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ['start end', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);
  
  return (
    <div ref={bandRef} className="relative">
    <motion.div
        style={{ opacity }}
        className="relative overflow-hidden group"
      >
        {/* Dramatic gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient}`} />
        
        {/* Animated light source */}
      <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
            background: `radial-gradient(ellipse 100% 50% at 30% 50%, ${pillar.glowColor}, transparent 60%)`,
          }}
        />
        
        {/* Floating energy particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${pillar.iconBg}`}
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [0, -100, -200],
                x: [(i % 2) * 20 - 10, (i % 2) * -20 + 10, 0],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.3],
              }}
              transition={{
                duration: 6 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.8,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
        
        {/* Content */}
        <div className="relative border-y border-white/5">
          <div className="container py-16 md:py-24">
            <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 max-w-6xl">
              {/* Left: Icon + Number */}
              <div className="flex md:flex-col items-center md:items-start gap-6">
                {/* Pillar number */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-7xl md:text-8xl font-black text-white/5"
                >
                  {pillar.number}
                </motion.div>
                
                {/* Icon with dramatic lighting */}
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Icon glow */}
                  <motion.div
                    className="absolute -inset-4 rounded-full opacity-50"
                    style={{
                      background: pillar.glowColor,
                      filter: 'blur(20px)',
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  
                  <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl ${pillar.iconBg} border ${pillar.iconBorder} flex items-center justify-center backdrop-blur-sm`}>
                    <Icon size={40} strokeWidth={1.5} className={pillar.accentColor} />
                  </div>
              </motion.div>
          </div>

              {/* Right: Copy */}
              <div className="flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                >
                  {/* Title */}
                  <h3 className={`text-sm md:text-base font-bold ${pillar.accentColor} uppercase tracking-widest mb-3`}>
                    {pillar.title}
            </h3>
                  
                  {/* Headline */}
                  <h4 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1]">
                    {pillar.headline}
                  </h4>
                  <div className="space-y-3 mb-8 text-left">
                    {pillar.lines.map((line, bulletIndex) => (
                      <div
                        key={bulletIndex}
                        className="text-lg md:text-xl text-slate-200/90 flex items-start gap-3"
                      >
                        <span className="mt-2 h-[6px] w-[6px] rounded-full bg-white/70 shrink-0" />
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated bottom accent */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${pillar.glowColor}, ${pillar.glowColor}, transparent)`,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: index * 0.1 + 0.4, ease: 'easeOut' }}
        />
      </motion.div>
      
      {/* Parallax background effect */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none -z-10"
      >
        <div
          className="absolute inset-0 opacity-30"
        style={{
            background: `radial-gradient(circle at ${20 + index * 30}% 50%, ${pillar.glowColor}, transparent 70%)`,
            filter: 'blur(80px)',
          }}
        />
              </motion.div>
            </div>
  );
};

/* --------------------------------
   Stats Bar - Dramatic Reveal
----------------------------------*/
const StatsBar = () => {
  const stats = [
    { value: '145', label: 'agencies', glow: 'rgba(251,146,60,0.3)' },
    { value: '$4.1M', label: 'closed last quarter', glow: 'rgba(244,63,94,0.3)' },
    { value: '92%', label: 'less admin time', glow: 'rgba(217,70,239,0.3)' },
  ];
  
  return (
    <div className="relative overflow-hidden">
      {/* Dramatic background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-slate-900 to-black" />
      
      {/* Animated light beam */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.1), transparent)',
        }}
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      <div className="relative border-y border-white/10">
        <div className="container py-12 md:py-16">
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-center group"
              >
                {/* Stat glow */}
                <motion.div
                  className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100"
                  style={{
                    background: stat.glow,
                    filter: 'blur(30px)',
                  }}
                  transition={{ duration: 0.5 }}
                />
                
                <div className="relative">
                  <div className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-rose-400 to-purple-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-base md:text-lg text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* --------------------------------
   Final CTA - Maximum Impact
----------------------------------*/
const FinalCTA = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center py-20 md:py-32 relative"
    >
      {/* Dramatic spotlight */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px]"
        style={{
          background: 'radial-gradient(circle, rgba(251,146,60,0.15) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <div className="container relative z-10">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-black text-white mb-12"
        >
          See it happen in 60 seconds.
        </motion.h3>
        
        <motion.div
          className="relative inline-block group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Massive glow behind button */}
          <motion.div
            className="absolute -inset-8 rounded-[40px] opacity-60"
            style={{
              background: 'linear-gradient(135deg, rgba(251,146,60,0.5), rgba(244,63,94,0.5))',
              filter: 'blur(50px)',
            }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          <a
            href="https://calendly.com/onboarding-elystra/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block px-16 md:px-20 py-7 md:py-9 rounded-[32px] text-xl md:text-2xl font-bold text-white overflow-hidden border-0"
            style={{
              background: 'linear-gradient(135deg, #fb923c 0%, #f43f5e 100%)',
              boxShadow: `
                0 2px 4px rgba(0, 0, 0, 0.1),
                0 4px 12px rgba(251, 146, 60, 0.4),
                0 8px 24px rgba(244, 63, 94, 0.3),
                0 16px 48px rgba(244, 63, 94, 0.2),
                inset 0 2px 0 rgba(255, 255, 255, 0.2),
                inset 0 -2px 0 rgba(0, 0, 0, 0.2)
              `,
            }}
          >
            {/* Glass shine gradient */}
            <span
              className="absolute inset-0 rounded-[32px]"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
              }}
            />
            
            {/* Animated shimmer sweep */}
            <motion.span
              className="absolute inset-0 rounded-[32px]"
              style={{
                background: 'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.4) 50%, transparent 75%)',
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
            
            {/* Hover inner glow */}
            <span
              className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.25) 0%, transparent 70%)',
              }}
            />
            
            <span className="relative z-10 drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
              Book a Demo
            </span>
          </a>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-slate-400 text-base mt-8"
        >
          See the entire flow live. 7 minutes. Zero pitch—pure product demo.
        </motion.p>
      </div>
    </motion.div>
  );
};

/* --------------------------------
   Main Feature Section
----------------------------------*/
const Feature = () => {
  return (
    <section id="feature" className="relative overflow-hidden bg-black">
      {/* Cinematic atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Giant soft glow orbs */}
            <motion.div
          className="absolute top-0 left-1/4 w-[1000px] h-[1000px]"
              style={{
            background: 'radial-gradient(circle, rgba(251,146,60,0.08) 0%, transparent 60%)',
            filter: 'blur(120px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
            <motion.div
          className="absolute bottom-0 right-1/4 w-[800px] h-[800px]"
          style={{
            background: 'radial-gradient(circle, rgba(217,70,239,0.06) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
          }}
        />
          </div>

      {/* Content */}
      <div className="relative z-10">
        {/* 3 Pillar Bands */}
        <div className="space-y-0">
          {pillars.map((pillar, i) => (
            <PillarBand key={i} pillar={pillar} index={i} />
            ))}
          </div>

        {/* Stats Bar */}
        <StatsBar />
        
        {/* Final CTA */}
        <FinalCTA />
          </div>
      </section>
  );
};

export default Feature;
