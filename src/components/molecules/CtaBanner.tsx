import { ButtonLink } from "@/components/atoms/Button";

type Props = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  href: string;
};

export default function CtaBanner({ title, subtitle, ctaLabel, href }: Props) {
  return (
    <div className="card relative overflow-hidden p-10 text-center">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[var(--color-fg-muted)]">
          {subtitle}
        </p>
        <div className="mt-6 flex justify-center">
          <ButtonLink href={href} variant="primary">
            {ctaLabel} →
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
