import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import SeoHead from '@/components/SeoHead';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Vortex } from '@/components/ui/vortex';
import { webPageSchema } from '@/lib/seo/schemas';
import productStyles from './ProductPage.module.css';
import styles from './TermsPage.module.css';

const easeOutQuart = [0.25, 0.46, 0.45, 0.94] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOutQuart } },
};

const CLAUSES = [
  { id: 'c1', title: 'Parties and acceptance' },
  { id: 'c2', title: 'What Elystra is' },
  { id: 'c3', title: 'Custody of funds' },
  { id: 'c4', title: 'Your account and users' },
  { id: 'c5', title: 'Your data and your clients' },
  { id: 'c6', title: 'Aggregate and de-identified data' },
  { id: 'c7', title: 'Fees, term and renewal' },
  { id: 'c8', title: 'Non-payment and suspension' },
  { id: 'c9', title: 'Acceptable use' },
  { id: 'c10', title: 'Third-party services' },
  { id: 'c11', title: 'Availability and support' },
  { id: 'c12', title: 'Intellectual property' },
  { id: 'c13', title: 'Confidentiality' },
  { id: 'c14', title: 'Warranties and disclaimers' },
  { id: 'c15', title: 'Limitation of liability' },
  { id: 'c16', title: 'Indemnity' },
  { id: 'c17', title: 'Termination and exit' },
  { id: 'c18', title: 'Changes to these terms' },
  { id: 'c19', title: 'Governing law and language' },
  { id: 'c20', title: 'General' },
] as const;

const Ph = ({ children }: { children: ReactNode }) => (
  <span className={styles.ph}>{children}</span>
);

const Gloss = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className={styles.gloss}>
    <b>{label}</b>
    {children}
  </div>
);

const Clause = ({
  id,
  title,
  pivot,
  children,
}: {
  id: string;
  title: string;
  pivot?: boolean;
  children: ReactNode;
}) => (
  <motion.section
    id={id}
    className={`${styles.clause} ${pivot ? styles.pivot : ''}`}
    variants={item}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.12 }}
  >
    <h2>{title}</h2>
    <div className={styles.inner}>{children}</div>
  </motion.section>
);

const TermsPage = () => {
  const [activeId, setActiveId] = useState('c1');

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && CLAUSES.some((c) => c.id === hash)) {
      setActiveId(hash);
    }

    const sections = CLAUSES.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const visible: Record<string, boolean> = {};
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible[entry.target.id] = entry.isIntersecting;
        });
        const next = CLAUSES.find((c) => visible[c.id]);
        if (next) setActiveId(next.id);
      },
      { rootMargin: '-12% 0px -70% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navigate = useCallback((id: string) => {
    setActiveId(id);
    window.history.replaceState(null, '', `#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <div className={productStyles.productPageBg}>
        <Vortex
          particleCount={120}
          baseHue={266}
          rangeSpeed={0.3}
          baseRadius={1}
          rangeRadius={1.6}
          backgroundColor="#04050a"
          containerClassName="w-full h-full"
        />
        <div className={productStyles.productPageAtmosphere} />
      </div>

      <main className="relative z-20 min-h-screen pt-14 md:pt-16">
        <div className={`${productStyles.productPage} ${styles.page}`}>
          <div className={productStyles.productPageContent}>
            <SeoHead
              title="Terms of Service — Elystra"
              description="The Elystra Terms of Service, written to be read. Custody of funds, data ownership, fees, renewal, and governing law of Québec, Canada."
              path="/terms"
              jsonLd={webPageSchema(
                '/terms',
                'Terms of Service — Elystra',
                'The agreement between Elystra and business users of the service.',
              )}
            />

            <div className={`${productStyles.wrap} pt-8`}>
              <Breadcrumbs
                items={[
                  { name: 'Home', path: '/' },
                  { name: 'Terms of Service', path: '/terms' },
                ]}
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
                  Terms of Service
                </motion.div>
                <motion.h1 variants={item}>The agreement, written to be read.</motion.h1>
                <motion.div variants={item} className={styles.meta}>
                  <span>
                    Version <b>1.0</b>
                  </span>
                  <span>
                    In force <b><Ph>[date]</Ph></b>
                  </span>
                  <span>
                    Governing law <b>Québec, Canada</b>
                  </span>
                  <span>
                    Applies to <b>Business users only</b>
                  </span>
                </motion.div>

                <motion.div variants={item} className={styles.ledger}>
                  <h2>What this agreement does not do</h2>
                  <dl>
                    <div className={styles.row}>
                      <dt>It does not put us between you and your money.</dt>
                      <dd>
                        Client payments settle into your own Stripe account under your own merchant
                        identity. Elystra never holds, routes or takes custody of your funds, and takes
                        no percentage of what you collect.
                      </dd>
                    </div>
                    <div className={styles.row}>
                      <dt>It does not charge you interest.</dt>
                      <dd>
                        There is no late-payment interest, no finance charge and no compounding penalty
                        anywhere in this agreement. If an invoice goes unpaid, the only remedy is
                        suspension.
                      </dd>
                    </div>
                    <div className={styles.row}>
                      <dt>It does not claim your data.</dt>
                      <dd>
                        Your proposals, client records and payment history remain yours. You can export
                        them at any time, including after termination.
                      </dd>
                    </div>
                    <div className={styles.row}>
                      <dt>It does not renew in silence.</dt>
                      <dd>
                        Renewal requires written notice to you in advance, and cancellation before the
                        renewal date costs nothing.
                      </dd>
                    </div>
                  </dl>
                </motion.div>
              </motion.div>
            </section>

            <div className={productStyles.wrap}>
              <div className={styles.doc}>
                <aside className={styles.toc}>
                  <p>Clauses</p>
                  <ol>
                    {CLAUSES.map((clause) => (
                      <li key={clause.id}>
                        <button
                          type="button"
                          className={activeId === clause.id ? styles.on : undefined}
                          onClick={() => navigate(clause.id)}
                        >
                          {clause.title}
                        </button>
                      </li>
                    ))}
                  </ol>
                </aside>

                <div className={styles.clauses}>
                  <Clause id="c1" title="Parties and acceptance">
                    <p>
                      This agreement is between <Ph>[legal entity name]</Ph>, a company incorporated
                      under the laws of Québec with its registered office at <Ph>[address]</Ph>{' '}
                      (&quot;Elystra&quot;, &quot;we&quot;), and the business entity that creates an
                      Elystra account (&quot;you&quot;, &quot;the Agency&quot;).
                    </p>
                    <p>
                      You accept this agreement by creating an account, signing an order form that
                      references it, or using the service. The person accepting confirms they are
                      authorised to bind the Agency.
                    </p>
                    <p>
                      <strong>Elystra is offered to businesses only.</strong> It is not offered to
                      consumers, and it is not intended for personal, family or household use.
                    </p>
                    <Gloss label="In short">
                      Using the product means agreeing to this. Whoever clicks must be allowed to sign
                      for the company.
                    </Gloss>
                  </Clause>

                  <Clause id="c2" title="What Elystra is">
                    <p>
                      Elystra is software that runs the interval between a client approving work and
                      the money arriving: scope, signature, deposit collection, activation and the
                      record of what happened at each step.
                    </p>
                    <p>
                      Elystra is not a bank, a money services business, a payment processor, a lender,
                      a factor, a law firm or an accounting firm. Nothing in the service is legal, tax,
                      accounting or financial advice. Documents generated by the service — including
                      proposals, scopes and agreements between you and your clients — are yours, and
                      you are responsible for their contents and their legal effect.
                    </p>
                    <Gloss label="In short">
                      We run the process. The contract with your client is yours, and so is
                      responsibility for what it says.
                    </Gloss>
                  </Clause>

                  <Clause id="c3" title="Custody of funds" pivot>
                    <p>
                      <strong>Elystra never takes custody of your money or your clients&apos; money.</strong>{' '}
                      Payments initiated through the service are processed by Stripe and settle
                      directly into a Stripe account held in your name, under your merchant identity,
                      subject to Stripe&apos;s own terms with you.
                    </p>
                    <ul className={styles.list}>
                      <li>We do not hold, pool, route or invest client funds at any point.</li>
                      <li>
                        We do not deduct a percentage, commission or spread from amounts you collect.
                      </li>
                      <li>
                        We are not a party to the payment relationship between you, your client and
                        Stripe.
                      </li>
                      <li>
                        If this agreement ends, your Stripe account, its balance and its payout history
                        are unaffected, because they were never ours.
                      </li>
                    </ul>
                    <p>
                      Any dispute, chargeback, refund or reversal concerning a payment is between you,
                      your client and Stripe. We will provide the records the service holds to support
                      you, and will not withhold them.
                    </p>
                    <Gloss label="Why this clause exists">
                      The single question every agency should ask a payments-adjacent vendor is where
                      the money sits if the vendor disappears. The answer is: with you, in an account
                      you already control.
                    </Gloss>
                  </Clause>

                  <Clause id="c4" title="Your account and users">
                    <p>
                      You are responsible for the accuracy of your account information, for the
                      actions of every user you authorise, and for keeping credentials secure. Tell us
                      promptly at{' '}
                      <a href="mailto:support@elystra.online">support@elystra.online</a> if you believe
                      an account has been compromised.
                    </p>
                    <p>
                      Your subscription is priced per organisation, not per seat. You may add users
                      within your organisation without additional charge. You may not share access with
                      entities outside your organisation, resell access, or use one account to operate
                      the service on behalf of multiple unrelated businesses without a written reseller
                      agreement.
                    </p>
                    <Gloss label="In short">
                      Unlimited seats inside your company. Not a licence to run other companies&apos;
                      work through your account.
                    </Gloss>
                  </Clause>

                  <Clause id="c5" title="Your data and your clients">
                    <p>
                      All content you upload or generate — proposals, scopes, client records, files,
                      correspondence and payment history (&quot;Agency Data&quot;) — remains your
                      property. We claim no ownership over it.
                    </p>
                    <p>
                      We process Agency Data solely to provide, secure, support and improve the
                      service, and on your instructions. We do not sell Agency Data, do not use it to
                      market to your clients, and do not disclose identifiable Agency Data to any other
                      customer.
                    </p>
                    <p>
                      Where Agency Data contains personal information about your clients or their
                      staff, you act as the enterprise responsible for that information and we act on
                      your behalf. Our handling is governed by our <Link to="/privacy">Privacy Policy</Link>{' '}
                      and, where applicable, by Québec&apos;s{' '}
                      <em>Act respecting the protection of personal information in the private sector</em>{' '}
                      as amended by Law 25.
                    </p>
                    <p>
                      You can export Agency Data in a machine-readable format at any time during the
                      term and for <Ph>[XX] days</Ph> after termination.
                    </p>
                    <Gloss label="In short">
                      Your data stays yours, we never touch your client relationships, and you can
                      leave with everything.
                    </Gloss>
                  </Clause>

                  <Clause id="c6" title="Aggregate and de-identified data" pivot>
                    <p>
                      We may create statistical, aggregated and de-identified data derived from use of
                      the service — for example, median time from approval to deposit, close rates by
                      proposal value band, and the frequency of scope changes after signature
                      (&quot;Benchmark Data&quot;).
                    </p>
                    <ul className={styles.list}>
                      <li>
                        Benchmark Data is irreversibly de-identified. It contains no client names, no
                        agency names, no contact details and no document contents.
                      </li>
                      <li>
                        It is only ever published or shared in aggregate form drawn from a minimum of{' '}
                        <Ph>[XX]</Ph> distinct agencies, so that no individual agency&apos;s figures
                        can be isolated or inferred.
                      </li>
                      <li>
                        We own Benchmark Data and may use it to operate, improve and publish research
                        about the service and the industry.
                      </li>
                      <li>
                        Where the service returns benchmarks to you, you receive them for your own
                        internal use.
                      </li>
                    </ul>
                    <p>
                      This right survives termination of this agreement as to Benchmark Data already
                      created.
                    </p>
                    <Gloss label="Why this clause exists">
                      The benchmarks the industry currently quotes are drawn from surveys — what
                      agencies say they do. This clause is what allows figures drawn from what actually
                      settled to exist at all, without any agency&apos;s own numbers being visible to
                      another.
                    </Gloss>
                  </Clause>

                  <Clause id="c7" title="Fees, term and renewal">
                    <p>
                      Subscription fees are set out on our pricing page or in your order form, are
                      quoted in Canadian dollars, and are exclusive of applicable GST and QST, which
                      are added where required.
                    </p>
                    <p>
                      Fees are invoiced in advance for the subscription term — quarterly or annually as
                      selected. Fees are non-refundable except where required by law or where we
                      terminate without cause.
                    </p>
                    <p>
                      <strong>Renewal is not silent.</strong> We will notify you in writing at least{' '}
                      <Ph>[30] days</Ph> before the end of each term, stating the renewal date and the
                      renewal price. You may cancel at any point before that date at no cost, effective
                      at the end of the current term. Price changes never apply mid-term and are stated
                      in that notice.
                    </p>
                    <Gloss label="In short">
                      You always get advance warning before you are charged again, with the new price
                      in writing.
                    </Gloss>
                  </Clause>

                  <Clause id="c8" title="Non-payment and suspension" pivot>
                    <p>
                      <strong>
                        We do not charge interest, finance charges, late fees or penalties on overdue
                        amounts.
                      </strong>{' '}
                      No amount owing under this agreement accrues interest at any rate, whether or not
                      judgment has been obtained.
                    </p>
                    <p>
                      If an invoice remains unpaid <Ph>[XX] days</Ph> past its due date, our only
                      remedy is to suspend access to the service after giving you at least{' '}
                      <Ph>[10] days</Ph> written notice. During suspension your data is retained and
                      your export rights under clause 05 continue to apply. Access is restored on
                      payment of the outstanding amount only.
                    </p>
                    <Gloss label="Why this clause exists">
                      Standard software contracts attach 1.5% monthly interest to overdue invoices.
                      This one does not, and never will. If you cannot pay, the service stops. Nothing
                      grows.
                    </Gloss>
                  </Clause>

                  <Clause id="c9" title="Acceptable use">
                    <p>
                      You may not use the service to send unsolicited bulk communications, to collect
                      payment for goods or services that are unlawful or prohibited by Stripe, to
                      misrepresent your identity or your authority to invoice, to reverse-engineer or
                      benchmark the service for a competing product, to circumvent usage limits, or to
                      interfere with the integrity or security of the platform.
                    </p>
                    <p>
                      You are responsible for ensuring that the proposals, agreements and payment
                      requests you issue through the service comply with the law that applies to you
                      and to your clients.
                    </p>
                    <Gloss label="In short">
                      Don&apos;t use the rail for spam, fraud, or building a copy of it.
                    </Gloss>
                  </Clause>

                  <Clause id="c10" title="Third-party services">
                    <p>
                      The service integrates with third-party platforms including Stripe and the tools
                      you choose to connect. Those integrations operate under your own agreements with
                      those providers, using credentials you authorise, and can be revoked by you at
                      any time.
                    </p>
                    <p>
                      We are not responsible for the availability, pricing, security or acts of
                      third-party providers. Where a provider changes or withdraws an interface we rely
                      on, we will restore equivalent functionality where commercially reasonable and
                      will tell you if we cannot.
                    </p>
                    <Gloss label="In short">
                      Your Stripe account and connected tools are yours. We plug into them; we
                      don&apos;t stand behind them.
                    </Gloss>
                  </Clause>

                  <Clause id="c11" title="Availability and support">
                    <p>
                      We target <Ph>[99.X]%</Ph> monthly availability, excluding scheduled maintenance
                      announced at least <Ph>[48] hours</Ph> in advance and events outside our
                      reasonable control.
                    </p>
                    <p>
                      Support is provided by email at{' '}
                      <a href="mailto:support@elystra.online">support@elystra.online</a> during business
                      hours in Eastern Time, with a target first response of <Ph>[one business day]</Ph>.
                      Incidents affecting payment capture are treated as priority.
                    </p>
                    <Gloss label="In short">What we aim for, and what to do when something breaks.</Gloss>
                  </Clause>

                  <Clause id="c12" title="Intellectual property">
                    <p>
                      Elystra, its software, interfaces, documentation and all improvements to them
                      remain our exclusive property. We grant you a non-exclusive, non-transferable,
                      revocable licence to use the service during the term, for your own business
                      purposes.
                    </p>
                    <p>
                      If you send us feedback or suggestions, we may use them without obligation or
                      compensation. This does not give us any rights in Agency Data.
                    </p>
                    <Gloss label="In short">
                      You license the software; you don&apos;t buy it. Ideas you send us we can build.
                    </Gloss>
                  </Clause>

                  <Clause id="c13" title="Confidentiality">
                    <p>
                      Each party will protect the other&apos;s non-public information with at least the
                      care it applies to its own, and will use it only to perform this agreement. This
                      obligation survives termination for <Ph>[three] years</Ph>, and indefinitely for
                      trade secrets.
                    </p>
                    <p>
                      It does not apply to information that is public through no fault of the receiving
                      party, independently developed, or required to be disclosed by law — in which
                      case we will give you notice where legally permitted before disclosing anything
                      of yours.
                    </p>
                    <Gloss label="In short">
                      We keep your commercial information quiet, and warn you if we are ever compelled
                      to hand it over.
                    </Gloss>
                  </Clause>

                  <Clause id="c14" title="Warranties and disclaimers">
                    <p>
                      We warrant that we will provide the service with reasonable skill and care, and
                      in accordance with applicable law.
                    </p>
                    <p>
                      Beyond that warranty, and to the maximum extent permitted by law, the service is
                      provided as-is. We do not warrant that it will be uninterrupted or error-free,
                      that it will produce any particular commercial result, or that benchmark figures
                      are predictive of your outcomes.
                    </p>
                    <Gloss label="In short">
                      We commit to running it properly. We do not promise it makes you money.
                    </Gloss>
                  </Clause>

                  <Clause id="c15" title="Limitation of liability">
                    <p>
                      Neither party is liable for indirect, incidental, special or consequential loss,
                      or for lost profits, lost revenue or lost business opportunity, however caused.
                    </p>
                    <p>
                      Each party&apos;s total aggregate liability arising out of this agreement is
                      limited to the fees paid or payable by you in the <Ph>[twelve] months</Ph>{' '}
                      preceding the event giving rise to the claim.
                    </p>
                    <p>
                      These limits do not apply to your obligation to pay fees, to either party&apos;s
                      breach of confidentiality, to your indemnity obligations, or to liability that
                      cannot be limited by law — including gross negligence and intentional fault under
                      Québec law.
                    </p>
                    <Gloss label="In short">
                      The ceiling is what you paid us in a year, with the usual carve-outs.
                    </Gloss>
                  </Clause>

                  <Clause id="c16" title="Indemnity">
                    <p>
                      You will defend and indemnify us against third-party claims arising from your use
                      of the service in breach of this agreement, from the content of documents you
                      issue through it, or from your handling of your clients&apos; personal
                      information.
                    </p>
                    <p>
                      We will defend and indemnify you against third-party claims that the service as
                      provided by us infringes their intellectual property rights.
                    </p>
                    <Gloss label="In short">
                      You cover claims about what you sent. We cover claims about what we built.
                    </Gloss>
                  </Clause>

                  <Clause id="c17" title="Termination and exit">
                    <p>
                      You may terminate at the end of any subscription term by giving notice before the
                      renewal date. Either party may terminate immediately for material breach that
                      remains uncured <Ph>[30] days</Ph> after written notice.
                    </p>
                    <p>
                      On termination: access ends at the close of the paid term; your export rights
                      under clause 05 continue for <Ph>[XX] days</Ph>; and we delete or de-identify
                      Agency Data within <Ph>[XX] days</Ph> after that, except where law requires
                      retention. Your Stripe account and its history are unaffected.
                    </p>
                    <Gloss label="In short">
                      Leaving is a supported operation, not a negotiation. You take your records with
                      you.
                    </Gloss>
                  </Clause>

                  <Clause id="c18" title="Changes to these terms">
                    <p>
                      We may update these terms. Changes that materially reduce your rights take effect
                      only at your next renewal, and we will notify you in writing at least{' '}
                      <Ph>[30] days</Ph> before that date. If you do not accept them, you may decline
                      renewal and leave with your data.
                    </p>
                    <p>
                      Every version is dated and archived. The version in force for you is the one you
                      accepted at the start of your current term.
                    </p>
                    <Gloss label="In short">
                      Terms cannot be changed under you mid-term. Material changes wait for renewal,
                      with notice.
                    </Gloss>
                  </Clause>

                  <Clause id="c19" title="Governing law and language">
                    <p>
                      This agreement is governed by the laws of the Province of Québec and the federal
                      laws of Canada applicable in it. The parties submit to the exclusive jurisdiction
                      of the courts of the judicial district of <Ph>[Montréal]</Ph>.
                    </p>
                    <p>
                      A French-language version of this agreement has been made available to you.{' '}
                      <Ph>
                        [Insert the express language-choice wording required under the Charter of the
                        French Language, drafted by counsel.]
                      </Ph>
                    </p>
                    <Gloss label="Read this one carefully">
                      Québec&apos;s language legislation imposes specific requirements on the language
                      of adhesion contracts. The wording in this clause must be drafted by Québec
                      counsel — it is not boilerplate, and getting it wrong is enforceable against you.
                    </Gloss>
                  </Clause>

                  <Clause id="c20" title="General">
                    <p>
                      This agreement, with any order form and the Privacy Policy, is the entire
                      agreement between us and replaces prior discussions. If a provision is held
                      unenforceable, the rest survives. Failure to enforce a right is not a waiver of
                      it. You may not assign this agreement without our consent; we may assign it in
                      connection with a merger or sale of substantially all our assets, on notice to
                      you.
                    </p>
                    <p>
                      Notices to you are sent to the account email on file. Notices to us go to{' '}
                      <a href="mailto:support@elystra.online">support@elystra.online</a>.
                    </p>
                  </Clause>
                </div>
              </div>
            </div>

            <section className={styles.contact}>
              <div className={productStyles.wrap}>
                <p>
                  If any clause here is unclear, or your counsel wants a change, write to{' '}
                  <a href="mailto:support@elystra.online">support@elystra.online</a>. Redlines are read by
                  the person who wrote the terms.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TermsPage;
