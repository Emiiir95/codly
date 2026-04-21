import { ArrowRight } from "lucide-react";
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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(520px 200px at 50% 0%, color-mix(in oklab, var(--color-accent) 12%, transparent), transparent 70%)",
        }}
      />
      <div className="relative">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[var(--color-fg-muted)]">
          {subtitle}
        </p>
        <div className="mt-6 flex justify-center">
          <ButtonLink href={href} variant="primary">
            {ctaLabel} <ArrowRight size={16} strokeWidth={2} aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
