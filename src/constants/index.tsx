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

import p1 from '@/assets/p1.png';
import p2 from '@/assets/p2.png';
import p3 from '@/assets/p3.png';
import p4 from '@/assets/p4.png';

// Export profile images for Review component
export const profileImages = { p1, p2, p3, p4 };

// Header — strategic anchor navigation
export const navMenu: MenuItem[] = [
  {
    href: '#how-it-works',
    label: 'How It Works',
  },
  {
    href: '#the-rail',
    label: 'The Rail',
  },
  {
    href: '#proof',
    label: 'Proof',
  },
  {
    href: '#guarantee',
    label: 'Guarantee',
  },
  {
    href: '#faq',
    label: 'FAQ',
  },
];



// Featu  
// constants/featureData.tsx
// Outcomes-first copy — aligned with warm palette + greed triggers


export const featureData = {
  sectionSubtitle: 'THE UNFAIR ADVANTAGE',
  sectionTitle: "While competitors format PDFs, you're getting paid.",
  sectionText:
    "140 agencies across North America are already dominating their markets. Same-day proposals, 41% close rates, 92% less admin time. Your competition doesn't know this exists yet.",
  features: [
    {
      icon: <Signature size={28} />,
      iconBoxColor: 'bg-amber-600',
      title: 'Instant E‑Sign',
      benefit: 'Close while intent is at peak.',
      desc: 'Clients sign in one click. No back‑and‑forth, no attachments. Your "yes" arrives before lunch.',
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
      desc: 'Upload the recording. Elystra extracts deliverables, timeline, and budget. You review, then ship.',
    },
    {
      icon: <FileText size={28} />,
      iconBoxColor: 'bg-emerald-600',
      title: 'High‑Conversion Templates',
      benefit: 'Persuasion, pre‑wired.',
      desc: 'Vertical‑tuned templates that sell: consulting, marketing, transformation, and more. On brand, every time.',
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
      benefit: 'Call while they are reading.',
      desc: 'Open alerts, read time, and section heatmaps. Follow up when attention is highest.',
    },
    {
      icon: <BarChart3 size={28} />,
      iconBoxColor: 'bg-purple-700',
      title: 'Performance Analytics',
      benefit: 'Compete with numbers.',
      desc: 'Win‑rate by template, deposit rate by deal size, fastest paths to "paid". Replace opinions with data.',
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
      desc: 'Logos, fonts, clauses, and SOW standards locked. Every proposal feels custom without the manual work.',
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
  sectionSubtitle: 'VERIFIED RESULTS FROM 140 AGENCIES',
  sectionTitle: "The Numbers Don't Lie",
  sectionText:
    'Real performance data from agencies using Elystra. These are not projections. These are documented results from actual North American agencies who made the switch.',
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
      text: 'Prep time elimination. Hours back to billable work',
    },
    {
      title: '140+',
      text: 'North American agencies already dominating their markets',
    },
  ],
};



// Review
export const reviewData = {
  sectionSubtitle: 'DOCUMENTED RESULTS',
  sectionTitle: 'What Actually Happens When Agencies Switch',
  sectionDescription: 'Not testimonials. Outcomes. Real operators, real numbers, real deal velocity changes.',
  reviewCard: [
    {
      title: '$67K recovered in 30 days',
      text: 'We had 4 deals that went dark in Q3. All verbal yeses. All ghosted. First month on Elystra, we re-engaged 3 of them with the behavioral X-ray showing they were still opening the old proposals at night. Closed $67K that was walking out the door.',
      reviewAuthor: 'Brand Strategy Shop • $2.4M/year',
      date: 'Week 4 results',
      avatar: 'p1',
    },
    {
      title: '23% to 38% close rate in 6 weeks',
      text: 'Same lead volume. Same team. Same offer. The only change: proposals went out in 30 seconds instead of 4 hours, and clients signed while still on the call. No magic. Just speed. The demo made it obvious in 7 minutes.',
      reviewAuthor: 'Performance Marketing Agency • $3.1M/year',
      date: '6-week results',
      avatar: 'p2',
    },
    {
      title: 'Proposal time: 4 hours to 4 minutes',
      text: 'My ops person was spending 4-5 hours per proposal. Copy-paste from old docs, format, export PDF, attach to email, wait. Now she reviews what Elystra generates and clicks send. We went from 6 proposals/week to 18. Same headcount.',
      reviewAuthor: 'Creative Agency • $1.8M/year',
      date: '3-week results',
      avatar: 'p3',
    },
    {
      title: 'First same-call close ever',
      text: 'In 8 years running this agency, I never closed a deal on the call itself. Week one with Elystra: client said yes, I shared my screen, they signed and paid deposit while we were still talking. $12K. I almost didn\'t believe it worked.',
      reviewAuthor: 'Consulting Firm • $900K/year',
      date: 'Day 3 results',
      avatar: 'p4',
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
  text: 'See how agencies are closing deals 3x faster. Book a 7-min demo.',
};

// Footer
export const footerData = {
  copyright: '© 2026 Elystra',
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
      cta: 'Book a Demo',
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
      cta: 'Book a Demo',
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
      cta: 'Book a Demo',
      popular: false,
      badge: 'Exclusive Offer',
    },
  ],
};
