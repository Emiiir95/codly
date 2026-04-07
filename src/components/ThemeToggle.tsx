import { useSyncExternalStore } from "react";

const subscribe = (cb: () => void) => {
  window.addEventListener("themechange", cb);
  return () => window.removeEventListener("themechange", cb);
};

const getSnapshot = (): "dark" | "light" => {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
};

const getServerSnapshot = (): "dark" | "light" => "dark";

export default function ThemeToggle({ label }: { label: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("light", next === "light");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
    // Force re-render via dispatching a custom event so getSnapshot returns fresh value
    window.dispatchEvent(new Event("themechange"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)]/60 text-sm hover:border-[var(--color-border-strong)]"
    >
      <span aria-hidden>{theme === "dark" ? "🌙" : "☀️"}</span>
    </button>
  );
}
