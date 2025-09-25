import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
};

export default nextConfig;
