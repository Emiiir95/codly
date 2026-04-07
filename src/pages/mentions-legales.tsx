import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { buildI18n } from "@/lib/i18n";
import { getI18nProps } from "@/lib/i18n.server";
import Seo from "@/components/Seo";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { localizedPath } from "@/lib/routes";

export const getStaticProps = (async ({ locale }) => {
  return { props: getI18nProps(locale) };
}) satisfies GetStaticProps;

export default function LegalPage({
  translations,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t, raw } = buildI18n(locale, translations);
  const sections = raw<Array<{ title: string; body: string }>>("legal.sections");

  return (
    <>
      <Seo
        title={t("legal.meta.title")}
        description={t("legal.meta.description")}
        pageKey="legal"
        locale={locale}
        jsonLd={[
          breadcrumbJsonLd([
            { name: t("common.home"), path: localizedPath("home", locale) },
            { name: t("legal.breadcrumb"), path: localizedPath("legal", locale) },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ label: t("legal.breadcrumb") }]} />

      <Section className="!pt-12" align="left">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {t("legal.title")}
        </h1>
        <div className="mt-10 grid max-w-3xl gap-8">
          {sections.map((section) => (
            <article key={section.title}>
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
