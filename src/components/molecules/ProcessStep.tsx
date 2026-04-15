type Props = {
  index: number;
  title: string;
  body: string;
};

export default function ProcessStep({ index, title, body }: Props) {
  return (
    <article className="card flex h-full flex-col gap-3 p-6">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-accent-soft)] font-mono text-xs font-semibold text-[var(--color-accent)]">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="text-lg font-semibold text-[var(--color-fg)]">{title}</h3>
      <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">
        {body}
      </p>
    </article>
  );
}
