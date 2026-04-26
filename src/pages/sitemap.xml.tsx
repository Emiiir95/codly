import type { GetServerSideProps } from "next";
import { SITE } from "@/lib/site";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const base = SITE.domain;
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${base}/sitemap-pages.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${base}/sitemap-services.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${base}/sitemap-blog.xml</loc>
  </sitemap>
</sitemapindex>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
  res.write(body);
  res.end();
  return { props: {} };
};

export default function SitemapIndex() {
  return null;
}
