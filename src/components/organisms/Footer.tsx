import { useI18n } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import { SITE } from "@/lib/site";
import Logo from "@/components/atoms/Logo";

export default function Footer() {
  const { t, locale } = useI18n();
  const year = new Date().getFullYear();

  const navigation = {
    nav: [
      { href: localizedPath("home", locale), label: t("nav.home") },
      { href: localizedPath("services", locale), label: t("nav.services") },
      {
        href: localizedPath("realisations", locale),
        label: t("nav.realisations"),
      },
      { href: localizedPath("blog", locale), label: t("nav.blog") },
      { href: localizedPath("about", locale), label: t("nav.about") },
      { href: localizedPath("contact", locale), label: t("nav.contact") },
    ],
    legal: [
      { href: localizedPath("legal", locale), label: t("footer.legalNotice") },
      { href: localizedPath("privacy", locale), label: t("footer.privacy") },
    ],
    social: [
      {
        name: "LinkedIn",
        href: SITE.social.linkedin,
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        ),
      },
      {
        name: "Twitter / X",
        href: SITE.social.twitter,
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
          </svg>
        ),
      },
      {
        name: "GitHub",
        href: SITE.social.github,
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
    ],
  };

  return (
    <footer className="bg-bg-elev">
      <div className="mx-auto max-w-screen-2xl px-16 pb-8 pt-10 sm:pt-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand block */}
          <div className="space-y-8">
            <Logo href={localizedPath("home", locale)} />
            <p className="text-sm/6 text-fg-muted">{t("footer.tagline")}</p>
            <div className="flex gap-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg-muted hover:text-fg"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon aria-hidden="true" className="size-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 xl:col-span-2 xl:mt-0">
            {/* Navigation */}
            <div>
              <h3 className="text-sm/6 font-semibold text-fg">
                {t("footer.navigation")}
              </h3>
              <ul role="list" className="mt-3 space-y-2">
                {navigation.nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm/6 text-fg-muted hover:text-fg"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Informations */}
            <div>
              <h3 className="text-sm/6 font-semibold text-fg">
                {t("footer.legal")}
              </h3>
              <ul role="list" className="mt-3 space-y-2">
                {navigation.legal.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm/6 text-fg-muted hover:text-fg"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm/6 font-semibold text-fg">Contact</h3>
              <ul role="list" className="mt-3 space-y-2">
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-sm/6 text-fg-muted hover:text-fg"
                  >
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                    className="text-sm/6 text-fg-muted hover:text-fg"
                  >
                    {SITE.phone}
                  </a>
                </li>
                <li className="text-sm/6 text-fg-muted">
                  {SITE.address.street}
                  <br />
                  {SITE.address.postalCode} {SITE.address.city}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col items-center justify-between gap-2 text-sm/6 text-fg-muted sm:flex-row">
            <p>
              © {year} Agency. {t("footer.rights")}
            </p>
            <p>{t("footer.madeIn")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
