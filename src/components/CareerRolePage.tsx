/**
 * Individual career role page — full explanation + apply form.
 */

import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { logo } from "@/assets";
import CareersApplyForm from "@/components/CareersApplyForm";
import { getRoleBySlug } from "@/data/careers";

const ease = [0.16, 0.84, 0.44, 1] as const;

const CareerRolePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const role = slug ? getRoleBySlug(slug) : undefined;
  const shouldReduce = useReducedMotion();

  if (!role) {
    return <Navigate to="/careers" replace />;
  }

  return (
    <main className="relative z-10 min-h-screen pt-14 md:pt-16">
      <section className="relative overflow-hidden px-6 pb-12 pt-12 md:pb-16 md:pt-20">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full blur-3xl opacity-35"
            style={{
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.26) 0%, transparent 68%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <Link
              to="/careers"
              className="inline-flex items-center gap-1.5 text-sm font-light text-zinc-500 transition-colors hover:text-zinc-300"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All roles
            </Link>
          </motion.div>

          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease }}
            className="mt-8"
          >
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-zinc-500">
              {role.department}
            </p>

            <h1 className="mt-4 text-3xl font-extralight tracking-[-0.03em] text-white md:text-5xl">
              {role.title}
            </h1>
            {role.summary ? (
              <p className="mt-5 max-w-2xl text-base font-light leading-7 text-zinc-400 md:text-lg">
                {role.summary}
              </p>
            ) : null}

            <a
              href="#apply"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.06] px-6 py-3 text-sm font-light text-white transition-colors hover:bg-white/[0.1]"
            >
              Apply for this role
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </section>

      <section className="relative px-6 pb-16 md:pb-24">
        <div className="mx-auto max-w-3xl space-y-14">
          {role.sections.map((section, index) => (
            <motion.div
              key={section.heading}
              initial={shouldReduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: index * 0.04, ease }}
            >
              <h2 className="text-[0.7rem] uppercase tracking-[0.28em] text-zinc-500">
                {section.heading}
              </h2>
              <ul className="mt-5 space-y-3">
                {section.body.map((line) => (
                  <li
                    key={line}
                    className="border-l border-white/[0.08] pl-4 text-base font-light leading-7 text-zinc-300"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {role.compensation && (
            <motion.div
              initial={shouldReduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease }}
              className="grid gap-10 border-t border-white/[0.06] pt-14 md:grid-cols-2"
            >
              <div>
                <h2 className="text-[0.7rem] uppercase tracking-[0.28em] text-zinc-500">Pay</h2>
                <ul className="mt-5 space-y-3 text-sm font-light text-zinc-300">
                  {role.compensation.lines.map((line) => (
                    <li
                      key={line.label}
                      className="flex justify-between gap-4 border-b border-white/[0.06] pb-3 last:border-b-0 last:pb-0"
                    >
                      <span className="text-zinc-500">{line.label}</span>
                      <span className="text-white">{line.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-[0.7rem] uppercase tracking-[0.28em] text-zinc-500">
                  The math
                </h2>
                <div className="mt-5 space-y-4 text-sm font-light leading-6 text-zinc-400">
                  {role.compensation.math.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <section
        id="apply"
        className="relative scroll-mt-24 border-t border-white/[0.06] px-6 py-20 md:py-28"
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-0 h-[24rem] w-[40rem] -translate-x-1/2 rounded-full blur-3xl opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-xl">
          <div className="text-center">
            <h2 className="text-3xl font-extralight tracking-[-0.03em] text-white md:text-4xl">
              Apply
            </h2>
            <p className="mt-3 text-sm font-light text-zinc-500 md:text-base">
              Applying for <span className="text-zinc-300">{role.title}</span>.
              {role.id === "sdr"
                ? " Upload your CV, attach a voice recording or link, and leave a short note. Everything goes to our team."
                : " Upload your CV, leave a short note, we'll take it from there."}
            </p>
          </div>
          <div className="mt-12">
            <CareersApplyForm roleTitle={role.title} requiresRecording={role.id === "sdr"} />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.04] px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Elystra" className="h-6 w-6" />
            <span className="text-sm font-light text-zinc-500">Elystra</span>
          </Link>
          <p className="text-xs font-light text-zinc-600">
            © {new Date().getFullYear()} Elystra. Proposal-to-cash infrastructure for agencies.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default CareerRolePage;
