import { Menu, X } from "lucide-react";

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
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)] text-[var(--color-fg)] shadow-sm transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] md:hidden"
    >
      {open ? (
        <X size={18} strokeWidth={2.2} aria-hidden />
      ) : (
        <Menu size={18} strokeWidth={2.2} aria-hidden />
      )}
    </button>
  );
}
