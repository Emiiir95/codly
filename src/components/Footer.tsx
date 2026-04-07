import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import { SITE } from "@/lib/site";

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
        { href: localizedPath("service-web", locale), label: t("nav.serviceWeb") },
        { href: localizedPath("service-seo", locale), label: t("nav.serviceSeo") },
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
    <footer className="mt-24 border-t border-[var(--color-border)]">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link
            href={localizedPath("home", locale)}
            className="flex items-center gap-2 font-semibold"
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
          <p className="mt-4 max-w-sm text-sm text-[var(--color-fg-muted)]">
            {t("footer.tagline")}
          </p>
          <div className="mt-6 flex gap-3 text-xs text-[var(--color-fg-muted)]">
            <a
              href={SITE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--color-border)] px-3 py-1 hover:border-[var(--color-border-strong)]"
            >
              LinkedIn
            </a>
            <a
              href={SITE.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--color-border)] px-3 py-1 hover:border-[var(--color-border-strong)]"
            >
              Twitter
            </a>
            <a
              href={SITE.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--color-border)] px-3 py-1 hover:border-[var(--color-border-strong)]"
            >
              GitHub
            </a>
          </div>
        </div>
        {navCols.map((col) => (
          <nav key={col.title} aria-label={col.title} className="md:col-span-2">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-fg)]">
              {col.title}
            </h2>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-fg-muted)] transition hover:text-[var(--color-fg)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <address className="not-italic md:col-span-3">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest">
            Contact
          </h2>
          <ul className="space-y-2 text-sm text-[var(--color-fg-muted)]">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="hover:text-[var(--color-fg)]"
              >
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="hover:text-[var(--color-fg)]"
              >
                {SITE.phone}
              </a>
            </li>
            <li>
              {SITE.address.street}
              <br />
              {SITE.address.postalCode} {SITE.address.city}
            </li>
          </ul>
        </address>
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
