import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import {
  REALISATIONS,
  CATEGORY_LABELS,
  type RealisationCategory,
} from "@/lib/realisations-data";
import PageHero from "./PageHero";
import Section from "./Section";
import Reveal from "@/components/atoms/Reveal";
import RealisationCard from "@/components/molecules/RealisationCard";
import FinalCta from "@/components/molecules/FinalCta";

type Filter = "all" | RealisationCategory;

const FILTERS: Filter[] = ["all", "web", "ecommerce", "seo", "ads"];

const CATEGORY_ORDER: RealisationCategory[] = [
  "web",
  "ecommerce",
  "seo",
  "ads",
];

const CATEGORY_SUBTITLE: Record<RealisationCategory, string> = {
  web: "Des sites vitrines sur-mesure, pensés pour convertir et tenir la charge. Design éditorial, perfs au rendez-vous.",
  ecommerce:
    "Des boutiques Shopify rentables, du drop à la marque premium. On construit des parcours d'achat qui vendent vraiment.",
  seo: "Un trafic organique durable : SEO technique, contenu, netlinking. Le combo qui fait grimper vraiment.",
  ads: "Acquisition payante mesurée au centime. Google Ads, Meta, TikTok — on scale ce qui performe et on coupe le reste.",
};

export default function RealisationsContent() {
  const { t, locale } = useI18n();
  const [active, setActive] = useState<Filter>("all");

  const singleStack = useMemo(() => {
    if (active === "all") return null;
    return REALISATIONS.filter((r) => r.category === active);
  }, [active]);

  const groups = useMemo(() => {
    if (active !== "all") return [];
    return CATEGORY_ORDER.map((cat) => ({
      category: cat,
      items: REALISATIONS.filter((r) => r.category === cat),
    })).filter((g) => g.items.length > 0);
  }, [active]);

  const stats = [
    { value: "120+", label: "Projets livrés" },
    { value: "92%", label: "Clients fidèles" },
    { value: "4.9/5", label: "Satisfaction" },
    { value: "+340%", label: "Trafic moyen" },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("realisations.hero.eyebrow")}
        title={t("realisations.hero.title")}
        subtitle={t("realisations.hero.subtitle")}
        breadcrumbs={[{ label: t("realisations.breadcrumb") }]}
      />

      {/* Stats strip */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-12">
        <Reveal>
          <div className="grid grid-cols-2 gap-0.5 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-4">
            {stats.map((s, i) => (
              <motion.dl
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex flex-col items-center gap-1 bg-[var(--color-bg-elev)] px-6 py-8 text-center"
              >
                <dt className="order-2 text-xs font-medium uppercase tracking-widest text-[var(--color-fg-muted)]">
                  {s.label}
                </dt>
                <dd className="order-1 text-2xl font-bold tracking-tight text-[var(--color-fg)] sm:text-3xl">
                  <span className="text-gradient">{s.value}</span>
                </dd>
              </motion.dl>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Filter bar sticky */}
      <div className="sticky top-20 z-30 mx-auto w-full max-w-6xl px-6 pb-4">
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)]/80 p-1.5 shadow-sm backdrop-blur-xl">
          {FILTERS.map((filter) => {
            const isActive = active === filter;
            const label =
              filter === "all"
                ? t("realisations.filters.all")
                : CATEGORY_LABELS[filter];
            const count =
              filter === "all"
                ? REALISATIONS.length
                : REALISATIONS.filter((r) => r.category === filter).length;
            return (
              <motion.button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                whileTap={{ scale: 0.96 }}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[var(--color-accent)] text-white shadow-md shadow-[var(--color-accent)]/25"
                    : "text-[var(--color-fg-muted)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]"
                }`}
              >
                {label}
                <span
                  className={`rounded-full px-1.5 text-[10px] font-semibold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[var(--color-border)] text-[var(--color-fg-subtle)]"
                  }`}
                >
                  {count}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {active === "all" ? (
          <motion.div
            key="grouped"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {groups.map((group) => (
              <CategoryStack
                key={group.category}
                category={group.category}
                items={group.items}
              />
            ))}
          </motion.div>
        ) : singleStack && singleStack.length > 0 ? (
          <motion.div
            key={`single-${active}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative pb-[20vh]"
          >
            {singleStack.map((item, i) => (
              <RealisationCard
                key={item.slug}
                item={item}
                index={i}
                total={singleStack.length}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-6 py-24 text-center text-[var(--color-fg-muted)]"
          >
            <Sparkles size={24} className="text-[var(--color-accent)]" />
            <p>Aucune réalisation dans cette catégorie pour l&rsquo;instant.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final CTA */}
      <Section className="py-16!">
        <Reveal>
          <FinalCta
            title="Envie du prochain cas d'étude ?"
            subtitle="Parlons de votre projet — on vous dit en 30 minutes ce qu'on peut faire pour vous, sans engagement."
            buttonLabel="Démarrer un projet"
            href={localizedPath("contact", locale)}
          />
        </Reveal>
      </Section>
    </>
  );
}

type CategoryStackProps = {
  category: RealisationCategory;
  items: typeof REALISATIONS;
};

function CategoryStack({ category, items }: CategoryStackProps) {
  return (
    <section className="relative pb-[15vh]">
      {/* Category intro */}
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 pt-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-5xl"
        >
          {CATEGORY_LABELS[category]}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl text-base leading-relaxed text-[var(--color-fg-muted)]"
        >
          {CATEGORY_SUBTITLE[category]}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 h-px w-24 origin-center bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
        />
      </div>

      {/* Sticky-stack of cards for this category */}
      <div className="relative">
        {items.map((item, i) => (
          <RealisationCard
            key={item.slug}
            item={item}
            index={i}
            total={items.length}
          />
        ))}
      </div>
    </section>
  );
}
