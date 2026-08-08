import { Link } from 'react-router-dom';
import type { BreadcrumbItem } from '@/lib/seo/constants';

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
  <nav aria-label="Breadcrumb" className="mb-8">
    <ol className="flex flex-wrap items-center gap-2 text-sm font-light text-zinc-500">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <li key={item.path} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {isLast ? (
              <span className="text-zinc-400">{item.name}</span>
            ) : (
              <Link to={item.path} className="transition-colors hover:text-zinc-300">
                {item.name}
              </Link>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;
