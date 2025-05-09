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
    <section className='section relative overflow-hidden'>
      {/* Animated Background Elements */}
      <motion.div 
        className='absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5'
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      <motion.div 
        className='absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50'
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div 
        className='absolute inset-0 bg-[linear-gradient(45deg,_rgba(0,0,0,0.02)_25%,_transparent_25%,_transparent_75%,_rgba(0,0,0,0.02)_75%,_rgba(0,0,0,0.02)),_linear-gradient(45deg,_rgba(0,0,0,0.02)_25%,_transparent_25%,_transparent_75%,_rgba(0,0,0,0.02)_75%,_rgba(0,0,0,0.02))] bg-[length:20px_20px] bg-[position:0_0,10px_10px]'
        animate={{
          backgroundPosition: ['0px 0px', '20px 20px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      <div className='container relative'>
        <div className='section-head text-center max-w-3xl mx-auto'>
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
            className='section-title'
          >
            {processData.sectionTitle}
          </motion.h2>

          <motion.p
            variants={variants.fadeInUp}
            initial='start'
            whileInView='end'
            viewport={{ once: true }}
            className='section-text'
          >
            {processData.sectionText}
          </motion.p>
        </div>

        <motion.div
          variants={variants.staggerContainer}
          initial='start'
          whileInView='end'
          viewport={{ once: true }}
          className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-12'
        >
          {processData.list.map(({ icon, title, text }, index) => (
            <motion.div
              key={index}
              variants={variants.fadeInUp}
              className='relative'
              whileHover={{
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className='bg-background/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-primary/10 h-full hover:shadow-xl transition-all duration-300'
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                }}
              >
                <motion.div 
                  className='flex items-center gap-4 mb-4'
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div 
                    className='w-12 h-12 grid place-items-center rounded-full bg-primary/10 text-primary flex-shrink-0'
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: 'rgba(var(--primary), 0.2)',
                    }}
                  >
                    {icon}
                  </motion.div>
                  <div className='flex-1'>
                    <h3 className='text-foreground text-lg font-medium'>
                      {title}
                    </h3>
                  </div>
                </motion.div>
                <p className='text-muted-foreground'>{text}</p>
              </motion.div>
              
              {index < processData.list.length - 1 && (
                <motion.div 
                  className='hidden xl:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/20 to-primary/10'
                  animate={{
                    scaleX: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
