import React from 'react';
import { HeroSection } from '@/components/Landing/HeroSection';
import { StatsSection } from '@/components/Landing/StatsSection';
// import { TippingSection } from '@/components/Landing/TippingSection';
import { HowItWorksSection } from '@/components/Landing/HowItWorksSection';
import { FAQSection } from '@/components/Landing/FAQSection';
import { NewsletterSection } from '@/components/Landing/NewsletterSection';
import { Footer } from '@/components/Footer/Footer';
import { TippingSection } from '@/components/TippingSection/TippingSection';

export const HomePage: React.FC = () => {

  return (
    <div className="w-full">
     
      <HeroSection />
      <StatsSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <TippingSection />
        <HowItWorksSection />
        <FAQSection />
        <NewsletterSection />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;