import Eyebrow from "@/components/atoms/Eyebrow";
import GradientHeading from "@/components/atoms/GradientHeading";

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

/**
 * Standard interior-page hero: eyebrow + gradient H1 + subtitle.
 * Used by service, about and contact pages.
 */
export default function PageHero({ eyebrow, title, subtitle }: Props) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-12 pt-12">
      <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
      <GradientHeading as={1} size="xl">
        {title}
      </GradientHeading>
      <p className="mt-6 max-w-2xl text-lg text-[var(--color-fg-muted)]">
        {subtitle}
      </p>
    </section>
  );
}
