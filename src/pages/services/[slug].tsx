import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { getI18nProps } from "@/lib/i18n.server";
import { buildI18n } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import {
  SERVICES,
  getServiceBySlug,
  SERVICE_NS,
  SERVICE_PAGE_KEY,
  type ServiceId,
} from "@/lib/services";
import Seo from "@/components/atoms/Seo";
import ServiceContent from "@/components/organisms/ServiceContent";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { localizedPath } from "@/lib/routes";
import type { Translations } from "@/lib/i18n";
import type { Locale } from "@/lib/site";

type Props = {
  translations: Translations;
  locale: Locale;
  serviceId: ServiceId;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = SERVICES.flatMap((service) =>
    SITE.locales.map((locale) => ({
      params: { slug: service.slugs[locale] },
      locale,
    })),
  );
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({
  params,
  locale,
}) => {
  const slug = params?.slug;
  const i18n = getI18nProps(locale);
  const service = slug ? getServiceBySlug(slug, i18n.locale) : undefined;
  if (!service) return { notFound: true };
  return { props: { ...i18n, serviceId: service.id } };
};

export default function ServicePage({
  translations,
  locale,
  serviceId,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t, raw } = buildI18n(locale, translations);
  const ns = SERVICE_NS[serviceId];
  const pageKey = SERVICE_PAGE_KEY[serviceId];
  const faqItems = raw<Array<{ q: string; a: string }>>("home.faq.items");

  return (
    <>
      <Seo
        title={t(`${ns}.meta.title`)}
        description={t(`${ns}.meta.description`)}
        pageKey={pageKey}
        locale={locale}
        jsonLd={[
          serviceJsonLd({
            name: t(`${ns}.hero.title`),
            description: t(`${ns}.meta.description`),
            pageKey,
            locale,
            serviceType: t(`${ns}.hero.eyebrow`),
          }),
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: t("common.home"), path: localizedPath("home", locale) },
            {
              name: t(`${ns}.breadcrumb`),
              path: localizedPath(pageKey, locale),
            },
          ]),
        ]}
      />
      <ServiceContent serviceId={serviceId} />
    </>
  );
}
