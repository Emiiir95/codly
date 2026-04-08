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

export default function PrivacyPage({
  translations,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = buildI18n(locale, translations);
  return (
    <>
      <Seo
        title={t("privacy.meta.title")}
        description={t("privacy.meta.description")}
        pageKey="privacy"
        locale={locale}
        jsonLd={[
          breadcrumbJsonLd([
            { name: t("common.home"), path: localizedPath("home", locale) },
            {
              name: t("privacy.breadcrumb"),
              path: localizedPath("privacy", locale),
            },
          ]),
        ]}
      />
      <LegalContent namespace="privacy" />
    </>
  );
}
