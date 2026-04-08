import Head from "next/head";
import { SITE, type Locale } from "@/lib/site";
import { buildCanonical, buildHreflang } from "@/lib/seo";
import { jsonLdScript } from "@/lib/jsonld";
import type { PageKey } from "@/lib/routes";

type Props = {
  title: string;
  description: string;
  pageKey: PageKey;
  locale: Locale;
  image?: string;
  noindex?: boolean;
  jsonLd?: unknown[];
};

export default function Seo({
  title,
  description,
  pageKey,
  locale,
  image,
  noindex,
  jsonLd = [],
}: Props) {
  const canonical = buildCanonical(pageKey, locale);
  const hreflang = buildHreflang(pageKey);
  const ogImage = image ?? `${SITE.domain}/og-default.png`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonical} />
      {hreflang.map((h) => (
        <link
          key={h.hrefLang}
          rel="alternate"
          hrefLang={h.hrefLang}
          href={h.href}
        />
      ))}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(data)}
        />
      ))}
    </Head>
  );
}
