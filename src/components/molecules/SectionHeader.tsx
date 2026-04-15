import { useRef, useEffect, useState, type ReactNode } from "react";

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

  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <header
      ref={ref}
      className={`max-w-3xl ${alignCls} mb-12 sm:mb-16 ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition:
          "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-accent">
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-5 text-lg text-fg-muted">{subtitle}</p>
      )}
    </header>
  );
}
