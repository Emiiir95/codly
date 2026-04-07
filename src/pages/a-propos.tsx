import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { buildI18n } from "@/lib/i18n";
import { getI18nProps } from "@/lib/i18n.server";
import Seo from "@/components/Seo";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import { breadcrumbJsonLd, organizationJsonLd } from "@/lib/jsonld";
import { localizedPath } from "@/lib/routes";

export const getStaticProps = (async ({ locale }) => {
  return { props: getI18nProps(locale) };
}) satisfies GetStaticProps;

export default function AboutPage({
  translations,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t, raw } = buildI18n(locale, translations);
  const sections = raw<Array<{ title: string; body: string }>>("about.sections");
  const values = raw<Array<{ title: string; body: string }>>("about.values.items");

  return (
    <>
      <Seo
        title={t("about.meta.title")}
        description={t("about.meta.description")}
        pageKey="about"
        locale={locale}
        jsonLd={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: t("common.home"), path: localizedPath("home", locale) },
            { name: t("about.breadcrumb"), path: localizedPath("about", locale) },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ label: t("about.breadcrumb") }]} />

      <Section className="!pt-12 !pb-12" align="left">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)]/60 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[var(--color-fg-muted)]">
          {t("about.hero.eyebrow")}
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          <span className="text-gradient">{t("about.hero.title")}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-fg-muted)]">
          {t("about.hero.subtitle")}
        </p>
      </Section>

      <Section className="!pt-0" align="left">
        <div className="grid gap-10">
          {sections.map((section) => (
            <article key={section.title} className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight">
                {section.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-fg-muted)]">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section title={t("about.values.title")}>
        <div className="grid gap-6 sm:grid-cols-2">
          {values.map((item) => (
            <article key={item.title} className="card p-6">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
