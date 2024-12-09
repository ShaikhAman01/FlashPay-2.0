/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.html$/,
      type: 'asset/source', // This will treat .html files as source files, not modules
    });
    return config;
  },
};
