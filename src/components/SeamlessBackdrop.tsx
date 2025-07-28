/**
 * SeamlessBackdrop.tsx
 * One fixed warm canvas shared by Hero + Brand for a continuous, elegant scroll.
 */
import { motion, useScroll, useTransform } from 'motion/react';

const SeamlessBackdrop = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]); // slight parallax
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 8]);

  return (
    <motion.div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ y }}
      aria-hidden
    >
      {/* Deep vignette */}
      <div className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 120% at 50% 0%, #0b0a0a 0%, #0b0a0a 40%, #0a0909 60%, #080707 100%)',
        }}
      />
      {/* Warm conic glow, rotating subtly for life */}
      <motion.div
        className="absolute -inset-24 blur-3xl opacity-[0.65]"
        style={{
          background:
            'conic-gradient(from 120deg at 40% 30%, rgba(251,146,60,0.22), rgba(244,63,94,0.22), rgba(217,70,239,0.22), rgba(251,146,60,0.22))',
        }}
        // @ts-ignore
        animate={{ rotate }}
        transition={{ type: 'tween', ease: 'linear', duration: 0.01 }}
      />
      {/* Soft radial accents */}
      <div
        className="absolute -top-40 -left-40 w-[42rem] h-[42rem] rounded-full blur-[120px] opacity-50"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(251,146,60,0.24), transparent 60%)' }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-[46rem] h-[46rem] rounded-full blur-[120px] opacity-50"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(244,63,94,0.22), transparent 60%)' }}
      />
      {/* Fine grain for luxury feel */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27 viewBox=%270 0 160 160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%270.8%27/%3E%3C/svg%3E")',
        }}
      />
    </motion.div>
  );
};

export default SeamlessBackdrop;
