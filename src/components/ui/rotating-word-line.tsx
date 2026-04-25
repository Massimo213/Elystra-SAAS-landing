import { AnimatePresence, motion, type Variants } from "framer-motion";

const easeInOut = [0.45, 0, 0.15, 1] as const;
const easeOutSoft = [0.16, 1, 0.3, 1] as const;

const line: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      delayChildren: 0.1,
      staggerChildren: 0.048,
    },
  },
  /**
   * Keep line opacity at 1; each word has its own `exit` variant (LTR).
   */
  lineExit: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.03,
      staggerDirection: 1,
    },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: easeOutSoft },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(5px)",
    transition: { duration: 0.26, ease: easeInOut },
  },
};

const wordGap = "gap-x-2 sm:gap-x-2.5 md:gap-x-3 lg:gap-x-3.5 gap-y-0.5";

const wordClass =
  "inline-block will-change-transform bg-gradient-to-r from-violet-200 via-fuchsia-200/95 to-violet-200 " +
  "bg-clip-text text-transparent antialiased [text-rendering:geometricPrecision]";

export type RotatingWordLineProps = {
  phrases: readonly string[];
  activeIndex: number;
  shouldReduce: boolean;
  className?: string;
  lineClassName?: string;
};

/**
 * Exits the previous phrase one word at a time, then reveals the next phrase one word at a time
 * (AnimatePresence `mode="wait"` — no overlap between lines).
 */
export function RotatingWordLine({
  phrases,
  activeIndex,
  shouldReduce,
  className = "",
  lineClassName = "",
}: RotatingWordLineProps) {
  const phrase = phrases[Math.min(Math.max(0, activeIndex), phrases.length - 1)] ?? "";
  const words = phrase.split(" ").filter(Boolean);

  if (shouldReduce) {
    return (
      <p
        className={`${wordClass} [word-spacing:0.14em] sm:[word-spacing:0.2em] ${lineClassName} ${className}`.trim()}
        aria-label={phrase}
      >
        {phrase}
      </p>
    );
  }

  return (
    <div
      className={`inline-flex w-full min-h-[1.1em] flex-wrap items-baseline justify-center ${wordGap} text-center ${className}`.trim()}
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={phrase}
          className={`inline-flex w-full min-w-0 flex-wrap items-baseline justify-center ${wordGap} ${lineClassName}`.trim()}
          variants={line}
          initial="hidden"
          animate="show"
          exit="lineExit"
        >
          {words.map((w, i) => (
            <motion.span key={`${phrase}-${i}`} variants={word} className={wordClass}>
              {w}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
