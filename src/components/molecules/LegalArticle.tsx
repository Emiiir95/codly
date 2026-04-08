type Props = {
  title: string;
  body: string;
};

export default function LegalArticle({ title, body }: Props) {
  return (
    <article>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
        {body}
      </p>
    </article>
  );
}
