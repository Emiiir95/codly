import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const { t, locale } = useI18n();
  const home = { label: t("common.home"), href: localizedPath("home", locale) };
  const all = [home, ...items];

  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto w-full max-w-6xl px-6 pt-8 text-xs text-[var(--color-fg-muted)]"
    >
      <ol className="flex flex-wrap items-center gap-2">
        {all.map((item, i) => {
          const isLast = i === all.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[var(--color-accent)]"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-[var(--color-fg)]" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <span aria-hidden>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
