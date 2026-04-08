import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { getI18nProps } from "@/lib/i18n.server";
import { buildI18n } from "@/lib/i18n";
import Seo from "@/components/atoms/Seo";
import AboutContent from "@/components/organisms/AboutContent";
import { breadcrumbJsonLd, organizationJsonLd } from "@/lib/jsonld";
import { localizedPath } from "@/lib/routes";

export const getStaticProps = (async ({ locale }) => {
  return { props: getI18nProps(locale) };
}) satisfies GetStaticProps;

export default function AboutPage({
  translations,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = buildI18n(locale, translations);
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
      <AboutContent />
    </>
  );
}
