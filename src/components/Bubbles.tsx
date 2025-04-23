'use client';

import { useEffect, useRef } from 'react';
import anime from '../utils/anime';

interface BubblesProps {
  className?: string;
  count?: number;
  colors?: string[];
}

const Bubbles = ({ 
  className = "", 
  count = 10, // Reduced count for better performance
  colors = ['bg-blue-200', 'bg-purple-200', 'bg-pink-200', 'bg-indigo-200'] 
}: BubblesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const bubbles: HTMLDivElement[] = [];
    const container = containerRef.current;
    const containerHeight = container.offsetHeight;
    
    // Clean up any existing bubbles
    container.innerHTML = '';
    
    // Create bubbles
    for (let i = 0; i < count; i++) {
      const size = Math.floor(Math.random() * 40) + 15; // 15px to 55px
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = (Math.random() * 0.4) + 0.1; // Random opacity between 0.1-0.5
      
      const bubble = document.createElement('div');
      bubble.className = `absolute rounded-full ${color} backdrop-blur-sm`;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.bottom = '-10%';
      bubble.style.opacity = opacity.toString();
      
      container.appendChild(bubble);
      bubbles.push(bubble);
    }
    
    // Animate bubbles with staggered timing
    anime({
      targets: bubbles,
      translateY: -containerHeight * 1.2,
      translateX: () => (Math.random() * 100) - 50,
      rotate: () => (Math.random() > 0.5 ? 45 : -45),
      duration: () => (Math.random() * 10000) + 15000,
      delay: anime.stagger(500),
      loop: true,
      easing: 'easeInOutSine',
      complete: (anim) => {
        anim.animatables.forEach(a => {
          (a.target as HTMLElement).style.transform = 'translateY(0) translateX(0) rotate(0)';
        });
      }
    });
    
    return () => {
      anime.remove(bubbles);
    };
  }, [colors, count]);

  return (
    <div 
      ref={containerRef}
      className={`absolute w-full h-full overflow-hidden pointer-events-none ${className}`}
    />
  );
};

export default Bubbles; 