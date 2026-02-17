/**
 * Review.tsx
 * ELYSTRA — Full testimonials with stories, metrics, and faces
 * "Numbers Don't Lie" section
 */

import { motion, Variants } from 'framer-motion';
import { Star, TrendingUp, Clock, DollarSign, User, Briefcase } from 'lucide-react';

/* ---------------- Testimonial Data ---------------- */
const testimonials = [
  {
    badge: '+34% close-rate',
    badgeIcon: TrendingUp,
    badgeColor: 'emerald',
    type: 'Performance Agency',
    metric: '$2.4M ARR',
    quote: `We used to 'close' on the call verbally and then wait 1–3 weeks for signatures and payment. At least a quarter of those deals just died in the gap.

With Elystra, we build the proposal from the call, they sign and pay on the same screen, and the team gets a follow-up queue if they don't.

Our close-rate went from 19% to 32% in 60 days without touching lead volume.`,
    author: 'Founder',
    company: 'Performance & media agency',
    avatar: 'JM',
  },
  {
    badge: '3 days → 20 minutes',
    badgeIcon: Clock,
    badgeColor: 'blue',
    type: 'Creative Studio',
    metric: '18-person team',
    quote: `Before Elystra, a 'simple' proposal took us 2–3 days between decks, approvals and formatting. Clients loved the call and then cooled off while we were designing slides.

Now we hang up with the proposal already sent, signature and deposit on the same link. No PDFs, no juggling DocuSign and Stripe.

The big shift is speed: proposals that used to clog our pipeline for a week now close the same day.`,
    author: 'Founder',
    company: 'Brand & creative studio',
    avatar: 'SK',
  },
  {
    badge: '$127K recovered',
    badgeIcon: DollarSign,
    badgeColor: 'amber',
    type: 'SEO Agency',
    metric: '90 days',
    quote: `We thought our problem was 'more leads'. It wasn't. It was deal decay.

Elystra exposed exactly where retainers were dying: clients who said yes, got a PDF, then vanished.

In the first quarter we recovered $127K in retainers that would have quietly died. Same leads, same offers, same close team. The only change was closing on the rail instead of over email.`,
    author: 'Managing Partner',
    company: 'SEO agency (enterprise accounts)',
    avatar: 'RP',
  },
  {
    badge: 'Founder out of admin',
    badgeIcon: User,
    badgeColor: 'violet',
    type: 'Media Agency',
    metric: '6-person team',
    quote: `I was spending 1–2 hours a day just building proposals, chasing signatures and sending Stripe links. It felt normal because every agency does it.

Elystra killed all of that. I talk, it builds. Client signs and pays. As soon as they do, ClickUp, Slack and Xero all update without me touching anything.

I got back roughly 8–10 hours a week of founder time and we closed enough extra revenue in month one to cover a year of Elystra.`,
    author: 'Founder',
    company: 'Paid media agency',
    avatar: 'AT',
  },
  {
    badge: '$50K–$150K deals',
    badgeIcon: Briefcase,
    badgeColor: 'rose',
    type: 'Strategic Consultancy',
    metric: 'High-ticket',
    quote: `We don't sell $3K retainers. Our proposals are $50K–$150K strategy scopes. Any friction in that process costs us real money.

Elystra didn't 'simplify' the work. It killed the dead time. Our clients review the scope, sign and wire the first payment in one motion.

The biggest change is psychological: once someone says yes, there's no window for them to cool off or shop around. The rail forces a decision.`,
    author: 'Principal',
    company: 'Strategy & transformation firm',
    avatar: 'MK',
  },
];

const badgeColors: Record<string, { bg: string; border: string; text: string }> = {
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
  },
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    text: 'text-violet-400',
  },
  rose: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    text: 'text-rose-400',
  },
};

/* ---------------- Motion Variants ---------------- */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

/* ---------------- Testimonial Card ---------------- */
interface TestimonialCardProps {
  testimonial: typeof testimonials[0];
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const colors = badgeColors[testimonial.badgeColor];
  const BadgeIcon = testimonial.badgeIcon;

  return (
    <motion.div
      variants={cardVariants}
      className="group relative"
    >
      <div className="relative bg-black/30 rounded-2xl p-6 md:p-8 border border-white/[0.06] 
                     hover:border-white/[0.1] transition-all duration-300 h-full">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Main badge */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${colors.bg} border ${colors.border}`}>
            <BadgeIcon className={`w-3.5 h-3.5 ${colors.text}`} />
            <span className={`text-xs font-medium ${colors.text}`}>{testimonial.badge}</span>
          </div>
          
          {/* Type badge */}
          <div className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <span className="text-xs text-zinc-400">{testimonial.type}</span>
          </div>
          
          {/* Metric */}
          <span className="text-xs text-zinc-500">{testimonial.metric}</span>
        </div>

        {/* Stars */}
        <div className="flex gap-1 mb-5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="text-sm text-zinc-300 font-light leading-relaxed mb-6 whitespace-pre-line">
          "{testimonial.quote}"
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
          {/* Avatar */}
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(168, 85, 247, 0.1) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
            }}
          >
            <span className="text-violet-300">{testimonial.avatar}</span>
          </div>
          <div>
            <p className="text-sm text-white font-light">{testimonial.author}</p>
            <p className="text-xs text-zinc-500">{testimonial.company}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------------- Main Component ---------------- */
const Review = () => {
  return (
    <section id="proof" className="relative py-24 md:py-32 overflow-hidden bg-transparent">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 60%)',
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight mb-4">
            <span 
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Numbers Don't Lie
            </span>
          </h2>
          <p className="text-lg font-extralight text-zinc-500 max-w-xl mx-auto">
            Real results from agencies who stopped hoping and started closing.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* First row - 3 cards */}
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </motion.div>

        {/* Second row - 2 cards centered */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto"
        >
          {testimonials.slice(3, 5).map((testimonial, index) => (
            <TestimonialCard key={index + 3} testimonial={testimonial} />
          ))}
        </motion.div>

        {/* Bottom social proof strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div 
            className="inline-flex flex-wrap items-center justify-center gap-8 px-8 py-5 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="text-center">
              <p 
                className="text-2xl md:text-3xl font-light"
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                145+
              </p>
              <p className="text-xs text-zinc-500 mt-1">agencies on the rail</p>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <div className="text-center">
              <p 
                className="text-2xl md:text-3xl font-light"
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                $4.1M
              </p>
              <p className="text-xs text-zinc-500 mt-1">closed last quarter</p>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <div className="text-center">
              <p 
                className="text-2xl md:text-3xl font-light"
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                +23%
              </p>
              <p className="text-xs text-zinc-500 mt-1">avg close-rate lift</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Review;
