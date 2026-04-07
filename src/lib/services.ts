import type { Locale } from "./site";
import type { PageKey } from "./routes";

export type ServiceId = "web" | "seo";

export const SERVICES: ReadonlyArray<{
  id: ServiceId;
  pageKey: Extract<PageKey, "service-web" | "service-seo">;
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
];

export const getServiceBySlug = (
  slug: string,
  locale: Locale,
): (typeof SERVICES)[number] | undefined =>
  SERVICES.find((service) => service.slugs[locale] === slug);
