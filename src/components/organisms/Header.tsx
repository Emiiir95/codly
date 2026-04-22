import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Globe,
  ShoppingBag,
  Code2,
  Search,
  Megaphone,
  Share2,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import Logo from "@/components/atoms/Logo";
import ThemeToggle from "@/components/atoms/ThemeToggle";
import TextReveal from "@/components/atoms/TextReveal";
import { ButtonLink } from "@/components/atoms/Button";
import HeaderNav from "@/components/molecules/HeaderNav";
import MegaMenu, { type MegaMenuColumn } from "@/components/molecules/MegaMenu";
import MenuToggle from "@/components/molecules/MenuToggle";
import LanguageSwitcher from "@/components/molecules/LanguageSwitcher";

export default function Header() {
  const { t, locale } = useI18n();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(false);
    router.events.on("routeChangeStart", handler);
    return () => router.events.off("routeChangeStart", handler);
  }, [router.events]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentPath = router.asPath.split("?")[0].split("#")[0];
  const isActive = (href: string) =>
    href === "/" ? currentPath === "/" : currentPath === href;

  const servicesColumns: MegaMenuColumn[] = [
    {
      title: t("nav.creationSite"),
      items: [
        {
          href: localizedPath("service-vitrine", locale),
          label: t("nav.serviceVitrine"),
          desc: "WordPress",
          Icon: Globe,
        },
        {
          href: localizedPath("service-ecommerce", locale),
          label: t("nav.serviceEcommerce"),
          desc: "Shopify",
          Icon: ShoppingBag,
        },
        {
          href: localizedPath("service-sur-mesure", locale),
          label: t("nav.serviceSurMesure"),
          desc: "Next.js / React",
          Icon: Code2,
        },
      ],
    },
    {
      title: t("nav.communication"),
      items: [
        {
          href: localizedPath("service-seo", locale),
          label: t("nav.serviceSeo"),
          desc: "SEO naturel Google",
          Icon: Search,
        },
        {
          href: localizedPath("service-ads", locale),
          label: t("nav.serviceAds"),
          desc: "Publicité Google",
          Icon: Megaphone,
        },
        {
          href: localizedPath("service-social", locale),
          label: t("nav.serviceSocial"),
          desc: "TikTok & Instagram",
          Icon: Share2,
        },
      ],
    },
  ];

  const allServiceHrefs = servicesColumns.flatMap((c) =>
    c.items.map((i) => i.href),
  );
  const servicesActive = allServiceHrefs.some(isActive);

  const simpleNav = [
    {
      href: localizedPath("realisations", locale),
      label: t("nav.realisations"),
    },
    { href: localizedPath("blog", locale), label: t("nav.blog") },
    { href: localizedPath("about", locale), label: t("nav.about") },
  ];

  const pillItem = (active: boolean) =>
    `group rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
      active
        ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
        : "text-[var(--color-fg-muted)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-transparent">
      {/* Fullscreen backdrop behind the mega menu. Fades in (with blur + dim) when a
          dropdown with multiple items is open, giving it focus like copyfy.io's nav. */}
      <div
        aria-hidden
        className={`fixed inset-0 -z-20 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          megaOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Progressive blur: strongest at the very top, fading out towards the bottom.
          Stacked layers with increasing blur + stepped mask gradients produce a smoother
          gradient than a single backdrop-filter would. Fades out once the header collapses
          into its scrolled "pill" state. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300 ${
          scrolled ? "opacity-0" : "opacity-100"
        }`}
      >
        <div
          className="absolute inset-0 backdrop-blur-[3px]"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 backdrop-blur-[8px]"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 0%, black 40%, transparent 70%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 backdrop-blur-[16px]"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 0%, black 20%, transparent 45%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 20%, transparent 45%)",
          }}
        />
        <div
          className="absolute inset-0 backdrop-blur-[28px]"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 0%, black 10%, transparent 30%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 10%, transparent 30%)",
          }}
        />
      </div>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-white"
      >
        {t("common.skipToContent")}
      </a>

      <div
        className={`mx-auto flex items-center justify-between gap-4 transition-[max-width,margin,padding,border-radius,background-color,box-shadow,border-color] duration-300 ease-out ${
          scrolled
            ? "mt-3 w-[calc(100%-1.5rem)] max-w-5xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)]/70 px-5 py-2.5 shadow-lg shadow-black/5 backdrop-blur-xl"
            : "w-full max-w-screen-2xl rounded-none border border-transparent bg-transparent px-8 py-4"
        }`}
      >
        {/* Left: Logo */}
        <div className="flex-1">
          <Logo href={localizedPath("home", locale)} />
        </div>

        {/* Center: Nav pill */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)] p-1 shadow-sm md:flex"
        >
          <MegaMenu
            label={t("nav.services")}
            columns={servicesColumns}
            active={servicesActive}
            activeHref={currentPath}
            onOpenChange={setMegaOpen}
          />
          {simpleNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={pillItem(active)}
              >
                <TextReveal text={item.label} />
              </Link>
            );
          })}
        </nav>

        {/* Right: actions */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <ThemeToggle label={t("nav.toggleTheme")} />
          <LanguageSwitcher />
          <div className="hidden md:block">
            <ButtonLink
              href={localizedPath("contact", locale)}
              variant="secondary"
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
          className="border-t border-border bg-bg-elev/80 px-6 py-4 backdrop-blur-xl md:hidden"
        >
          {servicesColumns.map((col) => (
            <div key={col.title} className="mb-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                {col.title}
              </p>
              <ul className="flex flex-col gap-1">
                {col.items.map((item) => {
                  const active = isActive(item.href);
                  const Icon = item.Icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center gap-2 border-l-2 py-1.5 pl-3 text-sm font-medium transition-all ${
                          active
                            ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                            : "border-transparent text-[var(--color-fg-muted)] hover:border-[var(--color-accent)] hover:pl-4 hover:text-[var(--color-accent)]"
                        }`}
                      >
                        {Icon && <Icon size={14} strokeWidth={2} aria-hidden />}
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <HeaderNav
            items={[
              ...simpleNav,
              {
                href: localizedPath("contact", locale),
                label: t("nav.contact"),
              },
            ]}
            orientation="vertical"
            onItemClick={() => setOpen(false)}
            activeHref={currentPath}
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
