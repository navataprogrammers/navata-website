/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    ADMIN_USER: process.env.ADMIN_USER,
    ADMIN_PASS: process.env.ADMIN_PASS,
    EMAIL_USER: process.env.EMAIL_USER,  },
  reactStrictMode: true,
  images: {
    domains: ['img.icons8.com', 'images.unsplash.com', 'jsonplaceholder.typicode.com'], 
  },
  async rewrites() {
  return [
    // 1. Rewrite for all blog paths
    {
      source: '/blog/:path*',
      destination: 'https://navata.com/cms/blog/:path*',
    },

    // 2. Rewrite for root /blog page
    {
      source: '/blog',
      destination: 'https://navata.com/cms/blog',
    },

    // 3. WordPress assets
    {
      source: '/wp-content/:path*',
      destination: 'https://navata.com/cms/wp-content/:path*',
    },
    {
      source: '/wp-includes/:path*',
      destination: 'https://navata.com/cms/wp-includes/:path*',
    },
  ];
}
};

module.exports = nextConfig;