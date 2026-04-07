import Link from "next/link";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import { ButtonLink } from "./Button";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { href: localizedPath("service-web", locale), label: t("nav.serviceWeb") },
    { href: localizedPath("service-seo", locale), label: t("nav.serviceSeo") },
    { href: localizedPath("about", locale), label: t("nav.about") },
    { href: localizedPath("contact", locale), label: t("nav.contact") },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all ${
        scrolled
          ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur"
          : "border-b border-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[var(--color-accent)] focus:px-3 focus:py-2 focus:text-white"
      >
        {t("common.skipToContent")}
      </a>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href={localizedPath("home", locale)}
          className="flex items-center gap-2 font-semibold tracking-tight"
          aria-label="Agency"
        >
          <span
            aria-hidden
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-accent-2)] via-[var(--color-accent)] to-[var(--color-accent-3)] text-xs font-bold text-white"
          >
            A
          </span>
          <span className="text-lg">Agency</span>
        </Link>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 md:flex"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ThemeToggle label={t("nav.toggleTheme")} />
          </div>
          <LanguageSwitcher />
          <div className="hidden md:block">
            <ButtonLink href={localizedPath("contact", locale)} variant="primary">
              {t("nav.cta")}
            </ButtonLink>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] md:hidden"
          >
            <span aria-hidden>{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 px-6 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <ButtonLink
                href={localizedPath("contact", locale)}
                variant="primary"
                className="w-full"
              >
                {t("nav.cta")}
              </ButtonLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
