/**
 * 
 */

/**
 * Types
 */
import { MenuItem } from '@/types';

/**
 * Assets
 */
import {
  Twitter,
  Github,
  Linkedin,
  Instagram,
  Youtube,
  Upload,
  FileText,
  Clock,
  Signature,
  HandCoins,
  Wallet,
  Rocket,
  BarChart3,
  Link2,
  Eye,
  Timer,
  ShieldCheck,
  Calculator,
} from 'lucide-react';

import {
  
  blog1,
  blog2,
  blog3,
  avatar1,
  avatar2,
  avatar3,
} from '@/assets';

// Header
export const navMenu: MenuItem[] = [
  {
    href: '#feature',
    label: 'Features',
  },
  {
    href: '#pricing',
    label: 'Pricing',
  },
  {
    href: '#about',
    label: 'About',
  },
  {
    href: '/privacy',
    label: 'Privacy',
  }
];

// 
export const heroData = {
  sectionSubtitle: 'AI‑GENERATED SCOPE‑OF‑WORK',
  sectionTitle: "60 Seconds",
  decoTitle: "Proposals?",
  sectionText: "Meet. Drop the file. Get the signed proposal  in 60 seconds. Stop burning hours on paperwork. Start billing and outclose the competition."
};


// Featu  
// constants/featureData.tsx
// Outcomes-first copy — aligned with warm palette + greed triggers


export const featureData = {
  sectionSubtitle: 'Outcomes',
  sectionTitle: 'Send. Sign. Deposit. In under 60 seconds.',
  sectionText:
    'Turn momentum into money. Elystra extracts scope from the call, builds an on‑brand proposal, and bundles e‑sign + deposit—before the competition finds a template.',
  features: [
    {
      icon: <Signature size={28} />,
      iconBoxColor: 'bg-amber-600',
      title: 'Instant E‑Sign',
      benefit: 'Close while intent is at peak.',
      desc: 'Clients sign in one click—no back‑and‑forth, no attachments. Your “yes” arrives before lunch.',
    },
    {
      icon: <HandCoins size={28} />,
      iconBoxColor: 'bg-rose-600',
      title: 'Deposit Collected',
      benefit: 'Cash hits first.',
      desc: 'Attach a deposit link to the proposal. Typical teams collect 30–50% upfront the moment they send.',
    },
    {
      icon: <Rocket size={28} />,
      iconBoxColor: 'bg-fuchsia-600',
      title: '60‑Second Proposal',
      benefit: 'From call → send in minutes.',
      desc: 'Upload the recording. Elystra extracts deliverables, timeline, and budget. You review—then ship.',
    },
    {
      icon: <FileText size={28} />,
      iconBoxColor: 'bg-emerald-600',
      title: 'High‑Conversion Templates',
      benefit: 'Persuasion, pre‑wired.',
      desc: 'Vertical‑tuned templates that sell: consulting, marketing, transformation, and more—on brand, every time.',
    },
    {
      icon: <Link2 size={28} />,
      iconBoxColor: 'bg-orange-600',
      title: 'Money‑Moving Integrations',
      benefit: 'Ops that execute themselves.',
      desc: 'Stripe, Google Docs, Drive, Slack, HubSpot. One send updates CRM, files the doc, pings the team, and requests payment.',
    },
    {
      icon: <Eye size={28} />,
      iconBoxColor: 'bg-pink-600',
      title: 'Live Proposal Tracking',
      benefit: 'Call while they’re reading.',
      desc: 'Open alerts, read time, and section heatmaps. Follow up when attention is highest.',
    },
    {
      icon: <BarChart3 size={28} />,
      iconBoxColor: 'bg-purple-700',
      title: 'Performance Analytics',
      benefit: 'Compete with numbers.',
      desc: 'Win‑rate by template, deposit rate by deal size, fastest paths to “paid”. Replace opinions with data.',
    },
    {
      icon: <Timer size={28} />,
      iconBoxColor: 'bg-amber-700',
      title: 'Time Back, Deals Up',
      benefit: 'More sends = more wins.',
      desc: 'Stop rewatching calls and formatting docs. Reinvest hours into pipeline and price.',
    },
    {
      icon: <ShieldCheck size={28} />,
      iconBoxColor: 'bg-emerald-700',
      title: 'On‑Brand Compliance',
      benefit: 'Polished at scale.',
      desc: 'Logos, fonts, clauses, and SOW standards locked. Every proposal feels custom—without the manual work.',
    },
    {
      icon: <Calculator size={28} />,
      iconBoxColor: 'bg-rose-700',
      title: 'ROI Calculator',
      benefit: 'See the money, now.',
      desc: 'Enter deal size and volume. Watch projected deposits climb the second you switch to Elystra.',
    },
    {
      icon: <Wallet size={28} />,
      iconBoxColor: 'bg-fuchsia-700',
      title: 'Clean Outputs',
      benefit: 'Edit anywhere.',
      desc: 'PDF for free. Unlock DOCX & Google Docs on Pro. No watermarks. Full control when legal tweaks matter.',
    },
  ],
};


// Process
export const processData = {
  sectionSubtitle: 'How it works',
  sectionTitle: 'From Recording to Proposal in 3 Simple Steps',
  sectionText: 'Transform your client calls into professional proposals in minutes, not hours.',
  list: [
    {
      icon: <Upload size={32} />,
      title: 'Upload Your Recording',
      text: 'Drag in your Zoom/Meet recording. Watch the progress bar while it uploads securely.',
    },
    {
      icon: <Clock size={32} />,
      title: 'AI Drafts Your Proposal',
      text: 'Our AI listens, extracts key details, and drafts your proposal automatically.',
    },
    {
      icon: <FileText size={32} />,
      title: 'Download & Share',
      text: 'Get your polished PDF or copy to Notion. Send it, get signed, and get paid.',
    },
  ],
};

// Overview
export const overviewData = {
  sectionSubtitle: 'Overview',
  sectionTitle: 'Win Back Your Billable Hours',
  sectionText:
    'Stop burning evenings writing proposals. Drop your client call, let our AI draft the scope, and get back to paid work in minutes. More than 1,200 early adopters already swear by the time they have reclaimed.',
  listTitle: 'What You Reclaim',
  list: [
    {
      title: '3 h+',
      text: 'Average hours saved on every single proposal',
    },
    {
      title: '12 h+',
      text: 'Typical weekly time won for solo consultants & freelancers',
    },
    {
      title: '50 %',
      text: 'Increase in deal‑close speed when proposals arrive the same day',
    },
    {
      title: '1,200+',
      text: 'Early adopters already using Call → Proposal every week',
    },
  ],
};



// Review
export const reviewData = {
  sectionSubtitle: 'Reviews',
  sectionTitle: 'What Users Really Think',
  reviewCard: [
    {
      title: 'Closed the deal before lunch.',
      text: 'Uploaded a 45‑min discovery call at 9 AM, sent the AI‑generated proposal by 10. Client signed the same afternoon. Elystra is pure speed!',
      reviewAuthor: 'Jasmine P. · Freelance Web Developer',
      date: '3 days ago',
    },
    {
      title: 'Saved me a whole Saturday.',
      text: 'Writing proposals used to eat my weekends. Now it is drag‑drop, quick edit, download. Three proposals done in an hour. Unbelievable transformation.',
      reviewAuthor: 'Ethan B. · Marketing Consultant',
      date: '1 week ago',
    },
    {
      title: 'No more blank‑page panic.',
      text: 'The draft is 90% there—deliverables, timeline, pricing. I just tweak and send. If you value your time, this is a no-brainer.',
      reviewAuthor: 'Lena K. · UX/UI Designer',
      date: '5 days ago',
    },
    {
      title: "Got In Early - Best Decision!",
      text: "So glad I was one of the first to discover Elystra! It felt like a secret weapon from day one. The edge it gives me is incredible. Plus, their team actually listens to early users – felt like I got VIP treatment!",
      reviewAuthor: 'Alex R. · Growth Strategist',
      date: '2 months ago',
    },
    {
      title: "How Is This Not EVERYWHERE?!",
      text: "Seriously, I'm almost hesitant to share how good Elystra is. It's the kind of tool that gives you an actual, measurable edge. My proposal workflow is lightyears ahead. Stunned it's not famous... yet. Get it before your competitors do!",
      reviewAuthor: 'Maria S. · Sales Director',
      date: '3 weeks ago',
    },
    {
      title: "My Competitors Are Still Typing...",
      text: "While my competition is stuck in the old ways, I'm sending out stunning proposals lightning fast. Elystra isn't just a tool; it's my unfair advantage. The results? More deals, bigger clients, less stress. It's a game changer.",
      reviewAuthor: 'Chloe B. · Agency Owner',
      date: '6 weeks ago',
    },
  ],
};


// Blog
export const blogData = {
  sectionSubtitle: 'Our Blog',
  sectionTitle: 'Resource Center',
  sectionText: 'Unlock the potential of our resource center, accessing valuable information and insights for your business growth.',
  blogs: [
    {
      imgSrc: blog1,
      badge: 'Growth',
      title: 'Why customer retention is the ultimate growth strategy?',
      author: {
        avatarSrc: avatar1,
        authorName: 'John Carte',
        publishDate: 'Oct 10, 2024',
        readingTime: '8 min read',
      },
    },
    {
      imgSrc: blog2,
      badge: 'Marketing',
      title: 'Optimizing your advertising campaigns for higher ROAS',
      author: {
        avatarSrc: avatar2,
        authorName: 'Annette Black',
        publishDate: 'Jul 15, 2024',
        readingTime: '5 min read',
      },
    },
    {
      imgSrc: blog3,
      badge: 'Growth',
      title: 'How to build the ultimate tech stack for growth',
      author: {
        avatarSrc: avatar3,
        authorName: 'Ralph Edwards',
        publishDate: 'Mar 24, 2024',
        readingTime: '2 min read',
      },
    },
  ],
};

// Cta
export const ctaData = {
  text: 'Transform your client calls into professional proposals in minutes, not hours.',
};

// Footer
export const footerData = {
  links: [
    {
      title: 'Product',
      items: [
        {
          href: '#',
          label: 'Components',
        },
        {
          href: '#',
          label: 'Pricing',
        },
        {
          href: '#',
          label: 'Dashboard',
        },
        {
          href: '#',
          label: 'Feature requests',
        },
      ],
    },
    {
      title: 'Developers',
      items: [
        {
          href: '#',
          label: 'Documentation',
        },
        {
          href: '#',
          label: 'Discord server',
        },
        {
          href: '#',
          label: 'Support',
        },
        {
          href: '#',
          label: 'Glossary',
        },
        {
          href: '#',
          label: 'Changelog',
        },
      ],
    },
    {
      title: 'Company',
      items: [
        {
          href: '#',
          label: 'About',
        },
        {
          href: '#',
          label: 'Careers',
        },
        {
          href: '#',
          label: 'Blog',
        },
        {
          href: '#',
          label: 'Contact',
        },
      ],
    },
    {
      title: 'Legal',
      items: [
        {
          href: '#',
          label: 'Terms and Conditions',
        },
        {
          href: '#',
          label: 'Privacy Policy',
        },
        {
          href: '#',
          label: 'Data Processing Agreement',
        },
        {
          href: '#',
          label: 'Cookie manager',
        },
      ],
    },
  ],
  copyright: '© 2024 codewithsadee',
  socialLinks: [
    {
      href: '#',
      icon: <Twitter size={18} />,
    },
    {
      href: '#',
      icon: <Github size={18} />,
    },
    {
      href: '#',
      icon: <Linkedin size={18} />,
    },
    {
      href: '#',
      icon: <Instagram size={18} />,
    },
    {
      href: '#',
      icon: <Youtube size={18} />,
    },
  ],
};

// Pricing 
export const pricingData = { 
  sectionSubtitle: 'Pricing',
  sectionTitle: 'Simple, Transparent Pricing',
  sectionText: 'Choose the plan that fits your needs. All plans include access to our AI proposal generator.',
  plans: [
    {
      name: 'Free',
      price: 0,
      isMonthly: false,
      tagline: 'Perfect for trying out our AI proposal generator',
      features: [
        { name: '5 proposals per month', included: true },
        { name: 'Up to 2,000 characters in paste text (~500 words)', included: true },
        { name: 'Basic templates access', included: true },
        { name: 'Standard AI processing', included: true },
        { name: 'PDF export (with watermark)', included: true },
        { name: '25MB file uploads', included: true },
        { name: 'Email support', included: true },
      ],
      cta: 'Current Plan',
      popular: false,
    },
    {
      name: 'Professional',
      price: 29,
      isMonthly: true,
      tagline: 'Ideal for professionals and small businesses',
      features: [
        { name: '20 proposals per month', included: true },
        { name: 'Up to 10,000 characters in paste text (~2,500 words)', included: true },
        { name: 'Access to ALL premium templates', included: true },
        { name: 'Premium AI processing with advanced insights', included: true },
        { name: 'PDF, DOCX & Google Docs export', included: true },
        { name: 'Watermark removal', included: true },
        { name: '100MB file uploads', included: true },
        { name: 'Custom branding options', included: true },
        { name: 'Advanced analytics dashboard', included: true },
        { name: 'Priority support (within 3 hours)', included: true },
        { name: 'Referral program access', included: true },
      ],
      cta: 'Upgrade to Professional',
      popular: true,
      badge: 'Most Popular',
    },
    {
      name: 'Business',
      price: 69,
      isMonthly: false,
      tagline: 'Lifetime access - We choose 10 lucky users monthly',
      features: [
        { name: 'UNLIMITED proposals forever', included: true },
        { name: 'Up to 50,000 characters in paste text (~12,500 words)', included: true },
        { name: 'Access to exclusive enterprise templates', included: true },
        { name: 'Enterprise-grade AI with custom training', included: true },
        { name: 'All export formats (PDF, DOCX, Google Docs, PowerPoint)', included: true },
        { name: 'Full custom branding & white-labeling', included: true },
        { name: 'Advanced collaboration features', included: true },
        { name: 'API access for integrations', included: true },
        { name: 'Dedicated account manager', included: true },
        { name: 'One-time payment - no recurring fees', included: true },
        { name: 'Priority feature requests', included: true },
      ],
      cta: 'Join the Waitlist',
      popular: false,
      badge: 'Exclusive Offer',
    },
  ],
};
