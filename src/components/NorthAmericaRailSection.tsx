import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";

const ElystraGlobe = lazy(() => import("@/components/ui/world-map"));

const ease = [0.16, 1, 0.3, 1] as const;

/** Same treatment as the “Elystra” wordmark in `Header.tsx`. */
const ELYSTRA_NAME_STYLE: CSSProperties = {
  background: "linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const NorthAmericaRailSection = () => (
  <section id="territory" className="relative overflow-hidden bg-transparent py-16 md:py-24">
    <div className="relative z-10 mx-auto max-w-[88rem] px-4 md:px-6">
      <div className="grid items-center gap-6 lg:grid-cols-[1.25fr_0.75fr] xl:gap-10">
        {/* Globe — left, dominant, bigger */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, ease }}
          className="w-full lg:-ml-6 xl:-ml-10"
        >
          <Suspense
            fallback={
              <div className="flex aspect-[1.08/1] w-full items-center justify-center rounded-2xl bg-black/40">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500/25 border-t-violet-400" />
              </div>
            }
          >
            <ElystraGlobe />
          </Suspense>
        </motion.div>

        {/* Copy — right */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease }}
          className="text-center lg:text-left"
        >
          <div className="relative mx-auto max-w-2xl space-y-8 lg:mx-0 lg:pl-5">
            <div
              className="hidden lg:block pointer-events-none absolute left-0 top-0 bottom-0 w-px"
              style={{
                background: "linear-gradient(180deg, rgba(139,92,246,0.55) 0%, rgba(255,255,255,0.14) 45%, rgba(82,82,91,0.35) 100%)",
              }}
              aria-hidden
            />
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-violet-400/90">
              Operating layer
            </p>
            <p className="text-2xl font-extralight leading-[1.12] tracking-[-0.02em] text-white sm:text-3xl md:text-[1.90rem] lg:text-[2.05rem]">
              Whether you grow through{" "}
              <span className="font-light bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-100 bg-clip-text text-transparent">
                inbound or outbound, retainers or projects, local clients or enterprise
                accounts
              </span>
              ,{" "}
              <span className="font-light" style={ELYSTRA_NAME_STYLE}>
                Elystra
              </span>{" "}
              is the sales operating system underneath it.
            </p>
            <div
              className="h-px w-20 max-w-full bg-gradient-to-r from-violet-500/45 to-transparent mx-auto lg:mx-0"
              role="separator"
            />
            <p className="text-base font-light leading-[1.55] text-zinc-200 md:text-lg">
              From the first strategy call to approval, payment, delivery, and client
              continuity,{" "}
              <span className="font-normal" style={ELYSTRA_NAME_STYLE}>
                Elystra
              </span>{" "}
              gives agencies one controlled system for turning opportunities into loyal
              accounts.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default NorthAmericaRailSection;
