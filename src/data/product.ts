export type ProductModule = {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  description: string;
  bullets: string[];
};

export const PRODUCT_MODULES: ProductModule[] = [
  {
    slug: 'proposal-engine',
    name: 'Proposal Engine',
    eyebrow: 'Scope & send',
    headline: 'From call transcript to send-ready proposal in minutes',
    description:
      'Upload notes, transcripts, or recordings. Elystra mirrors your agency structure — packages, pricing logic, branding — and produces a proposal ready to send while the deal is still warm.',
    bullets: [
      'Matches your existing sections, offer architecture, and pricing logic',
      'Locks fonts, colors, and layout to your brand',
      'Compresses proposal prep from hours to minutes',
    ],
  },
  {
    slug: 'close-rail',
    name: 'Close Rail',
    eyebrow: 'Sign & pay',
    headline: 'One motion from yes to money in the account',
    description:
      'Clients review scope, sign the agreement, and pay deposit or retainer on one trackable page. No DocuSign tab. No separate Stripe link. No waiting days for payment.',
    bullets: [
      'Live, trackable proposal experience — not a static PDF',
      'Signature and payment in the same flow',
      'Deal status moves to Closed–Won when payment clears',
    ],
  },
  {
    slug: 'deal-intelligence',
    name: 'Deal Intelligence',
    eyebrow: 'Follow-up brain',
    headline: 'Behavior-driven follow-up instead of random check-ins',
    description:
      'Elystra tracks opens, time on pricing, re-opens, forwarding patterns, and stakeholder signals. Every deal gets a heat score and a ranked follow-up queue.',
    bullets: [
      'Heat scores: hot, cold, dormant, watching pricing',
      'Ranked queue of deals worth touching today',
      'Suggested moves based on actual buyer behavior',
    ],
  },
  {
    slug: 'client-portal',
    name: 'Ops & Client Portal',
    eyebrow: 'Post-close ops',
    headline: 'Closed deals become wired records and locked-in clients',
    description:
      'After sign and pay, Elystra pushes to CRM, creates PM tasks, notifies finance, and opens a client portal for agreements, invoices, and expansion requests.',
    bullets: [
      'CRM, PM, and finance automation on close',
      'Client portal for agreements, receipts, and renewals',
      'Expansion signals from portal behavior',
    ],
  },
];

export function getProductModule(slug: string) {
  return PRODUCT_MODULES.find((m) => m.slug === slug);
}
