import { useI18n } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import Section from "./Section";
import CtaBanner from "@/components/molecules/CtaBanner";
import Reveal from "@/components/atoms/Reveal";
import SpotlightCard from "@/components/atoms/SpotlightCard";

export default function HomeCta() {
  const { t, locale } = useI18n();
  return (
    <Section className="py-16!">
      <Reveal>
        <SpotlightCard bare>
          <CtaBanner
            title={t("home.cta.title")}
            subtitle={t("home.cta.subtitle")}
            ctaLabel={t("home.cta.button")}
            href={localizedPath("contact", locale)}
          />
        </SpotlightCard>
      </Reveal>
    </Section>
  );
}
