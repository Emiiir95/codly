import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export type NavDropdownItem = { href: string; label: string; desc?: string };

type Props = {
  label: string;
  items: NavDropdownItem[];
  active?: boolean;
  activeHref?: string;
};

export default function NavDropdown({ label, items, active, activeHref }: Props) {
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

  const stateCls = active || open
    ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
    : "text-[var(--color-fg-muted)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${stateCls}`}
      >
        {label}
        <ChevronDown
          size={14}
          strokeWidth={2}
          aria-hidden
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-3 min-w-[240px] overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] shadow-lg"
          style={{
            animation: "fade-up 0.18s cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        >
          <ul className="py-1.5">
            {items.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-0.5 px-4 py-2.5 text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-[var(--color-accent-soft)]"
                        : "hover:bg-[var(--color-accent-soft)] hover:pl-5"
                    }`}
                  >
                    <div className="flex flex-1 flex-col gap-0.5">
                      <span
                        className={`font-medium ${
                          isActive
                            ? "text-[var(--color-accent)]"
                            : "text-[var(--color-fg)]"
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
      )}
    </div>
  );
}
