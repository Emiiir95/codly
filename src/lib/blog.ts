import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import readingTime from "reading-time";
import type { Locale } from "./site";
import { SITE } from "./site";
import type {
  BlogFrontmatter,
  BlogPost,
  BlogPostMeta,
  TocEntry,
} from "./blog-utils";

export type { BlogFrontmatter, BlogPost, BlogPostMeta, TocEntry } from "./blog-utils";
export { formatPostDate } from "./blog-utils";

const CONTENT_ROOT = path.join(process.cwd(), "content", "blog");

const localeDir = (locale: Locale) => path.join(CONTENT_ROOT, locale);

const readMarkdown = (
  locale: Locale,
  slug: string,
): { raw: string; sourceLocale: Locale } | null => {
  const tryLocales: Locale[] = [locale];
  if (locale !== SITE.defaultLocale) tryLocales.push(SITE.defaultLocale);

  for (const loc of tryLocales) {
    const filePath = path.join(localeDir(loc), `${slug}.md`);
    if (fs.existsSync(filePath)) {
      return { raw: fs.readFileSync(filePath, "utf8"), sourceLocale: loc };
    }
  }
  return null;
};

const parseFrontmatter = (raw: string, slug: string): {
  data: BlogFrontmatter;
  content: string;
} => {
  const { data, content } = matter(raw);
  const out: BlogFrontmatter = {
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? new Date().toISOString()),
  };
  if (data.author) out.author = String(data.author);
  if (data.cover) out.cover = String(data.cover);
  if (data.coverAlt) out.coverAlt = String(data.coverAlt);
  if (Array.isArray(data.tags)) out.tags = data.tags.map(String);
  if (typeof data.readTime === "number") out.readTime = data.readTime;
  return { data: out, content };
};

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

/**
 * Extract H2/H3 headings as a table of contents from markdown source.
 * Attaches the slug as an id via a post-processing pass so anchors work.
 */
const extractToc = (markdown: string): TocEntry[] => {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TocEntry[] = [];
  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim();
    toc.push({ depth, text, slug: slugify(text) });
  }
  return toc;
};

const addHeadingIds = (html: string): string =>
  html.replace(
    /<(h[23])>([^<]+)<\/\1>/g,
    (_, tag, text) => `<${tag} id="${slugify(text)}">${text}</${tag}>`,
  );

export const markdownToHtml = async (markdown: string): Promise<string> => {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);
  return addHeadingIds(String(file));
};

/**
 * Return all slugs available for a given locale. Slugs present only in the
 * default locale are also returned so non-default locales fall back gracefully.
 */
export const getAllPostSlugs = (locale: Locale): string[] => {
  const slugs = new Set<string>();
  const targets: Locale[] = [locale];
  if (locale !== SITE.defaultLocale) targets.push(SITE.defaultLocale);

  for (const loc of targets) {
    const dir = localeDir(loc);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (file.endsWith(".md")) slugs.add(file.replace(/\.md$/, ""));
    }
  }
  return Array.from(slugs);
};

/**
 * Return the list of posts (metadata only, sorted by date desc) for a locale,
 * using the default locale file as a fallback when a translation is missing.
 */
export const getAllPosts = (locale: Locale): BlogPostMeta[] => {
  const slugs = getAllPostSlugs(locale);
  const posts: BlogPostMeta[] = [];
  for (const slug of slugs) {
    const read = readMarkdown(locale, slug);
    if (!read) continue;
    const { data } = parseFrontmatter(read.raw, slug);
    posts.push({
      ...data,
      slug,
      locale,
      sourceLocale: read.sourceLocale,
    });
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
};

export const getPostBySlug = async (
  locale: Locale,
  slug: string,
): Promise<BlogPost | null> => {
  const read = readMarkdown(locale, slug);
  if (!read) return null;
  const { data, content } = parseFrontmatter(read.raw, slug);
  const html = await markdownToHtml(content);
  const toc = extractToc(content);
  const stats = readingTime(content);
  const readMinutes = data.readTime ?? Math.max(1, Math.round(stats.minutes));
  return {
    ...data,
    slug,
    locale,
    sourceLocale: read.sourceLocale,
    html,
    toc,
    readMinutes,
  };
};

