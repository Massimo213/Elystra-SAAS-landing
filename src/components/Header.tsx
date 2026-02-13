/**
 * Header.tsx
 * ELYSTRA — PREMIUM TIER
 * Sophisticated glass navigation header
 */

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Logo from '@/assets/LogoElystra.png';
import MobileMenu from '@/components/MobileMenu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { motion } from 'framer-motion';
import { Menu, Sparkles, ArrowRight } from 'lucide-react';
import { navMenu } from '@/constants';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Solid background - no blur for performance */}
      <div 
        className="absolute inset-0 bg-black/90"
      />
      
      {/* Bottom border */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
        }}
      />

      <div className="relative h-16 md:h-20 flex items-center">
        <div className="container flex justify-between items-center lg:grid lg:grid-cols-[1fr,3fr,1fr]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={Logo} 
              alt="Elystra" 
              className="h-10 w-10 md:h-12 md:w-12" 
            />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="max-lg:hidden mx-auto">
            <NavigationMenuList className="gap-1">
              {navMenu.map(({ href, label, submenu }, index) => (
                <NavigationMenuItem key={index}>
                  {submenu ? (
                    <>
                      <NavigationMenuTrigger 
                        className="bg-transparent hover:bg-white/[0.03] data-[state=open]:bg-white/[0.03]
                                 text-zinc-400 hover:text-white data-[state=open]:text-white
                                 font-light text-sm"
                      >
                        {label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul 
                          className="grid grid-cols-2 gap-2 p-3 w-[600px]"
                          style={{
                            background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(10,10,20,0.95) 100%)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '16px',
                          }}
                        >
                          {submenu.map(({ href, icon, label, desc }, subIndex) => (
                            <li key={subIndex}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={href}
                                  className="flex gap-3 select-none p-3 rounded-xl transition-all duration-200
                                           hover:bg-white/[0.03] group"
                                >
                                  <div 
                                    className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center
                                             transition-all duration-200 group-hover:scale-105"
                                    style={{
                                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)',
                                      border: '1px solid rgba(139, 92, 246, 0.2)',
                                    }}
                                  >
                                    <span className="text-violet-400">{icon}</span>
                                  </div>
                                  <div>
                                    <div className="text-sm text-white font-light mb-0.5 group-hover:text-white">
                                      {label}
                                    </div>
                                    <p className="text-xs text-zinc-500 font-light leading-relaxed">
                                      {desc}
                                    </p>
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      {href.startsWith('/') ? (
                        <Link
                          to={href}
                          className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-white/[0.03] 
                                    text-zinc-400 hover:text-white font-light text-sm`}
                        >
                          {label}
                        </Link>
                      ) : (
                        <a
                          href={href}
                          className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-white/[0.03] 
                                    text-zinc-400 hover:text-white font-light text-sm`}
                        >
                          {label}
                        </a>
                      )}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3 justify-end max-lg:hidden">
            <Link to="/sign-in">
              <Button 
                variant="ghost" 
                className="text-zinc-400 hover:text-white hover:bg-white/[0.03] font-light text-sm"
              >
                Sign In
              </Button>
            </Link>
            
            <a 
              href="https://calendly.com/onboarding-elystra/30min" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  className="relative px-5 py-2.5 rounded-full font-light text-sm text-white 
                           overflow-hidden transition-all duration-300 flex items-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%)',
                    backgroundSize: '200% 200%',
                    boxShadow: '0 2px 12px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
                  }}
                >
                  {/* Static shine */}
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
                    }}
                  />
                  
                  {/* Top highlight */}
                  <span 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px]"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    }}
                  />
                  
                  <Sparkles className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Book Demo</span>
                  <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </motion.div>
            </a>
          </div>

          {/* Mobile Menu */}
          <Popover>
            <PopoverTrigger asChild className="lg:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-zinc-400 hover:text-white hover:bg-white/[0.03]"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-80 p-0 border-white/[0.08]"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(10,10,20,0.95) 100%)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <MobileMenu navMenu={navMenu} />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;
