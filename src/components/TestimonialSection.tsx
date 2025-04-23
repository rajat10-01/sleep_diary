'use client';

import { useEffect, useRef, useState } from 'react';
import anime from '../utils/anime';

// Testimonial data
const testimonials = [
  {
    content: "Before using Sleep Diary, I had no idea what was affecting my sleep. Now I can clearly see patterns and have improved my sleep quality by 68%!",
    author: "Sarah Johnson",
    role: "Marketing Director",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5
  },
  {
    content: "As a doctor, I recommend Sleep Diary to my patients. The data it provides helps me make better treatment decisions for sleep disorders.",
    author: "Dr. Michael Chen",
    role: "Sleep Specialist",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5
  },
  {
    content: "The cute design makes me actually want to track my sleep every day. After three months, I'm finally waking up refreshed without an alarm!",
    author: "Jamie Williams",
    role: "Software Engineer",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5
  }
];

const TestimonialSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const quoteIconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
  useEffect(() => {
    // Create interactive background pattern
    if (sectionRef.current) {
      // Create background pattern container
      const patternContainer = document.createElement('div');
      patternContainer.className = 'absolute inset-0 overflow-hidden';
      patternContainer.style.opacity = '0.3';
      
      // Add pattern elements
      for (let i = 0; i < 40; i++) {
        const pattern = document.createElement('div');
        const size = Math.random() * 8 + 4; // 4-12px
        pattern.className = 'absolute rounded-full bg-indigo-300';
        pattern.style.width = `${size}px`;
        pattern.style.height = `${size}px`;
        pattern.style.left = `${Math.random() * 100}%`;
        pattern.style.top = `${Math.random() * 100}%`;
        pattern.style.opacity = '0';
        
        patternContainer.appendChild(pattern);
      }
      
      // Insert pattern before first child
      sectionRef.current.insertBefore(patternContainer, sectionRef.current.firstChild);
      
      // Animate background pattern
      anime({
        targets: patternContainer.querySelectorAll('div'),
        opacity: [0, 0.6],
        scale: [0, 1],
        delay: anime.stagger(20),
        duration: 1000,
        easing: 'easeOutQuad',
        complete: function() {
          // Add subtle floating animation
          patternContainer.querySelectorAll('div').forEach(dot => {
            anime({
              targets: dot,
              translateX: () => [0, anime.random(-30, 30)],
              translateY: () => [0, anime.random(-30, 30)],
              duration: () => anime.random(5000, 10000),
              direction: 'alternate',
              loop: true,
              easing: 'easeInOutSine',
              delay: anime.random(0, 2000)
            });
          });
        }
      });
    }
    
    // Intersection Observer with enhanced animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Create more engaging section background animation
          anime({
            targets: sectionRef.current,
            backgroundColor: [
              'rgba(238, 242, 255, 1)', // indigo-50
              'rgba(224, 231, 255, 1)', // indigo-100
              'rgba(224, 231, 255, 1)', // Stay here longer
              'rgba(238, 242, 255, 1)'  // back to indigo-50
            ],
            duration: 8000,
            easing: 'easeInOutSine',
            loop: true
          });
          
          // Animated title reveal with character by character effect
          if (titleRef.current) {
            const title = titleRef.current.querySelector('h2');
            const subtitle = titleRef.current.querySelector('p');
            
            if (title) {
              // Split text into characters
              const titleText = title.textContent || '';
              title.innerHTML = '';
              title.style.opacity = '1';
              
              titleText.split('').forEach(char => {
                const span = document.createElement('span');
                span.innerText = char === ' ' ? '\u00A0' : char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                title.appendChild(span);
              });
              
              // Animate each character
              anime({
                targets: title.querySelectorAll('span'),
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(30),
                duration: 800,
                easing: 'easeOutQuad'
              });
            }
            
            if (subtitle) {
              subtitle.style.opacity = '1';
              
              // Split subtitle into words for staggered animation
              const subtitleText = subtitle.textContent || '';
              subtitle.innerHTML = '';
              
              subtitleText.split(' ').forEach(word => {
                const span = document.createElement('span');
                span.innerText = word;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(10px)';
                span.style.margin = '0 4px';
                subtitle.appendChild(span);
              });
              
              // Animate each word
              anime({
                targets: subtitle.querySelectorAll('span'),
                opacity: [0, 1],
                translateY: [10, 0],
                delay: anime.stagger(50, {start: 500}),
                duration: 600,
                easing: 'easeOutQuad'
              });
            }
          }
          
          // 3D card reveal animation
          if (cardsRef.current) {
            const cards = cardsRef.current.querySelectorAll('.testimonial-card');
            
            anime({
              targets: cards,
              opacity: [0, 1],
              translateY: [60, 0],
              rotateX: [15, 0],
              scale: [0.9, 1],
              delay: anime.stagger(150),
              duration: 800,
              easing: 'easeOutQuad'
            });
            
            // Animated star rating
            cards.forEach(card => {
              const stars = card.querySelectorAll('.star');
              
              anime({
                targets: stars,
                opacity: [0, 1],
                scale: [0.5, 1],
                delay: anime.stagger(100, {start: 800}),
                duration: 400,
                easing: 'easeOutBack'
              });
            });
          }
          
          // Floating quote icons with more fluid animation
          quoteIconsRef.current.forEach((icon, i) => {
            if (icon) {
              anime({
                targets: icon,
                translateY: function() {
                  return [0, -15, 0, -10, 0];
                },
                translateX: function() {
                  return i === 0 ? [0, 10, 5, 15, 0] : [0, -10, -5, -15, 0];
                },
                opacity: [0, 0.8, 0.5, 0.8, 0.5],
                scale: [0.8, 1.1, 1, 1.05, 0.9],
                easing: 'easeInOutSine',
                duration: 8000,
                loop: true,
                delay: i * 1000
              });
            }
          });
          
          // Once animated, disconnect observer
          observer.disconnect();
        }
      });
    }, { threshold: 0.15 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Add interactive 3D card effects
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.testimonial-card');
      
      cards.forEach((card, index) => {
        // 3D tilt effect on hover
        card.addEventListener('mousemove', (e) => {
          if (!card.classList.contains('expanded')) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            const xPercent = x / rect.width - 0.5;  // -0.5 to 0.5
            const yPercent = y / rect.height - 0.5; // -0.5 to 0.5
            
            anime({
              targets: card,
              rotateY: xPercent * 10, // max 10deg rotation
              rotateX: yPercent * -10, // max 10deg rotation
              translateZ: '20px',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
              duration: 50,
              easing: 'linear',
              //update: function() {}
            });
            
            // Highlight on hover
            setActiveCard(index);
          }
        });
        
        // Reset card on mouse leave
        card.addEventListener('mouseleave', () => {
          anime({
            targets: card,
            rotateY: 0,
            rotateX: 0,
            translateZ: '0px',
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.05)',
            duration: 400,
            easing: 'easeOutQuad'
          });
          
          setActiveCard(null);
        });
        
        // Click effect - expand card
        card.addEventListener('click', () => {
          if (card.classList.contains('expanded')) {
            // Collapse card
            card.classList.remove('expanded');
            anime({
              targets: card,
              scale: [1.05, 1],
              translateY: [0, 0],
              rotateY: 0,
              rotateX: 0,
              width: '100%',
              height: '100%',
              zIndex: 10,
              duration: 400,
              easing: 'easeOutQuad'
            });
          } else {
            // Expand card
            card.classList.add('expanded');
            anime({
              targets: card,
              scale: [1, 1.05],
              translateY: [0, -10],
              rotateY: 0,
              rotateX: 0,
              width: '100%',
              height: '100%',
              zIndex: 20,
              duration: 400,
              easing: 'easeOutQuad'
            });
          }
        });
      });
    }
    
    return () => {
      observer.disconnect();
      
      // Clean up animations
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.testimonial-card');
        cards.forEach(card => {
          anime.remove(card);
          card.replaceWith(card.cloneNode(true)); // Remove event listeners
        });
      }
      
      if (titleRef.current) {
        const title = titleRef.current.querySelector('h2');
        const subtitle = titleRef.current.querySelector('p');
        if (title) anime.remove(title.querySelectorAll('span'));
        if (subtitle) anime.remove(subtitle.querySelectorAll('span'));
      }
      
      if (sectionRef.current) {
        anime.remove(sectionRef.current);
        const patternContainer = sectionRef.current.querySelector('.absolute.inset-0');
        if (patternContainer) {
          anime.remove(patternContainer.querySelectorAll('div'));
        }
      }
      
      quoteIconsRef.current.forEach(icon => {
        if (icon) anime.remove(icon);
      });
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-indigo-50 transition-all duration-1000 relative overflow-hidden perspective-1000"
    >
      {/* Decorative elements */}
      <div 
        ref={el => quoteIconsRef.current[0] = el}
        className="absolute top-20 right-20 opacity-0 text-indigo-200"
      >
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      <div 
        ref={el => quoteIconsRef.current[1] = el}
        className="absolute bottom-10 left-10 opacity-0 text-indigo-200"
      >
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 opacity-0">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto opacity-0">
            Real stories from people who've improved their sleep with Sleep Diary.
          </p>
        </div>
        
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative perspective-1000"
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`testimonial-card bg-white rounded-xl p-8 shadow-md border border-indigo-100 
                transition-all duration-300 opacity-0 cursor-pointer transform-style-3d 
                ${activeCard === index ? 'border-indigo-300' : ''}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="mb-6">
                {/* Star rating with improved animation */}
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`star w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} mx-0.5`}
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                {/* Testimonial quote with quotation marks */}
                <div className="relative">
                  <svg 
                    className="absolute top-0 left-0 w-6 h-6 text-indigo-200 transform -translate-x-4 -translate-y-3"
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-700 italic mb-6 relative z-10">"{testimonial.content}"</p>
                </div>
              </div>
              
              {/* Author info with avatar */}
              <div className="flex items-center">
                {/* Avatar with fallback */}
                <div className="w-12 h-12 rounded-full bg-indigo-100 overflow-hidden mr-4 flex-shrink-0">
                  {testimonial.avatar && (
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection; 