import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import SeoHead from '@/components/SeoHead';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Vortex } from '@/components/ui/vortex';
import { webPageSchema } from '@/lib/seo/schemas';
import productStyles from './ProductPage.module.css';
import styles from './PrivacyPage.module.css';

const easeOutQuart = [0.25, 0.46, 0.45, 0.94] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutQuart } },
};

const Ph = ({ children }: { children: ReactNode }) => (
  <span className={styles.ph}>{children}</span>
);

const Section = ({ n, title, children }: { n: string; title: string; children: ReactNode }) => (
  <motion.section
    className={styles.band}
    variants={container}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.12 }}
  >
    <motion.div variants={item} className={productStyles.wrap}>
      {n ? <div className={styles.num}>{n}</div> : <div className={productStyles.state}>Before the clauses</div>}
      <h2>{title}</h2>
      {children}
    </motion.div>
  </motion.section>
);

const PrivacyPage = () => (
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
            title="Privacy Policy | Elystra"
            description="How Elystra handles personal information — roles, collection, de-identification, retention, and your rights under Québec Law 25."
            path="/privacy"
            jsonLd={webPageSchema(
              '/privacy',
              'Privacy Policy | Elystra',
              'How Elystra handles personal information under Québec Law 25.',
            )}
          />

          <div className={`${productStyles.wrap} pt-8`}>
            <Breadcrumbs
              items={[{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy' }]}
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
                Privacy
              </motion.div>
              <motion.h1 variants={item}>Privacy Policy</motion.h1>
              <motion.p variants={item} className={productStyles.lede}>
                This policy describes what personal information Elystra holds, why it exists in the
                system, who can reach it, and what you can require us to do with it. It is written to
                be read rather than to be survived.
              </motion.p>
              <motion.div variants={item} className={styles.meta}>
                <div className={styles.m}>
                  <div className={styles.mKey}>Version</div>
                  <div className={styles.mVal}>1.0</div>
                </div>
                <div className={styles.m}>
                  <div className={styles.mKey}>In force</div>
                  <div className={styles.mVal}>
                    <Ph>[date]</Ph>
                  </div>
                </div>
                <div className={styles.m}>
                  <div className={styles.mKey}>Governing law</div>
                  <div className={styles.mVal}>Québec, Canada</div>
                </div>
                <div className={styles.m}>
                  <div className={styles.mKey}>Applies to</div>
                  <div className={styles.mVal}>Business users and their contacts</div>
                </div>
              </motion.div>
            </motion.div>
          </section>

          <Section n="" title="What this policy does not do.">
            <div className={styles.nd}>
              <div className={styles.ndItem}>
                <h3>It does not sell personal information.</h3>
                <p>
                  Elystra does not sell, trade or rent personal information about you, your team or
                  your clients&apos; contacts, and does not disclose it to advertisers or data
                  brokers. There is no arrangement in which your contact list is the product.
                </p>
              </div>
              <div className={styles.ndItem}>
                <h3>It does not disclose your clients&apos; identities to another agency.</h3>
                <p>
                  No client name, contact detail or document content from your workspace is disclosed
                  to another Elystra customer, in any form, at any time.
                </p>
              </div>
              <div className={styles.ndItem}>
                <h3>It does not hide what is tracked.</h3>
                <p>
                  Elystra records how recipients interact with the scopes you send. That is a core
                  function of the product and it is set out in full in clause 03 rather than buried
                  in a definition.
                </p>
              </div>
            </div>
          </Section>

          <Section n="01" title="Who is responsible for what">
            <p>
              Elystra holds two categories of personal information, and our role differs between them.
            </p>
            <table className={styles.tbl}>
              <thead>
                <tr>
                  <th>Information</th>
                  <th>Whose it is</th>
                  <th>Our role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Your team&apos;s account information</strong>
                  </td>
                  <td>The individuals who use Elystra at your agency</td>
                  <td>
                    Elystra is the enterprise responsible. We decide why it is collected and how it is
                    used.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Your clients&apos; information</strong>
                  </td>
                  <td>Your agency&apos;s client contacts and scope recipients</td>
                  <td>
                    Your agency is the enterprise responsible. We process it on your instructions, to
                    provide the service.
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              This distinction matters practically. If a client contact of yours asks to see or delete
              their information, the request is properly directed to your agency, and we will support
              you in answering it. If a member of your team asks about their own account information,
              that request comes to us.
            </p>
            <div className={styles.short}>
              <div className={styles.shortKey}>In short</div>
              <p>
                We answer for your team&apos;s account data. You answer for your clients&apos; data,
                and we act on your instructions with it.
              </p>
            </div>
          </Section>

          <Section n="02" title="What we collect, and why it exists">
            <table className={styles.tbl}>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>What it includes</th>
                  <th>Why it exists</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Account</strong>
                  </td>
                  <td>Name, work email, role, workspace, authentication records</td>
                  <td>To create accounts, control access, and secure the workspace</td>
                </tr>
                <tr>
                  <td>
                    <strong>Client contacts</strong>
                  </td>
                  <td>Names, work emails, roles and organisations of the people you send scopes to</td>
                  <td>To deliver scopes, capture signature, and maintain the deal record</td>
                </tr>
                <tr>
                  <td>
                    <strong>Commercial records</strong>
                  </td>
                  <td>Scopes, deal values, agreements, invoices, receipts</td>
                  <td>To operate the rail and retain the record of what was agreed</td>
                </tr>
                <tr>
                  <td>
                    <strong>Interaction signals</strong>
                  </td>
                  <td>Opens, time on named sections, re-opens, forwards to new recipients</td>
                  <td>To produce heat scores and the follow-up queue — see clause 03</td>
                </tr>
                <tr>
                  <td>
                    <strong>Payment records</strong>
                  </td>
                  <td>Stripe transaction references, amounts, status, card brand and last four digits</td>
                  <td>To advance deal state on settlement and reconcile the record</td>
                </tr>
                <tr>
                  <td>
                    <strong>Technical</strong>
                  </td>
                  <td>IP address, device and browser type, access timestamps, error logs</td>
                  <td>Security, abuse prevention, and diagnosing faults</td>
                </tr>
                <tr>
                  <td>
                    <strong>Connected systems</strong>
                  </td>
                  <td>
                    Whatever the authorisation you grant permits — typically contacts and deal records
                  </td>
                  <td>To supply context to the rail and write outcomes back</td>
                </tr>
              </tbody>
            </table>
            <h3>What we do not collect</h3>
            <ul className={styles.list}>
              <li>
                Card numbers, security codes, or banking credentials. These go from your client&apos;s
                browser to Stripe and never reach Elystra. See{' '}
                <Link className={styles.inline} to="/security">
                  Security
                </Link>
                .
              </li>
              <li>The contents of your inbox beyond messages sent through the rail.</li>
              <li>Anything from a connected system outside the permissions you authorised.</li>
              <li>
                Special categories of personal information — health, biometric, or similar. The
                product has no reason to hold them and does not ask for them.
              </li>
            </ul>
          </Section>

          <Section n="03" title="Interaction tracking, stated in full">
            <p>
              Elystra records how recipients engage with a scope you send. This is not incidental
              analytics — it is a product function, and the resulting signals drive heat scoring and
              the follow-up queue.
            </p>
            <h3>What is recorded</h3>
            <ul className={styles.list}>
              <li>
                <strong>Open events</strong> — when a recipient opens the scope, and how many times.
              </li>
              <li>
                <strong>Section dwell</strong> — how long a recipient spends on named sections,
                including pricing.
              </li>
              <li>
                <strong>Forwards</strong> — when the scope is opened by someone who was not on the
                original send, which surfaces stakeholders who entered the decision late.
              </li>
              <li>
                <strong>Payment step engagement</strong> — whether a recipient began the payment step.
              </li>
            </ul>
            <h3>What is not recorded</h3>
            <ul className={styles.list}>
              <li>Keystrokes, screen recordings, or session replay.</li>
              <li>Any activity by the recipient outside the scope document itself.</li>
              <li>Location beyond what is inferable from an IP address.</li>
            </ul>
            <h3>Who sees it</h3>
            <p>
              Signals identifying a specific recipient and their behaviour on your scopes are visible
              to your agency only. No individual recipient&apos;s activity is disclosed to another
              Elystra customer, and none of it is sold.
            </p>
            <h3>Your obligation as sender</h3>
            <p>
              Because your agency is the enterprise responsible for your clients&apos; information,
              disclosure of this tracking to your recipients is your responsibility where the law that
              applies to you requires it. Elystra provides the record of what is collected — this
              clause — so that you can point to it.
            </p>
            <div className={styles.short}>
              <div className={styles.shortKey}>In short</div>
              <p>
                We track engagement with the document. We do not watch the person. What we track is
                listed above in full, and only you can see it.
              </p>
            </div>
          </Section>

          <Section n="04" title="Automated processing">
            <p>
              Elystra scores deals and ranks a follow-up queue automatically, based on the signals
              described above. This scoring is a prioritisation aid for your team.
            </p>
            <p>
              <strong>It does not make decisions about any individual.</strong> No score determines
              whether a person receives a service, a price, or a term. Pricing and commercial
              decisions are made by your agency, not by the system.
            </p>
            <p>
              Elystra does not make automated decisions producing legal effects or similarly
              significant effects on individuals. If that ever changes, this policy will be updated
              before it takes effect and affected individuals will be informed of their right to
              submit observations.
            </p>
          </Section>

          <Section n="05" title="De-identified, aggregate and business data">
            <p>
              Elystra derives statistical data from use of the service — for example, median time
              from approval to deposit, close rates by value band, and how often scope changes follow
              signature. Our Terms of Service call this Benchmark Data.
            </p>
            <h3>How personal information is removed</h3>
            <ul className={styles.list}>
              <li>
                Direct identifiers of individuals are removed irreversibly. Benchmark Data contains no
                individual names, no contact details, and no document contents.
              </li>
              <li>
                The de-identification is not reversible by us. There is no key held elsewhere that
                reconstitutes an individual&apos;s identity.
              </li>
              <li>
                Where figures are published in aggregate, they are drawn from a minimum of{' '}
                <Ph>[XX]</Ph> distinct agencies so that no single agency&apos;s figures can be
                isolated from the aggregate.
              </li>
            </ul>
            <h3>Information about businesses is not personal information</h3>
            <p>
              This policy governs personal information — information about identifiable individuals.
              It does not govern information about a business as a business: an agency&apos;s
              operating metrics, commercial performance, transaction volumes or category activity are
              not personal information under Québec law, and this policy neither grants nor restricts
              rights in them.
            </p>
            <p>
              <strong>Rights in business and Benchmark Data are set by contract, not by this policy.</strong>{' '}
              See clause 06 of our{' '}
              <Link className={styles.inline} to="/terms">
                Terms of Service
              </Link>
              , which governs how that data may be used, published, licensed and commercialised.
            </p>
            <div className={styles.short}>
              <div className={styles.shortKey}>In short</div>
              <p>
                Nothing that identifies a person survives into Benchmark Data. What a business does
                commercially is a matter for the Terms, not for this policy.
              </p>
            </div>
          </Section>

          <Section n="06" title="Who else touches this information">
            <p>
              A small number of providers hold a defined subset of data in order for the service to
              function. Each is bound by contract to use it only to provide their service to us.
            </p>
            <table className={styles.tbl}>
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Function</th>
                  <th>What it holds</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Stripe</strong>
                  </td>
                  <td>Payment processing and settlement</td>
                  <td>Card and banking data, transaction records</td>
                </tr>
                <tr>
                  <td>
                    <strong>Cloud infrastructure</strong>
                  </td>
                  <td>Hosting and managed database</td>
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
                  <td>Only what the authorisation you grant permits</td>
                </tr>
              </tbody>
            </table>
            <h3>Other disclosure</h3>
            <p>
              We disclose personal information otherwise only where required by law. Where we are
              legally compelled to disclose information belonging to your agency or your clients, we
              will give you notice before doing so unless the law prohibits it.
            </p>
            <p>
              If Elystra is acquired or merged, information may transfer as part of that transaction.
              You will be notified, and this policy continues to apply until replaced by one no less
              protective.
            </p>
          </Section>

          <Section n="07" title="Where information is held">
            <p>
              Application data is hosted in <Ph>[region]</Ph>. Some providers listed above may process
              information outside Québec.
            </p>
            <p>
              Before communicating personal information outside Québec, Elystra assesses whether the
              information would receive adequate protection there, considering the sensitivity of the
              information, the purpose of the communication, the protections in place including
              contractual terms, and the legal framework of the receiving jurisdiction. Communication
              proceeds only where that assessment supports it, and the arrangement is set out in a
              written contract.
            </p>
            <p>
              A summary of the current assessment is available on request at{' '}
              <a className={styles.mail} href="mailto:support@elystra.online">
                support@elystra.online
              </a>
              .
            </p>
          </Section>

          <Section n="08" title="How long it is kept">
            <table className={styles.tbl}>
              <thead>
                <tr>
                  <th>Information</th>
                  <th>Retention</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Account and workspace records</td>
                  <td>
                    For the life of the account, then <Ph>[XX] days</Ph> after termination
                  </td>
                </tr>
                <tr>
                  <td>Commercial records and executed agreements</td>
                  <td>For the life of the account, then as required by applicable record-keeping law</td>
                </tr>
                <tr>
                  <td>Interaction signals</td>
                  <td>For the life of the deal record</td>
                </tr>
                <tr>
                  <td>Payment records</td>
                  <td>As required by tax and accounting law</td>
                </tr>
                <tr>
                  <td>Technical and security logs</td>
                  <td>
                    <Ph>[XX] months</Ph>
                  </td>
                </tr>
                <tr>
                  <td>De-identified aggregate data</td>
                  <td>Retained indefinitely — it is no longer personal information</td>
                </tr>
              </tbody>
            </table>
            <p>
              After the applicable period, information is deleted or de-identified. Deletion is real
              deletion, not deactivation.
            </p>
          </Section>

          <Section n="09" title="Your rights">
            <p>
              If you are an individual whose personal information Elystra holds, you may exercise the
              following. We respond within 30 days.
            </p>
            <ul className={styles.list}>
              <li>
                <strong>Access</strong> — obtain confirmation of what we hold about you and a copy of
                it.
              </li>
              <li>
                <strong>Correction</strong> — have inaccurate or incomplete information corrected.
              </li>
              <li>
                <strong>Portability</strong> — receive computerised information you provided in a
                structured, commonly used technological format.
              </li>
              <li>
                <strong>Withdrawal of consent</strong> — withdraw consent where processing rests on it,
                without affecting what was lawful before.
              </li>
              <li>
                <strong>Cessation of dissemination</strong> — request that dissemination cease or that
                a link be de-indexed where the law&apos;s conditions are met.
              </li>
              <li>
                <strong>Complaint</strong> — raise a concern with us, and with the Commission d&apos;accès
                à l&apos;information du Québec if you are not satisfied with our answer.
              </li>
            </ul>
            <div className={styles.short}>
              <div className={styles.shortKey}>Where to send it</div>
              <p>
                If your information is in Elystra because an agency sent you a scope, direct the
                request to that agency — they are the enterprise responsible. If you cannot identify
                them, write to us and we will route it.
              </p>
            </div>
          </Section>

          <Section n="10" title="Confidentiality incidents">
            <p>
              Elystra maintains a register of confidentiality incidents, as required by Québec law.
            </p>
            <p>
              Where an incident presents a risk of serious injury, we notify the Commission d&apos;accès
              à l&apos;information and the individuals concerned promptly. Where your agency is the
              enterprise responsible for the information involved, we notify <strong>you</strong>{' '}
              without delay so that you can meet your own obligations, and we provide the information
              you need to assess the risk.
            </p>
            <p>We do not delay notification in order to complete an investigation first.</p>
          </Section>

          <Section n="11" title="Changes to this policy">
            <p>
              We may update this policy. Changes that materially reduce protection are notified in
              writing at least 30 days before they take effect, and where the law requires consent for
              a new purpose, we will ask for it rather than assume it.
            </p>
            <p>
              Every version is dated and archived. The version in force is stated at the top of this
              page.
            </p>
          </Section>

          <section className={`${styles.band} ${styles.close}`}>
            <div className={productStyles.wrap}>
              <div className={productStyles.state}>Contact</div>
              <h2>Questions about this policy.</h2>
              <p>
                Write to{' '}
                <a className={styles.mail} href="mailto:support@elystra.online">
                  support@elystra.online
                </a>
                . Privacy questions ahead of a contract reach the same address, and so do redlines
                from your counsel.
              </p>
              <p className={styles.footNote}>
                Elystra — Revenue infrastructure for agencies
                <br />
                Version 1.0 — <Ph>[date]</Ph>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default PrivacyPage;
