import { useI18n } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import Eyebrow from "@/components/atoms/Eyebrow";
import GradientHeading from "@/components/atoms/GradientHeading";
import HeroBackground from "@/components/atoms/HeroBackground";
import { ButtonLink } from "@/components/atoms/Button";
import LighthousePreview from "@/components/molecules/LighthousePreview";

export default function HomeHero() {
  const { t, locale } = useI18n();
  return (
    <section className="relative overflow-hidden">
      <HeroBackground />
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 pb-20 pt-16 sm:pt-24 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <Eyebrow withDot className="mb-4">
            {t("home.hero.eyebrow")}
          </Eyebrow>
          <GradientHeading as={1} size="xl">
            {t("home.hero.title")}
          </GradientHeading>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-fg-muted)]">
            {t("home.hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href={localizedPath("contact", locale)}
              variant="primary"
            >
              {t("home.hero.ctaPrimary")} →
            </ButtonLink>
            <ButtonLink
              href={localizedPath("service-web", locale)}
              variant="secondary"
            >
              {t("home.hero.ctaSecondary")}
            </ButtonLink>
          </div>
        </div>
        <div className="relative md:col-span-5">
          <LighthousePreview />
        </div>
      </div>
    </section>
  );
}
