import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export type NavDropdownItem = { href: string; label: string; desc?: string };

type Props = {
  label: string;
  items: NavDropdownItem[];
};

export default function NavDropdown({ label, items }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]"
      >
        {label}
        <svg
          aria-hidden
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-2 min-w-[220px] overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] shadow-lg"
          style={{
            animation: "fade-up 0.18s cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        >
          <ul className="py-1.5">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex flex-col gap-0.5 px-4 py-2.5 text-sm transition-colors hover:bg-[var(--color-accent-soft)]"
                >
                  <span className="font-medium text-[var(--color-fg)]">
                    {item.label}
                  </span>
                  {item.desc && (
                    <span className="text-xs text-[var(--color-fg-subtle)]">
                      {item.desc}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
