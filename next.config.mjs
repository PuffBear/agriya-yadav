/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/now", destination: "/shelf", permanent: true }];
  },
};

export default nextConfig;
