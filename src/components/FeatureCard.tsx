'use client';

import { useEffect, useRef } from 'react';
import anime from '../utils/anime';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  className?: string;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  className = "" 
}: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const iconContainer = card.querySelector('.icon-container');
    
    // Create reusable animations
    const cardEnterAnimation = anime({
      targets: card,
      translateY: -8,
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
      duration: 400,
      easing: 'easeOutQuad',
      autoplay: false
    });

    const cardLeaveAnimation = anime({
      targets: card,
      translateY: 0,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      duration: 400,
      easing: 'easeOutQuad',
      autoplay: false
    });

    const iconEnterAnimation = anime({
      targets: iconContainer,
      scale: 1.1,
      duration: 400,
      easing: 'easeOutElastic(1, .5)',
      autoplay: false
    });

    const iconLeaveAnimation = anime({
      targets: iconContainer,
      scale: 1,
      duration: 300,
      easing: 'easeOutQuad',
      autoplay: false
    });
    
    // Add event listeners
    card.addEventListener('mouseenter', () => {
      cardEnterAnimation.play();
      iconEnterAnimation.play();
    });
    
    card.addEventListener('mouseleave', () => {
      cardLeaveAnimation.play();
      iconLeaveAnimation.play();
    });
    
    return () => {
      // Clean up animations
      [cardEnterAnimation, cardLeaveAnimation, iconEnterAnimation, iconLeaveAnimation].forEach(anim => {
        if (anim) anime.remove(anim.targets);
      });
    };
  }, []);
  
  const bgColor = `bg-${color}-100`;
  const textColor = `text-${color}-600`;
  
  return (
    <div
      ref={cardRef}
      className={`bg-white p-6 rounded-lg shadow-md transition-all duration-300 ${className}`}
    >
      <div className={`icon-container mx-auto mb-4 ${bgColor} p-3 rounded-full w-16 h-16 flex items-center justify-center`}>
        <Icon className={`w-8 h-8 ${textColor}`} />
      </div>
      <h3 className="text-lg font-semibold text-purple-700 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard; 