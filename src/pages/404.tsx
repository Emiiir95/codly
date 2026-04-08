import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { getI18nProps } from "@/lib/i18n.server";
import { buildI18n } from "@/lib/i18n";
import NotFoundContent from "@/components/organisms/NotFoundContent";

export const getStaticProps = (async ({ locale }) => {
  return { props: getI18nProps(locale) };
}) satisfies GetStaticProps;

export default function NotFoundPage({
  translations,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = buildI18n(locale, translations);
  return (
    <>
      <Head>
        <title>{t("notFound.meta.title")}</title>
        <meta name="description" content={t("notFound.meta.description")} />
        <meta name="robots" content="noindex" />
      </Head>
      <NotFoundContent />
    </>
  );
}
