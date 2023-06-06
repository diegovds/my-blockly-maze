/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  headers: async () => {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Headers", value: "*" },
          { key: "Access-Control-Request-Headers", value: "*" },
        ],
      },
    ];
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
