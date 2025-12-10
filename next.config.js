/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    ADMIN_USER: process.env.ADMIN_USER,
    ADMIN_PASS: process.env.ADMIN_PASS,
    EMAIL_USER: process.env.EMAIL_USER,
  },

  reactStrictMode: true,
  images: {
    domains: [
      'img.icons8.com',
      'images.unsplash.com',
      'jsonplaceholder.typicode.com',
      'navata.com', // allow WP images
    ],
  },
  async rewrites() {
    return [
      // 1. Blog dynamic routes
      {
        source: '/blog/:path*',
        destination: 'https://navata.com/cms/blog/:path*',
      },

      // 2. Blog root
      {
        source: '/blog',
        destination: 'https://navata.com/cms/blog/',
      },

      // 3. WordPress /wp-content/ assets
      {
        source: '/wp-content/:path*',
        destination: 'https://navata.com/cms/wp-content/:path*',
      },

      // 4. WordPress /wp-includes/ assets
      {
        source: '/wp-includes/:path*',
        destination: 'https://navata.com/cms/wp-includes/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
