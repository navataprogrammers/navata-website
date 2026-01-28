/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    unoptimized: true,
    domains: [
      "img.icons8.com",
      "images.unsplash.com",
      "jsonplaceholder.typicode.com",
    ],
  },

  //  AMPLIFY + CLOUDFRONT CACHE
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
    ];
  },

  // Redirects for old URLs
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'navata.com',
          },
        ],
        destination: 'https://www.navata.com/:path*',
        permanent: true,
      },
      // Redirect .php URLs to non-.php
      {
        source: '/:path*.php',
        destination: '/:path*',
        permanent: true,
      },
    ];
  }
};

module.exports = nextConfig;
