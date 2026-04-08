import { useI18n } from "@/lib/i18n";
import Section from "./Section";

export default function HomeContent() {
  const { t, raw } = useI18n();
  const paragraphs = raw<string[]>("home.content.paragraphs");

  return (
    <Section>
      <div className="mx-auto max-w-3xl space-y-5 text-base leading-relaxed text-[var(--color-fg-muted)]">
        <p className="text-lg text-[var(--color-fg)]">{t("home.content.intro")}</p>
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </Section>
  );
}
