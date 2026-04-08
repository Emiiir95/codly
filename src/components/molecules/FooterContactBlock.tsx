import { SITE } from "@/lib/site";

export default function FooterContactBlock() {
  return (
    <address className="not-italic md:col-span-3">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-fg)]">
        Contact
      </h2>
      <ul className="space-y-2 text-sm text-[var(--color-fg-muted)]">
        <li>
          <a
            href={`mailto:${SITE.email}`}
            className="hover:text-[var(--color-accent)]"
          >
            {SITE.email}
          </a>
        </li>
        <li>
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className="hover:text-[var(--color-accent)]"
          >
            {SITE.phone}
          </a>
        </li>
        <li>
          {SITE.address.street}
          <br />
          {SITE.address.postalCode} {SITE.address.city}
        </li>
      </ul>
    </address>
  );
}
