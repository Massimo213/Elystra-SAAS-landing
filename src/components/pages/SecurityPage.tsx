import type { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import SeoHead from '@/components/SeoHead';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Vortex } from '@/components/ui/vortex';
import { webPageSchema } from '@/lib/seo/schemas';
import productStyles from './ProductPage.module.css';
import styles from './SecurityPage.module.css';

const easeOutQuart = [0.25, 0.46, 0.45, 0.94] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutQuart } },
};

const Code = ({ children }: { children: ReactNode }) => (
  <code className={styles.inlineCode}>{children}</code>
);

const Section = ({ children }: { children: ReactNode }) => (
  <motion.section
    className={styles.band}
    variants={container}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
  >
    <motion.div variants={item} className={productStyles.wrap}>
      {children}
    </motion.div>
  </motion.section>
);

const SecurityPage = () => (
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
      <div className={`${productStyles.productPage} ${styles.page}`}>
        <div className={productStyles.productPageContent}>
          <SeoHead
            title="Security | Elystra"
            description="How Elystra handles agency and client data — payment architecture, data inventory, access control, failure modes, and responsibility boundaries."
            path="/security"
            jsonLd={webPageSchema(
              '/security',
              'Security | Elystra',
              'How Elystra handles agency and client data — payment architecture, data inventory, access control, failure modes, and responsibility boundaries.',
            )}
          />

          <div className={`${productStyles.wrap} pt-8`}>
            <Breadcrumbs
              items={[{ name: 'Home', path: '/' }, { name: 'Security', path: '/security' }]}
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
                Security
              </motion.div>
              <motion.h1 variants={item}>
                What we hold, what we don&apos;t, and who is responsible for what.
              </motion.h1>
              <motion.p variants={item} className={productStyles.lede}>
                Elystra sits in the path of your client agreements and your revenue. That warrants a
                straight account of how the system is built rather than a list of badges.{' '}
                <strong>
                  This page describes the actual architecture, the boundaries between Elystra and its
                  providers, and what happens when something fails.
                </strong>
              </motion.p>
            </motion.div>
          </section>

          <Section>
            <div className={productStyles.state}>01 — The boundary</div>
            <h2>Three parties hold different things. The distinction matters.</h2>
            <p className={styles.lead}>
              Most security pages describe a single system as though one company controls everything
              in it. That is not how the rail works, and pretending otherwise obscures the question
              you actually care about: who is holding what.
            </p>
            <table className={styles.tbl}>
              <thead>
                <tr>
                  <th>Party</th>
                  <th>Holds</th>
                  <th>Responsible for</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Your agency</strong>
                  </td>
                  <td>
                    Account credentials, workspace configuration, decisions about who on your team
                    has access
                  </td>
                  <td>
                    Access hygiene inside your own workspace and the authorisation you grant to
                    connected systems
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Elystra</strong>
                  </td>
                  <td>
                    Scopes, deal records, client contact details, executed agreements, behavioural
                    signals, integration authorisation tokens, payment <em>records</em>
                  </td>
                  <td>
                    Storage, encryption, isolation between workspaces, access control, and the
                    integrity of executed documents
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Stripe</strong>
                  </td>
                  <td>Card numbers, banking credentials, and the settlement itself</td>
                  <td>
                    Payment processing, PCI DSS compliance, and the security of the cardholder data
                    environment
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Section>
            <div className={productStyles.state}>02 — Payment architecture</div>
            <h2>Elystra never receives your client&apos;s card details.</h2>
            <p className={styles.lead}>
              This is an architectural fact, not a policy commitment. Payment fields on a scope are
              served and controlled by Stripe, not by Elystra. Card data is transmitted from your
              client&apos;s browser directly to Stripe. It does not pass through Elystra&apos;s
              servers, is not logged by Elystra, and is not present in any Elystra system at any
              point.
            </p>
            <div className={styles.split}>
              <div className={styles.col}>
                <div className={styles.colKey}>Elystra stores</div>
                <ul className={styles.list}>
                  <li>A Stripe reference identifier for the transaction</li>
                  <li>Amount, currency, and payment type</li>
                  <li>Settlement status and timestamp</li>
                  <li>Last four digits and card brand, as returned by Stripe for display</li>
                  <li>The deal the payment is associated with</li>
                </ul>
              </div>
              <div className={styles.col}>
                <div className={styles.colKey}>Elystra never stores</div>
                <ul className={styles.list}>
                  <li>Full card numbers</li>
                  <li>CVV or security codes</li>
                  <li>Cardholder authentication data</li>
                  <li>Bank account or routing details</li>
                  <li>Anything that could be used to initiate a charge outside Elystra</li>
                </ul>
              </div>
            </div>
            <div className={styles.note}>
              <div className={styles.noteKey}>Why this is the right architecture</div>
              <p>
                Card handling is the highest-risk surface in any revenue system, so Elystra is built
                not to have one. Stripe operates the cardholder data environment and holds PCI DSS
                Level 1 certification; Elystra holds a transaction reference and a status. Nothing
                in Elystra&apos;s systems could be used to initiate a charge. This is a structural
                property of the architecture, not a control that has to be maintained.
              </p>
            </div>
            <h3>Where the money goes</h3>
            <p>
              Funds settle from your client to <strong>your</strong> Stripe account. Elystra is not
              an intermediary in the flow of funds and does not hold client money at any point.
              Elystra observes the settlement event and advances the deal state; it does not custody
              the payment.
            </p>
          </Section>

          <Section>
            <div className={productStyles.state}>03 — Data inventory</div>
            <h2>Everything Elystra holds, stated plainly.</h2>
            <p className={styles.lead}>
              A security page that describes controls without naming the data is describing nothing.
              This is the full inventory.
            </p>
            <table className={styles.tbl}>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Why it exists</th>
                  <th>Sensitivity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.cellKey}>scopes</td>
                  <td>The priced documents your agency sends, including commercial terms and pricing</td>
                  <td>
                    <span className={styles.no}>High</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles.cellKey}>agreements</td>
                  <td>Executed contracts and signature records</td>
                  <td>
                    <span className={styles.no}>High</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles.cellKey}>clients</td>
                  <td>Client organisation and contact details — names, emails, roles</td>
                  <td>
                    <span className={styles.no}>High</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles.cellKey}>deals</td>
                  <td>Values, states, timestamps, loss reasons</td>
                  <td>
                    <span className={styles.no}>High</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles.cellKey}>payments</td>
                  <td>
                    Stripe references, amounts, statuses. <strong>No card data.</strong>
                  </td>
                  <td>
                    <span className={styles.yes}>Moderate</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles.cellKey}>signals</td>
                  <td>Behavioural observations on live scopes — opens, dwell, forwards</td>
                  <td>
                    <span className={styles.yes}>Moderate</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles.cellKey}>tokens</td>
                  <td>Authorisation tokens for the systems you connect</td>
                  <td>
                    <span className={styles.no}>High</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles.cellKey}>users</td>
                  <td>Your team&apos;s account records and access levels</td>
                  <td>
                    <span className={styles.yes}>Moderate</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <h3>What Elystra does not collect</h3>
            <ul className={styles.list}>
              <li>Your clients&apos; financial credentials of any kind</li>
              <li>The contents of your inbox beyond the messages sent through the rail</li>
              <li>Data from connected systems outside the scope of the authorisation you grant</li>
              <li>Behavioural data on anyone other than recipients of scopes you send</li>
            </ul>
          </Section>

          <Section>
            <div className={productStyles.state}>04 — Isolation &amp; access</div>
            <h2>No read path exists between one agency&apos;s data and another&apos;s.</h2>
            <p className={styles.lead}>
              Every record in Elystra is bound to a workspace. Workspace scoping is enforced at the
              data layer, not in application logic — a query that fails to specify a workspace
              returns nothing rather than returning everything.
            </p>
            <p>
              This distinction matters because the common failure mode in multi-tenant systems is
              not a broken firewall. It is a missing <Code>WHERE</Code> clause. Enforcing isolation
              below the application means an application bug cannot expose another agency&apos;s
              deals.
            </p>
            <h3>Access control</h3>
            <ul className={styles.list}>
              <li>
                <strong>Team access</strong> — scoped by role within the workspace. You control who
                is added and what they can see.
              </li>
              <li>
                <strong>Client portal access</strong> — a client sees only their own agreements,
                invoices, and receipts. There is no path from a portal session to any other
                client&apos;s records.
              </li>
              <li>
                <strong>API keys</strong> — workspace-scoped, revocable, and displayed once at
                creation. A revoked key fails on the next request, not at the next rotation cycle.
              </li>
              <li>
                <strong>Internal access</strong> — engineering access to production data is
                restricted and used only for support cases and incident response.
              </li>
            </ul>
          </Section>

          <Section>
            <div className={productStyles.state}>05 — Document integrity</div>
            <h2>An executed agreement cannot be altered after the fact.</h2>
            <p className={styles.lead}>
              The commercial value of a signature depends entirely on the document being provably
              unchanged since it was signed. Elystra treats executed agreements as immutable records
              rather than editable files.
            </p>
            <ul className={styles.list}>
              <li>
                <strong>Version locking</strong> — the exact version presented to the client at
                signature is the version retained. Later edits to a template do not alter an
                executed document.
              </li>
              <li>
                <strong>Signature record</strong> — timestamp, signer identity, and the version
                signed are stored together as a single record.
              </li>
              <li>
                <strong>Retention</strong> — executed agreements remain retrievable by both your
                agency and the client through the portal for the life of the account.
              </li>
            </ul>
          </Section>

          <Section>
            <div className={productStyles.state}>06 — Failure modes</div>
            <h2>What happens when part of the system is unavailable.</h2>
            <p className={styles.lead}>
              Every system fails somewhere. What separates infrastructure from software is whether
              the failure is contained. Elystra is built so that a failure in one connector cannot
              corrupt a deal or lose a payment.
            </p>
            <table className={styles.tbl}>
              <thead>
                <tr>
                  <th>Failure</th>
                  <th>Effect</th>
                  <th>Recovery</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>A connected system is down</strong>
                  </td>
                  <td>The deal advances normally. The write to that system is queued.</td>
                  <td>
                    Automatic retry with backoff. Persistent failures surface in the integrations
                    panel with the payload available.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>A payment does not settle</strong>
                  </td>
                  <td>
                    The deal remains in <Code>signed</Code>. It does not advance to closed, and no
                    post-close automation fires.
                  </td>
                  <td>The deal stays in the follow-up queue. Retry is available on the same scope.</td>
                </tr>
                <tr>
                  <td>
                    <strong>A webhook delivery fails</strong>
                  </td>
                  <td>No effect on deal state. Elystra&apos;s record is authoritative.</td>
                  <td>Retried with exponential backoff over 24 hours.</td>
                </tr>
                <tr>
                  <td>
                    <strong>An API key is compromised</strong>
                  </td>
                  <td>Revocation takes effect on the next request.</td>
                  <td>Revoke and reissue from developer settings. No rotation window.</td>
                </tr>
              </tbody>
            </table>
            <div className={styles.note}>
              <div className={styles.noteKey}>The principle</div>
              <p>
                State advances on financial settlement, and settlement is observed rather than
                assumed. A connector outage degrades reporting in a downstream tool. It does not
                lose a deal, double-charge a client, or mark unpaid work as closed.
              </p>
            </div>
          </Section>

          <Section>
            <div className={productStyles.state}>07 — Infrastructure</div>
            <h2>Transport, storage, and the providers underneath.</h2>
            <ul className={styles.list}>
              <li>
                <strong>Transport</strong> — all traffic over TLS. Plain HTTP requests are rejected
                rather than redirected.
              </li>
              <li>
                <strong>At rest</strong> — data encrypted at rest by the managed database and storage
                layer.
              </li>
              <li>
                <strong>Backups</strong> — automated, encrypted, and tested by restoration rather
                than assumed to work.
              </li>
              <li>
                <strong>Secrets</strong> — credentials and integration tokens held in managed secret
                storage, never in source control.
              </li>
            </ul>
            <h3>Subprocessors</h3>
            <p>
              Elystra relies on a small number of providers. Each holds a defined subset of data and
              nothing beyond it.
            </p>
            <table className={styles.tbl}>
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Function</th>
                  <th>Holds</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Stripe</strong>
                  </td>
                  <td>Payment processing and settlement</td>
                  <td>Card and banking data. PCI DSS Level 1.</td>
                </tr>
                <tr>
                  <td>
                    <strong>Cloud infrastructure</strong>
                  </td>
                  <td>Application hosting and managed database</td>
                  <td>Encrypted application data at rest</td>
                </tr>
                <tr>
                  <td>
                    <strong>Email delivery</strong>
                  </td>
                  <td>Transactional message delivery</td>
                  <td>Recipient addresses and message contents in transit</td>
                </tr>
                <tr>
                  <td>
                    <strong>Systems you connect</strong>
                  </td>
                  <td>Whatever your agency authorises</td>
                  <td>Only the data covered by the authorisation you grant</td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Section>
            <div className={productStyles.state}>08 — Scope</div>
            <h2>What this page does not claim.</h2>
            <p className={styles.lead}>
              A security page that claims everything is a security page you should not believe.
              These are the boundaries of what is stated above.
            </p>
            <ul className={styles.list}>
              <li>
                Elystra does not claim to secure the systems you connect. Authorisation grants
                Elystra access within the permissions you approve; the security of those systems
                remains with their providers.
              </li>
              <li>
                Elystra does not claim responsibility for access granted inside your own workspace.
                If a departing team member retains access, that is a workspace administration
                matter.
              </li>
              <li>
                Certification status and formal audit posture are stated on request rather than
                implied by logos.
              </li>
            </ul>
          </Section>

          <section className={`${styles.band} ${styles.close}`}>
            <motion.div
              className={productStyles.wrap}
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={item} className={productStyles.state}>
                Contact
              </motion.div>
              <motion.h2 variants={item}>Reporting a vulnerability.</motion.h2>
              <motion.p variants={item}>
                If you have found a security issue in Elystra, write to{' '}
                <a className={styles.mail} href="mailto:support@elystra.online">
                  support@elystra.online
                </a>{' '}
                with enough detail to reproduce it. Reports are acknowledged and investigated. We do
                not pursue action against researchers who report in good faith and do not access
                data beyond what is necessary to demonstrate the issue.
              </motion.p>
              <motion.p variants={item}>
                For diligence questions ahead of a contract, the same address reaches the person who
                can answer them.
              </motion.p>
            </motion.div>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default SecurityPage;
