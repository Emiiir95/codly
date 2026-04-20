import { ArrowRight } from "lucide-react";
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
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 pb-20 pt-28 sm:pt-36 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <div
            className="animate-fade-up mb-5"
            style={{ animationDelay: "0ms" }}
          >
            <Eyebrow withDot>{t("home.hero.eyebrow")}</Eyebrow>
          </div>
          <div
            className="animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            <GradientHeading as={1} size="xl">
              {t("home.hero.title")}
            </GradientHeading>
          </div>
          <p
            className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-fg-muted"
            style={{ animationDelay: "180ms" }}
          >
            {t("home.hero.subtitle")}
          </p>
          <div
            className="animate-fade-up mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "280ms" }}
          >
            <ButtonLink
              href={localizedPath("contact", locale)}
              variant="primary"
            >
              {t("home.hero.ctaPrimary")} <ArrowRight size={16} strokeWidth={2} aria-hidden />
            </ButtonLink>
            <ButtonLink
              href={localizedPath("service-web", locale)}
              variant="secondary"
            >
              {t("home.hero.ctaSecondary")}
            </ButtonLink>
          </div>
        </div>
        <div
          className="animate-fade-in relative md:col-span-5"
          style={{ animationDelay: "420ms" }}
        >
          <LighthousePreview />
        </div>
      </div>
    </section>
  );
}
