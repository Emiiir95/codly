import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: Props) {
  if (!eyebrow && !title && !subtitle) return null;
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <header className={`max-w-3xl ${alignCls} mb-12 sm:mb-16 ${className}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-[var(--color-accent-2)]">
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-5 text-lg text-[var(--color-fg-muted)]">{subtitle}</p>
      )}
    </header>
  );
}
