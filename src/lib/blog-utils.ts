import type { Locale } from "./site";

/**
 * Browser-safe helpers for blog UI components. This file must NOT import
 * Node-only modules (fs, path…) because it gets bundled client-side.
 */

export type TocEntry = { depth: number; text: string; slug: string };

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  author?: string;
  cover?: string;
  coverAlt?: string;
  tags?: string[];
  readTime?: number;
};

export type BlogPostMeta = BlogFrontmatter & {
  slug: string;
  locale: Locale;
  sourceLocale: Locale;
};

export type BlogPost = BlogPostMeta & {
  html: string;
  toc: TocEntry[];
  readMinutes: number;
};

export const formatPostDate = (iso: string, locale: Locale): string => {
  try {
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
};
