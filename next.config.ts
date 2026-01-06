import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Other experimental options can go here if needed in the future
  },
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          // HSTS is usually handled by the proxy/Vercel, but we can add it here too for production
          // Note: strict-transport-security is only applied on HTTPS.
          ...(process.env.NODE_ENV === 'production' ? [{
              key: 'Strict-Transport-Security',
              value: 'max-age=63072000; includeSubDomains; preload'
          }] : [])
        ],
      },
    ];
  },
};

export default nextConfig;
