import { Link, Navigate, useParams } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import MarketingPageLayout from '@/components/MarketingPageLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/pages/PageHero';
import { getProductModule } from '@/data/product';
import { webPageSchema } from '@/lib/seo/schemas';

const ProductModulePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const module = slug ? getProductModule(slug) : undefined;

  if (!module) {
    return <Navigate to="/product" replace />;
  }

  return (
    <MarketingPageLayout>
      <SeoHead
        title={`${module.name} | Elystra Product`}
        description={`${module.headline}. ${module.description}`}
        path={`/product/${module.slug}`}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Product', path: '/product' },
          { name: module.name, path: `/product/${module.slug}` },
        ]}
        jsonLd={webPageSchema(
          `/product/${module.slug}`,
          `${module.name} | Elystra`,
          module.description,
        )}
      />

      <div className="px-6">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[
              { name: 'Home', path: '/' },
              { name: 'Product', path: '/product' },
              { name: module.name, path: `/product/${module.slug}` },
            ]}
          />
        </div>
      </div>

      <PageHero eyebrow={module.eyebrow} title={module.name} description={module.headline} />

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-base font-light leading-relaxed text-zinc-400">{module.description}</p>
          <ul className="mt-8 space-y-4">
            {module.bullets.map((bullet) => (
              <li
                key={bullet}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-sm font-light text-zinc-300"
              >
                {bullet}
              </li>
            ))}
          </ul>
          <Link
            to="/product"
            className="mt-10 inline-block text-sm text-violet-400 hover:text-violet-300"
          >
            ← All product modules
          </Link>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default ProductModulePage;
