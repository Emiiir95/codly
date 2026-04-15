import { useI18n } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import type { ServiceId } from "@/lib/services";
import { SERVICE_NS, SERVICE_PAGE_KEY } from "@/lib/services";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";
import ProseArticle from "@/components/molecules/ProseArticle";
import DeliverablesList from "@/components/molecules/DeliverablesList";
import CtaBanner from "@/components/molecules/CtaBanner";
import PageHero from "./PageHero";
import Section from "./Section";
import Reveal from "@/components/atoms/Reveal";

type Props = {
  serviceId: ServiceId;
};

export default function ServiceContent({ serviceId }: Props) {
  const { t, raw, locale } = useI18n();
  const ns = SERVICE_NS[serviceId];
  const pageKey = SERVICE_PAGE_KEY[serviceId];

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

      <Section className="pt-0!" align="left">
        <p className="max-w-3xl text-base leading-relaxed text-[var(--color-fg-muted)]">
          {t(`${ns}.intro`)}
        </p>
        <div className="mt-12 grid gap-10">
          {sections.map((section, i) => (
            <Reveal key={section.title} delay={i * 0.08}>
              <ProseArticle title={section.title} body={section.body} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section align="left">
        <Reveal>
          <DeliverablesList
            title={t(`${ns}.deliverables.title`)}
            items={deliverables}
          />
        </Reveal>
      </Section>

      <Section className="py-16!">
        <Reveal>
          <CtaBanner
            title={t(`${ns}.cta.title`)}
            subtitle={t(`${ns}.cta.subtitle`)}
            ctaLabel={t(`${ns}.cta.button`)}
            href={localizedPath("contact", locale)}
          />
        </Reveal>
      </Section>
    </>
  );
}
