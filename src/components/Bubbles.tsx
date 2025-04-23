'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BubblesProps {
  className?: string;
  count?: number;
  colors?: string[];
}

interface Bubble {
  id: number;
  size: number;
  startX: number;
  moveX: number;
  duration: number;
  delay: number;
  color: string;
  opacity: number;
}

const Bubbles = ({ 
  className = "", 
  count = 12, // Reduced from 15 for better performance
  colors = ['bg-blue-200', 'bg-purple-200', 'bg-pink-200', 'bg-indigo-200'] 
}: BubblesProps) => {
  // Use state for client-side rendering and to avoid window reference errors
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [windowHeight, setWindowHeight] = useState(0);
  
  useEffect(() => {
    // Set window height for animation
    setWindowHeight(window.innerHeight);
    
    // Generate bubbles only once on component mount
    const generatedBubbles = Array.from({ length: count }, (_, i) => {
      // Random position, size, and animation values - with more controlled bounds
      const size = Math.floor(Math.random() * 40) + 15; // 15px to 55px (smaller max size)
      const startX = Math.random() * 100; // 0-100% of parent width
      const moveX = (Math.random() * 20) - 10; // Less extreme movement (-10 to 10)
      const duration = (Math.random() * 10) + 10; // Animation duration between 10-20s
      const delay = Math.random() * 3; // Shorter random delay 0-3s
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = (Math.random() * 0.4) + 0.1; // Random opacity between 0.1-0.5
      
      return {
        id: i,
        size,
        startX,
        moveX,
        duration,
        delay,
        color,
        opacity
      };
    });
    
    setBubbles(generatedBubbles);
    
    // Handle window resize
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [colors, count]);

  if (bubbles.length === 0 || windowHeight === 0) {
    return null;
  }

  return (
    <div className={`absolute w-full h-full overflow-hidden pointer-events-none ${className}`}>
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className={`absolute rounded-full ${bubble.color} backdrop-blur-sm`}
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.startX}%`,
            bottom: '-10%',
            opacity: bubble.opacity,
            willChange: 'transform', // Optimize for animations
          }}
          animate={{
            y: [0, -windowHeight * 1.1],
            x: [0, bubble.moveX],
            rotate: [0, bubble.moveX > 0 ? 45 : -45],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 0.5,
          }}
        />
      ))}
    </div>
  );
};

export default Bubbles; 