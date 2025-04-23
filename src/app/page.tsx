'use client';

import { useEffect } from 'react';
import EnchantedHero from '@/components/EnchantedHero';
import FeatureSection from '@/components/FeatureSection';
import TestimonialSection from '@/components/TestimonialSection';
import CtaSection from '@/components/CtaSection';

export default function HomePage() {
  // Removing framer-motion dependency and using only the anime.js utility
  
  useEffect(() => {
    // Ensure smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <EnchantedHero />
      
      {/* Features Section */}
      <FeatureSection />
      
      {/* Testimonials Section */}
      <TestimonialSection />
      
      {/* CTA Section */}
      <CtaSection />
    </>
  );
}
