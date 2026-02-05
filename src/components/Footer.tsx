/**
 * Footer.tsx
 * ELYSTRA — PREMIUM TIER
 * Minimal, sophisticated footer
 */

import { motion } from 'framer-motion';
import { footerData } from '@/constants';
import { Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-16 md:py-20 overflow-hidden bg-transparent border-t border-white/[0.04]">
      {/* Subtle background glow - Static */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.05) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <a href="#" className="inline-flex items-center gap-2 mb-4">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(168, 85, 247, 0.1) 100%)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                }}
              >
                <Sparkles className="w-4 h-4 text-violet-400" />
              </div>
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
            </a>
            <p className="text-sm text-zinc-500 font-light max-w-xs">
              The proposal-to-cash rail. Send. Sign. Deposit. Same call.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-3"
          >
            {footerData.links.map(({ title, items }, index) => (
              <ul key={index}>
                <p className="text-xs tracking-[0.15em] uppercase text-zinc-500 mb-4">
                  {title}
                </p>
                {items.map(({ href, label }, itemIndex) => (
                  <li key={itemIndex}>
                    <motion.a
                      href={href}
                      className="inline-block py-1.5 text-sm text-zinc-400 font-light 
                               hover:text-white transition-colors duration-200"
                      whileHover={{ x: 2 }}
                    >
                      {label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            ))}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between mt-16 pt-8 
                     border-t border-white/[0.04] gap-4"
        >
          <p className="text-xs text-zinc-600 font-light">
            {footerData.copyright}
          </p>

          <div className="flex items-center gap-4">
            {footerData.socialLinks.map(({ href, icon }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center
                         bg-white/[0.02] border border-white/[0.06]
                         hover:bg-violet-500/10 hover:border-violet-500/20
                         transition-all duration-300 text-zinc-500 hover:text-violet-400"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
