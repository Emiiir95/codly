import { useI18n } from "@/lib/i18n";
import Section from "./Section";
import FeatureCard from "@/components/molecules/FeatureCard";

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
        {items.map((item) => (
          <FeatureCard key={item.title} title={item.title} body={item.body} />
        ))}
      </div>
    </Section>
  );
}
