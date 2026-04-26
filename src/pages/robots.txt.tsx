import type { GetServerSideProps } from "next";
import { SITE } from "@/lib/site";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const body = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /mentions-legales
Disallow: /politique-confidentialite
Disallow: /en/legal-notice
Disallow: /en/privacy-policy
Disallow: /es/aviso-legal
Disallow: /es/politica-de-privacidad
Disallow: /404

Sitemap: ${SITE.domain}/sitemap.xml
Host: ${SITE.domain}
`;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.write(body);
  res.end();
  return { props: {} };
};

export default function Robots() {
  return null;
}
