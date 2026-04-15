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
    return [
      // ---------- English route aliases ----------
      { source: "/en/about", destination: "/en/a-propos" },
      { source: "/en/legal-notice", destination: "/en/mentions-legales" },
      {
        source: "/en/privacy-policy",
        destination: "/en/politique-confidentialite",
      },
      { source: "/en/portfolio", destination: "/en/realisations" },

      // ---------- Spanish route aliases ----------
      { source: "/es/sobre-nosotros", destination: "/es/a-propos" },
      { source: "/es/contacto", destination: "/es/contact" },
      { source: "/es/aviso-legal", destination: "/es/mentions-legales" },
      {
        source: "/es/politica-de-privacidad",
        destination: "/es/politique-confidentialite",
      },
      { source: "/es/realizaciones", destination: "/es/realisations" },
      // Service prefix alias (Spanish "servicios" → "services")
      { source: "/es/servicios/:slug", destination: "/es/services/:slug" },
    ];
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
