const _ = require("lodash");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  swcMinify: true,
  webpack: config => {
    const cssRules = _.find(config.module.rules, (rule) => !!rule.oneOf).oneOf;
    const cssLoaderRules = _.filter(cssRules, (rule) => _.includes(JSON.stringify(rule.use), 'css-loader'));
    const loaders = _.filter(_.flatMap(cssLoaderRules, 'use'), (loader) => !!loader.options.modules);
    for (const loader of loaders) {
      loader.options.modules.exportLocalsConvention = 'camelCase';
    }
    return config;
  },
  async headers() {
    return [
      {
        source: '/:all*(wasm)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'application/wasm',
          }
        ],
      },
    ]
  },
}

module.exports = nextConfig
