import { SITE, type Locale } from "./site";
import { allLocaleVariants, seoPath, type PageKey } from "./routes";

export type SeoProps = {
  title: string;
  description: string;
  pageKey: PageKey;
  locale: Locale;
  image?: string;
  noindex?: boolean;
};

export const buildHreflang = (
  pageKey: PageKey,
): Array<{ hrefLang: string; href: string }> => {
  const variants: Array<{ hrefLang: string; href: string }> = allLocaleVariants(
    pageKey,
  ).map((v) => ({
    hrefLang: v.locale,
    href: `${SITE.domain}${v.path}`,
  }));
  variants.push({
    hrefLang: "x-default",
    href: `${SITE.domain}${seoPath(pageKey, "fr")}`,
  });
  return variants;
};

export const buildCanonical = (pageKey: PageKey, locale: Locale): string =>
  `${SITE.domain}${seoPath(pageKey, locale)}`;
