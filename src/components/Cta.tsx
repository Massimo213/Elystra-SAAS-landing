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
import { Button } from '@/components/ui/button';

/**
 * Constants
 */
import { ctaData } from '@/constants';


/**
 * Assets
 */
import { ctaBanner } from '@/assets';

/**
 * Framer motion variants
 */
import * as variants from '@/lib/motionVariants';

const Cta = () => {
  return (
    <div id="cta">
    <section className='section'>
      <div className='container'>
        <motion.div
          variants={variants.fadeInUp}
          initial='start'
          whileInView='end'
          viewport={{ once: true }}
          className='bg-primary rounded-xl border-t border-primary-foreground/30 overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr,0.7fr] lg:items-center'
        >
          <div className='p-8 md:p-16 xl:p-20'>
            <motion.h2
              variants={variants.fadeIn}
              initial='start'
              whileInView='end'
              viewport={{ once: true }}
              className='text-[26px] leading-tight font-semibold mb-6 capitalize sm:text-[34px] md:text-[40px] lg:text-[46px] lg:mb-10'
            >
              {ctaData.text}
            </motion.h2>

            <motion.div
              variants={variants.fadeIn}
              initial='start'
              whileInView='end'
              viewport={{ once: true }}
              className='flex items-center gap-3 lg:gap-4'
            >
              <a href='https://app.elystra.online/sign-up'>
              <Button className='bg-foreground text-background hover:bg-foreground/95'>
                Start Now 
              </Button>
              </a>

              <Button
                variant='outline'
                className='!bg-transparent border-current'
              >
                Pricing & Plans
              </Button>
            </motion.div>
          </div>

          <motion.figure
            variants={variants.fadeInLeft}
            initial='start'
            whileInView='end'
            viewport={{ once: true }}
            className='-order-1 pt-14 ps-8 sm:ps-12 md:ps-14 lg:order-none lg:p-0'
          >
            <div className="w-[700px] h-[500px]">
            <img
              src={ctaBanner}
              alt=''
              className='w-full h-full object-contain object-right'
            />
            </div>
          </motion.figure>
        </motion.div>
      </div>
    </section>
    </div>
  );
};

export default Cta;
