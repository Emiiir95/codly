import type { Locale } from "./site";
import type { PageKey } from "./routes";

export type ServiceId =
  | "web"
  | "seo"
  | "vitrine"
  | "ecommerce"
  | "sur-mesure"
  | "ads"
  | "social";

export type ServicePageKey = Extract<
  PageKey,
  | "service-web"
  | "service-seo"
  | "service-vitrine"
  | "service-ecommerce"
  | "service-sur-mesure"
  | "service-ads"
  | "service-social"
>;

export const SERVICE_NS: Record<ServiceId, string> = {
  web: "serviceWeb",
  seo: "serviceSeo",
  vitrine: "serviceVitrine",
  ecommerce: "serviceEcommerce",
  "sur-mesure": "serviceSurMesure",
  ads: "serviceAds",
  social: "serviceSocial",
};

export const SERVICE_PAGE_KEY: Record<ServiceId, ServicePageKey> = {
  web: "service-web",
  seo: "service-seo",
  vitrine: "service-vitrine",
  ecommerce: "service-ecommerce",
  "sur-mesure": "service-sur-mesure",
  ads: "service-ads",
  social: "service-social",
};

export const SERVICES: ReadonlyArray<{
  id: ServiceId;
  pageKey: ServicePageKey;
  slugs: Record<Locale, string>;
}> = [
  {
    id: "web",
    pageKey: "service-web",
    slugs: {
      fr: "creation-site-internet",
      en: "web-design",
      es: "diseno-web",
    },
  },
  {
    id: "seo",
    pageKey: "service-seo",
    slugs: {
      fr: "referencement-seo",
      en: "seo",
      es: "seo",
    },
  },
  {
    id: "vitrine",
    pageKey: "service-vitrine",
    slugs: {
      fr: "site-vitrine-wordpress",
      en: "wordpress-showcase",
      es: "sitio-vitrina-wordpress",
    },
  },
  {
    id: "ecommerce",
    pageKey: "service-ecommerce",
    slugs: {
      fr: "site-ecommerce-shopify",
      en: "shopify-ecommerce",
      es: "tienda-shopify",
    },
  },
  {
    id: "sur-mesure",
    pageKey: "service-sur-mesure",
    slugs: {
      fr: "site-sur-mesure",
      en: "custom-website",
      es: "sitio-a-medida",
    },
  },
  {
    id: "ads",
    pageKey: "service-ads",
    slugs: {
      fr: "google-ads",
      en: "google-ads",
      es: "google-ads",
    },
  },
  {
    id: "social",
    pageKey: "service-social",
    slugs: {
      fr: "reseaux-sociaux",
      en: "social-media",
      es: "redes-sociales",
    },
  },
];

export const getServiceBySlug = (
  slug: string,
  locale: Locale,
): (typeof SERVICES)[number] | undefined =>
  SERVICES.find((service) => service.slugs[locale] === slug);
