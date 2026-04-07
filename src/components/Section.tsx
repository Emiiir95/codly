import type { ReactNode } from "react";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
};

export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
  align = "center",
}: Props) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-6xl px-6 py-20 sm:py-28 ${className}`}
    >
      {(eyebrow || title || subtitle) && (
        <header className={`max-w-3xl ${alignCls} mb-12 sm:mb-16`}>
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
            <p className="mt-5 text-lg text-[var(--color-fg-muted)]">
              {subtitle}
            </p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
