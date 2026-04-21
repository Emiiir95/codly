import { useI18n } from "@/lib/i18n";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";
import LegalArticle from "@/components/molecules/LegalArticle";
import Section from "./Section";

type Props = {
  namespace: "legal" | "privacy";
};

export default function LegalContent({ namespace }: Props) {
  const { t, raw } = useI18n();
  const sections = raw<Array<{ title: string; body: string }>>(
    `${namespace}.sections`,
  );

  return (
    <>
      <div className="pt-28 sm:pt-32">
        <Breadcrumbs items={[{ label: t(`${namespace}.breadcrumb`) }]} />
      </div>

      <Section className="pt-8!" align="left">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {t(`${namespace}.title`)}
        </h1>
        <div className="mt-10 grid max-w-3xl gap-8">
          {sections.map((section) => (
            <LegalArticle
              key={section.title}
              title={section.title}
              body={section.body}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
