import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { buildI18n } from "@/lib/i18n";
import { getI18nProps } from "@/lib/i18n.server";
import type { Locale } from "@/lib/site";
import Seo from "@/components/Seo";
import Section from "@/components/Section";
import { ButtonLink } from "@/components/Button";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import { localizedPath } from "@/lib/routes";
import {
  organizationJsonLd,
  localBusinessJsonLd,
  websiteJsonLd,
  faqJsonLd,
  aggregateRatingJsonLd,
} from "@/lib/jsonld";

export const getStaticProps = (async ({ locale }) => {
  return { props: getI18nProps(locale) };
}) satisfies GetStaticProps;

export default function HomePage({
  translations,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t, raw } = buildI18n(locale, translations);
  const loc = locale as Locale;

  const stats = [
    { value: "120+", label: t("home.stats.projects") },
    { value: "92%", label: t("home.stats.retention") },
    { value: "98", label: t("home.stats.lighthouse") },
    { value: "76%", label: t("home.stats.ranking") },
  ];

  const whyItems = raw<Array<{ title: string; body: string }>>("home.why.items");
  const processSteps = raw<Array<{ title: string; body: string }>>(
    "home.process.steps",
  );
  const testimonials = raw<
    Array<{ quote: string; author: string; role: string }>
  >("home.testimonials.items");
  const faqItems = raw<Array<{ q: string; a: string }>>("home.faq.items");
  const homeParagraphs = raw<string[]>("home.content.paragraphs");
  const webBullets = raw<string[]>("home.services.webBullets");
  const seoBullets = raw<string[]>("home.services.seoBullets");

  return (
    <>
      <Seo
        title={t("home.meta.title")}
        description={t("home.meta.description")}
        pageKey="home"
        locale={loc}
        jsonLd={[
          organizationJsonLd(),
          localBusinessJsonLd(),
          websiteJsonLd(loc),
          faqJsonLd(faqItems),
          aggregateRatingJsonLd(),
        ]}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 pb-20 pt-16 sm:pt-24 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)]/60 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[var(--color-fg-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-2)]" />
              {t("home.hero.eyebrow")}
            </p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[64px]">
              <span className="text-gradient">{t("home.hero.title")}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-fg-muted)]">
              {t("home.hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={localizedPath("contact", loc)} variant="primary">
                {t("home.hero.ctaPrimary")} →
              </ButtonLink>
              <ButtonLink
                href={localizedPath("service-web", loc)}
                variant="secondary"
              >
                {t("home.hero.ctaSecondary")}
              </ButtonLink>
            </div>
          </div>
          <div className="relative md:col-span-5">
            <div className="card animate-float relative overflow-hidden p-6">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="relative space-y-4">
                <div className="flex items-center justify-between text-xs text-[var(--color-fg-muted)]">
                  <span className="font-mono">agency.example.com</span>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-emerald-300">
                    100/100
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    "Performance",
                    "Accessibility",
                    "Best Practices",
                    "SEO",
                  ].map((label) => (
                    <div
                      key={label}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-[var(--color-fg-muted)]">
                        {label}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-white/5">
                          <div className="h-full w-full bg-gradient-to-r from-[var(--color-accent-2)] to-[var(--color-accent)]" />
                        </div>
                        <span className="font-mono text-xs">100</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-fg-muted)]">
                  Lighthouse · Core Web Vitals · top 3 Google
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mx-auto w-full max-w-6xl px-6">
          <dl className="grid grid-cols-2 gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)]/50 p-6 backdrop-blur sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="text-xs uppercase tracking-widest text-[var(--color-fg-muted)]">
                  {s.label}
                </dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* SERVICES */}
      <Section
        id="services"
        eyebrow={t("home.services.eyebrow")}
        title={t("home.services.title")}
        subtitle={t("home.services.subtitle")}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <article className="card group flex flex-col gap-5 p-8">
            <div
              aria-hidden
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-accent-2)] to-[var(--color-accent)] text-2xl"
            >
              ✦
            </div>
            <h3 className="text-2xl font-semibold tracking-tight">
              {t("home.services.webTitle")}
            </h3>
            <p className="text-[var(--color-fg-muted)]">
              {t("home.services.webDescription")}
            </p>
            <ul className="space-y-2 text-sm text-[var(--color-fg-muted)]">
              {webBullets.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-2)]"
                  />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-2">
              <ButtonLink
                href={localizedPath("service-web", loc)}
                variant="ghost"
              >
                {t("home.services.learnMore")} →
              </ButtonLink>
            </div>
          </article>

          <article className="card group flex flex-col gap-5 p-8">
            <div
              aria-hidden
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-3)] text-2xl"
            >
              ↗
            </div>
            <h3 className="text-2xl font-semibold tracking-tight">
              {t("home.services.seoTitle")}
            </h3>
            <p className="text-[var(--color-fg-muted)]">
              {t("home.services.seoDescription")}
            </p>
            <ul className="space-y-2 text-sm text-[var(--color-fg-muted)]">
              {seoBullets.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-3)]"
                  />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-2">
              <ButtonLink
                href={localizedPath("service-seo", loc)}
                variant="ghost"
              >
                {t("home.services.learnMore")} →
              </ButtonLink>
            </div>
          </article>
        </div>
      </Section>

      {/* WHY */}
      <Section
        id="why"
        eyebrow={t("home.why.eyebrow")}
        title={t("home.why.title")}
        subtitle={t("home.why.subtitle")}
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {whyItems.map((item) => (
            <article key={item.title} className="card p-6">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* PROCESS */}
      <Section
        id="process"
        eyebrow={t("home.process.eyebrow")}
        title={t("home.process.title")}
        subtitle={t("home.process.subtitle")}
      >
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <li key={step.title} className="card flex flex-col gap-3 p-6">
              <span className="font-mono text-xs text-[var(--color-fg-muted)]">
                0{i + 1}
              </span>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* TESTIMONIALS */}
      <Section
        id="testimonials"
        eyebrow={t("home.testimonials.eyebrow")}
        title={t("home.testimonials.title")}
      >
        <Testimonials items={testimonials} />
      </Section>

      {/* CONTENT (SEO copy) */}
      <Section className="prose-section">
        <div className="mx-auto max-w-3xl space-y-5 text-base leading-relaxed text-[var(--color-fg-muted)]">
          <p className="text-lg text-[var(--color-fg)]">
            {t("home.content.intro")}
          </p>
          {homeParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section
        id="faq"
        eyebrow={t("home.faq.eyebrow")}
        title={t("home.faq.title")}
      >
        <FAQ items={faqItems} />
      </Section>

      {/* CTA */}
      <Section className="!py-16">
        <div className="card relative overflow-hidden p-10 text-center">
          <div aria-hidden className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("home.cta.title")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[var(--color-fg-muted)]">
              {t("home.cta.subtitle")}
            </p>
            <div className="mt-6 flex justify-center">
              <ButtonLink
                href={localizedPath("contact", loc)}
                variant="primary"
              >
                {t("home.cta.button")} →
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
