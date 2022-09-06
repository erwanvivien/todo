/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  swcMinify: true,
}

module.exports = nextConfig
