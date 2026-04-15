import { useState, useEffect } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import Logo from "@/components/atoms/Logo";
import ThemeToggle from "@/components/atoms/ThemeToggle";
import { ButtonLink } from "@/components/atoms/Button";
import HeaderNav from "@/components/molecules/HeaderNav";
import NavDropdown from "@/components/molecules/NavDropdown";
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

  const creationItems = [
    {
      href: localizedPath("service-vitrine", locale),
      label: t("nav.serviceVitrine"),
      desc: "WordPress",
    },
    {
      href: localizedPath("service-ecommerce", locale),
      label: t("nav.serviceEcommerce"),
      desc: "Shopify",
    },
    {
      href: localizedPath("service-sur-mesure", locale),
      label: t("nav.serviceSurMesure"),
      desc: "Next.js / React",
    },
  ];

  const communicationItems = [
    {
      href: localizedPath("service-seo", locale),
      label: t("nav.serviceSeo"),
      desc: "SEO naturel Google",
    },
    {
      href: localizedPath("service-ads", locale),
      label: t("nav.serviceAds"),
      desc: "Publicité Google",
    },
    {
      href: localizedPath("service-social", locale),
      label: t("nav.serviceSocial"),
      desc: "TikTok & Instagram",
    },
  ];

  const simpleNav = [
    { href: localizedPath("realisations", locale), label: t("nav.realisations") },
    { href: localizedPath("blog", locale), label: t("nav.blog") },
    { href: localizedPath("about", locale), label: t("nav.about") },
    { href: localizedPath("contact", locale), label: t("nav.contact") },
  ];

  // Mobile flat nav (all items)
  const mobileNav = [
    {
      href: localizedPath("service-vitrine", locale),
      label: t("nav.serviceVitrine"),
    },
    {
      href: localizedPath("service-ecommerce", locale),
      label: t("nav.serviceEcommerce"),
    },
    {
      href: localizedPath("service-sur-mesure", locale),
      label: t("nav.serviceSurMesure"),
    },
    { href: localizedPath("service-seo", locale), label: t("nav.serviceSeo") },
    { href: localizedPath("service-ads", locale), label: t("nav.serviceAds") },
    {
      href: localizedPath("service-social", locale),
      label: t("nav.serviceSocial"),
    },
    {
      href: localizedPath("realisations", locale),
      label: t("nav.realisations"),
    },
    { href: localizedPath("blog", locale), label: t("nav.blog") },
    { href: localizedPath("about", locale), label: t("nav.about") },
    { href: localizedPath("contact", locale), label: t("nav.contact") },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all ${
        scrolled
          ? "border-b border-[var(--color-border)] bg-[var(--color-bg-elev)]/85 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[var(--color-accent)] focus:px-3 focus:py-2 focus:text-white"
      >
        {t("common.skipToContent")}
      </a>

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Logo href={localizedPath("home", locale)} />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          <NavDropdown
            label={t("nav.creationSite")}
            items={creationItems}
          />
          <NavDropdown
            label={t("nav.communication")}
            items={communicationItems}
          />
          {simpleNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]"
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

      {/* Mobile nav */}
      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-[var(--color-border)] bg-[var(--color-bg-elev)] px-6 py-4 md:hidden"
        >
          {/* Creation group */}
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            {t("nav.creationSite")}
          </p>
          <ul className="mb-4 flex flex-col gap-1">
            {creationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-1.5 text-sm font-medium text-[var(--color-fg-muted)] hover:text-[var(--color-accent)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Communication group */}
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            {t("nav.communication")}
          </p>
          <ul className="mb-4 flex flex-col gap-1">
            {communicationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-1.5 text-sm font-medium text-[var(--color-fg-muted)] hover:text-[var(--color-accent)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Simple links */}
          <HeaderNav
            items={simpleNav}
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
