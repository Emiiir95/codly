import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { getI18nProps } from "@/lib/i18n.server";
import { buildI18n } from "@/lib/i18n";
import Seo from "@/components/atoms/Seo";
import ContactContent from "@/components/organisms/ContactContent";
import { breadcrumbJsonLd, organizationJsonLd } from "@/lib/jsonld";
import { localizedPath } from "@/lib/routes";

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
      <ContactContent />
    </>
  );
}
