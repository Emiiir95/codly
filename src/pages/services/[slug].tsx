import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { buildI18n } from "@/lib/i18n";
import { getI18nProps } from "@/lib/i18n.server";
import { SITE, type Locale } from "@/lib/site";
import { SERVICES, getServiceBySlug, type ServiceId } from "@/lib/services";
import Seo from "@/components/Seo";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/Button";
import { localizedPath } from "@/lib/routes";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  serviceJsonLd,
} from "@/lib/jsonld";

type Props = {
  translations: ReturnType<typeof getI18nProps>["translations"];
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
  return {
    props: {
      ...i18n,
      serviceId: service.id,
    },
  };
};

export default function ServicePage({
  translations,
  locale,
  serviceId,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t, raw } = buildI18n(locale, translations);
  const ns = serviceId === "web" ? "serviceWeb" : "serviceSeo";
  const pageKey = serviceId === "web" ? "service-web" : "service-seo";

  const sections = raw<Array<{ title: string; body: string }>>(
    `${ns}.sections`,
  );
  const deliverables = raw<string[]>(`${ns}.deliverables.items`);
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
            serviceType:
              serviceId === "web"
                ? "Website design and development"
                : "Search engine optimization",
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

      <Breadcrumbs items={[{ label: t(`${ns}.breadcrumb`) }]} />

      <Section className="!pt-12 !pb-12" align="left">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)]/60 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[var(--color-fg-muted)]">
          {t(`${ns}.hero.eyebrow`)}
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          <span className="text-gradient">{t(`${ns}.hero.title`)}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-fg-muted)]">
          {t(`${ns}.hero.subtitle`)}
        </p>
      </Section>

      <Section className="!pt-0" align="left">
        <p className="max-w-3xl text-base leading-relaxed text-[var(--color-fg-muted)]">
          {t(`${ns}.intro`)}
        </p>

        <div className="mt-12 grid gap-10">
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

      <Section align="left">
        <div className="card p-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            {t(`${ns}.deliverables.title`)}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {deliverables.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-[var(--color-fg-muted)]"
              >
                <span
                  aria-hidden
                  className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--color-accent-2)]"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="!py-16">
        <div className="card relative overflow-hidden p-10 text-center">
          <div aria-hidden className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t(`${ns}.cta.title`)}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[var(--color-fg-muted)]">
              {t(`${ns}.cta.subtitle`)}
            </p>
            <div className="mt-6 flex justify-center">
              <ButtonLink
                href={localizedPath("contact", locale)}
                variant="primary"
              >
                {t(`${ns}.cta.button`)} →
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
