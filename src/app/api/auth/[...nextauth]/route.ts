import NextAuth from 'next-auth';
import { authOptions } from './auth-options';

// Create the handler
const handler = NextAuth(authOptions);

// Re-export authOptions for backward compatibility
export { authOptions };

// Export the handler for GET and POST requests
export { handler as GET, handler as POST }; 