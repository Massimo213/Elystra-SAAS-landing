import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
};

const ease = [0.16, 0.84, 0.44, 1] as const;

const PageHero = ({ eyebrow, title, description }: PageHeroProps) => {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-6 pb-12 pt-12 md:pb-16 md:pt-20">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full blur-3xl opacity-35"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.26) 0%, transparent 68%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        {eyebrow ? (
          <motion.p
            initial={shouldReduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-[0.7rem] uppercase tracking-[0.28em] text-violet-400"
          >
            {eyebrow}
          </motion.p>
        ) : null}

        <motion.h1
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.06, ease }}
          className="mt-4 text-3xl font-extralight tracking-[-0.03em] text-white md:text-5xl"
        >
          {title}
        </motion.h1>

        {description ? (
          <motion.p
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease }}
            className="mt-5 max-w-2xl text-base font-light leading-7 text-zinc-400 md:text-lg"
          >
            {description}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
};

export default PageHero;
