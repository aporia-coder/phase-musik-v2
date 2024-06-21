/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chillhop.com',
        port: '',
      },
    ],
  },
}

export default nextConfig
