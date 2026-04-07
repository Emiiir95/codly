import type { Locale } from "./site";

/**
 * Canonical page keys → translated path per locale (without leading locale prefix).
 * The "real" Next.js page lives at the FR slug; English/Spanish slugs are exposed
 * via rewrites in next.config.ts so URLs are localized for SEO.
 */
export type PageKey =
  | "home"
  | "about"
  | "contact"
  | "legal"
  | "privacy"
  | "service-web"
  | "service-seo";

export const ROUTES: Record<PageKey, Record<Locale, string>> = {
  home: { fr: "/", en: "/", es: "/" },
  about: {
    fr: "/a-propos",
    en: "/about",
    es: "/sobre-nosotros",
  },
  contact: {
    fr: "/contact",
    en: "/contact",
    es: "/contacto",
  },
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
};

/** Build a fully-qualified localized URL path including the locale prefix. */
export const localizedPath = (key: PageKey, locale: Locale): string => {
  const path = ROUTES[key][locale];
  if (locale === "fr") return path;
  return `/${locale}${path === "/" ? "" : path}`;
};

/** Get every locale variant of a given page (used for hreflang + sitemap). */
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
  "service-web",
  "service-seo",
  "contact",
  "legal",
  "privacy",
];
