import { Link } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import MarketingPageLayout from '@/components/MarketingPageLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/pages/PageHero';
import { API_ENDPOINTS } from '@/data/docs';
import { webPageSchema } from '@/lib/seo/schemas';

const ApiDocsPage = () => (
  <MarketingPageLayout>
    <SeoHead
      title="API Reference | Elystra"
      description="Elystra API documentation. REST endpoints for proposals, deals, webhooks, and agency revenue infrastructure integration."
      path="/docs/api"
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: 'Documentation', path: '/docs' },
        { name: 'API Reference', path: '/docs/api' },
      ]}
      jsonLd={webPageSchema(
        '/docs/api',
        'API Reference | Elystra',
        'REST API for Elystra proposal-to-cash infrastructure.',
      )}
    />

    <div className="px-6">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Documentation', path: '/docs' },
            { name: 'API Reference', path: '/docs/api' },
          ]}
        />
      </div>
    </div>

    <PageHero
      eyebrow="API"
      title="Elystra API"
      description="Programmatic access to proposals, deal intelligence, and webhook events. Base URL: https://api.elystra.online/v1"
    />

    <section className="px-6 pb-20">
      <div className="mx-auto max-w-4xl space-y-3">
        {API_ENDPOINTS.map((endpoint) => (
          <div
            key={endpoint.path}
            className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-6 py-4 font-mono text-sm"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded bg-violet-500/20 px-2 py-0.5 text-xs text-violet-300">
                {endpoint.method}
              </span>
              <span className="text-zinc-300">{endpoint.path}</span>
            </div>
            <p className="mt-2 font-sans text-sm font-light text-zinc-400">{endpoint.description}</p>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-2xl text-center text-sm font-light text-zinc-500">
        API access included on Scale and Enterprise plans.{' '}
        <Link to="/contact" className="text-violet-400 hover:text-violet-300">
          Request API keys
        </Link>
        .
      </p>
    </section>
  </MarketingPageLayout>
);

export default ApiDocsPage;
