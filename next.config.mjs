/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Configuration Turbopack (silence l'erreur Next.js 16)
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('mongoose')
    }
    return config
  },
}

export default nextConfig
