import { useI18n } from "@/lib/i18n";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";
import ContactInfoCard from "@/components/molecules/ContactInfoCard";
import PageHero from "./PageHero";
import Section from "./Section";
import ContactForm from "./ContactForm";

export default function ContactContent() {
  const { t } = useI18n();
  return (
    <>
      <Breadcrumbs items={[{ label: t("contact.breadcrumb") }]} />

      <PageHero
        eyebrow={t("contact.hero.eyebrow")}
        title={t("contact.hero.title")}
        subtitle={t("contact.hero.subtitle")}
      />

      <Section className="!pt-0" align="left">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <ContactForm />
          </div>
          <ContactInfoCard />
        </div>
      </Section>
    </>
  );
}
