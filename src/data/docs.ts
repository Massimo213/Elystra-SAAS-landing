export type DocSection = {
  slug: string;
  title: string;
  description: string;
  content: string[];
};

export const DOC_SECTIONS: DocSection[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started',
    description: 'Set up Elystra for your agency in under an hour.',
    content: [
      'Connect your Stripe account for deposit and retainer collection.',
      'Import or configure your proposal template structure.',
      'Connect CRM and PM tools from the Integrations page.',
      'Send your first proposal through the rail and track behavior from the dashboard.',
    ],
  },
  {
    slug: 'proposals',
    title: 'Proposals',
    description: 'Create, send, and track agency proposals.',
    content: [
      'Upload call transcripts, Loom links, or paste notes to generate scope.',
      'Review AI-drafted deliverables, timeline, and pricing before send.',
      'Send as a live trackable page with sign-and-pay enabled.',
      'Monitor opens, read time, and pricing section engagement.',
    ],
  },
  {
    slug: 'integrations',
    title: 'Integrations Setup',
    description: 'Wire Elystra into your existing stack.',
    content: [
      'Stripe: required for deposit and retainer collection.',
      'HubSpot / Pipedrive: sync deal state on close.',
      'Slack: internal alerts on sign, pay, and hot-deal signals.',
      'ClickUp / Asana: auto-create delivery tasks on close.',
    ],
  },
  {
    slug: 'webhooks',
    title: 'Webhooks',
    description: 'Receive real-time events from Elystra.',
    content: [
      'proposal.sent — when a proposal goes out',
      'proposal.viewed — when a client opens the proposal',
      'proposal.signed — when agreement is signed',
      'payment.received — when deposit or retainer is collected',
      'deal.closed_won — when the full close rail completes',
    ],
  },
];

export const API_ENDPOINTS = [
  {
    method: 'POST',
    path: '/v1/proposals',
    description: 'Create a proposal from scope data or transcript reference.',
  },
  {
    method: 'GET',
    path: '/v1/proposals/{id}',
    description: 'Retrieve proposal status, views, and signature state.',
  },
  {
    method: 'POST',
    path: '/v1/proposals/{id}/send',
    description: 'Send a prepared proposal to client contacts.',
  },
  {
    method: 'GET',
    path: '/v1/deals',
    description: 'List deals with heat scores and follow-up priority.',
  },
  {
    method: 'GET',
    path: '/v1/webhooks',
    description: 'List configured webhook endpoints.',
  },
];
