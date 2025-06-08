/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useState, useRef } from 'react';
import { Play, Sparkles, ArrowRight, Zap, Crown, Shield } from 'lucide-react';

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
import { Link } from 'react-router';

/**
 * Framer motion variants
 */

interface FeatureItem {
  icon: React.ReactNode;
  iconBoxColor: string;
  title: string;
  desc: string;
}

interface FeatureDemoProps {
  feature: FeatureItem;
  index: number;
  isActive: boolean;
}

const Feature = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const FloatingParticle = ({ delay = 0 }: { delay?: number }) => (
    <motion.div
      className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
      animate={{
        y: [-20, -60, -20],
        x: [0, 30, 0],
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    />
  );

  const FeatureDemo = ({ feature, index, isActive }: FeatureDemoProps) => (
    <motion.div
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 cursor-pointer group ${
        isActive ? 'ring-2 ring-blue-400/50 shadow-2xl shadow-blue-500/20' : ''
      }`}
      whileHover={{ 
        scale: 1.02,
        rotateY: 5,
        rotateX: 5,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setActiveFeature(index)}
      style={{
        transformStyle: 'preserve-3d',
      }}
      layout
    >
      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <FloatingParticle key={i} delay={i * 0.5} />
      ))}
      
      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative p-8 z-10">
        {/* Icon with 3D Effect */}
        <motion.div
          className={`w-20 h-20 rounded-2xl ${feature.iconBoxColor} flex items-center justify-center mb-6 relative overflow-hidden`}
          whileHover={{ 
            rotateY: 15,
            rotateX: 15,
            scale: 1.1
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />
          <motion.div
            className="text-white relative z-10"
            whileHover={{ scale: 1.2, rotateZ: 5 }}
          >
            {feature.icon}
          </motion.div>
          
          {/* Premium Badge for Pro Features */}
          {index > 0 && (
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Crown size={12} className="text-white" />
            </motion.div>
          )}
        </motion.div>

        {/* Title with Gradient */}
        <motion.h3
          className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          layoutId={`title-${index}`}
        >
          {feature.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-gray-300 leading-relaxed mb-6"
          layoutId={`desc-${index}`}
        >
          {feature.desc}
        </motion.p>

        {/* Interactive Demo Button */}
        <motion.button
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsPlaying(true);
            setTimeout(() => setIsPlaying(false), 2000);
          }}
        >
          <Play size={16} />
          See in Action
          <ArrowRight size={16} />
        </motion.button>

        {/* Animated Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          transition={{ duration: 2, delay: index * 0.2 }}
        />
      </div>

      {/* Expanded Demo Overlay */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-black/90 to-purple-900/90 backdrop-blur-xl rounded-3xl flex items-center justify-center z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center text-white p-8">
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="text-white" size={24} />
              </motion.div>
              <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
              <p className="text-gray-300 text-sm">Interactive demo coming soon...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div id='feature' ref={containerRef}>
      <section className='section relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 overflow-hidden'>
        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{ y }}
        >
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </motion.div>

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-yellow-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />

        <motion.div style={{ opacity }} className='container relative z-10'>
          {/* Section Header */}
          <div className='section-head text-center max-w-4xl mx-auto mb-20'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 backdrop-blur-lg mb-6"
            >
              <Sparkles className="text-blue-400" size={16} />
              <span className="text-blue-300 font-medium">{featureData.sectionSubtitle}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className='text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent leading-tight'
            >
              {featureData.sectionTitle}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className='text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto'
            >
              {featureData.sectionText}
            </motion.p>
          </div>

          {/* Interactive Feature Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 perspective-1000'
          >
            {featureData.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: 45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: "easeOut"
                }}
              >
                <FeatureDemo 
                  feature={feature} 
                  index={index} 
                  isActive={activeFeature === index}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-20"
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                
                <Shield size={20} />
                <a href='https://app.elystra.online/'>
                Experience All Features
                </a>
                <Sparkles size={20} />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Feature;
