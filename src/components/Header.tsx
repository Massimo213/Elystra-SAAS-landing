/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */

/**
 * Components
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
import { motion } from 'motion/react';

/**
 * Assets
 */
import { Menu } from 'lucide-react';

/**
 * Constants
 */
import { navMenu } from '@/constants';

const Header = () => {
  return (
    <header className='h-16 grid grid-cols-1 items-center md:h-20 lg:h-24'>
      <div className='container flex justify-between lg:grid lg:grid-cols-[1fr,3fr,1fr]'>
        <Link to="/">
          <img src={Logo} alt="Elystra Logo" className='h-24 w-24' />
        </Link>

        <NavigationMenu className='max-lg:hidden mx-auto'>
          <NavigationMenuList>
            {navMenu.map(({ href, label, submenu }, index) => (
              <NavigationMenuItem key={index}>
                {submenu ? (
                  <>
                    <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className='grid grid-cols-2 gap-2 p-2 w-[640px]'>
                        {submenu.map(({ href, icon, label, desc }, index) => (
                          <li key={index}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={href}
                                className='flex gap-3 select-none p-2 rounded-sm transition-colors hover:bg-foreground/5'
                              >
                                <div className='w-10 h-10 bg-foreground/10 rounded-sm shadow-sm border-t border-foreground/5 flex-shrink-0 grid place-items-center'>
                                  {icon}
                                </div>
                                <div>
                                  <div className='text-[13px] leading-normal mb-1'>
                                    {label}
                                  </div>
                                  <p className='text-[13px] leading-normal text-muted-foreground'>
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
                        className={navigationMenuTriggerStyle()}
                      >
                        {label}
                      </Link>
                    ) : (
                      <a
                        href={href}
                        className={navigationMenuTriggerStyle()}
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
        <div className='flex items-center gap-3 justify-end max-lg:hidden'>
          <a href='https://app.elystra.online/sign-up'>
            <Button variant='ghost' className='hover:bg-white/5'>Sign In</Button>
          </a>
          <Link to='/get-started'>
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Ambient glow */}
              <motion.div
                className="absolute -inset-1 rounded-[20px] opacity-50"
                style={{
                  background: 'linear-gradient(135deg, rgba(251,146,60,0.5), rgba(244,63,94,0.5))',
                  filter: 'blur(16px)',
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              <button
                className="relative px-6 py-2.5 rounded-[18px] font-semibold text-[15px] text-white border-0 overflow-hidden transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #fb923c 0%, #f43f5e 100%)',
                  boxShadow: `
                    0 1px 2px rgba(0, 0, 0, 0.1),
                    0 2px 6px rgba(251, 146, 60, 0.25),
                    0 4px 12px rgba(244, 63, 94, 0.15),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                  `,
                }}
              >
                {/* Glass shine */}
                <span
                  className="absolute inset-0 rounded-[18px]"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
                  }}
                />
                
                {/* Shimmer effect */}
                <motion.span
                  className="absolute inset-0 rounded-[18px]"
                  style={{
                    background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)',
                  }}
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 0.8,
                  }}
                />
                
                {/* Hover glow */}
                <span
                  className="absolute inset-0 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%)',
                  }}
                />
                
                <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                  Get Started
                </span>
              </button>
            </motion.div>
          </Link>
        </div>

        <Popover>
          <PopoverTrigger asChild className='lg:hidden'>
            <Button variant='ghost' size='icon'>
              <Menu className='h-5 w-5' />
            </Button>
          </PopoverTrigger>

          <PopoverContent className='w-80'>
            <MobileMenu navMenu={navMenu} />
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
