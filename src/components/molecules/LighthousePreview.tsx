const METRICS = ["Performance", "Accessibility", "Best Practices", "SEO"];

export default function LighthousePreview() {
  return (
    <div className="card animate-float p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[var(--color-fg-muted)]">
          <span className="font-mono">agency.example.com</span>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-mono text-emerald-700 ring-1 ring-emerald-200">
            100/100
          </span>
        </div>
        <ul className="space-y-2">
          {METRICS.map((label) => (
            <li key={label} className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-fg-muted)]">{label}</span>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-32 overflow-hidden rounded-full bg-[var(--color-bg)]">
                  <div className="h-full w-full bg-[var(--color-accent)]" />
                </div>
                <span className="font-mono text-xs text-[var(--color-fg)]">
                  100
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-fg-muted)]">
          Lighthouse · Core Web Vitals · top 3 Google
        </div>
      </div>
    </div>
  );
}
