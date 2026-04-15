import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 select-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] !text-white shadow-sm hover:bg-[color-mix(in_oklab,var(--color-accent)_90%,black)] hover:shadow-[0_10px_30px_-12px_rgba(206,28,107,0.55)]",
  secondary:
    "bg-[var(--color-bg-elev)] text-[var(--color-fg)] border border-[var(--color-border)] hover:border-[var(--color-fg)] hover:bg-[var(--color-bg)]",
  ghost:
    "text-[var(--color-fg-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]",
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type LinkButtonProps = CommonProps & {
  href: string;
  external?: boolean;
};

type NativeButtonProps = CommonProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  external,
}: LinkButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...rest
}: NativeButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
