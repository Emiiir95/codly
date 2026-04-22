import { useI18n } from "@/lib/i18n";
import Section from "./Section";
import Reveal from "@/components/atoms/Reveal";
import SpotlightCard from "@/components/atoms/SpotlightCard";

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
            <SpotlightCard className="h-full">
              <h3 className="text-lg font-semibold text-[var(--color-fg)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                {item.body}
              </p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
