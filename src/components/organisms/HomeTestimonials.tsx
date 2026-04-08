import { useI18n } from "@/lib/i18n";
import Section from "./Section";
import TestimonialCard from "@/components/molecules/TestimonialCard";

export default function HomeTestimonials() {
  const { t, raw } = useI18n();
  const items = raw<Array<{ quote: string; author: string; role: string }>>(
    "home.testimonials.items",
  );

  return (
    <Section
      id="testimonials"
      eyebrow={t("home.testimonials.eyebrow")}
      title={t("home.testimonials.title")}
    >
      <ul className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <TestimonialCard key={item.author} {...item} />
        ))}
      </ul>
    </Section>
  );
}
