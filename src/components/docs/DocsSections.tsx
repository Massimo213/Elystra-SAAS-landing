import type { ReactNode } from 'react';
import styles from '../pages/DocsPage.module.css';

const Code = ({ children }: { children: ReactNode }) => (
  <code className={styles.inlineCode}>{children}</code>
);

const DocsSections = () => (
  <>
    <section id="overview" className={styles.section}>
      <h2>Overview</h2>
      <p className={styles.lead}>Elystra is revenue infrastructure for marketing and advertising agencies.</p>
      <p>
        An agency deal passes through four operational stages: a scope is produced and sent, the client
        agrees and pays, the agency applies pressure while the deal is open, and the closed deal is handed
        to delivery and finance. In most agencies these four stages run across four or more disconnected
        systems, with a person responsible for carrying state between them.
      </p>
      <p>
        Elystra runs all four as one sequence. <strong>State transitions are triggered by observed events</strong>{' '}
        — a scope opened, a signature captured, a payment cleared — rather than by manual updates. Every
        system the agency already operates receives the resulting state change automatically.
      </p>
      <div className={styles.note}>
        <div className={styles.noteKey}>Core principle</div>
        <p>
          A deal is not closed when someone marks it closed. A deal is closed when funds clear. Financial
          settlement is the authoritative state transition, and every downstream action is triggered from
          it.
        </p>
      </div>
    </section>

    <section id="architecture" className={styles.section}>
      <h2>Architecture</h2>
      <p className={styles.lead}>
        Elystra is an event-driven system. Every component reacts to emitted events rather than being
        invoked directly.
      </p>
      <p>Three layers:</p>
      <ul className={styles.list}>
        <li>
          <strong>The rail</strong> — the client-facing surface where a scope is reviewed, signed, and paid.
          One document, one session, fully instrumented.
        </li>
        <li>
          <strong>The event bus</strong> — every action on the rail emits a typed event. Events are the only
          mechanism by which state advances or downstream systems are written to.
        </li>
        <li>
          <strong>The connector layer</strong> — subscribers that translate events into writes against the
          agency&apos;s own systems. Connectors fail independently and never block a state transition.
        </li>
      </ul>
      <p>
        State lives in Elystra. Connected systems hold copies, kept current by event-driven writes. This
        means an integration outage degrades reporting in a downstream tool, never the deal itself.
      </p>
    </section>

    <section id="state-model" className={styles.section}>
      <h2>Deal state model</h2>
      <p className={styles.lead}>
        Every deal occupies exactly one state. Transitions are event-driven and one-directional except where
        noted.
      </p>
      <table className={styles.tbl}>
        <thead>
          <tr>
            <th>State</th>
            <th>Meaning</th>
            <th>Entered by</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.cellKey}>draft</td>
            <td>Scope generated from source input. Not yet visible to the client.</td>
            <td className={styles.cellKey}>scope.created</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>sent</td>
            <td>Scope delivered to recipients. Tracking active.</td>
            <td className={styles.cellKey}>scope.sent</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>engaged</td>
            <td>Recipient has opened the scope. Heat scoring begins.</td>
            <td className={styles.cellKey}>scope.opened</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>signed</td>
            <td>
              Agreement executed. <strong>Not yet closed</strong> — settlement pending.
            </td>
            <td className={styles.cellKey}>signature.captured</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>closed_won</td>
            <td>
              <strong>Funds cleared.</strong> Authoritative close. Fires all post-close automation.
            </td>
            <td className={styles.cellKey}>payment.cleared</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>closed_lost</td>
            <td>Deal terminated. Loss reason captured for benchmarking.</td>
            <td className={styles.cellKey}>deal.lost</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>dormant</td>
            <td>
              No recipient activity beyond the configured threshold. Reversible to <Code>engaged</Code>.
            </td>
            <td className={styles.cellKey}>deal.dormant</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.note}>
        <div className={styles.noteKey}>Why signed ≠ closed</div>
        <p>
          Separating <Code>signed</Code> from <Code>closed_won</Code> is deliberate. A signature is an
          expression of intent; cleared funds are the settlement of it. Agencies that treat signature as
          close carry unrecognised revenue and trigger delivery against money that has not arrived. Elystra
          makes this distinction structural rather than a matter of discipline.
        </p>
      </div>
    </section>

    <section id="events" className={styles.section}>
      <h2>Event reference</h2>
      <p className={styles.lead}>
        Every meaningful action on the rail emits an event. Events drive state transitions, connector writes,
        intelligence scoring, and webhooks.
      </p>
      <table className={styles.tbl}>
        <thead>
          <tr>
            <th>Event</th>
            <th>Emitted when</th>
            <th>Triggers</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.cellKey}>scope.created</td>
            <td>A scope is generated from source input</td>
            <td>CRM record write</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>scope.sent</td>
            <td>The scope is delivered to recipients</td>
            <td>Tracking activation, CRM stage update</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>scope.opened</td>
            <td>A recipient opens the scope</td>
            <td>Heat scoring, notification</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>scope.section_viewed</td>
            <td>A recipient dwells on a named section</td>
            <td>Intelligence signal</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>scope.forwarded</td>
            <td>The scope is opened by a new recipient</td>
            <td>Stakeholder detection, notification</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>signature.captured</td>
            <td>The agreement is executed</td>
            <td>
              State → <Code>signed</Code>, archival
            </td>
          </tr>
          <tr>
            <td className={styles.cellKey}>payment.initiated</td>
            <td>The client begins the payment step</td>
            <td>Intelligence signal</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>payment.cleared</td>
            <td>
              <strong>Funds settle</strong>
            </td>
            <td>
              State → <Code>closed_won</Code>, full cascade
            </td>
          </tr>
          <tr>
            <td className={styles.cellKey}>payment.failed</td>
            <td>A payment attempt does not settle</td>
            <td>Notification, retry flow</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>deal.lost</td>
            <td>The deal is marked terminated</td>
            <td>Loss capture, benchmarking write</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>portal.request_created</td>
            <td>A client submits a request from the portal</td>
            <td>Expansion signal, notification</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section id="data-model" className={styles.section}>
      <h2>Data model</h2>
      <p className={styles.lead}>Five primary objects.</p>
      <table className={styles.tbl}>
        <thead>
          <tr>
            <th>Object</th>
            <th>Description</th>
            <th>Key relations</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.cellKey}>deal</td>
            <td>The commercial opportunity. Holds state, value, and timestamps.</td>
            <td>→ scope, client, payments</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>scope</td>
            <td>The priced document sent to the client. Versioned.</td>
            <td>→ deal, sections, signals</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>client</td>
            <td>The counterparty organisation and its contacts.</td>
            <td>→ deals, portal access</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>payment</td>
            <td>A settlement attempt against a deal. Deposit, retainer, or instalment.</td>
            <td>→ deal</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>signal</td>
            <td>A recorded behavioural observation against a scope.</td>
            <td>→ scope, heat score</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section id="scope" className={styles.section}>
      <h2>Scope generation</h2>
      <p className={styles.lead}>
        A scope is produced from source input and mapped against the agency&apos;s own commercial structure.
      </p>
      <p>
        Accepted inputs include call notes, meeting transcripts, and call recordings. The generation step
        resolves the input against the workspace&apos;s configured service packages, tiers, and pricing rules,
        then renders it into the agency&apos;s own document template.
      </p>
      <p>
        Output is a live, versioned, trackable document — not a static file. Every recipient interaction
        with it emits signals against the scope object.
      </p>
      <h3>Configuration</h3>
      <p>
        Each workspace defines its package library, pricing logic, and brand parameters once. Generation
        resolves against that configuration, so output structure is consistent across every scope the agency
        sends.
      </p>
    </section>

    <section id="close-rail" className={styles.section}>
      <h2>Signature &amp; payment</h2>
      <p className={styles.lead}>
        Agreement execution and settlement occur in the same session, on the same surface.
      </p>
      <p>
        The client reviews the scope, executes the agreement, and completes the deposit or first retainer
        without leaving the document. There is no third-party signing redirect and no separately issued
        payment link.
      </p>
      <p>
        The two actions emit distinct events. <Code>signature.captured</Code> advances the deal to{' '}
        <Code>signed</Code>. <Code>payment.cleared</Code> advances it to <Code>closed_won</Code> and fires
        the post-close cascade. A signed deal with unsettled payment remains open and continues to appear in
        the follow-up queue.
      </p>
      <h3>Payment types</h3>
      <ul className={styles.list}>
        <li>
          <strong>Deposit</strong> — a fixed or percentage amount collected at execution.
        </li>
        <li>
          <strong>Retainer</strong> — the first period of a recurring arrangement.
        </li>
        <li>
          <strong>Full</strong> — the total contract value collected at execution.
        </li>
      </ul>
    </section>

    <section id="intelligence" className={styles.section}>
      <h2>Deal intelligence</h2>
      <p className={styles.lead}>
        Recipient behaviour on a live scope is recorded as signals and resolved into a heat score per deal.
      </p>
      <p>
        Signals include open events, per-section dwell time, re-opens, and opens from recipients not on the
        original send — which surfaces stakeholders who entered the decision after the conversation.
      </p>
      <h3>Heat score</h3>
      <p>
        Each open deal carries a live score derived from signal recency, frequency, and type. Scores resolve
        into a ranked follow-up queue ordered by movement rather than by age, so a deal that re-opened this
        morning outranks one that has been sitting for three weeks.
      </p>
      <h3>Dormancy</h3>
      <p>
        A deal with no signal activity beyond the configured threshold transitions to <Code>dormant</Code>.
        This is reversible — any new signal returns it to <Code>engaged</Code> and restores it to the queue.
      </p>
    </section>

    <section id="post-close" className={styles.section}>
      <h2>Post-close automation</h2>
      <p className={styles.lead}>
        The <Code>payment.cleared</Code> event fires every downstream write in the same transaction cycle.
      </p>
      <table className={styles.tbl}>
        <thead>
          <tr>
            <th>Target</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.cellKey}>CRM</td>
            <td>Record created or advanced to the closed-won stage with settled value</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>Accounting</td>
            <td>Invoice raised and revenue record written against the settlement</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>Project</td>
            <td>Tasks and project structure created from the executed scope</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>Communication</td>
            <td>Notification posted to the configured channel</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>Storage</td>
            <td>Executed agreement and receipt archived to the configured location</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>Portal</td>
            <td>Client portal provisioned and access issued</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section id="portal" className={styles.section}>
      <h2>Client portal</h2>
      <p className={styles.lead}>Every closed client receives a persistent surface holding their commercial record.</p>
      <p>
        The portal contains executed agreements, invoices, receipts, and renewal records. Clients can submit
        requests directly from it; each submission emits <Code>portal.request_created</Code> and is surfaced
        to the agency as an expansion signal.
      </p>
    </section>

    <section id="integration-model" className={styles.section}>
      <h2>Integration model</h2>
      <p className={styles.lead}>
        Elystra connects to the systems an agency already operates. Replacement is not required, and
        historical data migration is not required.
      </p>
      <h3>Direction</h3>
      <p>
        <strong>Inbound</strong> connections supply context to the rail — contacts, pipeline records,
        correspondence. <strong>Outbound</strong> connections receive state changes from the rail, primarily
        on <Code>payment.cleared</Code>.
      </p>
      <h3>Write timing</h3>
      <p>
        Outbound writes execute on event emission, not on a polling schedule. When a payment clears, the CRM
        record, accounting entry, project tasks, and team notification are written in the same transaction
        cycle.
      </p>
      <h3>Failure handling</h3>
      <p>
        Writes are retried with exponential backoff. A failed write does not block the state transition — the
        deal advances and the write is queued. Persistent failures surface in the integrations panel with the
        failing payload available for inspection.
      </p>
    </section>

    <section id="integration-categories" className={styles.section}>
      <h2>Integration categories</h2>
      <table className={styles.tbl}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Direction</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.cellKey}>CRM &amp; pipeline</td>
            <td>Inbound · Outbound</td>
            <td>Contact and deal sync; stage advancement on state change</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>Communication</td>
            <td>Inbound · Outbound</td>
            <td>Send from the agency&apos;s own inbox; channel notification on state change</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>Payments</td>
            <td>In-rail</td>
            <td>Settlement capture in the close flow</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>Accounting</td>
            <td>Outbound</td>
            <td>Invoice and revenue record creation on settlement</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>Project &amp; delivery</td>
            <td>Outbound</td>
            <td>Task and project creation from the executed scope</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>Storage</td>
            <td>Outbound</td>
            <td>Archival of agreements, invoices, and receipts</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>Automation</td>
            <td>Outbound</td>
            <td>All events exposed as triggers</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section id="automation" className={styles.section}>
      <h2>Zapier &amp; Make</h2>
      <p className={styles.lead}>Every event in the reference is available as a trigger inside both platforms.</p>
      <p>
        This allows an agency to route Elystra state changes into any system without a dedicated connector.
        Common patterns include writing settled deals to a data warehouse, posting to internal reporting, and
        triggering client-specific onboarding sequences.
      </p>
      <p>Payload structure matches the webhook schema documented below.</p>
    </section>

    <section id="api" className={styles.section}>
      <h2>API</h2>
      <p className={styles.lead}>
        REST over HTTPS. All requests and responses are JSON. Authentication is by bearer token.
      </p>
      <h3>Base URL</h3>
      <pre className={styles.pre}>
        <span className={styles.codeComment}>https://api.elystra.online/v1</span>
      </pre>
      <h3>Conventions</h3>
      <ul className={styles.list}>
        <li>
          Object IDs are prefixed by type — <Code>deal_</Code>, <Code>scp_</Code>, <Code>cli_</Code>,{' '}
          <Code>pay_</Code>.
        </li>
        <li>Timestamps are ISO 8601 in UTC.</li>
        <li>
          Monetary values are integers in the smallest currency unit, with an explicit <Code>currency</Code>{' '}
          field.
        </li>
        <li>
          List endpoints are cursor-paginated via <Code>starting_after</Code>.
        </li>
      </ul>
    </section>

    <section id="auth" className={styles.section}>
      <h2>Authentication</h2>
      <p className={styles.lead}>API keys are issued per workspace from developer settings.</p>
      <p>
        Include the key as a bearer token on every request. Keys are scoped and revocable; a revoked key
        fails immediately rather than at next rotation. Keys are shown once at creation and cannot be
        retrieved afterward.
      </p>
      <pre className={styles.pre}>
        <span className={styles.codeProp}>curl</span> https://api.elystra.online/v1/deals \{'\n'}
        {'  '}<span className={styles.codeProp}>-H</span>{' '}
        <span className={styles.codeString}>&quot;Authorization: Bearer $ELYSTRA_API_KEY&quot;</span>
      </pre>
    </section>

    <section id="deals" className={styles.section}>
      <h2>Deals</h2>
      <p className={styles.lead}>Retrieve, list, and filter deals by state.</p>
      <pre className={styles.pre}>
        <span className={styles.codeProp}>GET</span> /v1/deals/:id
      </pre>
      <pre className={styles.pre}>{`{
  "id": "deal_8Fk2mQ",
  "state": "closed_won",
  "value": 1850000,
  "currency": "CAD",
  "scope_id": "scp_Ld91xR",
  "client": {
    "id": "cli_3Nb7vP",
    "name": "Northbound Retail Group"
  },
  "signed_at": "2026-08-14T15:22:08Z",
  "settled_at": "2026-08-14T15:31:44Z",
  "downstream": {
    "crm": "written",
    "accounting": "written",
    "project": "written"
  }
}`}</pre>
    </section>

    <section id="webhooks" className={styles.section}>
      <h2>Webhooks</h2>
      <p className={styles.lead}>Subscribe to any event in the reference. Payloads are signed.</p>
      <p>
        Verify the signature header before processing. Delivery is retried on non-2xx response with
        exponential backoff over 24 hours. Endpoints should respond within 5 seconds and process
        asynchronously.
      </p>
      <pre className={styles.pre}>{`{
  "event": "payment.cleared",
  "created_at": "2026-08-14T15:31:44Z",
  "data": {
    "deal_id": "deal_8Fk2mQ",
    "amount": 555000,
    "currency": "CAD",
    "type": "deposit",
    "previous_state": "signed",
    "new_state": "closed_won"
  }
}`}</pre>
    </section>

    <section id="errors" className={styles.section}>
      <h2>Errors &amp; rate limits</h2>
      <p className={styles.lead}>
        Standard HTTP status codes. Error bodies include a machine-readable code and a human-readable message.
      </p>
      <table className={styles.tbl}>
        <thead>
          <tr>
            <th>Status</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.cellKey}>400</td>
            <td>Malformed request or invalid parameters</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>401</td>
            <td>Missing, malformed, or revoked API key</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>403</td>
            <td>Key valid but not scoped for the requested resource</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>404</td>
            <td>Resource does not exist in this workspace</td>
          </tr>
          <tr>
            <td className={styles.cellKey}>429</td>
            <td>
              Rate limit exceeded — see <Code>Retry-After</Code>
            </td>
          </tr>
          <tr>
            <td className={styles.cellKey}>5xx</td>
            <td>Server error. Safe to retry with backoff.</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.note}>
        <div className={styles.noteKey}>Rate limits</div>
        <p>
          Default limit is 1,000 requests per minute per workspace. Responses include{' '}
          <Code>X-RateLimit-Remaining</Code> and <Code>X-RateLimit-Reset</Code>.
        </p>
      </div>
    </section>

    <section id="onboarding" className={styles.section}>
      <h2>Onboarding</h2>
      <p className={styles.lead}>Workspace setup runs from configuration through first scope sent.</p>
      <ul className={styles.list}>
        <li>
          <strong>Workspace configuration</strong> — package library, pricing logic, and brand parameters
          defined once.
        </li>
        <li>
          <strong>Connection authorisation</strong> — the agency authorises the systems it operates. Mapping
          is configured on the Elystra side.
        </li>
        <li>
          <strong>Baseline capture</strong> — current revenue-cycle metrics recorded before any change, so
          subsequent measurement is against the agency&apos;s own prior numbers.
        </li>
        <li>
          <strong>First send</strong> — a real scope generated and sent through the rail. Activation is
          measured on this event, not on account creation.
        </li>
      </ul>
    </section>

    <section id="security" className={styles.section}>
      <h2>Security</h2>
      <p className={styles.lead}>Data handling, access control, and payment security.</p>
      <ul className={styles.list}>
        <li>
          <strong>Transport</strong> — all traffic over TLS. HTTP requests are rejected, not redirected.
        </li>
        <li>
          <strong>At rest</strong> — data encrypted at rest. Executed agreements are stored immutably.
        </li>
        <li>
          <strong>Payment data</strong> — card details are never transmitted to or stored by Elystra.
          Settlement is handled by the payment processor directly.
        </li>
        <li>
          <strong>Access</strong> — workspace-scoped. No cross-workspace read paths exist at the data layer.
        </li>
        <li>
          <strong>Keys</strong> — scoped, revocable, shown once at creation.
        </li>
      </ul>
      <div className={styles.divider} />
    </section>
  </>
);

export default DocsSections;
