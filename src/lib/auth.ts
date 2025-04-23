import { AuthError } from 'next-auth';
import { SignInOptions } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Re-export signIn for server-side use
export async function signIn(
  provider: string,
  options: SignInOptions
): Promise<any> {
  try {
    // This is server-side signIn for initiating auth flow
    // In NextAuth.js v4, there's no direct server-side signIn equivalent
    // So we need to access the provider's logic through authOptions
    
    // For email provider, we need to:
    // 1. Generate the sign-in token
    // 2. Send the email
    // 3. Return success

    if (provider === 'email') {
      const { email, callbackUrl } = options;
      
      // Access the email provider from authOptions
      const emailProvider = authOptions.providers.find(
        (p) => p.id === 'email'
      );

      if (!emailProvider || !email) {
        throw new AuthError('Configuration error');
      }

      // Use the email provider's sendVerificationRequest function
      // This is a bit of a hack, but it's the only way to access this functionality server-side
      const token = await generateVerificationToken(email);
      
      // We need to call the provider's sendVerificationRequest
      // This is not ideal, but there's no official API for this in Next-Auth v4
      await (emailProvider as any).sendVerificationRequest({
        identifier: email,
        url: `${process.env.NEXTAUTH_URL}/api/auth/callback/email?token=${token}&email=${encodeURIComponent(email)}&callbackUrl=${encodeURIComponent(callbackUrl || '/dashboard')}`,
        provider: emailProvider,
        token,
      });

      return { success: true };
    }

    throw new AuthError('Unsupported provider for server-side signIn');
  } catch (error) {
    console.error('Error in server-side signIn:', error);
    throw error;
  }
}

// For email verification flow
async function generateVerificationToken(email: string): Promise<string> {
  // In a real implementation, this would generate a secure token
  // and store it in your database
  // This is a simplified example
  return Buffer.from(`${email}-${Date.now()}`).toString('base64');
}

export async function getSession() {
  return getServerSession(authOptions);
} 