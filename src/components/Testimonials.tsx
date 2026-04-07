type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export default function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <li key={item.author} className="card flex flex-col gap-4 p-6">
          <div
            aria-hidden
            className="flex gap-0.5 text-sm text-[var(--color-accent-2)]"
          >
            {"★★★★★"}
          </div>
          <blockquote className="text-sm leading-relaxed text-[var(--color-fg)]">
            “{item.quote}”
          </blockquote>
          <footer className="mt-auto pt-2 text-xs text-[var(--color-fg-muted)]">
            <strong className="block text-sm font-medium text-[var(--color-fg)]">
              {item.author}
            </strong>
            {item.role}
          </footer>
        </li>
      ))}
    </ul>
  );
}
