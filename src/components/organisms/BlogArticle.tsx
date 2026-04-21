import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { Calendar, Clock, User, ArrowLeft, Link2 } from "lucide-react";

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
  </svg>
);
import { useI18n } from "@/lib/i18n";
import type { BlogPost, BlogPostMeta } from "@/lib/blog-utils";
import { formatPostDate } from "@/lib/blog-utils";
import { localizedPath } from "@/lib/routes";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";
import BlogCard from "@/components/molecules/BlogCard";
import Section from "./Section";

type Props = {
  post: BlogPost;
  related: BlogPostMeta[];
};

export default function BlogArticle({ post, related }: Props) {
  const { t, locale } = useI18n();
  const [activeHeading, setActiveHeading] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  // Scoped scroll progress for the article element only, driving the TOC
  // indicator so it tracks the reader's position within the article body.
  const { scrollYProgress: articleProgress } = useScroll({
    target: articleRef,
    offset: ["start 20%", "end 80%"],
  });
  const tocScaleY = useSpring(articleProgress, {
    stiffness: 100,
    damping: 28,
    restDelta: 0.001,
  });

  // Track which heading is currently visible for TOC highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveHeading(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    const headings = document.querySelectorAll(
      ".prose-article h2, .prose-article h3",
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [post.slug]);

  const blogBase = localizedPath("blog", locale);
  const articleUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      {/* Reading progress bar */}
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 z-50 h-0.5 origin-left bg-[var(--color-accent)]"
      />

      <div className="pt-20">
        <Breadcrumbs
          items={[
            { label: t("blog.breadcrumb"), href: blogBase },
            { label: post.title },
          ]}
        />
      </div>

      {/* Cover */}
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mb-12 mt-6 w-full max-w-5xl px-6"
      >
        {post.cover ? (
          <div className="relative aspect-[16/7] w-full overflow-hidden rounded-3xl border border-[var(--color-border)] shadow-xl">
            <img
              src={post.cover}
              alt={post.coverAlt ?? post.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/40 via-transparent to-transparent" />
          </div>
        ) : (
          <div
            aria-hidden
            className="aspect-[16/7] w-full rounded-3xl"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--color-accent) 30%, transparent), color-mix(in oklab, var(--color-accent-2) 30%, transparent))",
            }}
          />
        )}
      </motion.div>

      {/* Header + Body + TOC share the same grid so the title
          is left-aligned on the same column as the article text. */}
      <Section className="pt-10!" align="left">
        <div
          ref={articleRef}
          className="relative grid gap-12 md:grid-cols-[1fr_220px]"
        >
          <div className="min-w-0">
            {/* Header (in-grid — left-aligned with article body) */}
            <header className="pb-8">
              {post.tags && post.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-4 flex flex-wrap gap-2"
                >
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-medium text-[var(--color-accent)]"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              )}

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="text-3xl font-semibold leading-tight tracking-tight text-[var(--color-fg)] sm:text-4xl md:text-5xl"
              >
                {post.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="mt-4 text-lg leading-relaxed text-[var(--color-fg-muted)]"
              >
                {post.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--color-fg-muted)]"
              >
                {post.author && (
                  <span className="inline-flex items-center gap-1.5">
                    <User size={14} strokeWidth={2} aria-hidden />
                    {t("blog.by")} {post.author}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} strokeWidth={2} aria-hidden />
                  {formatPostDate(post.date, locale)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} strokeWidth={2} aria-hidden />
                  {post.readMinutes} {t("blog.readMin")}
                </span>
              </motion.div>
            </header>

            <article
              className="prose-article w-full"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            {/* Back link */}
            <div className="mt-16 border-t border-[var(--color-border)] pt-8">
              <Link
                href={blogBase}
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]"
              >
                <ArrowLeft size={14} strokeWidth={2} />
                {t("blog.backToList")}
              </Link>
            </div>
          </div>

          {/* TOC (sticky sidebar on desktop) */}
          {post.toc.length > 0 && (
            <aside className="hidden md:block">
              <div className="sticky top-52 space-y-6">
                <nav aria-label={t("blog.tableOfContents")}>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-fg-subtle)]">
                    {t("blog.tableOfContents")}
                  </p>
                  <div className="relative">
                    {/* Static grey track */}
                    <div
                      aria-hidden
                      className="absolute left-0 top-0 h-full w-px bg-[var(--color-border)]"
                    />
                    {/* Animated pink progress bar tracking scroll through the article */}
                    <motion.div
                      aria-hidden
                      style={{ scaleY: tocScaleY }}
                      className="absolute left-0 top-0 h-full w-px origin-top bg-[var(--color-accent)]"
                    />
                    <ul className="relative flex flex-col gap-2">
                      {post.toc.map((entry) => {
                        const isActive = activeHeading === entry.slug;
                        return (
                          <li key={entry.slug}>
                            <a
                              href={`#${entry.slug}`}
                              className={`block py-1 pl-4 text-sm transition-all ${
                                isActive
                                  ? "font-medium text-[var(--color-accent)]"
                                  : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                              } ${entry.depth === 3 ? "pl-7" : ""}`}
                            >
                              {entry.text}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </nav>

                {/* Share */}
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-fg-subtle)]">
                    {t("blog.share")}
                  </p>
                  <div className="flex gap-2">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)] text-[var(--color-fg-muted)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    >
                      <TwitterIcon width={14} height={14} />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)] text-[var(--color-fg-muted)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    >
                      <LinkedinIcon width={14} height={14} />
                    </a>
                    <button
                      type="button"
                      onClick={copyLink}
                      aria-label="Copy link"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)] text-[var(--color-fg-muted)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    >
                      <Link2 size={14} />
                    </button>
                  </div>
                  {copied && (
                    <p className="mt-2 text-xs text-[var(--color-accent)]">
                      ✓ Copied
                    </p>
                  )}
                </div>
              </div>
            </aside>
          )}
        </div>
      </Section>

      {/* Related posts */}
      {related.length > 0 && (
        <Section>
          <h2 className="mb-8 text-2xl font-semibold tracking-tight text-[var(--color-fg)]">
            {t("blog.relatedPosts")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <BlogCard
                key={p.slug}
                post={p}
                href={`${blogBase}/${p.slug}`}
                readLabel={t("blog.readMin")}
                index={i}
              />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
