import type { GetServerSideProps } from "next";
import { SITE } from "@/lib/site";
import { PAGE_KEYS, allLocaleVariants, type PageKey } from "@/lib/routes";

const escapeXml = (s: string) =>
  s.replace(/[<>&'"]/g, (c) =>
    c === "<"
      ? "&lt;"
      : c === ">"
        ? "&gt;"
        : c === "&"
          ? "&amp;"
          : c === "'"
            ? "&apos;"
            : "&quot;",
  );

const buildSitemap = () => {
  const lastmod = new Date().toISOString();
  const urls: string[] = [];

  for (const key of PAGE_KEYS as PageKey[]) {
    const variants = allLocaleVariants(key);
    for (const v of variants) {
      const loc = `${SITE.domain}${v.path}`;
      const alternates = variants
        .map(
          (alt) =>
            `<xhtml:link rel="alternate" hreflang="${alt.locale}" href="${escapeXml(
              `${SITE.domain}${alt.path}`,
            )}" />`,
        )
        .join("");
      const xDefault = `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(
        `${SITE.domain}${variants.find((a) => a.locale === "fr")?.path ?? "/"}`,
      )}" />`;
      urls.push(
        `<url><loc>${escapeXml(loc)}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>${
          key === "home" ? "1.0" : "0.8"
        }</priority>${alternates}${xDefault}</url>`,
      );
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join(
    "",
  )}</urlset>`;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = buildSitemap();
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, max-age=3600, stale-while-revalidate=86400",
  );
  res.write(sitemap);
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
