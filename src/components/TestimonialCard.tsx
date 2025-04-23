'use client';

import { useEffect, useRef } from 'react';
import anime from '../utils/anime';

// Star SVG
const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354l-4.543 2.907c-.996.608-2.231-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" />
  </svg>
);

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  className?: string;
}

const TestimonialCard = ({ 
  quote, 
  author, 
  role, 
  className = "" 
}: TestimonialCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const stars = card.querySelectorAll('.star-icon');
    
    // Card hover animation
    card.addEventListener('mouseenter', () => {
      anime({
        targets: card,
        scale: 1.03,
        boxShadow: '0 12px 25px rgba(0, 0, 0, 0.1)',
        duration: 300,
        easing: 'easeOutQuad'
      });
      
      // Animate stars
      anime({
        targets: stars,
        rotate: el => [0, anime.random(-15, 15)],
        scale: 1.2,
        delay: anime.stagger(100),
        duration: 400,
        easing: 'easeOutElastic(1, .5)'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      anime({
        targets: card,
        scale: 1,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        duration: 300,
        easing: 'easeOutQuad'
      });
      
      anime({
        targets: stars,
        rotate: 0,
        scale: 1,
        delay: anime.stagger(50, {direction: 'reverse'}),
        duration: 300,
        easing: 'easeOutQuad'
      });
    });
    
    return () => {
      if (card) anime.remove(card);
      stars.forEach(star => anime.remove(star));
    };
  }, []);
  
  return (
    <div
      ref={cardRef}
      className={`bg-gray-50 p-6 rounded-xl shadow-md ${className}`}
    >
      <div className="mb-4">
        <div className="flex justify-center mb-3">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className="star-icon w-5 h-5 text-yellow-400 mx-0.5" />
          ))}
        </div>
        <p className="text-gray-700 italic mb-4">"{quote}"</p>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
        <div>
          <h4 className="font-medium text-indigo-700">{author}</h4>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard; 