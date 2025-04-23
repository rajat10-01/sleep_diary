'use client';

import { SessionProvider } from 'next-auth/react';

// This component ensures that the SessionProvider is available for all components
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider
      // Decrease refetch frequency to avoid excessive requests
      refetchOnWindowFocus={false} 
      refetchInterval={5 * 60} // Refresh session every 5 minutes
    >
      {children}
    </SessionProvider>
  );
} 