import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'instagram.com',
      },
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: false,
    scrollRestoration: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000'
          }
        ]
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000'
          }
        ]
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600'
          }
        ]
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600'
          },
          {
            key: 'Content-Type',
            value: 'application/xml'
          }
        ]
      },
      {
        source: '/sitemap-index.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600'
          },
          {
            key: 'Content-Type',
            value: 'application/xml'
          }
        ]
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap.xml'
      },
      {
        source: '/robots.txt',
        destination: '/robots.txt'
      }
    ]
  }
}

export default nextConfig
