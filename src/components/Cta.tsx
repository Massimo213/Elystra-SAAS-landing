import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import {
  siAirtable,
  siAsana,
  siCalendly,
  siClickup,
  siDropbox,
  siFigma,
  siGithub,
  siGmail,
  siGooglecalendar,
  siGoogledocs,
  siGoogledrive,
  siHubspot,
  siIntercom,
  siLinear,
  siMailchimp,
  siNotion,
  siQuickbooks,
  siStripe,
  siTodoist,
  siTrello,
  siTypeform,
  siXero,
  siZapier,
  siZoom,
} from 'simple-icons';
import { useDemoBooking } from '@/contexts/DemoBookingContext';

type IntegrationTile = {
  icon: {
    title: string;
    path: string;
    hex: string;
  };
  bg: string;
};

const tiles: IntegrationTile[] = [
  { icon: siHubspot, bg: '#fff3ed' },
  { icon: siStripe, bg: '#f3f1ff' },
  { icon: siGoogledrive, bg: '#f2f8ff' },
  { icon: siNotion, bg: '#ffffff' },
  { icon: siClickup, bg: '#f5f0ff' },
  { icon: siXero, bg: '#eefcff' },
  { icon: siZapier, bg: '#fff3ea' },
  { icon: siAsana, bg: '#fff0f0' },
  { icon: siAirtable, bg: '#ffffff' },
  { icon: siGoogledocs, bg: '#eef5ff' },
  { icon: siGooglecalendar, bg: '#eef5ff' },
  { icon: siQuickbooks, bg: '#f0fbf3' },
  { icon: siZoom, bg: '#eef5ff' },
  { icon: siGmail, bg: '#ffffff' },
  { icon: siLinear, bg: '#111111' },
  { icon: siTrello, bg: '#eef7ff' },
  { icon: siTodoist, bg: '#fff1ed' },
  { icon: siCalendly, bg: '#eef7ff' },
  { icon: siTypeform, bg: '#f6f2ef' },
  { icon: siIntercom, bg: '#eef5ff' },
  { icon: siDropbox, bg: '#eef5ff' },
  { icon: siGithub, bg: '#ffffff' },
  { icon: siFigma, bg: '#fff4f1' },
  { icon: siMailchimp, bg: '#fff8dc' },
];

const logoField = tiles;

const LogoTile = ({
  tile,
  outerClassName,
  innerClassName,
  imageClassName,
}: {
  tile: IntegrationTile;
  outerClassName: string;
  innerClassName: string;
  imageClassName: string;
}) => (
  <div
    className={outerClassName}
    style={{
      background: `linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)`,
      boxShadow:
        'inset 0 1px 0 rgba(255,255,255,0.05), 0 14px 28px rgba(0,0,0,0.24)',
    }}
  >
    <div
      className={innerClassName}
      style={{
        backgroundColor: tile.bg,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.58), 0 10px 24px rgba(0,0,0,0.24)',
      }}
    >
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-label={tile.icon.title}
        className={imageClassName}
        style={{ color: tile.bg === '#111111' ? '#ffffff' : `#${tile.icon.hex}` }}
      >
        <title>{tile.icon.title}</title>
        <path d={tile.icon.path} fill="currentColor" />
      </svg>
    </div>
  </div>
);

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
              <div className="grid grid-cols-8 gap-4">
                {logoField.map((tile, index) => (
                  <motion.div
                    key={`${tile.icon.title}-field-${index}`}
                    animate={{ y: [0, index % 2 === 0 ? -3 : 3, 0] }}
                    transition={{
                      duration: 7 + (index % 6) * 0.25,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: (index % 7) * 0.08,
                    }}
                  >
                    <LogoTile
                      tile={tile}
                      outerClassName="flex h-[88px] w-[88px] items-center justify-center rounded-[1.35rem] border border-white/8 p-2"
                      innerClassName="flex h-full w-full items-center justify-center rounded-[1.05rem] p-3"
                      imageClassName="h-9 w-9 object-contain"
                    />
                  </motion.div>
                ))}
              </div>
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
                <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
                  {logoField.map((tile, index) => (
                    <motion.div
                      key={`${tile.icon.title}-mobile-${index}`}
                      animate={{ y: [0, index % 2 === 0 ? -4 : 4, 0] }}
                      transition={{
                        duration: 5.2 + (index % 5) * 0.24,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: (index % 6) * 0.06,
                      }}
                    >
                      <LogoTile
                        tile={tile}
                        outerClassName="flex aspect-square items-center justify-center rounded-[1.15rem] border border-white/8 p-2"
                        innerClassName="flex h-[76%] w-[76%] items-center justify-center rounded-[0.95rem] p-2"
                        imageClassName="h-8 w-8 object-contain"
                      />
                    </motion.div>
                  ))}
                </div>
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
                onClick={openDemoBooking}
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
