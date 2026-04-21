type Props = {
  eyebrow: string;
  title: string;
  items: string[];
};

export default function PainPoints({ eyebrow, title, items }: Props) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-3xl">
        {title}
      </h2>
      <ul className="mt-8 grid gap-4 text-left sm:grid-cols-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] px-5 py-4 text-sm text-[var(--color-fg-muted)]"
          >
            <span className="mt-0.5 text-red-500">&#10007;</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
