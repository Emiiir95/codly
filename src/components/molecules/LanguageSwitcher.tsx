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
        className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg-elev text-fg shadow-sm transition-all duration-300 hover:scale-110 hover:border-accent hover:text-accent"
      >
        <span
          aria-hidden
          className={`fi fi-${FLAG_CODE[current]} rounded-sm`}
          style={{ fontSize: "1.1rem", lineHeight: 1 }}
        />
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
