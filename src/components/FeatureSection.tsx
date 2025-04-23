'use client';

import { useEffect, useRef } from 'react';
import anime from '../utils/anime';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  highlightColor: string;
}

const FeatureSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const decorationRef = useRef<HTMLDivElement>(null);
  
  // Define features with enhanced styling
  const features: Feature[] = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      title: "Simple Daily Logging",
      description: "Just a few taps to record your sleep time, quality, and factors that may have affected your rest.",
      color: "text-purple-500 bg-purple-100",
      highlightColor: "from-purple-500 to-purple-600"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Insightful Analytics",
      description: "Beautiful charts and reports help you understand your sleep patterns over time.",
      color: "text-blue-500 bg-blue-100",
      highlightColor: "from-blue-500 to-blue-600"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      title: "Smart Reminders",
      description: "Get gentle nudges to log your sleep and maintain a consistent sleep schedule.",
      color: "text-green-500 bg-green-100",
      highlightColor: "from-green-500 to-green-600"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Private & Secure",
      description: "Your sleep data is encrypted and never shared without your explicit permission.",
      color: "text-indigo-500 bg-indigo-100",
      highlightColor: "from-indigo-500 to-indigo-600"
    }
  ];
  
  useEffect(() => {
    // Add decorative elements
    if (decorationRef.current) {
      // Add subtle wave pattern
      decorationRef.current.innerHTML = '';
      
      // Create top wave
      const topWave = document.createElement('div');
      topWave.className = 'absolute top-0 left-0 right-0 h-20 opacity-50';
      topWave.innerHTML = `<svg viewBox="0 0 1200 120" preserveAspectRatio="none" class="w-full h-full"><path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="rgba(224, 231, 255, 0.6)"></path></svg>`;
      decorationRef.current.appendChild(topWave);
      
      // Create bottom wave
      const bottomWave = document.createElement('div');
      bottomWave.className = 'absolute bottom-0 left-0 right-0 h-20 opacity-50 transform rotate-180';
      bottomWave.innerHTML = `<svg viewBox="0 0 1200 120" preserveAspectRatio="none" class="w-full h-full"><path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="rgba(224, 231, 255, 0.6)"></path></svg>`;
      decorationRef.current.appendChild(bottomWave);
      
      // Animated dots in background
      for (let i = 0; i < 30; i++) {
        const dot = document.createElement('div');
        const size = Math.random() * 6 + 2;
        dot.className = 'absolute rounded-full bg-indigo-100 opacity-0';
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        decorationRef.current.appendChild(dot);
      }
      
      // Animate dots
      anime({
        targets: decorationRef.current.querySelectorAll('.rounded-full'),
        opacity: [0, 0.5],
        scale: [0, 1],
        delay: anime.stagger(100),
        duration: 1000,
        easing: 'easeOutQuad',
        complete: function() {
          // Add continuous floating effect
          decorationRef.current?.querySelectorAll('.rounded-full').forEach(dot => {
            anime({
              targets: dot,
              translateX: () => [0, anime.random(-20, 20)],
              translateY: () => [0, anime.random(-20, 20)],
              duration: () => anime.random(3000, 6000),
              direction: 'alternate',
              loop: true,
              easing: 'easeInOutSine',
              delay: anime.random(0, 1000)
            });
          });
        }
      });
      
      // Animate waves
      anime({
        targets: [topWave, bottomWave],
        translateX: ['-100%', '0%'],
        opacity: [0, 0.6],
        duration: 1500,
        easing: 'easeOutQuad'
      });
    }
    
    // Intersection Observer with more sophisticated animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Create subtle section background animation
          anime({
            targets: sectionRef.current,
            backgroundColor: [
              'rgba(255, 255, 255, 1)',
              'rgba(249, 250, 251, 1)', // gray-50
              'rgba(255, 255, 255, 1)'
            ],
            duration: 3000,
            easing: 'easeInOutSine',
            loop: true,
            direction: 'alternate'
          });
          
          // Animate title with character by character reveal
          if (titleRef.current) {
            const heading = titleRef.current.querySelector('h2');
            const subtitle = titleRef.current.querySelector('p');
            
            if (heading) {
              // Split title text into individual characters
              const text = heading.textContent || '';
              heading.innerHTML = '';
              heading.style.opacity = '1';
              
              text.split('').forEach((char, i) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                heading.appendChild(span);
              });
              
              // Animate each character
              anime({
                targets: heading.querySelectorAll('span'),
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(25),
                duration: 800,
                easing: 'easeOutQuad'
              });
            }
            
            // Animate subtitle with reveal effect
            if (subtitle) {
              anime({
                targets: subtitle,
                opacity: [0, 1],
                translateY: [15, 0],
                duration: 800,
                delay: 400,
                easing: 'easeOutQuad'
              });
            }
          }
          
          // Animated feature card reveal with staggered and 3D effects
          if (featuresRef.current) {
            anime({
              targets: featuresRef.current.querySelectorAll('.feature-card'),
              opacity: [0, 1],
              translateY: [60, 0],
              rotateX: [10, 0],
              scale: [0.9, 1],
              delay: anime.stagger(150),
              duration: 800,
              easing: 'easeOutQuad'
            });
          }
          
          // Once animated, disconnect observer
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Enhanced hover effects for feature cards
    if (featuresRef.current) {
      const featureCards = featuresRef.current.querySelectorAll('.feature-card');
      
      featureCards.forEach((card, index) => {
        const feature = features[index];
        
        // Create animations once for better performance
        const enterAnimation = {
          translateY: anime({
            targets: card,
            translateY: -12,
            boxShadow: '0 25px 30px rgba(0, 0, 0, 0.15)',
            duration: 400,
            easing: 'easeOutQuad',
            autoplay: false
          }),
          icon: anime({
            targets: card.querySelector('.feature-icon'),
            scale: 1.15,
            rotate: 5,
            backgroundColor: '#fff',
            duration: 400,
            easing: 'easeOutElastic(1, .5)',
            autoplay: false
          }),
          title: anime({
            targets: card.querySelector('h3'),
            scale: 1.05,
            duration: 400,
            easing: 'easeOutQuad',
            autoplay: false
          })
        };
        
        const leaveAnimation = {
          translateY: anime({
            targets: card,
            translateY: 0,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            duration: 400,
            easing: 'easeOutQuad',
            autoplay: false
          }),
          icon: anime({
            targets: card.querySelector('.feature-icon'),
            scale: 1,
            rotate: 0,
            backgroundColor: '',
            duration: 400,
            easing: 'easeOutQuad',
            autoplay: false
          }),
          title: anime({
            targets: card.querySelector('h3'),
            scale: 1,
            duration: 400,
            easing: 'easeOutQuad',
            autoplay: false
          })
        };
        
        // Create interactive hover gradient effect
        let gradientElement = document.createElement('div');
        gradientElement.className = `absolute inset-0 bg-gradient-to-br ${feature.highlightColor} opacity-0 rounded-xl transition-opacity z-0`;
        card.appendChild(gradientElement);
        
        // Set up event listeners
        card.addEventListener('mouseenter', () => {
          // Play all entrance animations
          Object.values(enterAnimation).forEach(anim => anim.play());
          
          // Show gradient
          anime({
            targets: gradientElement,
            opacity: 0.05,
            duration: 400,
            easing: 'easeOutQuad'
          });
          
          // Change text color
          if (card.querySelector('p')) {
            anime({
              targets: card.querySelector('p'),
              color: '#ffffff',
              duration: 400,
              easing: 'easeOutQuad'
            });
          }
        });
        
        card.addEventListener('mouseleave', () => {
          // Play all exit animations
          Object.values(leaveAnimation).forEach(anim => anim.play());
          
          // Hide gradient
          anime({
            targets: gradientElement,
            opacity: 0,
            duration: 400,
            easing: 'easeOutQuad'
          });
          
          // Reset text color
          if (card.querySelector('p')) {
            anime({
              targets: card.querySelector('p'),
              color: '#4B5563', // text-gray-600
              duration: 400,
              easing: 'easeOutQuad'
            });
          }
        });
      });
    }
    
    return () => {
      observer.disconnect();
      
      // Clean up all animations
      if (featuresRef.current) {
        const featureCards = featuresRef.current.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
          anime.remove(card);
          anime.remove(card.querySelector('.feature-icon'));
          anime.remove(card.querySelector('h3'));
          anime.remove(card.querySelector('p'));
          
          // Remove event listeners
          card.replaceWith(card.cloneNode(true));
        });
      }
      if (titleRef.current) {
        const heading = titleRef.current.querySelector('h2');
        if (heading) anime.remove(heading.querySelectorAll('span'));
        anime.remove(titleRef.current.querySelector('p'));
      }
      if (sectionRef.current) {
        anime.remove(sectionRef.current);
      }
      if (decorationRef.current) {
        anime.remove(decorationRef.current.querySelectorAll('div'));
      }
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-white transition-colors duration-1000 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div 
        ref={decorationRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 opacity-0">How Sleep Diary Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto opacity-0">
            Our intuitive app makes it easy to understand and improve your sleep habits.
          </p>
        </div>
        
        <div 
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card bg-white rounded-xl p-6 shadow-sm border border-gray-100 opacity-0 relative hover:z-10 cursor-pointer"
            >
              {/* Content container to ensure it's above the gradient overlay */}
              <div className="relative z-10">
                <div className={`feature-icon w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mb-6 mx-auto transition-colors duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center transition-colors duration-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection; 