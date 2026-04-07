import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { buildI18n } from "@/lib/i18n";
import { getI18nProps } from "@/lib/i18n.server";
import Seo from "@/components/Seo";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { breadcrumbJsonLd, organizationJsonLd } from "@/lib/jsonld";
import { localizedPath } from "@/lib/routes";
import { SITE } from "@/lib/site";

export const getStaticProps = (async ({ locale }) => {
  return { props: getI18nProps(locale) };
}) satisfies GetStaticProps;

export default function ContactPage({
  translations,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = buildI18n(locale, translations);

  return (
    <>
      <Seo
        title={t("contact.meta.title")}
        description={t("contact.meta.description")}
        pageKey="contact"
        locale={locale}
        jsonLd={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: t("common.home"), path: localizedPath("home", locale) },
            {
              name: t("contact.breadcrumb"),
              path: localizedPath("contact", locale),
            },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ label: t("contact.breadcrumb") }]} />

      <Section className="!pt-12 !pb-12" align="left">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)]/60 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[var(--color-fg-muted)]">
          {t("contact.hero.eyebrow")}
        </p>
        <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          <span className="text-gradient">{t("contact.hero.title")}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-fg-muted)]">
          {t("contact.hero.subtitle")}
        </p>
      </Section>

      <Section className="!pt-0" align="left">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <ContactForm />
          </div>
          <aside className="card flex flex-col gap-5 p-6">
            <h2 className="text-lg font-semibold">{t("contact.info.title")}</h2>
            <div>
              <p className="text-xs uppercase tracking-widest text-[var(--color-fg-muted)]">
                {t("contact.info.emailLabel")}
              </p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-1 block text-sm hover:text-[var(--color-accent-2)]"
              >
                {SITE.email}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[var(--color-fg-muted)]">
                {t("contact.info.phoneLabel")}
              </p>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="mt-1 block text-sm hover:text-[var(--color-accent-2)]"
              >
                {SITE.phone}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[var(--color-fg-muted)]">
                {t("contact.info.addressLabel")}
              </p>
              <address className="mt-1 not-italic text-sm text-[var(--color-fg-muted)]">
                {SITE.address.street}
                <br />
                {SITE.address.postalCode} {SITE.address.city}
              </address>
            </div>
            <p className="mt-auto text-xs text-[var(--color-fg-muted)]">
              {t("contact.info.hours")}
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
