import { Link } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import MarketingPageLayout from '@/components/MarketingPageLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/pages/PageHero';
import { webPageSchema } from '@/lib/seo/schemas';

const SECURITY_ITEMS = [
  {
    title: 'Data encryption',
    body: 'All data encrypted in transit (TLS 1.2+) and at rest (AES-256).',
  },
  {
    title: 'Access controls',
    body: 'Role-based access, SSO available on Enterprise. Audit logs for admin actions.',
  },
  {
    title: 'Compliance',
    body: 'SOC 2 Type II in progress. GDPR and CCPA compliant data handling.',
  },
  {
    title: 'Payment security',
    body: 'Payment processing via Stripe. Elystra never stores card data.',
  },
  {
    title: 'Infrastructure',
    body: 'Hosted on Vercel and Supabase with regional redundancy and automated backups.',
  },
  {
    title: 'Incident response',
    body: 'Documented incident response procedure. Security contact: security@elystra.online',
  },
];

const SecurityPage = () => (
  <MarketingPageLayout>
    <SeoHead
      title="Security | Elystra"
      description="Elystra security: encryption, access controls, SOC 2, GDPR compliance, and secure payment processing for agency revenue infrastructure."
      path="/security"
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: 'Security', path: '/security' },
      ]}
      jsonLd={webPageSchema(
        '/security',
        'Security | Elystra',
        'Security practices for Elystra revenue infrastructure.',
      )}
    />

    <div className="px-6">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs
          items={[{ name: 'Home', path: '/' }, { name: 'Security', path: '/security' }]}
        />
      </div>
    </div>

    <PageHero
      eyebrow="Trust"
      title="Security at Elystra"
      description="Agency revenue data deserves enterprise-grade protection. Here is how Elystra handles it."
    />

    <section className="px-6 pb-20">
      <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
        {SECURITY_ITEMS.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6"
          >
            <h2 className="text-base font-light text-white">{item.title}</h2>
            <p className="mt-2 text-sm font-light leading-relaxed text-zinc-400">{item.body}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-6">
        {['soc2-type2', 'gdpr', 'ccpa', 'iso27001'].map((badge) => (
          <img
            key={badge}
            src={`/badges/${badge}.svg`}
            alt={`${badge} compliance badge`}
            className="h-16 opacity-70"
          />
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-zinc-500">
        Security questions?{' '}
        <a href="mailto:security@elystra.online" className="text-violet-400 hover:text-violet-300">
          security@elystra.online
        </a>
        {' · '}
        <Link to="/privacy" className="text-violet-400 hover:text-violet-300">
          Privacy Policy
        </Link>
      </p>
    </section>
  </MarketingPageLayout>
);

export default SecurityPage;
