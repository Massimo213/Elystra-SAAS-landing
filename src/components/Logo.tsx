/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */

/**
 * Assets
 */
import { favicon } from '@/assets';
import { logo } from '@/assets';

type LogoProps = {
  variant?: 'default' | 'icon';
};

const Logo = ({ variant = "icon" }: LogoProps) => {
  return (
    <a
      href=''
      className=''
    >
      {variant === 'icon' && (
        <img
          src={logo}
          alt='Elystra'
          width={150}
          height={111}
        />
      )}

    </a>
  );
};

export default Logo;
