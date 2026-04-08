import type { ReactNode } from "react";

type Level = 1 | 2 | 3;
type Size = "xl" | "lg" | "md";

const sizes: Record<Size, string> = {
  xl: "text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.05]",
  lg: "text-3xl sm:text-4xl md:text-5xl leading-[1.1]",
  md: "text-2xl sm:text-3xl leading-[1.15]",
};

type Props = {
  as?: Level;
  size?: Size;
  children: ReactNode;
  className?: string;
};

export default function GradientHeading({
  as = 1,
  size = "xl",
  children,
  className = "",
}: Props) {
  const Tag = `h${as}` as "h1" | "h2" | "h3";
  return (
    <Tag
      className={`font-semibold tracking-tight ${sizes[size]} ${className}`}
    >
      <span className="text-gradient">{children}</span>
    </Tag>
  );
}
