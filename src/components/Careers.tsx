import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Briefcase, Layers, Rocket, Shield, Target, Workflow } from 'lucide-react';

import Logo from '@/components/Logo';

type Role = {
  title: string;
  team: string;
  mission: string;
  icon: typeof Workflow;
};

const roles: Role[] = [
  {
    title: 'Founding Product Engineer — Proposal Engine',
    team: 'Product Engineering',
    mission:
      'Own the core scope-to-proposal generation rail so agencies ship high-quality proposals in minutes, not days.',
    icon: Layers,
  },
  {
    title: 'Senior Full-Stack Engineer — Integrations Rail',
    team: 'Platform Engineering',
    mission:
      'Build and harden CRM, payments, and PM integrations that make close events trigger downstream operations automatically.',
    icon: Workflow,
  },
  {
    title: 'AI Systems Engineer — Deal Intelligence',
    team: 'Applied Intelligence',
    mission:
      'Ship behavioral scoring and follow-up ranking systems that identify the highest-probability deals and next actions.',
    icon: Target,
  },
  {
    title: 'Revenue Systems Operator',
    team: 'Commercial Operations',
    mission:
      'Design repeatable demo-to-close processes, instrumentation, and handoff standards that compress time-to-cash.',
    icon: Rocket,
  },
  {
    title: 'Enterprise Implementation Lead',
    team: 'Client Infrastructure',
    mission:
      'Own high-stakes onboarding for larger agencies and make Elystra the operational backbone across their sales stack.',
    icon: Briefcase,
  },
  {
    title: 'Security & Reliability Engineer',
    team: 'Infrastructure',
    mission:
      'Fortify uptime, auditability, and data controls so agencies can route proposal, signature, and payment workflows with confidence.',
    icon: Shield,
  },
];

const Careers = () => {
  return (
    <div className="min-h-screen relative isolate overflow-hidden bg-black">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-900" />
        <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-fuchsia-600/20 via-rose-600/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-orange-600/15 via-pink-600/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[300px] bg-gradient-to-t from-fuchsia-500/10 via-rose-500/5 to-transparent blur-3xl" />

        <motion.div
          className="absolute top-28 left-1/3 w-[900px] h-[500px] bg-gradient-to-br from-fuchsia-400/5 via-rose-400/8 to-orange-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -40, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay">
          <svg className="w-full h-full">
            <filter id="noise-careers">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise-careers)" />
          </svg>
        </div>

        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/60" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="w-full py-6 px-6">
          <Link to="/" className="inline-block">
            <Logo />
          </Link>
        </header>

        <main className="flex-1 px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
            >
              <div className="max-w-3xl mb-10 md:mb-12">
                <p className="text-xs tracking-[0.2em] uppercase text-zinc-400 mb-4">Careers</p>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 via-rose-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Build the Revenue Operating System
                </h1>
                <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
                  Elystra turns verbal intent into signed contracts, collected money, and triggered operations. These roles
                  are for builders who want to own critical rails, not cosmetic surface work.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {roles.map((role, index) => {
                  const Icon = role.icon;
                  return (
                    <motion.article
                      key={role.title}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.06 }}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-400/20 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-violet-300" />
                      </div>
                      <p className="text-xs uppercase tracking-wide text-zinc-500 mb-2">{role.team}</p>
                      <h2 className="text-lg text-white font-semibold leading-snug mb-3">{role.title}</h2>
                      <p className="text-sm text-zinc-300 leading-relaxed">{role.mission}</p>
                    </motion.article>
                  );
                })}
              </div>

              <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-zinc-400 text-sm">No vanity titles. Only ownership of critical systems.</p>
                <a
                  href="mailto:careers@elystra.online?subject=Elystra%20Careers%20-%20Application"
                  className="inline-flex items-center gap-2 text-sm font-medium text-orange-300 hover:text-orange-200 transition-colors"
                >
                  Apply via email
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </main>

        <footer className="py-6 text-center text-slate-500 text-sm">
          <p>© 2025 Elystra. Built with precision.</p>
        </footer>
      </div>
    </div>
  );
};

export default Careers;
