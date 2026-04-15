import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export default function ContactInfoCard() {
  const { t } = useI18n();
  return (
    <aside className="card flex flex-col gap-5 p-6">
      <h2 className="text-lg font-semibold text-[var(--color-fg)]">
        {t("contact.info.title")}
      </h2>

      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
          <Mail size={16} strokeWidth={2} aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-widest text-[var(--color-fg-muted)]">
            {t("contact.info.emailLabel")}
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-1 block break-all text-sm text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)]"
          >
            {SITE.email}
          </a>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
          <Phone size={16} strokeWidth={2} aria-hidden />
        </span>
        <div>
          <p className="text-xs uppercase tracking-widest text-[var(--color-fg-muted)]">
            {t("contact.info.phoneLabel")}
          </p>
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className="mt-1 block text-sm text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)]"
          >
            {SITE.phone}
          </a>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
          <MapPin size={16} strokeWidth={2} aria-hidden />
        </span>
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
      </div>

      <p className="mt-auto flex items-center gap-2 text-xs text-[var(--color-fg-muted)]">
        <Clock size={12} strokeWidth={2} aria-hidden />
        {t("contact.info.hours")}
      </p>
    </aside>
  );
}
