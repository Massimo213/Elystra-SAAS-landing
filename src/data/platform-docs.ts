export type DocsNavLink = {
  id: string;
  label: string;
};

export type DocsNavGroup = {
  title: string;
  links: DocsNavLink[];
};

export const DOCS_NAV: DocsNavGroup[] = [
  {
    title: 'Platform',
    links: [
      { id: 'overview', label: 'Overview' },
      { id: 'architecture', label: 'Architecture' },
      { id: 'state-model', label: 'Deal state model' },
      { id: 'events', label: 'Event reference' },
      { id: 'data-model', label: 'Data model' },
    ],
  },
  {
    title: 'The rail',
    links: [
      { id: 'scope', label: 'Scope generation' },
      { id: 'close-rail', label: 'Signature & payment' },
      { id: 'intelligence', label: 'Deal intelligence' },
      { id: 'post-close', label: 'Post-close automation' },
      { id: 'portal', label: 'Client portal' },
    ],
  },
  {
    title: 'Integrations',
    links: [
      { id: 'integration-model', label: 'Integration model' },
      { id: 'integration-categories', label: 'Categories' },
      { id: 'automation', label: 'Zapier & Make' },
    ],
  },
  {
    title: 'API',
    links: [
      { id: 'api', label: 'Overview' },
      { id: 'auth', label: 'Authentication' },
      { id: 'deals', label: 'Deals' },
      { id: 'webhooks', label: 'Webhooks' },
      { id: 'errors', label: 'Errors & rate limits' },
    ],
  },
  {
    title: 'Operations',
    links: [
      { id: 'onboarding', label: 'Onboarding' },
      { id: 'security', label: 'Security' },
    ],
  },
];

export const DOCS_SECTION_IDS = DOCS_NAV.flatMap((g) => g.links.map((l) => l.id));

/** Legacy /docs/:slug routes → anchor on the unified docs page */
export const DOC_SLUG_REDIRECTS: Record<string, string> = {
  'getting-started': 'onboarding',
  proposals: 'scope',
  integrations: 'integration-model',
  webhooks: 'webhooks',
};
