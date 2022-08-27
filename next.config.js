/** @type {import('next').Next} */
const next = {
  reactStrictMode: true,
  swcMinify: true,
}

// module.exports = next
module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};
