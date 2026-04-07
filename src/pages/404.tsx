import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { buildI18n } from "@/lib/i18n";
import { getI18nProps } from "@/lib/i18n.server";
import { ButtonLink } from "@/components/Button";
import { localizedPath } from "@/lib/routes";

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
      <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="font-mono text-7xl text-gradient sm:text-9xl">
          {t("notFound.code")}
        </p>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("notFound.title")}
        </h1>
        <p className="mt-4 max-w-xl text-[var(--color-fg-muted)]">
          {t("notFound.subtitle")}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={localizedPath("home", locale)} variant="primary">
            {t("notFound.back")}
          </ButtonLink>
          <ButtonLink
            href={localizedPath("service-web", locale)}
            variant="secondary"
          >
            {t("notFound.services")}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
