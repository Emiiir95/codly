import { Code2, TrendingUp } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import Section from "./Section";
import ServiceCard from "@/components/molecules/ServiceCard";
import Reveal from "@/components/atoms/Reveal";
import SpotlightCard from "@/components/atoms/SpotlightCard";

export default function HomeServices() {
  const { t, locale, raw } = useI18n();
  const webBullets = raw<string[]>("home.services.webBullets");
  const seoBullets = raw<string[]>("home.services.seoBullets");
  const learnMore = t("home.services.learnMore");

  return (
    <Section
      id="services"
      eyebrow={t("home.services.eyebrow")}
      title={t("home.services.title")}
      subtitle={t("home.services.subtitle")}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Reveal delay={0}>
          <SpotlightCard bare>
            <ServiceCard
              icon={Code2}
              accent="primary"
              title={t("home.services.webTitle")}
              description={t("home.services.webDescription")}
              bullets={webBullets}
              href={localizedPath("service-web", locale)}
              ctaLabel={learnMore}
            />
          </SpotlightCard>
        </Reveal>
        <Reveal delay={0.12}>
          <SpotlightCard bare>
            <ServiceCard
              icon={TrendingUp}
              accent="secondary"
              title={t("home.services.seoTitle")}
              description={t("home.services.seoDescription")}
              bullets={seoBullets}
              href={localizedPath("service-seo", locale)}
              ctaLabel={learnMore}
            />
          </SpotlightCard>
        </Reveal>
      </div>
    </Section>
  );
}
