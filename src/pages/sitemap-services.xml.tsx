import type { GetServerSideProps } from "next";
import { SITE } from "@/lib/site";
import { ROUTES } from "@/lib/routes";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

type LocaleEntry = { locale: string; path: string };

const hreflangTags = (entries: LocaleEntry[], defaultPath: string) =>
  [
    ...entries.map(
      (e) =>
        `<xhtml:link rel="alternate" hreflang="${e.locale}" href="${esc(`${SITE.domain}${e.path}`)}" />`,
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${esc(`${SITE.domain}${defaultPath}`)}" />`,
  ].join("");

const urlEntry = (loc: string, alts: LocaleEntry[], defaultPath: string) =>
  `<url><loc>${esc(loc)}</loc><changefreq>monthly</changefreq><priority>0.8</priority>${hreflangTags(alts, defaultPath)}</url>`;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const locales = ["fr", "en", "es"] as const;

  const serviceKeys = [
    "services",
    "service-web",
    "service-seo",
    "service-vitrine",
    "service-ecommerce",
    "service-sur-mesure",
    "service-ads",
    "service-social",
  ] as const;

  const urls: string[] = [];

  for (const key of serviceKeys) {
    const entries: LocaleEntry[] = locales.map((locale) => {
      const raw = ROUTES[key][locale];
      const path = locale === "fr" ? raw : `/${locale}${raw === "/" ? "" : raw}`;
      return { locale, path };
    });
    const defaultPath = entries.find((e) => e.locale === "fr")!.path;

    for (const entry of entries) {
      urls.push(urlEntry(`${SITE.domain}${entry.path}`, entries, defaultPath));
    }
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
  res.write(body);
  res.end();
  return { props: {} };
};

export default function SitemapServices() {
  return null;
}
