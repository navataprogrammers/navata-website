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

  // --- REVERSE PROXY / REWRITES CONFIGURATION ---
  async rewrites() {
    return [
      // DUMMY TEST REWRITE: /blog/* will proxy 
      {
        source: '/blog/:path*',
        // destination
        destination: 'https://navata.com/cms/blog'
      },
    ];
  },
}
module.exports = nextConfig;