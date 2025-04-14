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
import Logo from '@/components/Logo';
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
          <Logo variant='icon' />
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
        <div className='flex items-center gap-2 justify-end max-lg:hidden'>
          <a href='https://my.elystra.online/sign-up'>
            <Button variant='ghost'>Sign In</Button>
          </a>
          <a href='https://my.elystra.online/sign-up'>
            <Button>Get Started</Button>
          </a>
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
