import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { Languages } from "lucide-react";
import type { Locale } from "@/lib/site";
import { SITE } from "@/lib/site";

const LABELS: Record<Locale, string> = { fr: "FR", en: "EN", es: "ES" };
const FULL: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = (router.locale ?? SITE.defaultLocale) as Locale;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const switchTo = (locale: Locale) => {
    setOpen(false);
    const { pathname, query, asPath } = router;
    void router.push({ pathname, query }, asPath, { locale });
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)] px-3 py-1.5 text-xs font-medium text-[var(--color-fg)] shadow-sm transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
      >
        <Languages size={14} strokeWidth={2} aria-hidden />
        {LABELS[current]}
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] py-1 shadow-xl"
          style={{ animation: "fade-up 0.15s cubic-bezier(0.22, 1, 0.36, 1) both" }}
        >
          {SITE.locales.map((loc) => (
            <li key={loc}>
              <button
                type="button"
                role="option"
                aria-selected={loc === current}
                onClick={() => switchTo(loc)}
                className={`flex w-full items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-[var(--color-accent-soft)] ${
                  loc === current
                    ? "font-medium text-[var(--color-accent)]"
                    : "text-[var(--color-fg-muted)]"
                }`}
              >
                <span>{FULL[loc]}</span>
                <span className="text-xs opacity-60">{LABELS[loc]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
