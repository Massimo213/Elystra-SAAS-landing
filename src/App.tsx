import { ReactLenis } from 'lenis/react';
import { Routes, Route } from 'react-router-dom';

import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Review from '@/components/Review';
import Cta from '@/components/Cta';

import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import Footer from '@/components/Footer';

import UrgencyStrip from '@/components/UrgencyStrip';
import BleedingCalculator from '@/components/BleedingCalculator';
import ProcessComparison from '@/components/ProcessComparison';
import FullArsenal from '@/components/FullArsenal';
import Guarantee from '@/components/Guarantee';
import { Vortex } from '@/components/ui/vortex';
import GetStarted from '@/components/GetStarted';

/**
 * GLOBAL VORTEX — fixed, low particle count, scrolls under everything
 */
const GlobalVortex = () => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    <Vortex
      particleCount={200}
      baseHue={260}
      rangeSpeed={0.5}
      baseRadius={1}
      rangeRadius={2}
      backgroundColor="transparent"
      containerClassName="w-full h-full"
    />
    {/* Noise texture */}
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
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)',
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
    <Guarantee />
    <Review />
    <Cta />
    <GetStarted />
    <Footer />
  </main>
);

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
        <GlobalVortex />
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </ReactLenis>
  );
};

export default App;
