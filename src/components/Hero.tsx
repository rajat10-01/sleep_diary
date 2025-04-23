'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { MoonIcon, StarIcon } from './Icons';
import anime from '../utils/anime';

interface HeroProps {
  className?: string;
}

const Hero = ({ className = "" }: HeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const decorationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1000
    });

    // Animate title
    tl.add({
      targets: titleRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800
    })
    // Animate subtitle
    .add({
      targets: subtitleRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800
    }, '-=600')
    // Animate CTA
    .add({
      targets: ctaRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800
    }, '-=600');

    // Animate decorative elements
    const decorations = decorationRef.current?.querySelectorAll('.decoration');
    anime({
      targets: decorations,
      opacity: [0, 1],
      scale: [0.8, 1],
      rotate: [45, 0],
      delay: anime.stagger(100),
      duration: 1200,
      easing: 'easeOutElastic(1, .5)'
    });

    return () => {
      if (heroRef.current) anime.remove(heroRef.current);
      if (decorationRef.current) anime.remove(decorationRef.current.querySelectorAll('.decoration'));
    };
  }, []);

  return (
    <div ref={heroRef} className={`relative min-h-[80vh] flex items-center ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-700 mb-6 opacity-0"
          >
            Track Your Sleep Journey
          </h1>
          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl text-gray-600 mb-8 opacity-0"
          >
            Understand your sleep patterns, improve your rest, and wake up feeling refreshed.
          </p>
          <div ref={ctaRef} className="space-x-4 opacity-0">
            <Link
              href="/diary"
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
            >
              Start Tracking
            </Link>
            <Link
              href="/stats"
              className="inline-block bg-purple-100 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-200 transition-colors duration-200"
            >
              View Stats
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div ref={decorationRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="decoration absolute top-1/4 left-1/4 transform -translate-x-1/2">
          <MoonIcon className="w-12 h-12 text-purple-200" />
        </div>
        <div className="decoration absolute top-1/3 right-1/4 transform translate-x-1/2">
          <StarIcon className="w-8 h-8 text-purple-100" />
        </div>
        <div className="decoration absolute bottom-1/4 left-1/3">
          <StarIcon className="w-6 h-6 text-purple-100" />
        </div>
        <div className="decoration absolute top-1/2 right-1/3">
          <MoonIcon className="w-10 h-10 text-purple-200" />
        </div>
      </div>
    </div>
  );
};

export default Hero; 