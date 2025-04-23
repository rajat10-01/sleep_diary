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
};

export default nextConfig; 