import { ButtonLink } from "@/components/atoms/Button";

type Props = {
  icon: string;
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
  const dotColor =
    accent === "primary" ? "bg-[var(--color-accent)]" : "bg-[var(--color-accent-2)]";

  return (
    <article className="card group flex flex-col gap-5 p-8">
      <div
        aria-hidden
        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} text-2xl shadow-sm`}
      >
        {icon}
      </div>
      <h3 className="text-2xl font-semibold tracking-tight text-[var(--color-fg)]">
        {title}
      </h3>
      <p className="text-[var(--color-fg-muted)]">{description}</p>
      <ul className="space-y-2 text-sm text-[var(--color-fg-muted)]">
        {bullets.map((b) => (
          <li key={b} className="flex items-center gap-2">
            <span
              aria-hidden
              className={`h-1.5 w-1.5 rounded-full ${dotColor}`}
            />
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-2">
        <ButtonLink href={href} variant="ghost">
          {ctaLabel} →
        </ButtonLink>
      </div>
    </article>
  );
}
