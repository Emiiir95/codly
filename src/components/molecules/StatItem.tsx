type Props = {
  value: string;
  label: string;
};

export default function StatItem({ value, label }: Props) {
  return (
    <div className="text-center">
      <dt className="text-xs uppercase tracking-widest text-[var(--color-fg-muted)]">
        {label}
      </dt>
      <dd className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
        {value}
      </dd>
    </div>
  );
}
