import { SITE } from "@/lib/site";

const LINKS = [
  { href: SITE.social.linkedin, label: "LinkedIn" },
  { href: SITE.social.twitter, label: "Twitter" },
  { href: SITE.social.github, label: "GitHub" },
];

export default function SocialLinks() {
  return (
    <ul className="flex gap-3 text-xs">
      {LINKS.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-[var(--color-fg-muted)] shadow-sm hover:border-[var(--color-fg)] hover:text-[var(--color-fg)]"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
