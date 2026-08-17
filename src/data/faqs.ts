export type FaqItem = { q: string; a: string };

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'What is Elystra?',
    a: 'Elystra is the commercial operating system for agencies.\n\nIt gives agencies control over the layer where money is usually won or lost: while the deal is live, while commitment is still loose, and long after the first payment lands.\n\nThat means control over:\nscope speed, deal visibility, blocker diagnosis, follow-up direction, offer intelligence, leakage visibility, commitment capture, payment flow, and client continuity.\n\nSerious agencies do not need more noise. They need more control over how revenue actually moves.',
  },
  {
    q: 'Why does Elystra matter if our agency is already selling?',
    a: 'Because selling and controlling are not the same thing.\n\nAn agency closing 30% outbound is playing a different game from one closing 55% outbound.\nAn agency closing 55% inbound is playing a different game from one closing 90% inbound.\n\nBoth may look "fine" from the outside.\nOnly one is converting anywhere near its potential.\n\nElystra matters when the question stops being "can we sell?" and becomes "how much more would this business collect if the motion were fully controlled?"',
  },
  {
    q: 'What does Elystra know that most agencies do not?',
    a: 'Elystra turns the sales motion into readable commercial truth.\n\nIt shows:\nwhat is likely blocking a live deal, why Elystra believes that, what deserves attention now, which offers are actually converting, which ones are creating friction, where revenue is leaking repeatedly, and what the team should push, change, or stop selling.\n\nThat is the intelligence layer:\ndeal intelligence, offer intelligence, leakage intelligence, follow-up direction, and pipeline truth.\n\nMost agencies feel the problem.\nVery few can see it clearly enough to act with precision.',
  },
  {
    q: 'What happens after the client says yes?',
    a: 'The relationship stays under control.\n\nThe rail continues into:\naccount visibility, files, messages, billing history, relationship memory, client-facing continuity, and expansion signal.\n\nThat matters because the first close is only part of the value.\nThe retained account is where the business compounds.\n\nOn the rail, 62% of cold buyers have converted into retained client relationships where the system was actually used properly.\nThat is what happens when the relationship does not fall back into scattered systems after payment.',
  },
  {
    q: 'How quickly does Elystra prove value?',
    a: 'Fast enough that agencies usually feel it in live motion, not theory.\n\nThe right way to judge Elystra is on real opportunities, with real money exposure, inside the actual rail.\n\nOn the rail, 72% of agencies prove value in the first month.\nIn practice, that usually means the agency recovers one or two deals in month one that would otherwise have slowed, drifted, or died.\n\nThat is why Elystra gets judged quickly.\nThe economics show up quickly.',
  },
  {
    q: 'What changes economically once Elystra is installed?',
    a: 'The same pipeline starts finishing harder.\n\nThat means:\nmore live opportunities converted, faster movement from intent to cash, less drift after verbal yes, less revenue dying in weak follow-up, better visibility into what is actually worth pushing, and stronger retained value after the close.\n\nLast quarter alone, $6.2M closed through Elystra.\nAcross agencies that actually adopted the rail properly, Elystra produced 23% average uplift.\n\nThe point is simple:\nthe value is not more software.\nThe value is more money collected from the demand you already have.',
  },
  {
    q: 'Why are agencies on the rail stronger than agencies off it?',
    a: 'Because agencies off the rail still depend on partial visibility, stitched-together tools, rep memory, and scattered follow-up.\n\nAgencies on the rail operate with:\nclearer truth, tighter movement, stronger commitment capture, better offer judgment, faster collection, and deeper control after the close.\n\nOne agency is "selling."\nThe other is compounding.\n\nThat difference widens over time.',
  },
  {
    q: 'Who should not use Elystra?',
    a: 'Agencies that are comfortable with:\nloose follow-up, scattered systems, weak visibility, manual chasing, and money leaking after buyer interest already exists.\n\nAgencies that do not want operational truth should stay away.\n\nElystra is for agencies that want the commercial layer under control.',
  },
  {
    q: 'Does Elystra work for retainers, projects, custom scopes, or enterprise deals?',
    a: 'Yes.\n\nThe rail does not care whether you sell retainers, projects, hybrid engagements, custom scopes, enterprise work, or irregular high-ticket work.\n\nYou define the commercial structure.\n\nElystra controls how that structure moves through the motion:\nfrom live opportunity, to commitment, to money, to continuity.\n\nThat is why the rail works across very different agency models.\nThe offer can change. The need for control does not.',
  },
];

export const HELP_ARTICLES = [
  ...FAQ_ITEMS.map((faq, index) => ({
    slug: faq.q
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''),
    title: faq.q,
    body: faq.a.split('\n\n')[0],
    id: index,
  })),
  {
    slug: 'elystra-pricing',
    title: 'How much does Elystra cost?',
    body: 'Elystra uses flat monthly pricing starting at $1,600/month. See app.elystra.online/pricing for current plans.',
    id: 100,
  },
  {
    slug: 'elystra-login',
    title: 'How do I log in to Elystra?',
    body: 'Go to elystra.online/login or app.elystra.online to access your agency dashboard.',
    id: 101,
  },
  {
    slug: 'elystra-integrations',
    title: 'What integrations does Elystra support?',
    body: 'Stripe, HubSpot, Slack, Google Workspace, ClickUp, Asana, Notion, Zapier, and more. See elystra.online/integrations.',
    id: 102,
  },
  {
    slug: 'elystra-docs',
    title: 'Where is Elystra documentation?',
    body: 'Product documentation is at elystra.online/docs. API reference is at elystra.online/docs/api.',
    id: 103,
  },
  {
    slug: 'elystra-support',
    title: 'How do I contact Elystra support?',
    body: 'Visit elystra.online/help or email support@elystra.online.',
    id: 104,
  },
];

export function searchHelpArticles(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return HELP_ARTICLES;
  return HELP_ARTICLES.filter(
    (a) => a.title.toLowerCase().includes(q) || a.body.toLowerCase().includes(q),
  );
}
