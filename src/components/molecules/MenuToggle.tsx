type Props = {
  open: boolean;
  onToggle: () => void;
  openLabel: string;
  closeLabel: string;
};

export default function MenuToggle({
  open,
  onToggle,
  openLabel,
  closeLabel,
}: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? closeLabel : openLabel}
      aria-expanded={open}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)] text-[var(--color-fg)] shadow-sm hover:border-[var(--color-fg)] md:hidden"
    >
      <span aria-hidden>{open ? "✕" : "☰"}</span>
    </button>
  );
}
