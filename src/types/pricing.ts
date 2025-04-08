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
    tagline: "Your first step to email enlightenment",
    features: [
      { name: "Connect 1 email account", included: true },
      { name: "15 AI questions per day", included: true },
      { name: "Basic email organization", included: true },
      { name: "Standard AI email writing", included: true },
      { name: "7-day email history", included: true },
      { name: "Community support", included: true },
    ],
    cta: "Start Your Journey",
  },
  {
    name: "Professional",
    price: 12.99,
    isMonthly: true,
    tagline: "For those who mean business",
    features: [
      { name: "Connect up to 5 email accounts", included: true },
      { name: "Unlimited AI questions", included: true },
      { name: "Advanced email organization", included: true },
      { name: "Smart tone-adapting AI writing", included: true },
      { name: "30-day email history", included: true },
      { name: "Priority support", included: true },
      { name: "Custom email templates", included: true },
      {name :"Set reminders on threads" , included: true}
    ],
    cta: "Unlock Your Potential",
    popular: true,
  },
  {
    name: "One time payment",
    price: 49.99,
    isMonthly: false,
    tagline: "Future-proof your email game",
    features: [
      { name: "Everything in Professional", included: true },
      { name: "Connect unlimited email accounts", included: true },
      { name: "Lifetime access to all features", included: true },
      { name: "Priority feature requests", included: true },
      { name: "Dedicated account manager", included: true },
      { name: "Early access to new features", included: true },
      { name: "Custom AI training", included: true },
      { name: "Advanced security features", included: true },
      { name: "API access", included: true },
      { name: "Team management dashboard", included: true },
    ],
    cta: "Join the Future",
  },
]; 