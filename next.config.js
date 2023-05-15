/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.innoloft.com",
      },
    ],
  },
};

module.exports = nextConfig;
