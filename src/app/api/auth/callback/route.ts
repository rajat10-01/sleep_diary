import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../[...nextauth]/route';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // If no session, redirect to signin
    if (!session) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }
    
    // Redirect based on user role
    if (session.user?.role === 'DOCTOR') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    } else if (session.user?.role === 'PATIENT') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    
    // Default redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', req.url));
  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.redirect(new URL('/?error=callback_error', req.url));
  }
} 