import { useI18n } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export default function ContactInfoCard() {
  const { t } = useI18n();
  return (
    <aside className="card flex flex-col gap-5 p-6">
      <h2 className="text-lg font-semibold text-[var(--color-fg)]">
        {t("contact.info.title")}
      </h2>
      <div>
        <p className="text-xs uppercase tracking-widest text-[var(--color-fg-muted)]">
          {t("contact.info.emailLabel")}
        </p>
        <a
          href={`mailto:${SITE.email}`}
          className="mt-1 block text-sm text-[var(--color-fg)] hover:text-[var(--color-accent)]"
        >
          {SITE.email}
        </a>
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-[var(--color-fg-muted)]">
          {t("contact.info.phoneLabel")}
        </p>
        <a
          href={`tel:${SITE.phone.replace(/\s/g, "")}`}
          className="mt-1 block text-sm text-[var(--color-fg)] hover:text-[var(--color-accent)]"
        >
          {SITE.phone}
        </a>
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-[var(--color-fg-muted)]">
          {t("contact.info.addressLabel")}
        </p>
        <address className="mt-1 not-italic text-sm text-[var(--color-fg-muted)]">
          {SITE.address.street}
          <br />
          {SITE.address.postalCode} {SITE.address.city}
        </address>
      </div>
      <p className="mt-auto text-xs text-[var(--color-fg-muted)]">
        {t("contact.info.hours")}
      </p>
    </aside>
  );
}
