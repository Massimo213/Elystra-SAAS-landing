import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import SeoHead from '@/components/SeoHead';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import IntegrationLogoGrid from '@/components/integrations/IntegrationLogoGrid';
import { Vortex } from '@/components/ui/vortex';
import { webPageSchema } from '@/lib/seo/schemas';
import { useDemoBooking } from '@/contexts/DemoBookingContext';
import styles from './ProductPage.module.css';

const easeOutQuart = [0.25, 0.46, 0.45, 0.94] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutQuart } },
};

const CATEGORIES = [
  {
    n: '01',
    title: 'CRM & pipeline',
    body: 'HubSpot, Pipedrive, Salesforce — deal stage and contact record update on close.',
  },
  {
    n: '02',
    title: 'Email & comms',
    body: 'Gmail, Outlook, Slack — scope sent, state changes announced in the channels you already run.',
  },
  {
    n: '03',
    title: 'Payments',
    body: 'Stripe — deposit and retainer collected in the same motion as signature.',
  },
  {
    n: '04',
    title: 'Accounting',
    body: 'QuickBooks, Xero — invoice and revenue written at the transaction.',
  },
  {
    n: '05',
    title: 'Project & delivery',
    body: 'ClickUp, Asana, Notion, Linear — signed scope becomes real work in your boards.',
  },
  {
    n: '06',
    title: 'Storage & docs',
    body: 'Google Drive, Dropbox — agreements, invoices, and receipts filed automatically.',
  },
  {
    n: '07',
    title: 'Automation',
    body: 'Zapier, Make — every Elystra event available as a trigger.',
  },
  {
    n: '08',
    title: 'Custom',
    body: 'API, webhooks, internal tools — whatever else your agency runs.',
  },
];

const FLOW = [
  {
    num: 'STEP 01',
    label: 'Scope sent',
    title: 'Live, tracked, branded.',
    body: 'Nothing re-keyed. The client gets a trackable scope in your identity — not a PDF attachment.',
  },
  {
    num: 'STEP 02',
    label: 'Client signs',
    title: 'Signature and deposit, one screen.',
    body: 'One session. One motion. No separate payment link the next morning.',
  },
  {
    num: 'STEP 03',
    label: 'Payment clears',
    title: 'The deal advances on money.',
    body: 'Closed–Won when funds hit — not on a verbal, not on a signature alone.',
  },
  {
    num: 'STEP 04',
    label: 'Same second',
    title: 'Your stack updates itself.',
    body: 'CRM updated. Invoice raised. Delivery opened. Team notified.',
  },
];

const IntegrationsPage = () => {
  const { openDemoBooking } = useDemoBooking();

  return (
    <>
      <div className={styles.productPageBg}>
        <Vortex
          particleCount={140}
          baseHue={266}
          rangeSpeed={0.34}
          baseRadius={1}
          rangeRadius={1.7}
          backgroundColor="#04050a"
          containerClassName="w-full h-full"
        />
        <div className={styles.productPageAtmosphere} />
      </div>

      <main className="relative z-20 min-h-screen pt-14 md:pt-16">
        <div className={styles.productPage}>
          <div className={styles.productPageContent}>
            <SeoHead
              title="Integrations | Elystra"
              description="Elystra integrates with 100+ tools — CRM, payments, email, accounting, project management, and automation. Your stack, wired to the rail."
              path="/integrations"
              jsonLd={webPageSchema(
                '/integrations',
                'Integrations | Elystra',
                'Connect Elystra to your agency stack.',
              )}
            />

            <div className={`${styles.wrap} pt-8`}>
              <Breadcrumbs
                items={[{ name: 'Home', path: '/' }, { name: 'Integrations', path: '/integrations' }]}
              />
            </div>

            <section className={styles.hero}>
              <motion.div className={styles.wrap} variants={container} initial="hidden" animate="visible">
                <motion.div variants={item} className={styles.state}>
                  Adoption without friction
                </motion.div>
                <motion.h1 variants={item}>
                  Applications for <em>everything else.</em>
                </motion.h1>
                <motion.p variants={item} className={styles.lede}>
                  Elystra integrates with{' '}
                  <strong>100+ tools</strong> so your agency keeps the CRM, billing, boards, and inbox it
                  already runs on. The rail fits the stack — it does not force a rebuild.
                </motion.p>
              </motion.div>
            </section>

            <section className={styles.gapBand}>
              <div className={styles.wrap}>
                <div className="hidden lg:block">
                  <IntegrationLogoGrid variant="desktop" />
                </div>
                <div className="mt-8 lg:hidden">
                  <IntegrationLogoGrid variant="mobile" />
                </div>
              </div>
            </section>

            <section className={styles.gapBand}>
              <motion.div
                className={styles.wrap}
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.div variants={item} className={styles.state}>
                  What connects
                </motion.div>
                <motion.h2 variants={item}>Your stack is the spec.</motion.h2>
                <motion.p variants={item}>
                  If your agency runs it, Elystra routes into it. No migration project. No freeze window.
                  The rail starts with your next deal.
                </motion.p>
                <motion.div variants={item} className={styles.leaks}>
                  {CATEGORIES.map((cat) => (
                    <div key={cat.n} className={styles.leak}>
                      <div className={styles.n}>{cat.n}</div>
                      <h3>{cat.title}</h3>
                      <p>{cat.body}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </section>

            <section className={styles.rail}>
              <div className={styles.wrap}>
                <div className={styles.railIntro}>
                  <div className={styles.state}>One path for the deal</div>
                  <h2>Every system on it.</h2>
                  <p>
                    Your stack is not a checklist. It is the downstream target the rail fires into the moment
                    payment clears.
                  </p>
                </div>

                {FLOW.map((step) => (
                  <div key={step.num} className={styles.stage}>
                    <div className={styles.stageHead}>
                      <span className={styles.stageNum}>{step.num}</span>
                      <span className={styles.stageLabel}>{step.label}</span>
                    </div>
                    <h3>{step.title}</h3>
                    <p className={styles.sub}>{step.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.close}>
              <motion.div
                className={styles.wrap}
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div variants={item} className={styles.state}>
                  Next
                </motion.div>
                <motion.h2 variants={item}>
                  See the rail run against one of your own deals.
                </motion.h2>
                <motion.p variants={item}>
                  Real scope. Real signature flow. Real payment event — wired into the tools you already pay
                  for.
                </motion.p>
                <motion.div variants={item}>
                  <button type="button" className={styles.cta} onClick={() => openDemoBooking()}>
                    Request a walkthrough
                  </button>
                </motion.div>
                <motion.div variants={item} className={styles.subLinks}>
                  <Link to="/docs/integrations">Setup docs</Link> &nbsp;·&nbsp;{' '}
                  <Link to="/product">Product</Link> &nbsp;·&nbsp;{' '}
                  <Link to="/contact">Contact</Link>
                </motion.div>
              </motion.div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default IntegrationsPage;
