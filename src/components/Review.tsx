/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

/**
 * Components
 */
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

/**
 * Constants
 */
import { reviewData } from '@/constants';

/**
 * Framer motion variants
 */
import * as variants from '@/lib/motionVariants';

const Review = () => {
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

      <div className='container relative'>
        <div className='section-head text-center max-w-3xl mx-auto'>
          <motion.p
            variants={variants.fadeInUp}
            initial='start'
            whileInView='end'
            viewport={{ once: true }}
            className='section-subtitle'
          >
            {reviewData.sectionSubtitle}
          </motion.p>

          <motion.h2
            variants={variants.fadeInUp}
            initial='start'
            whileInView='end'
            viewport={{ once: true }}
            className='section-title'
          >
            {reviewData.sectionTitle}
          </motion.h2>
        </div>

        <motion.div
          variants={variants.staggerContainer}
          initial='start'
          whileInView='end'
          viewport={{ once: true }}
          className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 mt-12'
        >
          {reviewData.reviewCard.map(({ title, text, reviewAuthor, date }, index) => (
            <motion.div
              key={index}
              variants={variants.fadeInUp}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <Card className='h-full bg-background/80 backdrop-blur-sm border-primary/10 hover:shadow-xl transition-all duration-300'>
                <CardContent className='p-6'>
                  <div className='flex gap-1 mb-4'>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 260,
                          damping: 20,
                          delay: i * 0.1
                        }}
                      >
                        <Star className='w-5 h-5 fill-primary text-primary' />
                      </motion.div>
                    ))}
                  </div>

                  <motion.h3
                    className='text-foreground text-xl font-medium mb-3'
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {title}
                  </motion.h3>

                  <motion.p
                    className='text-muted-foreground mb-6'
                    whileHover={{
                      scale: 1.01,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {text}
                  </motion.p>

                  <div className='flex items-center gap-4'>
                    <Avatar className='w-10 h-10'>
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${reviewAuthor}`} />
                      <AvatarFallback>{reviewAuthor[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='text-sm font-medium'>{reviewAuthor}</p>
                      <p className='text-xs text-muted-foreground'>{date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className='mt-12 text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className='text-muted-foreground'>
            Join <span className='text-primary font-medium'>1200+</span> freelancers who save hours every week
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Review;
