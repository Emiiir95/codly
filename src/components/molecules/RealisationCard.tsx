import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  type Realisation,
  CATEGORY_LABELS,
  CATEGORY_ACCENT,
} from "@/lib/realisations-data";

type Props = {
  item: Realisation;
  index: number;
  total: number;
  /** Top offset in rem where the card pins. Defaults to 6 (below the filter
   *  bar). In grouped view it's higher to clear the sticky category header. */
  topOffsetRem?: number;
};

/**
 * Sticky-stack card: all cards of a category pile on top of each other as
 * the user scrolls, with a small peek between them. Pure CSS sticky — fluid
 * and no empty space between cards.
 */
export default function RealisationCard({
  item,
  index,
  total,
  topOffsetRem = 6,
}: Props) {
  return (
    <div
      className="sticky flex h-[85vh] items-center justify-center px-4 sm:px-6"
      style={{ top: `calc(${topOffsetRem}rem + ${index * 1.6}rem)` }}
    >
      <article className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] shadow-2xl md:grid-cols-2">
        {/* Image side */}
        <div className="relative h-64 overflow-hidden md:h-full">
          <motion.img
            src={item.image.src}
            alt={item.image.alt}
            loading={index < 2 ? "eager" : "lazy"}
            className="h-full w-full object-cover"
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 bg-gradient-to-br mix-blend-multiply ${CATEGORY_ACCENT[item.category]}`}
          />
          <div className="absolute left-5 top-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
              {CATEGORY_LABELS[item.category]}
            </span>
            <span className="inline-flex items-center rounded-full border border-white/15 bg-black/25 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md">
              {item.year}
            </span>
          </div>
          <div className="absolute bottom-5 right-5 font-mono text-sm font-medium text-white/70">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>

        {/* Content side */}
        <div className="flex flex-col gap-6 p-8 md:p-12">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-accent)]">
              {item.client}
            </p>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-4xl">
              {item.title}
            </h3>
          </div>

          <p className="text-base leading-relaxed text-[var(--color-fg-muted)]">
            {item.summary}
          </p>

          <div className="grid grid-cols-3 gap-4 border-y border-[var(--color-border)] py-5">
            {item.metrics.map((m) => (
              <div key={m.label} className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight sm:text-3xl">
                  <span className="text-gradient">{m.value}</span>
                </span>
                <span className="mt-1 text-[11px] font-medium uppercase tracking-wide text-[var(--color-fg-subtle)]">
                  {m.label}
                </span>
              </div>
            ))}
            {Array.from({ length: Math.max(0, 3 - item.metrics.length) }).map(
              (_, i) => (
                <div key={`pad-${i}`} aria-hidden />
              ),
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-[var(--color-accent-soft)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-accent)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              type="button"
              className="group/btn inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)]"
            >
              Voir l&rsquo;étude
              <ArrowUpRight
                size={16}
                strokeWidth={2.2}
                className="transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
