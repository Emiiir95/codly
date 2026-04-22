import { useI18n } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import type { ServiceId } from "@/lib/services";
import { SERVICE_NS } from "@/lib/services";
import { ButtonLink } from "@/components/atoms/Button";
import { Phone } from "lucide-react";
import PageHero from "./PageHero";
import Section from "./Section";
import Reveal from "@/components/atoms/Reveal";
import TrustBar from "@/components/molecules/TrustBar";
import PainPoints from "@/components/molecules/PainPoints";
import SolutionGrid from "@/components/molecules/SolutionGrid";
import MidCta from "@/components/molecules/MidCta";
import ProcessSteps from "@/components/molecules/ProcessSteps";
import ServiceDeliverables from "@/components/molecules/ServiceDeliverables";
import FinalCta from "@/components/molecules/FinalCta";

type Props = {
  serviceId: ServiceId;
};

export default function ServiceContent({ serviceId }: Props) {
  const { t, raw, locale } = useI18n();
  const ns = SERVICE_NS[serviceId];

  const sections = raw<Array<{ title: string; body: string }>>(
    `${ns}.sections`,
  );
  const deliverables = raw<string[]>(`${ns}.deliverables.items`);
  const process = raw<Array<{ step: string; title: string; desc: string }>>(
    `${ns}.process.steps`,
  );
  const pain = raw<string[]>(`${ns}.pain.items`);

  const contactPath = localizedPath("contact", locale);

  return (
    <>
      {/* Hero + CTA */}
      <PageHero
        eyebrow={t(`${ns}.hero.eyebrow`)}
        title={t(`${ns}.hero.title`)}
        subtitle={t(`${ns}.hero.subtitle`)}
        breadcrumbs={[
          { label: t("services.breadcrumb"), href: localizedPath("services", locale) },
          { label: t(`${ns}.breadcrumb`) },
        ]}
      />
      <section className="mx-auto w-full max-w-6xl px-6 -mt-4 pb-12">
        <Reveal>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href={contactPath} variant="primary">
              {t(`${ns}.cta.button`)} &rarr;
            </ButtonLink>
            <ButtonLink href="tel:+33000000000" variant="secondary">
              <Phone size={16} /> {t("service.callFree")}
            </ButtonLink>
          </div>
        </Reveal>
      </section>

      {/* Trust Bar */}
      <Reveal>
        <section className="mx-auto w-full max-w-5xl px-6 pb-16">
          <TrustBar
            projectsLabel={t("service.trustProjects")}
            satisfactionLabel={t("service.trustSatisfaction")}
            locationLabel={t("service.trustLocation")}
          />
        </section>
      </Reveal>

      {/* Pain Points */}
      <Section className="pt-0!">
        <Reveal>
          <PainPoints
            eyebrow={t(`${ns}.pain.eyebrow`)}
            title={t(`${ns}.pain.title`)}
            items={pain}
          />
        </Reveal>
      </Section>

      {/* Solution Grid */}
      <Section align="left">
        <SolutionGrid
          eyebrow={t("service.approachEyebrow")}
          title={t(`${ns}.solutionTitle`)}
          items={sections}
        />
      </Section>

      {/* Mid CTA */}
      <Reveal>
        <MidCta
          title={t(`${ns}.midCta.title`)}
          subtitle={t(`${ns}.midCta.subtitle`)}
          buttonLabel={t(`${ns}.midCta.button`)}
          href={contactPath}
        />
      </Reveal>

      {/* Process */}
      <Section>
        <ProcessSteps
          eyebrow={t("service.processEyebrow")}
          title={t(`${ns}.process.title`)}
          steps={process}
        />
      </Section>

      {/* Deliverables */}
      <Section align="left">
        <Reveal>
          <ServiceDeliverables
            title={t(`${ns}.deliverables.title`)}
            items={deliverables}
          />
        </Reveal>
      </Section>

      {/* Final CTA */}
      <Section className="py-16!">
        <Reveal>
          <FinalCta
            title={t(`${ns}.cta.title`)}
            subtitle={t(`${ns}.cta.subtitle`)}
            buttonLabel={t(`${ns}.cta.button`)}
            href={contactPath}
            orCallLabel={t("service.orCallUs")}
            footerNote={t("service.quoteFooter")}
          />
        </Reveal>
      </Section>
    </>
  );
}
