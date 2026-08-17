import { motion, Variants } from 'framer-motion';
import SeoHead from '@/components/SeoHead';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import GapMeasure from '@/components/the-gap/GapMeasure';
import { Vortex } from '@/components/ui/vortex';
import { organizationSchema, webPageSchema } from '@/lib/seo/schemas';
import { useDemoBooking } from '@/contexts/DemoBookingContext';
import productStyles from './ProductPage.module.css';
import styles from './TheGapPage.module.css';

const easeOutQuart = [0.25, 0.46, 0.45, 0.94] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutQuart } },
};

const RECORD_QUESTIONS = [
  {
    n: '01 / CLOSE',
    q: 'What share of $40,000 retainer proposals actually close, and in how many touches?',
  },
  {
    n: '02 / VELOCITY',
    q: 'How many days from approval to deposit — and where do the losses cluster?',
  },
  {
    n: '03 / DRIFT',
    q: 'How far does delivered scope drift from signed scope before margin disappears?',
  },
];

const DENY_LIST = [
  'No financing',
  'No cash advances',
  'No invoice factoring',
  'No net-terms product that sells your own money back to you at a discount',
];

const TheGapPage = () => {
  const { openDemoBooking } = useDemoBooking();

  return (
  <>
    <div className={productStyles.productPageBg}>
      <Vortex
        particleCount={140}
        baseHue={266}
        rangeSpeed={0.34}
        baseRadius={1}
        rangeRadius={1.7}
        backgroundColor="#04050a"
        containerClassName="w-full h-full"
      />
      <div className={productStyles.productPageAtmosphere} />
    </div>

    <main className="relative z-20 min-h-screen pt-14 md:pt-16">
      <div className={productStyles.productPage}>
        <div className={productStyles.productPageContent}>
          <SeoHead
            title="The Gap — Elystra"
            description="Agencies don't lose the money to competitors. They lose it in between — the interval between client approval and money landing. Elystra is the interval."
            path="/the-gap"
            jsonLd={[
              organizationSchema(),
              webPageSchema(
                '/the-gap',
                'The Gap — Elystra',
                'The interval between client approval and collected payment — and why Elystra exists to own it.',
              ),
            ]}
          />

          <div className={`${productStyles.wrap} pt-8`}>
            <Breadcrumbs
              items={[{ name: 'Home', path: '/' }, { name: 'The Gap', path: '/the-gap' }]}
            />
          </div>

          <section className={productStyles.hero}>
            <motion.div
              className={productStyles.wrap}
              variants={container}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={item} className={productStyles.state}>
                The Gap
              </motion.div>
              <motion.h1 variants={item}>
                Agencies don&apos;t lose the money to competitors. They lose it <em>in between</em>.
              </motion.h1>
              <motion.p variants={item} className={styles.standfirst}>
                The interval between a client saying yes and the money landing in the account.{' '}
                <b>It belongs to no system, so it belongs to no one.</b>
              </motion.p>
            </motion.div>
          </section>

          <div className={productStyles.wrap}>
            <GapMeasure />
          </div>

          <section className={styles.band}>
            <motion.div
              className={`${productStyles.wrap} ${styles.bandInner}`}
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={item} className={styles.tag}>
                Mechanism
              </motion.div>
              <motion.div variants={item} className={styles.col}>
                <p className={styles.sectionLede}>
                  The gap exists because it falls between two categories of software.
                </p>
                <p>
                  Proposal tools are built to send a document. They stop caring at <em>sent</em>.
                  Accounting software begins at the invoice and assumes the invoice already exists.
                  The CRM marks the deal closed and goes quiet.
                </p>
                <p>
                  Everything in between — signature, deposit, scope confirmation, kickoff — belongs
                  to no system. So it belongs to a person. People forget. People follow up on day
                  nine instead of day two. People assume someone else sent it.{' '}
                  <strong>The revenue was already won. It just never arrived.</strong>
                </p>
              </motion.div>
            </motion.div>
          </section>

          <section className={styles.band}>
            <motion.div
              className={`${productStyles.wrap} ${styles.bandInner}`}
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={item} className={styles.tag}>
                Position
              </motion.div>
              <motion.div variants={item} className={styles.col}>
                <p className={styles.sectionLede}>
                  Elystra is not a layer on top of that interval. It is the interval.
                </p>
                <p>
                  Scope, signature, deposit and activation run on one rail. Nothing is handed
                  between tools, because there is nothing to hand.
                </p>
                <p>
                  And because it runs on one rail, it produces a record: what was sent, when it was
                  opened, where it stalled, and what it cost when it never closed.{' '}
                  <strong>
                    Most agencies can tell you exactly why they won. Almost none can tell you why
                    they lost.
                  </strong>
                </p>
              </motion.div>
            </motion.div>
          </section>

          <section className={styles.band}>
            <motion.div
              className={`${productStyles.wrap} ${styles.bandInner}`}
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={item} className={styles.tag}>
                Custody
              </motion.div>
              <motion.div variants={item} className={styles.col}>
                <p className={styles.sectionLede}>Money never touches Elystra.</p>
                <p>
                  Payments settle directly into your own Stripe account, under your own merchant
                  identity. We hold no client funds. We do not sit in the flow of capital. We take
                  no percentage of what you collect.
                </p>
                <p>
                  If Elystra disappeared tomorrow, your payment history, your client relationships
                  and your money would still be exactly where they are now —{' '}
                  <strong>in accounts you already own.</strong> That is a deliberate architectural
                  choice, and it is not reversible without rebuilding the product.
                </p>
              </motion.div>
            </motion.div>
          </section>

          <section className={styles.band}>
            <motion.div
              className={`${productStyles.wrap} ${styles.bandInner}`}
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={item} className={styles.tag}>
                Model
              </motion.div>
              <motion.div variants={item} className={styles.col}>
                <p className={styles.sectionLede}>We will never lend against your receivables.</p>
                <ul className={styles.deny}>
                  {DENY_LIST.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <p>
                  An entire industry is built on agencies being paid late. Late payment is not a
                  flaw in their model — it is the model, and it requires the gap to stay open.{' '}
                  <strong>We are structurally incapable of joining it.</strong> Elystra is paid a
                  flat fee to close the gap, and nothing else. There is no version of this business
                  that profits from you waiting.
                </p>
              </motion.div>
            </motion.div>
          </section>

          <section className={`${styles.band} ${styles.record}`}>
            <motion.div
              className={`${productStyles.wrap} ${styles.bandInner}`}
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={item} className={styles.tag}>
                Record
              </motion.div>
              <motion.div variants={item} className={styles.col}>
                <p className={styles.sectionLede}>
                  Every proposal, approval and payment on the rail produces a record.
                </p>
                <p>
                  Individually those records are operational. In aggregate, across enough agencies,
                  they answer a question the Canadian agency market has never been able to answer
                  with anything but anecdote: <strong>what is normal?</strong>
                </p>
                <div className={styles.qs}>
                  {RECORD_QUESTIONS.map((row) => (
                    <div key={row.n} className={styles.q}>
                      <span>{row.n}</span>
                      <p>{row.q}</p>
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: 26 }}>
                  No one owns those numbers today. Not the industry associations, not the accounting
                  platforms, not the consultants selling benchmarks assembled from surveys. Numbers
                  built from what agencies <em>say</em> they do are worthless.{' '}
                  <strong>Ours are built from what settled.</strong>
                </p>
              </motion.div>
            </motion.div>
          </section>

          <section className={styles.sign}>
            <motion.div
              className={productStyles.wrap}
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.p variants={item}>
                <a href="mailto:support@elystra.online">support@elystra.online</a>
              </motion.p>
              <motion.div variants={item}>
                <button type="button" className={productStyles.cta} onClick={() => openDemoBooking()}>
                  Book a demo
                </button>
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

export default TheGapPage;
