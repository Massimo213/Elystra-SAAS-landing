import { ReactLenis } from 'lenis/react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Analytics } from '@vercel/analytics/react';
import { DemoBookingProvider } from '@/contexts/DemoBookingContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Review from '@/components/Review';
import Cta from '@/components/Cta';
import SeoHead from '@/components/SeoHead';

import SignUp from '@/components/SignUp';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import Careers from '@/components/Careers';
import CareerRolePage from '@/components/CareerRolePage';
import CareersApplicationsAdmin from '@/components/CareersApplicationsAdmin';
import Reschedule from '@/components/Reschedule';
import Footer from '@/components/Footer';

import UrgencyStrip from '@/components/UrgencyStrip';
import BleedingCalculator from '@/components/BleedingCalculator';
import NorthAmericaRailSection from '@/components/NorthAmericaRailSection';
import FullArsenal from '@/components/FullArsenal';
import { Vortex } from '@/components/ui/vortex';
import Faq from '@/components/Faq';

import ProductPage from '@/components/pages/ProductPage';
import ProductModulePage from '@/components/pages/ProductModulePage';
import IntegrationsPage from '@/components/pages/IntegrationsPage';
import DocsPage from '@/components/pages/DocsPage';
import DocSectionPage from '@/components/pages/DocSectionPage';
import ApiDocsPage from '@/components/pages/ApiDocsPage';
import HelpPage from '@/components/pages/HelpPage';
import AboutPage from '@/components/pages/AboutPage';
import SecurityPage from '@/components/pages/SecurityPage';
import ContactPage from '@/components/pages/ContactPage';
import TermsPage from '@/components/pages/TermsPage';
import LoginPage from '@/components/pages/LoginPage';

import { FAQ_ITEMS } from '@/data/faqs';
import { faqPageSchema, homePageSchemas } from '@/lib/seo/schemas';

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
    <div
      className="absolute inset-0 opacity-[0.015]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
    <div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)',
      }}
    />
  </div>
);

const MainContent = () => (
  <>
    <SeoHead
      title="Elystra | Revenue Infrastructure for Agencies"
      description="Revenue infrastructure that closes the gap between prospect interest and payment. Proposal, signature, and deposit on one rail. 170+ agencies."
      path="/"
      jsonLd={[...homePageSchemas(), faqPageSchema(FAQ_ITEMS)]}
    />
    <main className="relative z-10 pt-14 md:pt-16">
      <UrgencyStrip />
      <Hero />
      <FullArsenal />
      <NorthAmericaRailSection />
      <Review />
      <BleedingCalculator />
      <Cta />
      <Faq />
      <Footer />
    </main>
  </>
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
    <DemoBookingProvider>
      <ReactLenis root options={lenisOptions}>
        <Analytics />
        <div className="relative isolate overflow-hidden bg-black min-h-screen">
          <GlobalVortex />
          <Header />
          <Routes>
            <Route path="/" element={<MainContent />} />

            {/* Branded entity pages */}
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:slug" element={<ProductModulePage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/docs/api" element={<ApiDocsPage />} />
            <Route path="/docs/:slug" element={<DocSectionPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />

            {/* Auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-in" element={<Navigate to="/login" replace />} />
            <Route path="/sign-up" element={<SignUp />} />

            {/* Legal & careers */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:slug" element={<CareerRolePage />} />
            <Route path="/admin/applications" element={<CareersApplicationsAdmin />} />

            {/* Utility */}
            <Route path="/reschedule" element={<Reschedule />} />
            <Route path="/r" element={<Reschedule />} />

            {/* Unknown paths → home (avoid blank screen) */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </ReactLenis>
    </DemoBookingProvider>
  );
};

export default App;
