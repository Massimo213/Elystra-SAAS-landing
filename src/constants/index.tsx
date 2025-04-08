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
  
  UserRoundPen,
  Twitter,
  Github,
  Linkedin,
  Instagram,
  Youtube,
  Bot,
  Pen,
  Moon,
  Folder,
  LogIn,
  LayoutDashboard,
  PlusCircle,
  Inbox
} from 'lucide-react';

import {
  feature1,
  feature2,

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
    href: 'https://www.youtube.com/watch?v=j5JzvDKqB24&t=11s',
    label: 'Demo',
  },
  {
    href: '#privacy',
    label: 'Privacy',
  }

];

// Hero
export const heroData = {
  sectionSubtitle: 'ALL-IN-ONE AI EMAIL ASSISTANT',
  sectionTitle: 'Tired of Emails Owning You? Meet ',
  decoTitle: 'Elystra',
  sectionText:'Elystra writes, sorts, and manages your inbox so you don’t have to. One AI-powered workspace. Every account. Zero overwhelm '
};

// Feature
export const featureData = {
  sectionSubtitle: 'Features',
  sectionTitle: 'Everything You Wish Email Could Do, Now It Does  ',
  sectionText:
    'Elystra handles the writing, organizing, and account juggling. You stay focused, efficient, and 10 steps ahead  sno keyboard smashing required.',
  features: [
    {
      icon: <Bot size={32} />,
      iconBoxColor: 'bg-blue-600',
      title: 'Inbox Chatbot',
      desc: 'Ask Elystra to find, draft, summarize, or snoop,your personal ChatGPT, trained on your email life.',
      imgSrc: feature1,
    },
    {
      icon: <Pen size={32} />,
      iconBoxColor: 'bg-cyan-500',
      title: 'AI-Powered Email Writer',
      desc: 'Elystra writes your emails for you faster, smarter, and always in your voice. Whether it’s a quick reply or a formal message, just tell it what you need and hit send.',
      imgSrc: feature2,
    },
    {
      icon: <UserRoundPen size={32} />,
      iconBoxColor: 'bg-yellow-500',
      title: 'All Accounts, One Interface',
      desc: 'Manage all your inboxes in a single, seamless dashboard.',
    },
    {
      icon: <Moon size={32} />,
      iconBoxColor: 'bg-red-500',
      title: 'Dark Mode',
      desc: 'Your eyes (and soul) will thank you.',
    },
    {
      icon: <Folder size={32} />,
      iconBoxColor: 'bg-purple-500',
      title: 'Smart Folders (Coming Soon)',
      desc: 'Custom folders that auto-sort your chaos into calm.',
    },
  ],
};

// Process
export const processData = {
  sectionSubtitle: 'How it works',
  sectionTitle: 'Easy Process to Get Started',
  sectionText:
    'Discover how it works by leveraging advanced algorithms and data analysis techniques.',
  list: [
    {
      icon: <LogIn size={32} />,
      title: 'Choose your main email',
      text: 'Click on Sign In. Pick the email you want to use to manage all your inboxes. This will be your main Elystra account.',
    },
    {
      icon: < LayoutDashboard size={32} />,
      title: 'You’re taken to your dashboard',
      text: 'Right after choosing your main email, we’ll send you straight to your Elystra dashboard.',
    },
    {
      icon: <PlusCircle size={32} />,
      title: 'Click "Add Account"',
      text: 'In your dashboard, tap the “Add Account” button to connect more email accounts.',
    },
    {
      icon: <Inbox size={32} />,
      title: 'Connect your other inboxes',
      text: 'Click Add Accounts to pick the other inboxes you want Elystra to help with. That’s it—no setup, no tech stuff.',
    },
  ],
};

// Overview
export const overviewData = {
  sectionSubtitle: 'Overview',
  sectionTitle: 'The Only AI You will Ever Need For Your Inbox',
  sectionText:
    'Let Elystra manage, write, and organize your emails — so you never miss what matters.',
  listTitle: 'More than 1200+ people around the world are already using',
  list: [
    {
      title: '700',
      text: 'Active Monthly Users',
    },
    {
      title: '10+',
      text: 'Saved Hours Per User Weekly',
    },
    {
      title: '94%',
      text: 'User Satisfaction',
    },
  ],
};

// Review
// Reviews
export const reviewData = {
  sectionSubtitle: 'Reviews',
  sectionTitle: 'What Our Users Are Saying',
  reviewCard: [
    {
      title: 'Emailing feels effortless now.',
      text: 'Elystra writes most of my emails for me. It’s like having a smart assistant 24/7.',
      reviewAuthor: 'Wade Warren',
      date: ' 4 days ago',
    },
    {
      title: 'Support is fast and actually helpful.',
      text: 'Whenever I needed help, the Elystra team was quick and knew exactly what to do.',
      reviewAuthor: 'Dianne Russell',
      date: '1 week ago',
    },
    {
      title: 'Finally, something better than Gmail.',
      text: 'Other email tools just feel outdated now. Elystra is smoother, smarter, and actually fun to use.',
      reviewAuthor: 'Marvin McKinney',
      date: '2 day ago',
    },
  ],
};


// Blog
export const blogData = {
  sectionSubtitle: 'Our Blog',
  sectionTitle: 'Resource Center',
  sectionText:
    'Unlock the potential of our resource center, accessing valuable information and insights for your business growth.',
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
  text: 'Boost your productivity by working on  what actually matters.',
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
