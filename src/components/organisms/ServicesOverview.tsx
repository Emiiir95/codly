import {
  Globe,
  ShoppingCart,
  Code2,
  Search,
  Megaphone,
  Share2,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { localizedPath, type PageKey } from "@/lib/routes";
import PageHero from "./PageHero";
import Section from "./Section";
import Reveal from "@/components/atoms/Reveal";
import ServiceOverviewCard from "@/components/molecules/ServiceOverviewCard";
import MidCta from "@/components/molecules/MidCta";

const WEB_SERVICES: Array<{
  key: string;
  pageKey: PageKey;
  icon: typeof Globe;
}> = [
  { key: "vitrine", pageKey: "service-vitrine", icon: Globe },
  { key: "ecommerce", pageKey: "service-ecommerce", icon: ShoppingCart },
  { key: "surMesure", pageKey: "service-sur-mesure", icon: Code2 },
];

const MARKETING_SERVICES: Array<{
  key: string;
  pageKey: PageKey;
  icon: typeof Search;
}> = [
  { key: "seo", pageKey: "service-seo", icon: Search },
  { key: "ads", pageKey: "service-ads", icon: Megaphone },
  { key: "social", pageKey: "service-social", icon: Share2 },
];

export default function ServicesOverview() {
  const { t, locale } = useI18n();
  const contactPath = localizedPath("contact", locale);

  return (
    <>
      <PageHero
        eyebrow={t("services.hero.eyebrow")}
        title={t("services.hero.title")}
        subtitle={t("services.hero.subtitle")}
        breadcrumbs={[{ label: t("services.breadcrumb") }]}
      />

      {/* Web category */}
      <Section>
        <Reveal>
          <div className="mb-10 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
              {t("services.categories.web.title")}
            </p>
            <p className="mx-auto mt-2 max-w-lg text-[var(--color-fg-muted)]">
              {t("services.categories.web.subtitle")}
            </p>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WEB_SERVICES.map((svc, i) => (
            <Reveal key={svc.key} delay={i * 0.08}>
              <ServiceOverviewCard
                icon={svc.icon}
                tag={t(`services.cards.${svc.key}.tag`)}
                title={t(`services.cards.${svc.key}.title`)}
                description={t(`services.cards.${svc.key}.desc`)}
                href={localizedPath(svc.pageKey, locale)}
                ctaLabel={t("services.cta")}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Marketing category */}
      <Section className="pt-0!">
        <Reveal>
          <div className="mb-10 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
              {t("services.categories.marketing.title")}
            </p>
            <p className="mx-auto mt-2 max-w-lg text-[var(--color-fg-muted)]">
              {t("services.categories.marketing.subtitle")}
            </p>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MARKETING_SERVICES.map((svc, i) => (
            <Reveal key={svc.key} delay={i * 0.08}>
              <ServiceOverviewCard
                icon={svc.icon}
                tag={t(`services.cards.${svc.key}.tag`)}
                title={t(`services.cards.${svc.key}.title`)}
                description={t(`services.cards.${svc.key}.desc`)}
                href={localizedPath(svc.pageKey, locale)}
                ctaLabel={t("services.cta")}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Bottom CTA */}
      <Reveal>
        <MidCta
          title={t("services.ctaBanner.title")}
          subtitle={t("services.ctaBanner.subtitle")}
          buttonLabel={t("services.ctaBanner.button")}
          href={contactPath}
        />
      </Reveal>
      <div className="pb-16" />
    </>
  );
}
