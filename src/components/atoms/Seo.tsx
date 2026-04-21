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
  /** Override the auto-computed canonical URL — used for dynamic pages like /blog/[slug]. */
  canonicalOverride?: string;
  /** Override hreflang alternates — used for dynamic pages. */
  alternatesOverride?: Array<{ hrefLang: string; href: string }>;
  /** Open Graph object type. Defaults to "website". Use "article" for blog posts. */
  ogType?: "website" | "article";
  /** Published date (ISO) for articles — adds <meta property="article:published_time">. */
  articlePublishedTime?: string;
  /** Tags for articles — adds <meta property="article:tag">. */
  articleTags?: string[];
};

export default function Seo({
  title,
  description,
  pageKey,
  locale,
  image,
  noindex,
  jsonLd = [],
  canonicalOverride,
  alternatesOverride,
  ogType = "website",
  articlePublishedTime,
  articleTags,
}: Props) {
  const canonical = canonicalOverride ?? buildCanonical(pageKey, locale);
  const hreflang = alternatesOverride ?? buildHreflang(pageKey);
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

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {ogType === "article" && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {ogType === "article" &&
        articleTags?.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

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
