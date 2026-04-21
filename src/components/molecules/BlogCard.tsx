import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog-utils";
import { formatPostDate } from "@/lib/blog-utils";

type Props = {
  post: BlogPostMeta;
  href: string;
  readLabel?: string;
  index?: number;
};

export default function BlogCard({
  post,
  href,
  readLabel = "min",
  index = 0,
}: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.07, 0.35),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/40 hover:shadow-2xl"
    >
      <Link href={href} className="flex h-full flex-col">
        {/* Cover */}
        {post.cover ? (
          <div className="relative h-52 w-full overflow-hidden">
            <img
              src={post.cover}
              alt={post.coverAlt ?? post.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-elev)]/50 via-transparent to-transparent" />
            <div className="absolute right-3 top-3 rounded-full bg-[var(--color-bg-elev)]/80 p-2 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <ArrowUpRight
                size={16}
                className="text-[var(--color-fg)]"
                strokeWidth={2}
              />
            </div>
          </div>
        ) : (
          <div
            aria-hidden
            className="h-52 w-full"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--color-accent) 30%, transparent), color-mix(in oklab, var(--color-accent-2) 30%, transparent))",
            }}
          />
        )}

        <div className="flex flex-1 flex-col gap-3 p-6">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-[var(--color-accent-soft)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-accent)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-semibold leading-snug tracking-tight text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-accent)]">
            {post.title}
          </h3>

          {/* Description */}
          <p className="line-clamp-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
            {post.description}
          </p>

          {/* Meta */}
          <div className="mt-auto flex items-center gap-4 pt-3 text-xs text-[var(--color-fg-muted)]">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={12} strokeWidth={2} aria-hidden />
              {formatPostDate(post.date, post.locale)}
            </span>
            {post.readTime && (
              <span className="inline-flex items-center gap-1.5">
                <Clock size={12} strokeWidth={2} aria-hidden />
                {post.readTime} {readLabel}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
