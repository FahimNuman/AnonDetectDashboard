/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    // Add remotePatterns instead of domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      // {
      //   protocol: "https",
      //   hostname: "investment-server-a1qr\\.onrender\\.com",
      //   pathname: "**",
      // },

      {
        protocol: "https",
        hostname: "investment-server-wwat.vercel.app",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "**",
      },
    ],
  },
};
