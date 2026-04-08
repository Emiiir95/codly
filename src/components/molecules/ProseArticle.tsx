type Props = {
  title: string;
  body: string;
};

/**
 * Long-form article with a visible H2 — used on service and about pages.
 */
export default function ProseArticle({ title, body }: Props) {
  return (
    <article className="max-w-3xl">
      <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-fg)]">
        {title}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-[var(--color-fg-muted)]">
        {body}
      </p>
    </article>
  );
}
