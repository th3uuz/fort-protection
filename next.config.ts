import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 85],
  },
  async redirects() {
    return [
      {
        source: "/httpswwwfortprotectionpatrimonialcombrsegurancapatrimonial",
        destination: "/servicos",
        permanent: true,
      },
      {
        source: "/servicos/cobertura-de-ferias",
        destination: "/servicos/interinos",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/#perguntas",
        permanent: true,
      },
      {
        source: "/httpscontatemefortprotection",
        destination: "/contato",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
