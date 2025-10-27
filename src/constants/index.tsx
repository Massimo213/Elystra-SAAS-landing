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
    href: 'https://app.elystra.online/agencies',
    label: 'Entreprises',
  },
  {
    href: '/privacy',
    label: 'Privacy',
  }
];

// 
export const heroData = {
  sectionSubtitle: 'AI-POWERED PROPOSAL GENERATION',
  sectionTitle: "Where Proposals Become Revenue",
  decoTitle: "Instantly.",
  sectionText: "Elystra turns your call Recording/Notes into signed, paid proposals in under 4 minutes. 145+ agencies closed $4.1M last quarter—proposal, signature, and Stripe payment in one motion."
};


// Featu  
// constants/featureData.tsx
// Outcomes-first copy — aligned with warm palette + greed triggers


export const featureData = {
  sectionSubtitle: 'THE UNFAIR ADVANTAGE',
  sectionTitle: "While competitors format PDFs, you're getting paid.",
  sectionText:
    "130 agencies across North America are already dominating their markets. Same-day proposals, 41% close rates, 92% less admin time. Your competition doesn't know this exists—yet.",
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
  sectionSubtitle: 'VERIFIED RESULTS FROM 130 AGENCIES',
  sectionTitle: "The Numbers Don't Lie",
  sectionText:
    'Real performance data from agencies using Elystra. These are not projections—these are documented results from actual North American agencies who made the switch.',
  listTitle: 'Documented Performance Gains',
  list: [
    {
      title: '3 h+',
      text: 'Average proposal volume increase: 9 → 25 per month',
    },
    {
      title: '12 h+',
      text: 'Close rate improvement: 16% → 41% conversion',
    },
    {
      title: '50 %',
      text: 'Prep time elimination—hours back to billable work',
    },
    {
      title: '130+',
      text: 'North American agencies already dominating their markets',
    },
  ],
};



// Review
export const reviewData = {
  sectionSubtitle: 'VERIFIED CASE STUDIES',
  sectionTitle: 'Real Agencies, Real Numbers',
  reviewCard: [
    {
      title: 'From 9 to 25 proposals in 30 days.',
      text: 'Exactly what Elystra promised. Our agency went from struggling with 9 monthly proposals to consistently hitting 25+. Close rate jumped from 16% to 41%. This is the competitive edge we needed.',
      reviewAuthor: 'Marcus T. · Toronto Digital Agency',
      date: '2 weeks ago',
    },
    {
      title: '92% less time on admin bullsh*t.',
      text: "I track everything. Before Elystra: 8 hours per proposal. After: 40 minutes. That's 7.3 hours per deal back to actual client work. Do the math—it's insane ROI.",
      reviewAuthor: 'Sarah K. · Vancouver Consulting',
      date: '5 days ago',
    },
    {
      title: 'Competitors are asking how we move so fast.',
      text: "Same-day proposals while they take a week. Close rates that make them question their entire process. We're not sharing our secret weapon. Sorry, not sorry.",
      reviewAuthor: 'David L. · Phoenix Marketing Group',
      date: '1 week ago',
    },
    {
      title: "41% close rate should be illegal.",
      text: "Industry average is 16%. We're hitting 41% consistently. Clients think we're psychic—but it's just Elystra making proposals that actually sell. My banker loves these numbers.",
      reviewAuthor: 'Rachel M. · Chicago Strategy Firm',
      date: '3 weeks ago',
    },
    {
      title: "This software should be classified.",
      text: "Seriously—130 agencies know about this and the rest are still losing deals. We closed $180K in 20 days after switching. If this gets popular, we're all screwed.",
      reviewAuthor: 'Anonymous · Toronto Agency Owner',
      date: '1 month ago',
    },
    {
      title: "My pipeline exploded in the best way.",
      text: "Went from dreading proposal season to actually looking forward to it. 177% more volume, 156% better close rates. Math doesn't lie—neither does my revenue.",
      reviewAuthor: 'Jessica H. · Seattle Growth Agency',
      date: '2 weeks ago',
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
