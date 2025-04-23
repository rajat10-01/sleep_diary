'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const DoctorDashboard: React.FC = () => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before doing anything with the session
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>
      <p className="text-gray-700 mb-8">
        The Doctor Dashboard is currently being redesigned and will be available soon.
        We're improving the interface to provide better insights into your patients' sleep patterns.
      </p>
                  
      <div className="bg-indigo-50 p-6 rounded-lg">
        <h2 className="text-lg font-semibold text-indigo-700 mb-2">Coming Soon</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>Patient list with sleep quality trends</li>
          <li>Sleep quality analytics dashboard</li>
          <li>Patient sleep history timeline</li>
          <li>Notification system for concerning sleep patterns</li>
        </ul>
      </div>
    </div>
  );
};

export default DoctorDashboard; 