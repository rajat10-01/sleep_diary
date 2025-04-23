'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import anime from '../utils/anime';

interface ActionButtonProps {
  style: 'primary' | 'secondary';
  className?: string;
}

const ActionButton = ({ style, className = "" }: ActionButtonProps) => {
  const { data: session, status } = useSession();
  const buttonRef = useRef<HTMLAnchorElement>(null);
  
  useEffect(() => {
    if (!buttonRef.current) return;
    
    const button = buttonRef.current;
    
    // Add hover effect with anime.js
    button.addEventListener('mouseenter', () => {
      anime({
        targets: button,
        scale: 1.05,
        duration: 400,
        easing: 'easeOutElastic(1, .6)'
      });
    });
    
    button.addEventListener('mouseleave', () => {
      anime({
        targets: button,
        scale: 1,
        duration: 300,
        easing: 'easeOutQuad'
      });
    });
    
    button.addEventListener('mousedown', () => {
      anime({
        targets: button,
        scale: 0.98,
        duration: 100,
        easing: 'easeOutQuad'
      });
    });
    
    button.addEventListener('mouseup', () => {
      anime({
        targets: button,
        scale: 1.05,
        duration: 200,
        easing: 'easeOutQuad'
      });
    });
    
    return () => {
      anime.remove(button);
    };
  }, []);
  
  const href = status === 'authenticated' ? '/dashboard' : '/api/auth/signin';
  const text = status === 'authenticated' 
    ? 'Go to Your Dashboard' 
    : (style === 'primary' ? 'Get Started Now' : 'Start Your Sleep Journey');
  
  const baseClasses = style === 'primary'
    ? "inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-10 rounded-full text-lg shadow-lg"
    : "inline-block bg-white text-purple-600 hover:bg-purple-50 font-bold py-4 px-12 rounded-full text-lg shadow-lg";
  
  return (
    <Link
      ref={buttonRef}
      href={href}
      className={`${baseClasses} ${className}`}
    >
      {text}
    </Link>
  );
};

export default ActionButton; 