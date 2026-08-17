import { motion } from 'framer-motion';
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

export type IntegrationTile = {
  icon: { title: string; path: string; hex: string };
  bg: string;
};

export const INTEGRATION_TILES: IntegrationTile[] = [
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

const LogoTile = ({ tile, compact }: { tile: IntegrationTile; compact?: boolean }) => (
  <div
    className={
      compact
        ? 'flex aspect-square items-center justify-center rounded-[1.15rem] border border-white/[0.08] p-2'
        : 'flex h-[88px] w-[88px] items-center justify-center rounded-[1.35rem] border border-white/[0.08] p-2'
    }
    style={{
      background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 14px 28px rgba(0,0,0,0.24)',
    }}
  >
    <div
      className={
        compact
          ? 'flex h-[76%] w-[76%] items-center justify-center rounded-[0.95rem] p-2'
          : 'flex h-full w-full items-center justify-center rounded-[1.05rem] p-3'
      }
      style={{
        backgroundColor: tile.bg,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.58), 0 10px 24px rgba(0,0,0,0.24)',
      }}
    >
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-label={tile.icon.title}
        className={compact ? 'h-8 w-8' : 'h-9 w-9'}
        style={{ color: tile.bg === '#111111' ? '#ffffff' : `#${tile.icon.hex}` }}
      >
        <title>{tile.icon.title}</title>
        <path d={tile.icon.path} fill="currentColor" />
      </svg>
    </div>
  </div>
);

type IntegrationLogoGridProps = {
  variant?: 'desktop' | 'mobile';
};

const IntegrationLogoGrid = ({ variant = 'desktop' }: IntegrationLogoGridProps) => {
  const compact = variant === 'mobile';

  return (
    <div className={compact ? 'grid grid-cols-4 gap-3 sm:grid-cols-5' : 'grid grid-cols-6 gap-4 md:grid-cols-8'}>
      {INTEGRATION_TILES.map((tile, index) => (
        <motion.div
          key={`${tile.icon.title}-${variant}`}
          animate={{ y: [0, index % 2 === 0 ? -3 : 3, 0] }}
          transition={{
            duration: 7 + (index % 6) * 0.25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: (index % 7) * 0.08,
          }}
        >
          <LogoTile tile={tile} compact={compact} />
        </motion.div>
      ))}
    </div>
  );
};

export default IntegrationLogoGrid;
