'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Moon SVG for the logo
const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-3.51 1.758-6.628 4.43-8.493a.75.75 0 01.819.162z" clipRule="evenodd" />
  </svg>
);

// Star SVG for decoration
const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354l-4.543 2.907c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
);

// Separate client component for session-dependent UI
function AuthSection() {
  const { data: session, status } = useSession();
  const userData = session?.user;

  if (status === 'loading') {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3].map((i) => (
          <motion.div 
            key={i} 
            className="w-2 h-2 bg-indigo-400 rounded-full"
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => signIn('email')}
        className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-2 px-5 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300"
      >
        Sign In
      </motion.button>
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
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => signOut()}
        className="bg-red-100 hover:bg-red-200 text-red-700 py-1.5 px-4 rounded-full text-sm transition-colors duration-300"
      >
        Sign Out
      </motion.button>
    </div>
  );
}

// Main navbar component
export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  
  // Only render client-specific content after mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="fixed w-full z-50 bg-white/98 backdrop-blur-md shadow-sm py-3"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur opacity-70"></div>
            <div className="relative bg-indigo-600 p-2 rounded-full">
              <MoonIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            SleepDiary
          </span>
          {/* Small decorative star */}
          <motion.div 
            className="w-3 h-3 text-yellow-400 mt-1" 
            animate={{ rotate: [0, 20, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <StarIcon />
          </motion.div>
        </Link>

        {/* Nav Links (Optional) */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/about" className="text-gray-700 hover:text-purple-600 transition-colors">About</Link>
          <Link href="/features" className="text-gray-700 hover:text-purple-600 transition-colors">Features</Link>
          <Link href="/faq" className="text-gray-700 hover:text-purple-600 transition-colors">FAQ</Link>
        </div>

        {/* Auth Section - Only render on client side */}
        <div className="flex items-center">
          {mounted ? <AuthSection /> : 
            // Placeholder with similar dimensions to avoid layout shift
            <div className="h-9 w-24 rounded-full bg-gray-200 animate-pulse"></div>
          }
        </div>
      </div>
    </motion.nav>
  );
} 