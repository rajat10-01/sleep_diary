'use client';

import { useEffect, useRef } from 'react';
import anime from '../utils/anime';

interface StatsProps {
  className?: string;
  stats: {
    label: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
  }[];
}

const Stats = ({ className = "", stats }: StatsProps) => {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!statsRef.current) return;

    const statCards = statsRef.current.querySelectorAll('.stat-card');
    const statValues = statsRef.current.querySelectorAll('.stat-value');
    const statTrends = statsRef.current.querySelectorAll('.stat-trend');

    // Animate stat cards
    anime({
      targets: statCards,
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100),
      duration: 800,
      easing: 'easeOutExpo'
    });

    // Animate stat values with counting effect
    statValues.forEach((el) => {
      const value = parseFloat(el.textContent?.replace(/[^0-9.-]/g, '') || '0');
      
      anime({
        targets: el,
        innerHTML: [0, value],
        round: 1,
        duration: 1500,
        easing: 'easeInOutExpo',
        update: function(anim) {
          // @ts-ignore
          el.innerHTML = el.innerHTML.includes('%') 
            // @ts-ignore
            ? el.innerHTML.replace(/[\d.]+/, anim.progress.toFixed(1)) + '%'
            // @ts-ignore
            : el.innerHTML;
        }
      });
    });

    // Animate trend indicators
    anime({
      targets: statTrends,
      opacity: [0, 1],
      translateX: [-10, 0],
      delay: anime.stagger(100, { start: 500 }),
      duration: 800,
      easing: 'easeOutExpo'
    });
  }, [stats]);

  const getTrendColor = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        );
      case 'down':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
          </svg>
        );
    }
  };

  return (
    <div ref={statsRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="stat-card bg-white rounded-lg shadow-md p-6 transform transition-transform duration-200 hover:scale-105"
        >
          <div className="text-sm font-medium text-gray-500 mb-2">{stat.label}</div>
          <div className="flex items-end space-x-2">
            <div className="stat-value text-2xl font-bold text-purple-600">
              {stat.value}
            </div>
            {stat.change && (
              <div className={`stat-trend flex items-center space-x-1 text-sm ${getTrendColor(stat.trend)}`}>
                {getTrendIcon(stat.trend)}
                <span>{stat.change}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats; 