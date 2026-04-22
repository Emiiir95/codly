import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Section = { title: string; body: string };

type Props = {
  sections: Section[];
};

/**
 * Mobile-friendly fallback for CardSwap. Shows one card at a time with dot
 * indicators and prev/next buttons. No GSAP / 3D transforms — works reliably
 * inside tight viewports where absolute positioning breaks.
 */
export default function SolutionMobileCarousel({ sections }: Props) {
  const [active, setActive] = useState(0);
  const total = sections.length;

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  return (
    <div className="w-full">
      <div className="relative min-h-[280px] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-full w-full flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] p-6 shadow-lg"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent-soft)] font-mono text-sm font-bold text-[var(--color-accent)]">
              {String(active + 1).padStart(2, "0")}
            </span>
            <h3 className="text-lg font-semibold tracking-tight text-[var(--color-fg)]">
              {sections[active]?.title}
            </h3>
            <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">
              {sections[active]?.body}
            </p>
            <div className="mt-auto flex items-center gap-2 border-t border-[var(--color-border)] pt-4 text-[11px] font-medium uppercase tracking-widest text-[var(--color-fg-subtle)]">
              <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
              Étape {active + 1} / {total}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Étape précédente"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          <ChevronLeft size={18} strokeWidth={2} />
        </button>

        <div className="flex items-center gap-2">
          {sections.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Étape ${i + 1}`}
              aria-current={i === active ? "step" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-6 bg-[var(--color-accent)]"
                  : "w-2 bg-[var(--color-border)]"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Étape suivante"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          <ChevronRight size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
