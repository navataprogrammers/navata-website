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
      'navata.com',
    ],
  },

  async rewrites() {
    return [
      // Blog pages stay on AWS URL (reverse-proxy will fetch WP)
      {
        source: '/blog/:path*',
        destination: '/cms/blog/:path*',
      },

      {
        source: '/blog',
        destination: '/cms/blog',
      },

      // WordPress assets proxied internally
      {
        source: '/wp-content/:path*',
        destination: '/cms/wp-content/:path*',
      },
      {
        source: '/wp-includes/:path*',
        destination: '/cms/wp-includes/:path*',
      }
    ];
  },
};

module.exports = nextConfig;
