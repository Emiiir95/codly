import { useI18n } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import Logo from "@/components/atoms/Logo";
import SocialLinks from "@/components/molecules/SocialLinks";
import FooterNavColumn from "@/components/molecules/FooterNavColumn";
import FooterContactBlock from "@/components/molecules/FooterContactBlock";

export default function Footer() {
  const { t, locale } = useI18n();
  const year = new Date().getFullYear();

  const navCols = [
    {
      title: t("footer.navigation"),
      links: [
        { href: localizedPath("home", locale), label: t("nav.home") },
        { href: localizedPath("about", locale), label: t("nav.about") },
        { href: localizedPath("contact", locale), label: t("nav.contact") },
      ],
    },
    {
      title: t("footer.services"),
      links: [
        {
          href: localizedPath("service-web", locale),
          label: t("nav.serviceWeb"),
        },
        {
          href: localizedPath("service-seo", locale),
          label: t("nav.serviceSeo"),
        },
      ],
    },
    {
      title: t("footer.legal"),
      links: [
        { href: localizedPath("legal", locale), label: t("footer.legalNotice") },
        { href: localizedPath("privacy", locale), label: t("footer.privacy") },
      ],
    },
  ];

  return (
    <footer className="mt-24 border-t border-[var(--color-border)] bg-[var(--color-bg-elev)]">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo href={localizedPath("home", locale)} />
          <p className="mt-4 max-w-sm text-sm text-[var(--color-fg-muted)]">
            {t("footer.tagline")}
          </p>
          <div className="mt-6">
            <SocialLinks />
          </div>
        </div>
        {navCols.map((col) => (
          <FooterNavColumn
            key={col.title}
            title={col.title}
            links={col.links}
          />
        ))}
        <FooterContactBlock />
      </div>
      <div className="border-t border-[var(--color-border)] px-6 py-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 text-xs text-[var(--color-fg-muted)] sm:flex-row">
          <p>
            © {year} Agency. {t("footer.rights")}
          </p>
          <p>{t("footer.madeIn")}</p>
        </div>
      </div>
    </footer>
  );
}
