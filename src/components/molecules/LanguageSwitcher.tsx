import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import type { Locale } from "@/lib/site";
import { SITE } from "@/lib/site";

const FLAG_CODE: Record<Locale, string> = { fr: "fr", en: "gb", es: "es" };
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
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)] px-3 py-1.5 text-xs font-medium text-[var(--color-fg)] shadow-sm hover:border-[var(--color-fg)]"
      >
        <span
          aria-hidden
          className={`fi fi-${FLAG_CODE[current]} rounded-sm text-base`}
        />
        <span className="text-xs">{FULL[current].slice(0, 2)}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] py-1 shadow-xl"
        >
          {SITE.locales.map((loc) => (
            <li key={loc}>
              <button
                type="button"
                role="option"
                aria-selected={loc === current}
                onClick={() => switchTo(loc)}
                className={`flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-[var(--color-bg)] ${
                  loc === current
                    ? "text-[var(--color-accent)] font-medium"
                    : "text-[var(--color-fg-muted)]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className={`fi fi-${FLAG_CODE[loc]} rounded-sm text-base`}
                  />
                  {FULL[loc]}
                </span>
                {loc === current && (
                  <span className="text-xs opacity-60">✓</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
