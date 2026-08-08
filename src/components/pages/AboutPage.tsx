import { Link } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import MarketingPageLayout from '@/components/MarketingPageLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/pages/PageHero';
import { organizationSchema, webPageSchema } from '@/lib/seo/schemas';

const AboutPage = () => (
  <MarketingPageLayout>
    <SeoHead
      title="About | Elystra"
      description="About Elystra — revenue infrastructure for agencies. We build the proposal-to-cash rail that closes the gap between client approval and collected payment."
      path="/about"
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ]}
      jsonLd={[
        organizationSchema(),
        webPageSchema(
          '/about',
          'About | Elystra',
          'Revenue infrastructure company building the proposal-to-cash rail for agencies.',
        ),
      ]}
    />

    <div className="px-6">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]} />
      </div>
    </div>

    <PageHero
      eyebrow="Company"
      title="Revenue infrastructure for agencies"
      description="Elystra exists to eliminate the leak between verbal yes and money in the account."
    />

    <section className="px-6 pb-20">
      <div className="mx-auto max-w-3xl space-y-6 text-sm font-light leading-relaxed text-zinc-400">
        <p>
          Elystra is a software company building the proposal-to-cash rail for marketing, creative,
          and performance agencies. We do not generate leads. We do not replace your CRM. We sit
          under your existing calls and offers and convert serious opportunities into closed, paid,
          operationalized revenue.
        </p>
        <p>
          The rail has four modules: Proposal Engine, Close Rail, Deal Intelligence, and Ops &amp;
          Client Portal. Together they compress what used to take days or weeks — scope, send, sign,
          collect, follow up, operate — into a controlled sequence agencies can run at volume.
        </p>
        <p>
          170+ agencies run through the rail. $4.6M+ closed last quarter. +23% average close-rate
          lift for agencies that adopt properly.
        </p>

        <div className="grid gap-4 pt-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
            <h2 className="text-sm font-normal text-white">What we are</h2>
            <p className="mt-2 text-sm text-zinc-400">
              B2B software — revenue operations infrastructure for professional service agencies.
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
            <h2 className="text-sm font-normal text-white">Who we serve</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Agencies doing 5+ proposals/month with $3K–$50K+ average deal size.
            </p>
          </div>
        </div>

        <p className="pt-4">
          <Link to="/careers" className="text-violet-400 hover:text-violet-300">
            Careers at Elystra
          </Link>
          {' · '}
          <Link to="/contact" className="text-violet-400 hover:text-violet-300">
            Contact
          </Link>
          {' · '}
          <Link to="/product" className="text-violet-400 hover:text-violet-300">
            Product
          </Link>
        </p>
      </div>
    </section>
  </MarketingPageLayout>
);

export default AboutPage;
