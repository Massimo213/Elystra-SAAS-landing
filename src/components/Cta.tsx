import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import IntegrationLogoGrid from '@/components/integrations/IntegrationLogoGrid';
import { useDemoBooking } from '@/contexts/DemoBookingContext';

const Cta = () => {
  const { openDemoBooking } = useDemoBooking();

  return (
    <section className="relative overflow-hidden bg-transparent py-28 md:py-36">
      <div className="relative z-10 mx-auto max-w-[1320px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75 }}
          className="relative overflow-hidden"
        >
          <div className="relative min-h-[44rem] md:min-h-[48rem]">
            <div className="absolute -right-16 bottom-14 z-0 hidden lg:block">
              <IntegrationLogoGrid variant="desktop" />
            </div>

            <div className="absolute inset-y-0 left-0 z-10 hidden w-[58%] bg-gradient-to-r from-black/90 via-black/62 to-transparent lg:block" />
            <div className="absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-black/82 via-black/48 to-transparent" />

            <div className="relative z-20 min-h-[44rem] px-8 py-10 md:px-12 md:py-12">
              <div className="max-w-[37rem] lg:pt-6">
                <span className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-[0.72rem] uppercase tracking-[0.28em] text-zinc-300/78">
                  Adoption without friction
                </span>
                <h2 className="mt-7 max-w-[31rem] text-5xl font-extralight tracking-[-0.05em] text-white md:text-7xl">
                  Applications for{' '}
                  <span className="bg-gradient-to-r from-violet-200 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
                    everything else.
                  </span>
                </h2>
                <p className="mt-8 max-w-[31rem] text-xl font-light leading-9 text-zinc-300/90 md:text-[2rem] md:leading-[1.35]">
                  Elystra integrates with{' '}
                  <span className="bg-gradient-to-r from-violet-200 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
                    100+ tools
                  </span>{' '}
                  so your agency can keep the systems{' '}
                  <span className="bg-gradient-to-r from-violet-200 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
                    it already runs on.
                  </span>
                </p>
                <p className="mt-6 max-w-[28rem] text-base leading-7 text-zinc-400">
                  CRM, docs, billing, project management, automation, follow-up. The rail fits the stack instead of forcing a rebuild.
                </p>
              </div>

              <div className="relative mt-12 min-h-[20rem] lg:hidden">
                <IntegrationLogoGrid variant="mobile" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, delay: 0.08 }}
          className="mt-10 rounded-[2rem] border border-white/[0.08] bg-white/[0.03] px-6 py-6"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[0.75rem] uppercase tracking-[0.3em] text-violet-200/90">
                Connected from day one
              </p>
              <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
                No rebuild. No long migration. No workflow shock.
              </p>
            </div>

            <div className="shrink-0">
              <motion.button
                type="button"
                onClick={() => openDemoBooking()}
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-9 py-5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(124,58,237,1) 0%, rgba(147,51,234,1) 55%, rgba(99,102,241,1) 100%)',
                    boxShadow: '0 22px 70px rgba(139,92,246,0.28)',
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      'linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.1) 50%, transparent 65%)',
                  }}
                />
                <div className="relative z-10 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                    <Sparkles className="h-4.5 w-4.5" />
                  </span>
                  <span className="text-left">
                    <span className="block text-[0.7rem] uppercase tracking-[0.22em] text-white/72">
                      See the rail in your stack
                    </span>
                    <span className="block text-lg font-medium text-white">Book a 7-Minute Demo</span>
                  </span>
                  <ArrowRight className="h-5 w-5 text-white transition-transform group-hover:translate-x-1" />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Cta;
