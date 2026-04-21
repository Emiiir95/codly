import Eyebrow from "@/components/atoms/Eyebrow";
import GradientHeading from "@/components/atoms/GradientHeading";
import Breadcrumbs, { type Crumb } from "@/components/molecules/Breadcrumbs";

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
  breadcrumbs?: Crumb[];
};

/**
 * Standard interior-page hero: optional breadcrumb + eyebrow + gradient H1 + subtitle.
 * Used by service, about, contact, blog and realisations pages.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
}: Props) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-12 pt-28 sm:pt-32">
      {breadcrumbs && (
        <div className="mb-6">
          <Breadcrumbs items={breadcrumbs} inline />
        </div>
      )}
      <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
      <GradientHeading as={1} size="xl">
        {title}
      </GradientHeading>
      <p className="mt-6 max-w-2xl text-lg text-fg-muted">{subtitle}</p>
    </section>
  );
}
