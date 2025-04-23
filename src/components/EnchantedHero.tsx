'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import anime from '../utils/anime';

// Sleep stats for interactive infographic
const sleepStats = [
  { label: "Better Sleep", value: "78%", description: "of users report improved sleep quality" },
  { label: "Time Saved", value: "45min", description: "average increase in sleep duration" },
  { label: "Habit Formed", value: "21", description: "days to build consistent sleep habits" }
];

const EnchantedHero = () => {
  const { status } = useSession();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement>(null);
  const infographicRef = useRef<HTMLDivElement>(null);
  const [activeStatIndex, setActiveStatIndex] = useState(0);
  
  useEffect(() => {
    if (!heroRef.current) return;
    
    // Create dynamic background gradient animation
    anime({
      targets: heroRef.current,
      background: [
        'linear-gradient(135deg, rgba(238, 242, 255, 1) 0%, rgba(242, 238, 255, 1) 100%)',
        'linear-gradient(135deg, rgba(243, 244, 255, 1) 0%, rgba(237, 233, 254, 1) 100%)',
        'linear-gradient(135deg, rgba(238, 242, 255, 1) 0%, rgba(242, 238, 255, 1) 100%)'
      ],
      duration: 15000,
      easing: 'easeInOutSine',
      direction: 'alternate',
      loop: true
    });
    
    // Generate floating elements - now with more variety and interaction
    const elementsContainer = elementsRef.current;
    if (elementsContainer) {
      // Clear existing elements
      elementsContainer.innerHTML = '';
      
      // Create moon
      const moon = document.createElement('div');
      moon.className = 'absolute w-20 h-20 text-indigo-200 opacity-80 top-5 right-[10%]';
      moon.innerHTML = `<svg class="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-3.51 1.758-6.628 4.43-8.493a.75.75 0 01.819.162z" clip-rule="evenodd" />
      </svg>`;
      elementsContainer.appendChild(moon);
      
      // Create sheep
      const sheep = document.createElement('div');
      sheep.className = 'absolute w-16 h-16 text-purple-300 opacity-80 bottom-12 left-[10%]';
      sheep.innerHTML = `<svg class="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 10c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1zM8 10c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1z" />
        <path fill-rule="evenodd" d="M12 1.25c-2.487 0-4.774.402-6.466 1.079-.844.337-1.577.758-2.112 1.264C2.886 4.1 2.5 4.744 2.5 5.5v2.42c0 .347.137.683.388.93.387.378 1.21.843 2.512 1.292.178.597.46 1.142.844 1.599-1.294.296-2.419.749-3.25 1.34A2.742 2.742 0 002.5 14.67v2.83c0 .756.386 1.4.922 1.907.535.506 1.268.927 2.112 1.264 1.692.677 3.979 1.079 6.466 1.079s4.773-.402 6.466-1.079c.844-.337 1.577-.758 2.112-1.264.536-.507.922-1.151.922-1.907v-2.83c0-.427-.176-.82-.494-1.116-.883-.637-2.284-1.17-3.918-1.468.333-.4.572-.877.68-1.426 1.314-.446 2.148-.91 2.539-1.291.25-.247.386-.583.386-.93V5.5c0-.756-.386-1.4-.922-1.907-.535-.506-1.268-.927-2.112-1.264C16.774 1.652 14.487 1.25 12 1.25z" clip-rule="evenodd" />
      </svg>`;
      elementsContainer.appendChild(sheep);
      
      // Create bed
      const bed = document.createElement('div');
      bed.className = 'absolute w-18 h-18 text-blue-200 opacity-80 top-[30%] right-[8%]';
      bed.innerHTML = `<svg class="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 5.25A2.25 2.25 0 014.25 3h15.5A2.25 2.25 0 0122 5.25v8.5A2.25 2.25 0 0119.75 16h-2.083C18.5 17.236 19.25 18.57 19.25 20h-1.5c0-1.602-1.147-2.938-2.662-3.246-.23-.047-.413-.277-.413-.493V16h-5.35v.261c0 .216-.184.446-.413.493C7.397 17.062 6.25 18.398 6.25 20h-1.5c0-1.43.75-2.764 1.583-4H4.25A2.25 2.25 0 012 13.75v-8.5zM4.25 4.5a.75.75 0 00-.75.75V8h17V5.25a.75.75 0 00-.75-.75H4.25zM3.5 9.5v4.25c0 .414.336.75.75.75h15.5a.75.75 0 00.75-.75V9.5h-17z" />
      </svg>`;
      elementsContainer.appendChild(bed);
      
      // Create alarm clock
      const clock = document.createElement('div');
      clock.className = 'absolute w-14 h-14 text-yellow-300 opacity-80 bottom-[25%] right-[18%]';
      clock.innerHTML = `<svg class="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
      </svg>`;
      elementsContainer.appendChild(clock);
      
      // Create stars with different sizes
      for (let i = 0; i < 10; i++) {
        const size = Math.random() * 8 + 4; // 4-12px
        const star = document.createElement('div');
        star.className = 'absolute text-yellow-200 star-element';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = '0';
        star.innerHTML = `<svg class="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354l-4.543 2.907c-.996.608-2.231-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clip-rule="evenodd" />
        </svg>`;
        elementsContainer.appendChild(star);
      }
      
      // Create clouds
      for (let i = 0; i < 3; i++) {
        const size = Math.random() * 20 + 15; // 15-35px
        const cloud = document.createElement('div');
        cloud.className = 'absolute text-purple-100 cloud-element';
        cloud.style.width = `${size}px`;
        cloud.style.height = `${size}px`;
        cloud.style.left = `${Math.random() * 100}%`;
        cloud.style.top = `${Math.random() * 30 + 10}%`;
        cloud.style.opacity = '0';
        cloud.innerHTML = `<svg class="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M4.5 9.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.303A4.5 4.5 0 0118 20.25H6.75a5.25 5.25 0 01-2.23-10.004 6.072 6.072 0 01-.02-.496z" clip-rule="evenodd" />
        </svg>`;
        elementsContainer.appendChild(cloud);
      }
      
      // Animate main elements
      anime({
        targets: [moon, sheep, bed, clock],
        opacity: [0, 0.8],
        translateY: [30, 0],
        duration: 1200,
        delay: anime.stagger(150),
        easing: 'easeOutQuad'
      });
      
      // Animate stars with twinkling effect
      anime({
        targets: '.star-element',
        opacity: [0, 0.7],
        scale: [0.5, 1],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutQuad',
        complete: () => {
          // Add twinkling animation to stars
          document.querySelectorAll('.star-element').forEach((star) => {
            anime({
              targets: star,
              opacity: [0.4, 0.9, 0.4],
              scale: [1, 1.2, 1],
              duration: anime.random(3000, 5000),
              loop: true,
              easing: 'easeInOutSine',
              delay: anime.random(0, 2000)
            });
          });
        }
      });
      
      // Animate clouds with floating effect
      anime({
        targets: '.cloud-element',
        opacity: [0, 0.7],
        translateX: [30, 0],
        delay: anime.stagger(150),
        duration: 1000,
        easing: 'easeOutQuad',
        complete: () => {
          // Add gentle floating animation to clouds
          document.querySelectorAll('.cloud-element').forEach((cloud) => {
            anime({
              targets: cloud,
              translateX: [0, anime.random(15, 40)],
              duration: anime.random(20000, 30000),
              direction: 'alternate',
              loop: true,
              easing: 'easeInOutSine'
            });
          });
        }
      });
      
      // Interactive animations for main elements
      [moon, sheep, bed, clock].forEach(el => {
        el.style.cursor = 'pointer';
        
        // Pulse animation on hover
        el.addEventListener('mouseenter', () => {
          anime({
            targets: el,
            scale: 1.1,
            duration: 300,
            easing: 'easeOutElastic(1, .5)'
          });
        });
        
        el.addEventListener('mouseleave', () => {
          anime({
            targets: el,
            scale: 1,
            duration: 300,
            easing: 'easeOutQuad'
          });
        });
        
        // Add click animation
        el.addEventListener('click', () => {
          anime({
            targets: el,
            rotate: [0, 15, -15, 0],
            scale: [1, 1.2, 0.9, 1],
            duration: 600,
            easing: 'easeInOutBack'
          });
        });
      });
    }
    
    // Text & elements animation sequence
    const timelineHeading = anime.timeline({
      easing: 'easeOutExpo'
    });
    
    // Animate title with more interesting effect
    if (titleRef.current) {
      // Split text into spans for letter-by-letter animation
      const text = titleRef.current.textContent || '';
      titleRef.current.innerHTML = '';
      
      text.split('').forEach((letter, i) => {
        const span = document.createElement('span');
        span.innerText = letter === ' ' ? '\u00A0' : letter; // Use non-breaking space for spaces
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        titleRef.current?.appendChild(span);
      });
      
      // Animate letters with wave effect
      timelineHeading.add({
        targets: titleRef.current.querySelectorAll('span'),
        opacity: [0, 1],
        translateY: [20, 0],
        delay: (el, i) => 35 * i,
        duration: 800,
        // Add slight wave effect
        update: function(anim) {
          titleRef.current?.querySelectorAll('span').forEach((span, i) => {
            const wave = Math.sin((anim.progress + i * 15) * (Math.PI / 180));
            span.style.transform = `translateY(${wave * 2}px)`;
          });
        }
      });
    }
    
    // Animate subtitle with fade in
    if (subtitleRef.current) {
      timelineHeading.add({
        targets: subtitleRef.current,
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 600
      }, '-=500'); // Overlap with previous animation
    }
    
    // Animate CTA button with a bouncy effect
    if (ctaRef.current) {
      timelineHeading.add({
        targets: ctaRef.current,
        opacity: [0, 1],
        translateY: [15, 0],
        scale: [0.95, 1],
        duration: 600,
        complete: function() {
          // Add subtle floating effect to CTA button
          anime({
            targets: ctaRef.current,
            translateY: [0, -5, 0],
            boxShadow: [
              '0 8px 20px rgba(79, 70, 229, 0.3)',
              '0 15px 30px rgba(79, 70, 229, 0.4)',
              '0 8px 20px rgba(79, 70, 229, 0.3)'
            ],
            duration: 2000,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
          });
        }
      }, '-=300'); // Overlap with previous animation
    }

    // Animate infographic stats
    if (infographicRef.current) {
      timelineHeading.add({
        targets: infographicRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        complete: function() {
          // Start auto-rotation of stats
          const statInterval = setInterval(() => {
            setActiveStatIndex(prev => (prev + 1) % sleepStats.length);
          }, 4000);
          
          return () => clearInterval(statInterval);
        }
      }, '-=200');
    }
    
    // Cleanup
    return () => {
      if (heroRef.current) anime.remove(heroRef.current);
      if (titleRef.current) anime.remove(titleRef.current.querySelectorAll('span'));
      if (subtitleRef.current) anime.remove(subtitleRef.current);
      if (ctaRef.current) anime.remove(ctaRef.current);
      if (infographicRef.current) anime.remove(infographicRef.current);
      if (elementsRef.current) {
        const elements = elementsRef.current.querySelectorAll('div');
        elements.forEach(el => {
          el.removeEventListener('mouseenter', () => {});
          el.removeEventListener('mouseleave', () => {});
          el.removeEventListener('click', () => {});
          anime.remove(el);
        });
      }
    };
  }, []);
  
  // Animation for changing stats
  useEffect(() => {
    const statItems = document.querySelectorAll('.stat-item');
    if (statItems.length > 0) {
      anime({
        targets: statItems,
        opacity: (el, i) => i === activeStatIndex ? [0, 1] : [1, 0],
        translateY: (el, i) => i === activeStatIndex ? [20, 0] : [0, -20],
        scale: (el, i) => i === activeStatIndex ? [0.9, 1] : [1, 0.9],
        duration: 800,
        easing: 'easeOutQuad'
      });
    }
  }, [activeStatIndex]);
  
  // Handle CTA button hover effect
  const handleCtaHover = (entering: boolean) => {
    if (!ctaRef.current) return;
    
    anime({
      targets: ctaRef.current.querySelector('a'),
      scale: entering ? 1.05 : 1,
      boxShadow: entering ? '0 15px 30px rgba(79, 70, 229, 0.4)' : '0 8px 15px rgba(79, 70, 229, 0.3)',
      duration: 200,
      easing: 'easeOutQuad'
    });
  };
  
  return (
    <div 
      ref={heroRef} 
      className="flex flex-col items-center justify-center min-h-[70vh] pt-8 pb-8 px-4 overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, rgba(238, 242, 255, 1) 0%, rgba(242, 238, 255, 1) 100%)'
      }}
    >
      {/* Floating elements */}
      <div 
        ref={elementsRef} 
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      />
      
      {/* Content wrapper */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500"
          >
            Track Your Sleep Journey
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto"
          >
            Understand your patterns, improve your rest, and wake up feeling refreshed every day.
          </p>
        </div>
        
        {/* Interactive Infographic */}
        <div 
          ref={infographicRef}
          className="relative mx-auto mb-6 h-24 max-w-lg bg-white/40 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50"
        >
          {sleepStats.map((stat, index) => (
            <div 
              key={index}
              className={`stat-item absolute inset-0 flex items-center justify-between p-4 ${index === activeStatIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className="flex-1">
                <div className="text-xs text-purple-700 font-medium">{stat.label}</div>
                <div className="text-gray-600 text-xs mt-0.5">{stat.description}</div>
              </div>
              <div className="text-3xl font-bold text-indigo-600">{stat.value}</div>
            </div>
          ))}
          
          {/* Indicator dots */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
            {sleepStats.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setActiveStatIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === activeStatIndex ? 'bg-indigo-600' : 'bg-indigo-300'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <div 
            ref={ctaRef}
            className="inline-block"
            onMouseEnter={() => handleCtaHover(true)}
            onMouseLeave={() => handleCtaHover(false)}
          >
            <Link
              href={status === 'authenticated' ? "/dashboard" : "/api/auth/signin"}
              className="inline-block bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-bold py-3 px-10 rounded-full text-lg shadow-lg transition-all"
            >
              {status === 'authenticated' ? "Go to Dashboard" : "Start Your Sleep Journey"}
            </Link>
          </div>
          
          <p className="mt-4 text-purple-600 text-sm font-medium">
            Free to start • No credit card required
          </p>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-indigo-400 animate-bounce">
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  );
};

export default EnchantedHero; 