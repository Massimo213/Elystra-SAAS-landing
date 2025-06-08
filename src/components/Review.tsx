/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { motion, useScroll, useTransform, AnimatePresence, PanInfo } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';

/**
 * Constants
 */
import { reviewData } from '@/constants';

interface ReviewCardProps {
  review: {
    title: string;
    text: string;
    reviewAuthor: string;
    date: string;
  };
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const Review = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Auto-advance reviews
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setDirection(1);
        setActiveIndex(prev => (prev + 1) % reviewData.reviewCard.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const handleDragEnd = (_event: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      setDirection(-1);
      setActiveIndex(prev => prev === 0 ? reviewData.reviewCard.length - 1 : prev - 1);
    } else if (info.offset.x < -threshold) {
      setDirection(1);
      setActiveIndex(prev => (prev + 1) % reviewData.reviewCard.length);
    }
  };

  const nextReview = () => {
    setDirection(1);
    setActiveIndex(prev => (prev + 1) % reviewData.reviewCard.length);
  };

  const prevReview = () => {
    setDirection(-1);
    setActiveIndex(prev => prev === 0 ? reviewData.reviewCard.length - 1 : prev - 1);
  };

  const ReviewCard = ({ review, index, isActive, onClick }: ReviewCardProps) => (
    <motion.div
      className={`relative cursor-pointer group transition-all duration-500 ${
        isActive ? 'z-20' : 'z-10'
      }`}
      onClick={onClick}
      whileHover={{ scale: isActive ? 1.02 : 1.05 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <motion.div
        className={`relative w-80 h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden backdrop-blur-2xl border-2 transition-all duration-700 ${
          isActive 
            ? 'bg-gradient-to-br from-white/20 to-white/10 border-white/30 shadow-2xl shadow-white/10' 
            : 'bg-gradient-to-br from-white/10 to-white/5 border-white/20 shadow-lg'
        }`}
        animate={isActive ? {
          y: [0, -5, 0],
        } : {}}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {/* Subtle Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at ${30 + index * 20}% 40%, rgba(255, 255, 255, 0.1), transparent 60%)`,
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />

        {/* Quote Icon */}
        <motion.div
          className="absolute top-6 left-6 w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
          animate={isActive ? { 
            scale: [1, 1.1, 1]
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Quote className="text-white/80" size={16} />
        </motion.div>

        {/* Star Rating */}
        <div className="absolute top-6 right-6 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 h-full flex flex-col">
          {/* Review Title */}
          <motion.h3
            className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight"
            layoutId={`title-${index}`}
          >
            {review.title}
          </motion.h3>

          {/* Review Text */}
          <motion.p
            className="text-gray-200 leading-relaxed flex-1 text-sm md:text-base"
            layoutId={`text-${index}`}
          >
            "{review.text}"
          </motion.p>

          {/* Author Info */}
          <motion.div
            className="mt-6 pt-4 border-t border-white/20"
            layoutId={`author-${index}`}
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-500/30 border border-white/20 flex items-center justify-center font-bold text-white backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
              >
                {review.reviewAuthor.split(' ').map(n => n[0]).join('')}
              </motion.div>
              
              <div className="flex-1">
                <p className="font-semibold text-white text-sm">{review.reviewAuthor}</p>
                <p className="text-gray-300 text-xs">{review.date}</p>
              </div>
              
              {/* Verified Badge */}
              <motion.div
                className="w-6 h-6 bg-green-500/80 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-white rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Glow Effect for Active */}
        {isActive && (
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl -z-10"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}
      </motion.div>
    </motion.div>
  );

  return (
    <section ref={containerRef} className='section relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 overflow-hidden'>
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{ y: backgroundY }}
      >
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </motion.div>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 25, repeat: Infinity }}
      />

      <motion.div style={{ opacity }} className='container relative z-10'>
        {/* Header */}
        <div className='section-head text-center max-w-4xl mx-auto mb-20'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-white/10 to-white/5 rounded-full border border-white/20 backdrop-blur-lg mb-6"
          >
            <TrendingUp className="text-white/70" size={16} />
            <span className="text-white/80 font-medium">{reviewData.sectionSubtitle}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent leading-tight'
          >
            {reviewData.sectionTitle}
          </motion.h2>
        </div>

        {/* Clean Review Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <motion.button
            onClick={prevReview}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center hover:bg-white/20 transition-all border border-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="text-white" size={24} />
          </motion.button>

          <motion.button
            onClick={nextReview}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center hover:bg-white/20 transition-all border border-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="text-white" size={24} />
          </motion.button>

          {/* Carousel */}
          <motion.div 
            className="flex items-center justify-center gap-8 px-16 py-8"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex items-center gap-8"
              >
                {/* Previous Card (Preview) */}
                <motion.div 
                  className="hidden lg:block opacity-40 scale-75"
                  whileHover={{ opacity: 0.6, scale: 0.8 }}
                >
                  <ReviewCard
                    review={reviewData.reviewCard[activeIndex === 0 ? reviewData.reviewCard.length - 1 : activeIndex - 1]}
                    index={activeIndex === 0 ? reviewData.reviewCard.length - 1 : activeIndex - 1}
                    isActive={false}
                    onClick={prevReview}
                  />
                </motion.div>

                {/* Active Card */}
                <ReviewCard
                  review={reviewData.reviewCard[activeIndex]}
                  index={activeIndex}
                  isActive={true}
                  onClick={() => {}}
                />

                {/* Next Card (Preview) */}
                <motion.div 
                  className="hidden lg:block opacity-40 scale-75"
                  whileHover={{ opacity: 0.6, scale: 0.8 }}
                >
                  <ReviewCard
                    review={reviewData.reviewCard[(activeIndex + 1) % reviewData.reviewCard.length]}
                    index={(activeIndex + 1) % reviewData.reviewCard.length}
                    isActive={false}
                    onClick={nextReview}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviewData.reviewCard.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex ? 'bg-white w-6': 'bg-white/40'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        </div>

        {/* Simple Auto-play Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-white/60 text-sm">
            Join <span className="text-white font-semibold">1,200+</span> professionals who chose Elystra
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Review;
