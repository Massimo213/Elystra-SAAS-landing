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
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ReactPlayer from 'react-player/youtube';

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
        {/* PROBLEM SECTION - Improved readability and styling */}
        <section className="section bg-background py-20">
          <div className="container max-w-5xl mx-auto">
            {/* Section Label */}
            <div className="flex justify-center mb-8">
              <span className="inline-block px-5 py-1.5 rounded-full bg-primary/20 text-primary font-bold tracking-wide text-sm shadow border border-primary/30">
                THE PROBLEM
              </span>
            </div>
            {/* Big Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-4xl md:text-5xl font-extrabold mb-12 section-title text-foreground"
            >
              Manually writing <span className="text-primary">Proposals</span> and <span className="text-primary">Scopes of Work</span> is <span className="text-primary">tedious</span> and <span className="text-primary">slows down</span> your workflow.
            </motion.h2>
            {/* Pain Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {([
                {
                  icon: 'X',
                  title: 'Re‑watching Calls Drains Time',
                  desc: 'Reviewing calls eats up your evenings and weekends.'
                },
                {
                  icon: 'X',
                  title: 'Blank‑Page Panic',
                  desc: 'Staring at a blank doc slows you down and kills momentum.'
                },
                {
                  icon: 'X',
                  title: 'Copy‑Paste Mess',
                  desc: 'Jumping between old docs leads to errors and wasted time.'
                },
                {
                  icon: 'X',
                  title: 'Ghost Risk',
                  desc: "If you don't send fast, clients disappear."
                }
              ]).map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(80,80,200,0.10)' }}
                  className="flex flex-col items-center bg-white rounded-2xl shadow-xl border border-primary/10 px-7 py-10 text-center transition-all duration-300 hover:border-primary/40 hover:shadow-2xl"
                >
                  <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-500">
                    <span className="text-white text-2xl font-bold">{item.icon}</span>
                  </div>
                  <div className="font-bold text-lg text-gray-900 mb-2">{item.title}</div>
                  <div className="text-muted-foreground text-base">{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUTION SECTION - Improved readability and styling */}
        <section className="section bg-background py-20">
          <div className="container max-w-5xl mx-auto">
            {/* Section Label */}
            <div className="flex justify-center mb-8">
              <span className="inline-block px-5 py-1.5 rounded-full bg-primary/20 text-primary font-bold tracking-wide text-sm shadow border border-primary/30">
                THE SOLUTION
              </span>
            </div>
            {/* Big Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-4xl md:text-5xl font-extrabold mb-12 section-title text-foreground"
            >
              With Elystra, proposals are <span className="text-primary">instant</span> and <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent font-bold">client-ready</span>.
            </motion.h2>
            {/* Solution Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {([
                {
                  icon: '✓',
                  title: 'Auto-Transcribed Instantly',
                  desc: 'Upload your call, and Elystra transcribes it in seconds.'
                },
                {
                  icon: '✓',
                  title: 'AI Pulls Deliverables & Budget',
                  desc: 'No more manual note-taking—AI extracts what matters.'
                },
                {
                  icon: '✓',
                  title: 'Client-Ready Scope of Work in One Click',
                  desc: 'Get a polished, branded proposal ready to send.'
                },
                {
                  icon: '✓',
                  title: 'Deals Close Faster',
                  desc: 'Send proposals same-day and win more business.'
                }
              ]).map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(80,80,200,0.10)' }}
                  className="flex flex-col items-center bg-white rounded-2xl shadow-xl border border-primary/10 px-7 py-10 text-center transition-all duration-300 hover:border-primary/40 hover:shadow-2xl"
                >
                  <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-500">
                    <span className="text-white text-2xl font-bold">{item.icon}</span>
                  </div>
                  <div className="font-bold text-lg text-gray-900 mb-2">{item.title}</div>
                  <div className="text-muted-foreground text-base">{item.desc}</div>
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
