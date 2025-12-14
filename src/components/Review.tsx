/**
 * Reviews.tsx — FIXED
 * Stars, quotes, and text no longer overlap. Clear header row with star rating,
 * quote becomes a soft background watermark, and spacing is reserved—no absolute overlays.
 */

import {
  motion,
  AnimatePresence,
  Variants,
  PanInfo,
  useInView,
} from 'motion/react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, ShieldCheck, Trophy } from 'lucide-react';
import { reviewData, profileImages } from '@/constants';
import { SparklesCore } from '@/components/ui/sparkles';

/* ---------- Variants ---------- */
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.55, ease: 'easeOut' } },
};

const haloPulse: Variants = {
  idle:  { opacity: 0.35, scale: 1 },
  pulse: { opacity: [0.25, 0.55, 0.25], scale: [1, 1.04, 1], transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } },
};

/* ---------- Helpers ---------- */
const cn = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(' ');

/* ---------- Components ---------- */
const Stars = ({ count = 5, size = 14 }: { count?: number; size?: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="text-amber-400 fill-amber-400" width={size} height={size} />
    ))}
  </div>
);

type CardData = (typeof reviewData.reviewCard)[number];

const ReviewCard = ({
  data,
  active,
  onClick,
}: {
  data: CardData;
  index: number;
  active: boolean;
  onClick?: () => void;
}) => {
  return (
    <motion.article
      layout
      onClick={onClick}
      className={cn(
        'relative w-[20rem] md:w-[24rem] h-[22rem] md:h-[25rem] select-none cursor-pointer',
        'rounded-[1.6rem] overflow-hidden',
        'transition-all duration-500'
      )}
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{ scale: active ? 1.02 : 1.04 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Warm border halo */}
      <motion.div
        variants={haloPulse}
        initial="idle"
        animate="pulse"
        className="absolute -inset-1 rounded-[1.8rem] blur-md"
        style={{
          background:
            'linear-gradient(120deg, rgba(251,146,60,0.45), rgba(244,63,94,0.45), rgba(217,70,239,0.45))',
          opacity: active ? 0.5 : 0.2,
        }}
      />

      {/* Glass body */}
      <div
        className={cn(
          'relative z-10 h-full rounded-[1.6rem] border',
          active
            ? 'border-white/20 bg-white/[0.06] backdrop-blur-xl shadow-[0_0_40px_rgba(251,146,60,0.15)]'
            : 'border-white/10 bg-white/[0.04] backdrop-blur-md'
        )}
      >
        {/* Soft watermark quote in BACKGROUND, not over text */}
        <Quote
          aria-hidden
          className="pointer-events-none absolute -right-4 -bottom-2 opacity-[0.06]"
          size={160}
        />

        {/* Header row — quote chip LEFT, stars RIGHT (no absolute overlap) */}
        <div className="flex items-center justify-between px-6 pt-5">
          <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-black/30 border border-white/10 backdrop-blur-md">
            <Quote className="w-3.5 h-3.5 text-white/80" />
            <span className="text-[11px] text-white/80">Verified review</span>
          </div>
          <div className="inline-flex items-center gap-2">
            <Stars size={14} />
            <span className="text-[11px] text-white/80">5.0</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col px-6 pb-6 pt-4 h-[calc(100%-58px)]">
          <h3 className="text-[17px] md:text-[19px] font-semibold text-white/95 leading-snug mb-2">
            {data.title}
          </h3>

          <p className="text-[13.5px] md:text-[15px] text-slate-200/90 leading-relaxed flex-1">
            “{data.text}”
          </p>

          <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-3">
            <img 
              src={profileImages[data.avatar as keyof typeof profileImages]} 
              alt={data.reviewAuthor}
              className="w-10 h-10 rounded-full object-cover border border-white/20"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-white/90 font-medium truncate">{data.reviewAuthor}</p>
              <p className="text-[12px] text-white/60">{data.date}</p>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-emerald-400/90">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[12px]">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const Review = () => {
  const TOTAL = reviewData.reviewCard.length;
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const rootRef = useRef<HTMLElement>(null);
  const inView = useInView(rootRef, { once: false, amount: 0.4 });

  // autoplay only while in view
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => {
      setDir(1);
      setIdx((p) => (p + 1) % TOTAL);
    }, 4600);
    return () => clearInterval(t);
  }, [inView, TOTAL]);

  // keyboard nav (left/right)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!inView) return;
      if (e.key === 'ArrowRight') { setDir(1); setIdx((p) => (p + 1) % TOTAL); }
      if (e.key === 'ArrowLeft')  { setDir(-1); setIdx((p) => (p - 1 + TOTAL) % TOTAL); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [inView, TOTAL]);

  const go = useCallback((next: boolean) => {
    setDir(next ? 1 : -1);
    setIdx((p) => (p + (next ? 1 : -1) + TOTAL) % TOTAL);
  }, [TOTAL]);

  const onDragEnd = (_: any, info: PanInfo) => {
    const t = 60;
    if (info.offset.x < -t) go(true);
    else if (info.offset.x > t) go(false);
  };

  const prevIndex = (idx - 1 + TOTAL) % TOTAL;
  const nextIndex = (idx + 1) % TOTAL;

  return (
    <section ref={rootRef} className="relative overflow-hidden pt-16 md:pt-24 bg-black">
      {/* ✨ SPARKLES BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SparklesCore
          id="review-sparkles"
          background="transparent"
          minSize={0.5}
          maxSize={1.5}
          particleDensity={70}
          speed={1.8}
          className="w-full h-full"
          particleColor="#e879f9"
        />
      </div>
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md mb-5"
          >
            <Trophy className="w-4 h-4 text-white/75" />
            <span className="text-[12px] text-white/80 tracking-wide uppercase">
              {reviewData.sectionSubtitle || 'Reviews'}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.55 }}
            className="text-4xl md:text-6xl font-black leading-tight bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(90deg,#f8fafc,#e2e8f0)' }}
          >
            {reviewData.sectionTitle || 'What Users Really Think'}
          </motion.h2>
        </div>

        {/* Carousel */}
        <div className="relative mt-10 md:mt-14">
          {/* Arrows */}
          <div className="hidden md:block">
            <button
              aria-label="Previous review"
              onClick={() => go(false)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/15 bg-white/10 backdrop-blur-md grid place-items-center hover:bg-white/20 transition"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              aria-label="Next review"
              onClick={() => go(true)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/15 bg-white/10 backdrop-blur-md grid place-items-center hover:bg-white/20 transition"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Track */}
          <motion.div className="flex items-center justify-center gap-6 md:gap-8 px-10 md:px-16">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={idx}
                className="flex items-center gap-6 md:gap-8"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={onDragEnd}
                initial={{ x: dir > 0 ? 320 : -320, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: dir > 0 ? -320 : 320, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {/* Prev preview (dimmed) */}
                <div className="hidden lg:block opacity-45 scale-75 hover:opacity-60 hover:scale-[0.8] transition">
                  <ReviewCard
                    data={reviewData.reviewCard[prevIndex]}
                    index={prevIndex}
                    active={false}
                    onClick={() => go(false)}
                  />
                </div>

                {/* Active */}
                <ReviewCard
                  data={reviewData.reviewCard[idx]}
                  index={idx}
                  active
                />

                {/* Next preview (dimmed) */}
                <div className="hidden lg:block opacity-45 scale-75 hover:opacity-60 hover:scale-[0.8] transition">
                  <ReviewCard
                    data={reviewData.reviewCard[nextIndex]}
                    index={nextIndex}
                    active={false}
                    onClick={() => go(true)}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {reviewData.reviewCard.map((_, i) => {
              const active = i === idx;
              return (
                <button
                  key={i}
                  aria-label={`Go to review ${i + 1}`}
                  onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    active ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                  )}
                />
              );
            })}
          </div>
        </div>

        {/* Bridge hairline */}
        <div
          className="mt-12 md:mt-16 h-px w-full"
          style={{
            background:
              'linear-gradient(90deg, rgba(251,146,60,0), rgba(251,146,60,0.45), rgba(244,63,94,0.45), rgba(217,70,239,0.45), rgba(217,70,239,0))',
          }}
        />
      </div>
    </section>
  );
};

export default Review;
