/**
 * Dotted reactflow-style background, strictly bounded to its parent.
 * Used exclusively inside the home page hero section.
 */
export default function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-dots" />
      <div
        className="absolute inset-x-0 -top-10 h-64"
        style={{
          background:
            "radial-gradient(700px 260px at 50% 0%, color-mix(in oklab, var(--color-accent) 22%, transparent), transparent 70%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[var(--color-bg)]" />
    </div>
  );
}
