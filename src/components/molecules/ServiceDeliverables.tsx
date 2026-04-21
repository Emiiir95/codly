import { CheckCircle2 } from "lucide-react";

type Props = {
  title: string;
  items: string[];
};

export default function ServiceDeliverables({ title, items }: Props) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] p-8 sm:p-10">
      <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-fg)]">
        {title}
      </h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm text-[var(--color-fg-muted)]"
          >
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0 text-[var(--color-accent)]"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
