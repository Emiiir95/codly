type Props = {
  title: string;
  items: string[];
};

export default function DeliverablesList({ title, items }: Props) {
  return (
    <div className="card p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-fg)]">
        {title}
      </h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm text-[var(--color-fg-muted)]"
          >
            <span
              aria-hidden
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
