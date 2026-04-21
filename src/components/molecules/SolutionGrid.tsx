import { CheckCircle2 } from "lucide-react";
import Reveal from "@/components/atoms/Reveal";

type SolutionItem = {
  title: string;
  body: string;
};

type Props = {
  eyebrow: string;
  title: string;
  items: SolutionItem[];
};

export default function SolutionGrid({ eyebrow, title, items }: Props) {
  return (
    <>
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-3xl">
          {title}
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08}>
            <div className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] p-6 transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-lg">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-fg)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                {item.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
