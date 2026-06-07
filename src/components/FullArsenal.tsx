import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLenis } from "lenis/react";
import { useDemoBooking } from "@/contexts/DemoBookingContext";
import { getArsenalPanels } from "@/components/ArsenalPanels";

type Feature = {
  id: string;
  tab: string;
  eyebrow: string;
  titleStart?: string;
  titleAccent: string;
  titleEnd?: string;
  description: string;
  bullets: readonly string[];
};

const FEATURES: readonly Feature[] = [
  {
    id: "scope",
    tab: "SCOPE",
    eyebrow: "Proposal builder",
    titleStart: "A call becomes",
    titleAccent: "signed and paid.",
    description:
      "Upload the conversation. Elystra builds the priced scope, captures signature and deposit on one screen, then fires your whole stack — no chasing, no formatting, no dead time.",
    bullets: [
      "Notes, transcripts, and recordings become structured, priced scopes.",
      "Sign and collect the deposit in the same motion — zero days waiting.",
      "One signature triggers CRM, invoicing, delivery, and onboarding.",
    ],
  },
  {
    id: "intel",
    tab: "INTEL",
    eyebrow: "Deal intelligence",
    titleStart: "Read the buyer.",
    titleAccent: "Predict the close.",
    description:
      "Elystra reads what the buyer does — every open, every second on pricing, every forward — and turns it into named patterns and calibrated probabilities.",
    bullets: [
      "Behavioral signals flag comparison-shopping, stalls, and cooling intent.",
      "Deal X-Ray shows where the buyer's attention actually went.",
      "Every live deal carries a probability drawn from your own history.",
    ],
  },
  {
    id: "close",
    tab: "CLOSE",
    eyebrow: "Close & collect",
    titleStart: "Find the money,",
    titleAccent: "then collect it.",
    description:
      "Elystra autopsies exactly where revenue dies, drafts the rescue for every stalled deal, and surfaces the cash already signed but uncollected — with speed you can measure.",
    bullets: [
      "The death map shows what's lost at each stage, in dollars.",
      "The war room diagnoses each blocker and writes the next move.",
      "Signed-but-unpaid deals get pushed to the top — collect now.",
    ],
  },
  {
    id: "client",
    tab: "CLIENT",
    eyebrow: "Client continuity",
    titleStart: "Turn the close into a",
    titleAccent: "compounding account.",
    description:
      "After payment, the relationship stays on the rail — health scored, churn watched, concentration risk flagged, and recurring revenue charging itself. Retention is engineered, not hoped for.",
    bullets: [
      "Client health, churn risk, and expansion probability stay visible.",
      "Portfolio concentration is flagged before a churn becomes a crisis.",
      "Retainers auto-charge on schedule — no invoices, no chasing.",
    ],
  },
] as const;

const SUBPANEL_CYCLE_MS = 4200;

const WHEEL_THRESHOLD = 70;
const LOCK_TRIGGER_TOP = 120;
const PRELOCK_ZONE_TOP = 180;
const STEP_COOLDOWN_MS = 700;
const RELEASE_COOLDOWN_MS = 950;

function setPageScrollLocked(locked: boolean) {
  if (locked) {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  } else {
    document.documentElement.style.removeProperty("overflow");
    document.body.style.removeProperty("overflow");
  }
}

const FullArsenal = () => {
  const { openDemoBooking } = useDemoBooking();
  const lenis = useLenis();
  const shouldReduce = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const lockedRef = useRef(false);
  const wheelAccumRef = useRef(0);
  const releasedDownRef = useRef(false);
  const releasedUpRef = useRef(false);
  const wheelCooldownUntilRef = useRef(0);
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  const [locked, setLocked] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);

  const activeFeature = FEATURES[activeIndex];
  const panelCount = getArsenalPanels(activeFeature.id).length;

  // Reset sub-panel when the feature changes.
  useEffect(() => {
    setSubIndex(0);
  }, [activeIndex]);

  // Auto-advance sub-panels so the depth of each tab is visible without input.
  useEffect(() => {
    if (shouldReduce || panelCount <= 1) return;
    const id = window.setInterval(() => {
      setSubIndex((i) => (i + 1) % panelCount);
    }, SUBPANEL_CYCLE_MS);
    return () => window.clearInterval(id);
  }, [activeIndex, panelCount, shouldReduce]);

  const unlockAndScroll = useCallback((target: number, releasedDown: boolean) => {
    const safeTarget = Math.max(0, target);
    wheelAccumRef.current = 0;
    wheelCooldownUntilRef.current = Date.now() + RELEASE_COOLDOWN_MS;
    lockedRef.current = false;
    releasedDownRef.current = releasedDown;
    releasedUpRef.current = !releasedDown;
    setLocked(false);
    setPageScrollLocked(false);
    lenisRef.current?.start();

    requestAnimationFrame(() => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(safeTarget, { duration: 1.05, force: true });
      } else {
        window.scrollTo({ top: safeTarget, left: 0, behavior: "smooth" });
      }
    });
  }, []);

  const exitDown = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    unlockAndScroll(sectionTop + window.innerHeight + 8, true);
  }, [unlockAndScroll]);

  const exitUp = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    unlockAndScroll(sectionTop - 8, false);
  }, [unlockAndScroll]);

  const nextFeature = useCallback(() => {
    if (activeIndex < FEATURES.length - 1) {
      setActiveIndex((index) => index + 1);
    } else {
      exitDown();
    }
  }, [activeIndex, exitDown]);

  const prevFeature = useCallback(() => {
    if (activeIndex > 0) {
      setActiveIndex((index) => index - 1);
    } else {
      exitUp();
    }
  }, [activeIndex, exitUp]);

  const lockSection = useCallback(() => {
    if (shouldReduce || lockedRef.current) return;

    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(sectionTop, { immediate: true, force: true });
      lenisRef.current.stop();
    } else {
      window.scrollTo({ top: sectionTop, left: 0, behavior: "auto" });
    }

    wheelAccumRef.current = 0;
    lockedRef.current = true;
    setLocked(true);
    setPageScrollLocked(true);
  }, [shouldReduce]);

  useEffect(() => {
    if (shouldReduce) return;

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section || lockedRef.current) return;

      const rect = section.getBoundingClientRect();

      if (releasedDownRef.current) {
        if (rect.top > window.innerHeight * 0.4) {
          releasedDownRef.current = false;
        }
        return;
      }

      if (releasedUpRef.current) {
        if (rect.top > window.innerHeight * 0.45) {
          releasedUpRef.current = false;
        }
        return;
      }

      if (rect.top <= LOCK_TRIGGER_TOP && rect.bottom >= window.innerHeight * 0.82) {
        lockSection();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [lockSection, shouldReduce]);

  useEffect(() => {
    if (shouldReduce || locked) return;

    const onWheelPrelock = (event: WheelEvent) => {
      const section = sectionRef.current;
      if (!section || lockedRef.current) return;

      const rect = section.getBoundingClientRect();
      const enteringFromTop =
        rect.top <= PRELOCK_ZONE_TOP && rect.bottom >= window.innerHeight * 0.82;

      if (!enteringFromTop) return;
      if (releasedUpRef.current && event.deltaY < 0) return;
      if (releasedUpRef.current && event.deltaY > 0) {
        releasedUpRef.current = false;
      }
      if (Date.now() < wheelCooldownUntilRef.current) return;

      event.preventDefault();
      event.stopPropagation();
      lockSection();
    };

    window.addEventListener("wheel", onWheelPrelock, { passive: false, capture: true });
    return () => window.removeEventListener("wheel", onWheelPrelock, true);
  }, [lockSection, locked, shouldReduce]);

  useEffect(() => {
    if (!locked || shouldReduce) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (Date.now() < wheelCooldownUntilRef.current) return;

      wheelAccumRef.current += event.deltaY;

      if (wheelAccumRef.current >= WHEEL_THRESHOLD) {
        wheelAccumRef.current = 0;
        wheelCooldownUntilRef.current = Date.now() + STEP_COOLDOWN_MS;
        nextFeature();
      } else if (wheelAccumRef.current <= -WHEEL_THRESHOLD) {
        wheelAccumRef.current = 0;
        wheelCooldownUntilRef.current = Date.now() + STEP_COOLDOWN_MS;
        prevFeature();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => window.removeEventListener("wheel", onWheel, true);
  }, [locked, nextFeature, prevFeature, shouldReduce]);

  useEffect(() => {
    return () => {
      setPageScrollLocked(false);
      lenisRef.current?.start();
    };
  }, []);

  const jumpToFeature = useCallback((index: number) => {
    setActiveIndex(index);

    if (!lockedRef.current) {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(sectionTop, { duration: 0.9 });
      } else {
        window.scrollTo({ top: sectionTop, behavior: "smooth" });
      }
    }
  }, []);

  return (
    <section id="the-rail" className="relative bg-transparent">
      {!shouldReduce && (
        <section ref={sectionRef} className="relative hidden h-screen md:block">
          <DesktopFeatureRail
            activeFeature={activeFeature}
            activeIndex={activeIndex}
            subIndex={subIndex}
            locked={locked}
            onDemo={openDemoBooking}
            onFeatureSelect={jumpToFeature}
            onSubSelect={setSubIndex}
          />
        </section>
      )}

      <div className={shouldReduce ? "px-4 py-16 md:px-6" : "px-4 py-16 md:hidden md:px-6"}>
        <MobileFeatureRail
          activeIndex={activeIndex}
          subIndex={subIndex}
          onDemo={openDemoBooking}
          onFeatureSelect={setActiveIndex}
          onSubSelect={setSubIndex}
        />
      </div>
    </section>
  );
};

/** Labeled sub-panel selector — communicates that each tab holds multiple weapons. */
function SubPanelSelector({
  featureId,
  subIndex,
  onSubSelect,
  align = "center",
}: {
  featureId: string;
  subIndex: number;
  onSubSelect: (index: number) => void;
  align?: "center" | "start";
}) {
  const panels = getArsenalPanels(featureId);
  if (panels.length <= 1) return null;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${align === "center" ? "justify-center" : "justify-start"}`}>
      {panels.map((p, idx) => {
        const active = idx === subIndex;
        return (
          <button
            key={p.label}
            type="button"
            onClick={() => onSubSelect(idx)}
            className="rounded-full border px-3 py-1.5 text-[0.66rem] font-light uppercase tracking-[0.14em] transition-all duration-300"
            style={{
              color: active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.42)",
              borderColor: active ? "rgba(167,139,250,0.45)" : "rgba(255,255,255,0.08)",
              background: active ? "rgba(139,92,246,0.14)" : "rgba(255,255,255,0.015)",
            }}
          >
            {p.label}
          </button>
        );
      })}
    </div>
  );
}

function DesktopFeatureRail({
  activeFeature,
  activeIndex,
  subIndex,
  locked,
  onDemo,
  onFeatureSelect,
  onSubSelect,
}: {
  activeFeature: Feature;
  activeIndex: number;
  subIndex: number;
  locked: boolean;
  onDemo: () => void;
  onFeatureSelect: (index: number) => void;
  onSubSelect: (index: number) => void;
}) {
  const panels = getArsenalPanels(activeFeature.id);
  const safeSub = Math.min(subIndex, Math.max(0, panels.length - 1));
  const activePanel = panels[safeSub];

  const content = (
    <div className="relative h-full w-full overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black via-black/42 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/32 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 16% 16%, rgba(255,255,255,0.035) 0%, transparent 26%),
            radial-gradient(circle at 84% 18%, rgba(255,255,255,0.025) 0%, transparent 24%),
            radial-gradient(circle at 50% 100%, rgba(255,255,255,0.018) 0%, transparent 36%),
            linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 18%),
            linear-gradient(180deg, rgba(7,7,10,0.03) 0%, rgba(7,7,10,0.08) 100%)
          `,
        }}
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[86rem] flex-col px-4 md:px-6">
        <div className="relative flex h-full flex-col px-2 pb-8 pt-24 lg:px-4 lg:pb-10 lg:pt-28">
          <LayoutGroup id="elystra-feature-tabs">
            <nav className="flex items-center justify-center" role="tablist" aria-label="Feature tabs">
              <div className="flex items-center gap-3 rounded-full border border-white/8 bg-white/[0.02] px-4 py-2">
                {FEATURES.map((feature, index) => {
                  const active = index === activeIndex;
                  return (
                    <button
                      key={feature.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => onFeatureSelect(index)}
                      className="relative px-4 py-2 text-sm font-light tracking-[0.16em] transition-colors duration-300"
                      style={{ color: active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)" }}
                      onMouseEnter={(event) => {
                        if (!active) event.currentTarget.style.color = "rgba(255,255,255,0.8)";
                      }}
                      onMouseLeave={(event) => {
                        if (!active) event.currentTarget.style.color = "rgba(255,255,255,0.45)";
                      }}
                    >
                      {feature.tab}
                      {active && (
                        <motion.span
                          layoutId="rail-nav-dot"
                          className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-violet-400"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </nav>
          </LayoutGroup>

          <div className="grid min-h-0 flex-1 grid-cols-[0.9fr_1.1fr] items-center gap-12 pt-10">
            <div className="flex h-full flex-col justify-center">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={activeFeature.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="max-w-[36rem]"
                >
                  <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-violet-300/78">
                    {activeFeature.eyebrow}
                  </p>
                  <h3 className="mt-5 max-w-[30rem] text-5xl font-extralight leading-[0.96] tracking-[-0.055em] text-white xl:text-[5.1rem]">
                    {activeFeature.titleStart && <span>{activeFeature.titleStart} </span>}
                    <span className="bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-300 bg-clip-text text-transparent">
                      {activeFeature.titleAccent}
                    </span>
                    {activeFeature.titleEnd && <span> {activeFeature.titleEnd}</span>}
                  </h3>
                  <p className="mt-5 max-w-[31rem] text-[1.02rem] font-light leading-[1.6] text-zinc-300">
                    {activeFeature.description}
                  </p>

                  <div className="mt-8 space-y-3.5">
                    {activeFeature.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-3">
                        <span className="mt-[0.45rem] h-2 w-2 rounded-full bg-violet-400" />
                        <p className="max-w-[31rem] text-[0.98rem] font-light leading-[1.55] text-zinc-300">
                          {bullet}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 flex items-center gap-4">
                    <motion.button
                      type="button"
                      onClick={onDemo}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-6 py-2.5 text-sm font-light text-white"
                      style={{
                        background: "linear-gradient(135deg, #7c3aed 0%, #9333ea 50%, #a855f7 100%)",
                        boxShadow: "0 0 38px rgba(139,92,246,0.28), inset 0 1px 0 rgba(255,255,255,0.15)",
                      }}
                    >
                      <span
                        className="absolute inset-0 -translate-x-full transition-transform duration-700 group-hover:translate-x-full"
                        style={{
                          background:
                            "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.15) 50%, transparent 80%)",
                        }}
                      />
                      <span
                        className="absolute left-1/2 top-0 h-[1px] w-3/4 -translate-x-1/2"
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                        }}
                      />
                      <Sparkles className="relative z-10 h-3.5 w-3.5" />
                      <span className="relative z-10 tracking-wide">Book Demo</span>
                      <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex min-h-0 flex-col items-center justify-center gap-5">
              <div className="flex w-full max-w-[34rem] items-center justify-center">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={`${activeFeature.id}-${safeSub}`}
                    initial={{ opacity: 0, y: 22, scale: 0.986 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -14, scale: 0.986 }}
                    transition={{ duration: 0.36, ease: "easeOut" }}
                    className="w-full"
                  >
                    {activePanel?.node}
                  </motion.div>
                </AnimatePresence>
              </div>
              <SubPanelSelector featureId={activeFeature.id} subIndex={safeSub} onSubSelect={onSubSelect} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (locked) {
    return <div className="fixed inset-0 z-40 bg-transparent">{content}</div>;
  }

  return content;
}

function MobileFeatureRail({
  activeIndex,
  subIndex,
  onDemo,
  onFeatureSelect,
  onSubSelect,
}: {
  activeIndex: number;
  subIndex: number;
  onDemo: () => void;
  onFeatureSelect: (index: number) => void;
  onSubSelect: (index: number) => void;
}) {
  const feature = FEATURES[activeIndex];
  const panels = getArsenalPanels(feature.id);
  const safeSub = Math.min(subIndex, Math.max(0, panels.length - 1));
  const activePanel = panels[safeSub];

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[rgba(10,10,14,0.5)] px-4 py-5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.14)] backdrop-blur-[2px]">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {FEATURES.map((item, index) => {
          const active = index === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onFeatureSelect(index)}
              className="rounded-2xl px-3 py-3 text-[0.74rem] font-light uppercase tracking-[0.16em]"
              style={{
                color: active ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.58)",
                background: active ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.015)",
              }}
            >
              {item.tab}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-violet-300/78">
        {feature.eyebrow}
      </p>
      <h3 className="mt-4 text-4xl font-extralight leading-[1] tracking-[-0.05em] text-white">
        {feature.titleStart && <span>{feature.titleStart} </span>}
        <span className="bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-300 bg-clip-text text-transparent">
          {feature.titleAccent}
        </span>
        {feature.titleEnd && <span> {feature.titleEnd}</span>}
      </h3>
      <p className="mt-4 text-base font-light leading-[1.6] text-zinc-300">{feature.description}</p>

      <div className="mt-6 space-y-3">
        {feature.bullets.map((bullet) => (
          <div key={bullet} className="flex items-start gap-3">
            <span className="mt-[0.45rem] h-2 w-2 rounded-full bg-violet-400" />
            <p className="text-[0.98rem] font-light leading-[1.55] text-zinc-300">{bullet}</p>
          </div>
        ))}
      </div>

      <div className="mt-7">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={`${feature.id}-${safeSub}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
          >
            {activePanel?.node}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5">
        <SubPanelSelector featureId={feature.id} subIndex={safeSub} onSubSelect={onSubSelect} align="start" />
      </div>

      <motion.button
        type="button"
        onClick={onDemo}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-full px-6 py-2.5 text-sm font-light text-white"
        style={{
          background: "linear-gradient(135deg, #7c3aed 0%, #9333ea 50%, #a855f7 100%)",
          boxShadow: "0 0 34px rgba(139,92,246,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        <span
          className="absolute inset-0 -translate-x-full transition-transform duration-700 group-hover:translate-x-full"
          style={{
            background: "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.15) 50%, transparent 80%)",
          }}
        />
        <span
          className="absolute left-1/2 top-0 h-[1px] w-3/4 -translate-x-1/2"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)" }}
        />
        <Sparkles className="relative z-10 h-3.5 w-3.5" />
        <span className="relative z-10 tracking-wide">Book Demo</span>
        <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </motion.button>
    </div>
  );
}

export default FullArsenal;
