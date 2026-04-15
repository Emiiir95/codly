import { useI18n } from "@/lib/i18n";
import Section from "./Section";
import FeatureCard from "@/components/molecules/FeatureCard";
import Reveal from "@/components/atoms/Reveal";

export default function HomeWhy() {
  const { t, raw } = useI18n();
  const items = raw<Array<{ title: string; body: string }>>("home.why.items");

  return (
    <Section
      id="why"
      eyebrow={t("home.why.eyebrow")}
      title={t("home.why.title")}
      subtitle={t("home.why.subtitle")}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.1}>
            <FeatureCard title={item.title} body={item.body} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
