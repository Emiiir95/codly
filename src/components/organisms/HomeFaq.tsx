import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import Section from "./Section";
import FaqItem from "@/components/molecules/FaqItem";

export default function HomeFaq() {
  const { t, raw } = useI18n();
  const items = raw<Array<{ q: string; a: string }>>("home.faq.items");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" eyebrow={t("home.faq.eyebrow")} title={t("home.faq.title")}>
      <ul className="mx-auto max-w-3xl space-y-3">
        {items.map((item, i) => (
          <FaqItem
            key={item.q}
            question={item.q}
            answer={item.a}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </ul>
    </Section>
  );
}
