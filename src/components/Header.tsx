/**
 * Header.tsx
 * ELYSTRA — Premium infrastructure navbar.
 * Scroll-aware: transparent at top, glass on scroll.
 * Brand presence + single dominant CTA.
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logo } from '@/assets';
import { useDemoBooking } from '@/contexts/DemoBookingContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, X, Menu, ChevronDown } from 'lucide-react';
import { navMenu } from '@/constants';
import type { MenuItem } from '@/types';

const Header = () => {
  const { openDemoBooking } = useDemoBooking();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isExternal = (href: string) => href.startsWith('http');
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mobileLegalOpen, setMobileLegalOpen] = useState(false);

  const isNavActive = (item: MenuItem) => {
    if (item.submenu) {
      return item.submenu.some((sub) => location.pathname === sub.href);
    }
    if (isExternal(item.href)) return false;
    if (item.href === '/careers') return location.pathname.startsWith('/careers');
    if (item.href === '/docs') return location.pathname.startsWith('/docs');
    if (item.href === '/product') return location.pathname.startsWith('/product');
    return location.pathname === item.href;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenSubmenu(null);
    setMobileLegalOpen(false);
  }, [location.pathname]);

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
                src={logo}
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
            {navMenu.map((item) => {
              const { href, label, submenu } = item;
              const isActive = isNavActive(item);
              const className = 'relative px-4 py-2 text-sm font-light transition-colors duration-300';
              const style = {
                color: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.45)',
              } as const;
              const hoverProps = {
                onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
                  if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                },
                onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
                  if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                },
              };
              const activeDot = isActive && (
                <motion.span
                  layoutId="nav-dot"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-violet-400"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              );

              if (submenu) {
                const isOpen = openSubmenu === label;
                return (
                  <div
                    key={label}
                    className="relative"
                    onMouseEnter={() => setOpenSubmenu(label)}
                    onMouseLeave={() => setOpenSubmenu(null)}
                  >
                    <button
                      type="button"
                      className={`${className} inline-flex items-center gap-1`}
                      style={style}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={() => setOpenSubmenu(isOpen ? null : label)}
                    >
                      {label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      />
                      {activeDot}
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.16 }}
                          className="absolute left-0 top-full pt-2"
                        >
                          <div
                            className="min-w-[11.5rem] overflow-hidden border border-white/[0.08] py-1.5"
                            style={{ background: 'rgba(8,8,14,0.96)', boxShadow: '0 18px 40px rgba(0,0,0,0.45)' }}
                          >
                            {submenu.map((sub) => (
                              <Link
                                key={sub.href}
                                to={sub.href}
                                onClick={() => setOpenSubmenu(null)}
                                className="block px-4 py-2.5 text-sm font-light transition-colors"
                                style={{
                                  color:
                                    location.pathname === sub.href
                                      ? 'rgba(255,255,255,0.95)'
                                      : 'rgba(255,255,255,0.5)',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color =
                                    location.pathname === sub.href
                                      ? 'rgba(255,255,255,0.95)'
                                      : 'rgba(255,255,255,0.5)';
                                }}
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return isExternal(href) ? (
                <a
                  key={href}
                  href={href}
                  className={className}
                  style={style}
                  {...hoverProps}
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={href}
                  to={href}
                  className={className}
                  style={style}
                  {...hoverProps}
                >
                  {label}
                  {activeDot}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Sign In — desktop only */}
            <Link
              to="/login"
              className="hidden lg:block text-sm font-light text-zinc-500 hover:text-white transition-colors duration-300"
            >
              Sign In
            </Link>

            {/* CTA */}
            <div className="hidden lg:flex">
              <motion.button
                type="button"
                onClick={() => openDemoBooking()}
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
            </div>

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
            <nav className="flex flex-col items-center justify-center h-full gap-2 px-8 overflow-y-auto py-24">
              {navMenu.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="text-center"
                >
                  {item.submenu ? (
                    <div>
                      <button
                        type="button"
                        className="text-2xl font-light text-zinc-300 hover:text-white transition-colors py-3 tracking-wide inline-flex items-center gap-2"
                        onClick={() => setMobileLegalOpen((open) => !open)}
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${mobileLegalOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {mobileLegalOpen && (
                        <div className="mt-1 mb-2 flex flex-col gap-1">
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub.href}
                              to={sub.href}
                              onClick={() => setMobileOpen(false)}
                              className="text-lg font-light text-zinc-500 hover:text-white py-1.5"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : isExternal(item.href) ? (
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-2xl font-light text-zinc-300 hover:text-white transition-colors py-3 tracking-wide block"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-2xl font-light text-zinc-300 hover:text-white transition-colors py-3 tracking-wide block"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
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
                  to="/login"
                  className="text-sm text-zinc-500 hover:text-white transition-colors mb-6 block"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign In
                </Link>
              </motion.div>

              <motion.button
                type="button"
                onClick={() => { openDemoBooking(); setMobileOpen(false); }}
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
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
