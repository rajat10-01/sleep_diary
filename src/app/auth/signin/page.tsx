'use client';

import { useState, FormEvent, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-3.51 1.758-6.628 4.43-8.493a.75.75 0 01.819.162z" clipRule="evenodd" />
  </svg>
);

interface FormData {
  email: string;
  password: string;
}

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/api/auth/callback';
  const error = searchParams.get('error');

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [authError, setAuthError] = useState(error || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (authError) setAuthError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
        callbackUrl,
      });

      if (result?.error) {
        setAuthError(result.error);
      } else if (result?.url) {
        router.push(result.url);
        router.refresh();
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setAuthError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async () => {
    setLoading(true);
    setAuthError('');

    try {
      const result = await signIn('email', {
        redirect: false,
        email: formData.email,
        callbackUrl,
      });

      if (result?.error) {
        setAuthError(result.error);
      } else {
        setEmailSent(true);
      }
    } catch (error) {
      console.error('Email sign-in error:', error);
      setAuthError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Demo account helpers
  const loginAsDoctor = async () => {
    setLoading(true);
    await signIn('credentials', {
      redirect: true,
      email: 'doctor@example.com',
      password: 'password',
      callbackUrl,
    });
  };

  const loginAsPatient = async () => {
    setLoading(true);
    await signIn('credentials', {
      redirect: true,
      email: 'patient@example.com',
      password: 'password',
      callbackUrl,
    });
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
        <motion.div 
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <MoonIcon className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Check your email</h2>
            <p className="text-gray-600 mb-6">
              We've sent a sign-in link to <span className="font-medium">{formData.email}</span>. 
              Please check your inbox and click the link to continue.
            </p>
            <button
              onClick={() => setEmailSent(false)}
              className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Back to sign-in
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <MoonIcon className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Sign in to SleepDiary</h2>
          <p className="text-gray-600 mt-1">Track your sleep and feel refreshed</p>
        </div>

        {authError && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
            {authError === 'CredentialsSignin' 
              ? 'Invalid email or password' 
              : authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password (for demo accounts)
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={loading || !formData.email || !formData.password}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign in with Password'}
            </button>

            <button
              type="button"
              onClick={handleEmailSignIn}
              disabled={loading || !formData.email}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Sending...' : 'Sign in with Email Link'}
            </button>

            <button
              type="button"
              onClick={() => signIn('google', { callbackUrl })}
              className="w-full bg-white text-gray-800 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
        </form>

        <div className="mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account? <Link href="/auth/register" className="text-indigo-600 hover:text-indigo-800">Create an account</Link>
          </p>
        </div>

        {/* Demo account section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Demo Accounts</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={loginAsDoctor}
              className="bg-green-50 hover:bg-green-100 text-green-700 py-2 px-4 rounded-md text-sm transition-colors"
            >
              Sign in as Doctor
            </button>
            <button
              onClick={loginAsPatient}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-md text-sm transition-colors"
            >
              Sign in as Patient
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Add a loading fallback for the Suspense boundary
function SignInLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full flex justify-center items-center">
        <div className="animate-pulse text-center">
          <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <MoonIcon className="w-8 h-8 text-indigo-300" />
          </div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={<SignInLoading />}>
      <SignInContent />
    </Suspense>
  );
} 