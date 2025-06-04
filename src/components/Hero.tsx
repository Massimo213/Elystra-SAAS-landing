/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */

import {
  motion,
  Variants,
 
} from 'motion/react';

/**
 * Components
 */
import { Button } from '@/components/ui/button';
import { Dialog,DialogContent } from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ReactPlayer from 'react-player/youtube';
import p1 from '@/assets/p1.png';
import p2 from '@/assets/p2.png';
import p3 from '@/assets/p3.png'; 
import p4 from '@/assets/p4.png';
/**
 * Assets
 */



/**
 * Constants
 */
import { heroData } from '@/constants';

/**
 * Framer motion variants
 */
const heroVariant: Variants = {
  start: {},
  end: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const heroChildVariant: Variants = {
  start: {
    y: 30,
    opacity: 0,
    filter: 'blur(5px)'
    
  },
  end: {
    y: 0,
    opacity: 1,
    filter: 'blur(0)',
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

// FlyingHeart Component Definition
const FlyingHeart = () => {
  const duration = 2.5 + Math.random() * 2; // Random duration: 2.5s to 4.5s
  const delay = Math.random() * 3; // Random initial delay up to 3s
  
  // Initial position spread around the center of the avatar group
  const initialX = Math.random() * 50 - 25; // -25px to +25px from center
  const initialY = Math.random() * 20 - 10;  // -10px to +10px from center

  // End positions for drifting - allow them to spread out
  const endX1 = initialX + (Math.random() * 70 - 35); // Further horizontal drift
  const endX2 = initialX + (Math.random() * 90 - 45); // Even further

  // End Y positions for upward movement - make them float up nicely
  const endY1 = -50 - (Math.random() * 25); 
  const endY2 = -70 - (Math.random() * 30); 

  const heartVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.3, // Start smaller
      x: initialX,
      y: initialY,
    },
    animate: {
      opacity: [0, 0.9, 0.9, 0], // Fade in, stay visible, fade out
      scale: [0.3, 1, 0.8, 0], // Scale up, slight pulse, scale out
      x: [initialX, endX1, endX2], // Smooth horizontal drift
      y: [initialY, endY1, endY2], // Smooth vertical float
      transition: {
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 1 + Math.random() * 2, // Staggered re-appearance after loop
        ease: "circOut", // Smoother easing
      },
    },
  };

  return (
    <motion.span
      style={{ position: 'absolute', left: '50%', top: '50%', display: 'inline-block' }}
      variants={heartVariants}
      initial="initial"
      animate="animate"
      className="text-pink-500 text-base pointer-events-none" // Heart style, adjust size if needed
    >
      ♥︎
    </motion.span>
  );
};

const Hero = () => {
  // const heroBannerRef = useRef<HTMLElement>( null);

  // const { scrollYProgress } = useScroll({
  //   target: heroBannerRef,
  //   offset: ['start 1080px', '50% start'],
  // });

  // const scrollYTransform = useTransform(scrollYProgress, [0, 1], [0.85, 1.15]);

  // const scale = useSpring(scrollYTransform, {
  //   stiffness: 300,
  //   damping: 30,
  //   restDelta: 0.001,
  // });

  
  return (
    <section className='py-10 md:py-16'>
      <motion.div
        variants={heroVariant}
        initial='start'
        animate='end'
        className='container text-center'
      >
        <div className='max-w-screen-md mx-auto'>
          <motion.p
            variants={heroChildVariant}
            className='text-sm uppercase tracking-wider bg-secondary/50 text-secondary-foreground max-w-max mx-auto px-3 py-1 rounded-full border-t border-blue-500/10 backdrop-blur-3xl mb-6 md:mb-10'
          >
            {heroData.sectionSubtitle}
          </motion.p>

          <motion.h2
            variants={heroChildVariant}
            className='text-4xl font-semibold !leading-tight mb-4 md:text-5xl md:mb-5 lg:text-6xl'
          >
            {heroData.sectionTitle}

            <span className='relative isolate ms-4'>
              {heroData.decoTitle}

              <span className='absolute -z-10 top-2 -left-6 -right-4 bottom-0.5 bg-foreground/5 rounded-full px-8 ms-3 border-t border-foreground/20 shadow-[inset_0px_0px_30px_0px] shadow-foreground/20 md:top-3 md:bottom-1 lg:top-4 lg:bottom-2'></span>
            </span>
          </motion.h2>

          <motion.p
            variants={heroChildVariant}
            className='text-muted-foreground md:text-xl'
          >
            {heroData.sectionText}
          </motion.p>
          <motion.div
            variants={heroChildVariant}
            className='flex justify-center gap-2 mt-6 md:mt-10'
          >


<a href='https://app.elystra.online/sign-up'>
            <Button>Start Now </Button>
</a>
            <Dialog>
              

              <DialogContent className='p-0 overflow-hidden max-w-[640px] xl:max-w-[1000px]'>
                <AspectRatio ratio={16 / 9}>
                  <ReactPlayer
                    url='https://youtu.be/cvd2XGJBgLg'
                    style={{
                      minWidth: '100%',
                      maxWidth: '100%',
                      minHeight: '100%',
                      maxHeight: '100%',
                    }}
                  />
                </AspectRatio>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>

        {/* Social Proof Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }} // Ensure delay allows hero elements to animate in first
          className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <div className="relative"> {/* Container for avatars and hearts */}
            <div className="flex -space-x-3 sm:-space-x-4"> {/* Avatars */}
             <img src={p1}  alt="User 1" className="w-10 h-10 sm:w-12 sm:h-10 rounded-full object-cover border-2 border-background shadow-md" />
             <img src={p2} alt="User 2" className="w-10 h-10 sm:w-12 sm:h-10 rounded-full object-cover border-2 border-background shadow-md" />
             <img src={p3} alt="User 3" className="w-10 h-10 sm:w-12 sm:h-10 rounded-full object-cover border-2 border-background shadow-md" />
             <img src={p4} alt="User 3" className="w-10 h-10 sm:w-12 sm:h-10 rounded-full object-cover border-2 border-background shadow-md" />
            </div>
            {/* Flying Hearts - absolutely positioned relative to the div above */}
            {Array.from({ length: 7 }).map((_, i) => ( // Generate 7 hearts
              <FlyingHeart key={i} />
            ))}
          </div>
          <p className="text-sm sm:text-base text-muted-foreground font-medium">
             Loved and Trusted by more than 1200+ Users
          </p>
        </motion.div>

        {/* PROBLEM SECTION - More Impressive Design */}
        <section className="section bg-background py-20 md:py-24">
          <div className="container max-w-5xl mx-auto">
            {/* Section Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-center mb-5 md:mb-6"
            >
              <span className="text-sm uppercase tracking-wider font-bold text-primary">
                The Bottleneck
              </span>
            </motion.div>
            {/* Big Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 100 }}
              className="text-center text-4xl md:text-5xl lg:text-6xl font-extrabold mb-16 md:mb-20 text-foreground"
            >
              Why Manual Proposals <br className="sm:hidden" />
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 dark:from-red-400 dark:to-red-600"
                style={{ textShadow: '0 0 10px rgba(239, 68, 68, 0.3), 0 0 20px rgba(239, 68, 68, 0.2)' }}
              >
                Cripple Your Growth
              </span>
            </motion.h2>
            {/* Pain Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {[
                {
                  title: 'Hours Lost Replaying Calls',
                  desc: 'Endlessly scrubbing through recordings? Your most valuable asset—time—vanishes, limiting your capacity to engage new clients or innovate.'
                },
                {
                  title: 'The Dreaded Blank Page Paralysis',
                  desc: 'Staring at a blank document? Momentum lost before your brilliant ideas take shape, letting opportunities slip by as hesitation sets in.'
                },
                {
                  title: 'Error-Prone Copy-Pasting Chaos',
                  desc: 'Juggling old proposals invites embarrassing mistakes, dilutes your brand consistency, and wastes precious, unbillable hours.'
                },
                {
                  title: 'Losing Hot Leads to Delay',
                  desc: "Every moment spent drafting is a moment a competitor can strike. Slow proposals mean cold leads and missed revenue targets."
                }
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.3 + idx * 0.15, duration: 0.5, ease: "easeOut" }}
                  whileHover={{ 
                    scale: 1.03,
                    y: -6,
                    boxShadow: '0px 0px 30px rgba(239, 68, 68, 0.4), 0px 0px 15px rgba(239, 68, 68, 0.3)', // Brighter, more spread glow
                  }}
                  className="bg-card rounded-xl p-6 shadow-[0px_0px_20px_rgba(239,68,68,0.15)] dark:shadow-[0px_0px_20px_rgba(200,50,50,0.2)] border border-red-700/30 dark:border-red-600/40 transition-all duration-300 flex items-start space-x-5"
                >
                  <div 
                    className="flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-red-500 to-red-700 dark:from-red-500 dark:to-red-600 shadow-md border border-red-400/50 mt-1"
                  >
                    <span className="text-xl md:text-2xl font-bold text-white">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg md:text-xl text-foreground mb-1.5">{item.title}</h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUTION SECTION - Applying the new impressive design */}
        <section className="section bg-background py-20 md:py-24">
          <div className="container max-w-5xl mx-auto">
            {/* Section Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-center mb-5 md:mb-6"
            >
              <span className="text-sm uppercase tracking-wider font-bold text-primary">
                The Elystra Edge
              </span>
            </motion.div>
            {/* Big Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 100 }}
              className="text-center text-4xl md:text-5xl lg:text-6xl font-extrabold mb-16 md:mb-20 text-foreground"
            >
              From Conversation to <br className="sm:hidden" /> 
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-sky-400 dark:from-primary dark:via-blue-400 dark:to-sky-300"
                style={{ textShadow: '0 0 10px rgba(var(--primary-rgb), 0.3), 0 0 20px rgba(var(--primary-rgb), 0.2)' }} // Assuming primary color is set as CSS variable --primary-rgb
              >
                Client-Winning Proposal<div></div>
              </span>
               in Clicks
            </motion.h2>
            {/* Solution Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {[
                {
                  title: 'Instant, Accurate Transcripts',
                  desc: 'Upload client calls, get precise, searchable text in seconds. Reclaim your evenings from the drudgery of manual transcription and note-taking.'
                },
                {
                  title: 'AI Pinpoints All Key Details',
                  desc: "Elystra's intelligence auto-extracts deliverables, budget, timelines, and client pain points. Never miss a critical detail again."
                },
                {
                  title: 'Proposals & SOWs in One Click',
                  desc: 'Generate polished, professionally branded documents instantly. Eliminate formatting nightmares and impress with unparalleled speed.'
                },
                {
                  title: 'Close Deals at Lightning Speed',
                  desc: 'Deliver exceptional proposals while competitors are still scheduling follow-ups. Win more clients, accelerate your revenue, and scale effortlessly.'
                }
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.3 + idx * 0.15, duration: 0.5, ease: "easeOut" }}
                  whileHover={{ 
                    scale: 1.03,
                    y: -6,
                    boxShadow: '0px 0px 30px rgba(var(--primary-rgb), 0.4), 0px 0px 15px rgba(var(--primary-rgb), 0.3)', // Brighter, more spread glow
                  }}
                  className="bg-card rounded-xl p-6 shadow-[0px_0px_20px_rgba(var(--primary-rgb),0.15)] dark:shadow-[0px_0px_20px_rgba(var(--primary-rgb),0.2)] border border-primary/30 dark:border-primary/40 transition-all duration-300 flex items-start space-x-5"
                >
                  <div 
                    className="flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary via-blue-500 to-sky-400 dark:from-primary dark:via-blue-400 dark:to-sky-300 shadow-md border border-primary/50 mt-1"
                  >
                    <span className="text-xl md:text-2xl font-bold text-white">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg md:text-xl text-foreground mb-1.5">{item.title}</h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>
    </section>
  );
};

export default Hero;
