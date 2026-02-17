/**
 * Header.tsx
 * ELYSTRA — Premium infrastructure navbar.
 * Scroll-aware: transparent at top, glass on scroll.
 * Brand presence + single dominant CTA.
 */

import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '@/assets/LogoElystra.png';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, X, Menu } from 'lucide-react';
import { navMenu } from '@/constants';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection observer for active section highlighting
  useEffect(() => {
    if (location.pathname !== '/') return;
    const ids = navMenu.map(m => m.href.replace('#', '')).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(0, 0, 0, 0.85)'
            : 'transparent',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid transparent',
        }}
      >
        {/* Subtle glow line at bottom when scrolled */}
        {scrolled && (
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{
              background: 'linear-gradient(90deg, transparent 10%, rgba(139,92,246,0.4) 50%, transparent 90%)',
            }}
          />
        )}

        <nav className="max-w-7xl mx-auto px-6 h-16 md:h-[72px] flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative">
              <img
                src={Logo}
                alt="Elystra"
                className="h-9 w-9 md:h-10 md:w-10 transition-transform duration-300 group-hover:scale-105"
              />
              {/* Subtle glow behind logo */}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{
                  background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
                  transform: 'scale(2)',
                }}
              />
            </div>
            <span
              className="text-lg font-light tracking-tight hidden sm:block"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Elystra
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navMenu.map(({ href, label }) => {
              const isActive = activeSection === href.replace('#', '');
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className="relative px-4 py-2 text-sm font-light transition-colors duration-300"
                  style={{
                    color: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.45)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.8)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.45)';
                  }}
                >
                  {label}
                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-violet-400"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Sign In — desktop only */}
            <Link
              to="/sign-in"
              className="hidden lg:block text-sm font-light text-zinc-500 hover:text-white transition-colors duration-300"
            >
              Sign In
            </Link>

            {/* CTA */}
            <a
              href="https://calendly.com/onboarding-elystra/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative flex items-center gap-2.5 px-6 py-2.5 rounded-full text-white text-sm font-light overflow-hidden cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 50%, #a855f7 100%)',
                  boxShadow: scrolled
                    ? '0 0 30px rgba(139,92,246,0.3), inset 0 1px 0 rgba(255,255,255,0.15)'
                    : '0 0 50px rgba(139,92,246,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
                }}
              >
                {/* Shine sweep on hover */}
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{
                    background: 'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.15) 50%, transparent 80%)',
                  }}
                />
                {/* Top edge highlight */}
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px]"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
                  }}
                />
                <Sparkles className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10 tracking-wide">Book Demo</span>
                <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" />
              </motion.button>
            </a>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu — full screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[45] lg:hidden"
            style={{ background: 'rgba(0,0,0,0.95)' }}
          >
            <nav className="flex flex-col items-center justify-center h-full gap-2 px-8">
              {navMenu.map(({ href, label }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="text-2xl font-light text-zinc-300 hover:text-white transition-colors py-3 tracking-wide"
                >
                  {label}
                </motion.a>
              ))}

              {/* Divider */}
              <div className="w-12 h-[1px] bg-white/10 my-4" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: navMenu.length * 0.06, duration: 0.4 }}
              >
                <Link
                  to="/sign-in"
                  className="text-sm text-zinc-500 hover:text-white transition-colors mb-6 block"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign In
                </Link>
              </motion.div>

              <motion.a
                href="https://calendly.com/onboarding-elystra/30min"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: (navMenu.length + 1) * 0.06, duration: 0.4 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-light text-base mt-2"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)',
                  boxShadow: '0 0 40px rgba(139,92,246,0.35)',
                }}
              >
                <Sparkles className="w-4 h-4" />
                <span>Book a 7-Minute Demo</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
