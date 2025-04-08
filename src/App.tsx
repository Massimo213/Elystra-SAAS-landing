/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { ReactLenis } from 'lenis/react';
import { Routes, Route } from 'react-router-dom';

/**
 * Components
 */
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Brand from '@/components/Brand';
import Feature from '@/components/Feature';
import Process from '@/components/Process';
import Overview from '@/components/Overview';
import Review from '@/components/Review';
import Cta from '@/components/Cta';
import Pricing from '@/components/Pricing';
import PrivacyPolicy from '@/components/PrivacyPolicy';

const MainContent = () => (
  <main>
    <Hero />
    <Brand />
    <Feature />
    <Process />
    <Overview />
    <Review />
    <Pricing />
    <Cta />
    <PrivacyPolicy />
  </main>
);

const App = () => {
  return (
    <ReactLenis root>
      <div className='relative isolate overflow-hidden'>
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </ReactLenis>
  );
};

export default App;
