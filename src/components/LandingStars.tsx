'use client';

import { useEffect, useRef } from 'react';
import anime from '../utils/anime';

interface LandingStarsProps {
  className?: string;
  count?: number;
}

const LandingStars = ({
  className = "",
  count = 15
}: LandingStarsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    container.innerHTML = '';
    
    // Create stars
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 6 + 2; // 2-8px
      const opacity = Math.random() * 0.7 + 0.3; // 0.3-1.0
      
      const star = document.createElement('div');
      star.className = 'absolute rounded-full bg-yellow-200';
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.opacity = opacity.toString();
      
      container.appendChild(star);
      
      // Create individual twinkling animation for each star
      anime({
        targets: star,
        keyframes: [
          { opacity: opacity, scale: 1 },
          { opacity: 0.1, scale: 1.2 },
          { opacity: opacity, scale: 1 }
        ],
        duration: 2000 + Math.random() * 3000,
        delay: Math.random() * 3000,
        loop: true,
        easing: 'easeInOutSine'
      });
    }
    
    return () => {
      const stars = container.querySelectorAll('div');
      stars.forEach(star => {
        anime.remove(star);
      });
    };
  }, [count]);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
    />
  );
};

export default LandingStars; 