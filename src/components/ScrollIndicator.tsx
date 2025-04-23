'use client';

import { useEffect, useRef } from 'react';
import anime from '../utils/anime';

interface ScrollIndicatorProps {
  className?: string;
}

const ScrollIndicator = ({ className = "" }: ScrollIndicatorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create a single animation timeline for smoother performance
    const timeline = anime.timeline({
      loop: true,
      easing: 'easeInOutSine'
    });

    // Add dot animation
    timeline
      .add({
        targets: '.scroll-dot',
        translateY: [0, 12],
        opacity: [0.8, 0.2],
        duration: 1000
      })
      .add({
        targets: '.scroll-dot',
        translateY: [12, 0],
        opacity: [0.2, 0.8],
        duration: 1000
      });

    // Add container hover animation
    anime({
      targets: containerRef.current,
      translateY: [0, 8, 0],
      duration: 3000,
      loop: true,
      easing: 'easeInOutQuad'
    });
    
    return () => {
      if (containerRef.current) {
        anime.remove(containerRef.current);
        anime.remove('.scroll-dot');
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col items-center ${className}`}
    >
      <div className="text-sm text-gray-500 mb-2 opacity-80">Scroll</div>
      <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
        <div className="scroll-dot w-1.5 h-1.5 bg-gray-500 rounded-full mt-2"></div>
      </div>
    </div>
  );
};

export default ScrollIndicator; 