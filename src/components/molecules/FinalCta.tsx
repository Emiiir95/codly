import { Phone } from "lucide-react";
import { ButtonLink } from "@/components/atoms/Button";

type Props = {
  title: string;
  subtitle: string;
  buttonLabel: string;
  href: string;
  orCallLabel: string;
  footerNote: string;
};

export default function FinalCta({
  title,
  subtitle,
  buttonLabel,
  href,
  orCallLabel,
  footerNote,
}: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] p-10 text-center shadow-lg sm:p-14">
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
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink href={href} variant="primary">
            {buttonLabel} &rarr;
          </ButtonLink>
          <ButtonLink href="tel:+33000000000" variant="ghost">
            <Phone size={16} /> {orCallLabel}
          </ButtonLink>
        </div>
        <p className="mt-4 text-xs text-[var(--color-fg-muted)]">
          {footerNote}
        </p>
      </div>
    </div>
  );
}
