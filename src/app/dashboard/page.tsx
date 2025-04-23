'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
import PatientDashboard from '@/components/patient/PatientDashboard';
import DoctorDashboard from '@/components/doctor/DoctorDashboard';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);

  // Wait for client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loading state while session is being fetched or during server render
  if (!isClient || status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse flex space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-3 h-3 bg-indigo-400 rounded-full" style={{ 
              animationDelay: `${i * 0.1}s` 
            }}></div>
          ))}
        </div>
      </div>
    );
  }

  // Redirect to home if not authenticated
  if (status === 'unauthenticated') {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-red-500 mb-4">Access Denied. Please sign in.</p>
        <a 
          href="/api/auth/signin"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Sign In
        </a>
      </div>
    );
  }

  // Ensure session and user role exist
  if (!session || !session.user || !session.user.role) {
    return <p className="text-center py-10">Error: Unable to determine user role.</p>;
  }

  // Render dashboard based on role
  const { role } = session.user;

  if (role === 'PATIENT') {
    return <PatientDashboard user={session.user} />;
  }

  if (role === 'DOCTOR') {
    return <DoctorDashboard />;
  }

  return <p className="text-center py-10">Error: Unknown user role: {role}</p>;
} 