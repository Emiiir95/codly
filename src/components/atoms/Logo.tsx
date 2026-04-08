import Link from "next/link";

type Props = {
  href: string;
  label?: string;
};

export default function Logo({ href, label = "Agency" }: Props) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 font-semibold tracking-tight text-[var(--color-fg)]"
      aria-label={label}
    >
      <span
        aria-hidden
        className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent)] text-xs font-bold text-white"
      >
        A
      </span>
      <span className="text-lg">{label}</span>
    </Link>
  );
}
