type Props = {
  quote: string;
  author: string;
  role: string;
};

export default function TestimonialCard({ quote, author, role }: Props) {
  return (
    <li className="card flex flex-col gap-4 p-6">
      <div
        aria-hidden
        className="flex gap-0.5 text-sm text-[var(--color-accent)]"
      >
        ★★★★★
      </div>
      <blockquote className="text-sm leading-relaxed text-[var(--color-fg)]">
        “{quote}”
      </blockquote>
      <footer className="mt-auto pt-2 text-xs text-[var(--color-fg-muted)]">
        <strong className="block text-sm font-medium text-[var(--color-fg)]">
          {author}
        </strong>
        {role}
      </footer>
    </li>
  );
}
