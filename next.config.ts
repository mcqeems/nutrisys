import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
    serverActions: {
      bodySizeLimit: '3mb',
    },
  },
  images: {
    remotePatterns: [new URL('https://nutrisys.s3.ap-southeast-2.amazonaws.com/images/**')],
  },
};

export default nextConfig;
