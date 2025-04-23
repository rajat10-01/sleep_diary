import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get the session token using getToken
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  // Check if the user is logged in
  const isLoggedIn = !!token;
  
  // Define paths that are always accessible
  const publicPaths = ['/', '/auth/signin', '/api/auth'];
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(path + '/')
  );
  
  // Check if user is accessing dashboard or protected route
  const isProtectedPath = pathname === '/dashboard' || pathname.startsWith('/dashboard/');
  
  // If the user is not logged in and trying to access a protected route
  if (!isLoggedIn && isProtectedPath) {
    const redirectUrl = new URL('/auth/signin', request.url);
    redirectUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(redirectUrl);
  }
  
  // If the user is logged in and on the homepage or auth pages
  if (isLoggedIn && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Continue for all other cases
  return NextResponse.next();
}

// Define which paths this middleware will run on
export const config = {
  matcher: ['/', '/dashboard/:path*', '/auth/:path*'],
}; 