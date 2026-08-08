import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import MarketingPageLayout from '@/components/MarketingPageLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/pages/PageHero';
import { DOC_SECTIONS } from '@/data/docs';
import { webPageSchema } from '@/lib/seo/schemas';

const DocsPage = () => (
  <MarketingPageLayout>
    <SeoHead
      title="Documentation | Elystra"
      description="Elystra documentation for agencies. Getting started, proposals, integrations, webhooks, and API reference for the proposal-to-cash rail."
      path="/docs"
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: 'Documentation', path: '/docs' },
      ]}
      jsonLd={webPageSchema(
        '/docs',
        'Documentation | Elystra',
        'Product documentation for Elystra revenue infrastructure.',
      )}
    />

    <div className="px-6">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs
          items={[{ name: 'Home', path: '/' }, { name: 'Documentation', path: '/docs' }]}
        />
      </div>
    </div>

    <PageHero
      eyebrow="Documentation"
      title="Elystra Docs"
      description="Guides for setting up, sending proposals, wiring integrations, and using the API."
    />

    <section className="px-6 pb-20">
      <div className="mx-auto max-w-4xl space-y-4">
        {DOC_SECTIONS.map((section) => (
          <Link
            key={section.slug}
            to={`/docs/${section.slug}`}
            className="group flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] px-6 py-5 transition-colors hover:border-violet-500/30"
          >
            <div>
              <h2 className="text-lg font-light text-white">{section.title}</h2>
              <p className="mt-1 text-sm font-light text-zinc-400">{section.description}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:text-violet-400" />
          </Link>
        ))}

        <Link
          to="/docs/api"
          className="group flex items-center justify-between rounded-xl border border-violet-500/20 bg-violet-500/5 px-6 py-5"
        >
          <div>
            <h2 className="text-lg font-light text-white">API Reference</h2>
            <p className="mt-1 text-sm font-light text-zinc-400">
              REST API for proposals, deals, and webhooks.
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-violet-400 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  </MarketingPageLayout>
);

export default DocsPage;
