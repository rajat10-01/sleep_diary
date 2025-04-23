'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { MoonIcon, StarIcon } from './Icons';

// Import anime.js correctly
import anime from '../utils/anime';

// Separate client component for session-dependent UI
function AuthSection() {
  const { data: session, status } = useSession();
  const userData = session?.user;
  const loadingDotsRef = useRef<HTMLDivElement>(null);
  const signInButtonRef = useRef<HTMLButtonElement>(null);
  const signOutButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Animation for loading dots
    if (status === 'loading' && loadingDotsRef.current) {
      const dots = loadingDotsRef.current.querySelectorAll('div');
      
      anime({
        targets: dots,
        translateY: [-2, 2, -2],
        duration: 600,
        loop: true,
        delay: anime.stagger(100),
        easing: 'easeInOutSine'
      });
    }

    // Animation for sign in/out buttons
    const setupButtonAnimation = (button: HTMLButtonElement | null) => {
      if (!button) return;
      
      // Pre-compute animations for better performance
      const animations = {
        enter: anime({
          targets: button,
          scale: 1.05,
          duration: 150,
          easing: 'easeOutQuad',
          autoplay: false
        }),
        leave: anime({
          targets: button,
          scale: 1,
          duration: 150,
          easing: 'easeOutQuad',
          autoplay: false
        }),
        down: anime({
          targets: button,
          scale: 0.95,
          duration: 75,
          easing: 'easeOutQuad',
          autoplay: false
        }),
        up: anime({
          targets: button,
          scale: 1.05,
          duration: 75,
          easing: 'easeOutQuad',
          autoplay: false
        })
      };
      
      // Use direct event listeners instead of anime hover events
      button.addEventListener('mouseenter', () => animations.enter.play());
      button.addEventListener('mouseleave', () => animations.leave.play());
      button.addEventListener('mousedown', () => animations.down.play());
      button.addEventListener('mouseup', () => animations.up.play());
    };
    
    setupButtonAnimation(signInButtonRef.current);
    setupButtonAnimation(signOutButtonRef.current);
    
    return () => {
      if (loadingDotsRef.current) {
        const dots = loadingDotsRef.current.querySelectorAll('div');
        anime.remove(dots);
      }
      
      if (signInButtonRef.current) {
        anime.remove(signInButtonRef.current);
      }
      
      if (signOutButtonRef.current) {
        anime.remove(signOutButtonRef.current);
      }
    };
  }, [status]);

  if (status === 'loading') {
    return (
      <div ref={loadingDotsRef} className="flex space-x-1">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="w-2 h-2 bg-indigo-400 rounded-full"
          />
        ))}
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <button
        ref={signInButtonRef}
        onClick={() => signIn('email')}
        className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-2 px-5 rounded-full text-sm font-medium shadow-md"
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="hidden md:block">
        <span className="text-sm text-gray-600">Welcome,</span>
        <span className="text-sm font-medium text-indigo-700 ml-1">{userData?.name || userData?.email}</span>
      </div>
      <Link 
        href="/dashboard" 
        className="text-gray-800 bg-indigo-100 hover:bg-indigo-200 py-1.5 px-4 rounded-full text-sm transition-colors duration-300"
      >
        Dashboard
      </Link>
      <button
        ref={signOutButtonRef}
        onClick={() => signOut()}
        className="bg-red-100 hover:bg-red-200 text-red-700 py-1.5 px-4 rounded-full text-sm transition-colors duration-300"
      >
        Sign Out
      </button>
    </div>
  );
}

// Main navbar component
export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const linksRef = useRef<HTMLDivElement>(null);
  
  // Animation setup
  useEffect(() => {
    if (navRef.current) {
      const nav = navRef.current;
      
      // Initial fade in - lighter and quicker
      anime({
        targets: nav,
        opacity: [0, 1],
        translateY: [-5, 0],
        duration: 400,
        easing: 'easeOutQuad'
      });
      
      // Links hover effect - pre-calculate for better performance
      if (linksRef.current) {
        const links = linksRef.current.querySelectorAll('a');
        
        links.forEach((link: Element) => {
          // Create animations once and reuse
          const enterAnim = anime({
            targets: link,
            scale: 1.05,
            duration: 150,
            easing: 'easeOutQuad',
            autoplay: false
          });
          
          const leaveAnim = anime({
            targets: link,
            scale: 1,
            duration: 150,
            easing: 'easeOutQuad',
            autoplay: false
          });
          
          link.addEventListener('mouseenter', () => enterAnim.play());
          link.addEventListener('mouseleave', () => leaveAnim.play());
        });
      }

      return () => {
        if (navRef.current) anime.remove(navRef.current);
        if (linksRef.current) {
          const links = linksRef.current.querySelectorAll('a');
          links.forEach(link => anime.remove(link));
        }
      };
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    // Animate navbar background on scroll - transparent to start, never black
    anime({
      targets: navRef.current,
      backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0)',
      backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
      boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)' : '0 0 0 0 rgba(0, 0, 0, 0)',
      duration: 250,
      easing: 'easeOutQuad'
    });
  }, [isScrolled]);

  useEffect(() => {
    if (!menuRef.current) return;

    // Mobile menu animation - faster for better responsiveness
    anime({
      targets: menuRef.current,
      translateY: isMenuOpen ? ['-100%', '0%'] : ['0%', '-100%'],
      opacity: isMenuOpen ? [0, 1] : [1, 0],
      duration: 200,
      easing: 'easeOutQuad'
    });
  }, [isMenuOpen]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/diary', label: 'Diary' },
    { href: '/stats', label: 'Stats' },
    { href: '/settings', label: 'Settings' }
  ];

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-purple-600 transition-colors duration-200">
            Sleep Diary
          </Link>

          {/* Desktop Navigation */}
          <div ref={linksRef} className="hidden md:flex space-x-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Auth Section - Always shown on desktop, hidden on mobile when menu closed */}
          <div className="hidden md:block">
            <AuthSection />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-purple-600 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transform -translate-y-full"
        >
          <div className="py-2">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block px-4 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            {/* Show auth section in mobile menu */}
            <div className="px-4 py-2 border-t border-gray-100 mt-2">
              <AuthSection />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 