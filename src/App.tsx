/**
 * @copyright 2024 codewithsadee
 * @license Apache-2-0
 */

import { ReactLenis } from 'lenis/react';
import { Routes, Route } from 'react-router-dom';

import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Brand from '@/components/Brand';
import Feature from '@/components/Feature';
import Review from '@/components/Review';
import Cta from '@/components/Cta';
import GetStarted from '@/components/GetStarted';
import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import Footer from '@/components/Footer';

import UrgencyStrip from '@/components/UrgencyStrip';
import BleedingCalculator from '@/components/BleedingCalculator';
import ProcessComparison from '@/components/ProcessComparison';
import FullArsenal from '@/components/FullArsenal';
import Guarantee from '@/components/Guarantee';

/**
 * LIGHTWEIGHT BACKGROUND - CSS only, no canvas
 * Replaces heavy Vortex with performant gradients
 */
const PremiumBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    {/* Base gradient */}
    <div 
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139, 92, 246, 0.15), transparent 50%),
          radial-gradient(ellipse 60% 40% at 80% 20%, rgba(168, 85, 247, 0.1), transparent 50%),
          radial-gradient(ellipse 50% 30% at 20% 80%, rgba(99, 102, 241, 0.08), transparent 50%)
        `,
      }}
    />
    
    {/* Subtle noise texture */}
    <div 
      className="absolute inset-0 opacity-[0.015]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
    
    {/* Vignette */}
    <div 
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
      }}
    />
  </div>
);

/**
 * PAGE FLOW
 */
const MainContent = () => (
  <main className="relative z-10 pt-16 md:pt-20">
    <UrgencyStrip />
    <Hero />
    <BleedingCalculator />
    <ProcessComparison />
    <FullArsenal />
    <Brand />
    <Feature />
    <Guarantee />
    <Review />
    <Cta />
    <GetStarted />
    <Footer />
  </main>
);

/**
 * Lenis - smooth scrolling
 */
const lenisOptions = {
  lerp: 0.1,
  duration: 1.2,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
};

const App = () => {
  return (
    <ReactLenis root options={lenisOptions}>
      <Analytics /> 
      <div className='relative isolate overflow-hidden bg-black min-h-screen'>
        <PremiumBackground />
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </ReactLenis>
  );
};

export default App;
