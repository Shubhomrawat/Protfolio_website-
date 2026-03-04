/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [], // Add any external image domains here
  },
  // Enable static export for GitHub Pages
  output: 'export',
}

module.exports = nextConfig