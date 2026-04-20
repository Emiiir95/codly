import { isValidElement, type ComponentType, type ReactNode, type SVGProps } from "react";
import { Check, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/atoms/Button";

type IconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

type Props = {
  icon: IconType | ReactNode;
  title: string;
  description: string;
  bullets: string[];
  href: string;
  ctaLabel: string;
  accent?: "primary" | "secondary";
};

export default function ServiceCard({
  icon,
  title,
  description,
  bullets,
  href,
  ctaLabel,
  accent = "primary",
}: Props) {
  const iconBg =
    accent === "primary"
      ? "bg-[var(--color-accent)] text-white"
      : "bg-[var(--color-accent-2)] text-white";
  const checkColor =
    accent === "primary"
      ? "text-[var(--color-accent)]"
      : "text-[var(--color-accent-2)]";

  const renderIcon = () => {
    if (isValidElement(icon)) return icon;
    const Icon = icon as IconType;
    return <Icon size={22} strokeWidth={2} aria-hidden />;
  };

  return (
    <article className="card group flex flex-col gap-5 p-8 transition-transform duration-300 hover:-translate-y-1">
      <div
        aria-hidden
        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
      >
        {renderIcon()}
      </div>
      <h3 className="text-2xl font-semibold tracking-tight text-[var(--color-fg)]">
        {title}
      </h3>
      <p className="text-[var(--color-fg-muted)]">{description}</p>
      <ul className="space-y-2 text-sm text-[var(--color-fg-muted)]">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <Check
              size={14}
              strokeWidth={2.5}
              className={`mt-0.5 shrink-0 ${checkColor}`}
              aria-hidden
            />
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-2">
        <ButtonLink href={href} variant="ghost">
          {ctaLabel} <ArrowRight size={16} strokeWidth={2} aria-hidden />
        </ButtonLink>
      </div>
    </article>
  );
}
