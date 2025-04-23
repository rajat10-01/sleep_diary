import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { signIn } from '@/lib/auth';

// This route will handle user registration
export async function POST(req: NextRequest) {
  try {
    const { name, email, role } = await req.json();

    if (!name || !email || !role) {
      return NextResponse.json(
        { error: 'Name, email, and role are required' },
        { status: 400 }
      );
    }

    // Validate role
    if (role !== 'PATIENT' && role !== 'DOCTOR') {
      return NextResponse.json(
        { error: 'Role must be either PATIENT or DOCTOR' },
        { status: 400 }
      );
    }

    // Store the user's registration info in a cookie
    // This will be used in the signIn callback when the user clicks the email link
    const registrationData = {
      name,
      role,
      timestamp: Date.now() // Add timestamp for expiration check
    };

    // Set the cookie with the registration data, secure and HTTP-only
    cookies().set({
      name: `registration_${Buffer.from(email).toString('base64')}`,
      value: JSON.stringify(registrationData),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    // Send the registration email using NextAuth email provider
    // We'll redirect to signIn with EmailProvider behind the scenes
    await signIn('email', { 
      email, 
      redirect: false,
      callbackUrl: '/dashboard'
    });

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
} 