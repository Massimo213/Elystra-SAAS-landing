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
import FeatureCard from '@/components/FeatureCard';


/**
 * Assets
 */


/**
 * Constants
 */
import { featureData } from '@/constants';

/**
 * Framer motion variants
 */
import * as variants from '@/lib/motionVariants';

const Feature = () => {
  return (
    <div id='feature'>
      <section className='section'>
        <div className='container'>
          <div className='section-head text-center max-w-3xl mx-auto'>
            <motion.p
              variants={variants.fadeInUp}
              initial='start'
              whileInView='end'
              viewport={{ once: true }}
              className='section-subtitle'
            >
              {featureData.sectionSubtitle}
            </motion.p>

            <motion.h2
              variants={variants.fadeInUp}
              initial='start'
              whileInView='end'
              viewport={{ once: true }}
              className='section-title'
            >
              {featureData.sectionTitle}
            </motion.h2>

            <motion.p
              variants={variants.fadeInUp}
              initial='start'
              whileInView='end'
              viewport={{ once: true }}
              className='section-text'
            >
              {featureData.sectionText}
            </motion.p>
          </div>

          <motion.div
            variants={variants.staggerContainer}
            initial='start'
            whileInView='end'
            viewport={{ once: true }}
            className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'
          >
            {featureData.features.map(
              ({ icon, iconBoxColor, title, desc}, index) => (
                <FeatureCard
                  key={index}
                  classes='xl:col-span-1'
                >
                  <>
                    <div className='p-8'>
                      <motion.div
                        variants={variants.fadeInUp}
                        className={`w-16 h-16 grid place-items-center rounded-full flex-shrink-0 ${iconBoxColor}`}
                      >
                        {icon}
                      </motion.div>

                      <motion.h3
                        variants={variants.fadeInUp}
                        className='text-foreground text-xl font-medium mt-4 mb-3'
                      >
                        {title}
                      </motion.h3>

                      <motion.p
                        variants={variants.fadeInUp}
                        className='text-muted-foreground'
                      >
                        {desc}
                      </motion.p>
                    </div>

                   
                  </>
                </FeatureCard>
              )
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Feature;
