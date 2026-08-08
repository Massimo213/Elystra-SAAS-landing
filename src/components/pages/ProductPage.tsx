import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import MarketingPageLayout from '@/components/MarketingPageLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/pages/PageHero';
import { PRODUCT_MODULES } from '@/data/product';
import { softwareApplicationSchema, webPageSchema } from '@/lib/seo/schemas';
import { useDemoBooking } from '@/contexts/DemoBookingContext';

const ProductPage = () => {
  const { openDemoBooking } = useDemoBooking();

  return (
    <MarketingPageLayout>
      <SeoHead
        title="Product | Elystra — Revenue Infrastructure for Agencies"
        description="Elystra product: Proposal Engine, Close Rail, Deal Intelligence, and Client Portal. Proposal-to-cash software for marketing and creative agencies."
        path="/product"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Product', path: '/product' },
        ]}
        jsonLd={[
          webPageSchema(
            '/product',
            'Product | Elystra',
            'Proposal-to-cash revenue infrastructure for agencies.',
          ),
          softwareApplicationSchema(),
        ]}
      />

      <div className="px-6">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Product', path: '/product' }]} />
        </div>
      </div>

      <PageHero
        eyebrow="Product"
        title="Four modules. One revenue rail."
        description="Elystra is revenue infrastructure for agencies — not a proposal editor, not a CRM, not lead-gen. The controlled sequence from scope to collected payment."
      />

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl space-y-8">
          {PRODUCT_MODULES.map((module) => (
            <article
              key={module.slug}
              id={module.slug}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-violet-400">{module.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-light text-white">{module.name}</h2>
              <p className="mt-2 text-lg font-light text-zinc-300">{module.headline}</p>
              <p className="mt-4 text-sm font-light leading-relaxed text-zinc-400">{module.description}</p>
              <ul className="mt-6 space-y-2">
                {module.bullets.map((bullet) => (
                  <li key={bullet} className="text-sm font-light text-zinc-400">
                    — {bullet}
                  </li>
                ))}
              </ul>
              <Link
                to={`/product/${module.slug}`}
                className="mt-6 inline-flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300"
              >
                Learn more
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-4xl text-center">
          <button
            type="button"
            onClick={() => openDemoBooking()}
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-8 py-3 text-sm font-light text-white hover:bg-violet-500"
          >
            See the rail live
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-4 text-sm text-zinc-500">
            <a href="https://app.elystra.online/pricing" className="text-violet-400 hover:text-violet-300">
              View pricing
            </a>
            {' · '}
            <Link to="/integrations" className="text-violet-400 hover:text-violet-300">
              Integrations
            </Link>
            {' · '}
            <Link to="/docs" className="text-violet-400 hover:text-violet-300">
              Documentation
            </Link>
          </p>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default ProductPage;
