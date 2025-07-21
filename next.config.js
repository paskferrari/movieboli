// Configurazione PWA con opzioni ottimizzate per evitare problemi di ricorsione
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/chunks\//, /\.next\/static\//, /\.next\/server\//],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 1 year
        }
      }
    },
    {
      urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-font-assets',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
        }
      }
    },
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-image-assets',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        }
      }
    },
    {
      urlPattern: /\.(?:js)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-js-assets',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        }
      }
    },
    {
      urlPattern: /\.(?:css|less)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-style-assets',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        }
      }
    },
    {
      urlPattern: /^https:\/\/api\..*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'apis',
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        },
        networkTimeoutSeconds: 10
      }
    },
    // Removed catch-all pattern /.*/i that was causing build recursion issues
    // This pattern was too broad and interfered with Next.js build tracing
  ]
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Esclude pattern problematici durante la fase di build
  exclude: [
    /node_modules/,
    /\.git/,
    /\.next\/cache/
  ],
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['it-IT'],
    defaultLocale: 'it-IT',
  },
  images: {
    domains: ['via.placeholder.com', 'i.ibb.co', 'i.postimg.cc'],
    formats: ['image/webp', 'image/avif'],
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com'
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co'
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc'
      }
    ]
  },
  experimental: {
    optimizeCss: true,
  },
  // Usa il formato di output standalone per evitare problemi di ricorsione
  output: 'standalone',
  // PWA Configuration
  headers: async () => {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate'
          }
        ]
      }
    ];
  }
}

module.exports = withPWA(nextConfig)