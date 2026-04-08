import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { getI18nProps } from "@/lib/i18n.server";
import { buildI18n } from "@/lib/i18n";
import Seo from "@/components/atoms/Seo";
import LegalContent from "@/components/organisms/LegalContent";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { localizedPath } from "@/lib/routes";

export const getStaticProps = (async ({ locale }) => {
  return { props: getI18nProps(locale) };
}) satisfies GetStaticProps;

export default function LegalPage({
  translations,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = buildI18n(locale, translations);
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
      <LegalContent namespace="legal" />
    </>
  );
}
