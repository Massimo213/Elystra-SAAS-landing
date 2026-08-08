import { Link } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import MarketingPageLayout from '@/components/MarketingPageLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/pages/PageHero';
import { INTEGRATIONS } from '@/data/entity-pages';
import { webPageSchema } from '@/lib/seo/schemas';

const IntegrationsPage = () => (
  <MarketingPageLayout>
    <SeoHead
      title="Integrations | Elystra"
      description="Elystra integrations: Stripe, HubSpot, Slack, Google Workspace, ClickUp, Asana, Notion, Zapier, and more. Connect your agency stack to the proposal-to-cash rail."
      path="/integrations"
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: 'Integrations', path: '/integrations' },
      ]}
      jsonLd={webPageSchema(
        '/integrations',
        'Integrations | Elystra',
        'Connect Elystra to your agency stack.',
      )}
    />

    <div className="px-6">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs
          items={[{ name: 'Home', path: '/' }, { name: 'Integrations', path: '/integrations' }]}
        />
      </div>
    </div>

    <PageHero
      eyebrow="Integrations"
      title="Your stack, wired to the rail"
      description="Elystra connects to the tools agencies already run — payments, CRM, PM, docs, and finance. One close triggers the rest."
    />

    <section className="px-6 pb-20">
      <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {INTEGRATIONS.map((integration) => (
          <div
            key={integration.name}
            className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4"
          >
            <p className="text-sm font-light text-white">{integration.name}</p>
            <p className="mt-1 text-xs text-zinc-500">{integration.category}</p>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-2xl text-center text-sm font-light text-zinc-500">
        Need a custom integration?{' '}
        <Link to="/contact" className="text-violet-400 hover:text-violet-300">
          Contact us
        </Link>{' '}
        or see{' '}
        <Link to="/docs/integrations" className="text-violet-400 hover:text-violet-300">
          integration setup docs
        </Link>
        .
      </p>
    </section>
  </MarketingPageLayout>
);

export default IntegrationsPage;
