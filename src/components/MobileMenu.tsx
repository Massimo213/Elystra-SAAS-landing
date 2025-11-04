/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */

/**
 * Components
 */
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

/**
 * Assets
 */
import { ChevronsUpDown } from 'lucide-react';

/**
 * Types
 */
import { MenuItem } from '@/types';

type MobileMenuProps = {
  navMenu: MenuItem[];
};

const MobileMenu = ({ navMenu }: MobileMenuProps) => {
  return (
    <div>
      <ul className='mb-3'>
        {navMenu.map(({ href, label, submenu }, index) => (
          <li key={index}>
            {submenu ? (
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button
                    variant='ghost'
                    className='w-full justify-between'
                  >
                    {label}
                    <ChevronsUpDown />
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent className='ps-2'>
                  <ul className='border-l border-l-muted-foreground/20'>
                    {submenu.map(({ href, label }, index) => (
                      <li key={index}>
                        <Button
                          asChild
                          variant='ghost'
                          className='w-full justify-start text-muted-foreground hover:bg-transparent'
                        >
                          {href.startsWith('/') ? (
                            <Link to={href}>{label}</Link>
                          ) : (
                            <a href={href}>{label}</a>
                          )}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Button
                asChild
                variant='ghost'
                className='w-full justify-start'
              >
                {href.startsWith('/') ? (
                  <Link to={href}>{label}</Link>
                ) : (
                  <a href={href}>{label}</a>
                )}
              </Button>
            )}
          </li>
        ))}
      </ul>

      <Separator className='bg-muted-foreground/20' />

      <div className='flex items-center gap-2 mt-4'>
        <Link to="/privacy">
          <Button variant="ghost" className="w-full">
            Privacy
          </Button>
        </Link>
        <Link to="/sign-in">
          <Button variant='ghost' className='w-full'>
            Sign In
          </Button>
        </Link>
        <Link to='/get-started'>
          <Button className='w-full'>Get Started</Button>
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
