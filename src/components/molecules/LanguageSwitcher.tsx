import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import type { Locale } from "@/lib/site";
import { SITE } from "@/lib/site";
import { localizedPath, type PageKey } from "@/lib/routes";
import { SERVICES } from "@/lib/services";

const FLAG_CODE: Record<Locale, string> = { fr: "fr", en: "gb", es: "es" };
const FULL: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
};

/**
 * Map from Next.js file-based pathname to PageKey.
 */
const PATHNAME_TO_KEY: Record<string, PageKey> = {
  "/": "home",
  "/a-propos": "about",
  "/contact": "contact",
  "/mentions-legales": "legal",
  "/politique-confidentialite": "privacy",
  "/blog": "blog",
  "/realisations": "realisations",
  "/services": "services",
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

    // 1. Service pages: find service by current slug, get target locale URL
    if (router.pathname === "/services/[slug]" && router.query.slug) {
      const slug = String(router.query.slug);
      const service = SERVICES.find((s) => s.slugs[current] === slug);
      if (service) {
        void router.push(localizedPath(service.pageKey, locale), undefined, {
          locale: false,
        });
        return;
      }
    }

    // 2. Blog post pages: keep same slug, change locale
    if (router.pathname === "/blog/[slug]" && router.query.slug) {
      const blogBase = localizedPath("blog", locale);
      void router.push(`${blogBase}/${String(router.query.slug)}`, undefined, {
        locale: false,
      });
      return;
    }

    // 3. Static pages: lookup PageKey from pathname, get target locale URL
    const pageKey = PATHNAME_TO_KEY[router.pathname];
    if (pageKey) {
      void router.push(localizedPath(pageKey, locale), undefined, {
        locale: false,
      });
      return;
    }

    // 4. Fallback: just switch locale on current path
    void router.push(
      { pathname: router.pathname, query: router.query },
      undefined,
      { locale },
    );
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
          style={{
            animation: "fade-up 0.15s cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
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
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className={`fi fi-${FLAG_CODE[loc]} rounded-sm text-base`}
                  />
                  {FULL[loc]}
                </span>
                {loc === current && (
                  <span className="text-xs opacity-60">&#10003;</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
