import { useI18n } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import type { ServiceId } from "@/lib/services";
import { SERVICE_NS } from "@/lib/services";
import { SERVICE_VISUALS } from "@/lib/service-visuals";
import { ButtonLink } from "@/components/atoms/Button";
import { Phone } from "lucide-react";
import PageHero from "./PageHero";
import Section from "./Section";
import Reveal from "@/components/atoms/Reveal";
import TrustBar from "@/components/molecules/TrustBar";
import PainPoints from "@/components/molecules/PainPoints";
import MidCta from "@/components/molecules/MidCta";
import ProcessSteps from "@/components/molecules/ProcessSteps";
import ServiceDeliverables from "@/components/molecules/ServiceDeliverables";
import ServiceHeroMedia from "@/components/molecules/ServiceHeroMedia";
import ServiceShowcase from "@/components/molecules/ServiceShowcase";
import FinalCta from "@/components/molecules/FinalCta";
import SolutionMobileCarousel from "../molecules/SolutionMobileCarousel";
import CardSwap, { Card } from "../molecules/CardSwap";

type Props = {
  serviceId: ServiceId;
};

export default function ServiceContent({ serviceId }: Props) {
  const { t, raw, locale } = useI18n();
  const ns = SERVICE_NS[serviceId];
  const visuals = SERVICE_VISUALS[serviceId];

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
          {
            label: t("services.breadcrumb"),
            href: localizedPath("services", locale),
          },
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

      {/* Hero visual */}
      <section className="pb-16">
        <ServiceHeroMedia
          src={visuals.hero.src}
          alt={visuals.hero.alt}
          eyebrow={t(`${ns}.hero.eyebrow`)}
        />
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

      {/* Notre approche — CardSwap showcase */}
      <Section align="left" className="md:px-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — intro */}
          <Reveal>
            <p className="text-sm font-medium uppercase md:pt-10 tracking-widest text-[var(--color-accent)]">
              Notre approche
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-4xl">
              {t(`${ns}.solutionTitle`)}
            </h2>
            <div className="mt-5 h-px w-24 bg-gradient-to-r from-[var(--color-accent)] to-transparent" />
            <ul className="mt-8 space-y-3 text-sm text-[var(--color-fg-muted)]">
              {sections.map((s, i) => (
                <li key={s.title} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-soft)] font-mono text-[10px] font-bold text-[var(--color-accent)]">
                    {i + 1}
                  </span>
                  <span className="font-medium text-[var(--color-fg)]">
                    {s.title}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Right — CardSwap on desktop, simple carousel on mobile */}
          <div className="w-full">
            {/* Mobile / tablet — reliable fade carousel with dots + prev/next */}
            <div className="mx-auto w-full max-w-md lg:hidden">
              <SolutionMobileCarousel sections={sections} />
            </div>

            {/* Desktop — 3D CardSwap stack, click to advance */}
            <div className="relative mx-auto hidden h-[480px] w-full max-w-[480px] lg:block">
              <CardSwap
                width={360}
                height={300}
                cardDistance={48}
                verticalDistance={56}
                easing="linear"
                clickToAdvance
                pauseOnHover={false}
              >
                {sections.map((s, i) => (
                  <Card key={s.title}>
                    <div className="flex h-full w-full flex-col gap-4 p-7">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent-soft)] font-mono text-sm font-bold text-[var(--color-accent)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl font-semibold tracking-tight text-[var(--color-fg)]">
                        {s.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">
                        {s.body}
                      </p>
                      <div className="mt-auto flex items-center gap-2 border-t border-[var(--color-border)] pt-4 text-[11px] font-medium uppercase tracking-widest text-[var(--color-fg-subtle)]">
                        <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
                        Étape {i + 1} / {sections.length}
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>
        </div>
      </Section>

      {/* Visual showcase */}
      <Section>
        <ServiceShowcase
          title={t(`${ns}.hero.title`)}
          subtitle={t(`${ns}.hero.subtitle`)}
          images={visuals.showcase}
        />
      </Section>

      {/* Visual showcase */}
      <Section>
        <ServiceShowcase
          title={t(`${ns}.hero.title`)}
          subtitle={t(`${ns}.hero.subtitle`)}
          images={visuals.showcase}
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
