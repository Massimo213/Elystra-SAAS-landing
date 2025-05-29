/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { motion } from 'motion/react';

/**
 * Assets


/**
 * Framer motion variants
 */
import * as variants from '@/lib/motionVariants';

const Brand = () => {
  return (
    <section className='section'>
      <div className='container max-w-screen-lg'>
        <motion.p
          variants={variants.fadeInUp}
          initial='start'
          whileInView='end'
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut"}}
          className='text-xl md:text-2xl lg:text-3xl font-semibold text-center text-foreground mb-8 md:mb-12 leading-tight md:leading-snug'
        >
          Join the Ranks of High-Performers: Elite Freelancers, Agile Consultants, 
          and Growth-Driven Agencies Who Choose <br className="hidden sm:block lg:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-sky-500 to-emerald-500 dark:from-primary dark:via-sky-400 dark:to-emerald-400 font-bold pb-1">
            Speed & Success
          </span> Over Endless Paperwork.
        </motion.p>

        <motion.div
          variants={variants.staggerContainer}
          initial='start'
          whileInView='end'
          viewport={{ once: true }}
          className='flex justify-center flex-wrap gap-5 md:gap-10'
        >
          
          {/* {brands.map((brand, index) => (
            <motion.figure
              variants={variants.fadeInUp}
              key={index}
            >
              <img
                src={brand}
                alt=''
                className='opacity-[0.6] '
              />
            </motion.figure>
          ))} */}
        </motion.div>
      </div>
    </section>
  );
};

export default Brand;
