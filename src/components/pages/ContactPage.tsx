import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import MarketingPageLayout from '@/components/MarketingPageLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/pages/PageHero';
import { webPageSchema } from '@/lib/seo/schemas';
import { useDemoBooking } from '@/contexts/DemoBookingContext';

const CONTACT_CHANNELS = [
  {
    label: 'General support',
    email: 'support@elystra.online',
    description: 'Product questions, account help, and agency onboarding.',
  },
  {
    label: 'Sales',
    email: 'sales@elystra.online',
    description: 'Demo requests, pricing, and enterprise evaluations.',
  },
  {
    label: 'Security',
    email: 'security@elystra.online',
    description: 'Security reviews, vulnerability reports, and compliance.',
  },
];

const ContactPage = () => {
  const { openDemoBooking } = useDemoBooking();

  return (
    <MarketingPageLayout>
      <SeoHead
        title="Contact | Elystra"
        description="Contact Elystra for support, sales, and security inquiries. Email support@elystra.online or book a demo."
        path="/contact"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
        jsonLd={webPageSchema('/contact', 'Contact | Elystra', 'Contact Elystra support and sales.')}
      />

      <div className="px-6">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]}
          />
        </div>
      </div>

      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        description="Support, sales, and security — direct lines to the Elystra team."
      />

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl space-y-4">
          {CONTACT_CHANNELS.map((channel) => (
            <div
              key={channel.email}
              className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-6 py-5"
            >
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                <div>
                  <h2 className="text-base font-light text-white">{channel.label}</h2>
                  <a
                    href={`mailto:${channel.email}`}
                    className="mt-1 block text-sm text-violet-400 hover:text-violet-300"
                  >
                    {channel.email}
                  </a>
                  <p className="mt-2 text-sm font-light text-zinc-400">{channel.description}</p>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => openDemoBooking()}
            className="mt-6 w-full rounded-xl border border-violet-500/30 bg-violet-500/10 px-6 py-4 text-sm font-light text-white hover:bg-violet-500/15"
          >
            Or book a 7-minute demo →
          </button>

          <p className="pt-4 text-center text-sm text-zinc-500">
            <Link to="/help" className="text-violet-400 hover:text-violet-300">
              Help Center
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

export default ContactPage;
