import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const subscribe = (cb: () => void) => {
  window.addEventListener("themechange", cb);
  return () => window.removeEventListener("themechange", cb);
};

const getSnapshot = (): "light" | "dark" => {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
};

const getServerSnapshot = (): "light" | "dark" => "light";

export default function ThemeToggle({ label }: { label: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event("themechange"));
  };

  const Icon = theme === "light" ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)] text-[var(--color-fg)] shadow-sm transition-all duration-300 hover:scale-110 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
    >
      <Icon
        size={16}
        strokeWidth={2}
        className="transition-transform duration-500 group-hover:rotate-[360deg]"
        aria-hidden
      />
    </button>
  );
}
