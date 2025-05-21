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
  Bot,
  Upload,
  FileJson,
  FileText,
  Highlighter,
  Clock,
 
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
    href: '',
    label: 'About',
  },
  {
    href: '/privacy',
    label: 'Privacy',
  }
];

// Hero
export const heroData = {
  sectionSubtitle: 'AI‑GENERATED SCOPE‑OF‑WORK',
  sectionTitle: 'Stop Re‑Watching Calls. Close the Deal in ',
  decoTitle: 'Seconds',
  sectionText: 'Drop your Meetings recording and download a polished proposal in under 60 seconds. Bill sooner. Sleep earlier.'
};


// Featu  
export const featureData = {
  sectionSubtitle: 'Features',
  sectionTitle: 'From Calls to Ready Proposals in less 60 Seconds',
  sectionText: 'Transform your client calls into professional proposals automatically. No more re-watching recordings or manual note-taking.',
  features: [
    {
      icon: <Upload size={32} />,
      iconBoxColor: 'bg-blue-600',
      title: 'One-Click Upload',
      desc: 'Simply drag-and-drop your Zoom/Meet MP4 or paste audio. Zero setup—no Drive scopes, no OAuth friction.',
       
    },
    {
      icon: <Bot size={32} />,
      iconBoxColor: 'bg-cyan-500',
      title: 'AI Transcription',
      desc: 'Watch the progress bar as our AI transcribes your call in real-time. No more re-watching or manual note-taking.',
      
    },
    {
      icon: <FileJson size={32} />,
      iconBoxColor: 'bg-yellow-500',
      title: 'Smart Extraction',
      desc: 'AI automatically extracts deliverables, timeline, budget, and next steps from your conversation.',
    },
    {
      icon: <FileText size={32} />,
      iconBoxColor: 'bg-red-500',
      title: 'One-Click Proposal',
      desc: 'Generate a branded PDF or export to Notion/Markdown with a single click. Close deals faster.',
    },
    {
      icon: <Highlighter size={32} />,
      iconBoxColor: 'bg-green-500',
      title: 'Quick Edit & Review',
      desc: 'Yellow highlights show AI-detected items for easy review. Build trust and reduce errors.',
    },
    {
      icon: <Clock size={32} />,
      iconBoxColor: 'bg-purple-500',
      title: 'Save Hours',
      desc: 'Turn a 2-4 hour manual process into a 60-second automated workflow.',
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
      text: 'Uploaded a 45‑min discovery call at 9 AM, sent the AI‑generated proposal by 10. Client signed the same afternoon.',
      reviewAuthor: 'Jasmine Patel · Web‑dev freelancer',
      date: '3 days ago',
    },
    {
      title: 'Saved me a whole Saturday.',
      text: 'Writing proposals used to eat my weekends. Now it is drag‑drop, quick edit, download. Three proposals done in an hour.',
      reviewAuthor: 'Ethan Brooks · Marketing consultant',
      date: '1 week ago',
    },
    {
      title: 'No more blank‑page panic.',
      text: 'The draft is 90 % there—deliverables, timeline, pricing table. I tweak a few numbers and hit send. Total game‑changer.',
      reviewAuthor: 'Lena Kim · UX designer',
      date: '5 days ago',
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
  sectionTitle: 'Choose Your Plan',
  sectionText: 'Simple, transparent pricing for every business need',
  plans: [
    {
      name: ' Starter',
      price: 0,
      isMonthly: false,
      tagline: 'Free plan to get you started',
      features: [
        { name: '2 proposal per month', included: true },
        { name: 'Up to 10 minutes of audio/video', included: true },
        { name: 'Basic PDF export', included: true },
        { name: '7-day access to generated proposals', included: true },
      ],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Professional',
      price: 29,
      isMonthly: true,
      tagline: 'Most popular for freelancers & small teams',
      features: [
        { name: '20 proposals per month', included: true },
        { name: 'Up to 1 GB of upload per audio/video file', included: true },
        { name: 'PDF export with download options', included: true },
        { name: '30-day access to all proposals', included: true },
        { name: 'Email support', included: true },
      ],
      cta: 'Get Started',
      popular: true,
      badge: 'Most Popular',
    },
    {
      name: ' Business',
      price: 69,
      isMonthly: true,
      tagline: 'For growing teams with higher volume',
      features: [
        { name: 'Unlimited  proposals per month', included: true },
        { name: 'Up to 3 GB of upload per audio/video file', included: true },
        { name: 'PDF export with download options', included: true },
        { name: '90-day access to all proposals', included: true },
        { name: 'Priority email support', included: true },
      ],
      cta: 'Upgrade to Business',
      popular: false,
    },
  ],
};
