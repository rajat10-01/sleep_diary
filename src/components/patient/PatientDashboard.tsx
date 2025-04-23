'use client';

import React, { useState, useEffect } from 'react';
import { type Session } from 'next-auth';

interface PatientDashboardProps {
  user: Session['user'];
}

export default function PatientDashboard({ user }: PatientDashboardProps) {
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex justify-center items-center h-80vh">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-wrap justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Sleep Diary</h1>
              <p className="text-lg text-gray-600">Welcome back, {user?.name || user?.email}!</p>
            </div>
            <div className="flex mt-4 md:mt-0">
              <div className="bg-indigo-50 p-2 rounded-lg">
                {/* Sleeping moon icon */}
                <svg className="w-10 h-10 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Announcement */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-indigo-700 mb-3">Dashboard Redesign in Progress</h2>
          <p className="text-gray-700 mb-4">
            We're currently redesigning your sleep dashboard to be more intuitive and insightful.
            The new version will be available soon with improved visualizations and sleep tracking features.
          </p>
          
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="font-medium text-indigo-800 mb-2">Coming Soon</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Beautiful sleep pattern visualizations</li>
              <li>Personalized sleep insights and recommendations</li>
              <li>Enhanced sleep diary with mood tracking</li>
              <li>Weekly and monthly sleep reports</li>
              <li>Sleep goal setting and achievement tracking</li>
            </ul>
                    </div>
                  </div>
                  
        {/* Sample Stats Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Average Sleep", value: "7.5 hrs" },
            { label: "Sleep Quality", value: "Good" },
            { label: "Entries", value: "24" },
            { label: "Sleep Trend", value: "Improving" }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-2xl font-semibold text-indigo-700">{stat.value}</p>
                            </div>
                                ))}
                              </div>
                              
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-center items-center py-12">
            <p className="text-lg text-gray-600">Check back soon for your enhanced sleep dashboard!</p>
            </div>
        </div>
      </div>
    </div>
  );
} 