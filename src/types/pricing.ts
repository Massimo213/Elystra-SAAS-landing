export interface PricingFeature {
  name: string;
  included: boolean;
}

export interface PricingTier {
  name: string;
  price: number;
  isMonthly: boolean;
  tagline: string;
  features: PricingFeature[];
  cta: string;
  popular?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Explorer",
    price: 0,
    isMonthly: false,
    tagline: "Start smarter. Save time for free.",
    features: [
      { name: "Connect 1 Google account", included: true },
      { name: "15 AI-generated email replies/day", included: true },
      { name: " 15 AI chatbot for email search & summary", included: true },
      { name: "Email prioritization (Top Threads Only)", included: true },
      { name: "Dark mode", included: true },
      { name: "Spam filtering", included: true },
      { name: "Community support", included: true },
    ],
    cta: "Book a Demo",
  },
  {
    name: "Professional",
    price: 12.99,
    isMonthly: true,
    tagline: "Take control of your inbox, effortlessly.",
    features: [
      { name: "Connect up to 5 email accounts", included: true },
      { name: "Unlimited AI-generated replies", included: true },
      { name: "Full AI inbox assistant (summary, recall, search)", included: true },
      { name: "Smart tone-adapting AI writing", included: true },
      { name: "Smart auto-completion", included: true },
      { name: "Set reminders on threads", included: true },
      { name: "Full inbox prioritization", included: true },
      { name: "30-day email memory", included: true },
      { name: "Priority support", included: true },
    ],
    cta: "Unlock Productivity",
    popular: true,
  },
  {
    name: "Lifetime Pro",
    price: 49.99,
    isMonthly: false,
    tagline: "One-time payment. Infinite clarity.",
    features: [
      { name: "Everything in Professional", included: true },
      { name: "Connect unlimited accounts", included: true },
      { name: "Lifetime access", included: true },
      { name: "Early access to new features", included: true },
      { name: "Invite-only beta tools (AI enhancements)", included: true },
      { name: "Priority feature requests", included: true },
      { name: "Custom AI prompt profiles", included: true },
      { name: "Dedicated founder support (1:1 access)", included: true },
    ],
  cta: "Go Lifetime",
  },
  
]
