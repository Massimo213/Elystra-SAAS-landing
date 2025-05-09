/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { motion } from 'motion/react';

/**
 * Components
 */


/**
 * Constants
 */
import { processData } from '@/constants';

/**
 * Framer motion variants
 */
import * as variants from '@/lib/motionVariants';

const Process = () => {
  return (
    <section className='section relative overflow-hidden min-h-[700px] flex items-center justify-center'>
      {/* Animated, vibrant glassy background */}
      <motion.div 
        className='absolute inset-0 bg-gradient-to-br from-primary/30 via-blue-400/10 to-background/80 blur-2xl opacity-80 pointer-events-none z-0'
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      <motion.div
        className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-blue-500/10 to-transparent rounded-full blur-3xl opacity-60 z-0'
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <div className='container relative z-10'>
        <div className='section-head text-center max-w-3xl mx-auto mb-16'>
          <motion.p
            variants={variants.fadeInUp}
            initial='start'
            whileInView='end'
            viewport={{ once: true }}
            className='section-subtitle'
          >
            {processData.sectionSubtitle}
          </motion.p>

          <motion.h2
            variants={variants.fadeInUp}
            initial='start'
            whileInView='end'
            viewport={{ once: true }}
            className='section-title text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent drop-shadow-lg mb-4'
          >
            {processData.sectionTitle}
          </motion.h2>

          <motion.p
            variants={variants.fadeInUp}
            initial='start'
            whileInView='end'
            viewport={{ once: true }}
            className='section-text text-xl text-muted-foreground'
          >
            {processData.sectionText}
          </motion.p>
        </div>

        {/* Steps as beautiful glassmorphic circles with animated connectors */}
        <div className='flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8 xl:gap-20 relative'>
          {processData.list.map(({ icon, title, text }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * index, type: 'spring', stiffness: 120 }}
              whileHover={{
                scale: 1.12,
                rotateZ: [0, 2, -2, 0],
                boxShadow: '0 8px 40px 0 rgba(80,80,200,0.18), 0 1.5px 8px 0 rgba(0,0,0,0.10)',
                transition: { duration: 0.4 },
              }}
              className='relative flex flex-col items-center text-center min-w-[220px] max-w-[320px] mx-auto group transition-all duration-300 z-10'
              style={{ zIndex: 10 + (10 - index) }}
            >
              {/* Step number badge - bold, pill-shaped, high-contrast */}
              <span className='absolute -top-7 left-1/2 -translate-x-1/2 z-20 px-7 py-2 rounded-full bg-white text-primary text-xl font-extrabold shadow-lg border-2 border-primary/20 tracking-wide drop-shadow-md flex items-center justify-center min-w-[70px] min-h-[44px]'>
                {index + 1}
              </span>
              {/* Glassy, glowing circle with vibrant gradient */}
              <motion.div
                className='w-44 h-44 flex items-center justify-center rounded-full bg-gradient-to-br from-primary via-blue-400 to-blue-500 shadow-2xl mb-6 relative overflow-hidden group-hover:scale-105 transition-all duration-300 border-4 border-white/30'
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Glass overlay for depth */}
                <div className='absolute inset-0 rounded-full bg-white/20 backdrop-blur-[2px] pointer-events-none' />
                {/* Animated gradient glow */}
                <motion.div
                  className='absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 via-blue-400/20 to-transparent blur-2xl opacity-70 z-0'
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.7, 0.9, 0.7],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className='relative z-10 text-5xl text-white drop-shadow-lg'>{icon}</span>
              </motion.div>
              <h3 className='text-2xl font-bold text-foreground mb-2 drop-shadow-sm'>{title}</h3>
              <p className='text-lg text-muted-foreground'>{text}</p>
              {/* Glowing ring accent */}
              <motion.div
                className='absolute -inset-4 rounded-full pointer-events-none z-[-1]'
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(80,80,200,0.10)',
                    '0 0 60px 20px rgba(80,80,200,0.18)',
                    '0 0 0 0 rgba(80,80,200,0.10)'
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Connector line to next step */}
              {index < processData.list.length - 1 && (
                <motion.div
                  className='hidden md:block absolute top-1/2 right-[-70px] w-36 h-2 bg-gradient-to-r from-primary/40 via-blue-400/30 to-transparent rounded-full blur-[2px] shadow-lg z-0'
                  initial={{ opacity: 0, scaleX: 0.7 }}
                  animate={{ opacity: 1, scaleX: [0.7, 1.1, 1] }}
                  transition={{ duration: 1.2, delay: 0.3 * index, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
