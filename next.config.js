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
      // 1. Rewrite for content paths (posts, pages, categories, etc.)
      // The :path* parameter ensures everything after /blog/ is passed to the destination URL.
      {
        source: '/blog/:path*',
        // Assumes your WordPress content lives at https://navata.com/cms/blog/content
        destination: 'https://blog.navata.com/blog/:path*', 
      },
      // 2. Rewrite for the root blog page itself (/blog)
      {
        source: '/blog',
        destination: 'https://blog.navata.com/blog/',
      },
      // 3. CRITICAL: Rewrite for WordPress assets (JS, CSS, Images)                                     
      // WordPress typically serves assets from /wp-content or /wp-includes
      {
        source: '/wp-content/:path*',
        destination: 'https://blog.navata.com/blog/wp-content/:path*',
      },
      {
        source: '/wp-includes/:path*',
        destination: 'https://blog.navata.com/blog/wp-includes/:path*',
      },
    ];
  },
}
module.exports = nextConfig;                                                                                                                                                                                                  