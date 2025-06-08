/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Constants
 */
import { processData } from '@/constants';

interface ProcessStepProps {
  step: {
    icon: React.ReactNode;
    title: string;
    text: string;
  };
  index: number;
}

const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const ProcessStep = ({ step, index }: ProcessStepProps) => (
    <motion.div
      className="relative flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
    >
      {/* Connection Arrow */}
      {index < processData.list.length - 1 && (
        <motion.div
          className="absolute -right-12 top-16 hidden lg:block z-10"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: (index * 0.2) + 0.4 }}
        >
          <ArrowRight className="text-white/40" size={24} />
        </motion.div>
      )}

      {/* Step Card */}
      <motion.div
        className="relative w-72 h-80 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 overflow-hidden"
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 20px 40px rgba(255, 255, 255, 0.1)'
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Subtle Background Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1), transparent 50%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-8 h-full flex flex-col items-center text-center">
          {/* Icon */}
          <motion.div
            className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-6"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-white text-2xl">{step.icon}</span>
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-4 leading-tight">
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 leading-relaxed text-sm flex-1">
            {step.text}
          </p>
        </div>

        {/* Subtle Glow */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl -z-10"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );

  return (
    <section ref={containerRef} className='section relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 overflow-hidden'>
      {/* Simple Background */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{ y: backgroundY }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </motion.div>

      {/* Gradient Orb */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div style={{ opacity }} className='container relative z-10'>
        {/* Header */}
        <div className='section-head text-center max-w-4xl mx-auto mb-16'>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent leading-tight'
          >
            {processData.sectionTitle}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className='text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto'
          >
            {processData.sectionText}
          </motion.p>
        </div>

        {/* Simple Process Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 xl:gap-24"
        >
          {processData.list.map((step, index) => (
            <ProcessStep
              key={index}
              step={step}
              index={index}
            />
          ))}
        </motion.div>

        {/* Simple Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-white/60 text-sm">
            Start transforming your calls into proposals today
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Process;
