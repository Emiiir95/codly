import { SITE, type Locale } from "./site";
import { seoPath, type PageKey } from "./routes";

const url = (path: string) => `${SITE.domain}${path}`;

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.domain,
  logo: `${SITE.domain}/logo.svg`,
  email: SITE.email,
  telephone: SITE.phone,
  sameAs: [SITE.social.twitter, SITE.social.linkedin, SITE.social.github],
});

export const localBusinessJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE.domain}#localbusiness`,
  name: SITE.name,
  image: `${SITE.domain}/og-default.png`,
  url: SITE.domain,
  telephone: SITE.phone,
  email: SITE.email,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.8566,
    longitude: 2.3522,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
});

export const websiteJsonLd = (locale: Locale) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.domain,
  inLanguage: locale,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE.domain}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const breadcrumbJsonLd = (
  items: Array<{ name: string; path: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: url(item.path),
  })),
});

export const serviceJsonLd = (params: {
  name: string;
  description: string;
  pageKey: PageKey;
  locale: Locale;
  serviceType: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: params.name,
  description: params.description,
  serviceType: params.serviceType,
  url: url(seoPath(params.pageKey, params.locale)),
  provider: {
    "@type": "Organization",
    name: SITE.name,
    url: SITE.domain,
  },
  areaServed: ["FR", "BE", "CH", "LU", "CA"],
});

export const faqJsonLd = (items: Array<{ q: string; a: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
});

export const aggregateRatingJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.domain,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "87",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Sophie Laurent" },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody:
        "Une équipe à l'écoute, un site magnifique et un référencement qui a vraiment décollé.",
    },
  ],
});

export const articleJsonLd = (params: {
  title: string;
  description: string;
  slug: string;
  locale: Locale;
  date: string;
  author?: string;
  cover?: string;
  tags?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: params.title,
  description: params.description,
  datePublished: params.date,
  dateModified: params.date,
  author: {
    "@type": "Organization",
    name: params.author ?? SITE.name,
    url: SITE.domain,
  },
  publisher: {
    "@type": "Organization",
    name: SITE.name,
    url: SITE.domain,
    logo: { "@type": "ImageObject", url: `${SITE.domain}/logo.svg` },
  },
  image: params.cover ? [params.cover] : [`${SITE.domain}/og-default.png`],
  inLanguage: params.locale,
  keywords: params.tags?.join(", "),
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE.domain}${seoPath("blog", params.locale)}/${params.slug}`,
  },
});

export const jsonLdScript = (data: unknown) => ({
  __html: JSON.stringify(data).replace(/</g, "\\u003c"),
});
