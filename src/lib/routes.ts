import type { Locale } from "./site";

export type PageKey =
  | "home"
  | "about"
  | "contact"
  | "legal"
  | "privacy"
  | "blog"
  | "realisations"
  | "services"
  | "service-web"
  | "service-seo"
  | "service-vitrine"
  | "service-ecommerce"
  | "service-sur-mesure"
  | "service-ads"
  | "service-social";

/**
 * Single source of truth for all routes.
 * Pretty translated URLs for every locale.
 * Server-side rewrites (beforeFiles) in next.config.ts ensure these resolve
 * to the actual page files.
 */
export const ROUTES: Record<PageKey, Record<Locale, string>> = {
  home: { fr: "/", en: "/", es: "/" },
  about: { fr: "/a-propos", en: "/about", es: "/sobre-nosotros" },
  contact: { fr: "/contact", en: "/contact", es: "/contacto" },
  legal: {
    fr: "/mentions-legales",
    en: "/legal-notice",
    es: "/aviso-legal",
  },
  privacy: {
    fr: "/politique-confidentialite",
    en: "/privacy-policy",
    es: "/politica-de-privacidad",
  },
  blog: { fr: "/blog", en: "/blog", es: "/blog" },
  realisations: { fr: "/realisations", en: "/portfolio", es: "/realizaciones" },
  services: { fr: "/services", en: "/services", es: "/servicios" },
  "service-web": {
    fr: "/services/creation-site-internet",
    en: "/services/web-design",
    es: "/servicios/diseno-web",
  },
  "service-seo": {
    fr: "/services/referencement-seo",
    en: "/services/seo",
    es: "/servicios/seo",
  },
  "service-vitrine": {
    fr: "/services/site-vitrine-wordpress",
    en: "/services/wordpress-showcase",
    es: "/servicios/sitio-vitrina-wordpress",
  },
  "service-ecommerce": {
    fr: "/services/site-ecommerce-shopify",
    en: "/services/shopify-ecommerce",
    es: "/servicios/tienda-shopify",
  },
  "service-sur-mesure": {
    fr: "/services/site-sur-mesure",
    en: "/services/custom-website",
    es: "/servicios/sitio-a-medida",
  },
  "service-ads": {
    fr: "/services/google-ads",
    en: "/services/google-ads",
    es: "/servicios/google-ads",
  },
  "service-social": {
    fr: "/services/reseaux-sociaux",
    en: "/services/social-media",
    es: "/servicios/redes-sociales",
  },
};

/**
 * Generate a localized URL — used everywhere (navigation, SEO, links).
 */
export const localizedPath = (key: PageKey, locale: Locale): string => {
  const path = ROUTES[key][locale];
  if (locale === "fr") return path;
  return `/${locale}${path === "/" ? "" : path}`;
};

/** Alias for localizedPath — kept for clarity in SEO contexts. */
export const seoPath = localizedPath;

export const allLocaleVariants = (
  key: PageKey,
): Array<{ locale: Locale; path: string }> =>
  (Object.keys(ROUTES[key]) as Locale[]).map((locale) => ({
    locale,
    path: localizedPath(key, locale),
  }));

export const PAGE_KEYS: PageKey[] = [
  "home",
  "about",
  "blog",
  "realisations",
  "services",
  "service-web",
  "service-seo",
  "service-vitrine",
  "service-ecommerce",
  "service-sur-mesure",
  "service-ads",
  "service-social",
  "contact",
  "legal",
  "privacy",
];
