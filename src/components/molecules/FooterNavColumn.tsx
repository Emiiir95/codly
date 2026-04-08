import Link from "next/link";

export type FooterLink = { href: string; label: string };

type Props = {
  title: string;
  links: FooterLink[];
};

export default function FooterNavColumn({ title, links }: Props) {
  return (
    <nav aria-label={title} className="md:col-span-2">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-fg)]">
        {title}
      </h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-[var(--color-fg-muted)] transition hover:text-[var(--color-fg)]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
