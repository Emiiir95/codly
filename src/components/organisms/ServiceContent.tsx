import { useI18n } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import type { ServiceId } from "@/lib/services";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";
import ProseArticle from "@/components/molecules/ProseArticle";
import DeliverablesList from "@/components/molecules/DeliverablesList";
import CtaBanner from "@/components/molecules/CtaBanner";
import PageHero from "./PageHero";
import Section from "./Section";

type Props = {
  serviceId: ServiceId;
};

export default function ServiceContent({ serviceId }: Props) {
  const { t, raw, locale } = useI18n();
  const ns = serviceId === "web" ? "serviceWeb" : "serviceSeo";

  const sections = raw<Array<{ title: string; body: string }>>(
    `${ns}.sections`,
  );
  const deliverables = raw<string[]>(`${ns}.deliverables.items`);

  return (
    <>
      <Breadcrumbs items={[{ label: t(`${ns}.breadcrumb`) }]} />

      <PageHero
        eyebrow={t(`${ns}.hero.eyebrow`)}
        title={t(`${ns}.hero.title`)}
        subtitle={t(`${ns}.hero.subtitle`)}
      />

      <Section className="!pt-0" align="left">
        <p className="max-w-3xl text-base leading-relaxed text-[var(--color-fg-muted)]">
          {t(`${ns}.intro`)}
        </p>
        <div className="mt-12 grid gap-10">
          {sections.map((section) => (
            <ProseArticle
              key={section.title}
              title={section.title}
              body={section.body}
            />
          ))}
        </div>
      </Section>

      <Section align="left">
        <DeliverablesList
          title={t(`${ns}.deliverables.title`)}
          items={deliverables}
        />
      </Section>

      <Section className="!py-16">
        <CtaBanner
          title={t(`${ns}.cta.title`)}
          subtitle={t(`${ns}.cta.subtitle`)}
          ctaLabel={t(`${ns}.cta.button`)}
          href={localizedPath("contact", locale)}
        />
      </Section>
    </>
  );
}
