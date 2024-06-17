/** @type {import('next').NextConfig} */
const nextConfig = {
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
