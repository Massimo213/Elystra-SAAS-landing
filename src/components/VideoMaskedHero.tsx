/**
 * Video-Masked Hero - final spec compliance
 * - Static word stays on screen while video fill flashes
 * - Each word spans ~80% viewport width
 * - Video fill swaps every 0.45s, word changes every 3 clips (~1.35s)
 */

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './VideoMaskedHero.css';

type WordSpec = {
  text: string;
};

type ForeignDivProps = React.HTMLAttributes<HTMLDivElement> & {
  xmlns?: string;
};

const ForeignDiv = (props: ForeignDivProps) => <div {...props} />;
const FOREIGN_OBJECT_XMLNS = 'http://www.w3.org/1999/xhtml';

const WORDS: WordSpec[] = [
  { text: 'OUTCOMPETING' },
  { text: 'MADE' },
  { text: 'SIMPLE' },
];

const CLIPS = ['/videos/Video1.mp4', '/videos/Video2.mp4', '/videos/Video3.mp4'];

const CLIP_INTERVAL_MS = 450; // 0.45s (within 0.3–0.7 window)
const CLIPS_PER_WORD = CLIPS.length; // 3 clips ≈ 1.35s per word

const VIEWBOX_WIDTH = 1600;
const VIEWBOX_HEIGHT = 420;
const TEXT_LENGTH = VIEWBOX_WIDTH * 0.82;
const TEXT_Y = VIEWBOX_HEIGHT * 0.68;

const VideoMaskedHero = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [clipIndex, setClipIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setClipIndex((prev) => {
        const next = (prev + 1) % CLIPS_PER_WORD;
        if (next === 0) {
          setWordIndex((prevWord) => (prevWord + 1) % WORDS.length);
        }
        return next;
      });
    }, CLIP_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  const currentWord = WORDS[wordIndex];
  const currentClip = CLIPS[clipIndex];

  const wordKey = useMemo(() => `${wordIndex}-${currentWord.text}`, [wordIndex, currentWord.text]);
  const clipId = useMemo(() => `hero-word-clip-${wordKey}`, [wordKey]);
const gradientId = 'hero-word-gradient';
const glowId = 'hero-word-glow';

  const textProps = {
    x: VIEWBOX_WIDTH / 2,
    y: TEXT_Y,
    textAnchor: 'middle' as const,
    dominantBaseline: 'middle' as const,
    fontFamily: `'Space Grotesk', 'SF Pro Display', 'Helvetica Neue', 'Inter', sans-serif`,
    fontWeight: 900,
    fontSize: VIEWBOX_HEIGHT * 0.78,
    letterSpacing: '-0.04em',
    textLength: TEXT_LENGTH,
    lengthAdjust: 'spacingAndGlyphs' as const,
  };

  return (
    <section className="relative py-16">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center">
        {/* Word with live video texture */}
        <div className="flex items-center justify-center min-h-[32vh]">
          <svg
            key={wordKey}
            className="video-word-svg"
            viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label={currentWord.text}
          >
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,237,213,0.95)" />
                <stop offset="45%" stopColor="rgba(251,146,60,0.92)" />
                <stop offset="75%" stopColor="rgba(244,63,94,0.9)" />
                <stop offset="100%" stopColor="rgba(219,39,119,0.85)" />
              </linearGradient>

              <filter id={glowId} x="-30%" y="-50%" width="160%" height="220%">
                <feGaussianBlur stdDeviation="28" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <clipPath id={clipId}>
                <text {...textProps}>{currentWord.text}</text>
              </clipPath>
            </defs>

            <foreignObject width="100%" height="100%" clipPath={`url(#${clipId})`}>
              <ForeignDiv
                xmlns={FOREIGN_OBJECT_XMLNS}
                className="video-word-foreign"
                aria-hidden="true"
              >
                <AnimatePresence mode="wait">
                  <motion.video
                    key={`${wordKey}-clip-${clipIndex}`}
                    src={currentClip}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="video-word-fill"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                  />
                </AnimatePresence>
              </ForeignDiv>
            </foreignObject>

            {/* Outer text outline / glow */}
            <text
              {...textProps}
              fill={`url(#${gradientId})`}
              stroke="rgba(255,255,255,0.35)"
              strokeWidth={26}
              paintOrder="stroke"
              filter={`url(#${glowId})`}
            >
              {currentWord.text}
            </text>
            <text
              {...textProps}
              fill="transparent"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth={6}
              paintOrder="stroke"
            >
              {currentWord.text}
            </text>
          </svg>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl font-light text-slate-200/90 mb-10"
        >
          Turn hours of friction into a 4-minute close.
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #fb923c 0%, #f43f5e 100%)',
            boxShadow:
              '0 4px 14px rgba(251, 146, 60, 0.45), 0 12px 32px rgba(244, 63, 94, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => (window.location.href = '/sign-up')}
        >
          <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-2xl" />
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent"
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1 }}
          />
          <span className="relative">Start Free Trial</span>
        </motion.button>
        {/* Trust */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-slate-500 text-sm mt-6"
        >
          Trusted by 170+ agencies • $4.6M closed quarterly
        </motion.p>
      </div>
    </section>
  );
};

export default VideoMaskedHero;
