import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { getI18nProps } from "@/lib/i18n.server";
import { buildI18n } from "@/lib/i18n";
import Seo from "@/components/atoms/Seo";
import HomeHero from "@/components/organisms/HomeHero";
import HomeStats from "@/components/organisms/HomeStats";
import HomeServices from "@/components/organisms/HomeServices";
import HomeWhy from "@/components/organisms/HomeWhy";
import HomeProcess from "@/components/organisms/HomeProcess";
import HomeTestimonials from "@/components/organisms/HomeTestimonials";
import HomeContent from "@/components/organisms/HomeContent";
import HomeFaq from "@/components/organisms/HomeFaq";
import HomeCta from "@/components/organisms/HomeCta";
import {
  organizationJsonLd,
  localBusinessJsonLd,
  websiteJsonLd,
  faqJsonLd,
  aggregateRatingJsonLd,
} from "@/lib/jsonld";

export const getStaticProps = (async ({ locale }) => {
  return { props: getI18nProps(locale) };
}) satisfies GetStaticProps;

export default function HomePage({
  translations,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t, raw } = buildI18n(locale, translations);
  const faqItems = raw<Array<{ q: string; a: string }>>("home.faq.items");

  return (
    <>
      <Seo
        title={t("home.meta.title")}
        description={t("home.meta.description")}
        pageKey="home"
        locale={locale}
        jsonLd={[
          organizationJsonLd(),
          localBusinessJsonLd(),
          websiteJsonLd(locale),
          faqJsonLd(faqItems),
          aggregateRatingJsonLd(),
        ]}
      />
      <HomeHero />
      <div className="relative z-10 rounded-t-[2.5rem] bg-[var(--color-bg)] shadow-[0_-24px_60px_-24px_rgba(0,0,0,0.18)]">
        <HomeStats />
        <HomeServices />
        <HomeWhy />
        <HomeProcess />
        <HomeTestimonials />
        <HomeContent />
        <HomeFaq />
        <HomeCta />
      </div>
    </>
  );
}
