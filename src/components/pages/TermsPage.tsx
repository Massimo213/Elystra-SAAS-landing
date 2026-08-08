import { Link } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import MarketingPageLayout from '@/components/MarketingPageLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/pages/PageHero';
import { webPageSchema } from '@/lib/seo/schemas';

const TermsPage = () => (
  <MarketingPageLayout>
    <SeoHead
      title="Terms of Service | Elystra"
      description="Elystra Terms of Service. Usage terms for Elystra revenue infrastructure software for agencies."
      path="/terms"
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: 'Terms of Service', path: '/terms' },
      ]}
      jsonLd={webPageSchema(
        '/terms',
        'Terms of Service | Elystra',
        'Terms of Service for Elystra software.',
      )}
    />

    <div className="px-6">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs
          items={[{ name: 'Home', path: '/' }, { name: 'Terms of Service', path: '/terms' }]}
        />
      </div>
    </div>

    <PageHero
      eyebrow="Legal"
      title="Terms of Service"
      description="Last updated: February 2026"
    />

    <section className="px-6 pb-20">
      <div className="prose prose-invert mx-auto max-w-3xl space-y-6 text-sm font-light leading-relaxed text-zinc-400">
        <p>
          By accessing or using Elystra (&ldquo;Service&rdquo;), you agree to these Terms of Service.
          Elystra provides revenue infrastructure software for agencies including proposal generation,
          e-signature, payment collection, deal intelligence, and client portal services.
        </p>

        <h2 className="text-base font-normal text-white">1. Service Description</h2>
        <p>
          Elystra is a B2B software platform. You must be authorized to bind your organization to
          these terms. The Service is provided on a subscription basis as described on our{' '}
          <a href="https://app.elystra.online/pricing" className="text-violet-400">
            pricing page
          </a>
          .
        </p>

        <h2 className="text-base font-normal text-white">2. Account &amp; Access</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials.
          Access the Service at{' '}
          <a href="https://app.elystra.online" className="text-violet-400">
            app.elystra.online
          </a>
          .
        </p>

        <h2 className="text-base font-normal text-white">3. Payment Processing</h2>
        <p>
          Payment collection features are powered by Stripe. By using payment features, you also
          agree to Stripe&apos;s terms. Elystra does not store payment card data.
        </p>

        <h2 className="text-base font-normal text-white">4. Data &amp; Privacy</h2>
        <p>
          Our handling of personal data is described in the{' '}
          <Link to="/privacy" className="text-violet-400">
            Privacy Policy
          </Link>
          . You retain ownership of your agency and client data.
        </p>

        <h2 className="text-base font-normal text-white">5. Acceptable Use</h2>
        <p>
          You may not use the Service for unlawful purposes, to send spam, or to attempt unauthorized
          access to Elystra systems or third-party integrations.
        </p>

        <h2 className="text-base font-normal text-white">6. Contact</h2>
        <p>
          Questions about these terms:{' '}
          <a href="mailto:legal@elystra.online" className="text-violet-400">
            legal@elystra.online
          </a>
        </p>
      </div>
    </section>
  </MarketingPageLayout>
);

export default TermsPage;
