import type { ComponentType, SVGProps } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type IconType = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string }
>;

type Props = {
  icon: IconType;
  tag: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
};

export default function ServiceOverviewCard({
  icon: Icon,
  tag,
  title,
  description,
  href,
  ctaLabel,
}: Props) {
  return (
    <Link href={href} className="group block h-full">
      <article className="flex h-full flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-lg">
        <div className="flex items-center justify-between">
          <div
            aria-hidden
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-transform duration-300 group-hover:scale-110"
          >
            <Icon size={22} strokeWidth={2} />
          </div>
          <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[var(--color-fg-muted)]">
            {tag}
          </span>
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-[var(--color-fg)]">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">
          {description}
        </p>
        <div className="mt-auto flex items-center gap-1.5 pt-2 text-sm font-medium text-[var(--color-accent)] transition-all group-hover:gap-3">
          {ctaLabel}
          <ArrowRight
            size={15}
            strokeWidth={2}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>
      </article>
    </Link>
  );
}
