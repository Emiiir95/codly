type Props = {
  index: number;
  title: string;
  body: string;
};

export default function ProcessStep({ index, title, body }: Props) {
  return (
    <li className="card flex flex-col gap-3 p-6">
      <span className="font-mono text-xs text-[var(--color-fg-muted)]">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">
        {body}
      </p>
    </li>
  );
}
