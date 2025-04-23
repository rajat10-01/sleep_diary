'use client';

import { useEffect, useRef } from 'react';
import anime from '../utils/anime';

interface SleepySheepProps {
  className?: string;
}

const SleepySheep = ({ className = "" }: SleepySheepProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Create animation timeline
    const tl = anime.timeline({
      loop: true,
      easing: 'easeOutQuad'
    });
    
    // Body bounce animation
    tl.add({
      targets: '.sheep-body',
      translateY: [0, -10, 0],
      duration: 1200,
      easing: 'easeInOutSine'
    });
    
    // Z floating animation
    const zElements = container.querySelectorAll('.sleep-z');
    zElements.forEach((el, i) => {
      anime({
        targets: el,
        translateY: -30,
        opacity: [1, 0],
        scale: [1, 1.2],
        duration: 1500,
        delay: i * 400,
        loop: true,
        easing: 'easeOutExpo'
      });
    });
    
    // Eye animation (blinking)
    anime({
      targets: '.sheep-eye',
      scaleY: [1, 0.1, 1],
      duration: 1800,
      delay: 2000,
      loop: true,
      easing: 'easeInOutSine'
    });
    
    return () => {
      if (container) anime.remove(container.querySelectorAll('*'));
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Sheep body */}
      <div className="sheep-body relative w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center">
        {/* Fluff details */}
        <div className="absolute -top-3 -left-2 w-8 h-8 bg-white rounded-full"></div>
        <div className="absolute -top-2 left-6 w-10 h-10 bg-white rounded-full"></div>
        <div className="absolute -top-3 right-3 w-8 h-8 bg-white rounded-full"></div>
        <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white rounded-full"></div>
        <div className="absolute -bottom-2 right-0 w-8 h-8 bg-white rounded-full"></div>
        <div className="absolute -right-2 top-5 w-8 h-8 bg-white rounded-full"></div>
        <div className="absolute -left-2 top-5 w-8 h-8 bg-white rounded-full"></div>
        
        {/* Face */}
        <div className="relative w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          {/* Eyes */}
          <div className="absolute flex space-x-5 top-5">
            <div className="sheep-eye w-2 h-3 bg-gray-800 rounded-full"></div>
            <div className="sheep-eye w-2 h-3 bg-gray-800 rounded-full"></div>
          </div>
          {/* Mouth (sleeping) */}
          <div className="absolute bottom-4 w-4 h-1 bg-gray-800 rounded-full"></div>
        </div>
      </div>
      
      {/* Legs */}
      <div className="absolute -bottom-6 left-4 w-3 h-6 bg-gray-300 rounded-b-lg"></div>
      <div className="absolute -bottom-6 right-4 w-3 h-6 bg-gray-300 rounded-b-lg"></div>
      
      {/* Z's for sleep indication */}
      <div className="absolute -top-2 -right-2 text-indigo-600 font-bold text-lg sleep-z">Z</div>
      <div className="absolute -top-6 right-1 text-indigo-600 font-bold text-xl sleep-z">Z</div>
      <div className="absolute -top-10 right-4 text-indigo-600 font-bold text-2xl sleep-z">Z</div>
    </div>
  );
};

export default SleepySheep; 