/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { motion, AnimatePresence, useAnimation } from 'motion/react';
import { Star,  MousePointer2 } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

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

const AUTOSLIDE_INTERVAL = 4000; // ms
const CARD_GAP = 24; // Corresponds to gap-6 (1.5rem = 24px)

const Review = () => {
  const [carouselTotalWidth, setCarouselTotalWidth] = useState(0); // Max draggable width
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showDragHint, setShowDragHint] = useState(true);
  const [hasDraggedInitially, setHasDraggedInitially] = useState(false);

  const controls = useAnimation();
  const [currentXOffset, setCurrentXOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [itemOuterWidth, setItemOuterWidth] = useState(300 + CARD_GAP); // Default, updated from DOM

  // Calculate carouselTotalWidth (max draggable width) and itemOuterWidth
  useEffect(() => {
    if (carouselWrapperRef.current && carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth;
      const offsetWidth = carouselWrapperRef.current.offsetWidth;
      setCarouselTotalWidth(scrollWidth - offsetWidth);

      if (carouselRef.current.children.length > 0) {
        const firstChild = carouselRef.current.children[0] as HTMLElement;
        setItemOuterWidth(firstChild.offsetWidth + CARD_GAP);
      }
    }
  }, [reviewData.reviewCard]);

  // Initial position setup
  useEffect(() => {
    controls.set({ x: 0 });
    setCurrentXOffset(0);
  }, [controls]);

  // Auto-slide logic
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (!isHovered && carouselTotalWidth > 0 && itemOuterWidth > CARD_GAP) {
      intervalId = setInterval(() => {
        setCurrentXOffset(prevX => {
          let nextX = prevX - itemOuterWidth;
          // If nextX would scroll past the very last item partially visible, or too far
          if (nextX < (-carouselTotalWidth - itemOuterWidth / 2)) {
            nextX = 0; // Loop back to start
          }
          controls.start({
            x: nextX,
            transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.8 }
          });
          return nextX;
        });
      }, AUTOSLIDE_INTERVAL);
    }
    return () => clearInterval(intervalId);
  }, [isHovered, controls, carouselTotalWidth, itemOuterWidth, currentXOffset]); // Added currentXOffset to re-evaluate interval if it changes externally

  // Drag Hint Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasDraggedInitially) {
        setShowDragHint(false);
      }
    }, 7000); 
    return () => clearTimeout(timer);
  }, [hasDraggedInitially]);

  const handleDragStartInternal = () => {
    setIsHovered(true); // Pause auto-slide on drag
    if (!hasDraggedInitially) {
      setHasDraggedInitially(true);
      setShowDragHint(false);
    }
  };
//@ts-ignore
  const handleDragEndInternal = (event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number } }) => {
    setCurrentXOffset(info.offset.x); // Sync logical offset with actual drag offset
    // Resume auto-slide if mouse is not over the wrapper after drag
    if (carouselWrapperRef.current && !carouselWrapperRef.current.matches(':hover')) {
      setIsHovered(false);
    }
  };

  return (
    <section className='section relative overflow-hidden py-16 md:py-20'>
      {/* Animated Background Elements */}
      <motion.div 
        className='absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5 opacity-70'
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
      />
      <motion.div 
        className='absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-40'
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className='container relative'>
        <div className='section-head text-center max-w-3xl mx-auto mb-12 md:mb-16'>
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
          ref={carouselWrapperRef} 
          className='overflow-hidden cursor-grab active:cursor-grabbing relative'
          variants={variants.fadeInUp}
          initial='start'
          whileInView='end'
          viewport={{ once: true, amount: 0.2 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            ref={carouselRef}
            drag="x"
            dragConstraints={{ right: 0, left: -carouselTotalWidth }}
            className='flex gap-6 py-4'
            animate={controls}
            onDragStart={handleDragStartInternal}
            onDragEnd={handleDragEndInternal}
          >
            {reviewData.reviewCard.map(({ title, text, reviewAuthor, date }, index) => (
              <motion.div
                key={index}
                variants={variants.fadeInUp}
                initial="start"
                whileInView="end"
                viewport={{ once: true, amount: 0.5 }}
                whileHover={{
                  y: -6,
                  boxShadow: '0px 10px 20px rgba(var(--primary-rgb, 0, 0, 0), 0.1), 0px 5px 10px rgba(var(--primary-rgb, 0, 0, 0), 0.05)',
                  transition: { duration: 0.25 }
                }}
                className='min-w-[300px] sm:min-w-[340px] md:min-w-[360px] flex-shrink-0'
              >
                <Card className='h-full bg-background/80 backdrop-blur-md border-border hover:border-primary/30 shadow-lg hover:shadow-primary/10 transition-all duration-300 flex flex-col'>
                  <CardContent className='p-6 flex flex-col flex-grow'>
                    <div className='flex gap-1 mb-4'>
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 20,
                            delay: 0.3 + i * 0.1 + index * 0.05
                          }}
                        >
                          <Star className='w-5 h-5 fill-yellow-400 text-yellow-400' />
                        </motion.div>
                      ))}
                    </div>

                    <h3 className='text-foreground text-lg md:text-xl font-semibold mb-3'>
                      {title}
                    </h3>

                    <p className='text-muted-foreground text-sm leading-relaxed mb-6 flex-grow'>
                      {text}
                    </p>

                    <div className='flex items-center gap-3 mt-auto'>
                      <Avatar className='w-10 h-10 border-2 border-primary/20'>
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${reviewAuthor.replace(/\s+/g, '-')}`} />
                        <AvatarFallback>{reviewAuthor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className='text-sm font-medium text-foreground'>{reviewAuthor}</p>
                        <p className='text-xs text-muted-foreground'>{date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <AnimatePresence>
            {showDragHint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, 
                  x: [0, -8, 8, -8, 8, 0],
                }}
                exit={{ opacity: 0, y: 10, transition: {duration: 0.3} }}
                transition={{
                  x: {
                    duration: 1.5,
                    repeat: 3,
                    ease: "easeInOut",
                  },
                  default: { duration: 0.5 }
                }}
                className='absolute top-1/2 -translate-y-1/2 left-6 md:left-10 p-2 bg-primary/20 text-primary rounded-full shadow-lg pointer-events-none z-10'
              >
                <MousePointer2 size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className='mt-12 md:mt-16 text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className='text-muted-foreground'>
            Join <span className='text-primary font-medium'>1200+</span> Executives and Top-Tier Freelancers who save hours every week and close deals faster than ever.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Review;
