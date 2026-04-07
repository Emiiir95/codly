import { useState } from "react";

export type FaqItem = { q: string; a: string };

export default function FAQ({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="mx-auto max-w-3xl space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q} className="card">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-base font-medium">{item.q}</span>
              <span
                aria-hidden
                className={`text-xl text-[var(--color-fg-muted)] transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-6 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                {item.a}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
