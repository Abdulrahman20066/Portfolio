/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow large file uploads
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  // Transpile Three.js packages
  transpilePackages: ['three'],
};

module.exports = nextConfig;
