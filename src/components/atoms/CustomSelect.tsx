import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

type Option = { value: string; label: string };

type Props = {
  name: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  "aria-invalid"?: boolean;
};

export default function CustomSelect({
  name,
  options,
  placeholder = "—",
  required,
  "aria-invalid": ariaInvalid,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleSelect = (opt: Option) => {
    setSelected(opt);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      {/* Hidden native input for form submission */}
      <input type="hidden" name={name} value={selected?.value ?? ""} />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-invalid={ariaInvalid}
        className={`flex w-full items-center justify-between rounded-lg border bg-[var(--color-bg-elev)] px-4 py-3 text-left text-sm shadow-sm outline-none transition ${
          ariaInvalid
            ? "border-rose-500"
            : open
              ? "border-[var(--color-accent)] ring-2 ring-[var(--color-accent-soft)]"
              : "border-[var(--color-border)]"
        }`}
      >
        <span
          className={
            selected
              ? "text-[var(--color-fg)]"
              : "text-[var(--color-fg-subtle)]"
          }
        >
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          aria-hidden
          className={`shrink-0 text-[var(--color-fg-muted)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] py-1 shadow-lg"
          style={{
            animation: "fade-up 0.15s cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        >
          {options.map((opt) => {
            const isSelected = selected?.value === opt.value;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt)}
                className={`flex cursor-pointer items-center gap-2 px-4 py-2.5 text-sm transition-all duration-150 ${
                  isSelected
                    ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                    : "text-[var(--color-fg)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]"
                }`}
              >
                <Check
                  size={14}
                  strokeWidth={2.5}
                  aria-hidden
                  className={`shrink-0 transition-opacity ${isSelected ? "opacity-100" : "opacity-0"}`}
                />
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
