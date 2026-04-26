import { motion } from 'framer-motion';
import { ArrowUpRight, Briefcase, Clock3, DollarSign, Star, TrendingUp, User } from 'lucide-react';

const testimonials = [
  {
    eyebrow: 'Close-rate lift',
    badge: '+34% close-rate',
    icon: TrendingUp,
    type: 'Performance Agency',
    metric: '$2.4M ARR',
    quote:
      "We used to 'close' on the call verbally and then wait 1-3 weeks for signatures and payment. At least a quarter of those deals died in the gap. With Elystra, we build the proposal from the call, they sign and pay on the same screen, and the team gets a follow-up queue if they don't.",
    outcome: '19% to 32% in 60 days',
    author: 'Founder',
    company: 'Performance & media agency',
    avatar: 'JM',
  },
  {
    eyebrow: 'Speed to send',
    badge: '3 days to 20 minutes',
    icon: Clock3,
    type: 'Creative Studio',
    metric: '18-person team',
    quote:
      'Before Elystra, a simple proposal took us 2-3 days between decks, approvals and formatting. Now we hang up with the proposal already sent, signature and deposit on the same link. Proposals that used to clog our pipeline for a week now close the same day.',
    outcome: 'Same-day send became standard',
    author: 'Founder',
    company: 'Brand & creative studio',
    avatar: 'SK',
  },
  {
    eyebrow: 'Revenue recovered',
    badge: '$127K recovered',
    icon: DollarSign,
    type: 'SEO Agency',
    metric: 'First 90 days',
    quote:
      "We thought our problem was more leads. It wasn't. It was deal decay. Elystra exposed exactly where retainers were dying: clients who said yes, got a PDF, then vanished. Same leads, same offers, same close team. The only change was closing on the rail instead of over email.",
    outcome: 'Retainers recovered without new pipeline',
    author: 'Managing Partner',
    company: 'SEO agency (enterprise accounts)',
    avatar: 'RP',
  },
  {
    eyebrow: 'Founder leverage',
    badge: '8 to 10 hours back',
    icon: User,
    type: 'Media Agency',
    metric: '6-person team',
    quote:
      'I was spending 1-2 hours a day building proposals, chasing signatures and sending Stripe links. Elystra killed all of that. I talk, it builds. Client signs and pays. ClickUp, Slack and Xero update without me touching anything.',
    outcome: 'Month one covered a full year of Elystra',
    author: 'Founder',
    company: 'Paid media agency',
    avatar: 'AT',
  },
  {
    eyebrow: 'High-ticket conversion',
    badge: '$50K to $150K scopes',
    icon: Briefcase,
    type: 'Strategic Consultancy',
    metric: 'High-ticket',
    quote:
      "We don't sell $3K retainers. Our proposals are $50K-$150K strategy scopes. Elystra didn't simplify the work. It killed the dead time. Our clients review the scope, sign and wire the first payment in one motion. There's no window for them to cool off or shop around.",
    outcome: 'Decision velocity went up immediately',
    author: 'Principal',
    company: 'Strategy & transformation firm',
    avatar: 'MK',
  },
];

const upperTrack = [...testimonials, ...testimonials];
const lowerTrack = [...testimonials.slice(2), ...testimonials.slice(0, 2), ...testimonials.slice(2), ...testimonials.slice(0, 2)];

const metrics = [
  { value: '170+', label: 'agencies now closing on the rail' },
  { value: '$6.2M', label: 'closed last quarter through Elystra' },
  { value: '+23%', label: 'average lift in close-rate' },
];

type Testimonial = (typeof testimonials)[number];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const Icon = testimonial.icon;

  return (
    <article className="proof-card group relative w-[22rem] shrink-0 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[rgba(8,8,12,0.72)] p-6 md:w-[26rem] md:p-7">
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div
          className="absolute inset-x-10 top-0 h-24 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(167, 139, 250, 0.18) 0%, rgba(99, 102, 241, 0.12) 45%, transparent 72%)',
          }}
        />
      </div>

      <div className="relative flex items-start justify-between gap-4">
        <div className="space-y-3">
          <span className="inline-flex rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-violet-200">
            {testimonial.eyebrow}
          </span>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-400/15 bg-violet-400/10 text-violet-200">
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{testimonial.badge}</p>
              <p className="text-xs text-zinc-400">{testimonial.type}</p>
            </div>
          </div>
        </div>

        <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-zinc-400">
          {testimonial.metric}
        </span>
      </div>

      <div className="mt-6 flex items-center gap-1 text-violet-200">
        {[...Array(5)].map((_, index) => (
          <Star key={index} className="h-3.5 w-3.5 fill-current" />
        ))}
      </div>

      <blockquote className="mt-5 text-[0.98rem] leading-7 text-zinc-200/88">
        “{testimonial.quote}”
      </blockquote>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold text-white"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.34) 0%, rgba(99,102,241,0.16) 100%)',
              borderColor: 'rgba(255,255,255,0.12)',
            }}
          >
            {testimonial.avatar}
          </div>
          <div>
            <p className="text-sm text-white">{testimonial.author}</p>
            <p className="text-xs text-zinc-500">{testimonial.company}</p>
          </div>
        </div>

        <div className="max-w-[10rem] text-right">
          <p className="text-[0.65rem] uppercase tracking-[0.18em] text-zinc-500">Outcome</p>
          <p className="mt-1 text-xs leading-5 text-violet-100/90">{testimonial.outcome}</p>
        </div>
      </div>
    </article>
  );
};

const Review = () => {
  return (
    <section
      id="proof"
      className="relative flex min-h-screen items-center overflow-hidden bg-transparent py-24 md:py-28"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-[-8%] top-[10%] h-[28rem] w-[28rem] rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.22) 0%, transparent 68%)',
          }}
        />
        <div
          className="absolute bottom-[2%] right-[-4%] h-[30rem] w-[30rem] rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.28) 18%, rgba(0,0,0,0.56) 48%, rgba(0,0,0,0.76) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
          className="mx-auto mb-14 max-w-6xl px-6 text-center"
        >
          <span className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.28em] text-zinc-300/72">
            The standard is visible.
          </span>
          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-extralight tracking-[-0.04em] text-white md:text-6xl">
            Cleaner motion. Faster collection. Stronger client continuity.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base font-light leading-7 text-zinc-400 md:text-lg">
            These are the agencies that stopped running on scattered follow-up, slow scopes, and loose commitment - and started moving through one controlled rail.
          </p>
        </motion.div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-black via-black/90 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-black via-black/90 to-transparent" />

          <div className="proof-marquee mb-6">
            <div className="proof-track proof-track-forward">
              {upperTrack.map((testimonial, index) => (
                <TestimonialCard key={`upper-${testimonial.author}-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>

          <div className="proof-marquee">
            <div className="proof-track proof-track-reverse">
              {lowerTrack.map((testimonial, index) => (
                <TestimonialCard key={`lower-${testimonial.author}-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 hidden -translate-y-1/2 px-6 lg:block">
            <div className="mx-auto max-w-4xl">
              <div className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-black/55 px-8 py-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-[2px]">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-xl">
                    <p className="text-[0.72rem] uppercase tracking-[0.3em] text-violet-200">
                      Elystra operating effect
                    </p>
                    <p className="mt-3 text-2xl font-light leading-tight text-white md:text-3xl">
                      Buyers never drop into the dead air between “yes” and “paid.”
                    </p>
                  </div>
                  <div className="shrink-0 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-zinc-300">
                    Signature, payment, follow-up, tracking
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 px-6 md:grid-cols-3"
        >
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.035] px-6 py-5"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-3xl font-light tracking-tight text-white">{metric.value}</p>
                  <p className="mt-2 max-w-[15rem] text-sm leading-6 text-zinc-400">{metric.label}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-400/15 bg-violet-400/10 text-violet-200">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Review;
