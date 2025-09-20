/**
 * @copyright 2024 codewithsadee
 * @license Apache-2-0
 */

/**
 * Node modules
 */
import { ReactLenis } from 'lenis/react';
import { Routes, Route } from 'react-router-dom';

/**
 * Components
 */
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Brand from '@/components/Brand';
import Feature from '@/components/Feature';
import Review from '@/components/Review';
import Cta from '@/components/Cta';
import GetStarted from '@/components/GetStarted';

import PrivacyPolicy from '@/components/PrivacyPolicy';
// import About from '@/components/About';

const MainContent = () => (
  <main>
    <Hero />
    <Brand /> 
    <GetStarted />
    <Feature />
    <Review />
    <Cta/>
    <PrivacyPolicy />
  </main>
);

const App = () => {
  return (
    <ReactLenis root>
      <Analytics /> 
      <div className='relative isolate overflow-hidden'>
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/get-started" element={<GetStarted />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </ReactLenis>
   
  );
};

export default App;
