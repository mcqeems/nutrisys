import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
    serverActions: {
      bodySizeLimit: '3mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'elasticbeanstalk-ap-southeast-1-812125550400.s3.ap-southeast-1.amazonaws.com',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
