import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Tags, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
<<<<<<< HEAD
import type { BlogPostMeta } from "@/lib/blog-utils";
import { localizedPath } from "@/lib/routes";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";
import BlogCard from "@/components/molecules/BlogCard";
=======
>>>>>>> origin/main
import PageHero from "./PageHero";
import Section from "./Section";

type Props = {
  posts: BlogPostMeta[];
};

export default function BlogContent({ posts }: Props) {
  const { t, locale } = useI18n();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [tagsOpen, setTagsOpen] = useState(true);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((tag) => set.add(tag)));
    return Array.from(set).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesTag = !activeTag || (p.tags ?? []).includes(activeTag);
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tags ?? []).some((t) => t.toLowerCase().includes(q));
      return matchesTag && matchesQuery;
    });
  }, [posts, activeTag, query]);

  const blogBase = localizedPath("blog", locale);

  return (
    <>
      <PageHero
        eyebrow={t("blog.hero.eyebrow")}
        title={t("blog.hero.title")}
        subtitle={t("blog.hero.subtitle")}
        breadcrumbs={[{ label: t("blog.breadcrumb") }]}
      />

      <Section className="pt-0!">
        {/* Search + tag filter */}
        <div className="mb-10 flex flex-col gap-5">
          <div className="relative mx-auto w-full max-w-md">
            <Search
              size={16}
              strokeWidth={2}
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-fg-subtle)]"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("blog.searchPlaceholder")}
              className="w-full rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)] py-3 pl-11 pr-4 text-sm text-[var(--color-fg)] shadow-sm outline-none transition placeholder:text-[var(--color-fg-subtle)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-soft)]"
            />
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => setTagsOpen((v) => !v)}
                aria-expanded={tagsOpen}
                aria-controls="blog-tags"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)] px-4 py-1.5 text-xs font-medium text-[var(--color-fg-muted)] shadow-sm transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <Tags size={13} strokeWidth={2} aria-hidden />
                {tagsOpen ? t("blog.hideTags") : t("blog.showTags")}
                <ChevronDown
                  size={13}
                  strokeWidth={2}
                  aria-hidden
                  className={`transition-transform duration-200 ${tagsOpen ? "rotate-180" : ""}`}
                />
                {activeTag && (
                  <span className="ml-1 rounded-full bg-[var(--color-accent)] px-1.5 text-[10px] font-semibold text-white">
                    1
                  </span>
                )}
              </button>

              <AnimatePresence initial={false}>
                {tagsOpen && (
                  <motion.div
                    id="blog-tags"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setActiveTag(null)}
                        className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                          !activeTag
                            ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                            : "border-[var(--color-border)] bg-[var(--color-bg-elev)] text-[var(--color-fg-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                        }`}
                      >
                        {t("blog.allTags")}
                      </button>
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                          className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                            tag === activeTag
                              ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                              : "border-[var(--color-border)] bg-[var(--color-bg-elev)] text-[var(--color-fg-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Posts grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center text-[var(--color-fg-muted)]"
            >
              {t("blog.noResults")}
            </motion.div>
          ) : (
            <motion.div
              key={`grid-${activeTag ?? "all"}-${query}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((post, i) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  href={`${blogBase}/${post.slug}`}
                  readLabel={t("blog.readMin")}
                  index={i}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
    </>
  );
}
