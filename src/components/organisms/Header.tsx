import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import Logo from "@/components/atoms/Logo";
import ThemeToggle from "@/components/atoms/ThemeToggle";
import { ButtonLink } from "@/components/atoms/Button";
import HeaderNav from "@/components/molecules/HeaderNav";
import MenuToggle from "@/components/molecules/MenuToggle";
import LanguageSwitcher from "@/components/molecules/LanguageSwitcher";

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
      className={`relative sticky top-0 z-40 transition-all ${
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
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Logo href={localizedPath("home", locale)} />
        <HeaderNav items={nav} />
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ThemeToggle label={t("nav.toggleTheme")} />
          </div>
          <LanguageSwitcher />
          <div className="hidden md:block">
            <ButtonLink
              href={localizedPath("contact", locale)}
              variant="primary"
            >
              {t("nav.cta")}
            </ButtonLink>
          </div>
          <MenuToggle
            open={open}
            onToggle={() => setOpen((v) => !v)}
            openLabel={t("nav.openMenu")}
            closeLabel={t("nav.closeMenu")}
          />
        </div>
      </div>
      {open && (
        <nav
          aria-label="Mobile"
          className="relative border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 px-6 py-4 md:hidden"
        >
          <HeaderNav
            items={nav}
            orientation="vertical"
            onItemClick={() => setOpen(false)}
          />
          <div className="pt-3">
            <ButtonLink
              href={localizedPath("contact", locale)}
              variant="primary"
              className="w-full"
            >
              {t("nav.cta")}
            </ButtonLink>
          </div>
        </nav>
      )}
    </header>
  );
}
