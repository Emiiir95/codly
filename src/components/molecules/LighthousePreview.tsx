const METRICS = ["Performance", "Accessibility", "Best Practices", "SEO"];

export default function LighthousePreview() {
  return (
    <div className="card animate-float relative overflow-hidden p-6">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative space-y-4">
        <div className="flex items-center justify-between text-xs text-[var(--color-fg-muted)]">
          <span className="font-mono">agency.example.com</span>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-emerald-300">
            100/100
          </span>
        </div>
        <ul className="space-y-2">
          {METRICS.map((label) => (
            <li key={label} className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-fg-muted)]">{label}</span>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-32 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-full bg-gradient-to-r from-[var(--color-accent-2)] to-[var(--color-accent)]" />
                </div>
                <span className="font-mono text-xs">100</span>
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
