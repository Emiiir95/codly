type Props = {
  title: string;
  body: string;
};

export default function FeatureCard({ title, body }: Props) {
  return (
    <article className="card p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
        {body}
      </p>
    </article>
  );
}
