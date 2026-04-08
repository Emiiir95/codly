import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  withDot?: boolean;
  className?: string;
};

export default function Eyebrow({
  children,
  withDot = false,
  className = "",
}: Props) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)] px-3 py-1 text-xs font-medium uppercase tracking-widest text-[var(--color-fg-muted)] shadow-sm ${className}`}
    >
      {withDot && (
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
        />
      )}
      {children}
    </p>
  );
}
