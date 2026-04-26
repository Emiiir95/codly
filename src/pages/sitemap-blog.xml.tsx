import type { GetServerSideProps } from "next";
import { SITE } from "@/lib/site";
import { getAllPostSlugs } from "@/lib/blog";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const locales = ["fr", "en", "es"] as const;
  const slugsByLocale: Record<string, string[]> = {};

  for (const locale of locales) {
    slugsByLocale[locale] = getAllPostSlugs(locale);
  }

  const allSlugs = [...new Set(Object.values(slugsByLocale).flat())];

  const urls: string[] = [];

  for (const slug of allSlugs) {
    const entries = locales
      .filter((locale) => slugsByLocale[locale].includes(slug))
      .map((locale) => {
        const path = locale === "fr" ? `/blog/${slug}` : `/${locale}/blog/${slug}`;
        return { locale, path };
      });

    if (entries.length === 0) continue;

    const defaultEntry = entries.find((e) => e.locale === "fr") ?? entries[0];

    const alts = entries
      .map(
        (e) =>
          `<xhtml:link rel="alternate" hreflang="${e.locale}" href="${esc(`${SITE.domain}${e.path}`)}" />`,
      )
      .join("");
    const xDefault = `<xhtml:link rel="alternate" hreflang="x-default" href="${esc(`${SITE.domain}${defaultEntry.path}`)}" />`;

    for (const entry of entries) {
      urls.push(
        `<url><loc>${esc(`${SITE.domain}${entry.path}`)}</loc><changefreq>weekly</changefreq><priority>0.6</priority>${alts}${xDefault}</url>`,
      );
    }
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
  res.write(body);
  res.end();
  return { props: {} };
};

export default function SitemapBlog() {
  return null;
}
