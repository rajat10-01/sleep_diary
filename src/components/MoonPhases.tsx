'use client';

import { useEffect, useRef } from 'react';
import anime from '../utils/anime';

interface MoonPhasesProps {
  className?: string;
}

const MoonPhases = ({ className = "" }: MoonPhasesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Create the moon phase animation
    anime({
      targets: '.moon-shadow',
      translateX: [100, -100],
      easing: 'easeInOutSine',
      duration: 10000,
      loop: true
    });
    
    // Subtle glow animation
    anime({
      targets: '.moon-glow',
      opacity: [0.6, 0.8, 0.6],
      scale: [1, 1.05, 1],
      easing: 'easeInOutQuad',
      duration: 4000,
      loop: true
    });
    
    return () => {
      if (container) anime.remove(container.querySelectorAll('*'));
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Glow effect */}
      <div className="moon-glow absolute inset-0 rounded-full bg-yellow-100 blur-xl opacity-60 scale-150"></div>
      
      {/* Moon body */}
      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-yellow-100 to-gray-100 overflow-hidden shadow-lg">
        {/* Moon craters */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-gray-200/40"></div>
        <div className="absolute top-2/3 left-1/3 w-3 h-3 rounded-full bg-gray-200/40"></div>
        <div className="absolute bottom-1/4 right-1/4 w-4 h-4 rounded-full bg-gray-200/40"></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-gray-200/40"></div>
        
        {/* Shadow overlay for phase animation */}
        <div className="moon-shadow absolute inset-0 bg-indigo-900/80"></div>
      </div>
    </div>
  );
};

export default MoonPhases; 