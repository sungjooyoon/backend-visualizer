/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['react-force-graph', 'vis-network', 'vis-data'],
}

export default nextConfig 