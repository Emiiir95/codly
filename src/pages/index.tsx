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
        {/* Accent halo at the seam — pink/violet radial glow that bleeds
            across the rounded top edge so the transition from the hero is
            visually marked rather than a plain shadow line. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-40 blur-2xl"
          style={{
            background:
              "radial-gradient(600px 180px at 50% 100%, color-mix(in oklab, var(--color-accent) 20%, transparent), transparent 75%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-px h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, color-mix(in oklab, var(--color-accent) 55%, transparent), transparent)",
          }}
        />
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
