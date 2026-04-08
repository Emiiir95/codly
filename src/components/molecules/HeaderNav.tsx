import Link from "next/link";

export type NavItem = { href: string; label: string };

type Props = {
  items: NavItem[];
  orientation?: "horizontal" | "vertical";
  onItemClick?: () => void;
};

export default function HeaderNav({
  items,
  orientation = "horizontal",
  onItemClick,
}: Props) {
  const wrapperCls =
    orientation === "horizontal"
      ? "hidden items-center gap-7 md:flex"
      : "flex flex-col gap-3";
  const itemCls =
    orientation === "horizontal"
      ? "text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
      : "block py-2 text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]";

  if (orientation === "vertical") {
    return (
      <ul className={wrapperCls}>
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} onClick={onItemClick} className={itemCls}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <nav aria-label="Primary" className={wrapperCls}>
      {items.map((item) => (
        <Link key={item.href} href={item.href} className={itemCls}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
