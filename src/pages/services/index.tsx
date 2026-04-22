import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { getI18nProps } from "@/lib/i18n.server";
import { buildI18n } from "@/lib/i18n";
import type { Translations } from "@/lib/i18n";
import type { Locale } from "@/lib/site";
import Seo from "@/components/atoms/Seo";
import ServicesOverview from "@/components/organisms/ServicesOverview";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { localizedPath } from "@/lib/routes";

type Props = {
  translations: Translations;
  locale: Locale;
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const i18n = getI18nProps(locale);
  return { props: i18n };
};

export default function ServicesPage({
  translations,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = buildI18n(locale, translations);

  return (
    <>
      <Seo
        title={t("services.meta.title")}
        description={t("services.meta.description")}
        pageKey="services"
        locale={locale}
        jsonLd={[
          breadcrumbJsonLd([
            { name: t("common.home"), path: localizedPath("home", locale) },
            {
              name: t("services.breadcrumb"),
              path: localizedPath("services", locale),
            },
          ]),
        ]}
      />
      <ServicesOverview />
    </>
  );
}
