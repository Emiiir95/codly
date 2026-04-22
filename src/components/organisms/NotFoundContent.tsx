import { useI18n } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import { ButtonLink } from "@/components/atoms/Button";

export default function NotFoundContent() {
  const { t, locale } = useI18n();
  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-gradient font-mono text-7xl font-semibold sm:text-9xl">
        {t("notFound.code")}
      </p>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-4xl">
        {t("notFound.title")}
      </h1>
      <p className="mt-4 max-w-xl text-[var(--color-fg-muted)]">
        {t("notFound.subtitle")}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href={localizedPath("home", locale)} variant="primary">
          {t("notFound.back")}
        </ButtonLink>
        <ButtonLink
          href={localizedPath("services", locale)}
          variant="secondary"
        >
          {t("notFound.services")}
        </ButtonLink>
      </div>
    </section>
  );
}
