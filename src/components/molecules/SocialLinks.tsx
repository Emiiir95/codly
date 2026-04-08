import { SITE } from "@/lib/site";

const LINKS = [
  { href: SITE.social.linkedin, label: "LinkedIn" },
  { href: SITE.social.twitter, label: "Twitter" },
  { href: SITE.social.github, label: "GitHub" },
];

export default function SocialLinks() {
  return (
    <ul className="flex gap-3 text-xs text-[var(--color-fg-muted)]">
      {LINKS.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-[var(--color-border)] px-3 py-1 hover:border-[var(--color-border-strong)]"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
