/**
 * Footer.tsx — structured entity links for branded search + sitelinks
 */

import { Link } from 'react-router-dom';
import { logo } from '@/assets';

const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Product', href: '/product' },
      { label: 'Pricing', href: 'https://app.elystra.online/pricing', external: true },
      { label: 'Integrations', href: '/integrations' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/docs/api' },
      { label: 'Help Center', href: '/help' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Security', href: '/security' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.04] bg-transparent py-12 md:py-16">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Elystra" className="h-8 w-8" />
              <span
                className="text-lg font-light tracking-wide"
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Elystra
              </span>
            </Link>
            <p className="mt-4 text-xs font-light leading-relaxed text-zinc-600">
              Revenue infrastructure for agencies.
            </p>
            <Link
              to="/login"
              className="mt-4 inline-block text-xs text-zinc-500 transition-colors hover:text-zinc-300"
            >
              Login
            </Link>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h2 className="text-xs font-normal uppercase tracking-wider text-zinc-500">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        className="text-xs font-light text-zinc-500 transition-colors hover:text-zinc-300"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-xs font-light text-zinc-500 transition-colors hover:text-zinc-300"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-white/[0.04] pt-6 md:flex-row">
          <p className="text-xs font-light text-zinc-600">
            © {new Date().getFullYear()} Elystra. Proposal-to-cash infrastructure for agencies.
          </p>
          <a
            href="https://www.aicpa.org/soc4so"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 transition-opacity hover:opacity-100"
            aria-label="AICPA SOC for Service Organizations"
          >
            <img
              src="/ACIPA.png"
              alt="AICPA SOC for Service Organizations"
              className="h-14 w-14 object-contain"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
