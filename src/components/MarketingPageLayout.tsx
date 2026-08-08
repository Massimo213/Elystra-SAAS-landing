import type { ReactNode } from 'react';
import Footer from '@/components/Footer';

type MarketingPageLayoutProps = {
  children: ReactNode;
  className?: string;
};

const MarketingPageLayout = ({ children, className = '' }: MarketingPageLayoutProps) => (
  <main className={`relative z-10 min-h-screen pt-14 md:pt-16 ${className}`}>
    {children}
    <Footer />
  </main>
);

export default MarketingPageLayout;
