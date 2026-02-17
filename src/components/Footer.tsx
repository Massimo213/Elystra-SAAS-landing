/**
 * Footer.tsx
 * Minimal. Brand + legal. Nothing fake.
 */

import { Link } from 'react-router-dom';
import Logo from '@/assets/LogoElystra.png';

const Footer = () => {
  return (
    <footer className="relative py-12 md:py-16 overflow-hidden bg-transparent border-t border-white/[0.04]">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Elystra" className="h-8 w-8" />
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
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link 
              to="/privacy" 
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-light"
            >
              Privacy Policy
            </Link>
            <a 
              href="mailto:support@elystra.online" 
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-light"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-white/[0.04] text-center">
          <p className="text-xs text-zinc-600 font-light">
            © {new Date().getFullYear()} Elystra. Proposal-to-cash infrastructure for agencies.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
