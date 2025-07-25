/* eslint-disable @typescript-eslint/no-require-imports */
import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;

module.exports = withPWA(nextConfig);
