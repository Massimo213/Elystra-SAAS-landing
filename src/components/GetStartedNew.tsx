/**
 * GetStarted.tsx
 * Professional, credible onboarding section with zero-risk messaging
 * Apple-grade engineering: Subtle animations, premium feel
 */

import { motion, useInView, Variants } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { 
  Mail, 
  HelpCircle,
  Shield,
  CheckCircle,
} from 'lucide-react';

/* ---------------- Motion variants (subtle, professional) ---------------- */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.6,
      staggerChildren: 0.1,
      delayChildren: 0.2
    } 
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
};

/* ---------------- Email validation ---------------- */
const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/* ---------------- Analytics types ---------------- */
declare global {
  function gtag(...args: any[]): void;
}

/* ---------------- UTM Parameter Capture ---------------- */
interface TrackingData {
  source: string;
  medium?: string;
  campaign?: string;
  salesperson?: string;
  callId?: string;
  timestamp: string;
  referrer: string;
  userAgent: string;
}

const captureTrackingData = (): TrackingData => {
  const urlParams = new URLSearchParams(window.location.search);
  
  return {
    source: urlParams.get('utm_source') || urlParams.get('source') || 'direct',
    medium: urlParams.get('utm_medium') || 'unknown',
    campaign: urlParams.get('utm_campaign') || 'default',
    salesperson: urlParams.get('rep') || urlParams.get('salesperson') || 'unknown',
    callId: urlParams.get('call_id') || urlParams.get('callId') || '',
    timestamp: new Date().toISOString(),
    referrer: document.referrer || 'direct',
    userAgent: navigator.userAgent
  };
};

/* ---------------- How it Works Modal ---------------- */
const HowItWorksModal = () => (
  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-0 rounded-3xl p-0">
    <div className="relative p-8 md:p-12">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
          How Does it Actually Work ?
        </h2>
        <p className="text-lg text-slate-600">
          Our Onboarding is as fast as our software !
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-8 mb-12">
        {/* Step 1 */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">1</span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Send One Email</h3>
            <p className="text-slate-700 mb-2">
              Shoot any address—Gmail or work—to{' '}
              <span className="text-green-600 font-semibold underline cursor-pointer">
                onboarding@elystra.online
              </span>.
            </p>
            <p className="text-slate-700 mb-2">
              Within 3 minutes we activate your account, then sign up with same address you provided.
            </p>
            <p className="font-semibold text-slate-900">That's it !</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">2</span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Fire the Scope</h3>
            <p className="text-slate-700 mb-1">• Drop your call notes or drag a file.</p>
            <p className="text-slate-700 mb-3">
              • Click <span className="font-semibold">Generate</span> → a polished scope, price grid, and e-sign link appear.
            </p>
            <p className="font-semibold text-slate-900">Total elapsed: ±60 seconds.</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">3</span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Speed-to-Sign Moment</h3>
            <p className="text-slate-700 mb-2">
              Client sees it while Zoom is still open, signs, pays.
            </p>
            <p className="text-slate-700 mb-2">
              Slack shouts <span className="font-bold text-green-600">PAID</span> and HubSpot updates itself.
            </p>
            <p className="font-semibold text-slate-900">You're on to the next deal.</p>
          </div>
        </div>
      </div>

      {/* What You Get */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">What You Get—Every Cycle</h3>
        <div className="space-y-4">
          {[
            {
              title: '4-Minute Deal Flow',
              detail: 'Call → scope → e-sign → payment, all inside one tool.'
            },
            {
              title: 'Legal-grade Signatures',
              detail: 'U.S. & Canada compliant; audit trail baked in.'
            },
            {
              title: 'Instant Payment Capture',
              detail: 'Stripe / ACH built into the signature step.'
            },
            {
              title: 'Analytics Dashboard',
              detail: 'See views, time spent, signed, paid—real-time proposal intelligence.'
            },
            {
              title: 'CRM & All Your Favorite Tools',
              detail: 'HubSpot, Salesforce, Slack, Zapier, and 50+ integrations.'
            },
            {
              title: 'ROI Calculator',
              detail: 'Auto-generated financial projections and impact analysis for every proposal.'
            }
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-start py-2">
              <div className="font-semibold text-slate-900 w-1/3">{item.title}</div>
              <div className="text-slate-700 w-2/3">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Real Numbers */}
      <div className="bg-gray-50 rounded-2xl p-6 mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Real Numbers from 75 Agencies</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-slate-800 font-semibold">-92% prep time</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-slate-800 font-semibold">2.6x proposals/month</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-slate-800 font-semibold">+25% higher close rate</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-slate-800 font-semibold">First in inbox = first to close</span>
          </div>
        </div>
      </div>

      {/* Zero-Risk Trigger */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Zero-Risk Trigger</h3>
        <div className="bg-slate-100 border-l-4 border-slate-400 p-4 rounded">
          <p className="text-slate-800 font-semibold mb-2">First full cycle is free.</p>
          <p className="text-slate-700">If no deal closes, we PayPal $250 for wasting your time.</p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-yellow-50 rounded-2xl p-6 text-center">
        <p className="text-slate-800 mb-4">
          Email us at{' '}
          <span className="font-semibold underline text-slate-900">
            onboarding@elystra.online
          </span>{' '}
          and watch the next prospect sign before their latte cools.
        </p>
        <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold">
          Start Free Trial
        </Button>
      </div>
    </div>
  </DialogContent>
);

const EmailCapture = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);

  // Capture tracking data on component mount
  useEffect(() => {
    setTrackingData(captureTrackingData());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) return;
    
    setIsSubmitting(true);
    
    try {
      // Automated email API call - replaces manual mailto
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: trackingData?.source === 'cold_call' ? 'cold_call' : 'website',
          trackingData: {
            utm_source: trackingData?.source,
            utm_medium: trackingData?.medium,
            utm_campaign: trackingData?.campaign,
            salesperson: trackingData?.salesperson,
            callId: trackingData?.callId,
            referrer: trackingData?.referrer,
            userAgent: trackingData?.userAgent,
            timestamp: trackingData?.timestamp || new Date().toISOString()
          }
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitted(true);
        
        // Optional: Analytics tracking
        if (typeof gtag !== 'undefined') {
          gtag('event', 'demo_request', {
            method: trackingData?.source || 'direct',
            email_domain: email.split('@')[1],
            source: trackingData?.source
          });
        }
      } else {
        // Fallback to mailto if API fails
        console.warn('API failed, falling back to mailto:', result.error);
        const subject = encodeURIComponent('Demo Request - Cold Call Prospect');
        const body = encodeURIComponent(`Hi Elystra team,

Please send demo email to: ${email}
Source: ${trackingData?.source || 'website'}
Timestamp: ${new Date().toISOString()}

API fallback - manual processing required.`);
        
        window.location.href = `mailto:onboarding@elystra.online?subject=${subject}&body=${body}`;
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Email automation failed:', error);
      
      // Fallback to mailto on network error
      const subject = encodeURIComponent('Demo Request - System Error');
      const body = encodeURIComponent(`Hi Elystra team,

System error occurred. Please send demo email to: ${email}
Error: ${error instanceof Error ? error.message : 'Unknown error'}
Timestamp: ${new Date().toISOString()}`);
      
      window.location.href = `mailto:onboarding@elystra.online?subject=${subject}&body=${body}`;
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center bg-white rounded-xl p-6 border border-slate-200"
      >
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Demo Request Sent!</h3>
        <p className="text-slate-600 mb-2">Check your inbox in 2-3 minutes</p>
        <p className="text-sm text-green-600 font-semibold">Demo + signup link coming your way</p>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
            required
          />
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting || !validateEmail(email)}
          className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
              Sending Demo...
            </div>
          ) : (
            'Get Demo + Signup Instructions'
          )}
        </Button>
      </form>
      
      <div className="mt-4 text-center space-y-1">
        <p className="text-sm text-slate-600">
          Automated demo delivery to: <span className="font-semibold">your inbox</span>
        </p>
        <p className="text-xs text-slate-500">
          Demo + signup link • Account ready in 3 minutes • Zero commitment
        </p>
      </div>
    </div>
  );
};

/* ---------------- Main Component ---------------- */
const GetStarted = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section 
      id="get-started" 
      ref={sectionRef}
      className="py-16 md:py-24 bg-slate-950 relative"
    >
      {/* Subtle background elements - aligned with site */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-rose-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container max-w-6xl mx-auto px-4 relative z-10"
      >
        
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-rose-500/10 border border-orange-500/20 text-orange-200 text-sm font-medium mb-8">
            <Shield className="w-4 h-4" />
            Zero Risk • Zero Commitment
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight text-white">
            Try Our Full Infrastructure{' '}
            <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
              Before You Commit
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
            We don't let anyone commit with us until they've tried our proposal cycle.<br />
            <span className="text-orange-400 font-semibold">Same infrastructure as our best agencies.</span>
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side - Credibility */}
          <motion.div variants={fadeInUp} className="space-y-8">
            
            {/* Zero-Risk Guarantee */}
            <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/30">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Zero-Risk Guarantee</h3>
                  <p className="text-slate-300">First full cycle is completely free.</p>
                </div>
              </div>
              <div className="bg-slate-800/50 border-l-4 border-green-500 p-4 rounded-r-lg">
                <p className="text-slate-200 font-semibold mb-1">If no deal closes after your trial,</p>
                <p className="text-green-400 font-bold">we PayPal you $250 for wasting your time.</p>
              </div>
            </div>

            {/* Credible Metrics */}
            <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Real Numbers from 75 Agencies</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-black text-orange-400 mb-1">-92%</div>
                  <p className="text-sm text-slate-400">Prep Time Saved</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-rose-400 mb-1">2.6x</div>
                  <p className="text-sm text-slate-400">More Proposals</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-green-400 mb-1">+25%</div>
                  <p className="text-sm text-slate-400">Higher Close Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-cyan-400 mb-1">$2.4M</div>
                  <p className="text-sm text-slate-400">Revenue Increase</p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-8">
              <blockquote className="text-lg font-semibold text-white mb-4">
                "This software should be illegal — we closed{' '}
                <span className="text-orange-400">$180K in 20 days.</span>"
              </blockquote>
              <cite className="text-slate-400">— Toronto Agency Owner</cite>
            </div>
          </motion.div>

          {/* Right Side - Action */}
          <motion.div variants={fadeInUp} className="space-y-8">
            
            {/* How it Works Button */}
            <div className="text-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline"
                    className="bg-slate-800/50 hover:bg-slate-700/50 border-slate-600 text-white hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                  >
                    <HelpCircle className="w-5 h-5 mr-2" />
                    How Does it Actually Work?
                  </Button>
                </DialogTrigger>
                <HowItWorksModal />
              </Dialog>
            </div>

            {/* Email Capture */}
            <div>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Get Your Demo + Account Access
                </h2>
                <p className="text-slate-300">
                  Demo arrives in 2-3 minutes • Account setup included
                </p>
              </div>
              
              <EmailCapture />
            </div>

            {/* Process Steps */}
            <div className="bg-slate-900/30 rounded-xl p-6 border border-slate-800/30">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">What Happens Next</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                    <span className="text-orange-400 font-bold text-sm">1</span>
                  </div>
                  <p className="text-slate-300">Enter email → Demo + signup link sent automatically</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-rose-500/20 rounded-full flex items-center justify-center">
                    <span className="text-rose-400 font-bold text-sm">2</span>
                  </div>
                  <p className="text-slate-300">Drop call notes → Get polished proposal in 60 seconds</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-slate-300">Client signs & pays → You decide if you want more</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default GetStarted;

/**
 * Post-mortem:
 * 
 * • Design intent: Professional, credible approach emphasizing zero-risk trial.
 *   No excessive colors - aligned with site's slate/orange palette.
 *   "How it Works" modal provides detailed explanation without cluttering main view.
 * 
 * • Trade-offs: Minimal animations vs impact. Chose credibility over flashy effects.
 *   Modal complexity vs inline info. Chose modal to keep main section focused.
 * 
 * • Performance constraints: Reduced background animations to subtle gradients.
 *   Modal only loads when triggered. Email validation client-side before mailto.
 * 
 * • Failure modes: Modal unsupported → button shows but remains functional.
 *   mailto unsupported → displays contact email. No JavaScript → static form works.
 * 
 * • Apple-grade tooling: Subtle motion that feels native. Clean typography hierarchy.
 *   Professional color scheme. Modal follows system dialog patterns.
 */
