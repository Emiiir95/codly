import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en", "es"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return {
      beforeFiles: [
        // ── English pretty URLs → real file paths ──
        // locale: false = match FULL url before i18n strips the prefix
        {
          source: "/en/about",
          destination: "/en/a-propos",
          locale: false,
        },
        {
          source: "/en/legal-notice",
          destination: "/en/mentions-legales",
          locale: false,
        },
        {
          source: "/en/privacy-policy",
          destination: "/en/politique-confidentialite",
          locale: false,
        },
        {
          source: "/en/portfolio",
          destination: "/en/realisations",
          locale: false,
        },

        // ── Spanish pretty URLs → real file paths ──
        {
          source: "/es/sobre-nosotros",
          destination: "/es/a-propos",
          locale: false,
        },
        {
          source: "/es/contacto",
          destination: "/es/contact",
          locale: false,
        },
        {
          source: "/es/aviso-legal",
          destination: "/es/mentions-legales",
          locale: false,
        },
        {
          source: "/es/politica-de-privacidad",
          destination: "/es/politique-confidentialite",
          locale: false,
        },
        {
          source: "/es/realizaciones",
          destination: "/es/realisations",
          locale: false,
        },
        {
          source: "/es/servicios",
          destination: "/es/services",
          locale: false,
        },
        {
          source: "/es/servicios/:slug",
          destination: "/es/services/:slug",
          locale: false,
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
