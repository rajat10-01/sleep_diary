/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Disable type checking during build for faster builds
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build for faster builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable strict mode for now to avoid potential issues
  reactStrictMode: false,
  // Skip type checking in build
  skipTypeCheck: true,
  // Don't throw on ESLint errors
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  // Disable font optimization for faster builds
  optimizeFonts: false,
  // Turn off image optimization for faster builds
  images: {
    disableStaticImages: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig; 