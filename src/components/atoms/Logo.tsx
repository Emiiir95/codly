import Link from "next/link";

type Props = {
  href: string;
  label?: string;
};

export default function Logo({ href, label = "Agency" }: Props) {
  return (
    <Link
      href={href}
      className="text-lg font-semibold tracking-tight text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)]"
      aria-label={label}
    >
      {label}
    </Link>
  );
}
