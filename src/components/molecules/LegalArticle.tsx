import RichText from "@/components/atoms/RichText";

type Props = {
  title: string;
  body: string;
};

export default function LegalArticle({ title, body }: Props) {
  return (
    <article>
      <h2 className="text-xl font-semibold text-[var(--color-fg)]">{title}</h2>
      <RichText
        html={body}
        className="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)] [&_a]:text-[var(--color-accent)] [&_a]:underline [&_strong]:font-semibold [&_strong]:text-[var(--color-fg)] [&_b]:font-semibold [&_b]:text-[var(--color-fg)]"
      />
    </article>
  );
}
