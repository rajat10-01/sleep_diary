import { type NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { compare } from 'bcrypt';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    }),
    // Add Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role || 'PATIENT', // Default role for Google sign-ins
        };
      },
    }),
    // Add simple credentials login option (username/password)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // For demo purposes, use hardcoded credentials for the demo accounts
        // In production, you would use proper password verification
        if (credentials.email === 'doctor@example.com' && credentials.password === 'password') {
          const user = await prisma.user.findUnique({
            where: { email: 'doctor@example.com' },
          });
          return user;
        }
        
        if (credentials.email === 'patient@example.com' && credentials.password === 'password') {
          const user = await prisma.user.findUnique({
            where: { email: 'patient@example.com' },
          });
          return user;
        }
        
        // For real users, you'd implement proper password verification
        // const user = await prisma.user.findUnique({
        //   where: { email: credentials.email }
        // });
        // if (user && user.password) {
        //   const isValid = await compare(credentials.password, user.password);
        //   if (isValid) return user;
        // }
        
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt', // Use JWT for session strategy
  },
  callbacks: {
    async session({ session, token }) {
      // Add custom properties to the session object
      if (token && session.user) {
        session.user.id = token.sub; // Add user ID from token
        session.user.role = token.role; // Add user role from token
      }
      return session;
    },
    async jwt({ token, user }) {
      // This callback is called whenever a JWT is created or updated.
      // The `user` object is only passed on initial sign-in.
      if (user) {
        // On sign-in, persist the user role and ID to the token
        token.sub = user.id;
        // Fetch the user role from the DB if not already present (might be redundant if using adapter)
        // We need to query the DB because the `user` object passed here might not have custom fields like `role`
        // directly, especially after initial sign up before the adapter fully links things.
        const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
        token.role = dbUser?.role;
      }
      return token;
    },
    // Add a callback to set the default role on user creation
    async signIn({ user, account, profile, email, credentials }) {
      try {
        // Check if this is a new user
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
          include: { patientProfile: true, doctorProfile: true }
        });
        
        const isNewUser = !existingUser;
        
        if (isNewUser && user.email) {
          // For new users, check if we have registration data in a cookie
          let role = 'PATIENT'; // Default role
          let name = user.name || user.email?.split('@')[0] || 'User'; // Default name
          
          // Try to get registration data from cookie
          const registrationCookieName = `registration_${Buffer.from(user.email).toString('base64')}`;
          const registrationCookie = cookies().get(registrationCookieName);
          
          if (registrationCookie) {
            try {
              const registrationData = JSON.parse(registrationCookie.value);
              if (registrationData.role) {
                role = registrationData.role;
              }
              if (registrationData.name) {
                name = registrationData.name;
              }
              
              // Clear the cookie now that we've used it
              cookies().delete(registrationCookieName);
            } catch (e) {
              console.error('Error parsing registration cookie:', e);
            }
          }
          
          // Update the user with the role and name
          await prisma.user.update({
            where: { email: user.email },
            data: { 
              role,
              name
            }
          });
          
          // Create the appropriate profile based on role
          if (role === 'PATIENT') {
            await prisma.patientProfile.create({
              data: {
                user: { connect: { email: user.email } }
              }
            });
          } else if (role === 'DOCTOR') {
            await prisma.doctorProfile.create({
              data: {
                user: { connect: { email: user.email } }
              }
            });
          }
        } else if (existingUser) {
          // Check if the user role exists but the profile doesn't
          // This can happen if the user was created but the profile creation failed
          if (existingUser.role === 'PATIENT' && !existingUser.patientProfile) {
            await prisma.patientProfile.create({
              data: {
                user: { connect: { id: existingUser.id } }
              }
            });
          } else if (existingUser.role === 'DOCTOR' && !existingUser.doctorProfile) {
            await prisma.doctorProfile.create({
              data: {
                user: { connect: { id: existingUser.id } }
              }
            });
          }
        }
        
        return true; // Continue the sign-in process
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return true; // Continue the sign-in process even if profile creation fails
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
    //signOut: '/auth/signout',
    //error: '/auth/error', // Error code passed in query string as ?error=
    //verifyRequest: '/auth/verify-request', // (used for check email message)
    //newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out to disable)
  },
  // Add default callback URL
  defaultCallbackUrl: '/api/auth/callback'
}; 