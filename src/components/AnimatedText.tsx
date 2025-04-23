'use client';

import { useEffect, useRef } from 'react';
import anime from '../utils/anime';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const AnimatedText = ({ text, className = "", delay = 0 }: AnimatedTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Setup container with individual spans for each character
    container.innerHTML = text.split('').map(char => {
      return char === ' ' 
        ? '<span class="whitespace-pre"> </span>' 
        : `<span class="inline-block opacity-0">${char}</span>`;
    }).join('');
    
    // Animate each character with staggered timing
    anime({
      targets: container.querySelectorAll('span:not(.whitespace-pre)'),
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 700,
      delay: anime.stagger(30, { start: delay }),
      easing: 'easeOutExpo'
    });
    
    return () => {
      anime.remove(container.querySelectorAll('span'));
    };
  }, [text, delay]);

  return (
    <div ref={containerRef} className={className}></div>
  );
};

export default AnimatedText; 