import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-200 select-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)] bg-gradient-to-r from-[var(--color-accent-2)] via-[var(--color-accent)] to-[var(--color-accent-3)] hover:brightness-110 hover:shadow-[0_8px_30px_-8px_rgba(139,92,246,0.6)]",
  secondary:
    "border border-[var(--color-border-strong)] bg-[var(--color-bg-elev)]/60 backdrop-blur text-[var(--color-fg)] hover:border-[var(--color-accent)] hover:bg-[var(--color-bg-elev)]",
  ghost:
    "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-white/5",
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
