import Link from "next/link";

export type NavItem = { href: string; label: string };

type Props = {
  items: NavItem[];
  orientation?: "horizontal" | "vertical";
  onItemClick?: () => void;
  activeHref?: string;
};

export default function HeaderNav({
  items,
  orientation = "horizontal",
  onItemClick,
  activeHref,
}: Props) {
  const wrapperCls =
    orientation === "horizontal"
      ? "hidden items-center gap-7 md:flex"
      : "flex flex-col gap-1";

  const itemCls = (active: boolean) => {
    if (orientation === "horizontal") {
      return `group relative text-sm font-medium transition-colors ${
        active
          ? "text-[var(--color-accent)]"
          : "text-[var(--color-fg-muted)] hover:text-[var(--color-accent)]"
      }`;
    }
    return `block border-l-2 py-1.5 pl-3 text-sm font-medium transition-all ${
      active
        ? "border-[var(--color-accent)] text-[var(--color-accent)]"
        : "border-transparent text-[var(--color-fg-muted)] hover:border-[var(--color-accent)] hover:pl-4 hover:text-[var(--color-accent)]"
    }`;
  };

  if (orientation === "vertical") {
    return (
      <ul className={wrapperCls}>
        {items.map((item) => {
          const active = activeHref === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onItemClick}
                aria-current={active ? "page" : undefined}
                className={itemCls(active)}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <nav aria-label="Primary" className={wrapperCls}>
      {items.map((item) => {
        const active = activeHref === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={itemCls(active)}
          >
            {item.label}
            <span
              className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-[var(--color-accent)] transition-all duration-300 ${
                active ? "w-full" : "w-0 group-hover:w-full"
              }`}
              aria-hidden
            />
          </Link>
        );
      })}
    </nav>
  );
}
