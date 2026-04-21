import { useI18n } from "@/lib/i18n";
import ProseArticle from "@/components/molecules/ProseArticle";
import FeatureCard from "@/components/molecules/FeatureCard";
import PageHero from "./PageHero";
import Section from "./Section";

export default function AboutContent() {
  const { t, raw } = useI18n();
  const sections =
    raw<Array<{ title: string; body: string }>>("about.sections");
  const values =
    raw<Array<{ title: string; body: string }>>("about.values.items");

  return (
    <>
      <PageHero
        eyebrow={t("about.hero.eyebrow")}
        title={t("about.hero.title")}
        subtitle={t("about.hero.subtitle")}
        breadcrumbs={[{ label: t("about.breadcrumb") }]}
      />

      <Section className="!pt-0" align="left">
        <div className="grid gap-10">
          {sections.map((section) => (
            <ProseArticle
              key={section.title}
              title={section.title}
              body={section.body}
            />
          ))}
        </div>
      </Section>

      <Section title={t("about.values.title")}>
        <div className="grid gap-6 sm:grid-cols-2">
          {values.map((item) => (
            <FeatureCard key={item.title} title={item.title} body={item.body} />
          ))}
        </div>
      </Section>
    </>
  );
}
