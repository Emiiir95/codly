import type { ReactNode } from "react";
import SectionHeader from "@/components/molecules/SectionHeader";

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
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-360 px-8 py-20 sm:py-28 ${className}`}
    >
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        align={align}
      />
      {children}
    </section>
  );
}
