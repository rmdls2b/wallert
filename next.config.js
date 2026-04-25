/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "script-src 'self' 'unsafe-eval' 'unsafe-inline';",
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/fr/login",
        destination: "/login",
        permanent: false,
      },
      {
        source: "/fr/register",
        destination: "/register",
        permanent: false,
      },
      {
        source: "/fr/my-account",
        destination: "/my-account",
        permanent: false,
      },
    ]
  },
}
module.exports = nextConfig
