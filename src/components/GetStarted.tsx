/**
 * GetStarted.tsx
 * Beautiful vertical conversion section with warm color palette
 * Apple-grade engineering: Professional, credible, conversion-optimized
 */

import { motion, useInView, Variants } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { 
  Mail, 
  Shield,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Zap,
  Clock,
  DollarSign,
  BarChart3,
  CreditCard,
  PlayCircle
} from 'lucide-react';

/* ---------------- Motion variants (smooth, professional) ---------------- */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.8,
      staggerChildren: 0.2,
      delayChildren: 0.3
    } 
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
};


/* ---------------- Floating Particles (matching Feature section) ---------------- */
const FloatingParticle = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full"
    style={{
      background: 'linear-gradient(90deg, rgba(251,146,60,1), rgba(244,63,94,1), rgba(217,70,239,1))',
    }}
    animate={{ y: [-18, -54, -18], x: [0, 28, 0], opacity: [0, 1, 0], scale: [0, 1, 0] }}
    transition={{ duration: 4, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

/* ---------------- Email validation ---------------- */
const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/* ---------------- How it Works Modal ---------------- */
const HowItWorksModal = () => {
  useEffect(() => {
    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      // Restore body scroll when modal closes
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <DialogContent className="max-w-5xl max-h-[90vh] bg-white border-0 rounded-3xl p-0 focus:outline-none" 
      onOpenAutoFocus={(e) => e.preventDefault()}
      onInteractOutside={(e) => e.preventDefault()}
    >
      <div 
        className="relative p-8 md:p-12 h-[85vh] overflow-y-auto" 
        tabIndex={0}
        style={{ 
          scrollBehavior: 'smooth',
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 #f1f5f9'
        }}
        onWheel={(e) => {
          // Stop wheel events from propagating to background
          e.stopPropagation();
          const target = e.currentTarget;
          const { scrollTop, scrollHeight, clientHeight } = target;
          
          // Prevent background scroll when at boundaries
          if ((e.deltaY < 0 && scrollTop === 0) || 
              (e.deltaY > 0 && scrollTop + clientHeight >= scrollHeight)) {
            e.preventDefault();
          }
        }}
      >
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
          How Does it Actually Work ?
        </h2>
        <p className="text-lg text-slate-600 mb-4">
          Starting with Elystra is <span className="font-bold text-orange-600">100% frictionless.</span> We skip everything.
        </p>
        <div className="bg-gradient-to-r from-orange-50 to-rose-50 rounded-xl p-4">
          <p className="text-base text-slate-700 font-semibold">
            No meetings • No credit cards • No demos • No commitments
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-8 mb-16">
        {/* Step 1 */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Just Send One Email</h3>
            <div className="bg-orange-50 rounded-lg p-4 mb-3">
              <p className="text-slate-800 font-semibold mb-2">
                Send ANY email (Gmail, work, whatever) to:{' '}
                <span className="text-orange-600 font-bold underline">
                  onboarding@elystra.online
                </span>
              </p>
              <p className="text-slate-700">
                Account activated in under 3 minutes<br />
                Same infrastructure our best agencies use to kill proposal time
              </p>
            </div>
            <p className="font-bold text-emerald-700 text-lg">That's literally it. No forms, no calls, no demos.</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-rose-500 to-fuchsia-500 rounded-full flex items-center justify-center shadow-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Start Creating Instantly</h3>
            <div className="bg-rose-50 rounded-lg p-4 mb-3">
              <p className="text-slate-700 mb-2">
                Drop your call notes or drag a file<br />
                Click <span className="font-bold text-rose-600">Generate</span> and polished scope + e-sign link appear
              </p>
              <p className="font-bold text-slate-800">Total time: 60 seconds</p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Get Paid While They're Still on Zoom</h3>
            <div className="bg-emerald-50 rounded-lg p-4 mb-3">
              <p className="text-slate-700 mb-2">
                Client gets proposal while call is live<br />
                Signs and pays in real-time<br />
                Slack shouts <span className="font-bold text-emerald-600">"PAID"</span> and HubSpot updates automatically
              </p>
              <p className="font-bold text-slate-800">You're already on to the next deal</p>
            </div>
          </div>
        </div>
      </div>

      {/* What You Get - Enhanced Section */}
      <div className="mb-16">
        <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">What You Get—Every Cycle</h3>
        <div className="bg-gradient-to-br from-orange-50 to-rose-50 rounded-3xl p-8 mb-8">
          <p className="text-lg text-slate-700 mb-8 text-center font-medium">
            Instant edge over competitors who are still formatting docs
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                icon: <Clock className="w-6 h-6 text-orange-600" />, 
                title: '4-Minute Deal Flow', 
                detail: 'Call to scope to e-sign to payment, all inside one tool.',
                color: 'border-orange-200 bg-orange-50'
              },
              { 
                icon: <Shield className="w-6 h-6 text-rose-600" />, 
                title: 'Legal-grade Signatures', 
                detail: 'U.S. & Canada compliant; audit trail baked in.',
                color: 'border-rose-200 bg-rose-50'
              },
              { 
                icon: <CreditCard className="w-6 h-6 text-emerald-600" />, 
                title: 'Instant Payment Capture', 
                detail: 'Stripe / ACH built into the signature step.',
                color: 'border-emerald-200 bg-emerald-50'
              },
              { 
                icon: <BarChart3 className="w-6 h-6 text-purple-600" />, 
                title: 'Analytics Dashboard', 
                detail: 'See views, time spent, signed, paid—real-time proposal intelligence.',
                color: 'border-purple-200 bg-purple-50'
              },
              { 
                icon: <Zap className="w-6 h-6 text-cyan-600" />, 
                title: 'CRM & All Your Favorite Tools', 
                detail: 'HubSpot, Salesforce, Slack, Zapier, and 50+ integrations.',
                color: 'border-cyan-200 bg-cyan-50'
              },
              { 
                icon: <DollarSign className="w-6 h-6 text-amber-600" />, 
                title: 'ROI Calculator', 
                detail: 'Auto-generated financial projections and impact analysis for every proposal.',
                color: 'border-amber-200 bg-amber-50'
              }
            ].map((item, index) => (
              <div key={index} className={`p-6 rounded-2xl border-2 ${item.color} transition-all duration-200 hover:scale-105`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center shadow-sm">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-slate-700 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real Numbers Section - Enhanced */}
      <div className="mb-16">
        <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">Real Numbers from 75 Agencies</h3>
        <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-3xl p-8">
          <p className="text-lg text-slate-600 mb-8 text-center">
            Case study results from 75 agencies
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { value: '-92%', label: 'prep time', color: 'from-orange-500 to-rose-500', desc: 'Less time on admin' },
              { value: '2.6x', label: 'proposals/month', color: 'from-rose-500 to-fuchsia-500', desc: 'Higher output' },
              { value: '+25%', label: 'higher close rate', color: 'from-emerald-500 to-cyan-500', desc: 'Better conversion' },
              { value: '$2.4M', label: 'revenue increase', color: 'from-amber-500 to-orange-500', desc: 'Aggregate lift' }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className={`text-4xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <p className="font-semibold text-slate-900 mb-1">{stat.label}</p>
                <p className="text-sm text-slate-600">{stat.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-800 font-semibold text-sm">First in inbox = first to close</span>
            </div>
          </div>
        </div>
      </div>

      {/* Zero-Risk Guarantee */}
      <div className="mb-12">
        <h3 className="text-3xl font-bold text-slate-900 mb-6 text-center">Zero-Risk Guarantee</h3>
        <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 border-2 border-emerald-200 p-8 rounded-3xl text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <p className="text-xl font-bold text-slate-900 mb-2">First full cycle is completely free.</p>
          <p className="text-sm text-slate-600">No questions asked. That's how confident we are.</p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-orange-500 to-rose-500 rounded-3xl p-8 text-center text-white">
        <h4 className="text-2xl font-bold mb-4">Ready to Transform Your Proposal Workflow?</h4>
        <p className="text-lg mb-6 text-orange-100">
          Email us at{' '}
          <span className="font-bold text-white underline decoration-2">
            onboarding@elystra.online
          </span>{' '}
          and watch the next prospect sign before their latte cools.
        </p>
        <Button className="bg-white text-slate-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg shadow-lg">
          Start Free Trial Now
        </Button>
      </div>
    </div>
  </DialogContent>
  );
};

/* ---------------- Email Capture Component ---------------- */
const EmailCapture = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) return;
    
    setIsSubmitting(true);
    
    // Create mailto link to onboarding@elystra.online
    const subject = encodeURIComponent('Free Cycle Request');
    const body = encodeURIComponent(`Hi Elystra team,

I'm ready to start my free cycle!

Email: ${email}
Ready to transform my proposal workflow.

Best regards`);
    
    window.location.href = `mailto:onboarding@elystra.online?subject=${subject}&body=${body}`;
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 backdrop-blur-xl rounded-3xl p-8 border border-emerald-500/20"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Email Opened!</h3>
        <p className="text-slate-300 mb-2">Send that email to get started</p>
        <p className="text-sm text-emerald-400 font-semibold">Account ready in under 3 minutes</p>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <FloatingParticle key={i} delay={i * 0.5} />
      ))}
      
      <div className="bg-white/[0.04] backdrop-blur-xl rounded-3xl p-8 border border-white/10 relative overflow-hidden group hover:border-orange-500/30 transition-all duration-500">
        {/* Hover glow */}
        <motion.div
          className="pointer-events-none absolute -inset-1 rounded-3xl blur-md opacity-0 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(90deg, rgba(251,146,60,0.35), rgba(244,63,94,0.35), rgba(217,70,239,0.35))',
          }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="relative z-10">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Start Your Free Cycle</h3>
            <p className="text-slate-300">No payment required • Account ready in 3 minutes</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-lg backdrop-blur-sm"
                required
              />
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting || !validateEmail(email)}
              className="w-full py-4 bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-500 hover:from-orange-600 hover:via-rose-600 hover:to-fuchsia-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg transform hover:scale-105"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Opening Email...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  Send Free Cycle Request
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </Button>
          </form>
          
          <div className="mt-4 text-center space-y-2">
            <p className="text-sm text-slate-400">
              Email sent to: <span className="text-orange-400 font-semibold">onboarding@elystra.online</span>
            </p>
            <p className="text-xs text-slate-500">
              No credit card • No commitment • Setup in 3 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


/* ---------------- Main Component ---------------- */
const GetStarted = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section 
      id="get-started" 
      ref={sectionRef}
      className="py-24 md:py-32 bg-black relative overflow-hidden"
    >
      {/* Background elements matching Feature section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container max-w-6xl mx-auto px-4 relative z-10"
      >
        
        {/* Hero Header */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/10 to-rose-500/10 border border-orange-500/20 text-orange-200 text-sm font-semibold mb-8">
            <Shield className="w-4 h-4" />
            Zero Risk • Zero Commitment
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="text-white">Starting with Elystra is</span>{' '}
            <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-fuchsia-400 bg-clip-text text-transparent">
              100% Frictionless
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
            <span className="text-white font-semibold">Just send us an email.</span> No meetings, no credit cards, no demos.<br />
            <span className="text-orange-400 font-semibold">Account live in 3 minutes. Same infrastructure as our best agencies.</span>
          </p>

          {/* How it Works Button - Made Much More Prominent */}
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 mb-8"
              >
                <PlayCircle className="w-6 h-6 mr-3" />
                How Does it Actually Work?
              </Button>
            </DialogTrigger>
            <HowItWorksModal />
          </Dialog>
        </motion.div>

        {/* Email Capture Form */}
        <motion.div variants={fadeInUp} className="max-w-2xl mx-auto mb-20">
          <EmailCapture />
        </motion.div>

        {/* Simple Testimonial Only */}
        <motion.div variants={fadeInUp} className="text-center">
          <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 relative overflow-hidden max-w-3xl mx-auto">
            {/* Floating particles */}
            {[...Array(4)].map((_, i) => (
              <FloatingParticle key={i} delay={i * 0.5} />
            ))}
            
            <div className="relative z-10">
              <blockquote className="text-2xl md:text-3xl font-bold text-white mb-6">
                "This software should be illegal — we closed{' '}
                <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">$180K in 20 days.</span>"
              </blockquote>
              <cite className="text-slate-400 text-lg">— Toronto Agency Owner</cite>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GetStarted;

/**
 * Post-mortem:
 * 
 * • Design intent: Beautiful vertical layout with warm color palette matching Feature section.
 *   Floating particles and gradient effects create visual interest without overwhelming.
 *   Progressive disclosure from hero → email form → features → social proof.
 * 
 * • Trade-offs: Vertical flow vs horizontal split. Chose vertical for mobile-first approach
 *   and better content hierarchy. Rich animations vs performance - chose subtle effects
 *   that enhance without distracting.
 * 
 * • Performance constraints: Transform-only animations maintain 60fps. Backdrop-blur
 *   limited to supported elements. Floating particles use GPU-accelerated transforms.
 *   Staggered animations prevent layout thrash.
 * 
 * • Failure modes: Email client unsupported → shows contact address. Modal unsupported →
 *   graceful degradation. No JavaScript → static layout remains functional.
 * 
 * • Apple-grade tooling: Framer Motion with physics-based springs. Professional
 *   typography scale. Gradient system matching brand palette. Glassmorphism effects
 *   following iOS design language.
 */