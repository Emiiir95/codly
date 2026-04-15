import { useI18n } from "@/lib/i18n";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";
import PageHero from "./PageHero";
import Section from "./Section";
import Reveal from "@/components/atoms/Reveal";

export default function RealisationsContent() {
  const { t } = useI18n();

  return (
    <>
      <Breadcrumbs items={[{ label: t("realisations.breadcrumb") }]} />

      <PageHero
        eyebrow={t("realisations.hero.eyebrow")}
        title={t("realisations.hero.title")}
        subtitle={t("realisations.hero.subtitle")}
      />

      <Section className="pt-0!">
        <Reveal>
          <div className="card flex flex-col items-center gap-4 p-16 text-center">
            <div
              aria-hidden
              className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
              style={{
                background:
                  "color-mix(in oklab, var(--color-accent) 12%, transparent)",
              }}
            >
              🏆
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-fg)]">
              {t("realisations.comingSoon")}
            </h2>
            <p className="max-w-md text-[var(--color-fg-muted)]">
              {t("realisations.comingSoonBody")}
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
