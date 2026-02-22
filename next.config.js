/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/mission-control-os',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
