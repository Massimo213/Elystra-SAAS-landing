/**
 * Careers index — list every open role. Click through for the full page.
 */

import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { logo } from "@/assets";
import {
  CAREER_DEPARTMENTS,
  CAREER_ROLES,
  type CareerRole,
  rolesByDepartment,
} from "@/data/careers";

const ease = [0.16, 0.84, 0.44, 1] as const;

const Careers = () => {
  const shouldReduce = useReducedMotion();

  return (
    <main className="relative z-10 min-h-screen pt-14 md:pt-16">
      <section className="relative overflow-hidden px-6 pb-16 pt-16 md:pb-20 md:pt-24">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full blur-3xl opacity-40"
            style={{
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.28) 0%, transparent 68%)",
            }}
          />
          <div
            className="absolute bottom-0 right-[-10%] h-[28rem] w-[28rem] rounded-full blur-3xl opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-8 flex items-center justify-center gap-3"
          >
            <img src={logo} alt="" className="h-10 w-10" />
            <span
              className="text-2xl font-light tracking-wide md:text-3xl"
              style={{
                background: "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.72) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Elystra
            </span>
          </motion.div>

          <motion.h1
            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="text-4xl font-extralight tracking-[-0.04em] text-white md:text-6xl lg:text-7xl"
          >
            Build the revenue OS.
            <br className="hidden sm:block" />
            Build your career.
          </motion.h1>

          <motion.p
            initial={shouldReduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16, ease }}
            className="mx-auto mt-6 max-w-2xl text-base font-light leading-7 text-zinc-400 md:text-lg"
          >
            Elystra trusts early hires to make an impact from day one. Create real commercial value,
            own measurable outcomes, and ship the systems that turn agency conversations into
            collected revenue.
          </motion.p>

          <motion.p
            initial={shouldReduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22, ease }}
            className="mx-auto mt-4 max-w-2xl text-sm font-light leading-7 text-zinc-500 md:text-base"
          >
            Elystra people deliver mission-critical outcomes for agencies across North America.{" "}
            {CAREER_ROLES.length} roles. Three teams. Find where you belong.
          </motion.p>

          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease }}
            className="mt-10"
          >
            <a
              href="#roles"
              className="group inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.06] px-6 py-3 text-sm font-light text-white transition-colors hover:bg-white/[0.1]"
            >
              Find your role
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </section>

      <section id="roles" className="relative scroll-mt-24 px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-3xl space-y-16 md:space-y-20">
          {CAREER_DEPARTMENTS.map((department, deptIndex) => {
            const roles = rolesByDepartment(department);
            if (roles.length === 0) return null;

            return (
              <motion.div
                key={department}
                initial={shouldReduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: deptIndex * 0.04, ease }}
              >
                <p className="text-[0.7rem] uppercase tracking-[0.28em] text-zinc-500">
                  {department}
                </p>
                <div className="mt-4 divide-y divide-white/[0.06] border-t border-white/[0.06]">
                  {roles.map((role) => (
                    <RoleRow key={role.id} role={role} />
                  ))}
                </div>
              </motion.div>
            );
          })}
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

function RoleRow({ role }: { role: CareerRole }) {
  return (
    <Link
      to={`/careers/${role.slug}`}
      className="group flex flex-col gap-3 py-7 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-8"
    >
      <div className="min-w-0 flex-1">
        <h2 className="text-lg font-light tracking-tight text-white transition-colors group-hover:text-violet-200 md:text-xl">
          {role.title}
        </h2>
        {role.summary ? (
          <p className="mt-2 max-w-xl text-sm font-light leading-6 text-zinc-500">
            {role.summary}
          </p>
        ) : null}
      </div>
      <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-light text-zinc-500 transition-colors group-hover:text-white">
        View role
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export default Careers;
