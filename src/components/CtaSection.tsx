'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import anime from '../utils/anime';

interface ShapeProps {
  top: string;
  left: string;
  size: string;
  color: string;
  delay: number;
}

const CtaSection = () => {
  const { status } = useSession();
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const zzzRef = useRef<HTMLDivElement>(null);
  
  // Generate decorative shapes with more variety
  const shapes: ShapeProps[] = [
    { top: '10%', left: '10%', size: '50px', color: 'bg-indigo-200', delay: 0 },
    { top: '20%', left: '85%', size: '70px', color: 'bg-purple-200', delay: 200 },
    { top: '70%', left: '15%', size: '40px', color: 'bg-indigo-200', delay: 400 },
    { top: '65%', left: '75%', size: '60px', color: 'bg-purple-200', delay: 600 },
    { top: '40%', left: '90%', size: '30px', color: 'bg-indigo-200', delay: 800 },
    { top: '85%', left: '30%', size: '45px', color: 'bg-purple-200', delay: 350 },
    { top: '15%', left: '40%', size: '35px', color: 'bg-indigo-200', delay: 550 },
    { top: '55%', left: '5%', size: '55px', color: 'bg-purple-200', delay: 750 }
  ];
  
  useEffect(() => {
    // Intersection Observer to trigger animations when section is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate content with sequential reveal
          if (contentRef.current) {
            anime({
              targets: contentRef.current.querySelector('h2'),
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              easing: 'easeOutQuad'
            });
            
            anime({
              targets: contentRef.current.querySelector('p'),
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 800,
              delay: 200,
              easing: 'easeOutQuad'
            });
          }
          
          // Animate CTA button with more dramatic effect
          if (ctaRef.current) {
            anime({
              targets: ctaRef.current,
              opacity: [0, 1],
              translateY: [40, 0],
              scale: [0.8, 1],
              rotate: [-2, 0],
              duration: 1000,
              delay: 400,
              easing: 'easeOutElastic(1, 0.5)',
              complete: function() {
                // Add energetic pulse effect to CTA button
                anime({
                  targets: ctaRef.current,
                  boxShadow: [
                    '0 10px 15px -3px rgba(255, 255, 255, 0.3), 0 4px 6px -4px rgba(255, 255, 255, 0.3)',
                    '0 20px 30px -5px rgba(255, 255, 255, 0.5), 0 8px 10px -6px rgba(255, 255, 255, 0.5)',
                    '0 10px 15px -3px rgba(255, 255, 255, 0.3), 0 4px 6px -4px rgba(255, 255, 255, 0.3)'
                  ],
                  scale: [1, 1.03, 1],
                  duration: 2000,
                  loop: true,
                  easing: 'easeInOutSine'
                });
              }
            });
          }
          
          // Animate "Z" sleep indicators (if present)
          if (zzzRef.current) {
            const zElements = zzzRef.current.querySelectorAll('.z-element');
            anime({
              targets: zElements,
              opacity: [0, 1],
              translateY: [20, 0],
              translateX: [0, 20],
              scale: [0.5, 1],
              rotate: [-10, 0],
              delay: anime.stagger(200),
              duration: 1000,
              easing: 'easeOutElastic(1, 0.5)'
            });
            
            // Add floating animation for Z's
            anime({
              targets: zElements,
              translateY: (el, i) => [-15 - (i * 5), -30 - (i * 5)],
              translateX: (el, i) => [20 + (i * 10), 40 + (i * 10)],
              opacity: [1, 0],
              scale: [1, 1.5],
              delay: anime.stagger(300, {start: 1000}),
              duration: 3000,
              loop: true,
              easing: 'easeInOutSine'
            });
          }
          
          // Animate background shapes with more engaging behavior
          if (shapesRef.current) {
            anime({
              targets: shapesRef.current.querySelectorAll('.shape'),
              opacity: [0, 0.8],
              scale: [0.3, 1],
              delay: anime.stagger(50, {grid: [8, 1], from: 'center'}),
              duration: 800,
              easing: 'easeOutQuad',
              complete: function() {
                // Add more dynamic floating animation to each shape
                shapesRef.current?.querySelectorAll('.shape').forEach((shape, i) => {
                  // Create more complex path animations for each shape
                  anime({
                    targets: shape,
                    translateY: () => {
                      const randomY = anime.random(-20, 20);
                      return [0, randomY, randomY/2, -randomY/2, -randomY, 0];
                    },
                    translateX: () => {
                      const randomX = anime.random(-30, 30);
                      return [0, randomX/2, randomX, randomX/2, 0, -randomX/2, -randomX, -randomX/2, 0];
                    },
                    rotate: () => {
                      const randomRotate = anime.random(-15, 15);
                      return [0, randomRotate, 0, -randomRotate, 0];
                    },
                    duration: anime.random(10000, 15000),
                    loop: true,
                    easing: 'easeInOutSine',
                    delay: i * 100
                  });
                });
              }
            });
          }
          
          // Create dynamic background gradient animation
          if (sectionRef.current) {
            anime({
              targets: sectionRef.current,
              background: [
                'linear-gradient(135deg, rgba(109, 40, 217, 1) 0%, rgba(79, 70, 229, 1) 100%)',
                'linear-gradient(135deg, rgba(124, 58, 237, 1) 10%, rgba(99, 102, 241, 1) 90%)',
                'linear-gradient(135deg, rgba(139, 92, 246, 1) 20%, rgba(79, 70, 229, 1) 80%)',
                'linear-gradient(135deg, rgba(124, 58, 237, 1) 10%, rgba(99, 102, 241, 1) 90%)',
                'linear-gradient(135deg, rgba(109, 40, 217, 1) 0%, rgba(79, 70, 229, 1) 100%)'
              ],
              duration: 20000,
              easing: 'easeInOutSine',
              loop: true
            });
          }
          
          // Once animated, disconnect observer
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Handle CTA hover effect with improved animation
    const handleCtaHover = (entering: boolean) => {
      if (!ctaRef.current) return;
      
      anime({
        targets: ctaRef.current,
        scale: entering ? 1.05 : 1,
        backgroundColor: entering ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.95)',
        translateY: entering ? -5 : 0,
        boxShadow: entering 
          ? '0 20px 25px -5px rgba(255, 255, 255, 0.4), 0 8px 10px -6px rgba(255, 255, 255, 0.4)'
          : '0 10px 15px -3px rgba(255, 255, 255, 0.3), 0 4px 6px -4px rgba(255, 255, 255, 0.3)',
        duration: 200,
        easing: 'easeOutQuad'
      });
    };
    
    const cta = ctaRef.current;
    if (cta) {
      cta.addEventListener('mouseenter', () => handleCtaHover(true));
      cta.addEventListener('mouseleave', () => handleCtaHover(false));
    }
    
    return () => {
      observer.disconnect();
      if (cta) {
        cta.removeEventListener('mouseenter', () => handleCtaHover(true));
        cta.removeEventListener('mouseleave', () => handleCtaHover(false));
      }
      if (sectionRef.current) anime.remove(sectionRef.current);
      if (contentRef.current) {
        anime.remove(contentRef.current.querySelector('h2'));
        anime.remove(contentRef.current.querySelector('p'));
      }
      if (ctaRef.current) anime.remove(ctaRef.current);
      if (shapesRef.current) anime.remove(shapesRef.current.querySelectorAll('.shape'));
      if (zzzRef.current) anime.remove(zzzRef.current.querySelectorAll('.z-element'));
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="py-24 overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, rgba(109, 40, 217, 1) 0%, rgba(79, 70, 229, 1) 100%)'
      }}
    >
      {/* Decorative shapes */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {shapes.map((shape, i) => (
          <div 
            key={i}
            className={`shape absolute rounded-full opacity-0 ${shape.color}`}
            style={{
              top: shape.top,
              left: shape.left,
              width: shape.size,
              height: shape.size
            }}
          />
        ))}
      </div>
      
      {/* Sleep Z indicators */}
      <div 
        ref={zzzRef}
        className="absolute right-[15%] top-[25%] hidden md:block"
      >
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className={`z-element absolute text-indigo-200 font-bold opacity-0`}
            style={{
              fontSize: `${28 + i * 8}px`,
              top: `${-i * 10}px`,
              left: `${i * 10}px`,
            }}
          >
            Z
          </div>
        ))}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div 
          ref={contentRef}
          className="max-w-3xl mx-auto text-center text-white"
        >
          <h2 
            className="text-5xl font-bold mb-6 opacity-0 drop-shadow-md"
          >
            Ready to Sleep Better?
          </h2>
          
          <p 
            className="text-xl mb-10 text-indigo-100 opacity-0"
          >
            Join thousands who have improved their sleep quality with our delightful sleep diary app.
          </p>
          
          <div className="relative">
            <div 
              ref={ctaRef}
              className="inline-block px-10 py-4 font-bold text-purple-600 bg-white bg-opacity-95 rounded-full text-xl shadow-xl transition-all duration-300 opacity-0"
            >
              <Link
                href={status === 'authenticated' ? "/dashboard" : "/api/auth/signin"}
                className="inline-block"
              >
                {status === 'authenticated' ? "Go to Dashboard" : "Start Your Sleep Journey"}
              </Link>
            </div>
          </div>
          
          <div className="mt-6 text-sm font-medium">
            <span className="inline-block bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full">
              No credit card required
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection; 