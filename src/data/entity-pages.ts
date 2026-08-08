export type PricingPlan = {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Growth',
    price: 1600,
    period: '/month',
    description: 'For agencies doing 5–15 proposals/month ready to control the close rail.',
    features: [
      'Unlimited proposals on the rail',
      'Sign-and-pay close flow',
      'Deal intelligence & follow-up queue',
      'Stripe deposit collection',
      'CRM + Slack integrations',
      'Client portal',
      'Email support',
    ],
  },
  {
    name: 'Scale',
    price: 3200,
    period: '/month',
    description: 'For agencies with volume, multiple closers, and ops complexity.',
    features: [
      'Everything in Growth',
      'Multi-user seats & closer analytics',
      'Offer intelligence & leakage reports',
      'Advanced webhook & API access',
      'Custom branding & white-label portal',
      'Priority support (same-day)',
      'Dedicated onboarding',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 5000,
    period: '/month',
    description: 'For high-volume agencies with custom scopes and enterprise deals.',
    features: [
      'Everything in Scale',
      'Unlimited seats',
      'Custom integration development',
      'SLA & dedicated account manager',
      'Security review & DPA',
      'Custom proposal architecture',
      'Quarterly revenue ops review',
    ],
  },
];

export const INTEGRATIONS = [
  { name: 'Stripe', category: 'Payments' },
  { name: 'HubSpot', category: 'CRM' },
  { name: 'Slack', category: 'Notifications' },
  { name: 'Google Drive', category: 'Documents' },
  { name: 'Google Docs', category: 'Documents' },
  { name: 'Notion', category: 'Documents' },
  { name: 'ClickUp', category: 'Project Management' },
  { name: 'Asana', category: 'Project Management' },
  { name: 'Linear', category: 'Project Management' },
  { name: 'Zapier', category: 'Automation' },
  { name: 'Zoom', category: 'Calls' },
  { name: 'Calendly', category: 'Scheduling' },
  { name: 'QuickBooks', category: 'Finance' },
  { name: 'Xero', category: 'Finance' },
  { name: 'Intercom', category: 'Support' },
  { name: 'GitHub', category: 'Development' },
  { name: 'Figma', category: 'Design' },
  { name: 'Airtable', category: 'Operations' },
];
