import { useI18n } from "@/lib/i18n";
import Section from "./Section";
import ProcessStep from "@/components/molecules/ProcessStep";
import Reveal from "@/components/atoms/Reveal";

export default function HomeProcess() {
  const { t, raw } = useI18n();
  const steps = raw<Array<{ title: string; body: string }>>(
    "home.process.steps",
  );

  return (
    <Section
      id="process"
      eyebrow={t("home.process.eyebrow")}
      title={t("home.process.title")}
      subtitle={t("home.process.subtitle")}
    >
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <Reveal key={step.title} as="li" delay={i * 0.1}>
            <ProcessStep index={i + 1} title={step.title} body={step.body} />
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
