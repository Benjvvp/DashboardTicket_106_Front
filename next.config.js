/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
}

module.exports = nextConfig
