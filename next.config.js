/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  experimental: {
    // heic-convert ships a large libheif WebAssembly bundle that must not be
    // processed by the bundler; load it from node_modules at runtime instead.
    serverComponentsExternalPackages: ['heic-convert'],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
