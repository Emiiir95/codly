import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, type LucideIcon } from "lucide-react";
import TextReveal from "@/components/atoms/TextReveal";

export type MegaMenuItem = {
  href: string;
  label: string;
  desc?: string;
  Icon?: LucideIcon;
};

export type MegaMenuColumn = {
  title: string;
  items: MegaMenuItem[];
};

type Props = {
  label: string;
  columns: MegaMenuColumn[];
  active?: boolean;
  activeHref?: string;
};

export default function MegaMenu({ label, columns, active, activeHref }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const openWithDelay = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const closeWithDelay = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 120);
  };

  const triggerState = active || open
    ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
    : "text-[var(--color-fg-muted)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]";

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={openWithDelay}
      onMouseLeave={closeWithDelay}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-current={active ? "page" : undefined}
        className={`group inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${triggerState}`}
      >
        <TextReveal text={label} />
        <ChevronDown
          size={14}
          strokeWidth={2}
          aria-hidden
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute left-1/2 top-full z-50 mt-3 w-max max-w-[min(92vw,900px)] -translate-x-1/2 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] p-6 shadow-2xl"
          style={{ animation: "fade-up 0.22s cubic-bezier(0.22, 1, 0.36, 1) both" }}
        >
          <div
            className="grid gap-x-8 gap-y-4"
            style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(220px, 1fr))` }}
          >
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-1">
                  {col.items.map((item) => {
                    const isActive = activeHref === item.href;
                    const Icon = item.Icon;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={`group flex items-start gap-3 rounded-lg p-2.5 transition-all duration-200 ${
                            isActive
                              ? "bg-[var(--color-accent-soft)]"
                              : "hover:bg-[var(--color-accent-soft)]"
                          }`}
                        >
                          {Icon && (
                            <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-transform duration-200 group-hover:scale-110">
                              <Icon size={16} strokeWidth={2} aria-hidden />
                            </span>
                          )}
                          <div className="flex flex-col">
                            <span
                              className={`text-sm font-medium ${
                                isActive
                                  ? "text-[var(--color-accent)]"
                                  : "text-[var(--color-fg)] group-hover:text-[var(--color-accent)]"
                              }`}
                            >
                              {item.label}
                            </span>
                            {item.desc && (
                              <span className="text-xs text-[var(--color-fg-subtle)]">
                                {item.desc}
                              </span>
                            )}
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
