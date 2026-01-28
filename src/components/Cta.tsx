/**
 * Cta.tsx — Final, ruthless CTA
 * Warm, luxurious, and greed-first. Seamless with the global backdrop.
 */

import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ctaBanner } from '@/assets';
import { Signature, HandCoins, Eye, FileText, ShieldCheck } from 'lucide-react';

const glow =
  'linear-gradient(90deg, rgba(251,146,60,0.55), rgba(244,63,94,0.55), rgba(217,70,239,0.55))';

const Badge = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-md text-white/85 text-[12px]">
    <span className="text-white/90">{icon}</span>
    {label}
  </div>
);

const Cta = () => {
  return (
    <section id="cta" className="section relative overflow-hidden">
      {/* Ambient, warm accents (no blue) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-32 w-[44rem] h-[44rem] rounded-full blur-3xl opacity-50"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(251,146,60,0.22), transparent 60%)' }}
        animate={{ y: [-16, 16, -16] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-44 -right-32 w-[48rem] h-[48rem] rounded-full blur-3xl opacity-50"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(244,63,94,0.22), transparent 60%)' }}
        animate={{ y: [14, -14, 14] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container relative z-10">
        {/* Glass callout */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl overflow-hidden
                     grid grid-cols-1 lg:grid-cols-[1.2fr,1fr]"
        >
          {/* Left — Copy + CTAs */}
          <div className="relative p-8 md:p-14">
            {/* rotating conic ring */}
            <motion.div
              aria-hidden
              className="absolute -inset-[2px] rounded-[28px] blur-md opacity-70 -z-10"
              style={{ background: glow }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            />

            <div className="max-w-2xl">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-md mb-4"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span className="text-[12px] text-white/85 uppercase tracking-wide">Zero drag. All momentum.</span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[30px] leading-tight md:text-[42px] lg:text-[50px] font-black
                           text-transparent bg-clip-text bg-[linear-gradient(90deg,#f8fafc,#e2e8f0)]"
              >
                Send. Sign. Deposit. In under 60 seconds.
              </motion.h2>

              {/* Subcopy */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="mt-4 text-slate-300 text-base md:text-lg"
              >
                See exactly how agencies are closing deals 3x faster. Book a personalized demo. We will show you the entire flow from call recording to signed proposal with payment.
              </motion.p>

              {/* Benefit badges */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-6 flex flex-wrap items-center gap-2.5"
              >
                <Badge icon={<Signature className="w-3.5 h-3.5" />} label="E‑sign baked in" />
                <Badge icon={<HandCoins className="w-3.5 h-3.5" />} label="Deposit on signature" />
                <Badge icon={<FileText className="w-3.5 h-3.5" />} label="High‑conversion templates" />
                <Badge icon={<Eye className="w-3.5 h-3.5" />} label="Live tracking & alerts" />
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
              >
                

                <a href="https://calendly.com/onboarding-elystra/30min" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="h-12 px-6 rounded-full border-white/20 text-white hover:bg-white/[0.06]"
                  >
                    Schedule a Call
                  </Button>
                </a>
              </motion.div>

              {/* Micro trust */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-4 text-white/65 text-sm"
              >
                <span className="text-white font-semibold">140+</span> agencies booked a demo and never looked back. Average demo: 7 minutes. Setup: same day.
              </motion.p>
            </div>
          </div>

          {/* Right — Visual */}
          <div className="relative p-8 md:p-10 lg:p-0">
            <div className="relative h-full w-full grid place-items-center">
              {/* Glow ring behind image */}
              <motion.div
                aria-hidden
                className="absolute w-[88%] max-w-[560px] aspect-[16/12] rounded-[28px] blur-2xl opacity-70"
                style={{ background: glow }}
                animate={{ scale: [1, 1.06, 1], rotate: [0, 6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.figure
                initial={{ opacity: 0, y: 20, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative w-[90%] max-w-[620px] rounded-[28px] overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md shadow-[0_10px_80px_rgba(0,0,0,0.35)]"
              >
                <img
                  src={ctaBanner}
                  alt="Elystra proposal with e‑sign and deposit link"
                  className="w-full h-full object-cover"
                />
                {/* subtle top gloss */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-24"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.25), rgba(255,255,255,0))',
                  }}
                />
              </motion.figure>
            </div>
          </div>
        </motion.div>

        {/* Bridge hairline for seamless scroll */}
        <div
          aria-hidden
          className="mt-12 md:mt-16 h-px w-full"
          style={{
            background:
              'linear-gradient(90deg, rgba(251,146,60,0), rgba(251,146,60,0.45), rgba(244,63,94,0.45), rgba(217,70,239,0.45), rgba(217,70,239,0))',
          }}
        />
      </div>
    </section>
  );
};

export default Cta;
 