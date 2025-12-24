/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      'img.icons8.com',
      'images.unsplash.com',
      'jsonplaceholder.typicode.com'
    ],
  },
  async rewrites() {
  return [
    {
      source: '/blog/wp-content/:path*',
      destination: 'https://blog.navata.com/wp-content/:path*',
    },
    {
      source: '/blog/wp-includes/:path*',
      destination: 'https://blog.navata.com/wp-includes/:path*',
    },
    {
      source: '/blog/:path*',
      destination: 'https://blog.navata.com/:path*',
    },
    {
      source: '/blog',
      destination: 'https://blog.navata.com',
    },
  ];
  }
}

module.exports = nextConfig;